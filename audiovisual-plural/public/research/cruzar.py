"""Reconstrói o recorte do observatório a partir das quatro bases ANCINE e das atas."""
import csv
import hashlib
import json
import re
from collections import defaultdict
from decimal import Decimal
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent
FONTES = ROOT / "fontes"
CHAMADAS = {"Cinema": "PRODUÇÃO SELETIVO CINEMA", "TV/VoD": "PRODUÇÃO SELETIVO TV-VOD"}
CHAMADA = "CHAMADA PÚBLICA"
ANO = "ANO DA CHAMADA PÚBLICA"
CNPJ = "CNPJ PRODUTORA"
VALOR = "VALOR SELEÇÃO / PROPOSIÇÃO DE INVESTIMENTO"


def ler(nome, aba=None):
    livro = load_workbook(FONTES / nome, read_only=True, data_only=True)
    try:
        planilha = livro[aba] if aba else livro.worksheets[0]
        linhas = iter(planilha.values)
        cabecalho = next(linhas)
        return [dict(zip(cabecalho, r)) for r in linhas if any(x is not None for x in r)]
    finally:
        livro.close()


def centavos(x):
    return None if x is None else int((Decimal(str(x)) * 100).to_integral_value())


def indice(linhas, chave):
    resultado = defaultdict(list)
    for linha in linhas:
        resultado[chave(linha)].append(linha)
    return resultado


def cnpj(linha):
    return re.sub(r"\D", "", str(linha[CNPJ] or "")).zfill(14) if linha[CNPJ] else ""


def chave_contrato(linha):
    return (linha[CHAMADA], linha[ANO], cnpj(linha), linha["PROJETO"], linha["DATA DOU CONTRATAÇÃO"])


def recorte(linhas):
    return [x for x in linhas if x[ANO] == 2024 and x[CHAMADA] in CHAMADAS.values()]


def gerar():
    agregados_selecao = indice(ler("selecionados_agregados-2.xlsx"), cnpj)
    agregados_contrato = indice(ler("contratados_agregados-2.xlsx"), cnpj)
    selecoes = indice(recorte(ler("listagem_selecionados-2.xlsx")), lambda r: (r[CHAMADA], str(r["Nº INSCRIÇÃO"])))
    contratos = indice(recorte(ler("listagem-contratados-2.xlsx", "Investimentos_Retornáveis")), chave_contrato)
    with (ROOT / "resultados-brde.csv").open() as f:
        propostas = list(csv.DictReader(f))
    dados = []
    for p in propostas:
        chave = (CHAMADAS[p["modalidade"]], p["id"])
        candidatas = selecoes.get(chave, [])
        registro = dict(p, selecionado=int(p["selecionado"]), ano_edital=2024, ano_selecao=2026,
                        vocacionada=p["vocacionada"] == "True", cnpj="", contrato="", contratado=None,
                        desembolsado=None, cadastro_selecao=None, cadastro_contrato=None,
                        data_contrato="", conciliacao="Sem vínculo localizado nesta edição")
        if len(candidatas) == 1:
            sel = candidatas[0]
            identificador = cnpj(sel)
            registro.update(cnpj=identificador, cadastro_selecao=identificador in agregados_selecao,
                            cadastro_contrato=identificador in agregados_contrato)
            registros = contratos.get(chave_contrato(sel), [])
            if len(registros) == 1 and identificador and sel["Nº CONTRATO"] and sel["DATA DOU CONTRATAÇÃO"]:
                c = registros[0]
                valores = ("VALOR CONTRATAÇÃO", "DESEMBOLSO FINAL")
                if all(centavos(c[k]) == centavos(sel[k]) for k in valores):
                    registro.update(contrato=str(sel["Nº CONTRATO"]), contratado=centavos(c[valores[0]]),
                                    desembolsado=centavos(c[valores[1]]),
                                    data_contrato=sel["DATA DOU CONTRATAÇÃO"].date().isoformat(),
                                    conciliacao="Contrato conciliado")
                else:
                    registro["conciliacao"] = "Valores divergentes, revisão pendente"
            else:
                registro["conciliacao"] = "Seleção localizada, contrato sem correspondência única"
        elif candidatas:
            registro["conciliacao"] = "Inscrição com múltiplos registros, revisão pendente"
        dados.append(registro)
    assert len({(x["modalidade"], x["id"]) for x in dados}) == len(dados) == 150
    for modalidade, quantidade, total in (("Cinema",91,25766995941),("TV/VoD",59,18883436708)):
        grupo = [r for r in dados if r["modalidade"] == modalidade]
        assert len(grupo) == quantidade and sum(r["selecionado"] for r in grupo) == total
    numeros = [r["contrato"] for r in dados if r["contrato"]]
    assert len(numeros) == len(set(numeros))
    with (ROOT / "projetos.csv").open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=dados[0])
        w.writeheader()
        w.writerows(dados)
    (ROOT / "projetos.js").write_text("const projetos = " + json.dumps(dados, ensure_ascii=False, separators=(",",":")) + ";\n")
    for nome in sorted(FONTES.glob("*.xlsx")):
        print(hashlib.sha256(nome.read_bytes()).hexdigest(), nome.name)
    for grupo in (dados, [r for r in dados if r["vocacionada"]]):
        print(len(grupo), sum(r["selecionado"] for r in grupo), sum(bool(r["contrato"]) for r in grupo), sum(r["contratado"] or 0 for r in grupo), sum(r["desembolsado"] or 0 for r in grupo))
if __name__ == "__main__":
    gerar()

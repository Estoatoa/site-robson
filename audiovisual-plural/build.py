"""Compile public/index.html from the reviewable editorial fragments."""
from pathlib import Path
import csv
from html import escape
root = Path(__file__).resolve().parent
templates = root / "templates"
page = (templates / "index.html").read_text()
for fragment in ("judicial", "carta"):
    page = page.replace("{{"+fragment+"}}", (templates / (fragment+".html")).read_text())
with (root / "public/research/projetos.csv").open(encoding="utf-8", newline="") as source:
    rows = [row for row in csv.DictReader(source) if row["vocacionada"] == "True"]
companies = {}
for row in rows:
    companies.setdefault((row["empresa"], row["uf"]), []).append(row)
cards = []
for (name, state), projects in sorted(companies.items(), key=lambda item: item[0][0].casefold()):
    items = "".join('<li><strong>' + escape(project["projeto"]) + '</strong><span>' + escape(project["modalidade"]) + '</span></li>' for project in projects)
    cards.append('<article class="empresa-card"><h3>' + escape(name) + '</h3><p class="empresa-uf">' + escape(state) + '</p><ul>' + items + '</ul></article>')
directory = '<section id="empresas"><p class="eyebrow">Quem está no centro da disputa</p><h2>Empresas vocacionadas e seus projetos</h2><p>As políticas afirmativas questionadas na ação do SIAESP dizem respeito às condições de acesso de empresas como estas ao financiamento audiovisual. A lista reúne empresas marcadas como vocacionadas nas atas finais dos editais de Cinema e TV/VoD de 2024 e os respectivos projetos selecionados.</p><p class="contexto-judicial"><strong>O alcance da ação ainda precisa ser confirmado.</strong> O questionamento às reservas pode afetar as condições de acesso ao fomento, mas não há confirmação nesta edição de decisão ou efeito sobre cada empresa, projeto ou contrato. A marcação nas atas não identifica, por si só, o critério decisivo da seleção. Estar nesta lista não significa adesão à carta ou participação no processo.</p><p>' + str(len(companies)) + ' empresas · ' + str(len(rows)) + ' propostas selecionadas. Recorte dos resultados de 2024; não representa todas as empresas vocacionadas do país.</p><p><a href="https://brde.com.br/wp-content/uploads/2026/04/Ata-do-Resultado-final-da-decisao-final_-Seletivo-Cinema_retificacao-23.04.26.pdf">Ata de Cinema</a> · <a href="https://brde.com.br/wp-content/uploads/2026/02/Ata-do-Resultado-final_-TV-VOD_publicacao-11.02.2026-Republicacao.pdf">Ata de TV/VoD</a> · <a href="research/metodologia.md">Metodologia do cruzamento</a></p><div class="empresas-grid">' + ''.join(cards) + '</div></section>'
page = page.replace('{{vocacionadas}}', directory)
page = page.replace('<div id="economics"></div>', '<h3>Empresas vocacionadas nos editais de produção de 2024</h3><p>Das 150 propostas selecionadas para Cinema e TV/VoD, 48 têm marcação de empresa vocacionada nas atas. Juntas, somam R$ 113,48 milhões selecionados. Até outubro de 2026, o cruzamento identificou contratos para 19 dessas propostas. A marcação informa o enquadramento registrado pela comissão.</p><p><a class="button" href="research/observatorio.html">Explorar projetos e investimentos</a></p>')
page = page.replace('<div id="downloads"></div>', '<p><a href="research/observatorio.html">Consultar bases, resultados e metodologia de cruzamento</a></p><p><a href="qr-pos-aprovacao.png" download>Baixar QR Code do endereço provisório</a>. Divulgação após aprovação e publicação.</p>')
(root / "public/index.html").write_text(page)

# The portfolio serves this directory directly through GitHub Pages.
import re
site_page = re.sub(
    r'(href|src)="(?!#|https?:|/)([^"]+)"',
    r'\1="public/\2"',
    page,
)
(root / "index.html").write_text(site_page)

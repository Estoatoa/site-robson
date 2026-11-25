"use strict";
const el = id => document.getElementById(id);
const moeda = centavos => new Intl.NumberFormat("pt-BR", {style:"currency", currency:"BRL"}).format(centavos / 100);
const normal = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
const nomesFases = {selecionado:"selecionados",contratado:"contratados",desembolsado:"desembolsados"};
function elemento(tipo, texto, classe) {
  const node = document.createElement(tipo);
  if (texto !== undefined) node.textContent = texto;
  if (classe) node.className = classe;
  return node;
}
for (const uf of [...new Set(projetos.map(r => r.uf))].sort()) el("uf").append(new Option(uf,uf));

function atualizar() {
  const reserva = el("reserva").value;
  const fase = el("fase").value;
  const grupo = el("grupo").value;
  const consulta = normal(el("busca").value);
  const filtrados = projetos.filter(r => {
    if (el("uf").value && r.uf !== el("uf").value) return false;
    if (el("modalidade").value && r.modalidade !== el("modalidade").value) return false;
    if ((reserva === "voc" || reserva === "ambos") && !r.vocacionada) return false;
    if ((reserva === "reg" || reserva === "ambos") && !r.regional) return false;
    return normal([r.id,r.empresa,r.projeto].join(" ")).includes(consulta);
  });
  const documentados = filtrados.filter(r => r[fase] !== null);
  el("npropostas").textContent = filtrados.length;
  el("ncnpj").textContent = new Set(filtrados.map(r => r.cnpj).filter(Boolean)).size;
  const ncontratos = filtrados.filter(r => r.contrato).length;
  el("ncontratos").textContent = ncontratos;
  el("cobertura").textContent = "As atas identificam os enquadramentos de cada proposta. A conciliação confirmou contratos para " + ncontratos + " das " + filtrados.length + " propostas deste recorte.";
  const grupos = new Map();
  for (const r of documentados) {
    let id = r[grupo];
    if (grupo === "empresa") id = r.cnpj || r.empresa;
    if (grupo === "projeto") id = r.modalidade + r.id;
    if (!grupos.has(id)) grupos.set(id, {nome:r[grupo], valor:0});
    grupos.get(id).valor += r[fase];
  }
  const valores = [...grupos.values()].sort((a,b) => b.valor-a.valor);
  const soma = documentados.reduce((s,r) => s+r[fase],0);
  el("total").textContent = documentados.length ? moeda(soma)+" "+nomesFases[fase] : "Nenhum valor documentado neste recorte";
  el("nota").textContent = grupo === "empresa" ? "Empresas com CNPJ são agrupadas por identificador. Para os demais registros, o agrupamento utiliza o nome publicado na ata." : "Valores nominais. O ano do edital é 2024 e as decisões finais são de 2026.";
  const barras = el("barras"); barras.replaceChildren();
  for (const g of valores) {
    const row = elemento("div",undefined,"bar");
    const track = elemento("div",undefined,"track");
    const fill = elemento("div",undefined,"fill");
    fill.style.width = (valores[0].valor ? g.valor/valores[0].valor*100 : 0)+"%";
    track.append(fill);row.append(elemento("span",g.nome), track, elemento("span",moeda(g.valor),"amount"));
    barras.append(row);
  }
  el("titular").textContent = "Consultar as propostas deste recorte ("+filtrados.length+")";
  const body = el("registros"); body.replaceChildren();
  for (const r of filtrados) {
    const row = elemento("tr"); const nome = elemento("td",r.projeto);
    nome.append(elemento("small",r.empresa),elemento("small",r.modalidade+" · protocolo "+r.id));
    row.append(nome,elemento("td",r.uf),elemento("td",[r.vocacionada?"Empresa vocacionada":"",r.regional||""].filter(Boolean).join(" · ")||"Sem marcação nas duas categorias"));
    for (const stage of ["selecionado","contratado","desembolsado"]) row.append(elemento("td",r[stage] === null ? "Sem vínculo" : moeda(r[stage])));
    body.append(row);
  }
}
for (const input of document.querySelectorAll("input,select")) input.addEventListener("input", atualizar);
atualizar();

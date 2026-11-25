"""Compile public/index.html from the reviewable editorial fragments."""
from pathlib import Path
root = Path(__file__).resolve().parent
templates = root / "templates"
page = (templates / "index.html").read_text()
for fragment in ("judicial", "carta"):
    page = page.replace("{{"+fragment+"}}", (templates / (fragment+".html")).read_text())
page = page.replace('<div id="economics"></div>', '<h3>Empresas vocacionadas nos editais de produção de 2024</h3><p>Das 150 propostas selecionadas para Cinema e TV/VoD, 48 têm marcação de empresa vocacionada nas atas. Juntas, somam R$ 113,48 milhões selecionados. Até outubro de 2026, o cruzamento identificou contratos para 19 dessas propostas. A marcação informa o enquadramento registrado pela comissão.</p><p><a class="button" href="research/observatorio.html">Explorar projetos e investimentos</a></p>')
page = page.replace('<div id="downloads"></div>', '<p><a href="research/observatorio.html">Consultar bases, resultados e metodologia de cruzamento</a></p><p><a href="qr-pos-aprovacao.png" download>Baixar QR Code do endereço provisório</a>. Divulgação após aprovação e publicação.</p>')
(root / "public/index.html").write_text(page)

"""Exporta a carta demonstrativa e o mural autorizado no instante da consulta."""
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from io import BytesIO

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer


class Carta(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocks = []
        self.tag = None
        self.parts = []
        self.link = False

    def handle_starttag(self, tag, attrs):
        if tag in ("h2","p"):
            self.tag, self.parts, self.link = tag, [], False
        elif tag == "a" and self.tag:
            self.link = True

    def handle_data(self, text):
        if self.tag:
            self.parts.append(text)

    def handle_endtag(self, tag):
        if tag == self.tag:
            if not self.link and self.parts:
                self.blocks.append((tag,"".join(self.parts)))
            self.tag = None


def render(letter, public_signers, version):
    parser = Carta()
    parser.feed(letter.read_text(encoding="utf-8"))
    output = BytesIO()
    pdf = SimpleDocTemplate(output,pagesize=A4,leftMargin=22*mm,rightMargin=22*mm,
                            topMargin=18*mm,bottomMargin=18*mm,title="Audiovisual Plural | Carta coletiva")
    style = getSampleStyleSheet()
    style["Title"].textColor = HexColor("#18433E")
    style["BodyText"].fontSize = 11
    style["BodyText"].leading = 15
    blocks = []
    for tag, text in parser.blocks:
        blocks.extend([Paragraph(escape(text),style["Title" if tag=="h2" else "BodyText"]),Spacer(1,3*mm)])
    blocks.extend([PageBreak(),Paragraph("Anexo de signatários",style["Title"]),
                   Paragraph("Versão %s · Consulta em %s UTC" % (escape(version),datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M")),style["BodyText"]),
                   Paragraph("Adesões verificadas com divulgação autorizada: %d." % public_signers["total"],style["BodyText"]),Spacer(1,4*mm)])
    labels = {"vocacionada":"Empresa vocacionada","regional":"Empresa regional","trabalhador":"Trabalhador ou MEI","entidade":"Entidade apoiadora"}
    for item in public_signers["signatarios"]:
        line = "%s · %s · %s" % (item["nome"],item["uf"],", ".join(labels[c] for c in item["categorias"]))
        blocks.append(Paragraph(escape(line),style["BodyText"]))
    pdf.build(blocks)
    return output.getvalue()

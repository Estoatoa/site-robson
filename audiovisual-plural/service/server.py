"""Serviço de demonstração. Requer Python 3.9+ e Pillow."""
import argparse
import base64
import binascii
import io
import json
import math
import mimetypes
import os
from pathlib import Path
import re
import sqlite3
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlsplit

from PIL import Image, ImageOps


VERSION = "minuta-2026-11-25"
ROOT = Path(__file__).resolve().parent.parent / "public"
DEFAULT_DB = Path.home() / ".audiovisual-plural-demo" / "cadastros.sqlite3"
CATEGORIES = {"vocacionada", "regional", "trabalhador", "entidade"}
STATES = set("AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split())
LIMIT = 1_500_000
SCHEMA = """
CREATE TABLE IF NOT EXISTS adesao (
 id TEXT PRIMARY KEY, identidade TEXT NOT NULL, versao TEXT NOT NULL,
 nome TEXT NOT NULL, cnpj TEXT, uf TEXT NOT NULL, representante TEXT NOT NULL,
 email TEXT NOT NULL, projeto TEXT, publicar INTEGER NOT NULL, publicar_logo INTEGER NOT NULL,
 logo BLOB, estado TEXT NOT NULL DEFAULT 'pendente',
 recebido TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, moderado TEXT,
 UNIQUE(identidade, versao)
);
CREATE TABLE IF NOT EXISTS categoria (
 adesao_id TEXT NOT NULL REFERENCES adesao(id) ON DELETE CASCADE, tipo TEXT NOT NULL,
 PRIMARY KEY(adesao_id,tipo)
);
CREATE TABLE IF NOT EXISTS pesquisa (
 id TEXT PRIMARY KEY, uf TEXT NOT NULL, ano INTEGER NOT NULL, empregos INTEGER,
 receita_centavos INTEGER, consentimento INTEGER NOT NULL, recebido TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
"""


def connect(path):
    db = sqlite3.connect(path, timeout=10)
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA foreign_keys=ON")
    return db


def field(data, key, limit, optional=False):
    value = data.get(key, "")
    if not isinstance(value, str) or len(value) > limit or (not optional and not value.strip()):
        raise ValueError("Confira o campo " + key + ".")
    return value.strip()


def state(data):
    uf = field(data, "uf", 2).upper()
    if uf not in STATES:
        raise ValueError("Selecione uma unidade da federação.")
    return uf


def cnpj_number(raw):
    number = re.sub(r"[./\s-]", "", raw).upper()
    if not re.fullmatch(r"[A-Z0-9]{12}[0-9]{2}", number) or len(set(number)) == 1:
        raise ValueError("CNPJ inválido.")
    weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    for length in (12, 13):
        remainder = sum((ord(c) - 48) * w for c, w in zip(number[:length], weights[-length:])) % 11
        if int(number[length]) != (0 if remainder < 2 else 11 - remainder):
            raise ValueError("Confira os dígitos verificadores do CNPJ.")
    return number


def logo_png(data):
    if not data:
        return None
    if not isinstance(data, str):
        raise ValueError("Logotipo inválido.")
    header, _, payload = data.partition(",")
    formats = {"data:image/png;base64": "PNG", "data:image/jpeg;base64": "JPEG"}
    if header not in formats:
        raise ValueError("Use uma imagem PNG ou JPEG de até 1 MB.")
    try:
        raw = base64.b64decode(payload, validate=True)
        if len(raw) > 1_000_000:
            raise ValueError()
        with Image.open(io.BytesIO(raw)) as img:
            if img.format != formats[header] or img.width * img.height > 4_000_000:
                raise ValueError()
            img = ImageOps.exif_transpose(img).convert("RGBA")
            img.thumbnail((512, 512))
            out = io.BytesIO()
            img.info.clear()
            img.save(out, "PNG")
            return out.getvalue()
    except (binascii.Error, OSError, ValueError, Image.DecompressionBombError) as exc:
        raise ValueError("Imagem inválida. Use PNG ou JPEG até 1 MB e 4 megapixels.") from exc


def submit(db, data):
    if data.get("versao") != VERSION or data.get("aceite") is not True:
        raise ValueError("Confirme a leitura da versão atual da carta.")
    nome = field(data, "nome", 160)
    representante = field(data, "representante", 160)
    email = field(data, "email", 254).casefold()
    if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        raise ValueError("Informe um e-mail válido.")
    cats = data.get("categorias")
    if not isinstance(cats, list) or not cats or any(not isinstance(c, str) or c not in CATEGORIES for c in cats):
        raise ValueError("Selecione ao menos uma categoria válida.")
    cnpj = field(data, "cnpj", 24, True)
    if cnpj:
        cnpj = cnpj_number(cnpj)
    elif {"vocacionada", "regional"}.intersection(cats):
        raise ValueError("Informe o CNPJ da empresa.")
    if any(type(data.get(key, False)) is not bool for key in ("publicar", "publicar_logo")):
        raise ValueError("Confira as autorizações de publicação.")
    publicar = data.get("publicar", False)
    publicar_logo = publicar and data.get("publicar_logo", False)
    logo = logo_png(data.get("logo"))
    if logo and not publicar_logo:
        raise ValueError("Autorize a publicação do logotipo ou remova a imagem.")
    uf = state(data)
    projeto = field(data, "projeto", 300, True)
    identity = "cnpj:" + cnpj if cnpj else "email:" + email
    aid = uuid.uuid4().hex
    with db:
        entry = db.execute("""INSERT INTO adesao
            (id,identidade,versao,nome,cnpj,uf,representante,email,projeto,publicar,publicar_logo,logo)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(identidade,versao) DO NOTHING""",
            (aid, identity, VERSION, nome, cnpj, uf, representante, email, projeto, publicar, publicar_logo, logo))
        if entry.rowcount:
            db.executemany("INSERT INTO categoria VALUES (?,?)", [(aid,c) for c in sorted(set(cats))])
    return {"mensagem":"Solicitação recebida para conferência na demonstração."}


def survey(db, data):
    uf = state(data)
    ano = data.get("ano")
    jobs = data.get("empregos")
    revenue = data.get("receita")
    if data.get("consentimento") is not True:
        raise ValueError("Autorize o uso da resposta no levantamento demonstrativo.")
    if type(ano) is not int or not 2000 <= ano <= 2026:
        raise ValueError("Informe o ano de referência entre 2000 e 2026.")
    if jobs is None and revenue is None:
        raise ValueError("Preencha empregos ou receita.")
    if jobs is not None and (type(jobs) is not int or not 0 <= jobs <= 10_000_000):
        raise ValueError("Confira a quantidade de empregos.")
    if revenue is not None and (type(revenue) not in (int,float) or not 0 <= revenue <= 1e15 or not math.isfinite(revenue)):
        raise ValueError("Confira a receita anual.")
    with db:
        db.execute("INSERT INTO pesquisa(id,uf,ano,empregos,receita_centavos,consentimento) VALUES(?,?,?,?,?,1)",
                   (uuid.uuid4().hex, uf, ano, jobs, None if revenue is None else round(revenue*100)))
    return {"mensagem":"Resposta voluntária registrada na demonstração."}


def mural(db):
    rows = db.execute("""SELECT a.id,a.nome,a.uf,group_concat(c.tipo) cats,
        (a.publicar_logo AND a.logo IS NOT NULL) has_logo
        FROM adesao a JOIN categoria c ON a.id=c.adesao_id
        WHERE a.publicar AND a.estado='verificada' AND a.versao=?
        GROUP BY a.id ORDER BY a.nome COLLATE NOCASE""",(VERSION,))
    items = []
    for row in rows:
        item = {"nome":row["nome"], "uf":row["uf"], "categorias":sorted(row["cats"].split(","))}
        if row["has_logo"]:
            item["logo"] = "api/logos/" + row["id"]
        items.append(item)
    return {"total":len(items),"signatarios":items}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def send_content(self, code, content, kind="application/json; charset=utf-8"):
        if isinstance(content, dict):
            content = json.dumps(content, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(content)))
        self.send_header("X-Content-Type-Options","nosniff")
        self.send_header("Cache-Control","no-store")
        self.end_headers()
        self.wfile.write(content)

    def route(self):
        path = unquote(urlsplit(self.path).path)
        prefix = "/audiovisual-plural"
        return path[len(prefix):] if path.startswith(prefix+"/") else path

    def do_GET(self):
        path = self.route()
        if path == "/audiovisual-plural":
            self.send_response(308)
            self.send_header("Location", "/audiovisual-plural/")
            self.end_headers()
            return
        if path == "/api/mural":
            with connect(self.server.db_path) as db:
                self.send_content(200,mural(db))
        elif path == "/api/carta.pdf":
            with connect(self.server.db_path) as db:
                public_signers = mural(db)
            try:
                from carta_pdf import render as render_letter
            except ModuleNotFoundError:
                if public_signers["total"] == 0:
                    self.send_content(200,(ROOT/"carta-coletiva.pdf").read_bytes(),"application/pdf")
                else:
                    self.send_content(503,{"erro":"Instale ReportLab para gerar o anexo atualizado."})
                return
            self.send_content(200,render_letter(ROOT.parent/"templates"/"carta.html",public_signers,VERSION),"application/pdf")
        elif re.fullmatch(r"/api/logos/[a-f0-9]{32}", path):
            with connect(self.server.db_path) as db:
                row = db.execute("""SELECT logo FROM adesao WHERE id=? AND publicar AND publicar_logo
                    AND estado='verificada' AND versao=?""",(path.split("/")[-1],VERSION)).fetchone()
            if row and row["logo"]:
                self.send_content(200,row["logo"],"image/png")
            else:
                self.send_content(404,{"erro":"Imagem indisponível."})
        else:
            file = (ROOT / (path.lstrip("/") or "index.html")).resolve()
            if ROOT.resolve() not in file.parents or not file.is_file():
                self.send_content(404,{"erro":"Página indisponível."})
                return
            body = file.read_bytes()
            if file == ROOT / "index.html":
                body = body.replace(b"<title>", b'<meta name="servico-local" content="ativo"><title>', 1)
            self.send_content(200,body,mimetypes.guess_type(file)[0] or "application/octet-stream")

    def do_POST(self):
        origin = self.headers.get("Origin")
        if origin and urlsplit(origin).netloc != self.headers.get("Host"):
            self.send_content(403,{"erro":"Origem inválida."})
            return
        routes = {"/api/adesoes":submit, "/api/pesquisa":survey}
        action = routes.get(self.route())
        if not action:
            self.send_content(404,{"erro":"Recurso indisponível."})
            return
        if self.headers.get_content_type() != "application/json":
            self.send_content(415,{"erro":"Envie JSON."})
            return
        try:
            size = int(self.headers.get("Content-Length",0))
            if not 0 < size <= LIMIT:
                self.send_content(413,{"erro":"Envio vazio ou acima do limite."})
                return
            data = json.loads(self.rfile.read(size))
            if not isinstance(data,dict):
                raise ValueError("Formato inválido.")
            with connect(self.server.db_path) as db:
                result = action(db,data)
            self.send_content(200,result)
        except (ValueError,UnicodeError) as exc:
            self.send_content(400,{"erro":str(exc)})
        except sqlite3.Error:
            self.send_content(503,{"erro":"Banco temporariamente indisponível."})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db",type=Path,default=DEFAULT_DB)
    cmd = parser.add_subparsers(dest="action",required=True)
    serve = cmd.add_parser("servir")
    serve.add_argument("--port",type=int,default=8080)
    cmd.add_parser("pendentes")
    for action in ("verificar","retirar","excluir"):
        cmd.add_parser(action).add_argument("id")
    args = parser.parse_args()
    os.umask(0o077)
    path = args.db.expanduser().resolve()
    if path == ROOT.resolve() or ROOT.resolve() in path.parents:
        parser.error("O banco precisa ficar fora do diretório público.")
    path.parent.mkdir(parents=True,exist_ok=True)
    with connect(path) as db:
        db.executescript(SCHEMA)
        if args.action == "pendentes":
            for row in db.execute("SELECT id,nome,uf,cnpj,representante,email,versao FROM adesao WHERE estado='pendente'"):
                print(json.dumps(dict(row),ensure_ascii=False))
        elif args.action in ("verificar","retirar","excluir"):
            if args.action == "excluir":
                changed = db.execute("DELETE FROM adesao WHERE id=?",(args.id,))
            else:
                status = "verificada" if args.action=="verificar" else "retirada"
                changed = db.execute("UPDATE adesao SET estado=?, moderado=CURRENT_TIMESTAMP WHERE id=?",(status,args.id))
            if not changed.rowcount:
                parser.error("Registro inexistente.")
    if args.action == "servir":
        with ThreadingHTTPServer(("127.0.0.1",args.port),Handler) as server:
            server.db_path = path
            print(f"http://127.0.0.1:{server.server_port}/audiovisual-plural/", flush=True)
            server.serve_forever()


if __name__ == "__main__":
    main()

# Serviço local de demonstração

Requer Python 3.9 ou superior com Pillow e ReportLab. A partir da pasta audiovisual-plural, execute `python3 -m pip install Pillow reportlab` quando necessário e `python3 service/server.py servir`. Abra http://127.0.0.1:8080/audiovisual-plural/. Use dados fictícios. O servidor lê os arquivos da pasta public e atende somente no computador local. O GitHub Pages serve a parte estática e não executa este serviço.

O SQLite é criado em ~/.audiovisual-plural-demo/cadastros.sqlite3 com acesso restrito ao usuário do sistema. Para escolher outro banco, informe `--db /caminho/privado/base.sqlite3` antes do comando. Preserve o banco fora da pasta pública e do repositório. Ele contém campos privados em texto legível ao operador.

## Moderação

Liste as solicitações com `python3 service/server.py pendentes`. Confira o CNPJ, quando houver, e a autorização do representante por canal institucional. A publicação exige verificação humana e autorização registrada. Execute `python3 service/server.py verificar ID` após a conferência. Para retirar do mural, use `retirar ID`. Para apagar uma adesão e as suas categorias, use `excluir ID`. O logotipo só aparece quando autorizado, após conversão para PNG com remoção de metadados.

O mural conta uma linha por adesão verificada e autorizada da versão vigente. Uma adesão pode ter várias categorias. A chave de deduplicação usa a versão e o CNPJ normalizado ou, na ausência de CNPJ, o e-mail normalizado. Pedidos repetidos preservam o primeiro registro. Para correção, confirme a identidade por canal institucional, exclua e peça novo aceite. Variações de e-mail de pessoa física e mudanças de CNPJ exigem conferência humana. O levantamento voluntário contém respostas anônimas por UF e ano, sem vínculo com o mural. Repetições são possíveis. Não some as respostas como estimativa setorial ou contagem de empresas únicas.

## Publicação futura

Antes da coleta real, aprove a carta e troque a versão no cliente e no serviço. Identifique o controlador, a finalidade, os prazos de retenção e o canal para exercício de direitos na política aprovada. Para hospedagem independente, sirva a pasta public por HTTPS, encaminhe api/ ao serviço com o mesmo domínio e limite solicitações no proxy. Mantenha o banco em volume privado com controle de acesso, backups protegidos e procedimento de eliminação. Não exponha diretamente o servidor demonstrativo. O envio de dados pessoais a Google ou a outro provedor exige configuração própria e decisão do controlador.

O endpoint GET api/carta.pdf compõe o PDF lendo a carta vigente e inserindo o mural autorizado no instante da consulta. O PDF estático incluído na demonstração offline permanece um retrato da edição inicial.

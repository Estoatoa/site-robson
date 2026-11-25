# Audiovisual Plural

Edição de revisão de 25 de novembro de 2026. A carta é uma minuta. A produção e a coleta institucional dependem de aprovação.

## Demonstração

Abra public/index.html no navegador. A edição estática funciona sem servidor e simula o envio sem guardar respostas. Mantenha os arquivos juntos para consultar o observatório, baixar fontes, carta e QR.

Para testar a persistência, use Python 3 com Pillow e ReportLab e execute `python3 service/server.py servir` nesta pasta. Abra http://127.0.0.1:8080/audiovisual-plural/. A edição local grava em SQLite fora da área pública. Os comandos para verificar e retirar inscrições, limites de deduplicação e controles de acesso estão em service/README.md. O PDF gerado em api/carta.pdf inclui apenas os signatários verificados e autorizados da versão vigente.

## Organização

public reúne a página, recursos visuais e observatório. templates contém a redação da carta, a apuração jurídica e a estrutura editorial. Execute `python3 build.py` após editar os fragmentos. Atualize também a edição estática do PDF quando mudar a carta. Os dados individuais do levantamento e os cadastros de teste nunca integram a versão distribuída.

A paleta combina verde-petróleo (#102E32), cobre claro (#E8AC87), verde-sálvia (#DCE6DB) e branco de papel (#F8F7F1). A tipografia usa Georgia nos títulos e a fonte de sistema para formulários e números.

## Publicação e migração

1. Aprove a redação, a versão e o aviso de privacidade. Defina o responsável pelos dados, o canal de contato, o período de retenção e quem verifica as adesões. Comece a coleta oficial com banco separado e versão própria. Preserve a carta correspondente a cada aceite.
2. Para a demonstração estática em diasrobson.com/audiovisual-plural/, publique apenas o conteúdo de public nessa subpasta do artefato de hospedagem, depois de aprovação. Preserve o CNAME existente e as demais rotas. O GitHub Pages não executa o serviço Python.
3. Para a coleta, hospede o serviço atrás de um proxy HTTPS de mesma origem. Sirva os arquivos de public, encaminhe api/ ao serviço privado e use a página inicial servida pelo backend para ativar os formulários persistentes. Preserve o cabeçalho Host. Defina limites de requisições e backups privados. Teste o ciclo adesão, deduplicação, moderação, mural, retirada e PDF com dados fictícios.
4. Para audiovisualplural.org, configure o domínio no provedor escolhido, aplique os registros DNS fornecidos por ele e valide HTTPS. Monte o site na raiz, com api/ na mesma origem. Os caminhos internos são relativos. Se houver dados oficiais, pause escritas, faça backup consistente do SQLite e valide contagens e anexos antes de reabrir a coleta.
5. Depois da validação, redirecione apenas o caminho provisório e seus descendentes para a nova origem, preservando o restante de diasrobson.com. Atualize o QR e verifique os dois endereços em celular. O QR incluído aponta ao endereço provisório, reservado para depois da publicação.

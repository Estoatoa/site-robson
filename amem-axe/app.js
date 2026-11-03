(() => {
  const DATA = window.AMEM_AXE_CONTENT;
  const views = [...document.querySelectorAll(".view")];
  const menu = document.querySelector(".menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const toast = document.querySelector(".toast");

  const esc = (value = "") => value.replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);

  const code = (prefix, index) => prefix + "-" + String(index + 1).padStart(2, "0");

  function block({ id, label, title, body, status = "Em trabalho", className = "" }) {
    return `<article class="text-block ${className}" id="${id}" data-copy="${esc(label + "\n\n" + body)}">
      <div class="block-meta"><span>${esc(label)} · ${esc(status)}</span><button class="copy-block" type="button">Copiar trecho</button></div>
      ${title ? `<h2>${esc(title)}</h2>` : ""}
      <p>${esc(body)}</p>
    </article>`;
  }

  function pageHead(kicker, title, intro) {
    return `<header class="page-head"><div><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1></div><p class="intro">${esc(intro)}</p></header>`;
  }

  function renderSource(doc, prefix) {
    let n = 0;
    return doc.paragraphs.map(p => {
      const id = code(prefix, n++);
      const meta = `<span class="block-meta" id="${id}"><span>${id}</span><button class="copy-block" type="button" data-copy="${esc(p.text)}">Copiar</button></span>`;
      if (p.namedStyleType === "HEADING_1") return `${meta}<h2 class="source-heading">${esc(p.text)}</h2>`;
      if (p.namedStyleType === "HEADING_2") return `${meta}<h3 class="source-subheading">${esc(p.text)}</h3>`;
      if (p.isListItem) return `${meta}<p class="source-list">• ${esc(p.text)}</p>`;
      return `${meta}<p class="source-paragraph">${esc(p.text)}</p>`;
    }).join("");
  }

  function sectionAfter(doc, headingStart, stopAtHeading = true) {
    const start = doc.paragraphs.findIndex(p => p.text.trim().toLowerCase().startsWith(headingStart.toLowerCase()));
    if (start < 0) return [];
    const out = [];
    for (let i = start + 1; i < doc.paragraphs.length; i++) {
      const p = doc.paragraphs[i];
      if (stopAtHeading && p.namedStyleType === "HEADING_1") break;
      out.push(p);
    }
    return out;
  }

  function joinText(list) {
    return list.map(p => p.text).join("\n\n");
  }

  const directorBio = (() => {
    const p = DATA.proposta.paragraphs.find(x => x.text.trim() === "O diretor-narrador");
    if (!p) return "";
    const ix = DATA.proposta.paragraphs.indexOf(p);
    return DATA.proposta.paragraphs[ix + 1]?.text || "";
  })();

  const hypothesis = (() => {
    const p = DATA.dossie.paragraphs.find(x => x.text.trim() === "Hipótese cinematográfica");
    if (!p) return [];
    const ix = DATA.dossie.paragraphs.indexOf(p);
    return DATA.dossie.paragraphs.slice(ix + 1, ix + 3);
  })();

  function renderInicio() {
    return `<div class="wrap">
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">documentário em desenvolvimento</p>
          <h1>AMÉM<br><em>AXÉ</em></h1>
          <p class="hero-copy">Um cineasta negro investiga como pessoas negras evangélicas e de terreiro passaram a se enxergar como inimigas — e o que seus encontros revelam sobre fé, memória e sobrevivência.</p>
          <div class="status-strip"><span class="tag work">em desenvolvimento</span><span class="tag source">Rio de Janeiro</span><span class="tag ready">70 min · documentário</span></div>
        </div>
        <figure class="hero-art">
          <img src="./assets/amem-axe-symbol-portrait.jpeg?v=1.12-fb93cb3" alt="Braço negro ergue um objeto de ferro que une símbolos do cristianismo e das religiões de matriz africana.">
          <figcaption>Uma imagem para a encruzilhada entre Amém e Axé.</figcaption>
        </figure>
      </section>
      <section class="lede-grid">
        <div><p class="eyebrow">o que há aqui</p><h2>Do filme ao edital, em uma leitura direta.</h2></div>
        <div>
          <p class="large">Aqui você encontra a sinopse, a visão do diretor, os pontos fortes da proposta, o roteiro em desenvolvimento, a pesquisa de base e o acompanhamento dos materiais exigidos pela RioFilme.</p>
          <div class="route-list">
            <button class="route" data-go="direcao"><span>01</span><strong>O filme · textos aprovados</strong><span>→</span></button>
            <button class="route" data-go="travessia"><span>02</span><strong>Travessia · relato autobiográfico</strong><span>→</span></button>
            <button class="route" data-go="roteiro"><span>03</span><strong>Roteiro · personagens e abordagem</strong><span>→</span></button>
            <button class="route" data-go="pesquisa"><span>04</span><strong>Investigação · perguntas, hipóteses e dados</strong><span>→</span></button>
            <button class="route" data-go="riofilme"><span>05</span><strong>Edital · entregas e pendências</strong><span>→</span></button>
            <button class="route" data-go="versoes"><span>06</span><strong>Arquivo · fontes e versões</strong><span>→</span></button>
          </div>
        </div>
      </section>
    </div>`;
  }

  function renderDirecao() {
    const sinopse = DATA.approved?.sinopse || joinText(sectionAfter(DATA.proposta, "e) Sinopse"));
    const visao = DATA.approved?.visao || joinText(sectionAfter(DATA.proposta, "f) Visão"));
    const pontos = DATA.approved?.pontosFortes || joinText(sectionAfter(DATA.proposta, "g) Pontos fortes"));
    return `<div class="wrap">
      ${pageHead("textos aprovados", "O filme", "Sinopse, visão do diretor e pontos fortes preparados para a inscrição. O roteiro documental possui uma página própria.")}
      <figure class="symbol-band">
        <img src="./assets/amem-axe-symbol-wide.png?v=1.12-fb93cb3" alt="Mão sustenta um objeto de ferro que aproxima símbolos do cristianismo e das religiões de matriz africana.">
        <figcaption>O símbolo central do projeto: duas tradições ligadas pelo mesmo corpo.</figcaption>
      </figure>
      <div class="editorial-layout">
        <nav class="section-index" aria-label="Nesta página">
          <a href="#DIR-04">Sinopse</a><a href="#DIR-05">Visão estética</a><a href="#DIR-06">Pontos fortes</a>
        </nav>
        <div class="editorial-content">
          ${block({id:"DIR-04",label:"DIR-04",title:"Sinopse",body:sinopse,status:"aprovada · 699 caracteres"})}
          ${block({id:"DIR-05",label:"DIR-05",title:"Visão e abordagem estética",body:visao,status:"aprovada · 2.476 caracteres"})}
          ${block({id:"DIR-06",label:"DIR-06",title:"Pontos fortes da proposta",body:pontos,status:"aprovados · 2.157 caracteres"})}
        </div>
      </div>
    </div>`;
  }

  function renderTravessia() {
    const paragraphs = DATA.autobiografia.content.split(/\n+/).map(text => text.trim()).filter(Boolean).slice(1).map(p => {
      if (p.startsWith("A teologia me deu mais segurança")) return "A teologia me deu mais segurança para subir aos púlpitos e exercer aquilo que descobri ser o dom da Palavra de Sabedoria: orientar e aconselhar diante de situações complexas. Também encontrei a Palavra de Conhecimento (ou Ciência), entendida como revelação sobrenatural de fatos ou informações ocultas. Diante da igreja, eu falava com a autoridade de um pregador imbuído da missão de anunciar as boas-novas. Mas o trabalho que considerava mais importante acontecia naquele mesmo templo, fora dos cultos.";
      if (p.startsWith("Diante daquele bebê mestiço")) return "Diante daquele bebê mestiço, nasceu a necessidade concreta de construir um enredo fundador. Escolhi fazê-lo em forma de filme. Eu precisava apresentar a ela o que significava ser brasileira, negra e mulher. Ao tentar explicar sua identidade, fui obrigado a perguntar pela minha própria brasilidade. Deparei-me com um enorme abismo entre aquilo que eu sabia e aquilo que imaginava saber. Novamente, estava diante da nudez da ignorância. Fiz aquilo de que mais gostava e que, àquela altura, sabia fazer melhor: fui aprender sobre mim mesmo e sobre minha história. Ao me deparar com as respostas evasivas de meu pai, que, já na velhice, estava mais aberto a questionar a própria existência, constatei que eu era mais uma vítima de um apagamento histórico e que estava prestes a perpetuá-lo na história de minha filha.";
      if (p.startsWith("Ela não conheceu e nem sabe exatamente")) return "Ela ainda não conhece uma igreja católica ou protestante. Porém, já conhece Dandara, Zumbi e Xangô, e sabe dar um rabo de arraia com maestria. Essa história me foi negada. Imagino que, para outras pessoas da nossa família, acessá-la seja ainda mais complexo. É com minha filha que quero começar por aí. Ainda estou em busca de respostas básicas sobre o que é o axé. Considero-me um aprendiz curioso. Minha aproximação acontece pela ancestralidade, pela música, pela capoeira, pelo coco, pelo samba e pela pesquisa. Ao mesmo tempo, continuo carregando uma grande bagagem evangélica progressista. Sou, de maneira bastante clara, um crente. A disciplina corporal aprendida durante os anos de igreja permanece em mim. Nunca bebi, nunca fumei e nunca usei drogas. Ainda assim, observo o mundo por lentes muito sóbrias e pragmáticas, construídas durante minha vida como crente e pregador.";
      return p;
    });
    const movements = [
      { id: "TRA-01", title: "O som que me levou à igreja", from: 0, to: 8 },
      { id: "TRA-02", title: "Fé, dúvida e estudo", from: 8, to: 16 },
      { id: "TRA-03", title: "Missão, paternidade e descoberta", from: 16, to: 23 },
      { id: "TRA-04", title: "O que transmito à minha filha", from: 23, to: paragraphs.length }
    ];
    const prose = (from, to) => paragraphs.slice(from, to).map((p, i) => {
      const index = from + i;
      const id = code("TRA", index);
      if (index === 18) return `<p class="travel-turn" id="${id}">${esc(p)}</p>`;
      return `<p class="source-paragraph" id="${id}">${esc(p)}</p>`;
    }).join("");
    return `<div class="wrap">
      ${pageHead("relato autobiográfico do diretor", "Travessia", "Da música que me levou à igreja à descoberta da origem quilombola: uma história de fé, dúvida, formação e memória, narrada a partir da relação com minha filha.")}
      <div class="editorial-layout travel-layout">
        <nav class="section-index travel-index" aria-label="Percurso do relato">
          <a href="#travessia-m1">01 · Infância e igreja</a>
          <a href="#travessia-m2">02 · Fé, dúvida e estudo</a>
          <a href="#travessia-m3">03 · França e descoberta</a>
          <a href="#travessia-m4">04 · O que transmito</a>
        </nav>
        <article class="editorial-content travel-content">
          <section class="travel-movement" id="travessia-m1">
            <p class="eyebrow">movimento 01</p><h2>${esc(movements[0].title)}</h2>
            ${prose(0, 5)}
            <figure class="travel-photo travel-photo-old"><img src="./assets/robson-igreja-juventude.jpeg?v=1.12-fb93cb3" alt="Robson jovem, ao lado de um rapaz, dentro da igreja que frequentava."><figcaption>Uma lembrança da vida na igreja, antes da partida para o Rio.</figcaption></figure>
            ${prose(5, movements[0].to)}
            <aside class="archive-pair" id="TRA-ARQUIVO" aria-label="Arquivo audiovisual: o corte de cabelo na igreja">
              <p class="eyebrow">arquivo pessoal · 2012</p>
              <h3>O corpo também atravessa a história</h3>
              <p>O registro acompanha o corte dos cabelos de Robson dentro da igreja. Dois fragmentos preservam o começo e o momento final dessa transformação.</p>
              <div class="archive-videos archive-videos-single">
                <figure><video controls loop preload="metadata" playsinline poster="./assets/cortando-frame-inicio.jpg?v=1.12-fb93cb3"><source src="./assets/cortando-o-cabelo-montagem.mp4?v=1.12-fb93cb3" type="video/mp4">Seu navegador não reproduz este vídeo.</video><figcaption>Arquivo familiar · montagem em loop</figcaption></figure>
              </div>
              <p class="archive-note">Dois momentos do mesmo gesto, unidos em sequência. A trilha “Lagos”, de Quincas Moreira, acompanha o trecho inteiro; o som original do vídeo ganha destaque na segunda parte. <a href="https://www.quincasmoreira.com/music-and-sound-libraries" target="_blank" rel="noreferrer">Crédito e referência da faixa ↗</a></p>
            </aside>
          </section>
          <section class="travel-movement" id="travessia-m2">
            <p class="eyebrow">movimento 02</p><h2>${esc(movements[1].title)}</h2>
            ${prose(movements[1].from, movements[1].to)}
          </section>
          <section class="travel-movement" id="travessia-m3">
            <p class="eyebrow">movimento 03</p><h2>${esc(movements[2].title)}</h2>
            ${prose(movements[2].from, movements[2].to)}
          </section>
          <section class="travel-movement" id="travessia-m4">
            <p class="eyebrow">movimento 04</p><h2>${esc(movements[3].title)}</h2>
            ${prose(movements[3].from, movements[3].to)}
            <figure class="travel-photo travel-photo-current"><img src="./assets/robson-retrato-atual.jpg?v=1.12-fb93cb3" alt="Retrato atual de Robson Dias, diretor do filme."><figcaption>Robson Dias, hoje. A investigação continua entre memória, fé e pertencimento.</figcaption></figure>
            <p class="source-link-line"><a href="${esc(DATA.autobiografia.url)}" target="_blank" rel="noreferrer">Abrir o documento de origem ↗</a></p>
          </section>
        </article>
      </div>
    </div>`;
  }

  function continuousScript(text) {
    const paragraphs = text.split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
    return paragraphs.map((paragraph, index) => {
      if (index === 0 && /^(Descrição dos personagens|Estratégias de abordagem|III\. Sugestão de estrutura)/i.test(paragraph)) return "";
      const heading = paragraph.length < 118 && !/[.!?]$/.test(paragraph);
      return heading ? `<h3>${esc(paragraph)}</h3>` : `<p>${esc(paragraph)}</p>`;
    }).join("");
  }

  function renderRoteiro() {
    const personagens = DATA.approved?.personagens || "";
    const estrategias = DATA.approved?.estrategias || "";
    const estrutura = DATA.approved?.estrutura || "";
    return `<div class="wrap">
      ${pageHead("roteiro documental", "Roteiro", "Personagens, estratégias e estrutura reunidos em uma leitura contínua, com títulos que orientam o percurso do filme.")}
      <nav class="script-toolbar" aria-label="Partes do roteiro">
        <a href="#roteiro-personagens">i · Personagens e objetos centrais</a>
        <a href="#roteiro-estrategias">ii · Estratégias</a>
        <a href="#roteiro-estrutura">iii · Estrutura e montagem</a>
      </nav>
      <div class="script-layout">
        <aside class="script-side-index" aria-label="Navegação do roteiro">
          <p>nesta página</p>
          <a href="#roteiro-personagens"><span>i</span>Personagens</a>
          <a href="#roteiro-estrategias"><span>ii</span>Estratégias</a>
          <a href="#roteiro-estrutura"><span>iii</span>Estrutura</a>
        </aside>
        <main class="script-flow">
          <section class="script-part" id="roteiro-personagens">
            <header class="script-part-head"><div><p class="eyebrow">movimento i · texto aprovado</p><h2>Personagens e objetos centrais</h2></div><span class="tag ready">11.985 caracteres</span></header>
            <article class="script-reader">${continuousScript(personagens)}</article>
          </section>
          <section class="script-part" id="roteiro-estrategias">
            <header class="script-part-head"><div><p class="eyebrow">movimento ii · texto aprovado</p><h2>Estratégias de abordagem</h2></div><span class="tag ready">6.990 caracteres</span></header>
            <article class="script-reader">${continuousScript(estrategias)}</article>
          </section>
          <section class="script-part" id="roteiro-estrutura">
            <header class="script-part-head"><div><p class="eyebrow">movimento iii · texto aprovado</p><h2>Arco narrativo e organização da montagem</h2></div><span class="tag ready">6.306 caracteres</span></header>
            <article class="script-reader">${continuousScript(estrutura)}</article>
          </section>
        </main>
      </div>
    </div>`;
  }

  function renderDocumentPage(kind) {
    const isProposal = kind === "proposta";
    const doc = isProposal ? DATA.proposta : DATA.dossie;
    const prefix = isProposal ? "PROP" : "PESQ";
    const title = isProposal ? "Proposta" : "Caderno de investigação";
    const intro = isProposal
      ? "Texto integral do documento preparado para a inscrição, preservado na ordem atual. Cada parágrafo recebe um código estável."
      : "Pergunta-motriz, princípio narrativo, hipótese central, contradições, pendências e dados que orientam o desenvolvimento do filme.";
    const investigation = !isProposal && doc.latestContent
      ? doc.latestContent.split(/\r?\n/).map(line => line.trim()).filter(Boolean).map((text, index) => {
          const id = code(prefix, index);
          const meta = `<span class="block-meta" id="${id}"><span>${id}</span><button class="copy-block" type="button" data-copy="${esc(text)}">Copiar</button></span>`;
          const headings = ["Pergunta-motriz", "Princípio narrativo", "Hipótese central", "Pendências prioritárias", "Análise dialética — as contradições que podem mover o filme", "Contexto e dados essenciais"];
          if (headings.includes(text)) return `${meta}<h2 class="source-heading">${esc(text)}</h2>`;
          if (/^https:\/\/docs\.google\.com\//.test(text)) return `${meta}<p class="source-link-line"><a href="${esc(text)}" target="_blank" rel="noreferrer">Abrir o relato autobiográfico do diretor ↗</a></p>`;
          if (/^(\*|•|\d+\.)\s/.test(text)) return `${meta}<p class="source-list">${esc(text.replace(/^\*\s*/, "• "))}</p>`;
          return `${meta}<p class="source-paragraph">${esc(text)}</p>`;
        }).join("")
      : renderSource(doc, prefix);
    return `<div class="wrap">
      ${pageHead(isProposal ? "RioFilme · fonte integral" : "perguntas que movem o filme", title, intro)}
      <div class="editorial-layout">
        <aside class="section-index"><a href="#${prefix}-01">Início do texto</a><a href="#fontes">Fontes originais</a></aside>
        <article class="editorial-content">${investigation}
          <section id="fontes" class="text-block">
            <h2>Fonte original</h2>
            <p>Esta página preserva o conteúdo importado. O Google Docs continua sendo a referência externa.</p>
            <div class="source-links"><a class="button" href="${doc.url}" target="_blank" rel="noreferrer">Abrir no Google Docs ↗</a></div>
          </section>
        </article>
      </div>
    </div>`;
  }

  function renderRioFilme() {
    const creative = [
      { label: "Sinopse — máximo de 1.000 caracteres.", page: "direcao", anchor: "DIR-04" },
      { label: "Visão / abordagem estética do diretor — máximo de 2.500 caracteres.", page: "direcao", anchor: "DIR-05" },
      { label: "Pontos fortes da proposta — máximo de 2.500 caracteres.", page: "direcao", anchor: "DIR-06" },
      { label: "Roteiro documental: personagens ou objetos centrais.", page: "roteiro", anchor: "roteiro-personagens" },
      { label: "Roteiro documental: estratégias de abordagem.", page: "roteiro", anchor: "roteiro-estrategias" },
      { label: "Roteiro documental: estrutura e arco narrativo.", page: "roteiro", anchor: "roteiro-estrutura" },
      { label: "Link para filme ou material filmado, se houver.", page: "travessia", anchor: "TRA-ARQUIVO" },
      { label: "Anuências de personalidades reais e direitos de adaptação, quando aplicável.", page: "riofilme", anchor: "RF-03" }
    ];
    const personal = [
      "Nome do diretor e declaração sobre ser ou não estreante.",
      "Documento oficial de identificação com foto.",
      "Comprovante de residência no estado do Rio de Janeiro emitido há mais de um ano.",
      "Comprovante de residência recente, emitido até um mês da publicação do edital.",
      "Na falta dos comprovantes: declaração de residência conforme o Anexo VIII.",
      "Autodeclaração e documentos das políticas afirmativas aplicáveis, incluindo RG/CPF e foto quando exigidos."
    ];
    const rest = [
      ["Identificação da proposta", "Título, categoria e organização temporal."],
      ["Produção e financiamento", "Valores, fontes, orçamento e cronograma."],
      ["Audiência e circulação", "Distribuição ou licenciamento, divulgação e promoção conforme a categoria."],
      ["Equipe técnica", "Currículos e cartas de anuência."],
      ["Proponente", "Declarações obrigatórias, cadastros e documentos institucionais."],
      ["Políticas afirmativas", "Dados da empresa e comprovações aplicáveis."]
    ];
    return `<div class="wrap">
      ${pageHead("anexo III · edital nº 10", "RioFilme", "Um recorte prático: primeiro, o que precisa ser escrito ou apresentado pelo diretor; depois, apenas a menção às demais frentes da inscrição.")}
      <figure class="riofilme-brand"><img src="./assets/riofilme-logo.jpg?v=1.12-fb93cb3" alt="Logotipo da RioFilme"><figcaption>Mapa de textos e documentos para a inscrição no edital.</figcaption></figure>
      <div class="editorial-layout">
        <nav class="section-index"><a href="#RF-01">Entrega criativa</a><a href="#RF-02">Documentos pessoais</a><a href="#RF-03">Demais frentes</a></nav>
        <div class="editorial-content">
          <section class="text-block" id="RF-01">
            <div class="block-meta"><span>RF-01 · responsabilidade criativa</span><button class="copy-block" data-copy="${esc(creative.map(x => x.label).join("\n"))}" type="button">Copiar lista</button></div>
            <h2>O que o diretor precisa formular</h2>
            <ul class="checklist">${creative.map(x => `<li class="riofilme-item"><a href="#${esc(x.page)}" data-go="${esc(x.page)}" data-anchor="${esc(x.anchor)}">${esc(x.label)} <span class="link-cue">↗ abrir texto relacionado</span></a></li>`).join("")}</ul>
            <p>Os textos existentes já cobrem esta base. O próximo trabalho é lapidar a coerência entre eles e completar autorizações e materiais filmados.</p>
          </section>
          <section class="text-block" id="RF-02">
            <div class="block-meta"><span>RF-02 · item 6 e afirmativas</span><button class="copy-block" data-copy="${esc(personal.join("\n"))}" type="button">Copiar lista</button></div>
            <h2>Documentos pessoais do diretor</h2>
            <ul class="checklist">${personal.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
          </section>
          <section class="text-block" id="RF-03">
            <h2>Demais frentes — apenas mapa</h2>
            <p>Estas partes são indispensáveis para a inscrição, mas não devem diluir o espaço editorial dedicado à direção.</p>
            <div class="dependency-map">${rest.map(([t,b])=>`<article><h3>${esc(t)}</h3><p>${esc(b)}</p></article>`).join("")}</div>
          </section>
        </div>
      </div>
    </div>`;
  }

  function renderVersoes() {
    return `<div class="wrap">
      ${pageHead("memória editorial", "Versões", "Cada marco conserva os textos anteriores. As revisões futuras serão publicadas como novas versões, sem apagar o caminho percorrido.")}
      <div class="editorial-layout">
        <aside class="section-index"><a href="#V-01">Versão atual</a><a href="#protocolo">Protocolo</a></aside>
        <div class="editorial-content">
          <article class="version-line" id="V-01"><time datetime="2026-11-03T11:29:00-03:00">3 nov. 2026 · 11h29</time><div><strong>v1.12 · Dossiê integrado ao site do diretor</strong><ul><li>Títulos reduzidos em 40% e logo da RioFilme incluída.</li><li>Itens criativos do edital ligados aos textos correspondentes.</li><li>Travessia com vídeo em loop, trilha contínua e som original em destaque na segunda parte.</li></ul></div><span class="tag">publicada</span></article>
          <article class="version-line"><time datetime="2026-11-03T11:00:00-03:00">3 nov. 2026 · 11h00</time><div><strong>v1.11 · Travessia</strong><ul><li>Relato autobiográfico organizado em quatro movimentos.</li><li>Fotografias e dois fragmentos do vídeo familiar integrados à página.</li><li>Índice lateral e busca passam a incluir o relato.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-11-03T10:38:00-03:00">3 nov. 2026 · 10h38</time><div><strong>v1.10 · Caderno de investigação</strong><ul><li>Página Pesquisa passa a se chamar Caderno de investigação.</li><li>Texto atualizado do Google Docs substitui a base anterior.</li><li>Pergunta-motriz, hipótese, contradições, pendências e dados orientam a leitura.</li><li>Busca interna passa a consultar a versão mais recente do documento.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-11-03T09:09:00-03:00">3 nov. 2026 · 09h09</time><div><strong>v1.9 · Estrutura aprovada e navegação corrigida</strong><ul><li>Arco narrativo e organização da montagem publicados com 6.306 caracteres.</li><li>Terceiro movimento passa a integrar a leitura contínua do roteiro.</li><li>Links internos permanecem na página Roteiro e alcançam a seção indicada.</li><li>Rotas internas funcionam após recarregar e ao navegar pelo histórico.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-11-03T09:03:00-03:00">3 nov. 2026 · 09h03</time><div><strong>v1.8 · Leitura contínua do roteiro</strong><ul><li>Personagens e estratégias passam a formar um texto contínuo.</li><li>Títulos internos permanecem visíveis como marcos de leitura.</li><li>Subseções expansíveis são substituídas por fluxo editorial aberto.</li><li>Índice lateral organiza os três movimentos do roteiro.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-11-02T15:59:00-03:00">2 nov. 2026 · 15h59</time><div><strong>v1.7 · Roteiro em página própria</strong><ul><li>Estratégias de abordagem aprovadas com 6.990 caracteres.</li><li>Personagens revisados em linguagem afirmativa, com 11.985 caracteres.</li><li>A música passa a conectar igreja, memória e escuta.</li><li>Roteiro organizado por movimentos de leitura expansíveis.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-11-02T15:36:00-03:00">2 nov. 2026 · 15h36</time><div><strong>v1.6 · Rede de personagens</strong><ul><li>Descrição dos personagens aprovada com 11.982 caracteres.</li><li>Carolina Rocha, Ronilso Pacheco e o retorno de Paulo integram a rede narrativa.</li><li>Referência institucional mantida em nível lateral.</li><li>Personagens organizados por conexões, contrapontos e retornos.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-10-31T19:14:00-03:00">31 out. 2026 · 19h14</time><div><strong>v1.5 · Autoria e território</strong><ul><li>Centralidade institucional retirada do site e dos textos correntes.</li><li>Paulo Ricardo, Nira e uma comunidade de terreiro passam ao centro da pesquisa de personagens.</li><li>Abertura construída pela montagem paralela dos preparativos de duas cerimônias.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-10-31T18:39:00-03:00">31 out. 2026 · 18h39</time><div><strong>v1.4 · Personagens centrais</strong><ul><li>Descrição dos personagens aprovada com 3.763 caracteres.</li><li>Primeira hipótese de personagens organizada.</li><li>Percurso profissional do diretor integrado à trajetória religiosa e acadêmica.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-10-31">31 out. 2026</time><div><strong>v1.3 · Pontos fortes e nova arquitetura</strong><ul><li>Pontos fortes aprovados com 2.159 caracteres.</li><li>Navegação reorganizada em O filme, Pesquisa, Edital e Arquivo.</li><li>Nova linguagem visual em branco, preto e tons quentes, com o símbolo do projeto.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-10-31">31 out. 2026</time><div><strong>v1.2 · Visão do diretor aprovada</strong><ul><li>Visão e abordagem estética publicadas.</li><li>2.476 caracteres, dentro do limite de 2.500 do edital.</li><li>Racismo, comidas, humor e memórias passam a estruturar os caminhos sensíveis do filme.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-10-30">30 out. 2026</time><div><strong>v1.1 · Sinopse aprovada</strong><ul><li>Sinopse de inscrição revisada e publicada.</li><li>699 caracteres, dentro do limite de 1.000 do edital.</li><li>A narrativa passa a se concentrar no cineasta, nos personagens e nos territórios.</li></ul></div><span class="tag">arquivada</span></article>
          <article class="version-line"><time datetime="2026-10-30">30 out. 2026</time><div><strong>v1.0 · Importação e arquitetura editorial</strong><ul><li>Dois documentos importados integralmente.</li><li>Direção transformada no núcleo de leitura.</li><li>Mapa do Anexo III separado por responsabilidade.</li><li>Códigos estáveis e busca criados para revisão colaborativa.</li></ul></div><span class="tag">arquivada</span></article>
          <section class="text-block" id="protocolo">
            <h2>Como revisar sem perder nada</h2>
            <ol class="checklist">
              <li>Escolha o código do trecho, como DIR-05 ou PESQ-18.</li>
              <li>Peça a revisão no ChatGPT usando esse código e indique o objetivo da mudança.</li>
              <li>A versão anterior é arquivada com data, número e resumo das alterações.</li>
              <li>A nova edição é publicada no mesmo endereço; colaboradores continuam usando um único link.</li>
            </ol>
          </section>
          <section class="text-block" id="fontes-integrais">
            <h2>Fontes integrais</h2>
            <p>Os documentos de origem permanecem disponíveis para consulta, comparação e recuperação de trechos.</p>
            <div class="source-links">
              <button class="button" type="button" data-go="proposta">Proposta importada</button>
              <button class="button" type="button" data-go="pesquisa">Caderno de investigação</button>
              <a class="button" href="https://docs.google.com/document/d/1drRV0BMDoR4D376Cie1ysBYLRb3yp_ycUHqoB9U6gtQ/edit" target="_blank" rel="noreferrer">Caderno de estrutura ↗</a>
            </div>
          </section>
        </div>
      </div>
    </div>`;
  }

  const renderers = {
    inicio: renderInicio,
    direcao: renderDirecao,
    travessia: renderTravessia,
    roteiro: renderRoteiro,
    proposta: () => renderDocumentPage("proposta"),
    pesquisa: () => renderDocumentPage("pesquisa"),
    riofilme: renderRioFilme,
    versoes: renderVersoes
  };

  function showView(name, updateHash = true) {
    const anchorId = ["roteiro-", "DIR-", "TRA-", "RF-"].some(prefix => name.startsWith(prefix)) ? name : "";
    const anchorView = name.startsWith("roteiro-") ? "roteiro" : name.startsWith("DIR-") ? "direcao" : name.startsWith("TRA-") ? "travessia" : name.startsWith("RF-") ? "riofilme" : "";
    const next = anchorView || renderers[name] ? (anchorView || name) : "inicio";
    views.forEach(v => {
      const active = v.dataset.view === next;
      v.hidden = !active;
      if (active && !v.dataset.rendered) {
        v.innerHTML = renderers[next]();
        v.dataset.rendered = "true";
      }
    });
    document.querySelectorAll("[data-nav]").forEach(a => a.setAttribute("aria-current", a.dataset.nav === next ? "page" : "false"));
    if (updateHash && location.hash !== "#" + name) history.pushState(null, "", "#" + name);
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (anchorId) {
      setTimeout(() => document.getElementById(anchorId)?.scrollIntoView({behavior:"smooth", block:"start"}), 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  document.addEventListener("click", async e => {
    const roteiroAnchor = e.target.closest('a[href^="#roteiro-"]');
    if (roteiroAnchor) {
      e.preventDefault();
      const anchorId = roteiroAnchor.getAttribute("href").slice(1);
      history.pushState(null, "", "#" + anchorId);
      showView(anchorId, false);
      return;
    }
    const nav = e.target.closest("[data-nav], [data-go]");
    if (nav) {
      e.preventDefault();
      const page = nav.dataset.nav || nav.dataset.go;
      const anchor = nav.dataset.anchor;
      if (anchor) {
        history.pushState(null, "", "#" + anchor);
        showView(page, false);
        setTimeout(() => document.getElementById(anchor)?.scrollIntoView({behavior:"smooth", block:"start"}), 50);
      } else {
        showView(page);
      }
      return;
    }
    const copy = e.target.closest(".copy-block");
    if (copy) {
      const source = copy.dataset.copy || copy.closest("[data-copy]")?.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(source);
        toast.textContent = "Trecho copiado com o código da seção.";
      } catch {
        toast.textContent = "Não foi possível copiar automaticamente.";
      }
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 1800);
    }
  });

  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  const dialog = document.querySelector(".search-dialog");
  const searchInput = document.querySelector("#search-input");
  const results = document.querySelector("#search-results");
  document.querySelector(".search-open").addEventListener("click", () => {
    dialog.showModal();
    setTimeout(() => searchInput.focus(), 50);
  });
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLocaleLowerCase("pt-BR");
    if (q.length < 2) { results.innerHTML = "<p>Digite pelo menos duas letras.</p>"; return; }
    const matches = [];
    const investigationParagraphs = DATA.dossie.latestContent
      ? DATA.dossie.latestContent.split(/\r?\n/).map(text => ({text:text.trim()})).filter(p => p.text)
      : DATA.dossie.paragraphs;
    const autobiographicalParagraphs = DATA.autobiografia.content.split(/\n+/).map(text => ({text:text.trim()})).filter(p => p.text).slice(1);
    [["proposta", DATA.proposta.paragraphs, "PROP"], ["pesquisa", investigationParagraphs, "PESQ"], ["travessia", autobiographicalParagraphs, "TRA"]].forEach(([view, paragraphs, prefix]) => {
      paragraphs.forEach((p, i) => {
        if (p.text.toLocaleLowerCase("pt-BR").includes(q)) matches.push({ view, code: code(prefix, i), text: p.text });
      });
    });
    results.innerHTML = matches.length ? matches.slice(0, 30).map(m => `<article class="result"><button data-result-view="${m.view}" data-result-id="${m.code}">${m.code} · abrir</button><p>${esc(m.text.slice(0, 220))}${m.text.length > 220 ? "…" : ""}</p></article>`).join("") : "<p>Nenhum resultado.</p>";
  });
  results.addEventListener("click", e => {
    const button = e.target.closest("[data-result-view]");
    if (!button) return;
    dialog.close();
    showView(button.dataset.resultView);
    setTimeout(() => document.getElementById(button.dataset.resultId)?.scrollIntoView({behavior:"smooth", block:"center"}), 100);
  });

  window.addEventListener("popstate", () => showView(location.hash.slice(1), false));
  document.querySelector("#footer-version").textContent = DATA.version;
  showView(location.hash.slice(1) || "inicio", false);
})();

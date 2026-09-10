// CURSOR
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  if (!cursor) return;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button, .work-card").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (!cursor) return;
    cursor.style.width = "42px";
    cursor.style.height = "42px";
  });

  item.addEventListener("mouseleave", () => {
    if (!cursor) return;
    cursor.style.width = "22px";
    cursor.style.height = "22px";
  });
});

// MENU MOBILE
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    siteNav.classList.toggle("is-open");
  });
}

// REVEAL ON SCROLL
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));

// HOVER VIDEO
const hoverVideos = document.querySelectorAll(".hover-video");

hoverVideos.forEach((video) => {
  video.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });

  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

// VIDEO MODAL
const videoTriggers = document.querySelectorAll(".video-trigger");
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoClose = document.getElementById("videoClose");

videoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const src = trigger.dataset.video;
    if (!src || !videoModal || !videoFrame) return;

    videoFrame.src = src;
    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeVideoModal() {
  if (!videoModal || !videoFrame) return;
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  videoFrame.src = "";
  document.body.style.overflow = "";
}

if (videoClose) {
  videoClose.addEventListener("click", closeVideoModal);
}

if (videoModal) {
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeVideoModal();
});

// LANGUAGE SWITCHER
const translations = {
  en: {
    "meta.title": "Robson Dias — Director / Editor / Cinematographer",
    "meta.description": "Robson Dias' film portfolio with projects, videos and detailed pages for selected work.",
    "nav.featured": "Featured",
    "nav.works": "Works",
    "nav.recognitions": "Recognitions",
    "nav.currentSeries": "New series",
    "nav.about": "About",
    "nav.talks": "Talks",
    "nav.contact": "Contact",
    "hero.eyebrow": "Brazil / France",
    "hero.title": "Cinema, restitution,<br>territory and living memory.",
    "hero.text": "Director, editor and cinematographer focused on high-impact documentaries rooted in territory, identity and decolonial perspectives. With projects developed across Europe and Latin America, my work moves between intimate storytelling and global circulation, engaging festivals, broadcasters and international co-productions.",
    "hero.primaryCta": "View selected works",
    "hero.secondaryCta": "Open project page",
    "hero.scroll": "SCROLL TO EXPLORE",
    "manto.shortTitle": "I Heard the Calling",
    "featured.kicker": "Featured project",
    "featured.sectionTitle": "The project at the center of the current cycle",
    "featured.label": "Cannes Docs 2025",
    "featured.title": "I Heard the Calling: The Return of the Tupinambá Cloak",
    "featured.text": "A documentary about restitution, memory, territory and cultural reparation, following Célia Tupinambá's journey through European museums.",
    "featured.cta": "Explore the film dossier",
    "featured.teaser": "Watch the teaser",
    "meta.feature": "Feature documentary",
    "meta.post": "Post-production",
    "works.kicker": "Visual highlights",
    "works.title": "Projects in development and circulation",
    "catalog.manto.meta": "2027 · Work in progress",
    "catalog.manto.role": "Direction / Screenplay",
    "catalog.favela.meta": "2024 · Short documentary",
    "catalog.favela.role": "Direction",
    "catalog.favela.partner": "MAX / Warner Bros. Discovery",
    "catalog.huella.meta": "Short documentary · France / Peru",
    "catalog.huella.role": "Cinematography",
    "catalog.4800.meta": "2019 · Short documentary · France",
    "catalog.4800.role": "Direction",
    "catalog.bien.meta": "Short documentary · France",
    "catalog.bien.role": "Direction",
    "catalog.voix.meta": "Short documentary · France",
    "catalog.voix.role": "Cinematography",
    "catalog.onze.meta": "2026 · Documentary series",
    "catalog.onze.role": "Research",
    "catalog.kabadio.meta": "Feature documentary · Brazil / Senegal",
    "catalog.kabadio.role": "Co-writing / Editing",
    "catalog.grande.meta": "Web series · 9 episodes",
    "catalog.grande.role": "Cinematography",
    "statement.kicker": "Direction / Editing / Cinematography",
    "statement.title": "Cinema shifts the point of view.",
    "about.kicker": "About",
    "about.title": "Robson Dias",
    "about.p1": "Robson Dias is a Brazilian-born filmmaker based in Marseille, working across directing, cinematography and editing at the intersection of documentary, art and political cinema. Trained in Brazil and France, he holds a Bachelor's degree in Cinema from PUC-Rio and a Master's in Documentary Directing from Aix-Marseille Université. Over the past decade, he has developed a transnational practice between Latin America and Europe, navigating both independent production and international co-production environments.",
    "about.p2": "His work explores questions of territory, memory, power and representation, often engaging with decolonial perspectives and the politics of the gaze. His short film Pra Inglês Ver was awarded at the Gramado Film Festival, and he later co-wrote and edited the feature documentary KABADIO, while also directing second unit for the series Surfing West Africa (Canal OFF). Since relocating to Europe, he has collaborated across France, Germany and Italy, and founded Búzios Films, an independent production structure focused on culturally sensitive narratives.",
    "about.p3": "In 2024, his short documentary Favela Turística, a critical reflection on the contradictions of favela tourism, was selected for the Warner Bros. Discovery Access Program and released on the MAX platform, later broadcast across Latin America. His current feature documentary, I Heard the Calling: The Return of the Tupinambá Cloak, follows the political and spiritual struggle for the restitution of sacred Tupinambá artifacts held in European institutions. The project was presented at Cannes Docs and received the Docs-in-Progress Award, consolidating its international positioning.",
    "about.p4": "Alongside his filmmaking practice, Dias is actively engaged as a speaker, mentor and educator. He has participated in major industry platforms such as Rio2C and international markets, and teaches documentary methodologies and cinematic practice at institutions including École Kourtrajmé in Marseille. His work moves fluidly between artistic creation and critical discourse, positioning cinema as both a narrative form and a political tool.",
    "about.p5": "Fluent across multiple cultural and professional contexts, Robson Dias develops projects that challenge dominant narratives, foreground marginalized voices and propose new forms of cinematic language. His films are not only works of storytelling, but gestures of resistance, negotiation and reappropriation of history.",
    "trajectory.cannesTitle": "Docs-in-Progress Award",
    "trajectory.cannesText": "Winner at Cannes Docs, Marché du Film, through the official Cannes Docs programme.",
    "trajectory.item1": "Winner, Docs-in-Progress Award - Marché du Film, Cannes",
    "trajectory.item2": "Official Selection, Brazilian Showcase - Cannes Docs",
    "trajectory.item3": "Winner, MiradasDoc Award - DOCSP, Spain",
    "trajectory.item4": "Selected, DOCSUR Pitching Lab - Miradas Afroindígenas Market, Tenerife",
    "trajectory.item5": "Participant, European Film Market - Berlinale",
    "trajectory.item6": "Selected, Nicho Laboratory and Dialab Laboratory",
    "trajectory.item7": "Mentorship by Luiz Bolognesi",
    "trajectory.item8": "Lei Paulo Gustavo - Audiovisual Project Development Grant, State of Rio de Janeiro",
    "trajectory.item9": "Brazilian Audiovisual Sector Fund (FSA) - Feature Film Development",
    "timeline.2023Cannes.title": "Marché du Film participation",
    "timeline.2023Cannes.detail": "The project took part in the Marché du Film in Cannes during its development phase.",
    "timeline.nicho.title": "Nicho Laboratory",
    "timeline.nicho.detail": "Selected for the São Paulo documentary-development laboratory focused on Afro-Indigenous narratives.",
    "timeline.dialab.title": "DIALAB",
    "timeline.dialab.detail": "Development laboratory at UFBA's Institute of Humanities, Arts and Sciences in Bahia, Brazil.",
    "timeline.efm.title": "European Film Market",
    "timeline.efm.detail": "Official invitation to take part in the Berlinale market as a developing project representing new Latin American voices.",
    "timeline.support.title": "Development support",
    "timeline.support.detail": "Beneficiary of the Lei Paulo Gustavo programme from the State of Rio de Janeiro, with support from Savana Investimentos and Plan Decolonial Fund.",
    "timeline.2025Cannes.title": "Rulli Putortì & Partners Award",
    "timeline.2025Cannes.detail": "Officially selected for the Brazil Showcase in Cannes Docs' Docs-in-Progress, then awarded three two-hour legal consultations with Anna Lisa Putortì and Diana Rulli.",
    "timeline.docsp.title": "DocSP São Paulo",
    "timeline.docsp.detail": "Invited to the Latin American documentary development and connection platform in São Paulo.",
    "timeline.miradas.title": "Miradas Indígenas",
    "timeline.miradas.detail": "Selected for MiradasDoc in the Canary Islands as a work in final post-production.",
    "timeline.docsur.title": "Pitching Lab",
    "timeline.docsur.detail": "Selected for the DOCSUR Pitching Lab at the Miradas Afroindígenas Market in Tenerife.",
    "timeline.partnerships.title": "Co-production and impact",
    "timeline.partnerships.detail": "A Brazil-France co-production backed by both embassies, with strategic partnerships with MST, APIB and ABA.",
    "recognitions.kicker": "Selected recognitions",
    "recognitions.title": "A practice recognized across screens, markets and festivals.",
    "recognitions.cannesTitle": "Rulli Putortì & Partners Award",
    "recognitions.cannesText": "Won at Cannes Docs' Doc Day. The award includes three two-hour legal consultations with Anna Lisa Putortì and Diana Rulli.",
    "recognitions.warnerTitle": "Access Program / MAX",
    "recognitions.warnerText": "Favela Turística was selected, released on MAX and broadcast across Latin America.",
    "recognitions.miradasTitle": "MiradasDoc Award",
    "recognitions.miradasText": "Recognition for I Heard the Calling, opening a new international laboratory.",
    "recognitions.berlinaleTitle": "European Film Market",
    "recognitions.berlinaleText": "Participation in one of the central meeting points of international cinema.",
    "recognitions.showcaseTitle": "Official Selection",
    "recognitions.showcaseText": "Officially selected for the Brazil Showcase at Cannes Docs in 2025, connecting the project to an international industry audience.",
    "recognitions.docsurTitle": "DOCSUR Pitching Lab",
    "recognitions.docsurText": "Selected for the Miradas Afroindígenas Market pitching laboratory in Tenerife.",
    "recognitions.awardLabel": "Award",
    "recognitions.awardTitle": "Docs-in-Progress Award",
    "recognitions.awardText": "Winner at Marché du Film, Cannes Docs, for I Heard the Calling.",
    "recognitions.selectionLabel": "Selection",
    "recognitions.selectionTitle": "Cannes Docs 2025",
    "recognitions.selectionText": "Official selection in the Brazilian Showcase, connecting the project to an international industry audience.",
    "recognitions.labLabel": "Laboratories",
    "recognitions.labTitle": "DOCSP, DOCSUR and Nicho",
    "recognitions.labText": "Selected for MiradasDoc, DOCSUR Pitching Lab, Miradas Afroindígenas Market and Nicho Laboratory.",
    "recognitions.programLabel": "Program",
    "recognitions.programTitle": "Warner Bros. Discovery Access",
    "recognitions.programText": "Favela Turística was selected for the Access Program and later released on Max across Latin America.",
    "currentSeries.kicker": "Just premiered / Research",
    "currentSeries.title": "Just premiered: a journey through Rio.",
    "currentSeries.meta": "VPRO / NPO 2 / 2026",
    "currentSeries.text": "Robson Dias participated as a researcher in this three-part VPRO series with journalist and Latin America correspondent Nina Jurna.",
    "currentSeries.details": "The series follows Jurna across the city, from favelas to affluent neighbourhoods, at a moment when inequality, security and political division shape everyday life.",
    "currentSeries.releaseLabel": "Now available",
    "currentSeries.releaseDate": "Since 6 September 2026",
    "currentSeries.watchLabel": "Watch",
    "currentSeries.formatLabel": "Format",
    "currentSeries.format": "Three-part documentary series",
    "currentSeries.premiere": "Premieres Sunday, 6 September, at 20:15 on NPO 2, VPRO and NPO Start.",
    "currentSeries.cta": "Watch on NPO Start",
    "currentSeries.announcement": "View the series announcement on Instagram",
    "talks.kicker": "Talks / Teaching / Mentoring",
    "talks.title": "Conversations that move practice forward",
    "talks.text": "Alongside filmmaking, Robson Dias works as a speaker, teacher and mentor across industry platforms, training spaces and cultural programs. His practice connects cinema, representation, authorship and access through talks, masterclasses, professional panels and hands-on workshops.",
    "talks.cta": "Open full page",
    "contact.kicker": "Start a conversation",
    "contact.title": "Looking for a story that changes the frame?",
    "contact.text": "Bring a film, a commission, a workshop or a question. The right collaboration can begin with one clear message.",
    "contact.instagram": "Follow the work on Instagram",
    "contact.vimeo": "Watch films on Vimeo"
  },
  pt: {
    "meta.title": "Robson Dias — Diretor / Montador / Diretor de Fotografia",
    "meta.description": "Portfólio cinematográfico de Robson Dias com projetos, vídeos e páginas detalhadas dos trabalhos.",
    "nav.featured": "Destaque",
    "nav.works": "Trabalhos",
    "nav.recognitions": "Reconhecimentos",
    "nav.currentSeries": "Nova série",
    "nav.about": "Sobre",
    "nav.talks": "Conversas",
    "nav.contact": "Contato",
    "hero.eyebrow": "Brasil / França",
    "hero.title": "Cinema, restituição,<br>território e memória viva.",
    "hero.text": "Diretor, montador e diretor de fotografia dedicado a documentários de impacto, enraizados em território, identidade e perspectivas decoloniais. Com projetos desenvolvidos entre a Europa e a América Latina, meu trabalho transita entre narrativas íntimas e circulação internacional, dialogando com festivais, emissoras e coproduções.",
    "hero.primaryCta": "Ver trabalhos selecionados",
    "hero.secondaryCta": "Abrir página do projeto",
    "hero.scroll": "ROLE PARA EXPLORAR",
    "manto.shortTitle": "Eu Ouvi o Chamado",
    "featured.kicker": "Projeto em destaque",
    "featured.sectionTitle": "O projeto no centro do ciclo atual",
    "featured.label": "Cannes Docs 2025",
    "featured.title": "Eu Ouvi o Chamado: O Retorno dos Mantos Tupinambá",
    "featured.text": "Um documentário sobre restituição, memória, território e reparação cultural, acompanhando a jornada de Célia Tupinambá pelos museus europeus.",
    "featured.cta": "Explorar o dossiê do filme",
    "featured.teaser": "Ver teaser",
    "meta.feature": "Longa documental",
    "meta.post": "Pós-produção",
    "works.kicker": "Destaques visuais",
    "works.title": "Projetos em desenvolvimento e circulação",
    "catalog.manto.meta": "2027 · Em desenvolvimento",
    "catalog.manto.role": "Direção / Roteiro",
    "catalog.favela.meta": "2024 · Curta documental",
    "catalog.favela.role": "Direção",
    "catalog.favela.partner": "MAX / Warner Bros. Discovery",
    "catalog.huella.meta": "Curta documental · França / Peru",
    "catalog.huella.role": "Direção de fotografia",
    "catalog.4800.meta": "2019 · Curta documental · França",
    "catalog.4800.role": "Direção",
    "catalog.bien.meta": "Curta documental · França",
    "catalog.bien.role": "Direção",
    "catalog.voix.meta": "Curta documental · França",
    "catalog.voix.role": "Direção de fotografia",
    "catalog.onze.meta": "2026 · Série documental",
    "catalog.onze.role": "Pesquisa",
    "catalog.kabadio.meta": "Longa documental · Brasil / Senegal",
    "catalog.kabadio.role": "Corroteiro / Montagem",
    "catalog.grande.meta": "Websérie · 9 episódios",
    "catalog.grande.role": "Direção de fotografia",
    "statement.kicker": "Direção / Montagem / Fotografia",
    "statement.title": "O cinema desloca o ponto de vista.",
    "about.kicker": "Sobre",
    "about.title": "Robson Dias",
    "about.p1": "Robson Dias é um cineasta brasileiro radicado em Marselha, atuando entre direção, fotografia e montagem na interseção entre documentário, arte e cinema político. Formado no Brasil e na França, é bacharel em Cinema pela PUC-Rio e mestre em Direção Documental pela Aix-Marseille Université. Ao longo da última década, desenvolveu uma prática transnacional entre a América Latina e a Europa, transitando por ambientes de produção independente e coprodução internacional.",
    "about.p2": "Seu trabalho explora questões de território, memória, poder e representação, frequentemente a partir de perspectivas decoloniais e da política do olhar. Seu curta Pra Inglês Ver foi premiado no Festival de Gramado. Mais tarde, coescreveu e montou o longa documental KABADIO e dirigiu a segunda unidade da série Surfing West Africa, do Canal OFF. Desde sua mudança para a Europa, colaborou na França, Alemanha e Itália e fundou a Búzios Films, estrutura independente voltada para narrativas culturalmente sensíveis.",
    "about.p3": "Em 2024, seu curta documental Favela Turística, reflexão crítica sobre as contradições do turismo em favelas, foi selecionado para o Warner Bros. Discovery Access Program e lançado na plataforma MAX, com posterior transmissão na América Latina. Seu longa atual, Eu Ouvi o Chamado: O Retorno dos Mantos Tupinambá, acompanha a luta política e espiritual pela restituição de objetos sagrados Tupinambá mantidos em instituições europeias. O projeto foi apresentado no Cannes Docs e recebeu o Docs-in-Progress Award.",
    "about.p4": "Paralelamente ao cinema, Dias atua como palestrante, mentor e educador. Participou de plataformas como Rio2C e mercados internacionais e ensina metodologias documentais e prática cinematográfica em instituições como a École Kourtrajmé, em Marselha. Seu trabalho se move entre criação artística e reflexão crítica, compreendendo o cinema como forma narrativa e ferramenta política.",
    "about.p5": "Fluente em diferentes contextos culturais e profissionais, Robson Dias desenvolve projetos que questionam narrativas dominantes, colocam vozes marginalizadas no centro e propõem novas formas de linguagem cinematográfica. Seus filmes são também gestos de resistência, negociação e reapropriação da história.",
    "trajectory.cannesTitle": "Docs-in-Progress Award",
    "trajectory.cannesText": "Vencedor no Cannes Docs, Marché du Film, pelo programa oficial Cannes Docs.",
    "trajectory.item1": "Vencedor, Docs-in-Progress Award - Marché du Film, Cannes",
    "trajectory.item2": "Seleção oficial, Brazilian Showcase - Cannes Docs",
    "trajectory.item3": "Vencedor, MiradasDoc Award - DOCSP, Espanha",
    "trajectory.item4": "Selecionado, DOCSUR Pitching Lab - Miradas Afroindígenas Market, Tenerife",
    "trajectory.item5": "Participante, European Film Market - Berlinale",
    "trajectory.item6": "Selecionado, Nicho Laboratory e Dialab Laboratory",
    "trajectory.item7": "Mentoria de Luiz Bolognesi",
    "trajectory.item8": "Lei Paulo Gustavo - Edital de Desenvolvimento de Projetos Audiovisuais, Estado do Rio de Janeiro",
    "trajectory.item9": "Fundo Setorial do Audiovisual (FSA) - Desenvolvimento de Longa-Metragem",
    "timeline.2023Cannes.title": "Participação no Marché du Film",
    "timeline.2023Cannes.detail": "O projeto participou do Marché du Film, em Cannes, ainda em fase de desenvolvimento.",
    "timeline.nicho.title": "Laboratório Nicho",
    "timeline.nicho.detail": "Selecionado para o laboratório paulistano de desenvolvimento documental voltado a narrativas afro-indígenas.",
    "timeline.dialab.title": "DIALAB",
    "timeline.dialab.detail": "Laboratório de desenvolvimento do Instituto de Humanidades, Artes e Ciências da UFBA, na Bahia.",
    "timeline.efm.title": "European Film Market",
    "timeline.efm.detail": "Convite oficial para participar do mercado da Berlinale como projeto em desenvolvimento, representando novas vozes latino-americanas.",
    "timeline.support.title": "Apoio ao desenvolvimento",
    "timeline.support.detail": "Beneficiário da Lei Paulo Gustavo do Estado do Rio de Janeiro, com apoio da Savana Investimentos e do Plan Decolonial Fund.",
    "timeline.2025Cannes.title": "Rulli Putortì & Partners Award",
    "timeline.2025Cannes.detail": "Seleção oficial no Brazil Showcase, no Docs-in-Progress do Cannes Docs, seguida do prêmio de três consultas jurídicas de duas horas com Anna Lisa Putortì e Diana Rulli.",
    "timeline.docsp.title": "DocSP São Paulo",
    "timeline.docsp.detail": "Convidado para a plataforma paulista de conexão e desenvolvimento do documentário latino-americano.",
    "timeline.miradas.title": "Miradas Indígenas",
    "timeline.miradas.detail": "Selecionado pelo MiradasDoc, nas Ilhas Canárias, como obra em finalização de pós-produção.",
    "timeline.docsur.title": "Laboratório de pitching",
    "timeline.docsur.detail": "Selecionado para o DOCSUR Pitching Lab, no Miradas Afroindígenas Market, em Tenerife.",
    "timeline.partnerships.title": "Coprodução e impacto",
    "timeline.partnerships.detail": "Coprodução Brasil-França, apoiada pelas duas embaixadas e por parcerias estratégicas com MST, APIB e ABA.",
    "recognitions.kicker": "Reconhecimentos selecionados",
    "recognitions.title": "Uma trajetória reconhecida em telas, mercados e festivais.",
    "recognitions.cannesTitle": "Rulli Putortì & Partners Award",
    "recognitions.cannesText": "Vencedor no Doc Day do Cannes Docs. O prêmio inclui três consultas jurídicas de duas horas com Anna Lisa Putortì e Diana Rulli.",
    "recognitions.warnerTitle": "Access Program / MAX",
    "recognitions.warnerText": "Favela Turística foi selecionado, lançado na MAX e exibido em toda a América Latina.",
    "recognitions.miradasTitle": "MiradasDoc Award",
    "recognitions.miradasText": "Reconhecimento por Eu Ouvi o Chamado, levando o projeto a um novo laboratório internacional.",
    "recognitions.berlinaleTitle": "European Film Market",
    "recognitions.berlinaleText": "Participação em um dos principais pontos de encontro do cinema internacional.",
    "recognitions.showcaseTitle": "Seleção oficial",
    "recognitions.showcaseText": "Seleção oficial no Brazil Showcase do Cannes Docs em 2025, aproximando o projeto do mercado internacional.",
    "recognitions.docsurTitle": "DOCSUR Pitching Lab",
    "recognitions.docsurText": "Selecionado para o laboratório de pitching do Miradas Afroindígenas Market, em Tenerife.",
    "recognitions.awardLabel": "Prêmio",
    "recognitions.awardTitle": "Docs-in-Progress Award",
    "recognitions.awardText": "Vencedor no Marché du Film, Cannes Docs, com I Heard the Calling.",
    "recognitions.selectionLabel": "Seleção",
    "recognitions.selectionTitle": "Cannes Docs 2025",
    "recognitions.selectionText": "Seleção oficial no Brazilian Showcase, aproximando o projeto do mercado internacional.",
    "recognitions.labLabel": "Laboratórios",
    "recognitions.labTitle": "DOCSP, DOCSUR e Nicho",
    "recognitions.labText": "Selecionado para MiradasDoc, DOCSUR Pitching Lab, Miradas Afroindígenas Market e Nicho Laboratory.",
    "recognitions.programLabel": "Programa",
    "recognitions.programTitle": "Warner Bros. Discovery Access",
    "recognitions.programText": "Favela Turística foi selecionado para o Access Program e depois lançado na Max em toda a América Latina.",
    "currentSeries.kicker": "Acabou de estrear / Pesquisa",
    "currentSeries.title": "Acabou de estrear: uma jornada pelo Rio.",
    "currentSeries.meta": "VPRO / NPO 2 / 2026",
    "currentSeries.text": "Robson Dias participou como pesquisador desta série em três episódios da VPRO, conduzida pela jornalista e correspondente para a América Latina Nina Jurna.",
    "currentSeries.details": "A série acompanha Nina pela cidade, das favelas aos bairros mais abastados, em um momento em que desigualdade, segurança e divisão política atravessam a vida cotidiana.",
    "currentSeries.releaseLabel": "Já disponível",
    "currentSeries.releaseDate": "Desde 6 de setembro de 2026",
    "currentSeries.watchLabel": "Onde assistir",
    "currentSeries.formatLabel": "Formato",
    "currentSeries.format": "Série documental em três episódios",
    "currentSeries.premiere": "Estreia no domingo, 6 de setembro, às 20h15, na NPO 2, VPRO e NPO Start.",
    "currentSeries.cta": "Assistir na NPO Start",
    "currentSeries.announcement": "Ver o anúncio da série no Instagram",
    "talks.kicker": "Conversas / Ensino / Mentoria",
    "talks.title": "Conversas que movem a prática adiante",
    "talks.text": "Paralelamente ao cinema, Robson Dias atua como palestrante, professor e mentor em plataformas profissionais, espaços de formação e programas culturais. Sua prática conecta cinema, representação, autoria e acesso por meio de palestras, masterclasses, painéis e oficinas práticas.",
    "talks.cta": "Abrir página completa",
    "contact.kicker": "Vamos começar uma conversa",
    "contact.title": "Buscando uma história que mude o enquadramento?",
    "contact.text": "Traga um filme, uma encomenda, uma oficina ou uma questão. A colaboração certa pode começar com uma mensagem clara.",
    "contact.instagram": "Acompanhe o trabalho no Instagram",
    "contact.vimeo": "Assista aos filmes no Vimeo"
  },
  fr: {
    "meta.title": "Robson Dias — Réalisateur / Monteur / Directeur de la photographie",
    "meta.description": "Portfolio cinématographique de Robson Dias : projets, vidéos et pages détaillées de ses réalisations.",
    "nav.featured": "À la une",
    "nav.works": "Films",
    "nav.recognitions": "Reconnaissances",
    "nav.currentSeries": "Nouvelle série",
    "nav.about": "À propos",
    "nav.talks": "Rencontres",
    "nav.contact": "Contact",
    "hero.eyebrow": "Brésil / France",
    "hero.title": "Cinéma, restitution,<br>territoire et mémoire vivante.",
    "hero.text": "Réalisateur, monteur et directeur de la photographie, je développe des documentaires ancrés dans le territoire, l'identité et des perspectives décoloniales. Entre l'Europe et l'Amérique latine, mon travail circule entre récits intimes et diffusion internationale, en lien avec festivals, diffuseurs et coproductions.",
    "hero.primaryCta": "Voir les films sélectionnés",
    "hero.secondaryCta": "Ouvrir la page du projet",
    "hero.scroll": "FAIRE DÉFILER POUR EXPLORER",
    "manto.shortTitle": "J'ai entendu l'appel",
    "featured.kicker": "Projet à l'honneur",
    "featured.sectionTitle": "Le projet au centre du cycle actuel",
    "featured.label": "Cannes Docs 2025",
    "featured.title": "J'ai entendu l'appel : Le retour du manteau tupinamba",
    "featured.text": "Un documentaire sur la restitution, la mémoire, le territoire et la réparation culturelle, au fil du parcours de Célia Tupinambá dans les musées européens.",
    "featured.cta": "Explorer le dossier du film",
    "featured.teaser": "Voir le teaser",
    "meta.feature": "Long métrage documentaire",
    "meta.post": "Post-production",
    "works.kicker": "Fragments visuels",
    "works.title": "Projets en développement et en circulation",
    "catalog.manto.meta": "2027 · En développement",
    "catalog.manto.role": "Réalisation / Scénario",
    "catalog.favela.meta": "2024 · Court métrage documentaire",
    "catalog.favela.role": "Réalisation",
    "catalog.favela.partner": "MAX / Warner Bros. Discovery",
    "catalog.huella.meta": "Court métrage documentaire · France / Pérou",
    "catalog.huella.role": "Image",
    "catalog.4800.meta": "2019 · Court métrage documentaire · France",
    "catalog.4800.role": "Réalisation",
    "catalog.bien.meta": "Court métrage documentaire · France",
    "catalog.bien.role": "Réalisation",
    "catalog.voix.meta": "Court métrage documentaire · France",
    "catalog.voix.role": "Image",
    "catalog.onze.meta": "2026 · Série documentaire",
    "catalog.onze.role": "Recherche",
    "catalog.kabadio.meta": "Long métrage documentaire · Brésil / Sénégal",
    "catalog.kabadio.role": "Coécriture / Montage",
    "catalog.grande.meta": "Série web · 9 épisodes",
    "catalog.grande.role": "Image",
    "statement.kicker": "Réalisation / Montage / Image",
    "statement.title": "Le cinéma déplace le regard.",
    "about.kicker": "À propos",
    "about.title": "Robson Dias",
    "about.p1": "Robson Dias est un cinéaste brésilien installé à Marseille. Il travaille entre réalisation, image et montage, à la croisée du documentaire, de l'art et du cinéma politique. Formé au Brésil et en France, il est diplômé en cinéma de la PUC-Rio et titulaire d'un master en réalisation documentaire d'Aix-Marseille Université. Depuis une dizaine d'années, il développe une pratique transnationale entre l'Amérique latine et l'Europe, dans des contextes de production indépendante et de coproduction internationale.",
    "about.p2": "Son travail explore le territoire, la mémoire, le pouvoir et la représentation, souvent à partir de perspectives décoloniales et d'une réflexion sur la politique du regard. Son court métrage Pra Inglês Ver a été primé au Festival de Gramado. Il a ensuite coécrit et monté le long métrage documentaire KABADIO et réalisé la seconde équipe de la série Surfing West Africa, pour Canal OFF. Il a collaboré en France, en Allemagne et en Italie et a fondé Búzios Films, une structure indépendante dédiée aux récits culturellement sensibles.",
    "about.p3": "En 2024, son court documentaire Favela Turística, réflexion critique sur les contradictions du tourisme dans les favelas, a été sélectionné par le Warner Bros. Discovery Access Program puis diffusé sur MAX en Amérique latine. Son long métrage actuel, J'ai entendu l'appel : Le retour du manteau tupinamba, suit la lutte politique et spirituelle pour la restitution d'objets tupinambá sacrés conservés dans des institutions européennes. Le projet a été présenté à Cannes Docs et a reçu le Docs-in-Progress Award.",
    "about.p4": "Parallèlement à son activité de cinéaste, Dias intervient comme conférencier, mentor et pédagogue. Il a participé à des plateformes professionnelles comme Rio2C et à des marchés internationaux. Il enseigne les méthodologies documentaires et la pratique du cinéma dans des institutions comme l'École Kourtrajmé à Marseille. Son travail relie création artistique et réflexion critique, en considérant le cinéma comme une forme narrative et un outil politique.",
    "about.p5": "À l'aise dans plusieurs contextes culturels et professionnels, Robson Dias développe des projets qui questionnent les récits dominants, placent les voix marginalisées au premier plan et inventent de nouvelles formes de langage cinématographique. Ses films sont aussi des gestes de résistance, de négociation et de réappropriation de l'histoire.",
    "trajectory.cannesTitle": "Docs-in-Progress Award",
    "trajectory.cannesText": "Lauréat de Cannes Docs, Marché du Film, dans le cadre du programme officiel Cannes Docs.",
    "trajectory.item1": "Lauréat, Docs-in-Progress Award - Marché du Film, Cannes",
    "trajectory.item2": "Sélection officielle, Brazilian Showcase - Cannes Docs",
    "trajectory.item3": "Lauréat, MiradasDoc Award - DOCSP, Espagne",
    "trajectory.item4": "Sélectionné, DOCSUR Pitching Lab - Miradas Afroindígenas Market, Tenerife",
    "trajectory.item5": "Participant, European Film Market - Berlinale",
    "trajectory.item6": "Sélectionné, Nicho Laboratory et Dialab Laboratory",
    "trajectory.item7": "Mentorat de Luiz Bolognesi",
    "trajectory.item8": "Loi Paulo Gustavo - Aide au développement de projets audiovisuels, État de Rio de Janeiro",
    "trajectory.item9": "Fonds sectoriel de l'audiovisuel (FSA) - Développement de long métrage",
    "timeline.2023Cannes.title": "Participation au Marché du Film",
    "timeline.2023Cannes.detail": "Le projet a participé au Marché du Film à Cannes alors qu'il était encore en développement.",
    "timeline.nicho.title": "Laboratoire Nicho",
    "timeline.nicho.detail": "Sélectionné pour le laboratoire de développement documentaire de São Paulo dédié aux récits afro-indigènes.",
    "timeline.dialab.title": "DIALAB",
    "timeline.dialab.detail": "Laboratoire de développement de l'Institut des sciences humaines, des arts et des sciences de l'UFBA, à Bahia.",
    "timeline.efm.title": "European Film Market",
    "timeline.efm.detail": "Invitation officielle à participer au marché de la Berlinale comme projet en développement, représentant de nouvelles voix latino-américaines.",
    "timeline.support.title": "Soutien au développement",
    "timeline.support.detail": "Bénéficiaire de la Loi Paulo Gustavo de l'État de Rio de Janeiro, avec le soutien de Savana Investimentos et du Plan Decolonial Fund.",
    "timeline.2025Cannes.title": "Rulli Putortì & Partners Award",
    "timeline.2025Cannes.detail": "Sélection officielle au Brazil Showcase du Docs-in-Progress de Cannes Docs, suivie de trois consultations juridiques de deux heures avec Anna Lisa Putortì et Diana Rulli.",
    "timeline.docsp.title": "DocSP São Paulo",
    "timeline.docsp.detail": "Invité à la plateforme de développement et de mise en relation du documentaire latino-américain à São Paulo.",
    "timeline.miradas.title": "Miradas Indígenas",
    "timeline.miradas.detail": "Sélectionné par MiradasDoc, aux îles Canaries, comme œuvre en fin de postproduction.",
    "timeline.docsur.title": "Laboratoire de pitching",
    "timeline.docsur.detail": "Sélectionné pour le DOCSUR Pitching Lab du Miradas Afroindígenas Market à Tenerife.",
    "timeline.partnerships.title": "Coproduction et impact",
    "timeline.partnerships.detail": "Coproduction Brésil-France soutenue par les deux ambassades et des partenariats stratégiques avec le MST, l'APIB et l'ABA.",
    "recognitions.kicker": "Reconnaissances sélectionnées",
    "recognitions.title": "Une pratique reconnue sur les écrans, les marchés et les festivals.",
    "recognitions.cannesTitle": "Rulli Putortì & Partners Award",
    "recognitions.cannesText": "Lauréat au Doc Day de Cannes Docs. Le prix comprend trois consultations juridiques de deux heures avec Anna Lisa Putortì et Diana Rulli.",
    "recognitions.warnerTitle": "Access Program / MAX",
    "recognitions.warnerText": "Favela Turística a été sélectionné, lancé sur MAX et diffusé en Amérique latine.",
    "recognitions.miradasTitle": "MiradasDoc Award",
    "recognitions.miradasText": "Reconnaissance pour I Heard the Calling, ouvrant un nouveau laboratoire international.",
    "recognitions.berlinaleTitle": "European Film Market",
    "recognitions.berlinaleText": "Participation à l'un des grands rendez-vous du cinéma international.",
    "recognitions.showcaseTitle": "Sélection officielle",
    "recognitions.showcaseText": "Sélection officielle au Brazil Showcase de Cannes Docs en 2025, ouvrant le projet aux professionnels internationaux.",
    "recognitions.docsurTitle": "DOCSUR Pitching Lab",
    "recognitions.docsurText": "Sélectionné pour le laboratoire de pitching du Miradas Afroindígenas Market à Tenerife.",
    "recognitions.awardLabel": "Prix",
    "recognitions.awardTitle": "Docs-in-Progress Award",
    "recognitions.awardText": "Lauréat du Marché du Film, Cannes Docs, pour I Heard the Calling.",
    "recognitions.selectionLabel": "Sélection",
    "recognitions.selectionTitle": "Cannes Docs 2025",
    "recognitions.selectionText": "Sélection officielle au Brazilian Showcase, au contact des professionnels internationaux.",
    "recognitions.labLabel": "Laboratoires",
    "recognitions.labTitle": "DOCSP, DOCSUR et Nicho",
    "recognitions.labText": "Sélectionné par MiradasDoc, le DOCSUR Pitching Lab, le Miradas Afroindígenas Market et le Nicho Laboratory.",
    "recognitions.programLabel": "Programme",
    "recognitions.programTitle": "Warner Bros. Discovery Access",
    "recognitions.programText": "Favela Turística a été sélectionné par l'Access Program puis diffusé sur Max en Amérique latine.",
    "currentSeries.kicker": "Tout juste diffusée / Recherche",
    "currentSeries.title": "Tout juste diffusée : un voyage à travers Rio.",
    "currentSeries.meta": "VPRO / NPO 2 / 2026",
    "currentSeries.text": "Robson Dias a participé comme chercheur à cette série VPRO en trois épisodes avec la journaliste et correspondante en Amérique latine Nina Jurna.",
    "currentSeries.details": "La série suit Nina à travers la ville, des favelas aux quartiers les plus aisés, à un moment où inégalités, sécurité et division politique traversent la vie quotidienne.",
    "currentSeries.releaseLabel": "Disponible",
    "currentSeries.releaseDate": "Depuis le 6 septembre 2026",
    "currentSeries.watchLabel": "Diffusion",
    "currentSeries.formatLabel": "Format",
    "currentSeries.format": "Série documentaire en trois épisodes",
    "currentSeries.premiere": "Première le dimanche 6 septembre à 20 h 15 sur NPO 2, VPRO et NPO Start.",
    "currentSeries.cta": "Voir sur NPO Start",
    "currentSeries.announcement": "Voir l'annonce de la série sur Instagram",
    "talks.kicker": "Rencontres / Transmission / Mentorat",
    "talks.title": "Des échanges qui font avancer la pratique",
    "talks.text": "Parallèlement au cinéma, Robson Dias intervient comme conférencier, enseignant et mentor dans des plateformes professionnelles, des espaces de formation et des programmes culturels. Sa pratique relie cinéma, représentation, auteur et accès, à travers des conférences, masterclasses, tables rondes et ateliers.",
    "talks.cta": "Ouvrir la page complète",
    "contact.kicker": "Ouvrir la conversation",
    "contact.title": "Vous cherchez une histoire qui déplace le cadre ?",
    "contact.text": "Apportez un film, une commande, un atelier ou une question. La bonne collaboration peut commencer par un message clair.",
    "contact.instagram": "Suivre le travail sur Instagram",
    "contact.vimeo": "Voir les films sur Vimeo"
  }
};

const commonTranslations = {
  "Works": ["Trabalhos", "Films"],
  "About": ["Sobre", "À propos"],
  "Talks": ["Conversas", "Rencontres"],
  "Contact": ["Contato", "Contact"],
  "Synopsis": ["Sinopse", "Synopsis"],
  "Context": ["Contexto", "Contexte"],
  "Approach": ["Abordagem", "Approche"],
  "Intent": ["Intenção", "Intention"],
  "Role": ["Função", "Rôle"],
  "Project trajectory": ["Percurso do projeto", "Parcours du projet"],
  "Why this page matters": ["Por que esta página importa", "Pourquoi cette page compte"],
  "Overview": ["Visão geral", "Vue d'ensemble"],
  "Speaking": ["Palestras", "Prises de parole"],
  "Teaching & workshops": ["Ensino e oficinas", "Enseignement et ateliers"],
  "Selected highlights": ["Destaques selecionados", "Sélection"],
  "Completed": ["Concluído", "Terminé"],
  "Post-production": ["Pós-produção", "Post-production"],
  "Short film": ["Curta-metragem", "Court métrage"],
  "Short documentary": ["Curta documental", "Court documentaire"],
  "Feature documentary": ["Longa documental", "Long métrage documentaire"],
  "Director": ["Direção", "Réalisation"],
  "Directors": ["Direção", "Réalisation"],
  "Country": ["País", "Pays"],
  "Countries": ["Países", "Pays"],
  "Runtime": ["Duração", "Durée"],
  "Production": ["Produção", "Production"],
  "Main focus": ["Foco principal", "Sujet principal"],
  "Looking for": ["Em busca de", "Recherche"],
  "Main recognition": ["Reconhecimento principal", "Reconnaissance principale"],
  "Available for": ["Disponível para", "Disponible pour"],
  "Areas": ["Áreas", "Domaines"],
  "Focus": ["Foco", "Focus"],
  "Languages": ["Idiomas", "Langues"],
  "Formats": ["Formatos", "Formats"],
  "Based in": ["Baseado em", "Basé à"],
  "With": ["Com", "Avec"],
  "Format": ["Formato", "Format"],
  "Institution": ["Instituição", "Institution"],
  "Screening": ["Exibição", "Projection"],
  "Circulation": ["Circulação", "Diffusion"]
};

const staticFrenchTranslations = {
  "Feature documentary / Brazil–France": "Long métrage documentaire / Brésil–France",
  "Short documentary / France": "Court métrage documentaire / France",
  "Short documentary / France-Peru": "Court métrage documentaire / France–Pérou",
  "Short documentary / France–Peru": "Court métrage documentaire / France–Pérou",
  "Short / France": "Court métrage / France",
  "Feature documentary / Brazil–Senegal": "Long métrage documentaire / Brésil–Sénégal",
  "Status": "Statut",
  "Runtime": "Durée",
  "Country": "Pays",
  "Countries": "Pays",
  "Director": "Réalisation",
  "Directors": "Réalisation",
  "Context": "Contexte",
  "Synopsis": "Synopsis",
  "Approach": "Approche",
  "Intent": "Intention",
  "Role": "Rôle",
  "Project trajectory": "Parcours du projet",
  "Why this page matters": "Pourquoi cette page compte",
  "Completed": "Terminé",
  "Finalized": "Finalisé",
  "Post-production": "Post-production",
  "Short film": "Court métrage",
  "Short documentary": "Court métrage documentaire",
  "Feature documentary": "Long métrage documentaire",
  "Production": "Production",
  "Main focus": "Sujet principal",
  "Looking for": "Recherche",
  "Main recognition": "Reconnaissance principale",
  "Screening": "Projection",
  "Circulation": "Diffusion",
  "Overview": "Vue d'ensemble",
  "Speaking": "Prises de parole",
  "Teaching & workshops": "Enseignement et ateliers",
  "Available for": "Disponible pour",
  "Selected highlights": "Sélection",
  "Areas": "Domaines",
  "Focus": "Axes",
  "Languages": "Langues",
  "Formats": "Formats",
  "Based in": "Basé à",
  "With": "Avec",
  "Format": "Format",
  "Institution": "Institution",
  "Project teaser": "Bande-annonce du projet",
  "YouTube player": "Lecteur YouTube",
  "Vimeo player": "Lecteur Vimeo"
  ,"Célia Tupinambá atravessa museus europeus em busca dos onze mantos sagrados de seu povo, deslocando a discussão da restituição para um terreno espiritual, político e estético.": "Célia Tupinambá traverse les musées européens à la recherche des onze manteaux sacrés de son peuple, déplaçant la question de la restitution vers un terrain spirituel, politique et esthétique."
  ,"Eu Ouvi o Chamado: O Retorno dos Mantos Tupinambá": "J'ai entendu l'appel : Le retour du manteau tupinamba"
  ,"Status Post-production": "<strong>Statut</strong> Post-production"
  ,"Runtime 90 min": "<strong>Durée</strong> 90 min"
  ,"Countries Brazil / France": "<strong>Pays</strong> Brésil / France"
  ,"Directors Myrza Muniz, Robson Dias, Célia Tupinambá": "<strong>Réalisation</strong> Myrza Muniz, Robson Dias, Célia Tupinambá"
  ,"Looking for Gap financing, buyers, sales agents, international co-producers": "<strong>Recherche</strong> Financement complémentaire, acheteurs, agents de vente et coproducteurs internationaux"
  ,"Main recognition Cannes Docs 2025 / Docs-in-Progress winner": "<strong>Reconnaissance principale</strong> Cannes Docs 2025 / lauréat Docs-in-Progress"
  ,"O filme acompanha a jornada de Célia Tupinambá, artista e liderança indígena, pelos museus europeus onde permanecem os mantos sagrados de seu povo. Distante da aldeia, ela conduz um movimento de retorno desses ancestrais vivos e reabre a história colonial a partir do corpo, da arte, da memória e da reparação cultural.": "Le film suit le parcours de Célia Tupinambá, artiste et figure de proue autochtone, à travers les musées européens où sont conservés les manteaux sacrés de son peuple. Loin de son village, elle porte un mouvement pour le retour de ces ancêtres vivants et rouvre l'histoire coloniale à partir du corps, de l'art, de la mémoire et de la réparation culturelle."
  ,"Winner of Docs-in-Progress Award — Marché du Film, Cannes 2025": "Lauréat du Docs-in-Progress Award — Marché du Film, Cannes 2025"
  ,"Official Selection — Brazilian Showcase, Cannes Docs 2025": "Sélection officielle — Brazilian Showcase, Cannes Docs 2025"
  ,"Winner of MiradasDoc Award — DOCSP 2025": "Lauréat du MiradasDoc Award — DOCSP 2025"
  ,"Selected for DOCSUR Pitching Lab — Miradas Afroindígenas Market 2025": "Sélectionné pour le DOCSUR Pitching Lab — Miradas Afroindígenas Market 2025"
  ,"Participant — European Film Market, Berlinale 2024": "Participant — European Film Market, Berlinale 2024"
  ,"Selected for Nicho Laboratory": "Sélectionné pour le laboratoire Nicho"
  ,"Selected for Dialab Laboratory": "Sélectionné pour le laboratoire Dialab"
  ,"Esta subpágina foi pensada para programadores, financiadores, coprodutores e instituições: ela deve concentrar teaser, stills, sinopse, trajectory, parceiros, press quotes e um bloco claro com o que o projeto busca neste momento.": "Cette page s'adresse aux programmateurs, financeurs, coproducteurs et institutions. Elle réunit la bande-annonce, les images, le synopsis, le parcours, les partenaires, les citations de presse et un aperçu clair des besoins actuels du projet."
  ,"Set in the coastal town of Cassis, the film follows the presence of Chriss, a poet whose words and rhythms inhabit the landscape of the Calanques. Emerging from a filmmaking residency, the project navigates between territory, language and perception, questioning how a place is observed, narrated and transformed through artistic encounter.": "Situé dans la ville côtière de Cassis, le film suit la présence de Chriss, un poète dont les mots et les rythmes habitent le paysage des Calanques. Issu d'une résidence de création cinématographique, le projet circule entre territoire, langage et perception, interrogeant la manière dont un lieu est observé, raconté et transformé par la rencontre artistique."
  ,"Status Completed": "<strong>Statut</strong> Terminé"
  ,"Runtime Short film": "<strong>Durée</strong> Court métrage"
  ,"Country France": "<strong>Pays</strong> France"
  ,"Director Robson Dias": "<strong>Réalisation</strong> Robson Dias"
  ,"Context Master in Documentary Filmmaking": "<strong>Contexte</strong> Master Écritures Documentaires"
  ,"Year 2019": "<strong>Année</strong> 2019"
  ,"In Cassis, a film crew searches for a subject as part of an artistic residency. Their encounter with Chriss, a poet rooted in the territory, gradually shifts the direction of the film. What begins as a search becomes an immersion — where voice, landscape and presence intersect.": "À Cassis, une équipe de cinéma cherche un sujet dans le cadre d'une résidence artistique. Sa rencontre avec Chriss, poète ancré dans le territoire, déplace peu à peu la direction du film. Ce qui commence comme une recherche devient une immersion, où voix, paysage et présence se rencontrent."
  ,"The film was developed within the residency program “Les Calanques, territoire de sciences, source d’inspiration,” promoted by the Parc national des Calanques, the Camargo Foundation and Institut Pythéas. Conceived during the Master’s program in Documentary Filmmaking at Aix-Marseille Université, the project reflects a research-based approach to cinema, where fieldwork, encounter and territory shape the narrative form.": "Le film a été développé dans le cadre de la résidence « Les Calanques, territoire de sciences, source d'inspiration », portée par le Parc national des Calanques, la Fondation Camargo et l'Institut Pythéas. Conçu pendant le Master Écritures Documentaires d'Aix-Marseille Université, le projet relève d'une approche du cinéma fondée sur la recherche, où le terrain, la rencontre et le territoire façonnent la forme narrative."
  ,"The film operates at the boundary between observation and construction. Rather than imposing a predefined narrative, it allows the presence of the poet and the specificity of the location to guide the cinematic gesture. The landscape becomes both subject and structure, while language — spoken, performed, fragmented — opens a space between documentary and poetic form.": "Le film se situe à la frontière entre observation et construction. Plutôt que d'imposer un récit prédéfini, il laisse la présence du poète et la singularité du lieu guider le geste cinématographique. Le paysage devient à la fois sujet et structure, tandis que la langue, dite, performée ou fragmentée, ouvre un espace entre documentaire et forme poétique."
  ,"4800 explores how a territory can be read, inhabited and reinterpreted through artistic practice. It questions the position of the filmmaker in relation to place and subject, revealing cinema not as a tool of capture, but as a process of negotiation, translation and presence.": "4800 explore la manière dont un territoire peut être lu, habité et réinterprété par la pratique artistique. Le film interroge la position du cinéaste face au lieu et au sujet, révélant le cinéma non comme un outil de captation, mais comme un processus de négociation, de traduction et de présence."
  ,"Developed during Master Écritures Documentaires – Aix-Marseille Université": "Développé dans le cadre du Master Écritures Documentaires — Aix-Marseille Université"
  ,"Created within the Calanques artistic residency program": "Créé dans le cadre de la résidence artistique des Calanques"
  ,"In collaboration with Parc national des Calanques, Fondation Camargo and Institut Pythéas": "En collaboration avec le Parc national des Calanques, la Fondation Camargo et l'Institut Pythéas"
  ,"Research-based documentary practice combining territory and artistic exploration": "Pratique documentaire fondée sur la recherche, entre territoire et exploration artistique"
  ,"A short documentary portrait of Libyan graffiti artist Anas Adambawi during his passage through Marseille, invited to the Instants Vidéo festival.": "Un portrait documentaire du graffeur libyen Anas Adambawi lors de son passage à Marseille, invité au festival Instants Vidéo."
  ,"Filmed within the context of the Master’s program in documentary filmmaking at Aix-Marseille Université, Anas explores the presence of an artist in displacement — between territories, identities and visual languages. Through an observational and poetic approach, the film captures gestures, silences and fragments of creation, questioning how urban space, exile and artistic practice intersect.": "Réalisé dans le cadre du Master Écritures Documentaires d'Aix-Marseille Université, <em>Anas</em> explore la présence d'un artiste en déplacement, entre territoires, identités et langages visuels. Par une approche observationnelle et poétique, le film saisit gestes, silences et fragments de création, interrogeant les croisements entre espace urbain, exil et pratique artistique."
  ,"The film was presented in the context of the Instants Vidéo – International Festival of Digital and Poetic Video, a long-standing platform dedicated to experimental moving image practices, installations and performances, bringing together artists from across the world and exploring the political and poetic dimensions of images.": "Le film a été présenté dans le cadre des Instants Vidéo — Festival international de la vidéo numérique et poétique, une plateforme historique dédiée aux pratiques expérimentales de l'image en mouvement, aux installations et aux performances, réunissant des artistes du monde entier et explorant les dimensions politiques et poétiques des images."
  ,"Portrait of a Libyan graffiti artist in Marseille": "Portrait d'un graffeur libyen à Marseille"
  ,"Directors Jacopo De Falco, Robson Dias, Arthur Kramer": "<strong>Réalisation</strong> Jacopo De Falco, Robson Dias, Arthur Kramer"
  ,"With Anas Adambawi": "<strong>Avec</strong> Anas Adambawi"
  ,"Format Short documentary": "<strong>Format</strong> Court métrage documentaire"
  ,"Context Master’s project": "<strong>Contexte</strong> Projet de master"
  ,"Institution Aix-Marseille Université": "<strong>Institution</strong> Aix-Marseille Université"
  ,"Screening Instants Vidéo Festival, Marseille": "<strong>Projection</strong> Festival Instants Vidéo, Marseille"
  ,"Anas is a portrait of Libyan graffiti artist Anas Adambawi during his time in Marseille. Invited for the Instants Vidéo festival, the film follows his movements, gestures and presence in the city, capturing the tension between displacement, artistic expression and identity. Through fragments of daily life and creation, the film explores how graffiti becomes both a language and a territory.": "<em>Anas</em> est le portrait du graffeur libyen Anas Adambawi lors de son séjour à Marseille. Invité au festival Instants Vidéo, le film suit ses déplacements, ses gestes et sa présence dans la ville, saisissant la tension entre déplacement, expression artistique et identité. À travers des fragments de quotidien et de création, il explore comment le graffiti devient à la fois un langage et un territoire."
  ,"Produced within the Master’s program in documentary filmmaking at Aix-Marseille Université, the film engages with experimental and poetic forms of non-fiction. It was presented in the context of the Instants Vidéo – an international festival dedicated to video art, digital forms and poetic cinema, bringing together artists from dozens of countries. The project reflects a research-based approach to image-making, where documentary intersects with contemporary art practices.": "Produit dans le cadre du Master Écritures Documentaires d'Aix-Marseille Université, le film s'inscrit dans des formes expérimentales et poétiques de non-fiction. Il a été présenté aux Instants Vidéo, festival international consacré à l'art vidéo, aux formes numériques et au cinéma poétique, réunissant des artistes de dizaines de pays. Le projet reflète une approche de l'image fondée sur la recherche, à l'intersection du documentaire et des pratiques artistiques contemporaines."
  ,"The film adopts a minimal and observational approach, privileging presence over explanation. Rather than constructing a conventional narrative, it builds a sensory experience shaped by gestures, textures and urban space. The camera follows the artist without imposing discourse, allowing the viewer to encounter the subject through rhythm, silence and movement.": "Le film adopte une approche minimale et observationnelle, privilégiant la présence à l'explication. Plutôt que de construire un récit conventionnel, il compose une expérience sensorielle à partir des gestes, des textures et de l'espace urbain. La caméra accompagne l'artiste sans imposer de discours, laissant le spectateur rencontrer le sujet par le rythme, le silence et le mouvement."
  ,"Screened as part of the Instants Vidéo festival in Marseille, a platform for international video art and experimental cinema. The festival is recognized for presenting works across projections, installations and performances, fostering dialogue between art, society and image.": "Projeté dans le cadre des Instants Vidéo à Marseille, plateforme consacrée à l'art vidéo international et au cinéma expérimental. Le festival est reconnu pour présenter des œuvres sous forme de projections, d'installations et de performances, favorisant le dialogue entre art, société et image."
  ,"um ex-escravizado que, contra as expectativas da época, tornou-se proprietário de sua terra. Descobrir o que nunca foi claramente contado nos livros sobre agentes da resistência negra de Campos dos Goytacazes.": "L'histoire d'un ancien esclave qui, contre les attentes de son époque, est devenu propriétaire de sa terre. Une enquête sur ce que les livres n'ont jamais raconté clairement des acteurs de la résistance noire à Campos dos Goytacazes."
  ,"A história de um homem escravizado que, contra as expectativas de sua época, tornou-se proprietário de sua terra. O filme procura o que os livros nunca contaram claramente sobre os agentes da resistência negra de Campos dos Goytacazes.": "L'histoire d'un homme réduit en esclavage qui, contre les attentes de son époque, est devenu propriétaire de sa terre. Le film cherche ce que les livres n'ont jamais raconté clairement sur les acteurs de la résistance noire à Campos dos Goytacazes."
  ,"Status Développement / Desenvolvimento": "<strong>Statut</strong> Développement"
  ,"Status Em desenvolvimento": "<strong>Statut</strong> En développement"
  ,"Runtime Longa-metragem documental": "<strong>Durée</strong> Long métrage documentaire"
  ,"Duração Longa-metragem documental": "<strong>Durée</strong> Long métrage documentaire"
  ,"Countries France / Brazil": "<strong>Pays</strong> France / Brésil"
  ,"Países França / Brasil": "<strong>Pays</strong> France / Brésil"
  ,"Direção Robson Dias": "<strong>Réalisation</strong> Robson Dias"
  ,"Production Airelles Production / Selvatica Films": "<strong>Production</strong> Airelles Production / Selvatica Films"
  ,"Produção Airelles Production / Selvatica Films": "<strong>Production</strong> Airelles Production / Selvatica Films"
  ,"Main focus Mémoire, héritage et résistance noire à Campos dos Goytacazes": "<strong>Sujet principal</strong> Mémoire, héritage et résistance noire à Campos dos Goytacazes"
  ,"Foco central Memória, herança e resistência negra em Campos dos Goytacazes": "<strong>Sujet principal</strong> Mémoire, héritage et résistance noire à Campos dos Goytacazes"
  ,"An enslaved man, his family, and the legacy left behind. What remains when even the cemetery refuses to keep the secrets of slavery.": "Un homme réduit en esclavage, sa famille et l'héritage qu'ils laissent. Que reste-t-il lorsque même le cimetière refuse de garder les secrets de l'esclavage ?"
  ,"Um homem escravizado, sua família e o legado deixado para trás. O que permanece quando até o cemitério se recusa a guardar os segredos da escravidão?": "Un homme réduit en esclavage, sa famille et l'héritage qu'ils laissent. Que reste-t-il lorsque même le cimetière refuse de garder les secrets de l'esclavage ?"
  ,"In 2026, the United Nations General Assembly adopted a resolution declaring the trafficking of enslaved Africans and racialized chattel enslavement of Africans as “the gravest crime against humanity,” giving renewed historical and political force to the film’s central wound.": "En 2026, l'Assemblée générale des Nations unies a adopté une résolution qualifiant la traite des Africains réduits en esclavage et l'esclavage racial des Africains de « crime le plus grave contre l'humanité », donnant une force historique et politique renouvelée à la blessure centrale du film."
  ,"Em 2026, a Assembleia Geral das Nações Unidas adotou uma resolução que declara o tráfico de africanos escravizados e a escravização racializada de africanos como \"o crime mais grave contra a humanidade\", dando nova força histórica e política à ferida central do filme.": "En 2026, l'Assemblée générale des Nations unies a adopté une résolution qualifiant la traite des Africains réduits en esclavage et l'esclavage racial des Africains de « crime le plus grave contre l'humanité », donnant une force historique et politique renouvelée à la blessure centrale du film."
  ,"Synopsis ENG": "Synopsis"
  ,"Barrinha follows the traces of an enslaved man, his family, and the fractured legacy that survives across generations. The film asks what is left when memory is buried, silenced, and denied a place to rest.": "<em>Barrinha</em> suit les traces d'un homme réduit en esclavage, de sa famille et de l'héritage fracturé qui survit à travers les générations. Le film interroge ce qui demeure lorsque la mémoire est enterrée, réduite au silence et privée d'un lieu où reposer."
  ,"Barrinha acompanha os vestígios de um homem escravizado, de sua família e do legado fragmentado que sobrevive através das gerações. O filme pergunta o que resta quando a memória é enterrada, silenciada e impedida de encontrar repouso.": "<em>Barrinha</em> suit les traces d'un homme réduit en esclavage, de sa famille et de l'héritage fragmenté qui survit à travers les générations. Le film interroge ce qui demeure lorsque la mémoire est enterrée, réduite au silence et privée d'un lieu où reposer."
  ,"Set against the enduring afterlife of slavery, the project gains even deeper urgency after the United Nations, in 2026, recognized the trafficking of enslaved Africans and racialized chattel enslavement as the gravest crime against humanity.": "Face à la survivance de l'esclavage, le projet prend une urgence plus profonde après que les Nations unies ont reconnu en 2026 la traite des Africains réduits en esclavage et l'esclavage racial comme le crime le plus grave contre l'humanité."
  ,"Diante da permanência da escravidão no presente, o projeto ganha ainda mais urgência depois que as Nações Unidas reconheceram, em 2026, o tráfico de africanos escravizados e a escravização racializada como o crime mais grave contra a humanidade.": "Face à la survivance de l'esclavage dans le présent, le projet prend une urgence plus profonde après que les Nations unies ont reconnu en 2026 la traite des Africains réduits en esclavage et l'esclavage racial comme le crime le plus grave contre l'humanité."
  ,"Projet en développement": "Projet en développement"
  ,"Projeto em desenvolvimento": "Projet en développement"
  ,"Réalisateur : Robson Dias": "Réalisation : Robson Dias"
  ,"Direção: Robson Dias": "Réalisation : Robson Dias"
  ,"Production : Airelles Production et Selvatica Films": "Production : Airelles Production et Selvatica Films"
  ,"Produção: Airelles Production e Selvatica Films": "Production : Airelles Production et Selvatica Films"
  ,"Recherche centrée sur mémoire familiale, transmission et résistance noire": "Recherche centrée sur la mémoire familiale, la transmission et la résistance noire"
  ,"Pesquisa centrada em memória familiar, transmissão e resistência negra": "Recherche centrée sur la mémoire familiale, la transmission et la résistance noire"
  ,"Ancrage narratif entre France et Brésil": "Ancrage narratif entre la France et le Brésil"
  ,"Ancoragem narrativa entre França e Brasil": "Ancrage narratif entre la France et le Brésil"
  ,"Esta página apresenta Barrinha como um projeto em desenvolvimento que articula memória íntima, herança familiar e história coletiva. Ela deve servir para parceiros, produtores, apoiadores e laboratórios compreenderem rapidamente a força política, emocional e cinematográfica do filme.": "Cette page présente <em>Barrinha</em> comme un projet en développement articulant mémoire intime, héritage familial et histoire collective. Elle permet aux partenaires, producteurs, soutiens et laboratoires de comprendre rapidement la force politique, émotionnelle et cinématographique du film."
  ,"La violence n’est pas seulement celle des policiers. Une société qui valide l’agression en est tout autant responsable. »": "« La violence n'est pas seulement celle des policiers. Une société qui valide l'agression en est tout autant responsable. »"
  ,"Status Completed": "<strong>Statut</strong> Terminé"
  ,"Runtime Short": "<strong>Durée</strong> Court métrage"
  ,"Country France": "<strong>Pays</strong> France"
  ,"Genre Documentary": "<strong>Genre</strong> Documentaire"
  ,"Main focus Violence, police routine, social responsibility": "<strong>Sujet principal</strong> Violence, routine policière et responsabilité sociale"
  ,"O filme observa e tensiona o cotidiano de abordagens policiais, revelando como a violência não se limita ao gesto individual, mas se inscreve em estruturas mais amplas de normalização e aceitação social.": "Le film observe et met sous tension le quotidien des contrôles policiers, révélant que la violence ne se limite pas au geste individuel, mais s'inscrit dans des structures plus larges de normalisation et d'acceptation sociale."
  ,"Inspirado por uma tradição de cinema que busca capturar o real sem mediação espetacular, o filme se aproxima da rotina policial para expor seus mecanismos, suas repetições e suas zonas de ambiguidade. Ao invés de narrativas heroicas ou demonizantes, propõe uma observação direta, colocando o espectador na posição de testemunha.": "Inspiré d'une tradition cinématographique qui cherche à saisir le réel sans médiation spectaculaire, le film s'approche de la routine policière pour en exposer les mécanismes, les répétitions et les zones d'ambiguïté. Plutôt que des récits héroïques ou démonisants, il propose une observation directe, plaçant le spectateur en position de témoin."
  ,"O projeto desloca o foco do indivíduo para o sistema. A violência aparece não como exceção, mas como prática possível dentro de um contexto social que a legitima, a reproduz e, muitas vezes, a invisibiliza.": "Le projet déplace le regard de l'individu vers le système. La violence apparaît non comme une exception, mais comme une pratique possible dans un contexte social qui la légitime, la reproduit et, souvent, l'invisibilise."
  ,"Direção, concepção e construção narrativa. O filme se inscreve em uma pesquisa contínua sobre imagem, poder e representação, atravessando questões de território, controle e responsabilidade coletiva.": "Réalisation, conception et construction narrative. Le film s'inscrit dans une recherche continue sur l'image, le pouvoir et la représentation, traversée par les questions de territoire, de contrôle et de responsabilité collective."
  ,"A short documentary about tourism, representation, and the tensions between image, market, and territory in the favelas of Rio de Janeiro.": "Un court métrage documentaire sur le tourisme, la représentation et les tensions entre image, marché et territoire dans les favelas de Rio de Janeiro."
  ,"Watch on MAX": "Voir sur MAX"
  ,"Festivals, broadcasters and partners": "Festivals, diffuseurs et partenaires"
  ,"Role Director": "<strong>Rôle</strong> Réalisation"
  ,"Country Brazil": "<strong>Pays</strong> Brésil"
  ,"Cinematography Hugo Anikupulapo": "<strong>Direction de la photographie</strong> Hugo Anikupulapo"
  ,"Platform MAX (Warner Bros. Discovery)": "<strong>Plateforme</strong> MAX (Warner Bros. Discovery)"
  ,"Series Untold Black Narratives — Season 1, Episode 3": "<strong>Série</strong> Untold Black Narratives — saison 1, épisode 3"
  ,"Favela Turística offers a critical perspective on tourism in Rocinha, the largest favela in Rio de Janeiro and one of the most visited locations in the city. Through the voices of a tour guide, an activist and a cultural agitator — all residents of Rocinha — the film questions who truly benefits from this global curiosity.": "<em>Favela Turística</em> porte un regard critique sur le tourisme à Rocinha, la plus grande favela de Rio de Janeiro et l'un des lieux les plus visités de la ville. À travers les voix d'un guide touristique, d'un militant et d'un acteur culturel, tous habitants de Rocinha, le film interroge qui profite réellement de cette curiosité mondiale."
  ,"As thousands of tourists circulate through narrow streets and everyday life becomes spectacle, the documentary shifts the focus toward those who are rarely heard: the residents themselves. How do they navigate constant exposure? What does it mean to be transformed into an attraction? Between economic opportunity and symbolic exploitation, the film reveals what remains unseen behind the “favela tour”.": "Alors que des milliers de touristes parcourent les rues étroites et que le quotidien devient spectacle, le documentaire déplace le regard vers ceux que l'on entend rarement : les habitants eux-mêmes. Comment vivent-ils cette exposition constante ? Que signifie devenir une attraction ? Entre opportunité économique et exploitation symbolique, le film révèle ce qui reste invisible derrière le « favela tour »."
  ,"Part of the series Untold Black Narratives, this film engages directly with structural questions around representation, race and the global consumption of marginalized territories. By placing the camera in the hands of those who inhabit these spaces, the work confronts dominant narratives shaped by external gazes.": "Inscrit dans la série <em>Untold Black Narratives</em>, ce film aborde directement les questions structurelles de représentation, de race et de consommation mondiale des territoires marginalisés. En plaçant la caméra du côté de celles et ceux qui habitent ces espaces, l'œuvre confronte les récits dominants façonnés par des regards extérieurs."
  ,"The project examines tourism not as a neutral activity, but as a system embedded in power relations — where visibility, economy and inequality intersect. Within Robson Dias’ body of work, the film reinforces an ongoing investigation into image politics, territory and the tension between visibility and exploitation.": "Le projet envisage le tourisme non comme une activité neutre, mais comme un système inscrit dans des rapports de pouvoir où se croisent visibilité, économie et inégalités. Dans le travail de Robson Dias, le film prolonge une recherche sur les politiques de l'image, le territoire et la tension entre visibilité et exploitation."
  ,"Favela Turística was produced within Warner Bros. Discovery’s Untold Black Narratives initiative and released on MAX across Latin America as Season 1, Episode 3.": "<em>Favela Turística</em> a été produit dans le cadre de l'initiative <em>Untold Black Narratives</em> de Warner Bros. Discovery et diffusé sur MAX en Amérique latine comme saison 1, épisode 3."
  ,"The film has also circulated through independent and community-based screening contexts, including the Encontro de Cinema Negro Zózimo Bulbul, where it was presented in the section Raízes em Movimento at CineCarioca Penha, Rio de Janeiro.": "Le film a aussi circulé dans des contextes de projection indépendants et communautaires, notamment lors de l'<em>Encontro de Cinema Negro Zózimo Bulbul</em>, où il a été présenté dans la section <em>Raízes em Movimento</em> au CineCarioca Penha, à Rio de Janeiro."
  ,"In Europe, the film was screened at the Rencontres du Cinéma Brésilien at Cinéma L’Alhambra in Marseille, followed by a discussion with the filmmakers. These screenings extend the film’s dialogue beyond streaming, connecting its critique of favela tourism with audiences in Brazil and France.": "En Europe, le film a été projeté aux <em>Rencontres du Cinéma Brésilien</em> au Cinéma L'Alhambra à Marseille, suivi d'un échange avec les cinéastes. Ces séances prolongent le dialogue du film au-delà du streaming et relient sa critique du tourisme dans les favelas à des publics du Brésil et de la France."
  ,"MAX / Warner Bros. Discovery — Untold Black Narratives, Season 1, Episode 3": "MAX / Warner Bros. Discovery — <em>Untold Black Narratives</em>, saison 1, épisode 3"
  ,"This page presents Huella as a documentary shaped through artistic immersion in the Peruvian Amazon. It helps partners, programmers and collaborators quickly understand the film’s trajectory, its hybrid artistic approach, and its commitment to making visible Amazonian peoples, territories and struggles.": "Cette page présente <em>Huella</em> comme un documentaire né d'une immersion artistique en Amazonie péruvienne. Elle permet aux partenaires, programmateurs et collaborateurs de comprendre rapidement le parcours du film, son approche artistique hybride et son engagement à rendre visibles les peuples, les territoires et les luttes amazoniens."
  ,"Status Finalized": "<strong>Statut</strong> Finalisé"
  ,"Runtime Short": "<strong>Durée</strong> Court métrage"
  ,"Countries France / Peru": "<strong>Pays</strong> France / Pérou"
  ,"Production Buzios films / Morgane CIA": "<strong>Production</strong> Búzios Films / Morgane CIA"
  ,"Main focus Mémoire, héritage et résistance noire à Campos dos Goytacazes": "<strong>Sujet principal</strong> Peuples, territoires et luttes amazoniens"
  ,"The inspiration comes from Herzog’s quest in his “conquest of the useless,” both his own and that of his character Fitzcarraldo. The documentary Huella allows itself an unpretentious search for what was missing in the majestic landscapes of pure nature. A performance project conceived and developed by Justine Bertignon and Mosi Espinoza, who invited filmmaker Robson Dias to accompany their creative process as it confronts its original source of inspiration: the Peruvian Amazon rainforest.": "L'inspiration vient de la quête de Herzog dans sa « conquête de l'inutile », la sienne comme celle de son personnage Fitzcarraldo. Le documentaire <em>Huella</em> s'autorise une recherche sans prétention de ce qui manquait aux paysages majestueux d'une nature dite pure. Projet de performance conçu et développé par Justine Bertignon et Mosi Espinoza, il invite le cinéaste Robson Dias à accompagner leur processus de création lorsqu'il se confronte à sa source d'inspiration première : la forêt amazonienne péruvienne."
  ,"World premiere at FIFAC – Amazonia and Caribbean International Documentary Film Festival, 2024": "Première mondiale au FIFAC — Festival international du film documentaire Amazonie-Caraïbes, 2024"
  ,"Screened in the Écrans Parallèles section": "Projeté dans la section Écrans Parallèles"
  ,"Directed by Mosi Espinoza and Justine Berthillot": "Réalisé par Mosi Espinoza et Justine Berthillot"
  ,"Edited by Clement Fessy and Mosi Espinoza": "Monté par Clément Fessy et Mosi Espinoza"
  ,"Cinematography by Robson Dias": "Direction de la photographie : Robson Dias"
  ,"Sound recording by Mauricio Espinoza": "Prise de son : Mauricio Espinoza"
  ,"Created during the tour of the stage performance in the Peruvian Amazon": "Créé pendant la tournée de la performance scénique en Amazonie péruvienne"
  ,"An art-documentary weaving together reality and imagination, bodies and voices, the Amazon forest and the artistic universe": "Un documentaire artistique tissant réalité et imaginaire, corps et voix, forêt amazonienne et univers artistique"
  ,"A film committed to amplifying Amazonian peoples and their political, ecological and spiritual struggles": "Un film engagé à amplifier les peuples amazoniens et leurs luttes politiques, écologiques et spirituelles"
  ,"KABADIO o tempo não tem pressa, anda descalço": "KABADIO<br>le temps n'est pas pressé, il marche pieds nus"
  ,"No coração do Senegal, um pequeno vilarejo muçulmano chamado Kabadio é uma espécie de éden místico protegido por líderes religiosos. Este é o cenário para fascinantes histórias de personagens reais que lutam para sobreviver, mantendo suas tradições, em meio à guerra civil e ao contrabando de mercadorias.": "Au cœur du Sénégal, un petit village musulman appelé Kabadio est une sorte d'Éden mystique protégé par des chefs religieux. C'est le cadre d'histoires fascinantes de personnages réels qui luttent pour survivre tout en préservant leurs traditions, au milieu de la guerre civile et de la contrebande."
  ,"Status 2017": "<strong>Année</strong> 2017"
  ,"Countries Brazil / Senegal": "<strong>Pays</strong> Brésil / Sénégal"
  ,"Directors Daniel Leite": "<strong>Réalisation</strong> Daniel Leite"
  ,"Main recognition Festival do Rio": "<strong>Reconnaissance principale</strong> Festival do Rio"
  ,"Official Selection — 7th AFRIFF Africa International Film Festival (Nigeria)": "Sélection officielle — 7e AFRIFF Africa International Film Festival (Nigeria)"
  ,"Official Selection — 4e L'Appel des Chantiers (France)": "Sélection officielle — 4e L'Appel des Chantiers (France)"
  ,"Official Selection — 2° Social Machinery Film Festival (Italy)": "Sélection officielle — 2e Social Machinery Film Festival (Italie)"
  ,"Official Selection — 13ª Mostra de Cinema Documentário [CineDocumenta] (Brazil)": "Sélection officielle — 13e Mostra de Cinema Documentário [CineDocumenta] (Brésil)"
  ,"Official Selection — 17th Urban Mediamakers Film Festival (USA)": "Sélection officielle — 17e Urban Mediamakers Film Festival (États-Unis)"
  ,"Official Selection — 7º Cine Cipó BH – Festival do Filme Insurgente (Brazil)": "Sélection officielle — 7e Cine Cipó BH – Festival do Filme Insurgente (Brésil)"
  ,"Official Selection — 5ª Mostra Livre de Cinema (Brazil)": "Sélection officielle — 5e Mostra Livre de Cinema (Brésil)"
  ,"Official Selection — 18º Festival do Rio de Cinema (Brazil)": "Sélection officielle — 18e Festival do Rio de Cinema (Brésil)"
  ,"Official Selection — Cine MIS/SP – Museu da Imagem e do Som (Brazil)": "Sélection officielle — Cine MIS/SP – Museu da Imagem e do Som (Brésil)"
  ,"Official Selection — 3º Santos Film Festival (Brazil)": "Sélection officielle — 3e Santos Film Festival (Brésil)"
  ,"Official Selection — 4th Sofia Biting Docs Film Festival (Bulgaria)": "Sélection officielle — 4e Sofia Biting Docs Film Festival (Bulgarie)"
  ,"Official Selection — 4th International Film Festival of Shimla (India)": "Sélection officielle — 4e International Film Festival of Shimla (Inde)"
  ,"Official Selection — 3rd Black Star International Film Festival (Ghana)": "Sélection officielle — 3e Black Star International Film Festival (Ghana)"
  ,"Official Selection — 1st Echo Film Festival BRICS (Russia)": "Sélection officielle — 1er Echo Film Festival BRICS (Russie)"
  ,"Official Selection — 3rd Heritales International Heritage Film Festival (Portugal)": "Sélection officielle — 3e Heritales International Heritage Film Festival (Portugal)"
  ,"Um retrato íntimo de Marianne, uma mulher que convive com vozes e constrói, através delas, uma relação singular com sua própria existência.": "Un portrait intime de Marianne, une femme qui vit avec des voix et construit, à travers elles, une relation singulière avec sa propre existence."
  ,"Runtime 26 min": "<strong>Durée</strong> 26 min"
  ,"Director Elina Chared": "<strong>Réalisation</strong> Elina Chared"
  ,"Cinematography Robson Dias, Célestin Monteil": "<strong>Direction de la photographie</strong> Robson Dias, Célestin Monteil"
  ,"Production Aix-Marseille Université": "<strong>Production</strong> Aix-Marseille Université"
  ,"Marianne parece carregar várias vidas em seu rosto. A partir de fragmentos do cotidiano, o filme revela sua relação íntima com as vozes que escuta. Entre reinvenção, performance e fragilidade, emerge o retrato de uma mulher que luta para existir na complexidade de sua singularidade.": "Marianne semble porter plusieurs vies sur son visage. À partir de fragments du quotidien, le film révèle sa relation intime aux voix qu'elle entend. Entre réinvention, performance et fragilité, émerge le portrait d'une femme qui lutte pour exister dans la complexité de sa singularité."
  ,"O filme se constrói a partir da proximidade com o rosto e o corpo da protagonista, evitando representações espetaculares das vozes internas e privilegiando uma escuta sensível e exteriorizada da experiência vivida.": "Le film se construit à partir de la proximité avec le visage et le corps de la protagoniste, évitant les représentations spectaculaires des voix intérieures et privilégiant une écoute sensible et incarnée de l'expérience vécue."
  ,"Festival International Jean Rouch – seleção": "Festival International Jean Rouch — sélection"
  ,"Festival International de Films de Femmes – seleção": "Festival International de Films de Femmes — sélection"
  ,"Exibido em contextos acadêmicos e festivais documentais": "Projeté dans des contextes universitaires et des festivals documentaires"
  ,"Produzido no Master Écritures Documentaires – Aix-Marseille": "Produit dans le cadre du Master Écritures Documentaires — Aix-Marseille"
  ,"Direção de fotografia compartilhada, construindo uma abordagem visual baseada na proximidade com a personagem, no tempo real e na presença do corpo como eixo central da narrativa.": "Direction de la photographie partagée, construisant une approche visuelle fondée sur la proximité avec le personnage, le temps réel et la présence du corps comme axe central du récit."
  ,"Talks / Teaching / Mentoring": "Rencontres / Transmission / Mentorat"
  ,"A practice connecting cinema, representation, documentary language, authorship and access through talks, teaching and mentoring.": "Une pratique qui relie le cinéma, la représentation, le langage documentaire, l'auteur et l'accès à travers des prises de parole, l'enseignement et le mentorat."
  ,"Selected partners, schools and platforms": "Partenaires, écoles et plateformes sélectionnés"
  ,"Areas Talks, panels, workshops, mentoring": "<strong>Domaines</strong> Conférences, tables rondes, ateliers, mentorat"
  ,"Focus Documentary, representation, authorship, image politics": "<strong>Axes</strong> Documentaire, représentation, auteur, politiques de l'image"
  ,"Languages Portuguese, French, English": "<strong>Langues</strong> Portugais, français, anglais"
  ,"Formats Keynotes, panels, schools, labs, practical workshops": "<strong>Formats</strong> Conférences, tables rondes, écoles, laboratoires, ateliers pratiques"
  ,"Based in Marseille / working internationally": "<strong>Basé à</strong> Marseille / activité internationale"
  ,"Robson Dias works not only as a director, editor and cinematographer, but also as a speaker, teacher and mentor. His interventions are grounded in practice: festival circulation, international co-production, documentary form, political cinema, decolonial perspectives and Afro-Indigenous representation.": "Robson Dias travaille non seulement comme réalisateur, monteur et directeur de la photographie, mais aussi comme conférencier, enseignant et mentor. Ses interventions s'ancrent dans la pratique : circulation en festivals, coproduction internationale, forme documentaire, cinéma politique, perspectives décoloniales et représentation afro-autochtone."
  ,"His approach combines professional experience with critical reflection, creating spaces where artistic language, industry realities and structural questions can be addressed together.": "Son approche associe expérience professionnelle et réflexion critique, créant des espaces où le langage artistique, les réalités de l'industrie et les questions structurelles peuvent être abordés ensemble."
  ,"Robson has appeared as a speaker at Cannes Docs 2025 — Marché du Film, in the panel “Voices of the Majority in Film,” focused on Afro-descendant representation, financing and distribution in Brazil. He has also taken part in Rio2C, one of Latin America’s major events for audiovisual, music and innovation.": "Robson est intervenu à Cannes Docs 2025 — Marché du Film, lors de la table ronde « Voices of the Majority in Film », consacrée à la représentation afrodescendante, au financement et à la diffusion au Brésil. Il a également participé à Rio2C, l'un des grands rendez-vous latino-américains de l'audiovisuel, de la musique et de l'innovation."
  ,"In Marseille, he has taught camera practice at École Kourtrajmé and led camera workshops at Civic-fab. He has also worked as an editing instructor with collectif LFKs, contributing to self-directed and alternative learning contexts.": "À Marseille, il a enseigné la pratique de la caméra à l'École Kourtrajmé et animé des ateliers de caméra à Civic-fab. Il a aussi travaillé comme formateur au montage avec le collectif LFKs, contribuant à des contextes d'apprentissage autonomes et alternatifs."
  ,"These workshops are designed for emerging filmmakers, artists and participants seeking practical tools as well as a broader understanding of how images produce meaning, power and visibility.": "Ces ateliers s'adressent aux cinéastes émergents, artistes et participants qui cherchent des outils pratiques ainsi qu'une compréhension plus large de la manière dont les images produisent du sens, du pouvoir et de la visibilité."
  ,"Festival talks and public conversations": "Rencontres de festivals et conversations publiques"
  ,"Panels on documentary, representation and decolonial cinema": "Tables rondes sur le documentaire, la représentation et le cinéma décolonial"
  ,"Camera and editing workshops": "Ateliers de caméra et de montage"
  ,"Mentoring for emerging filmmakers and labs": "Mentorat pour cinéastes émergents et laboratoires"
  ,"Guest lectures in schools, universities and cultural institutions": "Interventions dans les écoles, universités et institutions culturelles"
  ,"Conversations on Afro-Indigenous narratives, authorship and image politics": "Échanges sur les récits afro-autochtones, l'auteur et les politiques de l'image"
  ,"Cannes Docs 2025 — Marché du Film, speaker in “Voices of the Majority in Film”": "Cannes Docs 2025 — Marché du Film, intervenant à « Voices of the Majority in Film »"
  ,"Rio2C — speaker in the audiovisual and creativity market context": "Rio2C — intervenant dans le cadre du marché de l'audiovisuel et de la créativité"
  ,"École Kourtrajmé, Marseille — camera instructor": "École Kourtrajmé, Marseille — enseignant caméra"
  ,"Civic-fab, Marseille — camera workshops": "Civic-fab, Marseille — ateliers de caméra"
  ,"collectif LFKs, Marseille — editing workshops": "collectif LFKs, Marseille — ateliers de montage"
};

const staticPortugueseTranslations = {
  "A short documentary about tourism, representation, and the tensions between image, market, and territory in the favelas of Rio de Janeiro.": "Um curta documental sobre turismo, representação e as tensões entre imagem, mercado e território nas favelas do Rio de Janeiro.",
  "Short documentary": "Curta documental",
  "Watch on MAX": "Assistir na MAX",
  "Project trajectory": "Percurso do projeto",
  "Festivals, broadcasters and partners": "Festivais, difusores e parceiros",
  "Status Completed": "<strong>Status</strong> Concluído",
  "Format Short documentary": "<strong>Formato</strong> Curta documental",
  "Role Director": "<strong>Função</strong> Direção",
  "Country Brazil": "<strong>País</strong> Brasil",
  "Year 2024": "<strong>Ano</strong> 2024",
  "Director Robson Dias": "<strong>Direção</strong> Robson Dias",
  "Cinematography Hugo Anikupulapo": "<strong>Direção de fotografia</strong> Hugo Anikupulapo",
  "Platform MAX (Warner Bros. Discovery)": "<strong>Plataforma</strong> MAX (Warner Bros. Discovery)",
  "Series Untold Black Narratives — Season 1, Episode 3": "<strong>Série</strong> Untold Black Narratives — Temporada 1, Episódio 3",
  "Favela Turística offers a critical perspective on tourism in Rocinha, the largest favela in Rio de Janeiro and one of the most visited locations in the city. Through the voices of a tour guide, an activist and a cultural agitator — all residents of Rocinha — the film questions who truly benefits from this global curiosity.": "<em>Favela Turística</em> oferece uma perspectiva crítica sobre o turismo na Rocinha, a maior favela do Rio de Janeiro e um dos lugares mais visitados da cidade. Por meio das vozes de um guia turístico, de um ativista e de um agitador cultural, todos moradores da Rocinha, o filme questiona quem realmente se beneficia dessa curiosidade global.",
  "As thousands of tourists circulate through narrow streets and everyday life becomes spectacle, the documentary shifts the focus toward those who are rarely heard: the residents themselves. How do they navigate constant exposure? What does it mean to be transformed into an attraction? Between economic opportunity and symbolic exploitation, the film reveals what remains unseen behind the “favela tour”.": "Enquanto milhares de turistas percorrem ruas estreitas e o cotidiano se torna espetáculo, o documentário desloca o foco para aqueles que raramente são ouvidos: os próprios moradores. Como eles lidam com a exposição constante? O que significa ser transformado em atração? Entre oportunidade econômica e exploração simbólica, o filme revela o que permanece invisível por trás do \"favela tour\".",
  "Context": "Contexto",
  "Part of the series Untold Black Narratives, this film engages directly with structural questions around representation, race and the global consumption of marginalized territories. By placing the camera in the hands of those who inhabit these spaces, the work confronts dominant narratives shaped by external gazes.": "Parte da série <em>Untold Black Narratives</em>, o filme se envolve diretamente com questões estruturais de representação, raça e consumo global de territórios marginalizados. Ao colocar a câmera nas mãos de quem habita esses espaços, a obra confronta narrativas dominantes moldadas por olhares externos.",
  "The project examines tourism not as a neutral activity, but as a system embedded in power relations — where visibility, economy and inequality intersect. Within Robson Dias’ body of work, the film reinforces an ongoing investigation into image politics, territory and the tension between visibility and exploitation.": "O projeto examina o turismo não como uma atividade neutra, mas como um sistema inserido em relações de poder, onde visibilidade, economia e desigualdade se cruzam. Na filmografia de Robson Dias, o filme reforça uma investigação contínua sobre política da imagem, território e a tensão entre visibilidade e exploração.",
  "Circulation": "Circulação",
  "Favela Turística was produced within Warner Bros. Discovery’s Untold Black Narratives initiative and released on MAX across Latin America as Season 1, Episode 3.": "<em>Favela Turística</em> foi produzido no âmbito da iniciativa <em>Untold Black Narratives</em> da Warner Bros. Discovery e lançado na MAX em toda a América Latina como Temporada 1, Episódio 3.",
  "The film has also circulated through independent and community-based screening contexts, including the Encontro de Cinema Negro Zózimo Bulbul, where it was presented in the section Raízes em Movimento at CineCarioca Penha, Rio de Janeiro.": "O filme também circulou em contextos independentes e comunitários de exibição, incluindo o Encontro de Cinema Negro Zózimo Bulbul, onde foi apresentado na seção <em>Raízes em Movimento</em>, no CineCarioca Penha, Rio de Janeiro.",
  "In Europe, the film was screened at the Rencontres du Cinéma Brésilien at Cinéma L’Alhambra in Marseille, followed by a discussion with the filmmakers. These screenings extend the film’s dialogue beyond streaming, connecting its critique of favela tourism with audiences in Brazil and France.": "Na Europa, o filme foi exibido nas <em>Rencontres du Cinéma Brésilien</em>, no Cinéma L'Alhambra, em Marselha, seguido de uma conversa com os realizadores. Essas sessões estendem o diálogo do filme para além do streaming, conectando sua crítica ao turismo nas favelas com públicos do Brasil e da França.",
  "Set in the coastal town of Cassis, the film follows the presence of Chriss, a poet whose words and rhythms inhabit the landscape of the Calanques. Emerging from a filmmaking residency, the project navigates between territory, language and perception, questioning how a place is observed, narrated and transformed through artistic encounter.": "Situado na cidade costeira de Cassis, o filme acompanha Chriss, poeta cujas palavras e ritmos habitam a paisagem das Calanques. Nascido de uma residência de criação cinematográfica, o projeto transita entre território, linguagem e percepção, questionando como um lugar é observado, narrado e transformado pelo encontro artístico.",
  "Short documentary / France": "Curta documental / França",
  "Status Completed": "<strong>Status</strong> Concluído",
  "Runtime Short film": "<strong>Duração</strong> Curta-metragem",
  "Country France": "<strong>País</strong> França",
  "Context Master in Documentary Filmmaking": "<strong>Contexto</strong> Mestrado em Realização Documental",
  "In Cassis, a film crew searches for a subject as part of an artistic residency. Their encounter with Chriss, a poet rooted in the territory, gradually shifts the direction of the film. What begins as a search becomes an immersion — where voice, landscape and presence intersect.": "Em Cassis, uma equipe de cinema procura um tema no contexto de uma residência artística. O encontro com Chriss, poeta enraizado no território, desloca gradualmente a direção do filme. O que começa como busca transforma-se em imersão, onde voz, paisagem e presença se cruzam.",
  "The film was developed within the residency program “Les Calanques, territoire de sciences, source d’inspiration,” promoted by the Parc national des Calanques, the Camargo Foundation and Institut Pythéas. Conceived during the Master’s program in Documentary Filmmaking at Aix-Marseille Université, the project reflects a research-based approach to cinema, where fieldwork, encounter and territory shape the narrative form.": "O filme foi desenvolvido no programa de residência \"Les Calanques, territoire de sciences, source d’inspiration\", promovido pelo Parc national des Calanques, pela Camargo Foundation e pelo Institut Pythéas. Concebido durante o Mestrado em Realização Documental da Aix-Marseille Université, o projeto reflete uma abordagem de cinema baseada na pesquisa, em que trabalho de campo, encontro e território moldam a forma narrativa.",
  "Approach": "Abordagem",
  "The film operates at the boundary between observation and construction. Rather than imposing a predefined narrative, it allows the presence of the poet and the specificity of the location to guide the cinematic gesture. The landscape becomes both subject and structure, while language — spoken, performed, fragmented — opens a space between documentary and poetic form.": "O filme opera na fronteira entre observação e construção. Em vez de impor uma narrativa predefinida, deixa que a presença do poeta e a especificidade do lugar guiem o gesto cinematográfico. A paisagem se torna ao mesmo tempo assunto e estrutura, enquanto a linguagem, falada, performada ou fragmentada, abre um espaço entre documentário e forma poética.",
  "Intent": "Intenção",
  "4800 explores how a territory can be read, inhabited and reinterpreted through artistic practice. It questions the position of the filmmaker in relation to place and subject, revealing cinema not as a tool of capture, but as a process of negotiation, translation and presence.": "<em>4800</em> explora como um território pode ser lido, habitado e reinterpretado pela prática artística. Questiona a posição do cineasta em relação ao lugar e ao sujeito, revelando o cinema não como ferramenta de captura, mas como processo de negociação, tradução e presença.",
  "Developed during Master Écritures Documentaires – Aix-Marseille Université": "Desenvolvido durante o Master Écritures Documentaires — Aix-Marseille Université",
  "Created within the Calanques artistic residency program": "Criado no programa de residência artística das Calanques",
  "In collaboration with Parc national des Calanques, Fondation Camargo and Institut Pythéas": "Em colaboração com Parc national des Calanques, Fondation Camargo e Institut Pythéas",
  "Research-based documentary practice combining territory and artistic exploration": "Prática documental baseada em pesquisa, combinando território e exploração artística",
  "This page presents Huella as a documentary shaped through artistic immersion in the Peruvian Amazon. It helps partners, programmers and collaborators quickly understand the film’s trajectory, its hybrid artistic approach, and its commitment to making visible Amazonian peoples, territories and struggles.": "Esta página apresenta <em>Huella</em> como um documentário moldado pela imersão artística na Amazônia peruana. Ela ajuda parceiros, programadores e colaboradores a compreender rapidamente o percurso do filme, sua abordagem artística híbrida e seu compromisso com a visibilização de povos, territórios e lutas amazônicas.",
  "Short documentary / France-Peru": "Curta documental / França-Peru",
  "Status Finalized": "<strong>Status</strong> Finalizado",
  "Runtime Short": "<strong>Duração</strong> Curta-metragem",
  "Countries France / Peru": "<strong>Países</strong> França / Peru",
  "Production Buzios films / Morgane CIA": "<strong>Produção</strong> Búzios Films / Morgane CIA",
  "Main focus Mémoire, héritage et résistance noire à Campos dos Goytacazes": "<strong>Foco central</strong> Povos, territórios e lutas amazônicas",
  "The inspiration comes from Herzog’s quest in his “conquest of the useless,” both his own and that of his character Fitzcarraldo. The documentary Huella allows itself an unpretentious search for what was missing in the majestic landscapes of pure nature. A performance project conceived and developed by Justine Bertignon and Mosi Espinoza, who invited filmmaker Robson Dias to accompany their creative process as it confronts its original source of inspiration: the Peruvian Amazon rainforest.": "A inspiração vem da busca de Herzog em sua \"conquista do inútil\", tanto a sua quanto a de seu personagem Fitzcarraldo. O documentário <em>Huella</em> se permite uma busca despretensiosa pelo que faltava nas paisagens majestosas da natureza dita pura. É um projeto performativo concebido e desenvolvido por Justine Bertignon e Mosi Espinoza, que convidaram o cineasta Robson Dias para acompanhar o processo criativo em confronto com sua fonte original de inspiração: a floresta amazônica peruana.",
  "World premiere at FIFAC – Amazonia and Caribbean International Documentary Film Festival, 2024": "Estreia mundial no FIFAC — Festival Internacional de Documentário da Amazônia e do Caribe, 2024",
  "Screened in the Écrans Parallèles section": "Exibido na seção Écrans Parallèles",
  "Directed by Mosi Espinoza and Justine Berthillot": "Direção de Mosi Espinoza e Justine Berthillot",
  "Edited by Clement Fessy and Mosi Espinoza": "Montagem de Clement Fessy e Mosi Espinoza",
  "Cinematography by Robson Dias": "Direção de fotografia de Robson Dias",
  "Sound recording by Mauricio Espinoza": "Som direto de Mauricio Espinoza",
  "Created during the tour of the stage performance in the Peruvian Amazon": "Criado durante a circulação da performance cênica na Amazônia peruana",
  "An art-documentary weaving together reality and imagination, bodies and voices, the Amazon forest and the artistic universe": "Um documentário de arte que entrelaça realidade e imaginação, corpos e vozes, floresta amazônica e universo artístico",
  "A film committed to amplifying Amazonian peoples and their political, ecological and spiritual struggles": "Um filme comprometido em amplificar os povos amazônicos e suas lutas políticas, ecológicas e espirituais",
  "Why this page matters": "Sobre o projeto"
};

const staticEnglishTranslations = {
  "Longa-metragem documental / Brasil–Senegal": "Feature documentary / Brazil–Senegal",
  "No coração do Senegal, um pequeno vilarejo muçulmano chamado Kabadio é uma espécie de éden místico protegido por líderes religiosos. Este é o cenário para fascinantes histórias de personagens reais que lutam para sobreviver, mantendo suas tradições, em meio à guerra civil e ao contrabando de mercadorias.": "In the heart of Senegal, a small Muslim village called Kabadio is a kind of mystical Eden protected by religious leaders. It is the setting for compelling stories of real people who struggle to survive while preserving their traditions amid civil war and the smuggling of goods.",
  "Status 2017": "<strong>Status</strong> Completed · 2017",
  "Runtime 90 min": "<strong>Runtime</strong> 90 min",
  "Countries Brazil / Senegal": "<strong>Countries</strong> Brazil / Senegal",
  "Directors Daniel Leite": "<strong>Director</strong> Daniel Leite",
  "Main recognition Festival do Rio": "<strong>Main recognition</strong> Festival do Rio",
  "Official Selection — 7th AFRIFF Africa International Film Festival (Nigeria)": "Official Selection — 7th AFRIFF Africa International Film Festival (Nigeria)",
  "Official Selection — 4e L'Appel des Chantiers (France)": "Official Selection — 4th L'Appel des Chantiers (France)",
  "Official Selection — 2° Social Machinery Film Festival (Italy)": "Official Selection — 2nd Social Machinery Film Festival (Italy)",
  "Official Selection — 13ª Mostra de Cinema Documentário [CineDocumenta] (Brazil)": "Official Selection — 13th CineDocumenta Documentary Film Showcase (Brazil)",
  "Official Selection — 7º Cine Cipó BH – Festival do Filme Insurgente (Brazil)": "Official Selection — 7th Cine Cipó BH – Insurgent Film Festival (Brazil)",
  "Official Selection — 5ª Mostra Livre de Cinema (Brazil)": "Official Selection — 5th Mostra Livre de Cinema (Brazil)",
  "Official Selection — 18º Festival do Rio de Cinema (Brazil)": "Official Selection — 18th Festival do Rio (Brazil)",
  "Official Selection — Cine MIS/SP – Museu da Imagem e do Som (Brazil)": "Official Selection — Cine MIS/SP – Museum of Image and Sound (Brazil)",
  "Official Selection — 3º Santos Film Festival (Brazil)": "Official Selection — 3rd Santos Film Festival (Brazil)",
  "Short documentary / France": "Short documentary / France",
  "Um retrato íntimo de Marianne, uma mulher que convive com vozes e constrói, através delas, uma relação singular com sua própria existência.": "An intimate portrait of Marianne, a woman who lives with voices and, through them, builds a singular relationship with her own existence.",
  "Status Completed": "<strong>Status</strong> Completed",
  "Runtime 26 min": "<strong>Runtime</strong> 26 min",
  "Country France": "<strong>Country</strong> France",
  "Director Elina Chared": "<strong>Director</strong> Elina Chared",
  "Cinematography Robson Dias, Célestin Monteil": "<strong>Cinematography</strong> Robson Dias, Célestin Monteil",
  "Production Aix-Marseille Université": "<strong>Production</strong> Aix-Marseille Université",
  "Marianne parece carregar várias vidas em seu rosto. A partir de fragmentos do cotidiano, o filme revela sua relação íntima com as vozes que escuta. Entre reinvenção, performance e fragilidade, emerge o retrato de uma mulher que luta para existir na complexidade de sua singularidade.": "Marianne seems to carry several lives in her face. Through fragments of everyday life, the film reveals her intimate relationship with the voices she hears. Between reinvention, performance and vulnerability, a portrait emerges of a woman struggling to exist within the complexity of her singularity.",
  "Approach": "Approach",
  "O filme se constrói a partir da proximidade com o rosto e o corpo da protagonista, evitando representações espetaculares das vozes internas e privilegiando uma escuta sensível e exteriorizada da experiência vivida.": "The film is built through proximity to the protagonist's face and body, avoiding spectacular representations of inner voices and privileging a sensitive, externalized listening to lived experience.",
  "Festival International Jean Rouch – seleção": "Festival International Jean Rouch — Official Selection",
  "Festival International de Films de Femmes – seleção": "Festival International de Films de Femmes — Official Selection",
  "Exibido em contextos acadêmicos e festivais documentais": "Screened in academic contexts and documentary festivals",
  "Produzido no Master Écritures Documentaires – Aix-Marseille": "Produced within the Master Écritures Documentaires — Aix-Marseille",
  "Role": "Role",
  "Direção de fotografia compartilhada, construindo uma abordagem visual baseada na proximidade com a personagem, no tempo real e na presença do corpo como eixo central da narrativa.": "Shared cinematography, building a visual approach grounded in proximity to the character, real time and the presence of the body as the narrative's central axis."
};

const staticProjectTranslations = {
  en: staticEnglishTranslations,
  pt: staticPortugueseTranslations,
  fr: staticFrenchTranslations
};

const staticFrenchMetadata = {
  "4800.html": ["4800 — Robson Dias", "Page du projet documentaire 4800, réalisé par Robson Dias."],
  "Anas.html": ["Anas — Robson Dias", "Page du court métrage documentaire Anas, coréalisé par Robson Dias."],
  "barrinha.html": ["Barrinha — Robson Dias", "Page du projet documentaire Barrinha."],
  "bien-entendu.html": ["Bien entendu — Robson Dias", "Page du film Une approche policière de routine, réalisé par Robson Dias."],
  "favela-turistica.html": ["Favela Turística — Robson Dias", "Page du projet Favela Turística."],
  "huella.html": ["HUELLA — Robson Dias", "Page du projet HUELLA."],
  "kabadio.html": ["KABADIO — Robson Dias", "Page du projet KABADIO."],
  "les-voix.html": ["Les Voix du dedans — Robson Dias", "Page du projet Les Voix du dedans, réalisé par Elina Chared, avec la direction de la photographie de Robson Dias."],
  "manto.html": ["J'ai entendu l'appel : Le retour du manteau tupinamba — Robson Dias", "Page du projet J'ai entendu l'appel : Le retour du manteau tupinamba."],
  "talks.html": ["Rencontres, transmission et mentorat — Robson Dias", "Interventions publiques, enseignement et mentorat de Robson Dias autour du cinéma, de la pratique documentaire et de la représentation."]
};

const staticFrenchAttributes = {
  "I Heard the Calling film still": "Image du film J'ai entendu l'appel",
  "Ritual scene": "Scène de rituel",
  "Archive and spirituality": "Archive et spiritualité",
  "Manto Tupinambá": "Manteau tupinamba",
  "Behind the scenes": "Coulisses du tournage",
  "Agência Gov article": "Article d'Agência Gov",
  "CNN Brasil article": "Article de CNN Brasil",
  "Cannes Docs 2025 Docs-in-Progress Award artwork": "Visuel du Docs-in-Progress Award, Cannes Docs 2025",
  "Previous slide": "Diapositive précédente",
  "Next slide": "Diapositive suivante",
  "Release details": "Informations de diffusion",
  "Onze vrouw in Rio trailer": "Bande-annonce de Onze vrouw in Rio",
  "Close video": "Fermer la vidéo",
  "Project teaser": "Bande-annonce du projet",
  "Teaser do projeto": "Bande-annonce du projet",
  "4800 teaser": "Bande-annonce de 4800",
  "Still do filme": "Image du film",
  "Still from 4800": "Image de 4800",
  "Célia Tupinambá": "Célia Tupinambá",
  "Narrativas Negras Não Contadas": "Récits noirs non racontés",
  "Robson Dias at Rio2C": "Robson Dias à Rio2C",
  "Robson Dias speaker profile": "Robson Dias, intervenant",
  "Robson Dias at Cannes-related event": "Robson Dias lors d'un événement lié à Cannes",
  "Partner logo 1": "Logo partenaire 1",
  "Partner logo 2": "Logo partenaire 2",
  "Partner logo 3": "Logo partenaire 3",
  "Partner logo 4": "Logo partenaire 4",
  "Partner logo 5": "Logo partenaire 5",
  "Partner logo 6": "Logo partenaire 6",
  "Partner logo 7": "Logo partenaire 7",
  "Partner logo 8": "Logo partenaire 8",
  "Partner logo 9": "Logo partenaire 9",
  "Partner logo 10": "Logo partenaire 10",
  "Partner region-sud": "Logo partenaire Région Sud",
  "Partner logo 12": "Logo partenaire 12",
  "Partner logo 13": "Logo partenaire 13"
};

const staticFrenchHomeTranslations = {
  "Film": "Film",
  "Main visual": "Image principale",
  "Ritual and memory": "Rituel et mémoire",
  "Spiritual archive": "Archive spirituelle",
  "Object": "Objet",
  "Sacred cloak": "Manteau sacré",
  "Process": "Processus",
  "Filming moment": "Moment de tournage",
  "Press": "Presse",
  "Institutional coverage": "Couverture institutionnelle",
  "Media visibility": "Visibilité médiatique",
  "DOCS-IN-PROGRESS WINNER": "LAURÉAT DOCS-IN-PROGRESS",
  "POST-PRODUCTION": "POST-PRODUCTION",
  "GAP FINANCING": "FINANCEMENT COMPLÉMENTAIRE",
  "INTERNATIONAL CO-PRODUCERS": "COPRODUCTEURS INTERNATIONAUX",
  "Industry Panels": "Tables rondes professionnelles"
  ,"Feature documentary · Brazil / France": "Long métrage documentaire · Brésil / France"
  ,"Short documentary · Brazil": "Court métrage documentaire · Brésil"
  ,"Short documentary · France": "Court métrage documentaire · France"
  ,"Short documentary · France / Peru": "Court métrage documentaire · France / Pérou"
  ,"Feature documentary · Brazil / Senegal": "Long métrage documentaire · Brésil / Sénégal"
};

function normalizeTranslationText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function translateStaticProjectContent(language) {
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const [attribute, key] = element.dataset.i18nAttr.split(":", 2);
    const value = translations[language]?.[key];
    if (value !== undefined) element.setAttribute(attribute, value);
  });

  document.querySelectorAll("[alt], iframe[title], video[aria-label], button[aria-label]").forEach((element) => {
    const attribute = element.hasAttribute("alt") ? "alt" : element.hasAttribute("title") ? "title" : element.hasAttribute("aria-label") ? "aria-label" : null;
    if (!attribute) return;
    if (!element.dataset.sourceAttribute) element.dataset.sourceAttribute = element.getAttribute(attribute);
    if (language === "fr") {
      const translation = staticFrenchAttributes[element.dataset.sourceAttribute];
      if (translation !== undefined) element.setAttribute(attribute, translation);
    } else {
      element.setAttribute(attribute, element.dataset.sourceAttribute);
    }
  });

  if (!document.body.classList.contains("project-page")) return;

  const filename = window.location.pathname.split("/").pop();
  const metadata = staticFrenchMetadata[filename];
  const title = document.querySelector("head title");
  const description = document.querySelector('meta[name="description"]');
  if (title && !title.dataset.sourceText) title.dataset.sourceText = title.textContent;
  if (description && !description.dataset.sourceContent) description.dataset.sourceContent = description.content;
  if (language === "fr" && metadata) {
    if (title) title.textContent = metadata[0];
    if (description) description.content = metadata[1];
  } else {
    if (title) title.textContent = title.dataset.sourceText;
    if (description) description.content = description.dataset.sourceContent;
  }

  document.querySelectorAll("main h1, main h2, main h3, main p, main li, main .section-kicker, main a.btn").forEach((element) => {
    if (!element.dataset.sourceHtml) {
      element.dataset.sourceHtml = element.innerHTML;
      element.dataset.projectSourceText = normalizeTranslationText(element.textContent);
    }

    const translation = staticProjectTranslations[language]?.[element.dataset.projectSourceText];
    element.innerHTML = translation !== undefined ? translation : element.dataset.sourceHtml;
  });

}

function translateStaticHomeContent(language) {
  if (document.body.classList.contains("project-page")) return;

  document.querySelectorAll(".featured-slide-caption span, .featured-slide-caption p, .awards-track span, .talks-preview-tags span, .catalog-copy p").forEach((element) => {
    if (!element.dataset.sourceHtml) {
      element.dataset.sourceHtml = element.innerHTML;
      element.dataset.sourceText = normalizeTranslationText(element.textContent);
    }

    if (language !== "fr") {
      element.innerHTML = element.dataset.sourceHtml;
      return;
    }

    const translation = staticFrenchHomeTranslations[element.dataset.sourceText];
    if (translation !== undefined) element.textContent = translation;
  });
}

function addLanguageSwitcher() {
  const nav = document.querySelector(".site-nav");
  if (!nav) return;

  if (!nav.querySelector('[data-i18n-key="nav.recognitions"]')) {
    const recognitionLink = document.createElement("a");
    recognitionLink.href = document.body.classList.contains("project-page")
      ? "../index.html#recognitions"
      : "#recognitions";
    recognitionLink.dataset.i18nKey = "nav.recognitions";
    recognitionLink.textContent = "Recognitions";
    nav.appendChild(recognitionLink);
  }

  if (nav.querySelector(".language-switch")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "language-switch";
  wrapper.setAttribute("role", "group");
  wrapper.setAttribute("aria-label", "Language");

  ["en", "pt", "fr"].forEach((language) => {
    const button = document.createElement("button");
    button.className = "language-button";
    button.type = "button";
    button.dataset.language = language;
    button.textContent = language.toUpperCase();
    wrapper.appendChild(button);
  });

  nav.appendChild(wrapper);
}

function translateCommonLabels(language) {
  document.querySelectorAll("a, p, h2, h3, strong, li, span").forEach((element) => {
    if (element.children.length || element.dataset.i18nKey) return;
    const original = element.dataset.projectSourceText || element.dataset.originalText || element.textContent.trim();
    if (!original) return;
    element.dataset.originalText = original;
    const options = commonTranslations[original];
    if (!options) return;
    element.textContent = language === "en" ? original : options[language === "pt" ? 0 : 1];
  });
}

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : "pt";
  const values = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage === "pt" ? "pt-BR" : selectedLanguage;
  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const value = values[element.dataset.i18nKey];
    if (value === undefined) return;
    if (element.dataset.i18nHtml === "true") element.innerHTML = value;
    else element.textContent = value;
  });
  translateStaticProjectContent(selectedLanguage);
  translateStaticHomeContent(selectedLanguage);
  translateCommonLabels(selectedLanguage);

  document.querySelectorAll(".language-button").forEach((button) => {
    const isActive = button.dataset.language === selectedLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  try {
    localStorage.setItem("robson-language", selectedLanguage);
  } catch (error) {
    // Storage can be unavailable in local file previews.
  }
}

function setupLanguageSwitcher() {
  addLanguageSwitcher();
  document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language));
  });

  let savedLanguage = document.documentElement.lang.startsWith("pt") ? "pt" : "en";
  try {
    savedLanguage = localStorage.getItem("robson-language") || savedLanguage;
  } catch (error) {
    // Storage can be unavailable in local file previews.
  }
  applyLanguage(savedLanguage);
}

// LAZY MEDIA
function setupLazyVideos() {
  const videos = document.querySelectorAll("video[data-lazy-video]");
  if (!videos.length) return;

  const loadVideo = (video) => {
    if (video.dataset.loaded === "true") return;
    video.querySelectorAll("source[data-src]").forEach((source) => {
      source.src = source.dataset.src;
      source.removeAttribute("data-src");
    });
    video.load();
    video.dataset.loaded = "true";
    if (video.autoplay) video.play().catch(() => {});
  };

  if (!("IntersectionObserver" in window)) {
    videos.forEach(loadVideo);
    return;
  }

  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadVideo(entry.target);
      instance.unobserve(entry.target);
    });
  }, { rootMargin: "300px 0px" });

  videos.forEach((video) => observer.observe(video));
}

function setupProjectTimeline() {
  const list = document.querySelector(".trajectory-list");
  const navigation = document.querySelector(".timeline-navigation");
  if (!list || !navigation) return;

  const events = Array.from(list.querySelectorAll(".timeline-event"));
  if (!events.length) return;

  const selectEvent = (index) => {
    events.forEach((event, eventIndex) => {
      const isActive = eventIndex === index;
      event.classList.toggle("is-active", isActive);
      event.setAttribute("aria-hidden", String(!isActive));
    });

    navigation.querySelectorAll("button").forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.tabIndex = isActive ? 0 : -1;
    });
  };

  events.forEach((event, index) => {
    const year = event.querySelector(".timeline-year")?.textContent.trim() || String(index + 1);
    const title = event.querySelector("h3")?.textContent.trim() || "Project milestone";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = year;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-label", `${year}: ${title}`);
    button.addEventListener("click", () => selectEvent(index));
    button.addEventListener("keydown", (eventKey) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(eventKey.key)) return;
      eventKey.preventDefault();
      const nextIndex = eventKey.key === 'ArrowRight' ? (index + 1) % events.length
        : eventKey.key === 'ArrowLeft' ? (index - 1 + events.length) % events.length
        : eventKey.key === 'Home' ? 0 : events.length - 1;
      selectEvent(nextIndex);
      navigation.querySelectorAll("button")[nextIndex].focus();
    });
    navigation.appendChild(button);
    event.addEventListener("click", () => selectEvent(index));
  });

  selectEvent(0);
}

setupLanguageSwitcher();
setupLazyVideos();
setupProjectTimeline();

// ========================
// SLIDER (FUNCIONAL)
// ========================

document.addEventListener("DOMContentLoaded", () => {
  const showcase = document.getElementById("featuredShowcase");
  if (!showcase) return;

  const slides = Array.from(showcase.querySelectorAll(".featured-slide"));
  const prevBtn = showcase.querySelector(".featured-nav.prev");
  const nextBtn = showcase.querySelector(".featured-nav.next");
  const dotsWrap = showcase.querySelector(".featured-dots");

  if (!slides.length || !prevBtn || !nextBtn || !dotsWrap) return;

  let current = 0;
  let autoplay = null;
  const delay = 4000;

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    const dots = dotsWrap.querySelectorAll(".featured-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === current);
    });
  }

  function createDots() {
    dotsWrap.innerHTML = "";

    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "featured-dot";

      dot.addEventListener("click", () => {
        goToSlide(index);
        restartAutoplay();
      });

      dotsWrap.appendChild(dot);
    });
  }

  function nextSlide() {
    goToSlide(current + 1);
  }

  function prevSlide() {
    goToSlide(current - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(nextSlide, delay);
  }

  function stopAutoplay() {
    if (autoplay) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  showcase.addEventListener("mouseenter", stopAutoplay);
  showcase.addEventListener("mouseleave", startAutoplay);

  createDots();
  goToSlide(0);
  startAutoplay();
});

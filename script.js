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
    "currentSeries.kicker": "New series / Research",
    "currentSeries.title": "A new journey through Rio, coming to screen this September.",
    "currentSeries.meta": "VPRO / NPO 2 / 2026",
    "currentSeries.text": "Robson Dias participated as a researcher in this three-part VPRO series with journalist and Latin America correspondent Nina Jurna.",
    "currentSeries.details": "The series follows Jurna across the city, from favelas to affluent neighbourhoods, at a moment when inequality, security and political division shape everyday life.",
    "currentSeries.releaseLabel": "Premiere",
    "currentSeries.releaseDate": "6 September 2026, 20:15",
    "currentSeries.watchLabel": "Watch",
    "currentSeries.formatLabel": "Format",
    "currentSeries.format": "Three-part documentary series",
    "currentSeries.premiere": "Premieres Sunday, 6 September, at 20:15 on NPO 2, VPRO and NPO Start.",
    "currentSeries.cta": "Read about the series",
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
    "currentSeries.kicker": "Nova série / Pesquisa",
    "currentSeries.title": "Uma nova jornada pelo Rio, chegando às telas em setembro.",
    "currentSeries.meta": "VPRO / NPO 2 / 2026",
    "currentSeries.text": "Robson Dias participou como pesquisador desta série em três episódios da VPRO, conduzida pela jornalista e correspondente para a América Latina Nina Jurna.",
    "currentSeries.details": "A série acompanha Nina pela cidade, das favelas aos bairros mais abastados, em um momento em que desigualdade, segurança e divisão política atravessam a vida cotidiana.",
    "currentSeries.releaseLabel": "Estreia",
    "currentSeries.releaseDate": "6 de setembro de 2026, 20h15",
    "currentSeries.watchLabel": "Onde assistir",
    "currentSeries.formatLabel": "Formato",
    "currentSeries.format": "Série documental em três episódios",
    "currentSeries.premiere": "Estreia no domingo, 6 de setembro, às 20h15, na NPO 2, VPRO e NPO Start.",
    "currentSeries.cta": "Conheça a série",
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
    "featured.kicker": "Projet à l'honneur",
    "featured.sectionTitle": "Le projet au centre du cycle actuel",
    "featured.label": "Cannes Docs 2025",
    "featured.title": "I Heard the Calling : Le retour du manteau tupinambá",
    "featured.text": "Un documentaire sur la restitution, la mémoire, le territoire et la réparation culturelle, au fil du parcours de Célia Tupinambá dans les musées européens.",
    "featured.cta": "Explorer le dossier du film",
    "featured.teaser": "Voir le teaser",
    "meta.feature": "Long métrage documentaire",
    "meta.post": "Post-production",
    "works.kicker": "Fragments visuels",
    "works.title": "Projets en développement et en circulation",
    "statement.kicker": "Réalisation / Montage / Image",
    "statement.title": "Le cinéma déplace le regard.",
    "about.kicker": "À propos",
    "about.title": "Robson Dias",
    "about.p1": "Robson Dias est un cinéaste brésilien installé à Marseille. Il travaille entre réalisation, image et montage, à la croisée du documentaire, de l'art et du cinéma politique. Formé au Brésil et en France, il est diplômé en cinéma de la PUC-Rio et titulaire d'un master en réalisation documentaire d'Aix-Marseille Université. Depuis une dizaine d'années, il développe une pratique transnationale entre l'Amérique latine et l'Europe, dans des contextes de production indépendante et de coproduction internationale.",
    "about.p2": "Son travail explore le territoire, la mémoire, le pouvoir et la représentation, souvent à partir de perspectives décoloniales et d'une réflexion sur la politique du regard. Son court métrage Pra Inglês Ver a été primé au Festival de Gramado. Il a ensuite coécrit et monté le long métrage documentaire KABADIO et réalisé la seconde équipe de la série Surfing West Africa, pour Canal OFF. Il a collaboré en France, en Allemagne et en Italie et a fondé Búzios Films, une structure indépendante dédiée aux récits culturellement sensibles.",
    "about.p3": "En 2024, son court documentaire Favela Turística, réflexion critique sur les contradictions du tourisme dans les favelas, a été sélectionné par le Warner Bros. Discovery Access Program puis diffusé sur MAX en Amérique latine. Son long métrage actuel, I Heard the Calling: The Return of the Tupinambá Cloak, suit la lutte politique et spirituelle pour la restitution d'objets tupinambá sacrés conservés dans des institutions européennes. Le projet a été présenté à Cannes Docs et a reçu le Docs-in-Progress Award.",
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
    "currentSeries.kicker": "Nouvelle série / Recherche",
    "currentSeries.title": "Un nouveau voyage à travers Rio, à l'écran en septembre.",
    "currentSeries.meta": "VPRO / NPO 2 / 2026",
    "currentSeries.text": "Robson Dias a participé comme chercheur à cette série VPRO en trois épisodes avec la journaliste et correspondante en Amérique latine Nina Jurna.",
    "currentSeries.details": "La série suit Nina à travers la ville, des favelas aux quartiers les plus aisés, à un moment où inégalités, sécurité et division politique traversent la vie quotidienne.",
    "currentSeries.releaseLabel": "Première",
    "currentSeries.releaseDate": "6 septembre 2026, 20 h 15",
    "currentSeries.watchLabel": "Diffusion",
    "currentSeries.formatLabel": "Format",
    "currentSeries.format": "Série documentaire en trois épisodes",
    "currentSeries.premiere": "Première le dimanche 6 septembre à 20 h 15 sur NPO 2, VPRO et NPO Start.",
    "currentSeries.cta": "Découvrir la série",
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
    const original = element.dataset.originalText || element.textContent.trim();
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

setupLanguageSwitcher();
setupLazyVideos();

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

document.addEventListener("DOMContentLoaded", function () {
  // ========== MENU MOBILE ==========
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.toggle("show");
      document.body.classList.toggle("menu-open");
    });
  }

  // Chiusura automatica menu mobile
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("show")) {
        mobileMenu.classList.remove("show");
        document.body.classList.remove("menu-open");
      }
    });
  });

  // Chiusura click outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("show") &&
      !mobileMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      mobileMenu.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });

  // Resize handler
  window.addEventListener("resize", () => {
    if (window.innerWidth > 956 && mobileMenu) {
      mobileMenu.classList.remove("show");
      document.body.classList.remove("menu-open");
    }
  });

  // ========== SCROLL BEHAVIOR CON SFOCATURA PROGRESSIVA ==========
  const topBanner = document.querySelector(".top-banner");
  const siteHeader = document.querySelector(".site-header");
  const heroSection1 = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg.is-visible");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (window.innerWidth > 768) {
      const heroHeight = heroSection1
        ? heroSection1.offsetHeight - siteHeader.offsetHeight
        : 0;

      if (scrollTop > 50) {
        if (topBanner) topBanner.style.transform = "translateY(-100%)";
        if (siteHeader) siteHeader.classList.add("fixed");
      } else {
        if (topBanner) topBanner.style.transform = "translateY(0)";
        if (siteHeader) siteHeader.classList.remove("fixed");
      }

      if (scrollTop > heroHeight) {
        if (siteHeader) siteHeader.classList.add("scrolled");
      } else {
        if (siteHeader) siteHeader.classList.remove("scrolled");
      }

      const heroSection = document.querySelector(".hero");
      const heroContent = document.querySelector(".hero-content");

      if (heroBg && scrollTop <= heroHeight) {
        const scrollProgress = Math.min(scrollTop / heroHeight, 1);
        const blurAmount = scrollProgress * 8;
        const brightnessAmount = 1 - scrollProgress * 0.2;

        heroBg.style.filter = `blur(${blurAmount}px) brightness(${brightnessAmount})`;

        if (scrollProgress > 0.01) {
          const contentBlur = (scrollProgress - 0.1) * 5;
          const contentOpacity = 1 - (scrollProgress - 0.1) * 0.6;

          if (heroContent) {
            heroContent.style.filter = `blur(${contentBlur}px)`;
            heroContent.style.opacity = contentOpacity;
          }
        } else {
          if (heroContent) {
            heroContent.style.filter = "none";
            heroContent.style.opacity = "1";
          }
        }
      } else if (heroBg && scrollTop > heroHeight) {
        heroBg.style.filter = "blur(8px) brightness(0.8)";
        const heroContent = document.querySelector(".hero-content");
        if (heroContent) {
          heroContent.style.filter = "blur(4px)";
          heroContent.style.opacity = "0.6";
        }
      } else {
        const heroContent = document.querySelector(".hero-content");
        if (heroContent) {
          heroContent.style.filter = "none";
          heroContent.style.opacity = "1";
        }
      }
    } else {
      if (siteHeader) siteHeader.classList.add("scrolled");
      if (heroBg) {
        heroBg.style.filter = "none";
      }
    }
  });

  // ========== SMOOTH SCROLLING PER LINK INTERNI ==========
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          if (mobileMenu && mobileMenu.classList.contains("show")) {
            mobileMenu.classList.remove("show");
            document.body.classList.remove("menu-open");
          }
        }
      }
    });
  });

  // ========== CARD SERVIZI CLICCABILI ==========
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      const serviceType = this.getAttribute("data-service");
      let targetId;

      switch (serviceType) {
        case "Check Up Operativo":
          targetId = "checkup-operativo";
          break;
        case "HR Support & Mentoring":
          targetId = "sviluppo-organizzativo";
          break;
        case "Review Strategica":
          targetId = "strategic-review";
          break;
        case "Partnership Logistica":
          targetId = "partnership-logistica";
          break;
        case "IIC UAE Connector":
          targetId = "iic-uae-connector";
          break;
        default:
          targetId = "contatti";
      }

      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        console.error("Sezione non trovata:", targetId);
      }
    });
  });

  // ========== TRADUZIONI COMPLETE ==========
  let currentLanguage = "it";
  const translations = {
    it: {
      "hero-title": "LA BASE STRATEGICA PER LA CRESCITA AZIENDALE",
      "hero-description":
        'Quick wins operativi che diventano competenze permanenti nelle PMI di eccellenza. <br />Leadership per il cambiamento<br />Esperienza professionale e manageriale specifica nel ruolo<span class="hide-mobile"><br /></span><span class="hide-mobile">Operatività e flessibilità del modello</span>',
      "hero-description1": "LA CRESCITA ORGANICA | MERGER & ACQUISITIONS",
      "hero-description2": "UN MODELLO DI DIREZIONE OPERATIVA",
      "hero-description3":
        "EXECUTIVE INTERIM MANAGEMENT ON FRACTIONAL TIME BASIS<br />INTERFACCIA CEO | CAMBIO GENERAZIONALE | RUOLO DEL COO",
      "btn-appointment": "Contattaci",
      "btn-services": "I Nostri Servizi",
      "btn-portfolio": "IIC UAE ADVISOR",
      "nav-home": "home",
      "nav-about": "chi siamo",
      "nav-services": "servizi",
      "nav-methodology": "metodologia",
      "nav-sectors": "settori",
      "nav-contacts": "contattaci",
      "nav-ownership": "Ownership di un modello progettuale",
      "nav-experience": "Esperienza del FARE",
      "nav-approach": "Approccio metodologico consolidato",
      "nav-indicators": "Indicatori e monitoraggio",
      "gallery-title": "Ownership di un modello progettuale",
      "gallery-subtitle":
        "Progetti realizzati in diversi mercati ed aree merceologiche che sviluppano e creano valore duraturo per i nostri clienti.<br />Interim Management specializzato nel ruolo di Chief Operating Officer dedicato ad aziende di eccellenza e con forte commitment al cambiamento.<br />Importanza dell'utilizzo di librerie standards e tools di monitoraggio consolidati.",
      "about-title": "Esperienza del FARE - La Partnership come risorsa",
      "about-quote":
        "È il progresso a trasformare l'azienda in un processo straordinario, ma sono la sua storia e le sue radici a sancirne l'unicità.",
      "about-text":
        "La leadership operativa di «due i to business», nasce come perno di coordinamento fra le Aziende Host del servizio e diversi <b>partners</b> di business presenti in un vasto <b>network</b> industriale del panorama nazionale ed internazionale. <br /><br /><br />Lo studio mette a disposizione dei servizi mirati a potenziare le organizzazioni ed i <b>meccanismi decisionali</b> aziendali, inoltre forniscono una panoramica precisa e sfidante sulle opportunità da cogliere nei settori Sales & Operations & Marketing. <br /><br /><br />La logica di integrazione di questi servizi è garantita dall'origine in quanto si sviluppano conformemente a un'architettura di dati comuni a disposizione nel ERP gestionale di riferimento aziendale. Indipendentemente della modalità e dal tipo di servizio scelto è sempre previsto un percorso metodologico che include un <b>format manageriale</b> intrinseco e un follow up sistematico dell'avanzamento del progetto nel day by day operativo.",
      "break-title-1": "Mission",
      "break-subtitle-1":
        "Sostenere le attività di business di aziende di eccellenza con utilizzo di adeguata metodologia di mantenimento e sviluppo del processo di crescita organica e per linee esterne.",
      "break-title-2":
        "Trasforma le teorie in risultati concreti attraverso un approccio scientifico condiviso con le key people aziendali<br />Efficienza nell'utilizzo degli indicatori",
      "break-item-1": "AS IS IT",
      "break-item-2": "DEFINIZIONE OBBIETTIVI",
      "break-item-3": "MONITORAGGIO PERIODICO",
      "break-item-4": "AS IS IT vs TARGET",
      "break-btn-2": "Scopri Settori e Progetti",
      "methodology-title":
        "Approccio metodologico consolidato alla base dei servizi",
      "methodology-quote":
        "Clinical Organisation Development (CODp)<br />Automation Design Review (ADR).",
      "methodology-values":
        "Metodologia distintiva personalizzata per le PMI (CODp)",
      "methodology-body1":
        "Introduzione | efficientamento degli incontri dei gruppi di lavoro<br />Definizione | adozioni di criteri e indicatori comuni<br />Promozione e sviluppo delle competenze manageriali del personale<br />Focus sulla concretezza vs il rischio delle opinioni<br />Programmazione strategica con permanenti review dell'avanzamento del progetto",
      "methodology-values1":
        "Importanza della gestione integrata dei dati (ADR)",
      "methodology-body2":
        "Il KNOW HOW della Struttura dei costi e della Marginalità come patrimonio del team di lavoro<br />Linearità delle comunicazioni | Modularità e sinergia dei progetti in corso nelle varie funzioni<br />Criteri per la creazione delle interfacce dati evitando doppio handling<br />Autonomia dei sistemi periferici vs attività del ERP<br />Importanza e valorizzazione dell'integrazione dei sistemi",
      "services-title": "I nostri servizi",
      "services-subtitle":
        "Soluzioni strategiche personalizzate per ottimizzare processi e sviluppare competenze manageriali.",
      "service-1-title": "CHECK UP OPERATIVO",
      "service-1-subtitle": "INTERIM CHIEF OPERATING OFFICER MANAGEMENT",
      "service-1-desc":
        "CHIEF OPERATING OFFICER EXECUTIVE INTERIM MANAGEMENT<br /><br />Sviluppo del ruolo di COO e ottimizzazione dei processi operativi.",
      "service-2-title": "SVILUPPO ORGANIZZATIVO",
      "service-2-subtitle1": "INTERVENTO SPOT ON FRACTIONAL TIME BASIS",
      "service-2-subtitle2":
        "Supporto alle risorse umane ed allo sviluppo delle basi per il cambiamento della cultura aziendale",
      "service-2-desc":
        "<br />Supporto alle risorse umane ed allo sviluppo delle basi per il cambiamento della cultura aziendale",
      "service-3-title": "STRATEGIC REVIEW",
      "service-3-subtitle":
        "INTERVENTO SPOT ON FRACTIONAL TIME BASIS<br />A seconda dell'esigenza questa tipologia di intervento mette a disposizione della direzione aziendale un supporto in «outsourcing» veloce ed autorevole al processo decisionale",
      "service-3-desc":
        "||ANALISI E REVISIONE DI PIANI STRATEGICI E DI CRESCITA||<br />||SUPPORTO ED EFFICIENTAMENTO STRATEGIE COMMERCIALI||<br />||INTERNAZIONALIZZAZIONE e GUIDA PROGETTI SPECIALI||",
      "service-4-title": "PARTNERSHIP LOGISTICA",
      "service-4-subtitle":
        "SERVIZIO DI PARTNERSHIP PER OPERATORI LOGISTICI DEL SETTORE FMCG<br />Introduzione della governance del ciclo dell'ordine nelle offerte di servizio di logistica integrata",
      "service-4-desc":
        "<br />GUIDA E SUPPORTO AD OPERAZIONI DI LOGISTICA INTEGRATA<br /><br />La governance del ciclo dell'ordine",
      "service-5-title": "IIC UAE ADVISOR",
      "service-5-desc":
        "Punto di riferimento per le aziende italiane di eccellenza. Leadership per il progetto di internazionalizzazione. Interfaccia certificata della Camera di Commercio in UAE<br />",
      "service-detail-content":
        "Il servizio prevede lo sviluppo del ruolo del COO | piano a 3 anni | Introduzione e utilizzo dei seguenti meccanismi",
      "checkup-left-1": "LEADERSHIP SU OPERATIONAL TEAM",
      "checkup-left-2":
        "MKT | SALES | TEAM EXPORT | OPERATIONS | ACQUISTI | CONTROLLO GESTIONE | PLANNING",
      "checkup-left-4": "Tipo governance:",
      "checkup-left-5": "Responsabilità funzionale:",
      "checkup-left-6": "SET UP PIANO OPERATIVO PLURIENNALE NEI PRIMI 4 MESI",
      "checkup-left-7": "MONITORAGGIO CONTINUO STOCK VS VENDITE",
      "checkup-left-8": "COORDINAMENTO | SINERGIA DEI PROGETTI",
      "checkup-left-9": "INTRODUZIONE DEL FORMAT MANAGERIALE",
      "checkup-left-10": "FOCUS SULLA EVOLUZIONE DEL MARGINE OPERATIVO:",
      "checkup-left-11":
        "QUICK WINS OPERATIVI DI BUSINESS DEBOTTLENECKING: <b>10% MIN</b>",
      "checkup-left-12":
        "QUICK WINS RIDUZIONE COSTI PRIMO E SECONDO ANNO: <b>15% MIN</b>",
      "checkup-left-13":
        "QUICK WINS ACQUISTI SECONDO E TERZO ANNO: <b>20% MIN</b>",
      "checkup-left-14": "MARGINALITÀ DEL PORTAFOGLIO PRODOTTI | RULES",
      "checkup-left-15":
        "BUSINESS CASE PER PROGETTI EXPORT | MARGINALITÀ TARGET",
      "checkup-left-16": "REVIEW TRADE OFF PROGETTI VS MARGINALITA’ | RULES",
      "checkup-left-17": "CRESCITA ORGANICA INDOTTA ATTESA:  30 % MIN",
      "checkup-right-title": "SVILUPPO DEL RUOLO:",
      "checkup-right-1": "Ottimizzazione e snellimento dei processi aziendali",
      "checkup-right-2":
        "Focus sul miglioramento dei costi operativi nei vari reparti",
      "checkup-right-3":
        "Cascade down degli obiettivi strategici nelle varie funzioni aziendali",
      "checkup-right-4": "Monitoraggio continuo aderenza ai piani operativi",
      "checkup-right-5": "Massimizzare il potenziale dei Team",
      "checkup-right-6":
        "Implementazione nuovo way of working | indicatori | dinamiche di gruppo",
      "checkup-right-7":
        "Rischi vs Opportunità di business | continuity vs quick wins",
      "checkup-right-8": "Focus sulla marginalità del portafoglio prodotti",
      "checkup-right-9":
        "Sinergie e integrazione delle funzioni | architettura dei flussi e dati",
      "checkup-right-10": "Accelerare l'esecuzione dei progetti strategici",
      "svil-org-left-1": "RISORSE | MAPPATURA DEI PROFILI",
      "svil-org-left-2": "BILANCIAMENTO DELLE COMPETENZE AS IS IT VS TARGET",
      "svil-org-left-2-1": "MODELLO DI LEADERSHIP",
      "svil-org-left-2-2": "ASPETTATIVE RELAZIONALI",
      "svil-org-left-2-3": "COMPETENZE FORMATIVE",
      "svil-org-left-2-4": "CAPACITÀ DI PROGRAM SOLVING",
      "svil-org-left-2-5": "UTILIZZO DELLE CAPABILITIES ORGANIZZATIVE",
      "svil-org-left-3": "CONDIVISIONE DI UN MODELLO DI CAMBIAMENTO",
      "svil-org-left-3-1":
        "RESPONSABILITÀ DELLE FUNZIONI | ORGANIGRAMMA COME STRUMENTO",
      "svil-org-left-3-2": "DEFINIZIONE DEI PROCESSI AZIENDALI | RACI TOOL",
      "svil-org-left-3-3":
        "NEW WAY OF WORKING | IMPORTANZA DELLA COMUNICAZIONE",

      "svil-org-left-3-5": "FORMAZIONE NEL DAY BY DAY AZIENDALE",
      "service-detail-2-1": "Disegno organizzativo | creazione nuove direzioni",
      "service-detail-2-2":
        "Business debottlenecking | importanza degli organigrammi",
      "service-detail-2-3":
        "Supporto HR | HH nel processo di selezione del personale",
      "service-detail-2-4":
        "JD | verifiche rispondenze organizzative con modelli di riferimento",
      "service-detail-2-5":
        "Supporto HR nella valutazione del personale | parametrizzazione",
      "service-detail-2-6":
        "Identificazione aree di conflitto | debottlenecking",
      "service-detail-2-7":
        "Definizione piani di formazione e piani di sviluppo delle competenze",
      "service-detail-2-8": "Proposta di un modello di cambiamento",
      "strategic-section-1": "Analisi piani operativi",
      "strategic-section-2": "Sales support",
      "strategic-section-3": "MKT & Sales Support",
      "service-detail-3-1": "<br />REVIEW PIANI INDUSTRIALI",
      "service-detail-3-2": "REVIEW BUSINESS PLAN",
      "service-detail-3-3": "ADERENZA AL PIANO STRATEGICO PLURIENNALE",
      "service-detail-3-5": "FOCUS SULLA CRESCITA ORGANICA",
      "service-detail-3-6": "UPGRADE IRP | REQUIREMENTS",
      "service-detail-3-7": "<br /><br /><br />CONTRACT REVIEW",
      "service-detail-3-9":
        "IL PUNTO DI VISTA DEL CLIENTE <br />«OUTSIDER» A 360° DURANTE LE <br> TRATTATIVE E FINO AL MOMENTO <br />DELLA CHIUSURA DI UN CONTRATTO",
      "service-detail-3-11": "PROGETTI CON IL TEAM EXPORT",
      "service-detail-3-12": "TECHNICAL AMBASSADOR",
      "service-detail-3-13": "PROGETTI SPECIALI",
      "service-detail-3-14": "TESTIMONIANZA",
      "service-detail-3-15": "IL PROJECT MANAGEMENT CHE <br /> «VENDE»",
      "discover-more": "BENCHMARKING<br /><br />ECCELLENZA OPERATIVA",
      "service-detail-4-left-1":
        "GUIDA ALLA INTEGRAZIONE DEL SERVIZIO LOGISTICO",
      "service-detail-4-left-2": "IMPORTANZA DEL FATTORE MANAGERIALE",
      "service-detail-4-left-3":
        "UNA RISORSA DEL OPL INTEGRATA IN HOUSE DEL CLIENTE COMMITTENTE INTERFACCIATA PERMANENTEMENTE CON UN KEY PEOPLE LOGISTICO DEL COMMITTENTE",
      "service-detail-4-left-4":
        "BACK OFFICE | FRONT OFFICE LOGISTICO INTEGRATO",
      "service-detail-4-left-5":
        "CUSTOMIZZAZIONE DELL'OFFERTA LOGISTICA TENENDO CONTO DELLE OPPORTUNITÀ OFFERTE DALLA GESTIONE DEL CICLO DELL'ORDINE DEL CLIENTE",
      "service-detail-4-left-6":
        "IL VALORE AGGIUNTO DELLA GOVERNANCE DEL PROCESSO | COSTI | SERVIZIO",
      "service-detail-4-left-7":
        "INTRODUZIONE DEI CONCETTI DI PROGRAM SOLVING NELLA OFFERTA LOGISTICA",
      "service-detail-4-left-8": "PACK DI RULES DA CONDIVIDERE CON IL CLIENTE",
      "service-detail-4-left-9":
        "OFFERTA PER CANALE DISTRIBUTIVO | SIZE | OPPORTUNITÀ",
      "service-detail-4-left-10":
        "LA RESPONSABILITA’ LOGISTICA NON E’ DELEGABILE | LA <br>IMPROVVISAZIONE COME CATALIZZATORE NEGATIVO DEL SERVIZIO",
      "service-detail-4-right-1":
        "&nbsp;&nbsp;Gestione del ciclo dell'ordine che garantisce la eccellenza del servizio",
      "service-detail-4-right-2":
        "&nbsp;&nbsp;Completa integrazione del ciclo dell'ordine fino alla logistica <br>&nbsp;&nbsp;distributiva dell'ultimo miglio",
      "service-detail-4-right-3":
        "&nbsp;&nbsp;Ottimizzazione dei flussi decisionali nelle varie fasi dell'ordine per diminuire<br>&nbsp;&nbsp; tempi morti e blocchi amministrativi e commerciali",
      "service-detail-4-right-4":
        "&nbsp;&nbsp;Importanza delle rules logistiche e commerciali nella gestione contrattuale",
      "service-detail-4-right-5":
        "&nbsp;&nbsp;Indicatori di servizio al cliente customizzati coerentemente alla struttura del <br>&nbsp;&nbsp;ciclo dell'ordine",
      "service-detail-4-right-6":
        "&nbsp;&nbsp;Monitoraggio costante delle performance logistiche",
      "service-detail-4-right-7":
        "&nbsp;&nbsp;Vantaggi ed opportunità per il cliente che può completare il suo reparto <br>&nbsp;&nbsp;logistico con una serie di servizi specializzati che solo un OPL è in grado di<br>&nbsp;&nbsp; fornire ( vedere elenco servizi )",
      "iic-uae-title":
        "<b>I</b>talian <b>C</b>ertified <b>A</b>dvisor <b>IIC UAE</b>",
      "iic-uae-services":
        "All'interno del progetto Italian Certified Advisor IIC UAE 2025 – 2026; lo studio è stato selezionato come partner certificato della Camera di Commercio Italiana negli Emirati Arabi Uniti ( UAE ). Specificatamente Daniel Marchisio, Operations Business Partner della due i to business è stato certificato ICA 547 per la provincia di Milano.<br /><br />«In un momento storico segnato da una crescente cooperazione tra Italia ed EAU, rafforzata da importanti accordi bilaterali, le prospettive per le aziende e professionisti in questo territorio sono ampie, concrete e in forte espansione»<br /><br />«Gli Emirati rappresentano oggi una delle economie più dinamiche e interconnesse a livello globale, con una domanda crescente di competenze qualificate nei settori legale, fiscale, societario e della consulenza strategica»<br /><br />Lo studio è onorato di partecipare all'iniziativa che valorizza l'eccellenza italiana nel settore professionale e consulenziale.",
      "principles-title":
        "I CLUSTER DEL PERCORSO DI INTERNAZIONALIZZAZIONE UAE",
      "principles-subtitle": "Le quattro fasi dell'Agenda 2025-2026",
      "principle-1-title": "SCOUTING BIUNIVOCO",
      "principle-1-desc": "PROMOZIONE DELL'INIZIATIVA<br />IL TEAM A DUBAI",
      "principle-2-title": "MODULO INFO",
      "principle-2-desc": "INFO SPECIFICA<br />IL PROGETTO/IDEA DEL CLIENTE",
      "principle-3-title": "FORMAZIONE | MATCHING",
      "principle-3-desc":
        "FORMAZIONE SPECIFICA<br />IL PROGETTO AZIENDALE DEL CLIENTE",
      "principle-4-title": "FOLLOW UP | MATCHING",
      "principle-4-desc":
        "SUPPORTO SPECIFICO<br />AVANZAMENTO PROGETTO DEL CLIENTE",
      "principles-deep-title": "Approfondimenti sui cluster del programma",
      "principles-deep-subtitle":
        "Scopri i vantaggi dell'applicazione della nostra metodologia nella pratica quotidiana e nel percorso di internazionalizzazione del MADE IN ITALY in Emirati Arabi Uniti",
      "deep-principle-1-title": "SCOUTING BIUNIVOCO",
      "deep-principle-1-desc":
        "Il nostro approccio di scouting bidirezionale garantisce una ricerca mirata e personalizzata delle opportunità di business.",
      "deep-principle-1-1":
        "Promozione dell'iniziativa presso associazioni di Categoria | Camera",
      "deep-principle-1-2": "Preparazione agenda 2025-2026",
      "deep-principle-1-3":
        "Identificazione di opportunità specifiche negli UAE",
      "deep-principle-1-4": "Profilo delle aziende e settori merceologici",
      "deep-principle-1-5": "Preparazione del team a Dubai | due i to business",
      "deep-principle-1-6":
        "Competenze manageriali nel coordinamento del Sales & Operations & MKT | Esperienze in vari settori di business",
      "deep-principle-1-7":
        "Know how specifico sui meccanismi che sviluppano marginalità | Evitare cause di rallentamento dei progetti export",
      "deep-principle-2-title": "MODULO INFO",
      "deep-principle-2-desc":
        "In questo modulo si fornisce informazione dettagliata e continuamente aggiornata sul mercato emiratino e si comincia a preparare un progetto cliente | Importanza di avere una contra parte UAE certificata",
      "deep-principle-2-1":
        "Pack informativo specifico [commerciale | legale | finanziario] | supporto Team Dubai",
      "deep-principle-2-2": "Informazioni generali sui mercati di riferimento",
      "deep-principle-2-3": "Panoramica sui competitor nel nuovo mercato",
      "deep-principle-2-4":
        "Prima valutazione del progetto cliente | valutazione della crescita",
      "deep-principle-2-5":
        "Conoscenza del cliente e del suo progetto in UAE | definizione di un progetto",
      "deep-principle-2-6":
        "Preparazione di un business case | Le minacce interne al progetto | Le attese del mercato",
      "deep-principle-3-title": "FORMAZIONE | MATCHING",
      "deep-principle-3-desc":
        "Formazione specifica e basi per lo sviluppo le competenze necessarie al successo.",
      "deep-principle-3-1":
        "Preparazione al matching del cliente con «cliente» emiratino | check del progetto",
      "deep-principle-3-2":
        "Preparazione del progetto aziendale del cliente | focus nel business | il prodotto che si vende",
      "deep-principle-3-3":
        "Matching Italia | Dubai [ufficio camerale AI Moosa Tower 2, Trade Centre, Dubai, UAE]",
      "deep-principle-3-5":
        "Business Case Review | Intervento di testimonianza tecnico – merceologico | Incontro del «cliente»",
      "deep-principle-4-title": "FOLLOW UP | MATCHING",
      "deep-principle-4-desc": "Supporto e monitoraggio del progetto cliente",
      "deep-principle-4-1":
        "Assistenza e monitoraggio nella fase di lancio e implementazione",
      "deep-principle-4-2":
        "Monitoraggio dei risultati | Sviluppo di un eventuale 2° round",
      "deep-principle-4-3":
        "Matching Italia | Dubai [ufficio camerale AI Moosa Tower 2, Trade Centre, Dubai, UAE]",
      "deep-principle-4-4": "Supporto post-lancio e ottimizzazione",
      "deep-principle-4-5":
        "Modularità & Scalabilità del progetto | Supporto allo sviluppo della rete commerciale",
      "sectors-title": "Expertise e progetti in corso nei vari settori",
      "sectors-subtitle":
        "La nostra esperienza si estende attraverso diversi settori industriali, offrendo soluzioni personalizzate e competenze specializzate per ogni ambito di business. Dal settore alimentare alla logistica avanzata, supportiamo le aziende nella crescita, nell'ottimizzazione dei processi e nell'implementazione di strategie innovative che generano risultati concreti e misurabili.",
      "sector-food": "Food & Beverages",
      "sector-wine": "Wines & Liquors",
      "sector-data": "Data Integrator",
      "sector-machinery": "Machinery & Equipment",
      "sector-export": "Export",
      "sector-dubai": "Export UAE",
      "sector-food-1": "ANNI ESPERTISE NEL SETTORE &nbsp; &nbsp;<b>25+</b>",
      "sector-food-2": "DUE DILIGENZE &nbsp; &nbsp;<b>1+ </b>/ 3",
      "sector-food-3": "<b>MARKET LEADER</b> BRANDS COMPANIES",
      "sector-food-4":
        "<b>A & M</b> EU RESTRUCTURING &nbsp;&nbsp;<b>5 COMPANIES</b>",
      "sector-wine-1": "ANNI ESPERTISE NEL SETTORE &nbsp; &nbsp;<b>6+</b>",
      "sector-wine-2": "GROWTH ENVIRONMENT &nbsp; &nbsp;<b>40%</b>",
      "sector-wine-3": "<b>TOP MARKET LEADER</b> BRAND COMPANY",
      "sector-wine-3-1": "MODELLI DI CAMBIAMENTO ORGANIZZATIVO",
      "sector-wine-4": "LOGISTICA INTEGRATA",
      "sector-data-1":
        "PROGETTI DI ADR | ERP INTEGRATION &nbsp; &nbsp;<b>4+</b>",
      "sector-data-2": "<b>ADR PORTSUNLIGHT SPECIFICATIONS</b>",
      "sector-data-3": "NEW «DELTA V» OLIVE OIL COMPANY",
      "sector-data-4": "NEW «DELTA V» FOR MERGER BESTFOOD",
      "sector-data-5":
        "EU FOOD COMPANIES SC REVIEW &nbsp; &nbsp;<b>5 PLANTS</b>",
      "sector-data-6": "<b>PLANTS</b>",
      "sector-machinery-1": "SALES PARTNERSHIP WITH TOP SUPPLIERS",
      "sector-machinery-2":
        "COMMERCIAL SUPPORT PROJECTS &nbsp; &nbsp;<b>2 MIO +</b>",
      "sector-machinery-3":
        "MAJOR INVESTMENT PROJECTS &nbsp; &nbsp;<b>70 MIO +</b>",
      "sector-machinery-4": "ENERGY CHT PROJECTS &nbsp; &nbsp;<b>2+</b>",
      "sector-export-1": "BERTOLLI USA | <b>CLUB WAREHOUSE</b>",
      "sector-export-4": "NEW FORMAT TO INCREASE FOOTFALL",
      "sector-export-2":
        "DRY PRODUCTS FOR <b>AREA MENA</b> &nbsp; &nbsp;<b> 12 KT +</b>",
      "sector-export-3": "<b>COORDINAMENTO STRATEGICO</b>",
      "sector-dubai-1": "Punto di riferimento per aziende italiane",
      "sector-dubai-2": "Interfaccia Camera Commercio UAE",
      "sector-dubai-3": "Connector con partner emiratini",
      "sector-dubai-4": "<b>CERTIFICAZIONE ICA 547</b>",
      "sector-dubai-5": "ADVISOR | MILANO E PROVINCIA",
      "contacts-title": "Contattaci - Call to Action",
      "company-field": "Nome Azienda",
      "company-placeholder": "Inserisci il nome della tua azienda",
      "form-name": "Nome",
      "form-surname": "Cognome",
      "form-phone": "Numero di telefono",
      "form-email": "Email",
      "form-sector": "Settore",
      "form-sector-placeholder": "Seleziona un settore",
      "form-message": "Messaggio",
      "form-message-placeholder": "Descrivi le tue esigenze...",
      "form-submit": "Invia Richiesta",
      "footer-title": "DUE I TO BUSINESS S.R.L.S.",
      "footer-desc":
        "Consulenza strategica per la crescita organica delle PMI.",
      "footer-sede": "Sede legale",
      "footer-viale":
        "Viale Papa Giovanni Paolo II, 29, Arconate (MI), 20020, Lombardia",
      "footer-services": "Servizi",
      "footer-contacts": "Contatti",
      "footer-consultation": "Consulenza su appuntamento",
      "footer-copyright":
        "&copy; 2025 DUE I TO BUSINESS S.R.L.S. | P.IVA 10792930967",
      "footer-privacy": "Privacy Policy",
      "footer-cookie": "Cookie Policy",
      "privacy-consent-start": "Con l'invio del form dichiaro di aver letto la",
      "privacy-policy-link": "Privacy Policy",
      "privacy-consent-end":
        "e autorizzo il trattamento dei miei dati personali per rispondere alla mia richiesta.",
      "sector-1": "Food & Beverages",
      "sector-2": "Wines & Liquors",
      "sector-3": "Data Integrator",
      "sector-4": "Machinery & Equipment",
      "sector-5": "Export",
      "sector-7": "IC Advisor IIC UAE",
      "error-name-required": "Il nome è obbligatorio",
      "error-name-invalid":
        "Il nome deve contenere solo lettere (2-30 caratteri)",
      "error-surname-required": "Il cognome è obbligatorio",
      "error-surname-invalid":
        "Il cognome deve contenere solo lettere (2-30 caratteri)",
      "error-phone-required": "Il numero di telefono è obbligatorio",
      "error-phone-invalid": "Inserisci un numero di telefono valido",
      "error-email-required": "L'email è obbligatoria",
      "error-email-invalid": "Inserisci un indirizzo email valido",
      "error-sector-required": "Seleziona un settore",
      "error-privacy-required":
        "È necessario accettare la Privacy Policy per inviare il form",
      "error-message-too-long":
        "Il messaggio non può superare i 1000 caratteri",
      "calendar-link": "Visualizza calendario progetti 🗓️",
      "calendar-header": "Calendario Progetto IC Advisor IIC UAE",
      "update-date": "Aggiornato al: <strong>22 Ottobre 2025</strong>",
    },
    en: {
      "hero-title": "THE STRATEGIC BASIS FOR BUSINESS GROWTH",
      "hero-description":
        "Quick operational wins that become lasting capabilities within high-performing SMEs.<br />Leadership for change<br />Specific professional and managerial experience in the role<br />Operational effectiveness and flexibility of the model",
      "hero-description1": "ORGANIC GROWTH | MERGER & ACQUISITIONS",
      "hero-description2": "A MODEL OF OPERATIONAL MANAGEMENT",
      "hero-description3":
        "EXECUTIVE INTERIM MANAGEMENT ON A FRACTIONAL TIME BASIS<br />CEO INTERFACE | GENERATIONAL TRANSITION | COO ROLE ENABLEMENT",
      "btn-appointment": "Contact Us",
      "btn-services": "Our Services",
      "btn-portfolio": "IIC UAE ADVISOR",
      "nav-home": "home",
      "nav-about": "about us",
      "nav-services": "services",
      "nav-methodology": "methodology",
      "nav-sectors": "sectors",
      "nav-contacts": "contact us",
      "nav-ownership": "Ownership of a project model",
      "nav-experience": "The experience of DOING",
      "nav-approach": "Consolidated methodological approach",
      "nav-indicators": "Indicators and monitoring",
      "gallery-title": "Ownership with a project model",
      "gallery-subtitle":
        "Projects carried out in different markets and product areas that develop and create lasting value for our clients.<br />Interim Management specialized in the Chief Operating Officer role dedicated to excellence companies with strong commitment to change.<br />Importance of using standard libraries and consolidated monitoring tools.",
      "about-title": "The experience of DOING - Partnership as a resource",
      "about-quote":
        "It is progress that transforms the company into an extraordinary process, but it is its history and roots that establish its uniqueness.",
      "about-text":
        "The operational leadership of «due i to business» was born as a coordination hub between the Host Companies of the service and various business <b>partners</b> within a wide industrial <b>network</b> at national and international level. <br /><br /><br />The studio provides services aimed at strengthening organizations and <b>decision-making mechanisms</b>, and offers a precise and challenging overview of opportunities to seize in Sales & Operations & Marketing. <br /><br /><br />The integration logic is guaranteed from the origin as these services are developed according to a shared data architecture available in the company's reference ERP. Regardless of the mode and service chosen, a methodological path is always provided, including an intrinsic <b>managerial format</b> and a systematic follow-up of project progress in day-by-day operations.",
      "break-title-1": "Mission",
      "break-subtitle-1":
        "Support business activities of excellence companies with an adequate methodology to maintain and develop organic growth and M&A.",
      "break-title-2":
        "Transform theories into concrete results through a scientific approach shared with company key people<br />Efficiency in the use of indicators",
      "break-item-1": "AS IS IT",
      "break-item-2": "OBJECTIVE DEFINITION",
      "break-item-3": "PERIODIC MONITORING",
      "break-item-4": "AS IS IT vs TARGET",
      "break-btn-2": "Discover Sectors and Projects",
      "methodology-title":
        "Consolidated methodological approach at the base of services",
      "methodology-quote":
        "Clinical Organisation Development (CODp)<br />Automation Design Review (ADR).",
      "methodology-values":
        "Distinctive methodology customized for SMEs (CODp)",
      "methodology-body1":
        "Introduction | streamlining of team meetings<br />Definition | adoption of shared measurable criteria and indicators<br />Promotion and development of managerial skills<br />Focus on concreteness vs opinion risk<br />Strategic programming with permanent project reviews",
      "methodology-values1": "Importance of integrated data management (ADR)",
      "methodology-body2":
        "The KNOW HOW of Cost structure and Margin as team heritage<br />Communication linearity | Modularity and synergy of ongoing projects<br />Criteria for designing data interfaces avoiding double handling<br />Autonomy of peripheral systems vs ERP<br />Importance and enhancement of system integration",
      "services-title": "Our services",
      "services-subtitle":
        "Personalized strategic solutions to optimize processes and develop managerial skills.",
      "service-1-title": "OPERATIONAL CHECK UP",
      "service-1-subtitle": "INTERIM CHIEF OPERATING OFFICER MANAGEMENT",
      "service-1-desc":
        "CHIEF OPERATING OFFICER – EXECUTIVE INTERIM MANAGEMENT<br /><br />Development of the COO role and optimization of operational processes.",
      "service-2-title": "ORGANIZATIONAL DEVELOPMENT",
      "service-2-subtitle1": "SPOT ON FRACTIONAL TIME BASIS INTERVENTION",
      "service-2-subtitle2":
        "Support for human resources and development of the foundations for corporate culture change",
      "service-2-desc":
        "<br />Support for human resources and development of the foundations for corporate culture change",
      "service-3-title": "STRATEGIC REVIEW",
      "service-3-subtitle":
        "SPOT ON FRACTIONAL TIME BASIS INTERVENTION<br />Depending on the need, this type of intervention provides company management with fast and authoritative «outsourcing» support in the decision-making process",
      "service-3-desc":
        "||ANALYSIS AND REVISION OF STRATEGIC AND GROWTH PLANS||<br />||SUPPORT AND STREAMLINING OF COMMERCIAL STRATEGIES||<br />||INTERNATIONALIZATION – GUIDE SPECIAL PROJECTS||",
      "service-4-title": "LOGISTICS PARTNERSHIP",
      "service-4-subtitle":
        "PARTNERSHIP SERVICE FOR LOGISTICS OPERATORS IN THE FMCG SECTOR<br />Introduction of order cycle governance in integrated logistics service offerings",
      "service-4-desc":
        "<br />GUIDE AND SUPPORT FOR INTEGRATED LOGISTICS OPERATIONS<br /><br />Order cycle governance",
      "service-5-title": "IIC UAE ADVISOR",
      "service-5-desc":
        "Reference point for Italian excellence companies. Leadership for the internationalization project. Certified interface of the Chamber of Commerce in UAE<br />",
      "service-detail-content":
        "The service involves the development of the COO role | 3-year plan | Introduction and use of the following mechanisms",
      "checkup-left-1": "LEADERSHIP ON OPERATIONAL TEAM",
      "checkup-left-2":
        "MKT | SALES | EXPORT TEAM | OPERATIONS | PURCHASING | MANAGEMENT CONTROL | PLANNING",
      "checkup-left-4": "Governance type:",
      "checkup-left-5": "Functional responsibilities:",
      "checkup-left-6":
        "SET UP MULTI-YEAR OPERATIONAL PLAN IN THE FIRST 4 MONTHS",
      "checkup-left-7": "CONTINUOUS MONITORING STOCK VS SALES",
      "checkup-left-8": "COORDINATION | PROJECT SYNERGY",
      "checkup-left-9": "INTRODUCTION OF MANAGERIAL FORMAT",
      "checkup-left-10": "FOCUS ON OPERATING MARGIN EVOLUTION:",
      "checkup-left-11":
        "OPERATIONAL QUICK WINS FOR BUSINESS DEBOTTLENECKING: <b>10% MIN</b>",
      "checkup-left-12":
        "QUICK WINS COST REDUCTION FIRST AND SECOND YEAR: <b>15% MIN</b>",
      "checkup-left-13":
        "QUICK WINS PURCHASING SECOND AND THIRD YEAR: <b>20% MIN</b>",
      "checkup-left-14": "PRODUCT PORTFOLIO MARGIN | RULES",
      "checkup-left-15": "BUSINESS CASE FOR EXPORT PROJECTS | TARGET MARGIN",
      "checkup-left-16": "REVIEW TRADE OFF PROJECTS VS MARGINALITY | RULES",
      "checkup-left-17": "EXPECTED INDUCED ORGANIC GROWTH: 30 % MIN",
      "checkup-right-title": "ROLE DEVELOPMENT:",
      "checkup-right-1": "Optimization and streamlining of business processes",
      "checkup-right-2":
        "Focus on improving operating costs in various departments",
      "checkup-right-3":
        "Cascade down of strategic objectives in various corporate functions",
      "checkup-right-4":
        "Continuous monitoring of adherence to operational plans",
      "checkup-right-5": "Maximize Team potential",
      "checkup-right-6":
        "Implementation of new way of working | indicators | group dynamics",
      "checkup-right-7":
        "Risks vs Business opportunities | continuity vs quick wins",
      "checkup-right-8": "Focus on product portfolio margin",
      "checkup-right-9":
        "Synergies and integration of functions | flow and data architecture",
      "checkup-right-10": "Accelerate the execution of strategic projects",
      "svil-org-left-1": "RESOURCES | PROFILE MAPPING",
      "svil-org-left-2": "BALANCING COMPETENCIES AS IS IT vs TARGET",
      "svil-org-left-2-1": "LEADERSHIP MODEL",
      "svil-org-left-2-2": "RELATIONAL EXPECTATIONS",
      "svil-org-left-2-3": "TRAINING SKILLS",
      "svil-org-left-2-4": "PROGRAM SOLVING CAPABILITIES",
      "svil-org-left-2-5": "USE OF ORGANIZATIONAL CAPABILITIES",
      "svil-org-left-3": "SHARING A CHANGE MODEL",
      "svil-org-left-3-1":
        "FUNCTION RESPONSIBILITIES | ORGANIZATIONAL CHART AS A TOOL",
      "svil-org-left-3-2": "DEFINITION OF BUSINESS PROCESSES | RACI TOOL",
      "svil-org-left-3-3": "NEW WAY OF WORKING | IMPORTANCE OF COMMUNICATION",
      "svil-org-left-3-5": "TRAINING IN DAY-BY-DAY BUSINESS",
      "service-detail-2-1":
        "Organizational design | creation of new directions",
      "service-detail-2-2":
        "Business Debottlenecking | Importance of Organizational Charts",
      "service-detail-2-3": "HR | HH support in personnel selection process",
      "service-detail-2-4":
        "JD | verification of organizational correspondence with reference models",
      "service-detail-2-5":
        "HR support in personnel evaluation | parameterization",
      "service-detail-2-6":
        "Identification of conflict areas | debottlenecking",
      "service-detail-2-7":
        "Definition of training plans and skills development plans",
      "service-detail-2-8": "Proposal of a change model",
      "strategic-section-1": "Operational plans analysis",
      "strategic-section-2": "Sales support",
      "strategic-section-3": "MKT & Sales Support",
      "service-detail-3-1": "<br />INDUSTRIAL PLANS REVIEW",
      "service-detail-3-2": "BUSINESS PLAN REVIEW",
      "service-detail-3-3": "ADHERENCE TO MULTI-YEAR STRATEGIC PLAN",
      "service-detail-3-5": "FOCUS ON ORGANIC GROWTH",
      "service-detail-3-6": "IRP | REQUIREMENTS UPGRADE",
      "service-detail-3-7": "<br /><br /><br />CONTRACT REVIEW",
      "service-detail-3-9":
        "THE CLIENT’S PERSPECTIVE<br>A 360° “OUTSIDER” VIEW DURING NEGOTIATIONS<br>AND UP TO THE FINALIZATION OF THE CONTRACT",
      "service-detail-3-11": "PROJECTS WITH EXPORT TEAM",
      "service-detail-3-12": "TECHNICAL AMBASSADOR",
      "service-detail-3-13": "SPECIAL PROJECTS",
      "service-detail-3-14": "TESTIMONY",
      "service-detail-3-15": "THE PROJECT MANAGEMENT THAT <br /> «SELLS»",
      "discover-more": "BENCHMARKING<br /><br />OPERATIONAL EXCELLENCE",
      "service-detail-4-left-1": "GUIDE TO LOGISTICS SERVICE INTEGRATION",
      "service-detail-4-left-2": "IMPORTANCE OF THE MANAGERIAL FACTOR",
      "service-detail-4-left-3":
        "AN OPL RESOURCE INTEGRATED IN-HOUSE OF THE CLIENT COMMITTENT PERMANENTLY INTERFACED WITH A LOGISTICS KEY PEOPLE OF THE COMMITTENT",
      "service-detail-4-left-4":
        "BACK OFFICE | INTEGRATED LOGISTICS FRONT OFFICE",
      "service-detail-4-left-5":
        "CUSTOMIZATION OF THE LOGISTICS OFFER TAKING INTO ACCOUNT THE OPPORTUNITIES OFFERED BY THE CLIENT'S ORDER CYCLE MANAGEMENT",
      "service-detail-4-left-6":
        "THE ADDED VALUE OF PROCESS GOVERNANCE | COSTS | SERVICE",
      "service-detail-4-left-7":
        "INTRODUCTION OF PROGRAM SOLVING CONCEPTS IN THE LOGISTICS OFFER",
      "service-detail-4-left-8": "PACK OF RULES TO SHARE WITH THE CLIENT",
      "service-detail-4-left-9":
        "OFFER FOR DISTRIBUTION CHANNEL | SIZE | OPPORTUNITIES",
      "service-detail-4-left-10":
        "LOGISTICS RESPONSIBILITY IS NOT DELEGABLE | IMPROVISATION AS A NEGATIVE CATALYST OF THE SERVICE",
      "service-detail-4-right-1":
        "&nbsp;&nbsp;Order cycle management that guarantees service excellence",
      "service-detail-4-right-2":
        "&nbsp;&nbsp;Complete integration of the order cycle up to last mile <br>&nbsp;&nbsp;distribution logistics",
      "service-detail-4-right-3":
        "&nbsp;&nbsp;Optimization of decision flows in the various phases of the order to reduce<br>&nbsp;&nbsp; dead times and administrative and commercial blocks",
      "service-detail-4-right-4":
        "&nbsp;&nbsp;Importance of logistics and commercial rules in contractual management",
      "service-detail-4-right-5":
        "&nbsp;&nbsp;Customized customer service indicators consistent with the order cycle structure",
      "service-detail-4-right-6":
        "&nbsp;&nbsp;Constant monitoring of logistics performance",
      "service-detail-4-right-7":
        "&nbsp;&nbsp;Advantages and opportunities for the client who can complete his logistics<br>&nbsp;&nbsp; department with a series of specialized services that only an <br>&nbsp;&nbsp;OPL is able to<br>&nbsp;&nbsp; provide (see list of services)",
      "iic-uae-title":
        "<b>I</b>talian <b>C</b>ertified <b>A</b>dvisor <b>IIC UAE</b>",
      "iic-uae-services":
        "Within the Italian Certified Advisor IIC UAE 2025 – 2026 project, the studio has been selected as a certified partner of the Italian Chamber of Commerce in the United Arab Emirates (UAE). Specifically, Daniel Marchisio, Operations Business Partner of due i to business, has been certified ICA 547 for the province of Milan.<br /><br />«In a historical moment marked by growing cooperation between Italy and the UAE, strengthened by important bilateral agreements, the prospects for companies and professionals in this territory are broad, concrete and rapidly expanding»<br /><br />«The Emirates today represent one of the most dynamic and interconnected economies globally, with a growing demand for qualified skills in legal, fiscal, corporate and strategic consulting sectors»<br /><br />The studio is honored to participate in the initiative that enhances Italian excellence in the professional and consulting sector.",
      "principles-title": "UAE INTERNATIONALIZATION PATH CLUSTERS",
      "principles-subtitle": "The four phases of Agenda 2025-2026",
      "principle-1-title": "BIDIRECTIONAL SCOUTING",
      "principle-1-desc": "INITIATIVE PROMOTION<br />THE TEAM IN DUBAI",
      "principle-2-title": "INFO MODULE",
      "principle-2-desc": "SPECIFIC INFO<br />CLIENT PROJECT/IDEA",
      "principle-3-title": "TRAINING | MATCHING",
      "principle-3-desc": "SPECIFIC TRAINING<br />CLIENT COMPANY PROJECT",
      "principle-4-title": "FOLLOW UP | MATCHING",
      "principle-4-desc": "SPECIFIC SUPPORT<br />CLIENT PROJECT PROGRESS",
      "principles-deep-title": "Insights into program clusters",
      "principles-deep-subtitle":
        "Discover the advantages of applying our methodology in daily practice and in the internationalization journey of MADE IN ITALY in the United Arab Emirates",
      "deep-principle-1-title": "BIDIRECTIONAL SCOUTING",
      "deep-principle-1-desc":
        "Our bidirectional scouting approach ensures targeted and personalized research of business opportunities.",
      "deep-principle-1-1":
        "Initiative promotion at Category associations | Chamber",
      "deep-principle-1-2": "2025-2026 agenda preparation",
      "deep-principle-1-3":
        "Identification of specific opportunities in the UAE",
      "deep-principle-1-4": "Company profiles and product sectors",
      "deep-principle-1-5": "Team preparation in Dubai | due i to business",
      "deep-principle-1-6":
        "Managerial skills in coordinating Sales & Operations & MKT | Experience in various business sectors",
      "deep-principle-1-7":
        "Specific know-how on mechanisms that develop margins | Avoid causes of export project slowdown",
      "deep-principle-2-title": "INFO MODULE",
      "deep-principle-2-desc":
        "This module provides detailed and continuously updated information on the Emirati market and begins to prepare a client project | Importance of having a certified UAE counterpart",
      "deep-principle-2-1":
        "Specific information pack [commercial | legal | financial] | Dubai Team support",
      "deep-principle-2-2": "General information on reference markets",
      "deep-principle-2-3": "Overview of competitors in the new market",
      "deep-principle-2-4":
        "Initial client project evaluation/growth assessment",
      "deep-principle-2-5":
        "Knowledge of the client and their project in UAE | project definition",
      "deep-principle-2-6":
        "Preparation of a business case | Internal threats to the project | Market expectations",
      "deep-principle-3-title": "TRAINING | MATCHING",
      "deep-principle-3-desc":
        "Specific training and foundations for developing the skills necessary for success.",
      "deep-principle-3-1":
        "Preparation for client matching with Emirati «client» | project check",
      "deep-principle-3-2":
        "Preparation of the client's company project | business focus | the product being sold",
      "deep-principle-3-3":
        "Italy | Dubai matching [chamber office AI Moosa Tower 2, Trade Centre, Dubai, UAE]",
      "deep-principle-3-5":
        "Business Case Review | Technical-merchandise testimony intervention | Meeting with the «client»",
      "deep-principle-4-title": "FOLLOW UP | MATCHING",
      "deep-principle-4-desc": "Support and monitoring of the client project",
      "deep-principle-4-1":
        "Assistance and monitoring during launch and implementation",
      "deep-principle-4-2":
        "Monitoring of results | Development of a potential second round",
      "deep-principle-4-3":
        "Matching Italy | Dubai [chamber office AI Moosa Tower 2, Trade Centre, Dubai, UAE]",
      "deep-principle-4-4": "Post-launch support and optimization",
      "deep-principle-4-5":
        "Modularity and scalability of the project | Support for commercial network development",
      "sectors-title": "Expertise and projects in various sectors",
      "sectors-subtitle":
        "Our experience extends across different industrial sectors, offering personalized solutions and specialized skills for every business area. From food production to advanced logistics, we support companies in growth, process optimization and implementation of innovative strategies that generate concrete and measurable results.",
      "sector-food": "Food & Beverages",
      "sector-wine": "Wines & Liquors",
      "sector-data": "Data Integrator",
      "sector-machinery": "Machinery & Equipment",
      "sector-export": "Export",
      "sector-dubai": "Export UAE",
      "sector-food-1":
        "YEARS OF EXPERTISE IN THE SECTOR &nbsp; &nbsp;<b>25+</b>",
      "sector-food-2": "DUE DILIGENCES &nbsp; &nbsp;<b>1+</b>/3",
      "sector-food-3": "<b>MARKET LEADER</b> BRANDS COMPANIES",
      "sector-food-4":
        "<b>A & M</b> EU RESTRUCTURING &nbsp;&nbsp;<b>5 COMPANIES</b>",
      "sector-wine-1":
        "YEARS OF EXPERTISE IN THE SECTOR &nbsp; &nbsp;<b>6+</b>",
      "sector-wine-2": "GROWTH ENVIRONMENT &nbsp; &nbsp;<b>40%</b>",
      "sector-wine-3": "<b>TOP MARKET LEADER</b> BRAND COMPANY",
      "sector-wine-3-1": "ORGANIZATIONAL CHANGE MODELS",
      "sector-wine-4": "INTEGRATED LOGISTICS",
      "sector-data-1": "ADR | ERP INTEGRATION PROJECTS &nbsp; &nbsp;<b>4+</b>",
      "sector-data-2": "<b>ADR PORTSUNLIGHT SPECIFICATIONS</b>",
      "sector-data-3": "NEW «DELTA V» OLIVE OIL COMPANY",
      "sector-data-4": "NEW «DELTA V» FOR MERGER BESTFOOD",
      "sector-data-5":
        "EU FOOD COMPANIES SC REVIEW &nbsp; &nbsp;<b>5 PLANTS</b>",
      "sector-machinery-1": "SALES PARTNERSHIP WITH TOP SUPPLIERS",
      "sector-machinery-2":
        "COMMERCIAL SUPPORT PROJECTS &nbsp; &nbsp;<b>2 MIL +</b>",
      "sector-machinery-3":
        "MAJOR INVESTMENT PROJECTS &nbsp; &nbsp;<b>70 MIL +</b>",
      "sector-machinery-4": "ENERGY CHT PROJECTS &nbsp; &nbsp;<b>2+</b>",
      "sector-export-1": "BERTOLLI USA | <b>CLUB WAREHOUSE</b>",
      "sector-export-4": "NEW FORMAT TO INCREASE FOOTFALL",
      "sector-export-2":
        "DRY PRODUCTS FOR <b>MENA AREA</b> &nbsp; &nbsp;<b>12 KT +</b>",
      "sector-export-3": "<b>STRATEGIC COORDINATION</b>",
      "sector-dubai-1": "Reference point for Italian companies",
      "sector-dubai-2": "UAE Chamber of Commerce interface",
      "sector-dubai-3": "Connector with Emirati partners",
      "sector-dubai-4": "<b>ICA 547 CERTIFICATION</b>",
      "sector-dubai-5": "ADVISOR | MILAN AND PROVINCE",
      "contacts-title": "Contact us - Call to Action",
      "company-field": "Company Name",
      "company-placeholder": "Enter your company name",
      "form-name": "Name",
      "form-surname": "Surname",
      "form-phone": "Phone number",
      "form-email": "Email",
      "form-sector": "Sector",
      "form-sector-placeholder": "Select a sector",
      "form-message": "Message",
      "form-message-placeholder": "Describe your needs...",
      "form-submit": "Send Request",
      "footer-title": "DUE I TO BUSINESS S.R.L.S.",
      "footer-desc": "Strategic consulting for the organic growth of SMEs.",
      "footer-sede": "Registered office",
      "footer-viale":
        "Viale Papa Giovanni Paolo II, 29, Arconate (Milan), 20020, Lombardy",
      "footer-services": "Services",
      "footer-contacts": "Contacts",
      "footer-consultation": "Consultation by appointment",
      "footer-copyright": "© 2025 DUE I TO BUSINESS S.R.L.S. | VAT 10792930967",
      "footer-privacy": "Privacy Policy",
      "footer-cookie": "Cookie Policy",
      "privacy-consent-start":
        "By submitting this form, I declare that I have read the",
      "privacy-policy-link": "Privacy Policy",
      "privacy-consent-end":
        "and authorize the processing of my personal data to respond to my request.",
      "sector-1": "Food & Beverages",
      "sector-2": "Wines & Liquors",
      "sector-3": "Data Integrator",
      "sector-4": "Machinery & Equipment",
      "sector-5": "Export",
      "sector-7": "IC Advisor IIC UAE",
      "error-name-required": "Name is required",
      "error-name-invalid": "Name must contain only letters (2-30 characters)",
      "error-surname-required": "Surname is required",
      "error-surname-invalid":
        "Surname must contain only letters (2-30 characters)",
      "error-phone-required": "Phone number is required",
      "error-phone-invalid": "Please enter a valid phone number",
      "error-email-required": "Email is required",
      "error-email-invalid": "Please enter a valid email address",
      "error-sector-required": "Please select a sector",
      "error-privacy-required":
        "You must accept the Privacy Policy to submit the form",
      "error-message-too-long": "The message cannot exceed 1000 characters",
      "calendar-link": "View project calendar 🗓️",
      "calendar-header": "IC Advisor IIC UAE Project Calendar",
      "update-date": "Updated on: <strong>22 October 2025</strong>",
    },
  };

  function changeLanguage(lang) {
    currentLanguage = lang;

    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        element.innerHTML = translations[lang][key];
      }
    });

    document.documentElement.lang = lang;

    document.querySelectorAll(".language-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    const activeDesktopBtn = document.querySelector(
      `.desktop-only [data-lang="${lang}"]`
    );
    if (activeDesktopBtn) {
      activeDesktopBtn.classList.add("active");
    }

    const mobileTriggerEl = document.querySelector(".language-trigger");
    const mobileFlag = mobileTriggerEl
      ? mobileTriggerEl.querySelector(".flag-icon")
      : null;
    const mobileOptions = document.querySelectorAll(".language-option");

    if (mobileFlag) {
      const flagSrc =
        lang === "it"
          ? "https://flagcdn.com/w20/it.png"
          : "https://flagcdn.com/w20/gb.png";
      mobileFlag.src = flagSrc;
      mobileTriggerEl.setAttribute("data-lang", lang);
    }

    mobileOptions.forEach((option) => {
      option.classList.remove("active");
      if (option.getAttribute("data-lang") === lang) {
        option.classList.add("active");
      }
    });
  }

  // Event listeners lingua desktop
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      changeLanguage(lang);
    });
  });

  // Event listeners lingua mobile
  const mobileDropdown = document.querySelector(".language-dropdown");
  const mobileTriggerEl = document.querySelector(".language-trigger");
  const mobileOptions = document.querySelectorAll(".language-option");

  if (mobileTriggerEl) {
    mobileTriggerEl.addEventListener("click", function () {
      if (mobileDropdown) mobileDropdown.classList.toggle("active");
    });
  }

  mobileOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      changeLanguage(lang);
      if (mobileDropdown) mobileDropdown.classList.remove("active");
    });
  });

  document.addEventListener("click", function (e) {
    if (mobileDropdown && !mobileDropdown.contains(e.target)) {
      mobileDropdown.classList.remove("active");
    }
  });

  // ========== VALIDAZIONE FORM ==========
  const contactForm = document.querySelector(".form");
  const formFields = {
    nome: document.getElementById("nome"),
    cognome: document.getElementById("cognome"),
    telefono: document.getElementById("telefono"),
    email: document.getElementById("email"),
    settore: document.getElementById("settore"),
    messaggio: document.getElementById("messaggio"),
    privacy: document.getElementById("privacy-consent"),
  };

  function showFieldError(field, message) {
    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.textContent = message;
    errorDiv.style.color = "#e53e3e";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.marginTop = "5px";
    field.parentNode.appendChild(errorDiv);

    field.style.borderColor = "#e53e3e";
    field.style.boxShadow = "0 0 0 3px rgba(229, 62, 62, 0.1)";
  }

  function clearFieldError(field) {
    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }

    field.style.borderColor = "#e2e8f0";
    field.style.boxShadow = "none";
  }

  function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, "");
  }

  function validateField(fieldName) {
    const field = formFields[fieldName];
    if (!field) return true;

    const value =
      field.type === "checkbox" ? field.checked : sanitizeInput(field.value);
    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "nome":
        if (!value) {
          errorMessage = translations[currentLanguage]["error-name-required"];
          isValid = false;
        } else if (
          !/^[a-zA-Zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\s]{2,30}$/.test(value)
        ) {
          errorMessage = translations[currentLanguage]["error-name-invalid"];
          isValid = false;
        }
        break;
      case "cognome":
        if (!value) {
          errorMessage =
            translations[currentLanguage]["error-surname-required"];
          isValid = false;
        } else if (
          !/^[a-zA-Zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\s]{2,30}$/.test(value)
        ) {
          errorMessage = translations[currentLanguage]["error-surname-invalid"];
          isValid = false;
        }
        break;
      case "telefono":
        if (!value) {
          errorMessage = translations[currentLanguage]["error-phone-required"];
          isValid = false;
        } else if (!/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(value)) {
          errorMessage = translations[currentLanguage]["error-phone-invalid"];
          isValid = false;
        }
        break;
      case "email":
        if (!value) {
          errorMessage = translations[currentLanguage]["error-email-required"];
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = translations[currentLanguage]["error-email-invalid"];
          isValid = false;
        }
        break;
      case "settore":
        if (!value) {
          errorMessage = translations[currentLanguage]["error-sector-required"];
          isValid = false;
        }
        break;
      case "messaggio":
        if (value.length > 1000) {
          errorMessage =
            translations[currentLanguage]["error-message-too-long"];
          isValid = false;
        }
        break;
      case "privacy":
        if (!value) {
          errorMessage =
            translations[currentLanguage]["error-privacy-required"];
          isValid = false;
          const wrapper =
            field.closest(".privacy-checkbox") || field.parentNode;
          const existing = wrapper.querySelector(".field-error");
          if (existing) existing.remove();
          const div = document.createElement("div");
          div.className = "field-error";
          div.textContent = errorMessage;
          div.style.color = "#e53e3e";
          div.style.fontSize = "14px";
          div.style.marginTop = "8px";
          wrapper.appendChild(div);
          return false;
        } else {
          const wrapper =
            field.closest(".privacy-checkbox") || field.parentNode;
          const existing = wrapper.querySelector(".field-error");
          if (existing) existing.remove();
        }
        break;
    }

    if (!isValid && fieldName !== "privacy") {
      showFieldError(field, errorMessage);
    } else if (fieldName !== "privacy") {
      clearFieldError(field);
    }

    return isValid;
  }

  function validateForm() {
    let isFormValid = true;

    Object.keys(formFields).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  Object.keys(formFields).forEach((fieldName) => {
    const field = formFields[fieldName];
    if (!field) return;

    field.addEventListener("blur", () => {
      validateField(fieldName);
    });

    field.addEventListener("input", () => {
      if (fieldName === "privacy") {
        const wrapper = field.closest(".privacy-checkbox") || field.parentNode;
        const existing = wrapper.querySelector(".field-error");
        if (existing) existing.remove();
      } else {
        clearFieldError(field);
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      if (!validateForm()) {
        e.preventDefault();
        const firstError = document.querySelector(".field-error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      const submitBtn = contactForm.querySelector(".btn-primary");
      if (submitBtn) {
        submitBtn.dataset.originalText = submitBtn.textContent;
        submitBtn.textContent =
          currentLanguage === "it" ? "Invio in corso..." : "Sending...";
        submitBtn.disabled = true;
      }
    });
  }

  // ========== HERO SLIDER ==========
  const heroA = document.querySelector(".hero-bg");
  const heroB = document.querySelector(".hero-bg.next");

  const heroSlides = [
    "assets/foto1.webp",
    "assets/foto2.webp",
    "assets/foto3.webp",
    "assets/foto4.webp",
    "assets/foto5.webp",
  ];

  heroSlides.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  let idx = 0;
  let showingA = true;

  function setBg(el, url) {
    if (el) el.style.backgroundImage = `url("${url}")`;
  }

  function initHero() {
    if (!heroA || !heroB) return;
    setBg(heroA, heroSlides[0]);
    setBg(heroB, heroSlides[1]);
    heroA.classList.add("is-visible");
  }

  function crossfadeHero() {
    if (!heroA || !heroB) return;
    const nextIdx = (idx + 1) % heroSlides.length;

    const toShow = showingA ? heroB : heroA;
    const toHide = showingA ? heroA : heroB;

    setBg(toShow, heroSlides[nextIdx]);
    toShow.classList.add("is-visible");
    toHide.classList.remove("is-visible");

    showingA = !showingA;
    idx = nextIdx;
  }

  initHero();
  setInterval(crossfadeHero, 4000);

  // ========== BOTTONI HERO ==========
  const appointmentBtn = document.querySelector(".btn-primary");
  const servicesBtn = document.querySelector(".btn-secondary");

  if (appointmentBtn) {
    appointmentBtn.addEventListener("click", function () {
      const contattiSection = document.getElementById("contatti");
      if (contattiSection) {
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
        const targetPosition = contattiSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  if (servicesBtn) {
    servicesBtn.addEventListener("click", function () {
      const serviziSection = document.getElementById("servizi");
      if (serviziSection) {
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
        const targetPosition = serviziSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("click", function (e) {
      if (
        !e.target.classList.contains("btn") &&
        !e.target.closest(".mobile-language-switcher")
      ) {
        crossfadeHero();
      }
    });
  }
});

// ========== GALLERIA SLIDER ==========
const galleriaTrack = document.querySelector(".galleria-track");
const galleriaSlides = document.querySelectorAll(".galleria-slide");
const galleriaPrev = document.querySelector(".galleria-prev");
const galleriaNext = document.querySelector(".galleria-next");
const dotsDesktop = document.querySelectorAll(".galleria-dots-desktop .dot");
const dotsMobile = document.querySelectorAll(".galleria-dots-mobile .dot");

let currentSlide = 0;
const totalSlides = galleriaSlides.length;

function updateGalleria() {
  const isMobile = window.innerWidth <= 768;
  const slideWidth = isMobile ? 100 : 33.333;

  if (galleriaTrack) {
    galleriaTrack.style.transform = `translateX(-${
      currentSlide * slideWidth
    }%)`;
  }

  dotsDesktop.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  dotsMobile.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  const isMobile = window.innerWidth <= 768;
  const maxSlide = isMobile ? totalSlides - 1 : 5;

  currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
  updateGalleria();
}

function prevSlide() {
  const isMobile = window.innerWidth <= 768;
  const maxSlide = isMobile ? totalSlides - 1 : 5;

  currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
  updateGalleria();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateGalleria();
}

if (galleriaNext) {
  galleriaNext.addEventListener("click", nextSlide);
}

if (galleriaPrev) {
  galleriaPrev.addEventListener("click", prevSlide);
}

dotsDesktop.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

dotsMobile.forEach((dot, index) => {
  dot.addEventListener("click", () => goToSlide(index));
});

let autoPlayInterval;
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

const galleriaContainer = document.querySelector(".galleria-container");
if (galleriaContainer) {
  galleriaContainer.addEventListener("mouseenter", stopAutoPlay);
  galleriaContainer.addEventListener("mouseleave", startAutoPlay);
}

updateGalleria();
startAutoPlay();

window.addEventListener("resize", () => {
  updateGalleria();
});

// ========== FADE UP ON SCROLL ==========
function isElementPartiallyInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function handleScrollAnimation() {
  const elementsToAnimate = document.querySelectorAll(
    ".section h2, .section-intro, .section .two-col, .section .cards, .section .sectors-grid, .section .galleria-container, .section .contact-form-centered"
  );

  elementsToAnimate.forEach((element) => {
    if (isElementPartiallyInViewport(element)) {
      element.classList.add("visible");
    }
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (isElementPartiallyInViewport(card)) {
      card.classList.add("visible");
    }
  });

  const sectorCards = document.querySelectorAll(".sector-card");
  sectorCards.forEach((card) => {
    if (isElementPartiallyInViewport(card)) {
      card.classList.add("visible");
    }
  });

  const gallerySlides = document.querySelectorAll(".galleria-slide");
  gallerySlides.forEach((slide) => {
    if (isElementPartiallyInViewport(slide)) {
      slide.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(handleScrollAnimation, 100);
});

// ========== HIGHLIGHT ACTIVE SECTION ==========
function highlightActiveSection() {
  const sections = document.querySelectorAll(
    ".section, .hero, .section-break-gray"
  );
  const navLinks = document.querySelectorAll(".nav-list a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (currentSection === "galleria" && href === "#chi-siamo") {
      link.classList.add("active");
    } else if (currentSection === "metodologia" && href === "#metodologia") {
      link.classList.add("active");
    } else if (href === "#" + currentSection) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightActiveSection);
document.addEventListener("DOMContentLoaded", highlightActiveSection);

// ========== ANIMAZIONE LISTA BREAK ==========
function animateBreakList() {
  const breakSection = document.querySelector(".section-break-gray");
  const breakItems = document.querySelectorAll(".break-item");

  if (!breakSection || !breakItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          breakItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add("animate");
            }, index * 200);
          });
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(breakSection);
}

document.addEventListener("DOMContentLoaded", animateBreakList);

// ========== BOTTONI "SCOPRI DI PIÙ" ==========
document.addEventListener("DOMContentLoaded", function () {
  const discoverBtns = document.querySelectorAll(".discover-btn");

  const targetSections = [
    "strategic-review-a",
    "strategic-review-b",
    "strategic-review-c",
  ];

  discoverBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const targetSection = targetSections[index];
      const targetElement = document.getElementById(targetSection);

      if (targetElement) {
        const headerHeight = document.querySelector(".site-header")
          ? document.querySelector(".site-header").offsetHeight + 42
          : 100;

        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// ========== BOTTONE IIC UAE CONNECTOR ==========
document.addEventListener("DOMContentLoaded", function () {
  const uaeBtn = document.querySelector(".btn-accent");

  if (uaeBtn) {
    uaeBtn.addEventListener("click", function () {
      const targetElement = document.getElementById("iic-uae-connector");

      if (targetElement) {
        const headerHeight = document.querySelector(".site-header")
          ? document.querySelector(".site-header").offsetHeight + 42
          : 100;

        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        console.error("Sezione IIC UAE CONNECTOR non trovata");
      }
    });
  }
});

// ========== CAROUSEL PRINCIPI ==========
document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselSlides = document.querySelectorAll(".carousel-slide");
  const carouselDots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  let currentSlide = 0;
  const totalSlides = carouselSlides.length;

  function updateCarousel() {
    const translateX = -currentSlide * 25;
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    carouselDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });

    carouselSlides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  setInterval(nextSlide, 45000);
});

// Funzionalità dei puntini del carousel
document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".carousel-dot");
  const track = document.querySelector(".carousel-track");
  let currentSlide = 0;
  const totalSlides = 4;

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const translateX = -slideIndex * 25;
    track.style.transform = `translateX(${translateX}%)`;
    updateDots();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      goToSlide(currentSlide);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      goToSlide(currentSlide);
    });
  }
});

function goToCarouselSlide(slideIndex) {
  const carouselTrack = document.querySelector(".carousel-track");
  const carouselDots = document.querySelectorAll(".carousel-dot");

  if (carouselTrack && carouselDots.length > 0) {
    const translateX = -slideIndex * 25;
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    carouselDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });

    const carouselSection = document.querySelector(
      ".principles-carousel-section"
    );
    if (carouselSection) {
      const headerHeight = document.querySelector(".site-header")
        ? document.querySelector(".site-header").offsetHeight + 42
        : 100;

      const targetPosition = carouselSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}

function openGantt() {
  const popup = document.getElementById("gantPopup");
  popup.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeGantt() {
  const popup = document.getElementById("gantPopup");
  popup.style.display = "none";
  document.body.style.overflow = "";
  window.dispatchEvent(new Event("scroll"));
}

document.addEventListener("click", function (event) {
  const popup = document.getElementById("gantPopup");
  if (popup && event.target === popup) {
    closeGantt();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeGantt();
  }
});

document.querySelectorAll(".mobile-dropdown-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const parent = trigger.parentElement;
    parent.classList.toggle("open");
  });
});

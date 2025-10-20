document.addEventListener("DOMContentLoaded", function() {
    // ========== MENU MOBILE ==========
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
    }

    // Chiusura automatica menu mobile
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('show')) {
                mobileMenu.classList.remove('show');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Chiusura click outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
            document.body.classList.remove('menu-open');
        }
    });

    // Resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 956 && mobileMenu) {
            mobileMenu.classList.remove('show');
            document.body.classList.remove('menu-open');
        }
    });

    // ========== SCROLL BEHAVIOR CON SFOCATURA PROGRESSIVA ==========
    const topBanner = document.querySelector('.top-banner');
    const siteHeader = document.querySelector('.site-header');
    const heroSection1 = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg.is-visible');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Solo su desktop (larghezza > 768px)
        if (window.innerWidth > 768) {
            // Calcola l'altezza dell'hero (escludendo la navbar)
            const heroHeight = heroSection1 ? heroSection1.offsetHeight - siteHeader.offsetHeight : 0;
            
            // Gestione del banner superiore
            if (scrollTop > 50) {
                if (topBanner) topBanner.style.transform = 'translateY(-100%)';
                if (siteHeader) siteHeader.classList.add('fixed');
            } else {
                if (topBanner) topBanner.style.transform = 'translateY(0)';
                if (siteHeader) siteHeader.classList.remove('fixed');
            }
            
            // Gestione trasparenza navbar: trasparente solo dentro l'hero
            if (scrollTop > heroHeight) {
                if (siteHeader) siteHeader.classList.add('scrolled');
            } else {
                if (siteHeader) siteHeader.classList.remove('scrolled');
            }
            
            // Gestione sfocatura progressiva dell'hero
            const heroSection = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');

            if (heroBg && scrollTop <= heroHeight) {
                // Calcola quanto siamo scesi nell'hero (0 = inizio, 1 = fine)
                const scrollProgress = Math.min(scrollTop / heroHeight, 1);
                
                // Applica sfocatura progressiva (da 0px a 8px di blur)
                const blurAmount = scrollProgress * 8;
                // Applica oscuramento progressivo per migliorare la leggibilità
                const brightnessAmount = 1 - (scrollProgress * 0.2);
                
                heroBg.style.filter = `blur(${blurAmount}px) brightness(${brightnessAmount})`;
                
                // Sfocatura progressiva del contenuto
                if (scrollProgress > 0.01) { // Inizia a sfocare dopo l'1% dello scroll
                    const contentBlur = (scrollProgress - 0.1) * 5; // Da 0 a 4.5px di blur
                    const contentOpacity = 1 - (scrollProgress - 0.1) * 0.6; // Da 1 a 0.46 di opacità
                    
                    if (heroContent) {
                        heroContent.style.filter = `blur(${contentBlur}px)`;
                        heroContent.style.opacity = contentOpacity;
                    }
                } else {
                    // Rimuovi la sfocatura del contenuto
                    if (heroContent) {
                        heroContent.style.filter = 'none';
                        heroContent.style.opacity = '1';
                    }
                }
                
            } else if (heroBg && scrollTop > heroHeight) {
                // Massimo sfocatura quando si esce completamente dall'hero
                heroBg.style.filter = 'blur(8px) brightness(0.8)';
                
                // Sfocatura massima del contenuto
                if (heroContent) {
                    heroContent.style.filter = 'blur(4px)';
                    heroContent.style.opacity = '0.6';
                }
            } else {
                // Reset quando si torna in cima
                if (heroContent) {
                    heroContent.style.filter = 'none';
                    heroContent.style.opacity = '1';
                }
            }
            
        } else {
            // Su mobile, navbar sempre opaca
            if (siteHeader) siteHeader.classList.add('scrolled');
            // Su mobile, rimuovi la sfocatura per performance
            if (heroBg) {
                heroBg.style.filter = 'none';
            }
        }
    });

    // ========== SMOOTH SCROLLING PER LINK INTERNI ==========
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Chiudi menu mobile se aperto
                    if (mobileMenu && mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.remove('show');
                        document.body.classList.remove('menu-open');
                    }
                }
            }
        });
    });

    // ========== CARD SERVIZI CLICCABILI ==========
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            let targetId;
            
            // Determina quale sezione di approfondimento aprire
            switch(serviceType) {
                case 'Check Up Operativo':
                    targetId = 'checkup-operativo';
                    break;
                case 'HR Support & Mentoring':
                    targetId = 'sviluppo-organizzativo';
                    break;
                case 'Review Strategica':
                    targetId = 'strategic-review';
                    break;
                case 'Partnership Logistica':
                    targetId = 'partnership-logistica';
                    break;
                case 'IIC UAE Connector':
                    targetId = 'iic-uae-connector';
                    break;  
                default:
                    targetId = 'contatti'; // Fallback al form se non trova il servizio
            }
            
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Sezione non trovata:', targetId);
            }
        });
    });

    // ========== TRADUZIONI ==========
    let currentLanguage = 'it';
    const translations = {
        it: {
            'hero-title': 'LA BASE STRATEGICA PER LA CRESCITA AZIENDALE',
            'hero-organic': 'LA CRESCITA ORGANICA',
            'hero-merger': 'MERGER & ACQUISITIONS',
            'hero-description': 'Leadership per il cambiamento<br>Quick-wins operativi che diventano competenze permanenti nelle PMI di eccellenza',
            'btn-appointment': 'Richiedi Una Consulenza',
            'btn-services': 'I Nostri Servizi',
            'btn-portfolio': 'IIC UAE ADVISOR',
            'nav-home': 'home',
            'nav-about': 'chi siamo',
            'nav-services': 'servizi',
            'nav-methodology': 'metodologia',
            'nav-sectors': 'settori',
            'nav-contacts': 'contattaci',
            'gallery-title': 'Ownership di un modello progettuale',
            'gallery-subtitle': 'Progetti in diversi mercati ed aree merceologiche che sviluppano competenze e creano valore duraturo per i nostri clienti. Interim Management specializzato nel ruolo di COO per aziende di eccellenza e forte commitment al cambiamento. Importanza dell\'utilizzo di librerie e tools di monitoraggio standards.',
            'about-title': 'L\'esperienza del FARE',
            'about-quote': 'L\'innovazione guida ogni passo della consulenza, ma è la storia e il sapere maturato nel tempo a darle valore e autenticità.',
            'about-text': 'La leadership operativa di «due i to business», nasce come perno di coordinamento fra le Aziende Host del servizio e diversi <b>partners</b> di business presenti in un vasto <b>network</b> industriale del panorama nazionale ed internazionale. Lo studio mette a disposizione dei servizi mirati a potenziare le organizzazioni ed i <b>meccanismi decisionali</b> aziendali, inoltre forniscono una panoramica precisa e sfidante sulle opportunità da cogliere nei settori Sales & Operations & Marketing. <br><br><br>La logica di integrazione di questi servizi è garantita dall\'origine in quanto si sviluppano conformemente a un\'architettura di dati comuni a disposizione nel ERP gestionale di riferimento aziendale. Indipendentemente della modalità e dal tipo di servizio scelto è sempre previsto un percorso metodologico che include un format manageriale intrinseco e un follow up sistematico dell\'avanzamento del progetto nel day by day operativo.',
            'break-title-1': 'Mission',
            'break-subtitle-1': 'Sostenere le attività di business di aziende di eccellenza con utilizzo di adeguata metodologia di mantenimento e sviluppo del processo di crescita organica.',
            'break-btn-1': 'Richiedi una Consulenza',
            'methodology-title': 'Approccio metodologico consolidato alla base dei servizi',
            'methodology-quote': 'Clinical Organisation Development (CODp) e Automation Design Review (ADR).',
            'methodology-values': 'Metodologia distintiva personalizzata per le PMI(CODp)',
            'methodology-body1': 'Introduzione | efficientamento degli incontri dei gruppi di lavoro<br>Definizione | adozioni di criteri e indicatori comuni<br>Promozione e sviluppo delle competenze manageriali del personale<br>Focus sulla concretezza vs il rischio delle opinioni<br>Programmazione strategica con permanenti review dell\'avanzamento del progetto',
            'methodology-values1': 'Importanza della gestione integrata dei dati (ADR)',
            'methodology-body2': 'Il KNOW HOW del Costo del Prodotto e della Marginalità come patrimonio del team di lavoro<br>Linearità delle comunicazioni | Modularità e sinergia dei progetti in corso nelle varie funzioni<br>Criteri per la creazione dell\'interfaccia evitando doppio handling<br>Autonomia dei sistemi periferici vs attività del ERP<br>Importanza e valorizzazione dell\'integrazione dei sistemi',
            'break-title-2': 'Trasforma le teorie in risultati concreti attraverso un approccio scientifico e condiviso con le key people aziendali | utilizzo degli indicatori',
            'break-item-1': 'AS IS IT',
            'break-item-2': 'DEFINIZIONE OBBIETTIVI',
            'break-item-3': 'MONITORAGGIO PERIODICO',
            'break-item-4': 'AS IS IT vs TARGET',
            'break-btn-2': 'Scopri i nostri Settori',
            'services-title': 'I nostri servizi',
            'services-subtitle': 'Soluzioni strategiche personalizzate per ottimizzare processi e sviluppare competenze manageriali.',
            'service-1-title': 'CHECK UP OPERATIVO',
            'service-1-subtitle': 'INTERIM CHIEF OPERATING OFFICER MANAGEMENT',
            'service-1-desc': 'CHIEF OPERATING OFFICER – EXECUTIVE INTERIM MANAGEMENT<br><br>Sviluppo del ruolo di COO e ottimizzazione dei processi operativi.',
            'service-2-title': 'SVILUPPO ORGANIZZATIVO',
            'service-2-subtitle': 'Supporto alle risorse umane ed sviluppo delle basi per il cambiamento della cultura aziendale',
            'service-2-desc': 'Supporto alle risorse umane e sviluppo delle basi per il cambiamento della cultura aziendale',
            'service-3-title': 'STRATEGIC REVIEW',
            'service-3-subtitle': 'Analisi e revisione di piani strategici e di crescita',
            'service-3-desc': '||ANALISI E REVISIONE DI PIANI STRATEGICI E DI CRESCITA||<br>||SUPPORTO ED EFFICIENTAMENTO STRATEGIE COMMERCIALI||<br>||INTERNAZIONALIZZAZIONE – GUIDA PROGETTI SPECIALI||',
            'service-4-title': 'PARTNERSHIP LOGISTICA',
            'service-4-desc': 'GUIDA E SUPPORTO AD OPERAZIONI DI LOGISTICA INTEGRATA',
            'service-5-title': 'IIC UAE CONNECTOR',
            'service-5-desc': 'Punto di riferimento per le aziende italiane di eccellenza<br><br>Leadership per il progetto di internazionalizzazione<br><br>Interfaccia certificata della camera di commercio in UAE',
            'service-detail-role': 'il ruolo:',
            'service-detail-1-1': 'Ottimizzazione e snellimento dei processi aziendali',
            'service-detail-1-2': 'Miglioramento dell\'efficienza operativa',
            'service-detail-1-3': 'Cascade down degli obiettivi strategici nelle varie funzioni aziendali',
            'service-detail-1-4': 'Monitoraggio continuo aderenza ai piani operativi',
            'service-detail-1-5': 'Massimizzare il potenziale dei Team',
            'service-detail-1-6': 'Implementazione nuova metodologia di lavoro | indicatori | dinamiche di gruppo',
            'service-detail-1-7': 'Rischi vs Opportunità di business | continuity vs quick win',
            'service-detail-1-8': 'Sinergie e integrazione delle funzioni | architettura dei flussi e integrazione dati',
            'service-detail-1-9': 'Accelerare l\'esecuzione dei progetti strategici',
            'service-detail-2-1': 'Disegno organizzativo | creazione nuove direzioni',
            'service-detail-2-2': 'Business Debottlenecking',
            'service-detail-2-3': 'Supporto HR nella selezione del personale',
            'service-detail-2-4': 'JD | verifiche rispondenze organizzative con modelli di riferimento',
            'service-detail-2-5': 'Supporto HR nella valutazione del personale | parametrizzazione',
            'service-detail-2-6': 'Identificazione aree di conflitto | debottlenecking',
            'service-detail-2-7': 'Supporto HR nella definizione piani di Formazione e piani di sviluppo delle competenze',
            'service-detail-2-8': 'Proposta di un MODELLO DI CAMBIAMENTO',
            'strategic-section-1': 'Analisi piani operativi',
            'strategic-section-2': 'Sales support',
            'strategic-section-3': 'MKT & sales support',
            'service-detail-3-1': 'PIANI INDUSTRIALI REVIEW',
            'service-detail-3-2': 'BUSINESS PLAN',
            'service-detail-3-3': 'PIANO STRATEGICO',
            'service-detail-3-4': 'PLURIENNALE',
            'service-detail-3-5': 'FOCUS SULLA CRESCITA',
            'service-detail-3-6': 'ORGANICA',
            'service-detail-3-7': 'CONTRACT REVIEW',
            'service-detail-3-8': 'SUPPORTO AL SALES DEPT.',
            'service-detail-3-9': 'IL PUNTO DI VISTA DEL',
            'service-detail-3-10': 'CLIENTE A 360°',
            'service-detail-3-11': 'TECHNICAL AMBASSADOR',
            'service-detail-3-12': 'SUPPORTO AL MKT & SALES',
            'service-detail-3-13': 'PROGETTI SPECIALI',
            'service-detail-3-14': 'INTERNAZIONALIZZAZIONE',
            'service-detail-3-15': 'TESTIMONIANZA',
            'service-detail-3-16': 'PROJECT MANAGEMENT',
            'discover-more': 'Scopri di più',
            'service-detail-4-1': 'Servizio di partnership | integrazione logistica dedicato a OPL del settore FMCG',
            'service-detail-4-2': 'Gestione del ciclo dell\'ordine che garantisce l\'eccellenza del servizio',
            'service-detail-4-3': 'Completa integrazione del ciclo dell\'ordine fino alla logistica distributiva dell\'ultimo miglio',
            'service-detail-4-4': 'Ottimizzazione dei flussi decisionali nelle varie fasi',
            'service-detail-4-5': 'Importanza delle rules logistiche e commerciali nella gestione contrattuale',
            'service-detail-4-6': 'Indicatore di servizio cronologico della consegna diviso nei vari momenti del ciclo dell\'ordine',
            'service-detail-4-7': 'Partnership strategiche con OPL del settore FMCG',
            'service-detail-4-8': 'Monitoraggio costante delle performance logistiche',
            'service-detail-4-9': 'Implementazione di sistemi di controllo qualità',
            'service-detail-4-10': 'Gestione integrata della supply chain',
            'service-detail-4-11': 'Ottimizzazione dei tempi di consegna',
            'iic-uae-title': 'Italian Certified Advisor IIC UAE',
            'iic-uae-services': 'All\'interno del progetto Italian Certified Advisor IIC UAE 2025 – 2026; lo studio è stato selezionato come partner certificato della Camera di Commercio Italiana negli Emirati Arabi Uniti ( UAE ). Specificatamente l\'ing Daniel Marchisio è stato certificato ICA 547 per la provincia di Milano.<br><br>«In un momento storico segnato da una crescente cooperazione tra Italia ed EAU, rafforzata da importanti accordi bilaterali, le prospettive per le aziende e professionisti in questo territorio sono ampie, concrete e in forte espansione»<br><br>«Gli Emirati rappresentano oggi una delle economie più dinamiche e interconnesse a livello globale, con una domanda crescente di competenze qualificate nei settori legale, fiscale, societario e della consulenza strategica»<br><br>Lo studio è onorato di partecipare all\'iniziativa che valorizza l\'eccellenza italiana nel settore professionale e consulenziale.',
            'principles-title': 'I nostri principi',
            'principles-subtitle': 'I valori fondamentali che guidano il nostro approccio alla consulenza strategica e allo sviluppo aziendale.',
            'principle-1-title': 'SCOUTING BIUNIVOCO',
            'principle-1-desc': 'FROM PORTALE CAMERA<br>FROM DUEITO WEB<br>FROM UAE OPPORTUNITA',
            'principle-2-title': 'INFO',
            'principle-2-desc': 'GENERALE<br>IL PROGETTO DEL CLIENTE',
            'principle-3-title': 'FORMATIVO',
            'principle-3-desc': 'SPECIFICO<br>PROGETTO DEL CLIENTE',
            'principle-4-title': 'AFFIANCAMENTO',
            'principle-4-desc': 'SPECIFICO<br>GUIDA E SUPPORTO AL PROGETTO DEL CLIENTE',
            'principles-deep-title': 'Approfondimenti sui nostri principi',
            'principles-deep-subtitle': 'Scopri nel dettaglio come applichiamo i nostri principi nella pratica quotidiana e nel percorso di internazionalizzazione del MADE IN ITALY in Emirati Arabi Uniti',
            'deep-principle-1-title': 'SCOUTING BIUNIVOCO',
            'deep-principle-1-desc': 'Il nostro approccio di scouting bidirezionale garantisce una ricerca mirata e personalizzata delle opportunità di business.',
            'deep-principle-1-1': 'Analisi approfondita del portale Camera di Commercio',
            'deep-principle-1-2': 'Ricerca attiva attraverso il nostro network web',
            'deep-principle-1-3': 'Identificazione di opportunità specifiche negli UAE',
            'deep-principle-1-4': 'Matching automatico tra domanda e offerta',
            'deep-principle-2-title': 'INFO',
            'deep-principle-2-desc': 'Forniamo informazioni dettagliate e personalizzate per ogni progetto cliente, garantendo trasparenza e chiarezza.',
            'deep-principle-2-1': 'Informazioni generali sul mercato di riferimento',
            'deep-principle-2-2': 'Analisi specifica del progetto del cliente',
            'deep-principle-2-3': 'Report dettagliati sui competitor',
            'deep-principle-2-4': 'Valutazione delle opportunità di crescita',
            'deep-principle-3-title': 'FORMATIVO',
            'deep-principle-3-desc': 'Offriamo formazione specifica e personalizzata per ogni progetto, sviluppando le competenze necessarie al successo.',
            'deep-principle-3-1': 'Formazione specifica per il progetto del cliente',
            'deep-principle-3-2': 'Workshop personalizzati sui mercati UAE',
            'deep-principle-3-3': 'Training sulle normative locali',
            'deep-principle-3-4': 'Sviluppo competenze interculturali',
            'deep-principle-4-title': 'AFFIANCAMENTO',
            'deep-principle-4-desc': 'Supporto continuo e personalizzato per guidare il cliente attraverso ogni fase del progetto negli Emirati Arabi.',
            'deep-principle-4-1': 'Guida e supporto specifico al progetto del cliente',
            'deep-principle-4-2': 'Assistenza nella fase di implementazione',
            'deep-principle-4-3': 'Monitoraggio continuo dei risultati',
            'deep-principle-4-4': 'Supporto post-lancio e ottimizzazione',
            'sectors-title': 'I progetti nei vari settori',
            'sectors-subtitle': 'La nostra esperienza si estende attraverso diversi settori industriali, offrendo soluzioni personalizzate e competenze specializzate per ogni ambito di business. Dalla produzione alimentare alla logistica avanzata, supportiamo le aziende nella crescita, nell\'ottimizzazione dei processi e nell\'implementazione di strategie innovative che generano risultati concreti e misurabili.',
            'sector-food': 'Food & Beverages',
            'sector-wine': 'Wines & Liquors',
            'sector-data': 'Data Integrator',
            'sector-machinery': 'Industrial Machinery & Equipment',
            'sector-export': 'Export',
            'sector-dubai': 'Dubai',
            'sector-food-1': 'ANNI ESPERTISE NEL SETTORE <b>20+</b>',
            'sector-food-2': 'DUE DILIGENZE <b>1+</b> /3',
            'sector-food-3': '<b>MARKET LEADER</b> BRANDS COMPANIES',
            'sector-food-4': '<b>A & M</b> RESTRUCTURING ENVIRONMENT',
            'sector-wine-1': 'ANNI ESPERTISE NEL SETTORE <b>6+</b>',
            'sector-wine-2': 'GROWTH ENVIRONMENT <b>40%</b>',
            'sector-wine-3': '<b>TOP MARKET LEADER</b> BRAND COMPANY',
            'sector-wine-4': 'LOGISTICA INTEGRATA',
            'sector-data-1': 'PROGETTI DI ADR | ERP MANAGEMENT <b>4+</b>',
            'sector-data-2': '<b>ADR PORTSUNLIGHT SPECIFICATIONS</b>',
            'sector-data-3': 'NEW DELTA "V" OLIVE OIL COMPANY',
            'sector-data-4': '<b>ERP MERGER BESTFOOD COMPANY</b>',
            'sector-data-5': 'EUROPE FOOD COMPANIES SC REVIEW <b>5+</b>',
            'sector-machinery-1': 'ANALISI E REVISIONE DI PIANI COMMERCIALI',
            'sector-machinery-2': 'COMMERCIAL SUPPORT PROJECTS <b>2 MIO +</b>',
            'sector-machinery-3': 'HEAD PILLAR EARLY EQUIPMENT MANAGEMENT <b>70 MIO +</b>',
            'sector-export-1': 'BERTOLLI USA | <b>CLUB WAREHOUSE</b>',
            'sector-export-2': 'SUPPLY CHAIN AREA <b>MENA 12 KT +</b>',
            'sector-export-3': 'GROWTH ENVIRONMENT WINES <b>50% +</b>',
            'sector-dubai-1': 'Punto di riferimento per aziende italiane',
            'sector-dubai-2': 'Interfaccia Camera Commercio UAE',
            'sector-dubai-3': 'Connector con partner emiratini',
            'sector-dubai-4': 'Supporto espansione mercato UAE',
            'contacts-title': 'Contattaci per una consulenza personalizzata',
            'form-name': 'Nome',
            'form-surname': 'Cognome',
            'form-phone': 'Numero di telefono',
            'form-email': 'Email',
            'form-sector': 'Settore',
            'form-sector-placeholder': 'Seleziona un settore',
            'form-message': 'Messaggio',
            'form-message-placeholder': 'Descrivi le tue esigenze...',
            'form-submit': 'Invia Richiesta',
            'footer-title': 'DUE I TO BUSINESS S.R.L.S.',
            'footer-desc': 'Consulenza strategica per la crescita organica delle PMI.',
            'footer-sede': 'Sede legale',
            'footer-viale': 'Viale Papa Giovanni Paolo II, 29, Arconate (Milano), Lombardia',
            'footer-services': 'Servizi',
            'footer-contacts': 'Contatti',
            'footer-consultation': 'Consulenza su appuntamento',
            'footer-copyright': '© 2025 DUE I TO BUSINESS S.R.L.S. | P.IVA 10792930967',
            'footer-privacy': 'Privacy Policy',
            'footer-cookie': 'Cookie Policy',
            'error-name-required': 'Il nome è obbligatorio',
            'error-name-invalid': 'Il nome deve contenere solo lettere (2-30 caratteri)',
            'error-surname-required': 'Il cognome è obbligatorio',
            'error-surname-invalid': 'Il cognome deve contenere solo lettere (2-30 caratteri)',
            'error-phone-required': 'Il numero di telefono è obbligatorio',
            'error-phone-invalid': 'Inserisci un numero di telefono valido',
            'error-email-required': 'L\'email è obbligatoria',
            'error-email-invalid': 'Inserisci un indirizzo email valido',
            'error-sector-required': 'Seleziona un settore',
            'privacy-consent-start': 'Con l\'invio del form dichiaro di aver letto la',
            'privacy-policy-link': 'Privacy Policy',
            'privacy-consent-end': 'e autorizzo il trattamento dei miei dati personali per rispondere alla mia richiesta.',
            'error-privacy-required': 'È necessario accettare la Privacy Policy per inviare il form',
            'nav-ownership': 'Ownership di un modello progettuale',
            'nav-experience': 'L\'esperienza del FARE',
            'nav-approach': 'Approccio metodologico consolidato',
            'nav-indicators': 'Indicatori e misurazione',
            'sector-1': 'Food & Beverages',
            'sector-2': 'Sparkling Wines',
            'sector-3': 'Industrial Machinery & Equipment',
            'sector-4': 'Automation Manufacturer',
            'sector-5': 'Logistics Integrations',
            'sector-6': 'Technical Commercial Broking',
        },
        en: {
            'hero-title': 'THE STRATEGIC BASIS FOR BUSINESS GROWTH',
            'hero-organic': 'ORGANIC GROWTH',
            'hero-merger': 'MERGER & ACQUISITIONS',
            'hero-description': 'Leadership for change<br>Operational quick-wins that become permanent skills in excellence SMEs',
            'btn-appointment': 'Request a Consultation',
            'btn-services': 'Our Services',
            'btn-portfolio': 'IIC UAE ADVISOR',
            'nav-home': 'home',
            'nav-about': 'about us',
            'nav-services': 'services',
            'nav-methodology': 'methodology',
            'nav-sectors': 'sectors',
            'nav-contacts': 'contact us',
            'gallery-title': 'Ownership with a project model',
            'gallery-subtitle': 'Projects in different markets and product areas that develop skills and create lasting value for our clients. Interim Management specialized in the COO role for excellence companies with strong commitment to change. Importance of using standard libraries.',
            'about-title': 'The experience of DOING',
            'about-quote': 'Innovation guides every step of consulting, but it is the history and knowledge matured over time that gives it value and authenticity.',
            'about-text': 'The operational consulting of «due i to business», was born as a coordination hub between the Host Companies of the service and various business <strong>partners</strong> present in a very wide industrial <strong>network</strong> of the national and international landscape. The studio basically provides four services aimed at enhancing organizations and corporate decision-making mechanisms. The services provide a precise and challenging overview of the opportunities to be seized in Sales & Operations and Marketing sectors. <br><br><br>The integration logic of these services is guaranteed from the origin as they develop in accordance with a common data architecture available in the company\'s reference management ERP. Regardless of the service mode chosen, a methodological path is always planned that includes an intrinsic reference managerial format and a systematic follow-up of the project advancement in the day by day operational.',
            'break-title-1': 'Mission',
            'break-subtitle-1': 'Support business activities of excellence companies with the use of adequate methodology for maintaining and developing organic growth.',
            'break-btn-1': 'Request a Consultation',
            'methodology-title': 'Consolidated methodological approach at the base of services',
            'methodology-quote': 'Clinical Organisation Development (CODp) and Automation Design Review (ADR).',
            'methodology-values': 'Distinctive methodology customized for SMEs (CODp)',
            'methodology-body1': 'Introduction | streamlining of team meetings<br>Definition | adoption of shared measurable criteria and indicators<br>Promotion and development of managerial skills of the team present in the company<br>Focus on concreteness vs the risk of opinions<br>Strategic programming with permanent review of project advancement',
            'methodology-values1': 'Importance of integrated data management (ADR)',
            'methodology-body2': 'The KNOW HOW of Product Cost and Margin as team heritage<br>Communication linearity | Modularity and synergy of projects<br>Criteria for creating interfaces avoiding double data handling<br>Autonomy of peripheral systems vs ERP<br>Importance and enhancement of system integration',
            'break-title-2': 'Transform theories into concrete results through a scientific and measurable approach | use of indicators',
            'break-item-1': 'AS IS IT',
            'break-item-2': 'OBJECTIVE DEFINITION',
            'break-item-3': 'PERIODIC MONITORING',
            'break-item-4': 'AS IS IT vs TARGET',
            'break-btn-2': 'Discover our Sectors',
            'services-title': 'Our services',
            'services-subtitle': 'Personalized strategic solutions to optimize processes and develop managerial skills.',
            'service-1-title': 'OPERATIONAL CHECK UP',
            'service-1-subtitle': 'INTERIM CHIEF OPERATING OFFICER MANAGEMENT',
            'service-1-desc': 'CHIEF OPERATING OFFICER – EXECUTIVE INTERIM MANAGEMENT<br><br>Development of the COO role and optimization of operational processes.',
            'service-2-title': 'ORGANIZATIONAL DEVELOPMENT',
            'service-2-subtitle': 'Support for human resources and development of the foundations for changing corporate culture',
            'service-2-desc': 'Support for human resources and development of the foundations for changing corporate culture',
            'service-3-title': 'STRATEGIC REVIEW',
            'service-3-subtitle': 'Analysis and revision of strategic and growth plans',
            'service-3-desc': '||ANALYSIS AND REVISION OF STRATEGIC AND GROWTH PLANS||<br>||SUPPORT AND STREAMLINING OF COMMERCIAL STRATEGIES||<br>||INTERNATIONALIZATION – GUIDE SPECIAL PROJECTS||',
            'service-4-title': 'LOGISTICS PARTNERSHIP',
            'service-4-desc': 'GUIDE AND SUPPORT FOR INTEGRATED LOGISTICS OPERATIONS',
            'service-5-title': 'IIC UAE CONNECTOR',
            'service-5-desc': 'Reference point for Italian excellence companies<br><br>Leadership for the internationalization project<br><br>Certified interface of the chamber of commerce in UAE',
            'service-detail-role': 'the role:',
            'service-detail-1-1': 'Optimization and streamlining of business processes',
            'service-detail-1-2': 'Improvement of operational efficiency',
            'service-detail-1-3': 'Cascade down of strategic objectives in various corporate functions',
            'service-detail-1-4': 'Continuous monitoring of adherence to operational plans',
            'service-detail-1-5': 'Maximize Team potential',
            'service-detail-1-6': 'Implementation of new work methodology | indicators | group dynamics',
            'service-detail-1-7': 'Risks vs Business opportunities | continuity vs quick win',
            'service-detail-1-8': 'Synergies and integration of functions | flow architecture and data integration',
            'service-detail-1-9': 'Accelerate the execution of strategic projects',
            'service-detail-2-1': 'Organizational design | creation of new directions',
            'service-detail-2-2': 'Business Debottlenecking',
            'service-detail-2-3': 'HR support in personnel selection',
            'service-detail-2-4': 'JD | verification of organizational correspondences with reference models',
            'service-detail-2-5': 'HR support in personnel evaluation | parameterization',
            'service-detail-2-6': 'Identification of conflict areas | debottlenecking',
            'service-detail-2-7': 'HR support in defining Training plans and skills development plans',
            'service-detail-2-8': 'Proposal of a CHANGE MODEL',
            'strategic-section-1': 'Operational plans analysis',
            'strategic-section-2': 'Sales support',
            'strategic-section-3': 'MKT & sales support',
            'service-detail-3-1': 'INDUSTRIAL PLANS REVIEW',
            'service-detail-3-2': 'BUSINESS PLAN',
            'service-detail-3-3': 'STRATEGIC PLAN',
            'service-detail-3-4': 'MULTI-YEAR',
            'service-detail-3-5': 'FOCUS ON GROWTH',
            'service-detail-3-6': 'ORGANIC',
            'service-detail-3-7': 'CONTRACT REVIEW',
            'service-detail-3-8': 'SALES DEPT. SUPPORT',
            'service-detail-3-9': 'THE CUSTOMER\'S 360° VIEW',
            'service-detail-3-10': 'CUSTOMER 360°',
            'service-detail-3-11': 'TECHNICAL AMBASSADOR',
            'service-detail-3-12': 'MKT & SALES SUPPORT',
            'service-detail-3-13': 'SPECIAL PROJECTS',
            'service-detail-3-14': 'INTERNATIONALIZATION',
            'service-detail-3-15': 'TESTIMONY',
            'service-detail-3-16': 'PROJECT MANAGEMENT',
            'discover-more': 'Discover more',
            'service-detail-4-1': 'Partnership service | dedicated logistics integration for FMCG OPL',
            'service-detail-4-2': 'Order cycle management that guarantees service excellence',
            'service-detail-4-3': 'Complete integration of the order cycle up to last mile distribution logistics',
            'service-detail-4-4': 'Optimization of decision flows in various phases',
            'service-detail-4-5': 'Importance of logistics and commercial rules in contractual management',
            'service-detail-4-6': 'Chronological service indicator of delivery divided into various moments of the order cycle',
            'service-detail-4-7': 'Strategic partnerships with FMCG OPL',
            'service-detail-4-8': 'Constant monitoring of logistics performance',
            'service-detail-4-9': 'Implementation of quality control systems',
            'service-detail-4-10': 'Integrated supply chain management',
            'service-detail-4-11': 'Delivery time optimization',
            'iic-uae-title': 'Italian Certified Advisor IIC UAE',
            'iic-uae-services': 'Within the Italian Certified Advisor IIC UAE 2025 – 2026 project; the studio has been selected as a certified partner of the Italian Chamber of Commerce in the United Arab Emirates (UAE). Specifically, Eng. Daniel Marchisio has been certified ICA 547 for the province of Milan.<br><br>«In a historical moment marked by growing cooperation between Italy and UAE, strengthened by important bilateral agreements, the prospects for companies and professionals in this territory are broad, concrete and in strong expansion»<br><br>«The Emirates today represent one of the most dynamic and interconnected economies globally, with growing demand for qualified skills in legal, fiscal, corporate and strategic consulting sectors»<br><br>The studio is honored to participate in the initiative that values Italian excellence in the professional and consulting sector.',
            'principles-title': 'Our principles',
            'principles-subtitle': 'The fundamental values that guide our approach to strategic consulting and business development.',
            'principle-1-title': 'BIDIRECTIONAL SCOUTING',
            'principle-1-desc': 'FROM CHAMBER PORTAL<br>FROM DUEITO WEB<br>FROM UAE OPPORTUNITIES',
            'principle-2-title': 'INFO',
            'principle-2-desc': 'GENERAL<br>CLIENT PROJECT',
            'principle-3-title': 'TRAINING',
            'principle-3-desc': 'SPECIFIC<br>CLIENT PROJECT',
            'principle-4-title': 'SUPPORT',
            'principle-4-desc': 'SPECIFIC<br>GUIDE AND SUPPORT TO CLIENT PROJECT',
            'principles-deep-title': 'Insights into our principles',
            'principles-deep-subtitle': 'Discover in detail how we apply our principles in daily practice and in the internationalization path of MADE IN ITALY in the United Arab Emirates',
            'deep-principle-1-title': 'BIDIRECTIONAL SCOUTING',
            'deep-principle-1-desc': 'Our bidirectional scouting approach ensures targeted and personalized research of business opportunities.',
            'deep-principle-1-1': 'In-depth analysis of the Chamber of Commerce portal',
            'deep-principle-1-2': 'Active research through our web network',
            'deep-principle-1-3': 'Identification of specific opportunities in the UAE',
            'deep-principle-1-4': 'Automatic matching between demand and supply',
            'deep-principle-2-title': 'INFO',
            'deep-principle-2-desc': 'We provide detailed and personalized information for each client project, ensuring transparency and clarity.',
            'deep-principle-2-1': 'General information on the reference market',
            'deep-principle-2-2': 'Specific analysis of the client project',
            'deep-principle-2-3': 'Detailed reports on competitors',
            'deep-principle-2-4': 'Assessment of growth opportunities',
            'deep-principle-3-title': 'TRAINING',
            'deep-principle-3-desc': 'We offer specific and personalized training for each project, developing the skills necessary for success.',
            'deep-principle-3-1': 'Specific training for the client project',
            'deep-principle-3-2': 'Personalized workshops on UAE markets',
            'deep-principle-3-3': 'Training on local regulations',
            'deep-principle-3-4': 'Development of intercultural skills',
            'deep-principle-4-title': 'SUPPORT',
            'deep-principle-4-desc': 'Continuous and personalized support to guide the client through every phase of the project in the United Arab Emirates.',
            'deep-principle-4-1': 'Guide and specific support to the client project',
            'deep-principle-4-2': 'Assistance in the implementation phase',
            'deep-principle-4-3': 'Continuous monitoring of results',
            'deep-principle-4-4': 'Post-launch support and optimization',
            'sectors-title': 'Projects in various sectors',
            'sectors-subtitle': 'Our experience extends across different industrial sectors, offering personalized solutions and specialized skills for every business area. From food production to advanced logistics, we support companies in growth, process optimization and implementation of innovative strategies that generate concrete and measurable results.',
            'sector-food': 'Food & Beverages',
            'sector-wine': 'Wines & Liquors',
            'sector-data': 'Data Integrator',
            'sector-machinery': 'Industrial Machinery & Equipment',
            'sector-export': 'Export',
            'sector-dubai': 'Dubai',
            'sector-food-1': 'YEARS OF EXPERTISE IN THE SECTOR <b>20+</b>',
            'sector-food-2': 'DUE DILIGENCES <b>1+</b> /3',
            'sector-food-3': '<b>MARKET LEADER</b> BRANDS COMPANIES',
            'sector-food-4': '<b>A & M</b> RESTRUCTURING ENVIRONMENT',
            'sector-wine-1': 'YEARS OF EXPERTISE IN THE SECTOR <b>6+</b>',
            'sector-wine-2': 'GROWTH ENVIRONMENT <b>40%</b>',
            'sector-wine-3': '<b>TOP MARKET LEADER</b> BRAND COMPANY',
            'sector-wine-4': 'INTEGRATED LOGISTICS',
            'sector-data-1': 'ADR | ERP MANAGEMENT PROJECTS <b>4+</b>',
            'sector-data-2': '<b>ADR PORTSUNLIGHT SPECIFICATIONS</b>',
            'sector-data-3': 'NEW DELTA "V" OLIVE OIL COMPANY',
            'sector-data-4': '<b>ERP MERGER BESTFOOD COMPANY</b>',
            'sector-data-5': 'EUROPE FOOD COMPANIES SC REVIEW <b>5+</b>',
            'sector-machinery-1': 'ANALYSIS AND REVISION OF COMMERCIAL PLANS',
            'sector-machinery-2': 'COMMERCIAL SUPPORT PROJECTS <b>2 MIL +</b>',
            'sector-machinery-3': 'HEAD PILLAR EARLY EQUIPMENT MANAGEMENT <b>70 MIL +</b>',
            'sector-export-1': 'BERTOLLI USA | <b>CLUB WAREHOUSE</b>',
            'sector-export-2': 'SUPPLY CHAIN AREA <b>MENA 12 KT +</b>',
            'sector-export-3': 'GROWTH ENVIRONMENT WINES <b>50% +</b>',
            'sector-dubai-1': 'Reference point for Italian companies',
            'sector-dubai-2': 'UAE Chamber of Commerce interface',
            'sector-dubai-3': 'Connector with Emirati partners',
            'sector-dubai-4': 'UAE market expansion support',
            'contacts-title': 'Contact us for a personalized consultation',
            'form-name': 'Name',
            'form-surname': 'Surname',
            'form-phone': 'Phone number',
            'form-email': 'Email',
            'form-sector': 'Sector',
            'form-sector-placeholder': 'Select a sector',
            'form-message': 'Message',
            'form-message-placeholder': 'Describe your needs...',
            'form-submit': 'Send Request',
            'footer-title': 'DUE I TO BUSINESS S.R.L.S.',
            'footer-desc': 'Strategic consulting for organic growth of SMEs.',
            'footer-sede': 'Registered address',
            'footer-viale': 'Viale Papa Giovanni Paolo II, 29, Arconate (Milano), Lombardy',
            'footer-services': 'Services',
            'footer-contacts': 'Contacts',
            'footer-consultation': 'Consultation by appointment',
            'footer-copyright': '© 2025 DUE I TO BUSINESS S.R.L.S. | VAT 10792930967',
            'footer-privacy': 'Privacy Policy',
            'footer-cookie': 'Cookie Policy',
            'error-name-required': 'Name is required',
            'error-name-invalid': 'Name must contain only letters (2-30 characters)',
            'error-surname-required': 'Surname is required',
            'error-surname-invalid': 'Surname must contain only letters (2-30 characters)',
            'error-phone-required': 'Phone number is required',
            'error-phone-invalid': 'Please enter a valid phone number',
            'error-email-required': 'Email is required',
            'error-email-invalid': 'Please enter a valid email address',
            'error-sector-required': 'Please select a sector',
            'privacy-consent-start': 'By submitting this form, I declare that I have read the',
            'privacy-policy-link': 'Privacy Policy',
            'privacy-consent-end': 'and authorize the processing of my personal data to respond to my request.',
            'error-privacy-required': 'You must accept the Privacy Policy to submit the form',
            'nav-ownership': 'Ownership with a project model',
            'nav-experience': 'The experience of DOING',
            'nav-approach': 'Consolidated methodological approach',
            'nav-indicators': 'Indicators and measurement',
            'sector-1': 'Food & Beverages',
            'sector-2': 'Sparkling Wines',
            'sector-3': 'Industrial Machinery & Equipment',
            'sector-4': 'Automation Manufacturer',
            'sector-5': 'Logistics Integrations',
            'sector-6': 'Technical Commercial Broking',
        }
    };
    
    function changeLanguage(lang) {
        currentLanguage = lang;
        
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        
        document.documentElement.lang = lang;
        
        // Aggiorna bottoni desktop
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeDesktopBtn = document.querySelector(`.desktop-only [data-lang="${lang}"]`);
        if (activeDesktopBtn) {
            activeDesktopBtn.classList.add('active');
        }
        
        // Aggiorna selettore mobile
        const mobileTrigger = document.querySelector('.language-trigger');
        const mobileFlag = mobileTrigger ? mobileTrigger.querySelector('.flag-icon') : null;
        const mobileOptions = document.querySelectorAll('.language-option');
        
        if (mobileFlag) {
            const flagSrc = lang === 'it' ? 'https://flagcdn.com/w20/it.png' : 'https://flagcdn.com/w20/gb.png';
            mobileFlag.src = flagSrc;
            mobileTrigger.setAttribute('data-lang', lang);
        }
        
        mobileOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });
    }
    
    // Event listeners lingua desktop
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
    
    // Event listeners lingua mobile
    const mobileDropdown = document.querySelector('.language-dropdown');
    const mobileTrigger = document.querySelector('.language-trigger');
    const mobileOptions = document.querySelectorAll('.language-option');
    
    if (mobileTrigger) {
        mobileTrigger.addEventListener('click', function() {
            if (mobileDropdown) mobileDropdown.classList.toggle('active');
        });
    }
    
    mobileOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            if (mobileDropdown) mobileDropdown.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (mobileDropdown && !mobileDropdown.contains(e.target)) {
            mobileDropdown.classList.remove('active');
        }
    });
    
    // ========== VALIDAZIONE FORM ==========
    const contactForm = document.querySelector('.form');
    const formFields = {
        nome: document.getElementById('nome'),
        cognome: document.getElementById('cognome'),
        telefono: document.getElementById('telefono'),
        email: document.getElementById('email'),
        settore: document.getElementById('settore'),
        messaggio: document.getElementById('messaggio')
    };

    function showFieldError(field, message) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
        
        field.style.borderColor = '#e53e3e';
        field.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
    }

    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        field.style.borderColor = '#e2e8f0';
        field.style.boxShadow = 'none';
    }

    function sanitizeInput(input) {
        return input.trim().replace(/[<>]/g, '');
    }

    function validateField(fieldName) {
        const field = formFields[fieldName];
        if (!field) return true;
        
        const value = sanitizeInput(field.value);
        let isValid = true;
        let errorMessage = '';
        
        switch(fieldName) {
            case 'nome':
            case 'cognome':
                if (!value) {
                    errorMessage = translations[currentLanguage]['error-name-required'];
                    isValid = false;
                } else if (!/^[a-zA-Zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\s]{2,30}$/.test(value)) {
                    errorMessage = translations[currentLanguage]['error-name-invalid'];
                    isValid = false;
                }
                break;
                
            case 'telefono':
                if (!value) {
                    errorMessage = translations[currentLanguage]['error-phone-required'];
                    isValid = false;
                } else if (!/^[\+]?[0-9\s\-\(\)]{10,15}$/.test(value)) {
                    errorMessage = translations[currentLanguage]['error-phone-invalid'];
                    isValid = false;
                }
                break;
                
            case 'email':
                if (!value) {
                    errorMessage = translations[currentLanguage]['error-email-required'];
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errorMessage = translations[currentLanguage]['error-email-invalid'];
                    isValid = false;
                }
                break;
                
            case 'settore':
                if (!value) {
                    errorMessage = translations[currentLanguage]['error-sector-required'];
                    isValid = false;
                }
                break;
                
            case 'messaggio':
                if (value.length > 1000) {
                    errorMessage = 'Il messaggio non può superare i 1000 caratteri';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            clearFieldError(field);
        }
        
        return isValid;
    }

    function validateForm() {
        let isFormValid = true;
        
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }

    // Event listeners per validazione in tempo reale
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (!field) return;
        
        field.addEventListener('blur', () => {
            validateField(fieldName);
        });
        
        field.addEventListener('input', () => {
            clearFieldError(field);
        });
    });

    // Invio form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                const firstError = document.querySelector('.field-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            const submitBtn = contactForm.querySelector('.btn-primary');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Invio in corso...';
                submitBtn.disabled = true;
            }
        });
    }
    
    // ========== HERO SLIDER ==========
    const heroA = document.querySelector('.hero-bg');
    const heroB = document.querySelector('.hero-bg.next');
    
    const heroSlides = [
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3VsdGF0aW9ufGVufDB8fDB8fHww',
        'https://images.unsplash.com/photo-1726533765829-67f0313ab064?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1713857600361-146f62e4d90e?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhbGVzJTIwbW9uaXRvcmluZ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1600466888907-013366be7093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ];
    
    // Preload immagini
    heroSlides.forEach(src => { 
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
        heroA.classList.add('is-visible');
    }
    
    function crossfadeHero() {
        if (!heroA || !heroB) return;
        const nextIdx = (idx + 1) % heroSlides.length;
        
        const toShow = showingA ? heroB : heroA;
        const toHide = showingA ? heroA : heroB;
        
        setBg(toShow, heroSlides[nextIdx]);
        toShow.classList.add('is-visible');
        toHide.classList.remove('is-visible');
        
        showingA = !showingA;
        idx = nextIdx;
    }
    
    // Inizializza e avvia slider
    initHero();
    setInterval(crossfadeHero, 4000);
    
    // ========== BOTTONI HERO ==========
    const appointmentBtn = document.querySelector('.btn-primary');
    const servicesBtn = document.querySelector('.btn-secondary');
    
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', function() {
            const contattiSection = document.getElementById('contatti');
            if (contattiSection) {
                const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
                const targetPosition = contattiSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (servicesBtn) {
        servicesBtn.addEventListener('click', function() {
            const serviziSection = document.getElementById('servizi');
            if (serviziSection) {
                const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
                const targetPosition = serviziSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Click hero per cambio immagine manuale
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn') && !e.target.closest('.mobile-language-switcher')) {
                crossfadeHero();
            }
        });
    }
});

// ========== GALLERIA SLIDER ==========
const galleriaTrack = document.querySelector('.galleria-track');
const galleriaSlides = document.querySelectorAll('.galleria-slide');
const galleriaPrev = document.querySelector('.galleria-prev');
const galleriaNext = document.querySelector('.galleria-next');
const dotsDesktop = document.querySelectorAll('.galleria-dots-desktop .dot');
const dotsMobile = document.querySelectorAll('.galleria-dots-mobile .dot');

let currentSlide = 0;
const totalSlides = galleriaSlides.length;

function updateGalleria() {
    const isMobile = window.innerWidth <= 768;
    const slideWidth = isMobile ? 100 : 33.333;
    
    if (galleriaTrack) {
        galleriaTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    }
    
    // Aggiorna dots desktop
    dotsDesktop.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Aggiorna dots mobile
    dotsMobile.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    const isMobile = window.innerWidth <= 768;
    const maxSlide = isMobile ? totalSlides - 1 : 3;
    
    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    updateGalleria();
}

function prevSlide() {
    const isMobile = window.innerWidth <= 768;
    const maxSlide = isMobile ? totalSlides - 1 : 3;
    
    currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
    updateGalleria();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateGalleria();
}

// Event listeners
if (galleriaNext) {
    galleriaNext.addEventListener('click', nextSlide);
}

if (galleriaPrev) {
    galleriaPrev.addEventListener('click', prevSlide);
}

// Dots navigation desktop
dotsDesktop.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Dots navigation mobile
dotsMobile.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Auto-play
let autoPlayInterval;
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Pausa auto-play al hover
const galleriaContainer = document.querySelector('.galleria-container');
if (galleriaContainer) {
    galleriaContainer.addEventListener('mouseenter', stopAutoPlay);
    galleriaContainer.addEventListener('mouseleave', startAutoPlay);
}

// Inizializza
updateGalleria();
startAutoPlay();

// Responsive update
window.addEventListener('resize', () => {
    updateGalleria();
});

// ========== FADE UP ON SCROLL ==========
function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

function handleScrollAnimation() {
    // Elementi da animare
    const elementsToAnimate = document.querySelectorAll('.section h2, .section-intro, .section .two-col, .section .cards, .section .sectors-grid, .section .galleria-container, .section .contact-form-centered');
    
    elementsToAnimate.forEach(element => {
        if (isElementPartiallyInViewport(element)) {
            element.classList.add('visible');
        }
    });
    
    // Anima le singole card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isElementPartiallyInViewport(card)) {
            card.classList.add('visible');
        }
    });
    
    // Anima le sector cards
    const sectorCards = document.querySelectorAll('.sector-card');
    sectorCards.forEach(card => {
        if (isElementPartiallyInViewport(card)) {
            card.classList.add('visible');
        }
    });
    
    // Anima le immagini della galleria
    const gallerySlides = document.querySelectorAll('.galleria-slide');
    gallerySlides.forEach(slide => {
        if (isElementPartiallyInViewport(slide)) {
            slide.classList.add('visible');
        }
    });
}

// Event listener per lo scroll
window.addEventListener('scroll', handleScrollAnimation);

// Esegui una volta al caricamento per gli elementi già visibili
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(handleScrollAnimation, 100);
});

// ========== HIGHLIGHT ACTIVE SECTION ==========
function highlightActiveSection() {
    const sections = document.querySelectorAll('.section, .hero, .section-break-gray');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Se sei nella sezione galleria (ownership), evidenzia anche "chi siamo"
        if (currentSection === 'galleria' && href === '#chi-siamo') {
            link.classList.add('active');
        }
        // Se sei nella sezione break grigia, evidenzia anche "metodologia"
        else if (currentSection === 'metodologia' && href === '#metodologia') {
            link.classList.add('active');
        }
        // Altrimenti evidenzia normalmente
        else if (href === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);
document.addEventListener('DOMContentLoaded', highlightActiveSection);

// ========== ANIMAZIONE LISTA BREAK ==========
function animateBreakList() {
    const breakSection = document.querySelector('.section-break-gray');
    const breakItems = document.querySelectorAll('.break-item');
    
    if (!breakSection || !breakItems.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aggiungi la classe animate a tutti gli elementi
                breakItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 200); // Delay di 200ms tra ogni elemento
                });
                
                // Disconnetti l'observer dopo la prima animazione
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.3, // Trigger quando il 30% della sezione è visibile
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(breakSection);
}

// Inizializza l'animazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', animateBreakList);

// ========== BOTTONI "SCOPRI DI PIÙ" ==========
document.addEventListener('DOMContentLoaded', function() {
    const discoverBtns = document.querySelectorAll('.discover-btn');
    
    const targetSections = [
        'strategic-review-a',  // Sezione A -> Approfondimento A
        'strategic-review-b',  // Sezione B -> Approfondimento B  
        'strategic-review-c'   // Sezione C -> Approfondimento C
    ];
    
    discoverBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const targetSection = targetSections[index];
            const targetElement = document.getElementById(targetSection);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header') ? 
                    document.querySelector('.site-header').offsetHeight + 42 : 100;
                
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========== BOTTONE IIC UAE CONNECTOR ==========
document.addEventListener('DOMContentLoaded', function() {
    const uaeBtn = document.querySelector('.btn-accent');
    
    if (uaeBtn) {
        uaeBtn.addEventListener('click', function() {
            const targetElement = document.getElementById('iic-uae-connector');
            
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header') ? 
                    document.querySelector('.site-header').offsetHeight + 42 : 100;
                
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.error('Sezione IIC UAE CONNECTOR non trovata');
            }
        });
    }
});

// ========== CAROUSEL PRINCIPI ==========
document.addEventListener("DOMContentLoaded", function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = carouselSlides.length;
    
    function updateCarousel() {
        const translateX = -currentSlide * 25; // 25% per slide
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Aggiorna dots
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Aggiorna slides
        carouselSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
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
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dots navigation
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-play (opzionale)
    setInterval(nextSlide, 8000); // Cambia slide ogni 8 secondi
});

// Funzionalità dei puntini del carousel
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.carousel-dot');
    const track = document.querySelector('.carousel-track');
    let currentSlide = 0;
    const totalSlides = 4; // Numero totale di slide

    // Funzione per aggiornare i puntini
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Funzione per andare a una slide specifica
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 25; // 25% per ogni slide
        track.style.transform = `translateX(${translateX}%)`;
        updateDots();
    }

    // Event listener per i puntini
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Funzionalità delle frecce (se le hai)
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        });
    }
});

// Funzione per andare a una slide specifica del carousel
function goToCarouselSlide(slideIndex) {
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    
    if (carouselTrack && carouselDots.length > 0) {
        // Aggiorna la posizione del carousel
        const translateX = -slideIndex * 25; // 25% per ogni slide
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Aggiorna i dots
        carouselDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        // Scroll alla sezione del carousel
        const carouselSection = document.querySelector('.principles-carousel-section');
        if (carouselSection) {
            const headerHeight = document.querySelector('.site-header') ? 
                document.querySelector('.site-header').offsetHeight + 42 : 100;
            
            const targetPosition = carouselSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}
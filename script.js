document.addEventListener("DOMContentLoaded", function() {
    // ========== MENU MOBILE ==========
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav-list');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // ========== CHIUSURA AUTOMATICA MENU MOBILE ==========
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Chiudi il menu mobile quando si clicca su un link
            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }
        });
    });

    // ========== SCROLL BEHAVIOR ==========
    const topBanner = document.querySelector('.top-banner');
    const siteHeader = document.querySelector('.site-header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Solo su desktop (larghezza > 768px)
        if (window.innerWidth > 768) {
            if (scrollTop > 50) {
                // Nascondi banner completamente
                topBanner.style.transform = 'translateY(-100%)';
                siteHeader.classList.add('fixed');
            } else {
                // Mostra banner
                topBanner.style.transform = 'translateY(0)';
                siteHeader.classList.remove('fixed');
            }
        }
    });

    // ========== SMOOTH SCROLLING PER LINK INTERNI ==========
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se è un link interno (inizia con #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calcola la posizione considerando l'header fisso
                    const headerHeight = siteHeader.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Chiudi il menu mobile se è aperto
                    if (nav && nav.classList.contains('show')) {
                        nav.classList.remove('show');
                    }
                }
            }
        });
    });

    // ========== CARD SERVIZI CLICCABILI ==========
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card cliccata!'); // Debug
            
            // Scroll alla sezione contatti
            const contattiSection = document.getElementById('contatti');
            console.log('Sezione contatti trovata:', contattiSection); // Debug
            
            if (contattiSection) {
                const headerHeight = siteHeader ? siteHeader.offsetHeight : 100;
                const targetPosition = contattiSection.offsetTop - headerHeight;
                
                console.log('Scrolling a posizione:', targetPosition); // Debug
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Opzionale: evidenzia il campo settore dopo lo scroll
                setTimeout(() => {
                    const settoreField = document.getElementById('settore');
                    if (settoreField) {
                        settoreField.focus();
                        settoreField.style.borderColor = '#2c5aa0';
                        settoreField.style.boxShadow = '0 0 0 3px rgba(44, 90, 160, 0.1)';
                    }
                }, 1000);
            } else {
                console.error('Sezione contatti non trovata!');
            }
        });
    });

    // ========== TRADUZIONI ==========
    const translations = {
        it: {
            'hero-title': 'Consulenza Strategica per la Crescita Organica',
            'hero-description': 'Quick-wins operativi che diventano competenze permanenti per PMI di eccellenza',
            'btn-appointment': 'Richiedi Consulenza',
            'btn-services': 'I Nostri Servizi',
            'nav-home': 'home',
            'nav-about': 'chi siamo',
            'nav-services': 'servizi',
            'nav-methodology': 'metodologia',
            'nav-sectors': 'settori',
            'nav-contacts': 'contatti',
            'gallery-title': 'La scelta migliore per i vostri bisogni',
            'gallery-subtitle': 'Immergiti nella qualità dei nostri servizi attraverso progetti reali che illustrano come sviluppiamo competenze permanenti e creiamo valore duraturo per le aziende.',
            'break-title-1': 'Siamo esperti nella crescita delle PMI',
            'break-subtitle-1': 'La nostra esperienza si traduce in risultati concreti e misurabili',
            'break-btn-1': 'Richiedi una Consulenza',
            'about-title': 'Chi siamo',
            'about-quote': 'È il progresso a trasformare l\'azienda in un processo straordinario, ma sono la sua storia e le sue radici a sancirne l\'unicità.',
            'about-text': 'Nata nel 2019, Due i to Business si dedica alla consulenza strategica per PMI di eccellenza, specializzandosi in soluzioni operative di alta qualità attraverso metodologie consolidate.',
            'services-title': 'I nostri servizi',
            'services-subtitle': 'Soluzioni strategiche personalizzate per ottimizzare processi e sviluppare competenze manageriali.',
            'service-1-title': 'Check Up Operativo',
            'service-1-desc': 'Sviluppo del ruolo di COO e ottimizzazione dei processi operativi.',
            'service-2-title': 'HR Support & Mentoring',
            'service-2-desc': 'Supporto alle risorse umane e sviluppo della cultura aziendale.',
            'service-3-title': 'Review Strategica',
            'service-3-desc': 'Analisi e revisione di piani strategici e industriali.',
            'service-4-title': 'Partnership Logistica',
            'service-4-desc': 'Supporto specializzato per operazioni logistiche integrate.',
            'methodology-title': 'La nostra metodologia',
            'methodology-quote': 'Clinical Organisation Development (CODp) - Metodologia distintiva personalizzata per le PMI.',
            'methodology-values': 'Valori fondamentali',
            'value-1': 'Definizione di criteri e indicatori misurabili',
            'value-2': 'Promozione delle competenze manageriali',
            'value-3': 'Focus su concretezza vs opinioni',
            'value-4': 'Programmazione strategica con review permanente',
            'break-title-2': 'La nostra metodologia CODp in azione',
            'break-subtitle-2': 'Trasformiamo le teorie in risultati concreti attraverso un approccio scientifico e misurabile',
            'break-btn-2': 'Scopri i nostri Settori',
            'sectors-title': 'Settori di competenza',
            'sectors-subtitle': 'La nostra esperienza si estende attraverso diversi settori industriali, offrendo soluzioni personalizzate e competenze specializzate per ogni ambito di business. Dalla produzione alimentare alla logistica avanzata, supportiamo le aziende nella crescita, nell\'ottimizzazione dei processi e nell\'implementazione di strategie innovative che generano risultati concreti e misurabili.',
            'sector-1': 'Food & Beverages',
            'sector-2': 'Sparkling Wines',
            'sector-3': 'Industrial Machinery & Equipment',
            'sector-4': 'Automation Manufacturer',
            'sector-5': 'Logistics Integrations',
            'sector-6': 'Technical Commercial Broking',
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
            'footer-copyright': '© 2025 DUE I TO BUSINESS S.R.L.S. | P.IVA 12345678901',
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
            'error-privacy-required': 'È necessario accettare la Privacy Policy per inviare il form'
        },
        en: {
            'hero-title': 'Strategic Consulting for Organic Growth',
            'hero-description': 'Operational quick-wins that become permanent skills for excellence SMEs',
            'btn-appointment': 'Request Consultation',
            'btn-services': 'Our Services',
            'nav-home': 'home',
            'nav-about': 'about us',
            'nav-services': 'services',
            'nav-methodology': 'methodology',
            'nav-sectors': 'sectors',
            'nav-contacts': 'contact us',
            'gallery-title': 'The best choice for your needs',
            'gallery-subtitle': 'Immerse yourself in the quality of our services through real projects that illustrate how we develop permanent skills and create lasting value for companies.',
            'break-title-1': 'We are experts in SME growth',
            'break-subtitle-1': 'Our experience translates into concrete and measurable results',
            'break-btn-1': 'Request a Consultation',
            'about-title': 'About us',
            'about-quote': 'It is progress that transforms the company into an extraordinary process, but it is its history and roots that establish its uniqueness.',
            'about-text': 'Founded in 2019, Due i to Business is dedicated to strategic consulting for excellence SMEs, specializing in high-quality operational solutions through established methodologies.',
            'services-title': 'Our services',
            'services-subtitle': 'Personalized strategic solutions to optimize processes and develop managerial skills.',
            'service-1-title': 'Operational Check Up',
            'service-1-desc': 'COO role development and operational process optimization.',
            'service-2-title': 'HR Support & Mentoring',
            'service-2-desc': 'Human resources support and corporate culture development.',
            'service-3-title': 'Strategic Review',
            'service-3-desc': 'Analysis and revision of strategic and industrial plans.',
            'service-4-title': 'Logistics Partnership',
            'service-4-desc': 'Specialized support for integrated logistics operations.',
            'methodology-title': 'Our methodology',
            'methodology-quote': 'Clinical Organisation Development (CODp) - Distinctive methodology customized for SMEs.',
            'methodology-values': 'Fundamental values',
            'value-1': 'Definition of measurable criteria and indicators',
            'value-2': 'Promotion of managerial skills',
            'value-3': 'Focus on concreteness vs opinions',
            'value-4': 'Strategic programming with permanent review',
            'break-title-2': 'Our CODp methodology in action',
            'break-subtitle-2': 'We transform theories into concrete results through a scientific and measurable approach',
            'break-btn-2': 'Discover our Sectors',
            'sectors-title': 'Areas of expertise',
            'sectors-subtitle': 'Our experience extends across different industrial sectors, offering personalized solutions and specialized skills for every business area. From food production to advanced logistics, we support companies in growth, process optimization and implementation of innovative strategies that generate concrete and measurable results.',
            'sector-1': 'Food & Beverages',
            'sector-2': 'Sparkling Wines',
            'sector-3': 'Industrial Machinery & Equipment',
            'sector-4': 'Automation Manufacturer',
            'sector-5': 'Logistics Integrations',
            'sector-6': 'Technical Commercial Broking',
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
            'footer-viale': 'Viale Papa Giovanni Paolo II, 29, Arconate (Milano), Lombardia',
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
            'error-privacy-required': 'You must accept the Privacy Policy to submit the form'
        }
    };
    
    function changeLanguage(lang) {
        currentLanguage = lang; // Aggiorna la lingua corrente
        
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
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
        const mobileFlag = mobileTrigger.querySelector('.flag-icon');
        const mobileOptions = document.querySelectorAll('.language-option');
        
        const flagSrc = lang === 'it' ? 'https://flagcdn.com/w20/it.png' : 'https://flagcdn.com/w20/gb.png';
        mobileFlag.src = flagSrc;
        mobileTrigger.setAttribute('data-lang', lang);
        
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
    
    mobileTrigger.addEventListener('click', function() {
        mobileDropdown.classList.toggle('active');
    });
    
    mobileOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            mobileDropdown.classList.remove('active');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!mobileDropdown.contains(e.target)) {
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

    // Funzioni di validazione
    function validateName(name) {
        return /^[a-zA-Zàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ\s]{2,30}$/.test(name.trim());
    }

    function validatePhone(phone) {
        return /^[\+]?[0-9\s\-\(\)]{10,15}$/.test(phone.trim());
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function showFieldError(field, message) {
        // Rimuovi errori precedenti
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Aggiungi nuovo errore
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
        
        // Evidenzia il campo
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

    // funzione per sanitizzare l'input
    function sanitizeInput(input) {
        return input.trim().replace(/[<>]/g, '');
    }

    // AggiornO la validazione dei campi 
    function validateField(fieldName) {
        const field = formFields[fieldName];
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
                // Limita la lunghezza del messaggio
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
        
        // Validazione solo quando l'utente esce dal campo (blur)
        field.addEventListener('blur', () => {
            validateField(fieldName);
        });
        
        // Rimuovi errori quando l'utente inizia a digitare
        field.addEventListener('input', () => {
            clearFieldError(field);
        });
    });

    // invio form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validazione completa
            if (!validateForm()) {
                e.preventDefault(); // Blocca solo se ci sono errori
                // Scroll al primo campo con errore
                const firstError = document.querySelector('.field-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Se la validazione passa, mostra loading e lascia che Netlify gestisca l'invio
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Invio in corso...';
            submitBtn.disabled = true;
            
            // Il form verrà inviato automaticamente a thanks.html
        });
    }
    
    // ========== HERO SLIDER ==========
    const heroA = document.querySelector('.hero-bg');
    const heroB = document.querySelector('.hero-bg.next');
    
    const heroSlides = [
        'https://images.unsplash.com/photo-1638262052640-82e94d64664a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1713857600361-146f62e4d90e?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1686061592689-312bbfb5c055?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNhbGVzJTIwbW9uaXRvcmluZ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
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
            // Scroll alla sezione contatti
            const contattiSection = document.getElementById('contatti');
            if (contattiSection) {
                const headerHeight = siteHeader.offsetHeight;
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
            // Scroll alla sezione servizi
            const serviziSection = document.getElementById('servizi');
            if (serviziSection) {
                const headerHeight = siteHeader.offsetHeight;
                const targetPosition = serviziSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Click hero per cambio imagine manuale
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn') && !e.target.closest('.mobile-language-switcher')) {
            crossfadeHero();
        }
    });
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
    
    // Assicura che la trasformazione sia precisa
    galleriaTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
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

// Auto-play (opzionale)
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
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

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
function highlightActiveSection() {
    const sections = document.querySelectorAll('.section, .hero');
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
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

document.addEventListener('DOMContentLoaded', highlightActiveSection);
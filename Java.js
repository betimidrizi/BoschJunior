   // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.body.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
      if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    });
    
    // Enhanced Smooth Scrolling with Offset for Fixed Navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Animate with easing function
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        // Easing function for smooth animation
        function easeInOutQuad(t, b, c, d) {
          t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
      });
    });

    // Enhanced Navbar Scroll Effect with Animation
    let lastScrollPosition = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
      const currentScrollPosition = window.pageYOffset;
      
      // Navbar background and shadow effect
      if (currentScrollPosition > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        navbar.style.transition = 'all 0.3s ease-out';
      } else {
        navbar.style.boxShadow = 'none';
      }
      
      // Navbar hide/show on scroll direction
      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease-out';
      } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollPosition = currentScrollPosition;
    });
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });


    // Language Switching Functionality
document.querySelectorAll('[data-lang]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const lang = this.getAttribute('data-lang');
    setLanguage(lang);
  });
});

function setLanguage(lang) {
  // Update active state in dropdown
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang') === lang);
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Save preference
  localStorage.setItem('preferredLanguage', lang);
  
  // Load translations
  loadTranslations(lang);
}

function loadTranslations(lang) {
  // Here you would typically fetch translations from a JSON file
  // For this example, we'll use an object with translations
  
  const translations = {
    sq: {
      // Navbar
      "home": "Kryefaqja",
      "services": "Shërbimet",
      "about": "Rreth Nesh",
      "contact": "Kontakt",
      "location": "Lokacioni",
      // Hero Section
      "hero_title": "Shërbime Profesionale për Automjetet Tuaja",
      "hero_text": "Ne ofrojmë zgjidhjet më të mira për riparimin dhe mirëmbajtjen e automjeteve tuaja. Frenat, gomat, vaji dhe shumë më tepër.",
      "contact_us": "Na Kontaktoni",
      // Services Section
      "our_services": "SHËRBIMET TONA",
      "professional_solutions": "Zgjidhje Profesionale për Automjetin Tuaj",
      "services_description": "Ofrojmë shërbime të specializuara me teknologji të avancuar dhe pjesë këmbimi të cilësisë së lartë",
      // Service Card 1
      "electronic_repairs_title": "Riparime Elektronike",
      "electronic_repairs_desc": "Diagnostikim dhe riparime të sistemeve elektronike dhe elektrike të automjeteve me pajisje speciale.",
      "electronic_feature1": "Sistemet e kompjuterizimit",
      "electronic_feature2": "Senzorët dhe instrumentet",
      "electronic_feature3": "Ndërrimin dhe riparimin e instalimit",
      // Service Card 3
      "starter_service_title": "Servisim Starteri",
      "starter_service_desc": "Diagnostikim, riparim dhe zëvendësim i sistemit të startimit për performancë optimale.",
      "starter_feature1": "Testim dhe diagnostikim",
      "starter_feature2": "Riparim i starterit",
      "starter_feature3": "Zëvendësim i brushave",
      // Service Card 5
      "alternator_service_title": "Servisim Alternatori",
      "alternator_service_desc": "Diagnostikim, riparim dhe mirëmbajtje e alternatorit për sistem elektrik optimal.",
      "alternator_feature1": "Matje e tensionit të daljes",
      "alternator_feature2": "Ndërrim i rrotullave dhe komponentëve të dëmtuar",
      "alternator_feature3": "Riparim ose zëvendësim i mbështjelljeve"
    },
    mk: {
      // Navbar
      "home": "Почетна",
      "services": "Услуги",
      "about": "За Нас",
      "contact": "Контакт",
      "location": "Локација",
      // Hero Section
      "hero_title": "Професионални услуги за вашите возила",
      "hero_text": "Ние нудиме најдобри решенија за поправка и одржување на вашите возила. Кочници, гуми, масло и многу повеќе.",
      "contact_us": "Контактирајте не",
      // Services Section
      "our_services": "НАШИТЕ УСЛУГИ",
      "professional_solutions": "Професионални решенија за вашето возило",
      "services_description": "Нудиме специјализирани услуги со напредна технологија и делови од висок квалитет",
      // Service Card 1
      "electronic_repairs_title": "Електронски поправки",
      "electronic_repairs_desc": "Дијагностика и поправка на електронски и електрични системи на возила со специјална опрема.",
      "electronic_feature1": "Компјутеризирани системи",
      "electronic_feature2": "Сензори и инструменти",
      "electronic_feature3": "Менување и репарација на инсталација",
      // Service Card 3
      "starter_service_title": "Сервисирање на стартер",
      "starter_service_desc": "Дијагностика, поправка и замена на системот за стартување за оптимални перформанси.",
      "starter_feature1": "Тестирање и дијагностика",
      "starter_feature2": "Поправка на стартер",
      "starter_feature3": "Менување на четконосач",
      // Service Card 5
      "alternator_service_title": "Сервисирање на алтернатор",
      "alternator_service_desc": "Дијагностика, поправка и одржување на алтернаторот за оптимален електричен систем.",
      "alternator_feature1": "Мерење на излезен напон",
      "alternator_feature2": "Замена на оштетени ролери и компоненти",
      "alternator_feature3": "Поправка или замена на калеми"
    }
  };
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang][key] || translations['sq'][key];
  });
}

// Initialize language
const preferredLanguage = localStorage.getItem('preferredLanguage') || 'sq';
setLanguage(preferredLanguage);
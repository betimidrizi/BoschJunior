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
      // Service Card 2
      "electrical_diagnostics_title": "Diagnostikim Elektrik",
      "electrical_diagnostics_desc": "Zbulim të saktë të problemeve elektronike me skanerë profesionale Bosch.",
      "electrical_feature1": "Diagnostikim kompjuterik",
      "electrical_feature2": "Sistemi i ndriçimit",
      "electrical_feature3": "Kontrollë sensorësh",
      // Service Card 3
      "starter_service_title": "Servisim Starteri",
      "starter_service_desc": "Diagnostikim, riparim dhe zëvendësim i sistemit të startimit për performancë optimale.",
      "starter_feature1": "Testim dhe diagnostikim",
      "starter_feature2": "Riparim i starterit",
      "starter_feature3": "Zëvendësim i brushave",
      // Service Card 4
      "periodic_maintenance_title": "Mirëmbajtje Periodike",
      "periodic_maintenance_desc": "Programe personalizuar sipas rekomandimeve të prodhuesit.",
      "maintenance_feature1": "Inspektime teknike",
      "maintenance_feature2": "Zëvendësime parandaluese",
      "maintenance_feature3": "Raportet e gjendjes",
      // Service Card 5
      "alternator_service_title": "Servisim Alternatori",
      "alternator_service_desc": "Diagnostikim, riparim dhe mirëmbajtje e alternatorit për sistem elektrik optimal.",
      "alternator_feature1": "Matje e tensionit të daljes",
      "alternator_feature2": "Ndërrim i rrotullave dhe komponentëve të dëmtuar",
      "alternator_feature3": "Riparim ose zëvendësim i mbështjelljeve",
      // Service Card 6
      "battery_service_title": "Bateri dhe Ngarkim",
      "battery_service_desc": "Zgjidhje komplete për sistemin elektrik të automjetit.",
      "battery_feature1": "Testim gjendje baterie",
      "battery_feature2": "Zëvendësim profesional",
      "battery_feature3": "Sistemet e ngarkimit",
      // CTA Section
      "cta_question": "Keni nevojë për ndihmë me automjetin tuaj?",
      "cta_offer": "Rezervoni një termin tani dhe përfitoni inspektim!",
      "cta_button": "Rezervo Tani",
      // Left column Gallery items
      "gallery_caption1": "Punëtoria jonë e pajisur me teknologji moderne",
      "gallery_caption2": "Këtu çdo detaj kontrollohet me kujdes",
      // Right column Gallery items
      "gallery_caption3": "Punë e organizuar, rezultate të shpejta",
      "gallery_caption4": "Ambient i pastër dhe i sigurt për çdo automjet",
      "gallery_caption5": "Mikpritje me përkushtim, shërbim me respekt",
      // Content column
      "about_badge": "RRETH NESH",
      "about_title": "Bosch Junior - Ekspertë në Shërbimet Automobilistike",
      "about_highlight": "Biznes familjar me traditë 20-vjeçare në shërbimet për automjete",
      "about_description": "Me një histori të pasur dhe pasion për automjetet, ne ofrojmë shërbime të cilësisë së lartë me përdorimin e teknologjisë më të fundit dhe pjesëve origjinale.",
      "feature1_title": "Teknikë të Certifikuar",
      "feature1_desc": "Ekipi ynë përmban specialistë të trajnuar nga Bosch",
      "feature2_title": "Pajisje Moderne",
      "feature2_desc": "Teknologji e avancuar për diagnostikim të saktë",
      "feature3_title": "Garancion Cilësie",
      "feature3_desc": "Garantojmë çdo shërbim që ofrojmë",
      // Stats
      "stat1": "Vjet Përvojë",
      "stat2": "Klientë të Kënaqur",
      "stat3": "Ndihmë Në Rrugë",
      "gallery_button": "Shiko Galerinë",
      "contact_button": "Na Kontaktoni",
      // Contact Section
      "contact_title": "Na Gjeni",
      "contact_subtitle": "Vizitoni punëtorinë tonë ose na kontaktoni direkt",
      // Contact Card 1: Location
      "location_title": "Lokacioni",
      "address": "Metodija Andonov Chento 105B, Shkup",
      "view_map": "Shiko në Hartë",
      // Contact Card 2: Phone
      "phone_title": "Telefoni",
      "call_now": "Thirr Tani",
      // Contact Card 3: Hours
      "hours_title": "Orari i Punës",
      "weekdays": "E Hënë - E Premte",
      "saturday": "E Shtunë",
      "sunday": "E Dielë",
      "closed": "Mbyllur",
      "contact_us": "Na Kontaktoni",
      // Social Media Section
      "follow_us": "Na Ndiqni në Rrjetet Sociale"
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
      // Service Card 2
      "electrical_diagnostics_title": "Електрична дијагностика",
      "electrical_diagnostics_desc": "Прецизно откривање на електронски проблеми со професионални Bosch скенери.",
      "electrical_feature1": "Компјутерска дијагностика",
      "electrical_feature2": "Систем за осветлување",
      "electrical_feature3": "Контрола на сензори",
      // Service Card 3
      "starter_service_title": "Сервисирање на стартер",
      "starter_service_desc": "Дијагностика, поправка и замена на системот за стартување за оптимални перформанси.",
      "starter_feature1": "Тестирање и дијагностика",
      "starter_feature2": "Поправка на стартер",
      "starter_feature3": "Менување на четконосач",
      // Service Card 4
      "periodic_maintenance_title": "Периодично одржување",
      "periodic_maintenance_desc": "Персонализирани програми според препораките на производителот.",
      "maintenance_feature1": "Технички инспекции",
      "maintenance_feature2": "Превентивни замени",
      "maintenance_feature3": "Извештаи за состојба",
      // Service Card 5
      "alternator_service_title": "Сервисирање на алтернатор",
      "alternator_service_desc": "Дијагностика, поправка и одржување на алтернаторот за оптимален електричен систем.",
      "alternator_feature1": "Мерење на излезен напон",
      "alternator_feature2": "Замена на оштетени ролери и компоненти",
      "alternator_feature3": "Поправка или замена на калеми",
      // Service Card 6
      "battery_service_title": "Батерии и полнење",
      "battery_service_desc": "Комплетни решенија за електричниот систем на возилото.",
      "battery_feature1": "Тестирање на состојба на батерија",
      "battery_feature2": "Професионална замена",
      "battery_feature3": "Системи за полнење",
      // CTA Section
      "cta_question": "Дали ви треба помош за вашето возило?",
      "cta_offer": "Резервирајте термин сега и добијте бесплатен преглед!",
      "cta_button": "Резервирај сега",
      // About Section 
      // Left column Gallery items
      "gallery_caption1": "Нашата работилница опремена со модерна технологија",
      "gallery_caption2": "Овде секој детал се проверува внимателно",
      // Right column Gallery items
      "gallery_caption3": "Организирана работа, брзи резултати",
      "gallery_caption4": "Чиста и безбедна средина за секое возило",
      "gallery_caption5": "Посветен прием, услуга со почит",
      // Content column
      "about_badge": "ЗА НАС",
      "about_title": "Bosch Junior - Експерти во Автомобилските Услуги",
      // ... existing translations ...
      "about_highlight": "Семеен бизнис со 20-годишна традиција во автомобилските услуги",
      "about_description": "Со богата историја и страст кон автомобилите, нудиме услуги од висок квалитет со користење на најновата технологија и оригинални делови.",
      "feature1_title": "Сертифицирани Техничари",
      "feature1_desc": "Нашиот тим содржи специјалисти обучени од Bosch",
      "feature2_title": "Модерна Опрема",
      "feature2_desc": "Напредна технологија за прецизна дијагностика",
      "feature3_title": "Гаранција за Квалитет",
      "feature3_desc": "Гарантираме секоја услуга што ја нудиме",
      // Stats
      "stat1": "Години Искуство",
      "stat2": "Задоволни Клиенти",
      "stat3": "Помош на Пат",
      "gallery_button": "Види Галерија",
      "contact_button": "Контактирај не",
      // Contact Section
      "contact_title": "Најдете не",
      "contact_subtitle": "Посетете ја нашата работилница или контактирајте не директно",
      // Contact Card 1: Location
      "location_title": "Локација",
      "address": "Методија Андонов Ченто 105Б, Скопје",
      "view_map": "Погледнете на мапа",
      // Contact Card 2: Phone
      "phone_title": "Телефон",
      "call_now": "Јавете се сега",
      // Contact Card 3: Hours
      "hours_title": "Работно време",
      "weekdays": "Понеделник - Петок",
      "saturday": "Сабота",
      "sunday": "Недела",
      "closed": "Затворено",
      "contact_us": "Контактирајте не",
      // Social Media Section
      "follow_us": "Следете не на социјални мрежи"
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
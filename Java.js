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
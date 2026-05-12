/* ============================================
   V&H Consultores — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    const langCode = langToggle.querySelector('.lang-code');
    const langFlag = langToggle.querySelector('.lang-flag');
    let currentLang = 'pt';

    function updateLanguage(lang) {
        currentLang = lang;

        // Update toggle button
        if (lang === 'pt') {
            langCode.textContent = 'PT';
            langFlag.textContent = '🇲🇿';
            document.documentElement.lang = 'pt';
        } else {
            langCode.textContent = 'EN';
            langFlag.textContent = '🇬🇧';
            document.documentElement.lang = 'en';
        }

        // Update all elements with data-pt and data-en
        const elements = document.querySelectorAll('[data-pt][data-en]');
        elements.forEach(el => {
            // Fade out
            el.style.opacity = '0.7';
            el.style.transition = 'opacity 0.2s ease';

            setTimeout(() => {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = el.getAttribute('data-' + lang);
                } else {
                    el.textContent = el.getAttribute('data-' + lang);
                }
                // Fade in
                el.style.opacity = '1';
            }, 200);
        });

        // Save preference
        localStorage.setItem('vh-lang', lang);
    }

    // Load saved preference
    const savedLang = localStorage.getItem('vh-lang');
    if (savedLang && savedLang !== currentLang) {
        updateLanguage(savedLang);
    }

    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        updateLanguage(newLang);
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-header, .about-grid, .expertise-card, .timeline-item, .team-grid, .contact-grid, .footer-grid');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Stagger animation for expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    expertiseCards.forEach(card => {
        card.classList.add('reveal');
        cardObserver.observe(card);
    });

    // Stagger animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 150);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.classList.add('reveal');
        timelineObserver.observe(item);
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinkElements.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree handles the submission
            // This is just for UX feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.disabled = true;
            btn.textContent = currentLang === 'pt' ? 'A enviar...' : 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = originalText;
                btn.style.opacity = '1';
            }, 3000);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        });
    }

    console.log('V&H Consultores website loaded successfully');
});

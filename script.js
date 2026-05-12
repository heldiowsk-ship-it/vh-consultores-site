/* ========================================
   V&H Consultores - Script
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Mobile Menu
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ========================================
    // Language Toggle
    // ========================================
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'pt';

    // Check saved preference
    const savedLang = localStorage.getItem('vh-lang');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }

    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        updateLanguage(currentLang);
        localStorage.setItem('vh-lang', currentLang);
    });

    function updateLanguage(lang) {
        const flag = lang === 'pt' ? '🇲🇿' : '🇬🇧';
        const code = lang === 'pt' ? 'PT' : 'EN';
        langToggle.querySelector('.lang-flag').textContent = flag;
        langToggle.querySelector('.lang-code').textContent = code;

        document.querySelectorAll('[data-pt][data-en]').forEach(el => {
            el.textContent = el.getAttribute('data-' + lang);
        });

        // Update placeholders
        const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
        inputs.forEach(input => {
            const pt = input.getAttribute('data-pt-placeholder') || input.placeholder;
            const en = input.getAttribute('data-en-placeholder') || input.placeholder;
            if (!input.getAttribute('data-pt-placeholder')) {
                input.setAttribute('data-pt-placeholder', pt);
                input.setAttribute('data-en-placeholder', en);
            }
            input.placeholder = lang === 'pt' ? input.getAttribute('data-pt-placeholder') : input.getAttribute('data-en-placeholder');
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // Active Navigation Link
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.service-card, .timeline-item, .team-card, .gallery-item, .contact-card, .value-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });

    // ========================================
    // Gallery Filter
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // Lightbox
    // ========================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;
    let visibleImages = [];

    function updateVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(item => 
            item.style.display !== 'none'
        );
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            updateVisibleImages();
            currentImageIndex = visibleImages.indexOf(this);
            openLightbox(this);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage(index) {
        if (index < 0) index = visibleImages.length - 1;
        if (index >= visibleImages.length) index = 0;

        currentImageIndex = index;
        const item = visibleImages[index];
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title').textContent;

        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = title;
            lightboxImg.style.opacity = '1';
        }, 200);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
    });

    // ========================================
    // Smooth Scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Form handling
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree handles the submission
            // This is just for UX feedback
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = currentLang === 'pt' ? 'A enviar...' : 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }

});

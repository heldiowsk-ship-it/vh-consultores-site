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



/* ============================================
   GALLERY & LIGHTBOX
   ============================================ */

const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGalleryIndex = 0;
let visibleItems = [];

// Filter functionality
galleryFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        const category = this.getAttribute('data-filter');

        galleryFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');

        galleryItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox functionality
function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

function openLightbox(item) {
    updateVisibleItems();
    currentGalleryIndex = visibleItems.indexOf(item);

    const img = item.querySelector('img');
    const caption = item.querySelector('p');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrev() {
    currentGalleryIndex = (currentGalleryIndex - 1 + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentGalleryIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('p');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
}

function showNext() {
    currentGalleryIndex = (currentGalleryIndex + 1) % visibleItems.length;
    const item = visibleItems[currentGalleryIndex];
    const img = item.querySelector('img');
    const caption = item.querySelector('p');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

/* ============================================
   NAVBAR ACTIVE LINK UPDATE (add mediateca)
   ============================================ */

// Update sections selector to include mediateca
const allSections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

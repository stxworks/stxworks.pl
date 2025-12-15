/* ========================================
   STX WORKS - INTERACTIVE JAVASCRIPT
   Multi-Page Portfolio
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initLoader();
    initNavigation();
    initPageTransitions();
    initTypingEffect();
    initScrollReveal();
    initStaggerReveal();
    initCounterAnimation();
    initMagneticButtons();
    initTiltCards();
    initMouseTrail();
    initTextScramble();
    initFAQ();
    initFormValidation();
    initFormPreselection();
    initRandomCode();
    initLightbox();
});

/* ========================================
   LOADER
   ======================================== */

function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    document.body.classList.add('loading');

    // Check if user already visited in this session
    const hasVisited = sessionStorage.getItem('stxworks_visited');
    const loaderDelay = hasVisited ? 0 : 800;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('loading');
            // Mark as visited for this session
            sessionStorage.setItem('stxworks_visited', 'true');
        }, loaderDelay);
    });
}

/* ========================================
   NAVIGATION
   ======================================== */

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for same-page links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ========================================
   PAGE TRANSITIONS (DISABLED)
   ======================================== */

function initPageTransitions() {
    // Page transitions disabled - links work normally
    return;
}

/* ========================================
   TYPING EFFECT
   ======================================== */

function initTypingEffect() {
    // Original typing effect for #typing element
    const typingElement = document.getElementById('typing');
    if (typingElement) {
        const phrases = [
            'Tworzę strony internetowe',
            'Buduję aplikacje React',
            'Projektuję UI/UX',
            'Koduję z pasją',
            'STX Works'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 2000);
    }

    // Hero title typing effect for #typing-text element
    const heroTypingElement = document.getElementById('typing-text');
    if (heroTypingElement) {
        const heroTexts = [
            'dla małych i lokalnych firm.',
            'które działają na telefonie.',
            'z nowoczesnym designem.',
            'bez ukrytych kosztów.',
            'gotowe w kilka dni.'
        ];

        let currentIndex = 0;
        let charIdx = heroTexts[0].length;
        let isTypingDeleting = false;
        let heroTypingSpeed = 80;

        function heroType() {
            const currentText = heroTexts[currentIndex];

            if (isTypingDeleting) {
                heroTypingElement.textContent = currentText.substring(0, charIdx - 1);
                charIdx--;
                heroTypingSpeed = 30;
            } else {
                heroTypingElement.textContent = currentText.substring(0, charIdx + 1);
                charIdx++;
                heroTypingSpeed = 60;
            }

            if (!isTypingDeleting && charIdx === currentText.length) {
                isTypingDeleting = true;
                heroTypingSpeed = 3000; // Pause before deleting
            } else if (isTypingDeleting && charIdx === 0) {
                isTypingDeleting = false;
                currentIndex = (currentIndex + 1) % heroTexts.length;
                heroTypingSpeed = 300; // Pause before typing next
            }

            setTimeout(heroType, heroTypingSpeed);
        }

        // Start after initial load animation
        setTimeout(heroType, 4000);
    }
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-fade');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/* ========================================
   STAGGERED REVEAL
   ======================================== */

function initStaggerReveal() {
    const staggerElements = document.querySelectorAll('.reveal-stagger');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Group by parent to stagger within same container
    const parents = new Map();
    staggerElements.forEach(el => {
        const parent = el.parentElement;
        if (!parents.has(parent)) {
            parents.set(parent, []);
        }
        parents.get(parent).push(el);
    });

    parents.forEach((children) => {
        children.forEach((child, index) => {
            const childObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('revealed');
                        }, index * 100);
                        childObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            childObserver.observe(child);
        });
    });
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */

function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');

    if (window.innerWidth < 768) return;

    magneticElements.forEach(el => {
        const strength = parseInt(el.dataset.strength) || 20;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/* ========================================
   TILT CARDS (3D Parallax)
   ======================================== */

function initTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    if (window.innerWidth < 768) return;

    tiltCards.forEach(card => {
        // Skip pricing cards - tilt effect makes buttons hard to click
        if (card.classList.contains('pricing-card') || card.classList.contains('guarantee-box')) {
            return;
        }

        const maxTilt = parseInt(card.dataset.tiltMax) || 10;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ========================================
   MOUSE TRAIL
   ======================================== */

function initMouseTrail() {
    const canvas = document.getElementById('mouse-trail');
    if (!canvas || window.innerWidth < 768) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;

        // Add new particle
        if (particles.length < 50) {
            particles.push({
                x: mouseX,
                y: mouseY,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                life: 1,
                color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
            });
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;

            if (p.life <= 0) {
                particles.splice(index, 1);
                return;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life * 0.5;
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ========================================
   TEXT SCRAMBLE EFFECT
   ======================================== */

function initTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const chars = '!<>-_\\/[]{}-=+*^?#________';

    scrambleElements.forEach(el => {
        const originalText = el.dataset.text || el.textContent;
        let isAnimating = false;

        el.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            isAnimating = true;
            scrambleText(el, originalText, chars, () => {
                isAnimating = false;
            });
        });
    });
}

function scrambleText(element, finalText, chars, callback) {
    let iteration = 0;
    const maxIterations = finalText.length * 3;

    const interval = setInterval(() => {
        element.textContent = finalText
            .split('')
            .map((char, index) => {
                if (index < iteration / 3) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        iteration++;

        if (iteration >= maxIterations) {
            clearInterval(interval);
            element.textContent = finalText;
            if (callback) callback();
        }
    }, 30);
}

/* ========================================
   FAQ ACCORDION
   ======================================== */

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ========================================
   FORM VALIDATION
   ======================================== */

function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.parentElement.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm(form);
        }
    });
}

function validateField(input) {
    const parent = input.parentElement;
    const errorEl = parent.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        errorMessage = 'To pole jest wymagane';
    }

    // Email validation
    if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'Podaj prawidłowy adres email';
        }
    }

    // Update UI
    if (isValid) {
        parent.classList.remove('error');
    } else {
        parent.classList.add('error');
        if (errorEl) {
            errorEl.textContent = errorMessage;
        }
    }

    return isValid;
}

function submitForm(form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // Honeypot anti-spam check
    const honeypot = form.querySelector('#website');
    if (honeypot && honeypot.value) {
        // Bot detected - silently fail
        console.log('Spam detected (honeypot triggered)');
        submitBtn.innerHTML = '<span>✓ Wysłano!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
        return;
    }

    // Animate button
    submitBtn.innerHTML = '<span>Wysyłanie...</span>';
    submitBtn.disabled = true;

    // Prepare EmailJS template params
    const subjectSelect = form.querySelector('#subject');
    const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;

    const templateParams = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        subject: subjectText,
        budget: form.querySelector('#budget').value || 'Nie podano',
        message: form.querySelector('#message').value,
        time: new Date().toLocaleString('pl-PL')
    };

    // Auto-reply template params (for confirmation to user)
    const autoReplyParams = {
        from_name: form.querySelector('#name').value,
        from_email: form.querySelector('#email').value,
        subject: subjectText
    };

    // Send both emails via EmailJS
    Promise.all([
        emailjs.send('service_cbcujjg', 'template_rlwin7j', templateParams),
        emailjs.send('service_cbcujjg', 'template_jqc1jyo', autoReplyParams)
    ])
        .then(function (responses) {
            console.log('EmailJS SUCCESS! Main:', responses[0].status, 'Auto-reply:', responses[1].status);
            submitBtn.innerHTML = '<span>✓ Wysłano!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);
        })
        .catch(function (error) {
            console.log('EmailJS FAILED...', error);
            submitBtn.innerHTML = '<span>✗ Błąd wysyłania</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

            // Reset after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        });
}
/* ========================================
   FORM PRESELECTION FROM URL
   ======================================== */

function initFormPreselection() {
    const form = document.getElementById('contact-form');
    const subjectSelect = document.getElementById('subject');
    if (!form || !subjectSelect) return;

    // Get URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const usluga = urlParams.get('usluga');

    if (usluga) {
        // Find the matching option and select it
        const options = subjectSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value === usluga) {
                option.selected = true;
            }
        });

        // Scroll to form smoothly after a short delay
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }
}

/* ========================================
   PROJECTS FILTER
   ======================================== */

function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card-full');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projects.forEach((project, index) => {
                const category = project.dataset.category;

                // Reset styles
                project.style.transition = 'all 0.4s ease';

                if (filter === 'all' || category === filter) {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';

                    setTimeout(() => {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'scale(1)';
                        }, index * 50);
                    }, 200);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 400);
                }
            });
        });
    });
}

// Initialize filter if on projects page
if (document.querySelector('.filter-btn')) {
    initProjectsFilter();
}

/* ========================================
   SMOOTH SCROLL POLYFILL
   ======================================== */

// For browsers that don't support smooth scroll
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ========================================
   RANDOM CODE SNIPPETS
   ======================================== */

function initRandomCode() {
    const codeElement = document.getElementById('random-code');
    if (!codeElement) return;

    const codeSnippets = [
        // Wariant 1 - Oryginalny
        `<span class="code-keyword">const</span> <span class="code-variable">stxWorks</span> = {
  <span class="code-property">oferta</span>: <span class="code-string">"Strony dla firm"</span>,
  <span class="code-property">cena</span>: <span class="code-string">"od 399 zł"</span>,
  <span class="code-property">realizacja</span>: <span class="code-string">"kilka dni"</span>,
  <span class="code-property">mobilna</span>: <span class="code-keyword">true</span>,
  <span class="code-function">działam</span>: () => <span class="code-string">"✅ gotowe"</span>
};`,

        // Wariant 2 - Funkcja
        `<span class="code-keyword">function</span> <span class="code-function">zbudujStronę</span>(firma) {
  <span class="code-keyword">return</span> {
    <span class="code-property">design</span>: <span class="code-string">"nowoczesny"</span>,
    <span class="code-property">mobile</span>: <span class="code-keyword">true</span>,
    <span class="code-property">seo</span>: <span class="code-keyword">true</span>,
    <span class="code-property">status</span>: <span class="code-string">"🚀 online"</span>
  };
}`,

        // Wariant 3 - Array
        `<span class="code-keyword">const</span> <span class="code-variable">usługi</span> = [
  <span class="code-string">"📱 Strony responsywne"</span>,
  <span class="code-string">"🎨 Nowoczesny design"</span>,
  <span class="code-string">"⚡ Szybka realizacja"</span>,
  <span class="code-string">"💰 Przystępne ceny"</span>
];
<span class="code-comment">// Wszystko w jednym miejscu ✨</span>`,

        // Wariant 4 - Promise
        `<span class="code-keyword">async function</span> <span class="code-function">zamówStronę</span>() {
  <span class="code-keyword">const</span> <span class="code-variable">projekt</span> = <span class="code-keyword">await</span> stxWorks
    .<span class="code-function">konsultacja</span>()
    .<span class="code-function">design</span>()
    .<span class="code-function">kodowanie</span>();
  <span class="code-keyword">return</span> <span class="code-string">"✅ Strona gotowa!"</span>;
}`,

        // Wariant 5 - Class
        `<span class="code-keyword">class</span> <span class="code-variable">Projekt</span> {
  <span class="code-property">klient</span> = <span class="code-string">"Twoja firma"</span>;
  <span class="code-property">budżet</span> = <span class="code-string">"od 399 zł"</span>;
  <span class="code-property">czas</span> = <span class="code-string">"2-5 dni"</span>;
  
  <span class="code-function">start</span>() { <span class="code-keyword">return</span> <span class="code-string">"🎯 Zaczynamy!"</span> }
}`
    ];

    // Losowo wybierz jeden wariant
    const randomIndex = Math.floor(Math.random() * codeSnippets.length);
    codeElement.innerHTML = codeSnippets[randomIndex];
}

/* ========================================
   LIGHTBOX GALLERY
   ======================================== */

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const galleryTriggers = document.querySelectorAll('[data-gallery]');

    if (!lightbox || !lightboxImage || galleryTriggers.length === 0) return;

    // Gallery configuration - 7 images per gallery: preview + 1-6
    const galleries = {
        slonecznydotyk: {
            name: 'sloneczny-dotyk',
            prefix: 'assets/slonecznydotyk',
            count: 7 // preview + 6 numbered images
        },
        greenspace: {
            name: 'greenspace',
            prefix: 'assets/greenspace',
            count: 7 // preview + 6 numbered images
        },
        skladopalu: {
            name: 'skladopalu',
            prefix: 'assets/skladopalu',
            count: 7 // preview + 6 numbered images
        },
        luxstay: {
            name: 'luxstay',
            prefix: 'assets/luxstay',
            count: 9 // preview + 8 numbered images
        }
    };

    let currentGallery = null;
    let currentIndex = 0;

    // Preload images for current gallery
    function preloadGalleryImages(gallery) {
        for (let i = 0; i < gallery.count; i++) {
            const img = new Image();
            if (i === 0) {
                img.src = `assets/${gallery.name}-preview.png`;
            } else {
                img.src = `${gallery.prefix}${i}.png`;
            }
        }
    }

    // Open gallery
    galleryTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const galleryId = trigger.getAttribute('data-gallery');
            if (galleries[galleryId]) {
                currentGallery = galleries[galleryId];
                currentIndex = 0;
                preloadGalleryImages(currentGallery);
                showImage();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function showImage() {
        if (!currentGallery) return;
        // First image (index 0) is preview, rest are numbered 1-6
        let imageSrc;
        if (currentIndex === 0) {
            imageSrc = `assets/${currentGallery.name}-preview.png`;
        } else {
            imageSrc = `${currentGallery.prefix}${currentIndex}.png`;
        }
        lightboxImage.src = imageSrc;
        if (lightboxCounter) {
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentGallery.count}`;
        }
    }

    // Simplified transition - just fade
    let isTransitioning = false;

    function transitionToImage(newIndex) {
        if (!currentGallery || isTransitioning) return;

        isTransitioning = true;
        lightboxImage.style.opacity = '0';

        setTimeout(() => {
            currentIndex = newIndex;
            showImage();
            lightboxImage.style.opacity = '1';
            isTransitioning = false;
        }, 150);
    }

    function nextImage() {
        if (!currentGallery) return;
        const newIndex = (currentIndex + 1) % currentGallery.count;
        transitionToImage(newIndex);
    }

    function prevImage() {
        if (!currentGallery) return;
        const newIndex = (currentIndex - 1 + currentGallery.count) % currentGallery.count;
        transitionToImage(newIndex);
    }

    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });
    }

    // Close lightbox on button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close lightbox on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentGallery = null;
    }
}

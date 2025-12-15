/**
 * GreenSpace ULTRA - Premium Features
 * Scroll progress, Dark mode, Preloader (index only), Tilt effect, Parallax, Blobs
 * + SHOWCASE ANIMATIONS: Typing, Magnetic Buttons, Text Scramble
 */

document.addEventListener('DOMContentLoaded', function () {
    initScrollProgress();
    initDarkMode();
    initPreloader();
    initTiltEffect();
    initParallaxHero();
    initBlobBackground();
    initParticlesCanvas();

    // SHOWCASE ANIMATIONS
    initTypingEffect();
    initMagneticButtons();
    initScrollRevealAnimations();
    initCounterAnimation();
    initProcessStepsAnimation();
});

// ==========================================
// PROCESS STEPS STAGGERED ANIMATION
// ==========================================
function initProcessStepsAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Znajdź wszystkie kroki w tym samym kontenerze
                const container = entry.target.closest('.process-steps');
                if (container) {
                    const steps = container.querySelectorAll('.process-step');
                    steps.forEach(step => {
                        step.classList.add('animate-in');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Obserwuj tylko pierwszą sekcję process-steps
    const processContainers = document.querySelectorAll('.process-steps');
    processContainers.forEach(container => {
        const firstStep = container.querySelector('.process-step');
        if (firstStep) {
            observer.observe(firstStep);
        }
    });
}

// ==========================================
// TYPING EFFECT - Hero subtitle
// ==========================================
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;

    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--secondary-color)';

    let charIndex = 0;
    const typingSpeed = 50; // ms per character

    function typeChar() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        } else {
            // Usuń kursor po zakończeniu
            setTimeout(() => {
                heroSubtitle.style.borderRight = 'none';
            }, 1000);
        }
    }

    // Start po krótkim opóźnieniu
    setTimeout(typeChar, 800);
}

// ==========================================
// MAGNETIC BUTTONS - przyciąganie do kursora (IMPROVED)
// ==========================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(btn => {
        // Stan animacji dla każdego przycisku
        const state = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            isHovering: false,
            animationId: null
        };

        // Parametry magnetyzmu
        const MAGNETIC_STRENGTH = 0.35;   // Siła przyciągania (0.2-0.5)
        const LERP_SPEED = 0.15;          // Płynność animacji (0.1 = gładka, 0.3 = szybka)
        const ACTIVATION_RADIUS = 1.5;    // Promień aktywacji (1.0 = tylko przycisk, 1.5 = 50% większy)

        // Funkcja interpolacji liniowej
        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        // Pętla animacji
        function animate() {
            // Interpolacja do docelowej pozycji
            state.x = lerp(state.x, state.targetX, LERP_SPEED);
            state.y = lerp(state.y, state.targetY, LERP_SPEED);

            // Zastosuj transformację
            const scale = state.isHovering ? 1.05 : 1;
            btn.style.transform = `translate(${state.x}px, ${state.y}px) scale(${scale})`;

            // Kontynuuj animację jeśli nie osiągnęliśmy celu
            if (Math.abs(state.x - state.targetX) > 0.1 || Math.abs(state.y - state.targetY) > 0.1 || state.isHovering) {
                state.animationId = requestAnimationFrame(animate);
            } else {
                // Reset gdy zakończymy
                btn.style.transform = 'translate(0, 0) scale(1)';
                state.animationId = null;
            }
        }

        // Nasłuchiwanie ruchu myszy na kontenerze (większy obszar)
        btn.addEventListener('mouseenter', (e) => {
            state.isHovering = true;
            if (!state.animationId) {
                animate();
            }
        });

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Odległość od centrum przycisku
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;

            // Ustaw docelową pozycję z ograniczeniem
            const maxMove = Math.min(rect.width, rect.height) * 0.3; // Max 30% rozmiaru
            state.targetX = Math.max(-maxMove, Math.min(maxMove, distX * MAGNETIC_STRENGTH));
            state.targetY = Math.max(-maxMove, Math.min(maxMove, distY * MAGNETIC_STRENGTH));
        });

        btn.addEventListener('mouseleave', () => {
            state.isHovering = false;
            state.targetX = 0;
            state.targetY = 0;

            // Upewnij się że animacja działa przy wychodzeniu
            if (!state.animationId) {
                animate();
            }
        });
    });
}

// ==========================================
// SCROLL REVEAL ANIMATIONS - kaskadowe
// ==========================================
function initScrollRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.service-card, .gallery-item, .testimonial-card, .pricing-card, ' +
        '.team-card, .value-card, .timeline-item, .stat-item, ' +
        '.contact-item, .accordion-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Kaskadowe opóźnienie dla elementów w tej samej grupie
                const delay = (entry.target.dataset.delay || 0) * 100;

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        // Przypisz opóźnienie bazując na pozycji w gridzie
        const parent = el.parentElement;
        const siblings = parent ? Array.from(parent.children).filter(
            child => child.matches('.service-card, .gallery-item, .pricing-card, .team-card, .value-card')
        ) : [];
        const siblingIndex = siblings.indexOf(el);
        el.dataset.delay = siblingIndex >= 0 ? siblingIndex : 0;

        // Początkowy stan
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        observer.observe(el);
    });
}

// ==========================================
// COUNTER ANIMATION - animowane liczby
// ==========================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000; // 2 sekundy
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function (easeOutExpo)
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(easeProgress * target);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                        // Dodaj efekt "pop" na końcu
                        counter.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            counter.style.transform = 'scale(1)';
                        }, 200);
                    }
                }

                counter.style.transition = 'transform 0.2s ease';
                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// PARALLAX HERO EFFECT
// ==========================================
function initParallaxHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Dodaj klasę dla CSS
    document.body.classList.add('parallax-active');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroHeight = hero.offsetHeight;

                // Tylko gdy hero jest widoczny
                if (scrolled < heroHeight) {
                    const offset = scrolled * 0.4; // 40% efekt parallax
                    hero.style.setProperty('--parallax-offset', `${offset}px`);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==========================================
// BLOB BACKGROUND ANIMATIONS
// ==========================================
function initBlobBackground() {
    // Tylko na stronie głównej dla wydajności
    const isHomepage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    if (!isHomepage) return;

    // Sprawdź prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Utwórz kontener blob
    const blobContainer = document.createElement('div');
    blobContainer.className = 'blob-container';
    blobContainer.setAttribute('aria-hidden', 'true');
    blobContainer.innerHTML = `
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    `;
    document.body.insertBefore(blobContainer, document.body.firstChild);
}

// ==========================================
// PARTICLES CANVAS - Floating nature particles
// ==========================================
function initParticlesCanvas() {
    // Działa na obu typach hero - strona główna (.hero) i podstrony (.page-hero)
    const hero = document.querySelector('.hero') || document.querySelector('.page-hero');
    if (!hero) return;

    // Sprawdź prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Utwórz canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let isVisible = true;

    // Ustaw rozmiar canvas
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Klasa cząsteczki
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = Math.random() * -0.5 - 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
            // Naturalne kolory - zieleń i złoto
            const colors = [
                'rgba(45, 90, 39, ',   // ciemna zieleń
                'rgba(82, 183, 136, ', // jasna zieleń
                'rgba(149, 213, 178, ', // mięta
                'rgba(212, 175, 55, '  // złoto (jesienne liście)
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Delikatne falowanie
            this.x += Math.sin(this.y * 0.01) * 0.2;

            // Reset gdy wyjdzie poza ekran
            if (this.y < -this.size || this.x < -this.size || this.x > canvas.width + this.size) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color + this.opacity + ')';

            // Rysuj kształt liścia
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.quadraticCurveTo(this.size, -this.size / 2, this.size / 2, this.size / 2);
            ctx.quadraticCurveTo(0, this.size, -this.size / 2, this.size / 2);
            ctx.quadraticCurveTo(-this.size, -this.size / 2, 0, -this.size);
            ctx.fill();

            ctx.restore();
        }
    }

    // Utwórz cząsteczki
    const particleCount = Math.min(30, Math.floor(canvas.width / 40));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animacja
    function animate() {
        if (!isVisible) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Intersection Observer - zatrzymaj gdy niewidoczne
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            if (isVisible && !animationId) {
                animate();
            } else if (!isVisible && animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
    }, { threshold: 0 });

    observer.observe(hero);
    animate();
}

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

// ==========================================
// DARK MODE TOGGLE
// ==========================================
function initDarkMode() {
    // Domyślnie light mode - sprawdź tylko zapisane preferencje
    const savedTheme = localStorage.getItem('theme');

    // Jeśli użytkownik wcześniej wybrał dark mode, zastosuj
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        // Zawsze startuj w light mode (nawet jeśli system jest dark)
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Add toggle button to navbar when it's loaded
    const observer = new MutationObserver((mutations, obs) => {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && !document.getElementById('themeToggle')) {
            createThemeToggle();
            obs.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Also try immediately in case navbar is already loaded
    setTimeout(() => {
        if (!document.getElementById('themeToggle')) {
            createThemeToggle();
        }
    }, 500);
}

function createThemeToggle() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggleContainer = document.getElementById('mobileThemeToggle');
    if (!navMenu) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'themeToggle';
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Przełącz tryb ciemny/jasny');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i><i class="fas fa-sun"></i>';

    // On mobile, place in the mobile container; on desktop, after nav-menu
    const isMobile = window.innerWidth <= 768;

    if (isMobile && mobileToggleContainer) {
        mobileToggleContainer.appendChild(toggleBtn);
    } else {
        // Insert after nav-menu (before nav-toggle)
        navMenu.parentNode.insertBefore(toggleBtn, navMenu.nextSibling);
    }

    toggleBtn.addEventListener('click', toggleTheme);

    // Handle resize to reposition toggle
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const nowMobile = window.innerWidth <= 768;
            const existingToggle = document.getElementById('themeToggle');
            if (existingToggle) {
                if (nowMobile && mobileToggleContainer && !mobileToggleContainer.contains(existingToggle)) {
                    mobileToggleContainer.appendChild(existingToggle);
                } else if (!nowMobile && !navMenu.parentNode.contains(existingToggle)) {
                    navMenu.parentNode.insertBefore(existingToggle, navMenu.nextSibling);
                }
            }
        }, 100);
    });
}

function toggleTheme() {
    const html = document.documentElement;
    const body = document.body;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Dodaj klasę dla płynnego przejścia
    body.classList.add('theme-transitioning');

    // Zmień motyw
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Usuń klasę po zakończeniu animacji
    setTimeout(() => {
        body.classList.remove('theme-transitioning');
    }, 400);
}

// ==========================================
// PRELOADER (only on index.html)
// ==========================================
function initPreloader() {
    // Only show preloader on homepage (index.html)
    const isHomepage = window.location.pathname.endsWith('index.html') ||
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/');

    if (!isHomepage) return;

    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
    <div class="preloader-logo">
      <i class="fas fa-leaf"></i>
      <span>GreenSpace</span>
    </div>
    <div class="preloader-bar"></div>
  `;
    document.body.insertBefore(preloader, document.body.firstChild);

    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 600); // Shorter time for snappier feel
    });
}

// ==========================================
// SUBTLE TILT EFFECT ON CARDS
// ==========================================
function initTiltEffect() {
    // Add tilt effect class to cards (excluding pricing-card which has own hover effects)
    const cards = document.querySelectorAll(
        '.service-card, .team-card, .value-card, .gallery-item'
    );

    cards.forEach(card => {
        card.classList.add('tilt-effect');

        // Check if card is featured (has special scale)
        const isFeatured = card.classList.contains('featured');
        const baseScale = isFeatured ? 1.05 : 1;
        const hoverScale = isFeatured ? 1.07 : 1.02;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle rotation (max 5 degrees for more noticeable 3D)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            // Update glow position
            const percentX = (x / rect.width) * 100;
            const percentY = (y / rect.height) * 100;
            card.style.setProperty('--glow-x', `${percentX}%`);
            card.style.setProperty('--glow-y', `${percentY}%`);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale}) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(${baseScale}) translateZ(0)`;
        });
    });

    // Re-init when new cards might be added (e.g., after component loading)
    const observer = new MutationObserver(() => {
        const newCards = document.querySelectorAll(
            '.service-card:not(.tilt-effect), ' +
            '.team-card:not(.tilt-effect), .value-card:not(.tilt-effect), ' +
            '.gallery-item:not(.tilt-effect)'
        );

        newCards.forEach(card => {
            card.classList.add('tilt-effect');

            // Check if card is featured (has special scale)
            const isFeatured = card.classList.contains('featured');
            const baseScale = isFeatured ? 1.05 : 1;
            const hoverScale = isFeatured ? 1.07 : 1.02;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                const percentX = (x / rect.width) * 100;
                const percentY = (y / rect.height) * 100;
                card.style.setProperty('--glow-x', `${percentX}%`);
                card.style.setProperty('--glow-y', `${percentY}%`);

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${hoverScale}) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(${baseScale}) translateZ(0)`;
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// ==========================================
// ENHANCED SCROLL REVEAL
// ==========================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

// Console branding
console.log('%c GreenSpace ULTRA', 'color: #2d6a4f; font-size: 24px; font-weight: bold;');
console.log('%c Premium Features Loaded', 'color: #52b788; font-size: 14px;');

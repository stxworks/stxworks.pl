/**
 * Components Loader
 * Dynamicznie ładuje navbar i footer do każdej strony
 * Demonstracja: fetch API, async/await, DOM manipulation
 * 
 * UWAGA: fetch() nie działa z protokołem file:// (CORS)
 * Rozwiązanie: fallback na inline HTML gdy fetch zawiedzie
 */

// Inline HTML dla navbar (fallback gdy fetch nie działa)
const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
    <div class="nav-container">
        <!-- Mobile: Theme toggle placeholder (filled by JS) -->
        <div class="mobile-theme-toggle" id="mobileThemeToggle"></div>
        
        <a href="./" class="nav-logo">
            <svg class="nav-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                <path fill="currentColor" d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-50 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-56.8 239-128V96c0-17.7-14.3-32-32-32H304c-17.7 0-32 14.3-32 32z"/>
            </svg>
            <span>GreenSpace</span>
        </a>

        <ul class="nav-menu" id="navMenu">
            <li><a href="./" class="nav-link">Start</a></li>
            <li><a href="o-nas" class="nav-link">O nas</a></li>
            <li><a href="uslugi" class="nav-link">Usługi</a></li>
            <li><a href="galeria" class="nav-link">Galeria</a></li>
            <li><a href="cennik" class="nav-link">Cennik</a></li>
            <li><a href="kontakt" class="nav-link">Kontakt</a></li>
        </ul>

        <a href="/projekty" class="back-to-portfolio" title="Wróć do STX Works Portfolio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Portfolio
        </a>

        <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
            <span class="hamburger"></span>
        </button>
    </div>
</nav>
`;

// Inline HTML dla footer (fallback gdy fetch nie działa)
const FOOTER_HTML = `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-col">
                <div class="footer-logo">
                    <i class="fas fa-leaf"></i>
                    <span>GreenSpace</span>
                </div>
                <p>Tworzymy ogrody, które zachwycają i inspirują od 2015 roku.</p>
            </div>

            <div class="footer-col">
                <h4>Szybkie Linki</h4>
                <ul>
                    <li><a href="./">Start</a></li>
                    <li><a href="o-nas">O nas</a></li>
                    <li><a href="uslugi">Usługi</a></li>
                    <li><a href="galeria">Galeria</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Usługi</h4>
                <ul>
                    <li><a href="uslugi">Projektowanie</a></li>
                    <li><a href="uslugi">Zakładanie</a></li>
                    <li><a href="uslugi">Pielęgnacja</a></li>
                    <li><a href="kontakt">Wycena</a></li>
                </ul>
            </div>

            <div class="footer-col">
                <h4>Kontakt</h4>
                <ul class="footer-contact">
                    <li><i class="fas fa-phone"></i> +48 123 456 789</li>
                    <li><i class="fas fa-envelope"></i> kontakt@greenspace.pl</li>
                    <li><i class="fas fa-map-marker-alt"></i> ul. Ogrodowa 15, Warszawa</li>
                </ul>
                <div class="social-links">
                    <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2025 STX Works &bull; Projekt demonstracyjny &bull; <a href="polityka-prywatnosci" style="color: var(--gray-light);">Polityka prywatności</a> &bull; <a href="#" id="cookieSettingsBtn" style="color: var(--gray-light);">Ustawienia cookies</a></p>
        </div>
    </div>
</footer>
`;

// Funkcja ładująca komponent HTML do wskazanego elementu
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) return false;

    try {
        // Próba fetch (działa tylko na serwerze HTTP, nie na file://)
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;
        return true;
    } catch (error) {
        // Fallback na inline HTML (dla file:// protocol)
        console.warn(`Fetch nie zadziałał dla ${componentPath}, używam inline fallback`);
        return false;
    }
}

// Inicjalizacja komponentów po załadowaniu DOM
document.addEventListener('DOMContentLoaded', async function () {
    // Ładowanie nawigacji (fetch lub inline fallback)
    const navbarLoaded = await loadComponent('navbar-placeholder', 'components/navbar.html');
    if (!navbarLoaded) {
        const navPlaceholder = document.getElementById('navbar-placeholder');
        if (navPlaceholder) navPlaceholder.innerHTML = NAVBAR_HTML;
    }

    // Ładowanie stopki (fetch lub inline fallback)
    const footerLoaded = await loadComponent('footer-placeholder', 'components/footer.html');
    if (!footerLoaded) {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
    }

    // Po załadowaniu komponentów, inicjalizuj ich funkcjonalności
    initNavbar();
    initScrollEffects();
});

// Inicjalizacja nawigacji (mobile toggle, active links)
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    if (!navToggle || !navMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Zamknij menu po kliknięciu linku
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Zamknij menu po kliknięciu poza
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Podświetlenie aktywnego linku
    highlightActiveLink();
}

// Podświetlenie aktywnego linku na podstawie aktualnej strony
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Efekty scroll (sticky navbar, scroll-to-top)
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    let lastScrollTop = 0;

    // Funkcja sprawdzająca stan scroll
    function checkScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Sticky navbar z efektem
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll to top button
        if (scrollToTopBtn) {
            if (scrollTop > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }

        lastScrollTop = scrollTop;
    }

    // Sprawdź stan od razu przy załadowaniu (ważne przy odświeżaniu strony w środku)
    checkScroll();

    // Nasłuchuj na scroll
    window.addEventListener('scroll', checkScroll, { passive: true });

    // Scroll to top click handler
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Export dla użycia w innych modułach (opcjonalnie)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadComponent, initNavbar, initScrollEffects };
}

// =============================================
// STX Works - Components Loader
// Działa z file:// i http://
// =============================================

// Pobierz aktualną stronę do zaznaczenia aktywnego linku
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return page;
}

// Generuj nawigację z aktywnym linkiem
function getNavHTML() {
    const currentPage = getCurrentPage();

    const navLinks = [
        { href: '/', text: 'Start' },
        { href: '/projekty', text: 'Projekty' },
        { href: '/uslugi', text: 'Usługi' },
        { href: '/o-mnie', text: 'O mnie' },
        { href: '/kontakt', text: 'Kontakt' }
    ];

    const linksHTML = navLinks.map(link => {
        const isActive = currentPage === link.href ||
            (currentPage === '' && link.href === 'index.html');
        return `<li><a href="${link.href}" class="nav-link${isActive ? ' active' : ''}">${link.text}</a></li>`;
    }).join('\n                ');

    return `
    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="/" class="nav-logo magnetic" data-strength="20">
                <div class="logo-gear-wrapper">
                    <svg class="logo-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                    </svg>
                </div>
                <span class="logo-text">STX Works</span>
            </a>
            <ul class="nav-menu" id="nav-menu">
                ${linksHTML}
            </ul>
            <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">
                <span class="hamburger"></span>
            </button>
        </div>
    </nav>`;
}

// Footer HTML
function getFooterHTML() {
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <a href="/" class="footer-logo">
                        <div class="logo-gear-wrapper">
                            <svg class="logo-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="16 18 22 12 16 6"/>
                                <polyline points="8 6 2 12 8 18"/>
                            </svg>
                        </div>
                        <span class="logo-text">STX Works</span>
                    </a>
                    <p>Strony internetowe dla małych firm</p>
                    <p class="footer-tagline">Proste, nowoczesne i działające na każdym urządzeniu.</p>
                </div>

                <div class="footer-section">
                    <h4>Nawigacja</h4>
                    <div class="footer-links">
                        <a href="/">Start</a>
                        <a href="/projekty">Projekty</a>
                        <a href="/uslugi">Usługi</a>
                        <a href="/o-mnie">O mnie</a>
                        <a href="/kontakt">Kontakt</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Kontakt</h4>
                    <div class="footer-contact">
                        <a href="mailto:kontakt@stxworks.pl" class="footer-contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            kontakt@stxworks.pl
                        </a>
                        <a href="tel:+48693459978" class="footer-contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            +48 693 459 978
                        </a>
                        <div class="footer-contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            Polska, praca zdalna
                        </div>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Social media</h4>
                    <div class="footer-social">
                        <a href="https://useme.com/pl/roles/contractor/stx-works,580468/" class="social-link magnetic" aria-label="Useme" target="_blank" rel="noopener">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                            </svg>
                        </a>
                        <a href="https://discord.com/users/672512872659550240" class="social-link magnetic" aria-label="Discord" target="_blank" rel="noopener">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2025 STX Works Jakub Stachowiak. Wszelkie prawa zastrzeżone.</p>
                <div class="footer-bottom-links">
                    <p class="footer-made">Designed &amp; developed by Jakub</p>
                    <a href="javascript:openCookieSettings()" class="footer-cookie-link"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: -2px; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/><circle cx="10" cy="16" r="1" fill="currentColor"/></svg>Ustawienia cookies</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// Cookie Banner HTML
function getCookieBannerHTML() {
    return `
    <div class="cookie-banner" id="cookie-banner">
        <div class="cookie-content">
            <div class="cookie-text">
                <p><strong><svg class="cookie-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1" fill="currentColor"/><circle cx="14" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="14" r="1" fill="currentColor"/><circle cx="10" cy="16" r="1" fill="currentColor"/></svg> Ta strona używa cookies</strong></p>
                <p>Używamy plików cookie, aby zapewnić najlepsze doświadczenia na naszej stronie. Możesz zarządzać swoimi preferencjami.</p>
            </div>
            <div class="cookie-buttons">
                <button class="btn btn-outline cookie-btn" id="cookie-manage">Zarządzaj</button>
                <button class="btn btn-secondary cookie-btn" id="cookie-necessary">Tylko niezbędne</button>
                <button class="btn btn-primary cookie-btn" id="cookie-accept-all">Akceptuj wszystkie</button>
            </div>
        </div>
        <div class="cookie-settings" id="cookie-settings">
            <div class="cookie-setting-item">
                <label>
                    <input type="checkbox" checked disabled>
                    <span><strong>Niezbędne</strong> - wymagane do działania strony</span>
                </label>
            </div>
            <div class="cookie-setting-item">
                <label>
                    <input type="checkbox" id="cookie-analytics">
                    <span><strong>Analityczne</strong> - pomagają zrozumieć jak używasz strony</span>
                </label>
            </div>
            <div class="cookie-setting-item">
                <label>
                    <input type="checkbox" id="cookie-preferences">
                    <span><strong>Preferencje</strong> - zapamiętują Twoje ustawienia</span>
                </label>
            </div>
            <button class="btn btn-primary cookie-btn" id="cookie-save">Zapisz ustawienia</button>
        </div>
    </div>`;
}

// Cookie Banner Logic
function initCookieBanner() {
    const consent = localStorage.getItem('stx-cookie-consent');

    // If already consented, apply cookies based on saved preferences
    if (consent) {
        const consentData = JSON.parse(consent);
        applyCookiePreferences(consentData);
        return;
    }

    // Insert banner
    document.body.insertAdjacentHTML('beforeend', getCookieBannerHTML());

    const banner = document.getElementById('cookie-banner');
    const settings = document.getElementById('cookie-settings');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const necessaryBtn = document.getElementById('cookie-necessary');
    const manageBtn = document.getElementById('cookie-manage');
    const saveBtn = document.getElementById('cookie-save');

    // Show banner with animation
    setTimeout(() => banner.classList.add('visible'), 500);

    acceptAllBtn.addEventListener('click', () => {
        const consentData = { necessary: true, analytics: true, preferences: true, timestamp: Date.now() };
        localStorage.setItem('stx-cookie-consent', JSON.stringify(consentData));
        applyCookiePreferences(consentData);
        closeBanner(banner);
    });

    necessaryBtn.addEventListener('click', () => {
        const consentData = { necessary: true, analytics: false, preferences: false, timestamp: Date.now() };
        localStorage.setItem('stx-cookie-consent', JSON.stringify(consentData));
        applyCookiePreferences(consentData);
        closeBanner(banner);
    });

    manageBtn.addEventListener('click', () => {
        settings.classList.toggle('visible');
    });

    saveBtn.addEventListener('click', () => {
        const analytics = document.getElementById('cookie-analytics').checked;
        const preferences = document.getElementById('cookie-preferences').checked;
        const consentData = { necessary: true, analytics, preferences, timestamp: Date.now() };
        localStorage.setItem('stx-cookie-consent', JSON.stringify(consentData));
        applyCookiePreferences(consentData);
        closeBanner(banner);
    });
}

// Apply cookie preferences based on consent
function applyCookiePreferences(consent) {
    // === NECESSARY COOKIES (always active) ===
    // Session ID for basic functionality
    if (!sessionStorage.getItem('stx-session-id')) {
        sessionStorage.setItem('stx-session-id', generateSessionId());
    }

    // === ANALYTICS COOKIES ===
    if (consent.analytics) {
        initAnalytics();
    }

    // === PREFERENCE COOKIES ===
    if (consent.preferences) {
        initPreferenceCookies();
    }
}

// Generate unique session ID
function generateSessionId() {
    return 'stx_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Initialize Analytics (Google Analytics ready)
function initAnalytics() {
    // Track page view
    const pageData = {
        page: window.location.pathname,
        title: document.title,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language
    };

    // Store in session for potential later use
    const pageViews = JSON.parse(sessionStorage.getItem('stx-page-views') || '[]');
    pageViews.push(pageData);
    sessionStorage.setItem('stx-page-views', JSON.stringify(pageViews));

    // === GOOGLE ANALYTICS INTEGRATION ===
    // Uncomment and add your GA4 Measurement ID to enable Google Analytics
    /*
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID
    
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
    });
    */

    console.log('[STX Cookies] Analytics initialized - page view tracked');
}

// Initialize Preference Cookies
function initPreferenceCookies() {
    // Track visit count
    let visitCount = parseInt(localStorage.getItem('stx-visit-count') || '0');
    visitCount++;
    localStorage.setItem('stx-visit-count', visitCount.toString());

    // Track first visit date
    if (!localStorage.getItem('stx-first-visit')) {
        localStorage.setItem('stx-first-visit', new Date().toISOString());
    }

    // Track last visit
    localStorage.setItem('stx-last-visit', new Date().toISOString());

    // Track visited pages (unique)
    const visitedPages = JSON.parse(localStorage.getItem('stx-visited-pages') || '[]');
    const currentPage = window.location.pathname;
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('stx-visited-pages', JSON.stringify(visitedPages));
    }

    // Save user preferences (for potential future features)
    const userPrefs = JSON.parse(localStorage.getItem('stx-user-prefs') || '{}');
    userPrefs.preferredLanguage = navigator.language;
    userPrefs.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    userPrefs.lastUserAgent = navigator.userAgent;
    localStorage.setItem('stx-user-prefs', JSON.stringify(userPrefs));

    console.log('[STX Cookies] Preferences initialized - visit #' + visitCount);
}

// Get cookie consent status (for external use)
window.getCookieConsent = function () {
    const consent = localStorage.getItem('stx-cookie-consent');
    return consent ? JSON.parse(consent) : null;
};

// Get visit statistics (for external use)
window.getVisitStats = function () {
    return {
        visitCount: parseInt(localStorage.getItem('stx-visit-count') || '0'),
        firstVisit: localStorage.getItem('stx-first-visit'),
        lastVisit: localStorage.getItem('stx-last-visit'),
        visitedPages: JSON.parse(localStorage.getItem('stx-visited-pages') || '[]'),
        sessionId: sessionStorage.getItem('stx-session-id'),
        pageViewsThisSession: JSON.parse(sessionStorage.getItem('stx-page-views') || '[]').length
    };
};

function closeBanner(banner) {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 300);
}

// Show cookie settings (called from footer link)
window.openCookieSettings = function () {
    // Get previous consent before removing
    const previousConsent = localStorage.getItem('stx-cookie-consent');
    let prevData = null;
    if (previousConsent) {
        prevData = JSON.parse(previousConsent);
    }

    localStorage.removeItem('stx-cookie-consent');
    initCookieBanner();

    // Automatically open settings panel after banner appears
    setTimeout(() => {
        const settings = document.getElementById('cookie-settings');
        if (settings) {
            settings.classList.add('visible');
        }

        // Restore previous checkbox states
        if (prevData) {
            const analyticsCheckbox = document.getElementById('cookie-analytics');
            const preferencesCheckbox = document.getElementById('cookie-preferences');
            if (analyticsCheckbox) analyticsCheckbox.checked = prevData.analytics || false;
            if (preferencesCheckbox) preferencesCheckbox.checked = prevData.preferences || false;
        }
    }, 600);
};

// Wstaw komponenty do strony
function loadComponents() {
    // Wstaw nawigację
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.outerHTML = getNavHTML();
    }

    // Wstaw footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = getFooterHTML();
    }

    // Inicjalizuj baner cookies
    initCookieBanner();
}

// Uruchom po załadowaniu DOM
document.addEventListener('DOMContentLoaded', loadComponents);

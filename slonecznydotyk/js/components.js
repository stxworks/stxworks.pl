const headerHTML = `
<nav>
    <div class="container">
        <a href="./" class="logo">Słoneczny Dotyk</a>
        <ul class="nav-links">
            <li><a href="./">Strona Główna</a></li>
            <li><a href="o-nas">O Nas</a></li>
            <li><a href="uslugi">Usługi</a></li>
            <li><a href="cennik">Cennik</a></li>
            <li><a href="galeria">Galeria</a></li>
            <li><a href="faq">FAQ</a></li>
            <li><a href="kontakt">Kontakt</a></li>
        </ul>
        <a href="/projekty" class="back-to-portfolio" title="Wróć do STX Works Portfolio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Portfolio
        </a>
        <button class="theme-toggle" id="theme-toggle" aria-label="Przełącz tryb ciemny/jasny" title="Przełącz tryb">
            <svg class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg class="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        </button>
        <button class="mobile-menu-toggle" aria-label="Menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 1.75rem; height: 1.75rem;">
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
            </svg>
        </button>
    </div>
</nav>
`;

const cookieBannerHTML = `
<div class="cookie-banner" id="cookie-banner">
    <div class="container">
        <div class="cookie-content">
            <div class="cookie-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                    <circle cx="12.5" cy="12.5" r=".5" fill="currentColor"/>
                    <circle cx="16.5" cy="10.5" r=".5" fill="currentColor"/>
                    <circle cx="8.5" cy="14.5" r=".5" fill="currentColor"/>
                </svg>
            </div>
            <div class="cookie-text">
                <h3>Pliki cookies</h3>
                <p>Używamy plików cookies, aby poprawić Twoje doświadczenia na naszej stronie. Możesz zaakceptować wszystkie cookies lub dostosować ustawienia.</p>
            </div>
        </div>
        <div class="cookie-actions">
            <button class="cookie-btn cookie-btn-decline" id="cookie-decline">Tylko niezbędne</button>
            <button class="cookie-btn cookie-btn-decline" id="cookie-settings">Ustawienia</button>
            <button class="cookie-btn cookie-btn-accept" id="cookie-accept">Akceptuj wszystkie</button>
        </div>
    </div>
</div>
`;

const cookieModalHTML = `
<div class="cookie-modal-overlay" id="cookie-modal-overlay">
    <div class="cookie-modal">
        <div class="cookie-modal-header">
            <h2>Ustawienia cookies</h2>
            <button class="cookie-modal-close" id="cookie-modal-close">&times;</button>
        </div>
        <div class="cookie-modal-body">
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <div class="cookie-category-title">
                        <h3>Niezbędne</h3>
                        <span class="cookie-badge">Zawsze aktywne</span>
                    </div>
                    <label class="cookie-toggle">
                        <input type="checkbox" checked disabled id="cookie-necessary">
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>
                <p class="cookie-category-description">Te pliki cookies są niezbędne do prawidłowego działania strony i nie mogą być wyłączone. Zazwyczaj są ustawiane tylko w odpowiedzi na Twoje działania, takie jak ustawienie preferencji prywatności.</p>
            </div>
            
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <div class="cookie-category-title">
                        <h3>Analityczne</h3>
                    </div>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="cookie-analytics">
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>
                <p class="cookie-category-description">Te pliki cookies pozwalają nam analizować ruch na stronie i mierzyć efektywność naszych kampanii marketingowych. Informacje są gromadzone anonimowo.</p>
            </div>
            
            <div class="cookie-category">
                <div class="cookie-category-header">
                    <div class="cookie-category-title">
                        <h3>Marketingowe</h3>
                    </div>
                    <label class="cookie-toggle">
                        <input type="checkbox" id="cookie-marketing">
                        <span class="cookie-toggle-slider"></span>
                    </label>
                </div>
                <p class="cookie-category-description">Te pliki cookies mogą być ustawiane przez naszych partnerów reklamowych. Służą do tworzenia profilu Twoich zainteresowań i wyświetlania odpowiednich reklam.</p>
            </div>
        </div>
        <div class="cookie-modal-footer">
            <button class="cookie-modal-btn cookie-modal-btn-secondary" id="cookie-modal-decline">Tylko niezbędne</button>
            <button class="cookie-modal-btn cookie-modal-btn-primary" id="cookie-modal-save">Zapisz ustawienia</button>
        </div>
    </div>
</div>
`;

const footerHTML = `
<footer>
    <div class="container">
        <div class="footer-grid">
            <div class="footer-about">
                <h3>Słoneczny Dotyk</h3>
                <p>Profesjonalne solarium premium w sercu miasta. Opalenizna przez cały rok.</p>
                <div style="margin-top: 1rem;">
                    <a href="https://www.facebook.com/profile.php?id=61574738591259&locale=pl_PL" target="_blank" aria-label="Facebook" style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: var(--gold-accent); border-radius: 50%; color: white; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" fill="white" style="width: 20px; height: 20px;">
                            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="footer-links">
                <h4>Nawigacja</h4>
                <ul>
                    <li><a href="./">Strona Główna</a></li>
                    <li><a href="o-nas">O Nas</a></li>
                    <li><a href="uslugi">Usługi</a></li>
                    <li><a href="cennik">Cennik</a></li>
                    <li><a href="galeria">Galeria</a></li>
                    <li><a href="faq">FAQ</a></li>
                    <li><a href="kontakt">Kontakt</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h4>Kontakt</h4>
                <p><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="display: inline-block; width: 1.2rem; height: 1.2rem; margin-right: 0.5rem; vertical-align: middle;">
                        <path d="M12 21c-4.97-5.07-8-8.58-8-11.5a8 8 0 1 1 16 0c0 2.92-3.03 6.43-8 11.5z" />
                        <circle cx="12" cy="11" r="2" />
                    </svg>ul. Paderewskiego 10, 62-270 Kłecko</p>
                <p><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="display: inline-block; width: 1.2rem; height: 1.2rem; margin-right: 0.5rem; vertical-align: middle;">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg><a href="tel:+48693599002">+48 693 599 002</a></p>
                <p><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: inline-block; width: 1.2rem; height: 1.2rem; margin-right: 0.5rem; vertical-align: middle;">
                        <path d="M4 4h16v16H4z" />
                        <path d="M22 4l-10 7L2 4" />
                    </svg><a href="mailto:kontakt@slonecznydotyk.pl">kontakt@slonecznydotyk.pl</a></p>
            </div>
            <div class="footer-hours">
                <h4>Dane Firmy</h4>
                <p class="company-name"><strong>SŁONECZNY DOTYK</strong></p>
                <p class="company-owner">Agnieszka Stachowiak</p>
                <p class="company-address">ul. Ignacego Paderewskiego 10<br>62-270 Kłecko</p>
                <p class="company-tax">NIP: 7842251019<br>REGON: 541416753</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Słoneczny Dotyk • Wykonane przez <strong>STX Works</strong> • <a href="#" id="footer-cookie-settings" style="color: var(--gold-accent); text-decoration: underline; font-weight: 500;">Ustawienia cookies</a></p>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    if (headerPlaceholder) {
        headerPlaceholder.insertAdjacentHTML('afterend', headerHTML);
        headerPlaceholder.remove();
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }

    document.body.insertAdjacentHTML('beforeend', cookieBannerHTML);
    document.body.insertAdjacentHTML('beforeend', cookieModalHTML);

    if (typeof initCookieBanner === 'function') {
        initCookieBanner();
    }

    if (typeof initNavigation === 'function') {
        initNavigation();
    }
});

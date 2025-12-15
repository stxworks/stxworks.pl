/**
 * Cookie Consent Manager
 * Banner przy pierwszej wizycie + modal ustawień
 * Zapisuje preferencje w localStorage
 */

(function () {
    'use strict';

    // Konfiguracja cookies
    const COOKIE_STORAGE_KEY = 'greenspace_cookie_consent';

    // Domyślne ustawienia
    const defaultSettings = {
        necessary: true,      // Zawsze włączone
        analytics: false,     // Google Analytics itp.
        marketing: false,     // Reklamy, remarketing
        preferences: false,   // Personalizacja
        consented: false,     // Czy użytkownik już wyraził zgodę
        timestamp: null
    };

    // HTML bannera
    const bannerHTML = `
    <div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Ustawienia prywatności" aria-modal="true">
        <div class="cookie-banner-content">
            <div class="cookie-banner-text">
                <div class="cookie-icon">
                    <i class="fas fa-cookie-bite"></i>
                </div>
                <div>
                    <h3>Ta strona używa plików cookies</h3>
                    <p>Używamy cookies, aby zapewnić najlepsze doświadczenia na naszej stronie. 
                       Możesz zaakceptować wszystkie lub dostosować ustawienia.</p>
                </div>
            </div>
            <div class="cookie-banner-actions">
                <button class="cookie-btn cookie-btn-settings" id="cookieSettingsOpen">
                    <i class="fas fa-cog"></i> Ustawienia
                </button>
                <button class="cookie-btn cookie-btn-reject" id="cookieRejectAll">
                    Tylko niezbędne
                </button>
                <button class="cookie-btn cookie-btn-accept" id="cookieAcceptAll">
                    <i class="fas fa-check"></i> Akceptuj wszystkie
                </button>
            </div>
        </div>
    </div>
    `;

    // HTML modalu ustawień
    const modalHTML = `
    <div class="cookie-modal-overlay" id="cookieModalOverlay">
        <div class="cookie-modal" role="dialog" aria-label="Szczegółowe ustawienia cookies" aria-modal="true">
            <div class="cookie-modal-header">
                <h3><i class="fas fa-shield-alt"></i> Ustawienia prywatności</h3>
                <button class="cookie-modal-close" id="cookieModalClose" aria-label="Zamknij">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cookie-modal-body">
                <p class="cookie-modal-intro">
                    Zarządzaj swoimi preferencjami dotyczącymi plików cookies. 
                    Niektóre cookies są niezbędne do działania strony i nie można ich wyłączyć.
                </p>

                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <h4><i class="fas fa-lock"></i> Niezbędne</h4>
                            <p>Wymagane do prawidłowego działania strony. Nie można ich wyłączyć.</p>
                        </div>
                        <label class="cookie-toggle disabled">
                            <input type="checkbox" checked disabled>
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <h4><i class="fas fa-chart-bar"></i> Analityczne</h4>
                            <p>Pomagają zrozumieć, jak odwiedzający korzystają ze strony.</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookieAnalytics">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <h4><i class="fas fa-bullhorn"></i> Marketingowe</h4>
                            <p>Używane do personalizacji reklam i remarketingu.</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookieMarketing">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <div class="cookie-category-info">
                            <h4><i class="fas fa-sliders-h"></i> Preferencje</h4>
                            <p>Zapamiętują Twoje ustawienia i personalizują doświadczenie.</p>
                        </div>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookiePreferences">
                            <span class="cookie-toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="cookie-modal-footer">
                <button class="cookie-btn cookie-btn-reject" id="cookieRejectAllModal">
                    Tylko niezbędne
                </button>
                <button class="cookie-btn cookie-btn-accept" id="cookieSaveSettings">
                    <i class="fas fa-save"></i> Zapisz ustawienia
                </button>
            </div>
        </div>
    </div>
    `;

    // Pobierz zapisane ustawienia
    function getSettings() {
        try {
            const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Błąd odczytu ustawień cookies:', e);
        }
        return { ...defaultSettings };
    }

    // Zapisz ustawienia
    function saveSettings(settings) {
        try {
            settings.timestamp = new Date().toISOString();
            localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(settings));
            console.log('Ustawienia cookies zapisane:', settings);
        } catch (e) {
            console.warn('Błąd zapisu ustawień cookies:', e);
        }
    }

    // Pokaż banner
    function showBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('visible');
            }, 500);
        }
    }

    // Ukryj banner
    function hideBanner() {
        const banner = document.getElementById('cookieBanner');
        if (banner) {
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 400);
        }
    }

    // Pokaż modal ustawień
    function showModal() {
        const overlay = document.getElementById('cookieModalOverlay');
        if (overlay) {
            const settings = getSettings();

            // Ustaw checkboxy na podstawie zapisanych ustawień
            const analyticsCheckbox = document.getElementById('cookieAnalytics');
            const marketingCheckbox = document.getElementById('cookieMarketing');
            const preferencesCheckbox = document.getElementById('cookiePreferences');

            if (analyticsCheckbox) analyticsCheckbox.checked = settings.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = settings.marketing;
            if (preferencesCheckbox) preferencesCheckbox.checked = settings.preferences;

            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
    }

    // Ukryj modal
    function hideModal() {
        const overlay = document.getElementById('cookieModalOverlay');
        if (overlay) {
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }
    }

    // Akceptuj wszystkie
    function acceptAll() {
        const settings = {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
            consented: true
        };
        saveSettings(settings);
        hideBanner();
        hideModal();
        showToast('Wszystkie cookies zaakceptowane');
    }

    // Tylko niezbędne
    function rejectAll() {
        const settings = {
            necessary: true,
            analytics: false,
            marketing: false,
            preferences: false,
            consented: true
        };
        saveSettings(settings);
        hideBanner();
        hideModal();
        showToast('Tylko niezbędne cookies aktywne');
    }

    // Zapisz ustawienia z modalu
    function saveCustomSettings() {
        const settings = {
            necessary: true,
            analytics: document.getElementById('cookieAnalytics')?.checked || false,
            marketing: document.getElementById('cookieMarketing')?.checked || false,
            preferences: document.getElementById('cookiePreferences')?.checked || false,
            consented: true
        };
        saveSettings(settings);
        hideBanner();
        hideModal();
        showToast('Ustawienia cookies zapisane');
    }

    // Toast notification
    function showToast(message) {
        const existingToast = document.getElementById('toast');
        if (existingToast) {
            existingToast.textContent = message;
            existingToast.classList.add('visible');
            setTimeout(() => {
                existingToast.classList.remove('visible');
            }, 3000);
        }
    }

    // Inicjalizacja
    function init() {
        // Wstaw HTML do body
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const settings = getSettings();

        // Pokaż banner jeśli użytkownik jeszcze nie wyraził zgody
        if (!settings.consented) {
            showBanner();
        }

        // Event listeners dla bannera
        document.getElementById('cookieAcceptAll')?.addEventListener('click', acceptAll);
        document.getElementById('cookieRejectAll')?.addEventListener('click', rejectAll);
        document.getElementById('cookieSettingsOpen')?.addEventListener('click', () => {
            hideBanner();
            showModal();
        });

        // Event listeners dla modalu
        document.getElementById('cookieModalClose')?.addEventListener('click', hideModal);
        document.getElementById('cookieSaveSettings')?.addEventListener('click', saveCustomSettings);
        document.getElementById('cookieRejectAllModal')?.addEventListener('click', rejectAll);

        // Zamknij modal po kliknięciu w overlay
        document.getElementById('cookieModalOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'cookieModalOverlay') {
                hideModal();
            }
        });

        // Obsługa klawisza Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideModal();
            }
        });

        // Obsługa linku "Ustawienia cookies" w stopce
        // Nasłuchuj na dynamicznie dodawane elementy
        document.addEventListener('click', (e) => {
            if (e.target.id === 'cookieSettingsBtn' || e.target.closest('#cookieSettingsBtn')) {
                e.preventDefault();
                showModal();
            }
        });
    }

    // Uruchom po załadowaniu DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Eksport dla ewentualnego użycia zewnętrznego
    window.CookieConsent = {
        getSettings,
        showModal,
        acceptAll,
        rejectAll
    };

})();

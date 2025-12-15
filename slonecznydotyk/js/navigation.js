function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');

    if (nav) {
        const updateNavHeight = () => {
            const navHeight = nav.offsetHeight;
            document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
        };
        
        updateNavHeight();
        window.addEventListener('resize', updateNavHeight);
    }

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            console.log('Menu toggled, classes:', navLinks.className);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    } else {
        console.log('Mobile toggle or nav links not found');
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (nav) {
        nav.classList.add('sticky');
    }
}

function initCookieBanner() {
    const STORAGE_KEY = 'slonecznydotyk_cookie_consent';
    const PREFERENCES_KEY = 'slonecznydotyk_cookie_preferences';
    
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');
    const settingsBtn = document.getElementById('cookie-settings');
    const modal = document.getElementById('cookie-modal-overlay');
    const modalClose = document.getElementById('cookie-modal-close');
    const modalDeclineBtn = document.getElementById('cookie-modal-decline');
    const modalSaveBtn = document.getElementById('cookie-modal-save');
    const analyticsCheckbox = document.getElementById('cookie-analytics');
    const marketingCheckbox = document.getElementById('cookie-marketing');
    
    if (!banner) return;
    
    function getConsent() {
        return localStorage.getItem(STORAGE_KEY);
    }
    
    function setConsent(value) {
        localStorage.setItem(STORAGE_KEY, value);
    }
    
    function getCookiePreferences() {
        const prefs = localStorage.getItem(PREFERENCES_KEY);
        if (prefs) {
            try {
                return JSON.parse(prefs);
            } catch (e) {
                return null;
            }
        }
        return null;
    }
    
    function setCookiePreferences(preferences) {
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
        setConsent('set');
    }
    
    function showBanner() {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
    
    function hideBanner() {
        banner.classList.remove('show');
        setTimeout(() => {
            if (banner.parentNode) {
                banner.style.display = 'none';
            }
        }, 500);
    }
    
    function showModal() {
        hideBanner();
        setTimeout(() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            const prefs = getCookiePreferences();
            if (prefs) {
                analyticsCheckbox.checked = prefs.analytics;
                marketingCheckbox.checked = prefs.marketing;
            }
        }, 300);
    }
    
    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function acceptAllCookies() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        setCookiePreferences(preferences);
        hideBanner();
        hideModal();
    }
    
    function acceptNecessaryOnly() {
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        setCookiePreferences(preferences);
        hideBanner();
        hideModal();
    }
    
    function saveCustomPreferences() {
        const preferences = {
            necessary: true,
            analytics: analyticsCheckbox.checked,
            marketing: marketingCheckbox.checked
        };
        setCookiePreferences(preferences);
        hideModal();
    }
    
    const consent = getConsent();
    
    if (!consent) {
        showBanner();
    }
    
    if (acceptBtn) acceptBtn.addEventListener('click', acceptAllCookies);
    if (declineBtn) declineBtn.addEventListener('click', acceptNecessaryOnly);
    if (settingsBtn) settingsBtn.addEventListener('click', showModal);
    if (modalClose) modalClose.addEventListener('click', hideModal);
    if (modalDeclineBtn) modalDeclineBtn.addEventListener('click', acceptNecessaryOnly);
    if (modalSaveBtn) modalSaveBtn.addEventListener('click', saveCustomPreferences);
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    setTimeout(() => {
        const footerCookieLink = document.getElementById('footer-cookie-settings');
        if (footerCookieLink) {
            footerCookieLink.addEventListener('click', (e) => {
                e.preventDefault();
                showModal();
            });
        }
    }, 500);
}



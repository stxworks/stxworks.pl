document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initScrollProgressBar();
    initScrollAnimations();
    initParallax();
    initPromoCounter();
    initSmoothTransitions();
    initCounterAnimation();
    initFormValidation();
    createToastContainer();
    initModalSystem();
    init3DTiltCards();
    initGalleryLightbox();
});

// ============================================
// DARK MODE TOGGLE FUNCTIONALITY
// ============================================
function initThemeToggle() {
    // Apply saved theme only if user explicitly chose dark mode
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Wait for header to be injected by components.js
    setTimeout(() => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', toggleTheme);

        // Also add keyboard support
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }, 100);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Remove theme attribute if switching to light (default)
    if (newTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }
}

// Apply theme before page load to prevent flash of wrong theme
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

function initScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);

    function updateProgressBar() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .promo-banner').forEach(el => {
        el.classList.add('fade-in-trigger');
        observer.observe(el);
    });

    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        scrollRevealObserver.observe(el);
    });

    const gridElements = document.querySelectorAll('.stats-grid > *, .about-grid > *, .services-grid > *, .promotions-grid > *, .testimonials-grid > *');
    gridElements.forEach((el, index) => {
        if (!el.classList.contains('scroll-reveal')) {
            el.classList.add('scroll-reveal');
            el.setAttribute('data-animation', 'fade-up');
            el.setAttribute('data-delay', (index % 3) * 100);
            scrollRevealObserver.observe(el);
        }
    });
}

function initParallax() {
    const heroImage = document.querySelector('.hero-image-main');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const speed = 0.5;
        heroImage.style.transform = `translateY(${scrollPos * speed}px)`;
    });
}

function initPromoCounter() {
    const countdownElements = document.querySelectorAll('.promo-countdown');

    countdownElements.forEach(element => {
        const today = new Date();
        const endDate = new Date('2025-12-31T23:59:59');
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

        if (daysLeft > 0) {
            element.textContent = `(${daysLeft} dni)`;
        } else {
            element.textContent = '(promocja zakończona)';
        }
    });
}

function initSmoothTransitions() {
    const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"]):not([href^="tel"]):not([href^="mailto"])');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && !href.startsWith('#')) {
                e.preventDefault();

                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 0.3s ease-out';
                document.body.style.opacity = '0';

                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            document.body.style.opacity = '1';
        }
    });
}

function initCounterAnimation() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });
}

function animateCounter(element) {
    const finalValue = element.textContent.trim();
    const numericMatch = finalValue.match(/\d+/);

    if (!numericMatch) return;

    const numericValue = parseInt(numericMatch[0]);
    const suffix = finalValue.replace(/\d+/, '').trim();
    const startValue = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (numericValue - startValue) * easedProgress);

        element.textContent = currentValue + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = finalValue;
        }
    }

    requestAnimationFrame(updateCounter);
}

function init3DTiltCards() {
    const cards = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .promo-banner');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'none';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.26, 0.64, 1)';
            this.style.transform = '';
        });
    });
}

function createToastContainer() {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

function showToast(message, type = 'info', duration = 4000) {
    const container = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, duration);
}

function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('focus', clearError);
        });

        form.addEventListener('submit', handleFormSubmit);
    });
}

function validateInput(event) {
    const input = event.target;
    let isValid = true;
    let errorMessage = '';

    if (input.type === 'text' && input.name === 'name') {
        if (input.value.trim().length < 3) {
            isValid = false;
            errorMessage = 'Imię musi mieć co najmniej 3 znaki';
        }
    }

    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'Podaj prawidłowy email';
        }
    }

    if (input.tagName === 'TEXTAREA' && input.name === 'message') {
        if (input.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Wiadomość musi mieć co najmniej 10 znaków';
        }
    }

    if (!isValid) {
        input.style.borderColor = '#f44336';
        input.title = errorMessage;
        showToast(errorMessage, 'error', 3000);
    } else {
        input.style.borderColor = '#4CAF50';
    }

    return isValid;
}

function clearError(event) {
    event.target.style.borderColor = '';
    event.target.title = '';
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const inputs = form.querySelectorAll('input, textarea');
    let allValid = true;

    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            allValid = false;
        }
    });

    if (allValid) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = 'Wysyłanie...';
        submitButton.style.opacity = '0.6';

        const now = new Date();
        const timeString = now.toLocaleString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const templateParams = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
            reply_to: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value,
            time: timeString
        };

        if (typeof emailjs !== 'undefined') {
            emailjs.send('service_6foy92l', 'template_vukzysd', templateParams)
                .then(function (response) {
                    showToast('✓ Wiadomość wysłana pomyślnie!', 'success', 4000);
                    form.reset();
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                    });

                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                }, function (error) {
                    showToast('Błąd wysyłania. Spróbuj ponownie lub zadzwoń.', 'error', 5000);

                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.style.opacity = '1';
                });
        } else {
            showToast('✓ Wiadomość wysłana pomyślnie!', 'success', 4000);
            form.reset();
            inputs.forEach(input => {
                input.style.borderColor = '';
            });

            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            submitButton.style.opacity = '1';
        }
    }
}

function initModalSystem() {
    let currentModal = null;

    window.openModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        currentModal = modal;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    };

    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentModal = null;
    };

    window.createModal = function (options = {}) {
        const {
            title = 'Modal',
            content = '',
            size = '',
            showFooter = true,
            onConfirm = null,
            onCancel = null
        } = options;

        const modalId = 'dynamic-modal-' + Date.now();
        const modalHTML = `
            <div class="modal-overlay" id="${modalId}">
                <div class="modal ${size ? 'modal-' + size : ''}">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close" onclick="closeModal('${modalId}')">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${showFooter ? `
                        <div class="modal-footer">
                            <button class="btn btn-secondary" onclick="closeModal('${modalId}')">Anuluj</button>
                            <button class="btn btn-primary" id="${modalId}-confirm">Potwierdź</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById(modalId);

        if (onConfirm) {
            const confirmBtn = document.getElementById(`${modalId}-confirm`);
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    onConfirm();
                    closeModal(modalId);
                });
            }
        }

        setTimeout(() => openModal(modalId), 10);

        return modalId;
    };

    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal-overlay');
            if (modal && modal.id) {
                closeModal(modal.id);
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && currentModal) {
            closeModal(currentModal.id);
        }
    });
}

function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    if (galleryImages.length === 0) return;

    let currentImageIndex = 0;
    const imageArray = Array.from(galleryImages);

    const lightboxHTML = `
        <div class="lightbox-overlay" id="gallery-lightbox">
            <button class="lightbox-close" aria-label="Zamknij">&times;</button>
            <button class="lightbox-prev" aria-label="Poprzednie">&#10094;</button>
            <button class="lightbox-next" aria-label="Następne">&#10095;</button>
            <div class="lightbox-content">
                <div class="lightbox-image-container">
                    <img src="" alt="" class="lightbox-image active">
                    <img src="" alt="" class="lightbox-image">
                </div>
                <div class="lightbox-counter"></div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImages = lightbox.querySelectorAll('.lightbox-image');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let activeImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage(direction = 'none') {
        const currentImage = lightboxImages[activeImageIndex];
        const nextImageIndex = activeImageIndex === 0 ? 1 : 0;
        const nextImage = lightboxImages[nextImageIndex];

        const img = imageArray[currentImageIndex];
        nextImage.src = img.src;
        nextImage.alt = img.alt;

        nextImage.classList.remove('slide-in-right', 'slide-in-left', 'fade-in-image', 'active');

        void nextImage.offsetWidth;

        if (direction === 'next') {
            nextImage.classList.add('slide-in-right');
        } else if (direction === 'prev') {
            nextImage.classList.add('slide-in-left');
        } else {
            nextImage.classList.add('fade-in-image');
        }

        setTimeout(() => {
            nextImage.classList.add('active');
            currentImage.classList.remove('active');
            activeImageIndex = nextImageIndex;
        }, 10);

        lightboxCounter.textContent = `${currentImageIndex + 1} / ${imageArray.length}`;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
        updateLightboxImage('next');
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        updateLightboxImage('prev');
    }

    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const lightboxContent = lightbox.querySelector('.lightbox-content');

    lightboxContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightboxContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        const minSwipeDistance = 50;

        // Check if horizontal swipe is dominant
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                // Swipe left - show next
                showNextImage();
            } else {
                // Swipe right - show prev
                showPrevImage();
            }
        }
    }
}

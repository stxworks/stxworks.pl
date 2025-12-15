/**
 * GreenSpace - Main JavaScript
 * Funkcje wspólne dla wszystkich stron
 */

document.addEventListener('DOMContentLoaded', function () {
  // Czekaj na załadowanie komponentów przed inicjalizacją
  // components.js ładuje navbar/footer i wywołuje initNavbar/initScrollEffects

  // Inicjalizuj płynne przejścia między stronami
  initSmoothTransitions();

  // Inicjalizuj tylko funkcje specyficzne dla danej strony
  initSmoothScroll();
  initScrollAnimations();

  // Funkcje specyficzne dla strony głównej - slider usunięty, teraz grid CSS

  if (document.getElementById('contactForm')) {
    initContactForm();
  }


  if (document.getElementById('newsletterForm')) {
    initNewsletterForm();
  }

  if (document.querySelector('.gallery-item')) {
    initGalleryFilters();
    initGalleryLightbox();
  }

  if (document.querySelector('.stat-number')) {
    initStatsCounter();
  }

  if (document.querySelector('.accordion')) {
    initAccordion();
  }

  if (document.querySelector('.ba-slider')) {
    initBeforeAfterSlider();
  }

  // Scroll indicator - przewijanie w dół po kliknięciu
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.style.cursor = 'pointer';
    scrollIndicator.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = aboutSection.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
});

// Płynne przejścia między stronami (fade effect, pomija index.html)
function initSmoothTransitions() {
  // Utwórz overlay dla animacji fade
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Fade-in przy ładowaniu strony
  document.body.classList.add('page-loaded');

  // Obsługuj kliknięcia w linki wewnętrzne
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');

    if (!link) return;

    const href = link.getAttribute('href');

    // Pomijaj: linki zewnętrzne, hash linki, mailto, tel, puste linki
    if (!href ||
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      link.hasAttribute('target') ||
      link.hasAttribute('download') ||
      e.ctrlKey || e.metaKey) {
      return;
    }

    // Sprawdź czy to link do innej strony w projekcie (nie do index)
    if (href.endsWith('.html') || href === '/' || href === './') {

      // Pomiń animację dla strony głównej - ma własny preloader
      const isHomepage = href === 'index.html' ||
        href === './index.html' ||
        href === '/index.html' ||
        href === '/' ||
        href === './';

      if (isHomepage) {
        // Strona główna - bez animacji fade, przejdź bezpośrednio
        return;
      }

      e.preventDefault();

      // Animacja fade out
      overlay.classList.add('active');
      document.body.classList.add('page-transitioning');

      // Przejdź do nowej strony po zakończeniu animacji
      setTimeout(() => {
        window.location.href = href;
      }, 350);
    }
  });

  // Obsługa przycisku wstecz/dalej w przeglądarce
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      // Strona została załadowana z cache (przycisk wstecz)
      overlay.classList.remove('active');
      document.body.classList.remove('page-transitioning');
      document.body.classList.add('page-loaded');
    }
  });
}

// Smooth scroll dla linków z hash

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navbar = document.getElementById('navbar');
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animacje przy scroll (Intersection Observer)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Elementy z podstawową animacją (BEZ process-step - ma własny staggered observer)
  const elements = document.querySelectorAll(
    '.service-card, .gallery-item, .contact-item, ' +
    '.team-card, .value-card, .pricing-card, .timeline-item'
  );

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Dedykowany observer dla process-steps (staggered animation)
  const processStepsContainers = document.querySelectorAll('.process-steps');
  if (processStepsContainers.length > 0) {
    const stepsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Dodaj klasę do wszystkich kroków - CSS transition-delay zapewni staggered effect
          const steps = entry.target.querySelectorAll('.process-step');
          steps.forEach(step => {
            step.classList.add('animate-in');
          });
          stepsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    processStepsContainers.forEach(container => {
      stepsObserver.observe(container);
    });
  }
}

// Slider opinii klientów - SIMPLE CROSSFADE
function initTestimonialsSlider() {
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');
  const cards = Array.from(document.querySelectorAll('.testimonial-card'));

  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

  // Usuń klony jeśli istnieją
  document.querySelectorAll('.testimonial-card.clone').forEach(c => c.remove());

  const totalCards = cards.length;
  let currentIndex = 0;
  let autoSlideInterval = null;
  let isAnimating = false;
  let isPaused = false;

  // Parametry animacji
  const FADE_DURATION = 300; // ms

  // Inicjalizacja - ukryj wszystkie karty oprócz pierwszej
  cards.forEach((card, index) => {
    card.style.position = index === 0 ? 'relative' : 'absolute';
    card.style.top = '0';
    card.style.left = '0';
    card.style.width = '100%';
    card.style.opacity = index === 0 ? '1' : '0';
    card.style.visibility = index === 0 ? 'visible' : 'hidden';
    card.style.transition = `opacity ${FADE_DURATION}ms ease`;
    card.style.pointerEvents = index === 0 ? 'auto' : 'none';
  });

  // Track styling
  track.style.position = 'relative';

  // Tworzenie kropek nawigacyjnych
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Przejdź do opinii ${i + 1}`);
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }

    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.slider-dot');
      if (dot && !isAnimating) {
        const index = parseInt(dot.dataset.index, 10);
        if (index !== currentIndex) {
          slideTo(index);
        }
      }
    });
  }

  function updateDots() {
    const dots = dotsContainer?.querySelectorAll('.slider-dot');
    if (dots) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  // Prosta animacja crossfade
  function slideTo(newIndex) {
    if (isAnimating || newIndex === currentIndex) return false;

    isAnimating = true;

    const currentCard = cards[currentIndex];
    const nextCard = cards[newIndex];

    // Fade out bieżącej karty
    currentCard.style.opacity = '0';

    // Po fade out, przełącz karty
    setTimeout(() => {
      // Ukryj starą kartę
      currentCard.style.visibility = 'hidden';
      currentCard.style.position = 'absolute';
      currentCard.style.pointerEvents = 'none';

      // Pokaż nową kartę
      nextCard.style.visibility = 'visible';
      nextCard.style.position = 'relative';
      nextCard.style.pointerEvents = 'auto';

      // Fade in nowej karty
      requestAnimationFrame(() => {
        nextCard.style.opacity = '1';
      });

      currentIndex = newIndex;
      updateDots();

      // Zakończ animację po fade in
      setTimeout(() => {
        isAnimating = false;
      }, FADE_DURATION);
    }, FADE_DURATION);

    return true;
  }

  function nextSlide() {
    if (isAnimating) return;
    const nextIndex = (currentIndex + 1) % totalCards;
    slideTo(nextIndex);
  }

  function prevSlide() {
    if (isAnimating) return;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    slideTo(prevIndex);
  }

  function startAutoSlide() {
    stopAutoSlide();
    if (!isPaused) {
      autoSlideInterval = setInterval(() => {
        if (!isAnimating && !isPaused) {
          nextSlide();
        }
      }, 6000);
    }
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Event listeners
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    resetAutoSlide();
  });

  // Pauza na hover
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      isPaused = true;
      stopAutoSlide();
    });
    slider.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoSlide();
    });
  }

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let isTouching = false;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    isTouching = true;
    isPaused = true;
    stopAutoSlide();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    touchEndX = e.changedTouches[0].screenX;
    isTouching = false;

    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (!isAnimating) {
      if (diff > swipeThreshold) {
        nextSlide();
      } else if (diff < -swipeThreshold) {
        prevSlide();
      }
    }

    isPaused = false;
    startAutoSlide();
  }, { passive: true });

  // Start auto-slide
  startAutoSlide();
}

// Filtry galerii
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0) return;

  // Ustawienie początkowych stylów dla animacji
  galleryItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  let isFiltering = false;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isFiltering) return; // Zapobiega klikaniu podczas animacji

      const filter = btn.getAttribute('data-filter');

      // Aktualizuj aktywny przycisk
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      isFiltering = true;

      // Krok 1: Ukryj wszystkie elementy (które nie pasują lub wszystkie jeśli zmiana kategorii)
      const itemsToHide = [];
      const itemsToShow = [];

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          itemsToShow.push(item);
        } else {
          itemsToHide.push(item);
        }
      });

      // Najpierw ukryj elementy które nie pasują
      itemsToHide.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
      });

      // Po zakończeniu animacji ukrywania, ukryj całkowicie i pokaż nowe
      setTimeout(() => {
        // Ukryj nieodpowiednie elementy
        itemsToHide.forEach(item => {
          item.style.display = 'none';
        });

        // Pokaż odpowiednie elementy
        itemsToShow.forEach(item => {
          // Najpierw przygotuj element (ukryty, ale w DOM)
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
        });

        // Po krótkim opóźnieniu animuj wejście
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            itemsToShow.forEach(item => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          });
        });

        // Odblokuj filtrowanie po zakończeniu animacji
        setTimeout(() => {
          isFiltering = false;
        }, 300);
      }, 300);
    });
  });
}

// Lightbox dla galerii
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
}

function openLightbox(startIndex) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = startIndex;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></button>
      <img src="" alt="">
      <button class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></button>
      <div class="lightbox-caption"></div>
    </div>
  `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = 'hidden';

  const img = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');

  function updateImage() {
    const item = galleryItems[currentIndex];
    const itemImg = item.querySelector('img');
    const overlay = item.querySelector('.gallery-overlay');

    img.src = itemImg.src;
    img.alt = itemImg.alt;

    if (overlay) {
      const title = overlay.querySelector('h4')?.textContent || '';
      const location = overlay.querySelector('p')?.textContent || '';
      caption.textContent = title + (location ? ' - ' + location : '');
    }
  }

  updateImage();

  setTimeout(() => lightbox.classList.add('active'), 10);

  // Event listeners
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateImage();
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateImage();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  function handleKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateImage();
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateImage();
    }
  }
  document.addEventListener('keydown', handleKeydown);

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.removeEventListener('keydown', handleKeydown);
    setTimeout(() => {
      lightbox.remove();
      document.body.style.overflow = '';
    }, 300);
  }
}

// Formularz kontaktowy z walidacją, honeypot i loading state
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');

  // Funkcja do pokazywania/ukrywania loading state
  function setLoading(isLoading) {
    if (!submitBtn) return;

    submitBtn.disabled = isLoading;
    if (btnText) btnText.style.display = isLoading ? 'none' : 'inline-flex';
    if (btnLoading) btnLoading.style.display = isLoading ? 'inline-flex' : 'none';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Sprawdź honeypot - jeśli wypełnione, to bot
    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      console.warn('Bot detected via honeypot');
      showToast('Wystąpił błąd. Spróbuj ponownie.', 'error');
      return;
    }

    if (validateForm(form)) {
      setLoading(true);

      // Symulacja wysyłania (w prawdziwej aplikacji: fetch do backendu)
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Usuń honeypot z danych
        delete data.website;

        console.log('Form submission:', data);

        // Symulacja opóźnienia sieciowego
        await new Promise(resolve => setTimeout(resolve, 1500));

        showToast('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.', 'success');
        form.reset();
        clearValidation(form);
      } catch (error) {
        console.error('Form error:', error);
        showToast('Wystąpił błąd. Spróbuj ponownie później.', 'error');
      } finally {
        setLoading(false);
      }
    }
  });

  // Real-time validation
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group')?.classList.contains('error')) {
        validateField(field);
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  form.querySelectorAll('[required]').forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  return isValid;
}

function validateField(field) {
  const formGroup = field.closest('.form-group');
  if (!formGroup) return true;

  let isValid = true;
  let message = '';

  // Required check
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    message = 'To pole jest wymagane';
  }

  // Email validation
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      message = 'Podaj prawidłowy adres email';
    }
  }

  // Phone validation
  if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\d\s\-+()]{9,}$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      message = 'Podaj prawidłowy numer telefonu';
    }
  }

  // Update UI
  formGroup.classList.remove('error', 'success');
  let errorEl = formGroup.querySelector('.error-message');

  if (!isValid) {
    formGroup.classList.add('error');
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      formGroup.appendChild(errorEl);
    }
    errorEl.textContent = message;
  } else if (field.value) {
    formGroup.classList.add('success');
  }

  return isValid;
}

function clearValidation(form) {
  form.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error', 'success');
  });
}

// Newsletter form
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;

    if (email) {
      console.log('Newsletter subscription:', email);
      showToast('Zapisano do newslettera!', 'success');
      form.reset();
    }
  });
}

// Animowane liczniki
function initStatsCounter() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        stats.forEach(stat => animateCounter(stat));
      }
    });
  }, { threshold: 0.5 });

  // Observe parent section
  const section = stats[0].closest('section');
  if (section) {
    observer.observe(section);
  }
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  if (isNaN(target)) return;

  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Accordion FAQ
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    // Upewnij się, że content ma transition
    if (content) {
      content.style.transition = 'max-height 0.35s ease, opacity 0.25s ease';
      content.style.overflow = 'hidden';
    }

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Animuj zamknięcie wszystkich innych elementów
      accordionItems.forEach(i => {
        if (i === item) return; // Pomiń kliknięty element

        const iContent = i.querySelector('.accordion-content');
        if (i.classList.contains('active') && iContent) {
          // Najpierw ustaw obecną wysokość, potem animuj do 0
          iContent.style.maxHeight = iContent.scrollHeight + 'px';
          // Wymuś reflow
          iContent.offsetHeight;
          // Animuj zamknięcie
          iContent.style.maxHeight = '0';
          iContent.style.opacity = '0';
          i.classList.remove('active');
        }
      });

      // Toggle klikniętego elementu
      if (!isActive) {
        item.classList.add('active');
        if (content) {
          content.style.opacity = '1';
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      } else {
        // Zamknij kliknięty element z animacją
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.offsetHeight; // reflow
          content.style.maxHeight = '0';
          content.style.opacity = '0';
        }
        item.classList.remove('active');
      }
    });
  });
}

// Toast notifications
function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');

  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast ${type}`;

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Before/After Slider - interaktywne porównanie zdjęć
function initBeforeAfterSlider() {
  const sliders = document.querySelectorAll('.ba-slider');

  sliders.forEach(slider => {
    const handle = slider.querySelector('.ba-handle');
    const beforeDiv = slider.querySelector('.ba-before');
    const beforeImg = beforeDiv?.querySelector('img');

    if (!handle || !beforeDiv || !beforeImg) return;

    let isDragging = false;

    // Ustaw szerokość obrazka 'before' na szerokość całego slidera
    function setBeforeImageWidth() {
      const sliderWidth = slider.offsetWidth;
      beforeImg.style.width = sliderWidth + 'px';
      beforeImg.style.minWidth = sliderWidth + 'px';
      beforeImg.style.maxWidth = sliderWidth + 'px';
    }

    // Inicjalizuj szerokość
    setBeforeImageWidth();

    // Aktualizuj przy resize
    window.addEventListener('resize', setBeforeImageWidth);

    function updateSlider(x) {
      const rect = slider.getBoundingClientRect();
      let percentage = ((x - rect.left) / rect.width) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      handle.style.left = percentage + '%';
      beforeDiv.style.width = percentage + '%';
    }

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
      isDragging = true;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) {
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Click anywhere on slider
    slider.addEventListener('click', (e) => {
      if (e.target !== handle && !handle.contains(e.target)) {
        updateSlider(e.clientX);
      }
    });
  });
}

// Console branding
console.log('%c GreenSpace Portfolio Project', 'color: #2d6a4f; font-size: 20px; font-weight: bold;');
console.log('%cStrona zbudowana w czystym HTML, CSS i JavaScript', 'color: #52b788; font-size: 14px;');
console.log('%cDemo: Multi-page, komponenty, animacje, galeria, formularze', 'color: #95d5b2; font-size: 12px;');

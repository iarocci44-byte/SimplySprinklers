document.addEventListener('DOMContentLoaded', () => {
  const rotator = document.querySelector('.rotator');
  if (!rotator) return;

  const images = Array.from(rotator.querySelectorAll('.rotator__img'));
  let current = 0;
  const intervalMs = 3000;
  let timer = null;

  function show(index) {
    images.forEach((img, i) => img.classList.toggle('active', i === index));
    current = index;
  }

  function next() {
    show((current + 1) % images.length);
  }

  function start() {
    stop();
    timer = setInterval(next, intervalMs);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // start rotation
  show(0);
  start();

  // pause on hover/focus for accessibility
  rotator.addEventListener('mouseenter', stop);
  rotator.addEventListener('mouseleave', start);
  rotator.addEventListener('focusin', stop);
  rotator.addEventListener('focusout', start);
 // rotator.addEventListener('mouseover', function() {
 //   rotator.style.transform = 'scale(1.02)';
 // });
 // rotator.addEventListener('mouseleave', function() {
 //   rotator.style.transform = 'scale(1)';
 // });

  // --- Services modal logic ---
  const servicesLink = document.getElementById('nav-services');
  const modal = document.getElementById('services-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('services-close');
  const aboutLink = document.getElementById('nav-about');
  const aboutModal = document.getElementById('about-modal');
  const aboutClose = document.getElementById('about-close');
  const freeEstimate = document.getElementById('free-estimate');
  const promoContact = document.getElementById('promo-contact');

  // generic open/close for any modal element (panelEl should be the aside element)
  function openModal(panelEl, focusTarget) {
    if (!panelEl || !backdrop) return;
    panelEl.classList.add('open');
    backdrop.classList.add('show');
    panelEl.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal(panelEl, returnFocusTo) {
    // if panelEl omitted, close any open panel
    const panel = panelEl || document.querySelector('.modal.open');
    if (!panel || !backdrop) return;
    panel.classList.remove('open');
    backdrop.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    if (returnFocusTo) returnFocusTo.focus();
  }

  if (servicesLink) {
    servicesLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modal, closeBtn);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal, servicesLink));
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(aboutModal, aboutClose);
    });
  }
  if (freeEstimate) {
    freeEstimate.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(aboutModal, aboutClose);
    });
  }
  if (promoContact) {
    promoContact.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(aboutModal, aboutClose);
    });
  }
  if (aboutClose) aboutClose.addEventListener('click', () => closeModal(aboutModal, aboutLink));
  if (backdrop) backdrop.addEventListener('click', () => closeModal());

  // Escape key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openPanel = document.querySelector('.modal.open');
      if (openPanel) {
        // determine return focus target: services or about link
        if (openPanel.id === 'services-modal') closeModal(openPanel, servicesLink);
        else if (openPanel.id === 'about-modal') closeModal(openPanel, aboutLink);
        else closeModal(openPanel);
      }
    }
  });

  // --- Promo Banner logic ---
  const promoBanner = document.querySelector('.promo-banner');
  const promoClose = document.querySelector('.promo-banner__close');

  if (promoClose && promoBanner) {
    promoClose.addEventListener('click', () => {
      promoBanner.classList.add('hidden');
    });
  }
});

const openVideoBtn = document.getElementById('openVideo');
const videoOverlay = document.getElementById('videoOverlay');
const closeVideoBtn = document.getElementById('closeVideo');
const youtubeVideo = document.getElementById('youtubeVideo');

if (openVideoBtn && videoOverlay && closeVideoBtn && youtubeVideo) {
  const originalVideoSrc = youtubeVideo.src;
  const autoplaySeparator = originalVideoSrc.includes('?') ? '&' : '?';

  openVideoBtn.addEventListener('click', () => {
    videoOverlay.style.display = 'flex';
    youtubeVideo.src = `${originalVideoSrc}${autoplaySeparator}autoplay=1`;
  });

  const closePopup = () => {
    videoOverlay.style.display = 'none';
    youtubeVideo.src = originalVideoSrc;
  };

  closeVideoBtn.addEventListener('click', closePopup);
  window.addEventListener('click', (event) => {
    if (event.target === videoOverlay) closePopup();
  });
}

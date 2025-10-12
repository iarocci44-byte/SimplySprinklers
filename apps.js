document.addEventListener('DOMContentLoaded', () => {
  const rotator = document.querySelector('.rotator');
  if (!rotator) return;

  const images = Array.from(rotator.querySelectorAll('.rotator__img'));
  let current = 0;
  const intervalMs = 3500;
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

  function openModal() {
    if (!modal || !backdrop) return;
    modal.classList.add('open');
    backdrop.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    backdrop.setAttribute('aria-hidden', 'false');
    // focus the close button for keyboard users
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal || !backdrop) return;
    modal.classList.remove('open');
    backdrop.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('aria-hidden', 'true');
    // return focus to services link
    if (servicesLink) servicesLink.focus();
  }

  if (servicesLink) {
    servicesLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // only close if modal is open
      if (modal && modal.classList.contains('open')) closeModal();
    }
  });
});

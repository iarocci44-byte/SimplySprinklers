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
});

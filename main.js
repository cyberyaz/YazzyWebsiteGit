// main.js
// Wait until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // ——— 0) FADE-IN PANEL OPACITY ———
  const hero = document.querySelector('.hero');
  const panel = document.querySelector('.content');
  const maxAlpha = 0.85; // final panel opacity

  function updatePanelOpacity() {
    const scrollY = window.scrollY;
    const heroH = hero.offsetHeight;
    // Compute scroll ratio (0 when at top, 1 once scrolled past hero)
    const ratio = Math.min(Math.max(scrollY / heroH, 0), 1);
    // Set CSS var --panel-opacity on .content from 0 → maxAlpha
    panel.style.setProperty('--panel-opacity', (ratio * maxAlpha).toString());
  }

  // Run on scroll and also once on load (in case you reload mid-page)
  window.addEventListener('scroll', updatePanelOpacity);
  updatePanelOpacity();

  // ——— 1) SCROLL-REVEAL FOR INNER SECTIONS ———
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // ---- EMAILJS ----
  emailjs.init({ publicKey: 'LTMepkSyKB00m6D14' });

  const SERVICE_ID  = 'service_s7zzc37';
  const TEMPLATE_ID = 'template_2bog4a9';

  const form   = document.getElementById('contact-form');
  const status = form.querySelector('.status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        status.textContent = 'Message sent!';
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        status.textContent = 'Oops, something went wrong.';
      });
  });
});
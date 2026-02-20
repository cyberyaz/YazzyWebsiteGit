// main.js
document.addEventListener('DOMContentLoaded', () => {

  // ─── 0) FOOTER YEAR ───
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // ─── 1) NAV: scroll tint + mobile toggle ───
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── 2) PANEL OPACITY (scroll fade-in) ───
  const hero = document.querySelector('.hero');
  const panel = document.querySelector('.content');

  function updatePanelOpacity() {
    if (!hero || !panel) return;
    const ratio = Math.min(Math.max(window.scrollY / hero.offsetHeight, 0), 1);
    panel.style.setProperty('--panel-opacity', ratio.toFixed(3));
  }
  window.addEventListener('scroll', updatePanelOpacity, { passive: true });
  updatePanelOpacity();

  // ─── 3) SCROLL-REVEAL ───
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ─── 4) EMAILJS CONTACT FORM ───
  emailjs.init({ publicKey: 'LTMepkSyKB00m6D14' });

  const SERVICE_ID  = 'service_s7zzc37';
  const TEMPLATE_ID = 'template_2bog4a9';

  const form   = document.getElementById('contact-form');
  const status = form ? form.querySelector('.status') : null;

  if (form && status) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.textContent = 'Sending…';

      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
        .then(() => {
          status.textContent = '✓ Message sent — we\'ll be in touch soon!';
          status.style.color = '#2a7a2a';
          form.reset();
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          status.textContent = 'Oops, something went wrong. Try emailing directly.';
          status.style.color = '#c0392b';
        })
        .finally(() => {
          btn.disabled = false;
        });
    });
  }

});
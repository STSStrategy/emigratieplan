// Emigratieplan — site interactions
// Minimal JS. Geen tracking. Geen frameworks.

(function () {
  'use strict';

  // FAQ: close others when one opens (accordion behavior)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', (e) => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item && other.open) other.open = false;
        });
      }
    });
  });

  // Smooth scroll for in-page anchors (in case CSS scroll-behavior is overridden)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 72; // sticky header height
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', href);
    });
  });

  // Lemon Squeezy: detect when overlay closes — placeholder for analytics later
  // LS auto-binds elements with the `lemonsqueezy-button` class.
  // If you ever want to track checkout opens, hook in here.
  // window.createLemonSqueezy?.(); is auto-handled by lemon.js

})();

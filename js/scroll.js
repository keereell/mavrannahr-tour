/* ============================================
   Mavrannahr Tour — scroll.js
   Intersection Observer animations
   Respects prefers-reduced-motion
   ============================================ */

(function () {
  'use strict';

  function init() {
    // Only consider elements not yet observed
    const elements = document.querySelectorAll('[data-animate]:not([data-scroll-init])');
    if (elements.length === 0) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) {
        el.dataset.scrollInit = '1';
        el.classList.add('in-view');
      });
      return;
    }

    // Fallback for old browsers — show immediately
    if (!('IntersectionObserver' in window)) {
      elements.forEach(function (el) {
        el.dataset.scrollInit = '1';
        el.classList.add('in-view');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -80px 0px'
    });

    elements.forEach(function (el) {
      el.dataset.scrollInit = '1';
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // Re-init after partials load (in case partials add animated elements)
  document.addEventListener('mavr:partials-loaded', init);
})();

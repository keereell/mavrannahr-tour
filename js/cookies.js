/* ============================================
   FENIX MULTIGLOBAL — cookies.js
   Cookie consent banner with localStorage memory
   ============================================ */

(function () {
  'use strict';

  const STORAGE_KEY = 'mavr_cookies_ok';

  function isAccepted() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (e) { /* */ }
  }

  function buildBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie usage');
    banner.setAttribute('data-i18n-attr', 'aria-label:cookie.aria');

    banner.innerHTML = '\n      <p class="cookie-text">\n        <span data-i18n="cookie.text">Saytimiz cookie-fayllardan foydalanadi.</span>\n        <a href="terms.html#cookies" data-i18n="cookie.link">Batafsil</a>\n      </p>\n      <button type="button" class="btn btn-fill" data-i18n="cookie.accept">Roziman</button>\n    ';
    document.body.appendChild(banner);

    // Apply current language if i18n loaded
    if (window.MavrI18n) {
      window.MavrI18n.apply(window.MavrI18n.current());
    }

    // Animate in
    requestAnimationFrame(function () {
      banner.classList.add('is-visible');
    });

    // Accept handler
    banner.querySelector('button').addEventListener('click', function () {
      accept();
      banner.classList.remove('is-visible');
      setTimeout(function () { banner.remove(); }, 500);
    });
  }

  function init() {
    if (isAccepted()) return;
    // Slight delay so banner doesn't appear instantly
    setTimeout(buildBanner, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ============================================
   Mavrannahr Tour — partials.js
   Fetch и inject navbar/footer
   ============================================ */

(function () {
  'use strict';

  async function injectPartial(el) {
    const url = el.getAttribute('data-include');
    if (!url) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load ' + url);
      const html = await res.text();
      el.outerHTML = html;
    } catch (err) {
      console.error('Partial load error:', err);
      el.outerHTML = '<!-- partial failed: ' + url + ' -->';
    }
  }

  async function loadAllPartials() {
    const targets = Array.from(document.querySelectorAll('[data-include]'));
    await Promise.all(targets.map(injectPartial));
  }

  // Expose
  window.MavrPartials = {
    load: loadAllPartials,
    inject: injectPartial
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAfterDom);
  } else {
    initAfterDom();
  }

  async function initAfterDom() {
    await loadAllPartials();
    // dispatch event so main.js / i18n.js can initialise nav
    document.dispatchEvent(new CustomEvent('mavr:partials-loaded'));
  }
})();

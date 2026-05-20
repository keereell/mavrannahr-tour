/* ============================================
   Mavrannahr Tour — accordion.js
   FAQ accordion with keyboard navigation + ARIA
   ============================================ */

(function () {
  'use strict';

  function init() {
    const items = document.querySelectorAll('.faq-item');
    if (items.length === 0) return;

    items.forEach(function (item, idx) {
      // Skip already-initialized items (init may fire twice: DOMContentLoaded + partials-loaded)
      if (item.dataset.faqInit) return;
      item.dataset.faqInit = '1';

      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');
      if (!trigger || !panel) return;

      // ARIA setup
      const id = 'faq-panel-' + idx;
      panel.id = id;
      trigger.setAttribute('aria-controls', id);
      trigger.setAttribute('aria-expanded', 'false');

      trigger.addEventListener('click', function () {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        toggle(item, !isOpen);
      });

      // keyboard: up/down navigate, home/end jump
      trigger.addEventListener('keydown', function (e) {
        const triggers = Array.from(document.querySelectorAll('.faq-trigger'));
        const i = triggers.indexOf(trigger);
        let target = null;
        switch (e.key) {
          case 'ArrowDown':
            target = triggers[(i + 1) % triggers.length];
            break;
          case 'ArrowUp':
            target = triggers[(i - 1 + triggers.length) % triggers.length];
            break;
          case 'Home':
            target = triggers[0];
            break;
          case 'End':
            target = triggers[triggers.length - 1];
            break;
        }
        if (target) {
          e.preventDefault();
          target.focus();
        }
      });
    });
  }

  function toggle(item, open) {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    const inner = panel.querySelector('.faq-panel-inner');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      panel.style.maxHeight = (inner.scrollHeight + 4) + 'px';
    } else {
      panel.style.maxHeight = '0px';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('mavr:partials-loaded', init);

  // re-measure on lang change in case translated text changes height
  document.addEventListener('mavr:lang', function () {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      const trigger = item.querySelector('.faq-trigger');
      if (trigger && trigger.getAttribute('aria-expanded') === 'true') {
        toggle(item, true);
      }
    });
  });
})();

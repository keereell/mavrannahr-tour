/* ============================================
   Mavrannahr Tour — main.js
   Init: navbar, mobile menu, lang switcher,
   smooth scroll, top-back button, email obfuscation
   ============================================ */

(function () {
  'use strict';

  // ──────────────────────────────────────────
  // INITIALIZE EVERYTHING AFTER PARTIALS LOAD
  // ──────────────────────────────────────────
  function init() {
    initNavScroll();
    initMobileMenu();
    initLangSwitcher();
    initActiveNavLink();
    initTopBack();
    initFloatContacts();
    initMobileCTA();
    initEmailObfuscation();
    initSmoothScroll();
    initImageFallback();
    initCallbackModal();
    initReadProgress();
    initTOC();

    // Apply detected language
    if (window.MavrI18n) {
      window.MavrI18n.apply(window.MavrI18n.detect());
    }
  }

  // ──────────────────────────────────────────
  // MOBILE STICKY CTA BAR
  // ──────────────────────────────────────────
  function initMobileCTA() {
    if (document.getElementById('mobile-cta')) return;
    // Skip on error pages (clean UI)
    if (document.body.classList.contains('error-body') ||
        document.querySelector('.error-page')) return;

    const labels = {
      uz: { call: 'Qo\'ng\'iroq', tg: 'Telegram' },
      ru: { call: 'Позвонить', tg: 'Telegram' },
      en: { call: 'Call us',   tg: 'Telegram' }
    };

    const wrap = document.createElement('div');
    wrap.id = 'mobile-cta';
    wrap.className = 'mobile-cta';
    wrap.innerHTML = '\n      <div class="mobile-cta-inner">\n        <a href="tel:+998712000000" class="mobile-cta-btn mobile-cta-call">\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>\n          <span data-mobile-cta="call">Qo\'ng\'iroq</span>\n        </a>\n        <a href="https://t.me/mavrannahr_tour" target="_blank" rel="noopener" class="mobile-cta-btn mobile-cta-tg">\n          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>\n          <span data-mobile-cta="tg">Telegram</span>\n        </a>\n      </div>\n    ';
    document.body.appendChild(wrap);

    function updateLabels(lang) {
      const L = labels[lang] || labels.uz;
      const callEl = wrap.querySelector('[data-mobile-cta="call"]');
      const tgEl = wrap.querySelector('[data-mobile-cta="tg"]');
      if (callEl) callEl.textContent = L.call;
      if (tgEl) tgEl.textContent = L.tg;
    }

    document.addEventListener('mavr:lang', function (e) {
      updateLabels(e.detail.lang);
    });
    if (window.MavrI18n) updateLabels(window.MavrI18n.current());
  }

  // ──────────────────────────────────────────
  // READING PROGRESS BAR (for long pages)
  // ──────────────────────────────────────────
  function initReadProgress() {
    if (!document.body.classList.contains('long-content')) return;
    if (document.getElementById('read-progress')) return;

    const bar = document.createElement('div');
    bar.id = 'read-progress';
    bar.className = 'read-progress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-label', 'Reading progress');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    document.body.appendChild(bar);

    let ticking = false;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  // ──────────────────────────────────────────
  // TABLE OF CONTENTS for legal pages
  // ──────────────────────────────────────────
  function initTOC() {
    const tocContainer = document.querySelector('.toc-sidebar .toc-list');
    if (!tocContainer) return;

    function rebuild() {
      const lang = (window.MavrI18n && window.MavrI18n.current()) || 'uz';
      const activeBlock = document.querySelector('.privacy-content [data-lang="' + lang + '"]');
      if (!activeBlock) return;

      tocContainer.innerHTML = '';
      const headings = activeBlock.querySelectorAll('h2');
      const linksMap = [];
      headings.forEach(function (h, i) {
        const id = 'sec-' + lang + '-' + i;
        h.id = id;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = h.textContent.replace(/^\d+\.\s*/, '');
        li.appendChild(a);
        tocContainer.appendChild(li);
        linksMap.push({ a: a, h: h });
      });

      // Scroll-spy: highlight active section
      function updateActive() {
        const navOffset = 100;
        let active = null;
        for (let i = 0; i < linksMap.length; i++) {
          const top = linksMap[i].h.getBoundingClientRect().top;
          if (top - navOffset <= 0) active = linksMap[i].a;
          else break;
        }
        linksMap.forEach(function (item) {
          item.a.classList.toggle('is-active', item.a === active);
        });
      }

      window.removeEventListener('scroll', window._mavrToc);
      window._mavrToc = function () { requestAnimationFrame(updateActive); };
      window.addEventListener('scroll', window._mavrToc, { passive: true });
      updateActive();
    }

    document.addEventListener('mavr:lang', rebuild);
    setTimeout(rebuild, 100);
  }

  // ──────────────────────────────────────────
  // FLOATING CONTACT BUTTONS — WhatsApp + Telegram
  // ──────────────────────────────────────────
  function initFloatContacts() {
    if (document.getElementById('float-contacts')) return;
    const wrap = document.createElement('div');
    wrap.id = 'float-contacts';
    wrap.className = 'float-contacts';
    wrap.innerHTML = '\n      <a href="https://wa.me/998712000000" target="_blank" rel="noopener" class="float-btn whatsapp" aria-label="WhatsApp">\n        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5l-.7-1.6c-.2-.5-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4 0 1.4 1 2.7 1.2 2.9.2.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.5.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>\n      </a>\n      <a href="https://t.me/mavrannahr_tour" target="_blank" rel="noopener" class="float-btn telegram" aria-label="Telegram">\n        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>\n      </a>\n    ';
    document.body.appendChild(wrap);
    // Show with slight delay after page load
    setTimeout(function () {
      wrap.classList.add('is-visible');
    }, 700);
  }

  // ──────────────────────────────────────────
  // CALLBACK MODAL — "Заказать звонок"
  // ──────────────────────────────────────────
  function initCallbackModal() {
    // Triggers — any link with data-callback attribute
    const triggers = document.querySelectorAll('[data-action="callback"]');
    if (triggers.length === 0) return;

    let modal = document.getElementById('callback-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'callback-modal';
      modal.className = 'modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('aria-labelledby', 'callback-title');
      modal.innerHTML = '\n        <div class="modal-backdrop"></div>\n        <div class="modal-dialog">\n          <button type="button" class="modal-close" aria-label="Close">&times;</button>\n          <h3 id="callback-title" data-i18n="callback.title">Sizga qo\'ng\'iroq qilamiz</h3>\n          <p data-i18n="callback.desc">Ish kunlari davomida 15 daqiqa ichida bog\'lanamiz.</p>\n          <form class="form" id="callback-form" novalidate>\n            <div class="form-field">\n              <label for="cb-name" data-i18n="form.name">Ismingiz</label>\n              <input type="text" id="cb-name" name="name" required autocomplete="name" data-i18n-attr="placeholder:form.name.ph" placeholder="Ali" />\n            </div>\n            <div class="form-field">\n              <label for="cb-phone" data-i18n="form.phone">Telefon</label>\n              <input type="tel" id="cb-phone" name="phone" required autocomplete="tel" data-i18n-attr="placeholder:form.phone.ph" placeholder="+998 90 000-00-00" />\n            </div>\n            <button type="submit" class="btn btn-fill" data-i18n="callback.submit">Qo\'ng\'iroq buyurtma berish</button>\n            <p class="form-hint" data-i18n="callback.hint">Bog\'lanish vaqti: Du-Ju 09:00-18:00</p>\n          </form>\n          <div class="callback-success" hidden role="status" aria-live="polite">\n            <strong data-i18n="callback.success.h">Rahmat!</strong>\n            <span data-i18n="callback.success.b">Tez orada bog\'lanamiz.</span>\n          </div>\n        </div>\n      ';
      document.body.appendChild(modal);

      // Apply i18n to newly added DOM
      if (window.MavrI18n) window.MavrI18n.apply(window.MavrI18n.current());

      // Close handlers
      modal.querySelector('.modal-close').addEventListener('click', closeModal);
      modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      });

      // Form submit (UI only)
      const form = modal.querySelector('#callback-form');
      const successEl = modal.querySelector('.callback-success');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        form.hidden = true;
        successEl.removeAttribute('hidden');
        setTimeout(function () { form.reset(); }, 100);
      });
    }

    function openModal() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      const firstInput = modal.querySelector('input');
      if (firstInput) setTimeout(function () { firstInput.focus(); }, 200);
    }
    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }

    triggers.forEach(function (trigger) {
      if (trigger.dataset.cbInit) return;
      trigger.dataset.cbInit = '1';
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });
  }

  // ──────────────────────────────────────────
  // IMAGE FALLBACK — graceful degradation if CDN fails
  // ──────────────────────────────────────────
  function initImageFallback() {
    // Inline SVG placeholder (light gray with terra accent)
    const placeholder = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="600" height="400" fill="#F0EBE5"/>' +
        '<g fill="none" stroke="#B06060" stroke-width="2" opacity="0.4">' +
          '<circle cx="300" cy="180" r="40"/>' +
          '<path d="M260 240 L300 200 L340 240 L380 220 L380 280 L220 280 L220 250 Z"/>' +
        '</g>' +
        '<text x="300" y="340" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="#8A8078">image unavailable</text>' +
      '</svg>'
    );
    document.querySelectorAll('img').forEach(function (img) {
      if (img.dataset.fallbackInit) return;
      img.dataset.fallbackInit = '1';
      img.addEventListener('error', function () {
        if (img.src === placeholder) return; // avoid loop
        img.src = placeholder;
        img.removeAttribute('srcset');
      });
    });
  }

  // Wait for partials, then init
  document.addEventListener('mavr:partials-loaded', init);
  // Also: if there are no partials on the page, init right away
  document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('[data-include]')) init();
  });

  // ──────────────────────────────────────────
  // NAVBAR scroll state
  // ──────────────────────────────────────────
  function initNavScroll() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    let ticking = false;
    function update() {
      if (window.scrollY > 10) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  // ──────────────────────────────────────────
  // MOBILE MENU — burger toggle, focus trap, ESC
  // ──────────────────────────────────────────
  function initMobileMenu() {
    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('nav-mobile');
    if (!burger || !menu) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('menu-open', open);

      if (open) {
        // focus first link
        const first = menu.querySelector('a');
        if (first) setTimeout(function () { first.focus(); }, 100);
      } else {
        burger.focus();
      }
    }

    burger.addEventListener('click', function () {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
      }
    });

    // Close on link click (mobile menu)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    // Close on outside click (when open)
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || burger.contains(e.target)) return;
      setOpen(false);
    });

    // Focus trap inside open menu
    menu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      const focusables = Array.from(
        menu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  // ──────────────────────────────────────────
  // LANG SWITCHER — click on .nav-lang buttons
  // ──────────────────────────────────────────
  function initLangSwitcher() {
    document.querySelectorAll('.nav-lang button[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const lang = btn.getAttribute('data-lang');
        if (window.MavrI18n) window.MavrI18n.apply(lang);
      });
    });
  }

  // ──────────────────────────────────────────
  // Mark current page in nav (data-nav matches page)
  // ──────────────────────────────────────────
  function initActiveNavLink() {
    // Derive current page name from URL
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const page = path.replace('.html', '') || 'index';
    const map = {
      'index': 'home',
      '': 'home',
      'about': 'about',
      'services': 'services',
      'tours': 'tours',
      'contact': 'contact'
    };
    const current = map[page];
    if (!current) return;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === current) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  // ──────────────────────────────────────────
  // TOP-BACK button
  // ──────────────────────────────────────────
  function initTopBack() {
    let btn = document.getElementById('top-back');
    if (!btn) {
      // create if missing
      btn = document.createElement('button');
      btn.id = 'top-back';
      btn.className = 'top-back';
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="6 15 12 9 18 15"/></svg>';
      document.body.appendChild(btn);
    }

    // localise aria-label
    document.addEventListener('mavr:lang', function (e) {
      const lang = e.detail.lang;
      const labels = { uz: 'Yuqoriga', ru: 'Наверх', en: 'Back to top' };
      btn.setAttribute('aria-label', labels[lang] || 'Back to top');
    });

    let ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  // ──────────────────────────────────────────
  // EMAIL OBFUSCATION
  // <a data-email="info|domain.uz">info(at)domain.uz</a>
  // Converts | to @ and sets href="mailto:..."
  // ──────────────────────────────────────────
  function initEmailObfuscation() {
    document.querySelectorAll('[data-email]').forEach(function (el) {
      const raw = el.getAttribute('data-email');
      if (!raw || !raw.includes('|')) return;
      const email = raw.replace('|', '@');
      el.textContent = email;
      if (el.tagName === 'A') {
        el.setAttribute('href', 'mailto:' + email);
      }
      el.removeAttribute('data-email');
    });
  }

  // ──────────────────────────────────────────
  // SMOOTH SCROLL on anchor links
  // ──────────────────────────────────────────
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
      // update url hash without jump
      history.pushState(null, '', href);
    });
  }
})();

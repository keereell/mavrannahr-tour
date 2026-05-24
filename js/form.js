/* ============================================
   FENIX MULTIGLOBAL — form.js
   Contact form UI validation + success state
   No actual submission — UI only
   ============================================ */

(function () {
  'use strict';

  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Pre-fill from search-widget URL params (?dest=...&date=...&guests=...)
    prefillFromUrl(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Use HTML5 validation
      if (!form.checkValidity()) {
        // Mark invalid fields
        form.querySelectorAll(':invalid').forEach(function (f) {
          f.setAttribute('aria-invalid', 'true');
          f.addEventListener('input', function clearInvalid() {
            if (f.validity.valid) {
              f.removeAttribute('aria-invalid');
              f.removeEventListener('input', clearInvalid);
            }
          });
        });
        // Focus first invalid
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Show success state
      const success = document.getElementById('form-success');
      if (success) {
        form.style.display = 'none';
        success.removeAttribute('hidden');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus for screen readers
        success.setAttribute('tabindex', '-1');
        setTimeout(function () { success.focus(); }, 200);
      }

      // Reset (in case user comes back)
      setTimeout(function () { form.reset(); }, 100);
    });

    // Real-time validation feedback
    form.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('blur', function () {
        if (field.value && !field.validity.valid) {
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.removeAttribute('aria-invalid');
        }
      });
    });
  }

  function prefillFromUrl(form) {
    let params;
    try { params = new URLSearchParams(window.location.search); }
    catch (e) { return; }

    const dest = params.get('dest');
    const date = params.get('date');
    const guests = params.get('guests');
    if (!dest && !date && !guests) return;

    // Build a friendly auto-message
    const msgEl = form.querySelector('#cf-message');
    if (msgEl && !msgEl.value) {
      const lang = (window.MavrI18n && window.MavrI18n.current()) || 'uz';
      const labels = {
        uz: { dest: 'Yo\'nalish', date: 'Sana', guests: 'Sayohatchilar', intro: 'Sayohat haqida so\'rov:' },
        ru: { dest: 'Направление', date: 'Дата', guests: 'Путешественники', intro: 'Запрос по туру:' },
        en: { dest: 'Destination', date: 'Date', guests: 'Travellers', intro: 'Tour enquiry:' }
      };
      const L = labels[lang] || labels.uz;
      const parts = [L.intro];
      if (dest) parts.push('• ' + L.dest + ': ' + dest);
      if (date) parts.push('• ' + L.date + ': ' + date);
      if (guests) parts.push('• ' + L.guests + ': ' + guests);
      msgEl.value = parts.join('\n');
    }

    // Highlight the form briefly
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    form.classList.add('form-prefilled');
    setTimeout(function () { form.classList.remove('form-prefilled'); }, 2400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

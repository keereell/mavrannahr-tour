/* ============================================
   Mavrannahr Tour — tours.js
   Two-dimensional filter: category × theme
   ============================================ */

(function () {
  'use strict';

  let currentCategory = 'all';
  let currentTheme = 'all';

  function init() {
    const root = document.querySelector('.filter-tabs');
    if (!root || root.dataset.toursInit) return;
    root.dataset.toursInit = '1';

    const catTabs = document.querySelectorAll('.filter-tab');
    const themeChips = document.querySelectorAll('.theme-chip');
    const cards = document.querySelectorAll('.tour-card[data-category]');
    if (catTabs.length === 0 || cards.length === 0) return;

    // Set initial transition on cards
    cards.forEach(function (card) {
      card.style.transition = 'opacity .3s ease, transform .3s ease';
    });

    // Category tabs
    catTabs.forEach(function (tab) {
      if (!tab.getAttribute('role')) tab.setAttribute('role', 'tab');
      tab.addEventListener('click', function () {
        currentCategory = tab.getAttribute('data-filter') || 'all';
        applyFilter();
        catTabs.forEach(function (t) {
          const isActive = t === tab;
          t.classList.toggle('active', isActive);
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      });
    });

    // Theme chips
    themeChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        currentTheme = chip.getAttribute('data-theme') || 'all';
        applyFilter();
        themeChips.forEach(function (c) {
          c.classList.toggle('active', c === chip);
        });
      });
    });

    function applyFilter() {
      // Phase 1: fade out
      cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
      });

      // Phase 2: swap display + fade in
      setTimeout(function () {
        let visibleCount = 0;
        cards.forEach(function (card) {
          const cat = card.getAttribute('data-category');
          const theme = card.getAttribute('data-theme');
          const matchCat = (currentCategory === 'all' || cat === currentCategory);
          const matchTheme = (currentTheme === 'all' || theme === currentTheme);
          const show = matchCat && matchTheme;
          card.style.display = show ? '' : 'none';
          if (show) visibleCount++;
        });

        // Empty state
        toggleEmpty(visibleCount === 0);

        requestAnimationFrame(function () {
          cards.forEach(function (card) {
            if (card.style.display !== 'none') {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }
          });
        });
      }, 300);
    }
  }

  function toggleEmpty(show) {
    let empty = document.getElementById('tours-empty');
    if (show) {
      if (!empty) {
        empty = document.createElement('div');
        empty.id = 'tours-empty';
        empty.className = 'tours-empty';
        const labels = {
          uz: 'Filter bo\'yicha sayohatlar topilmadi. Filtrlarni o\'zgartirib ko\'ring.',
          ru: 'По выбранным фильтрам туров не найдено. Попробуйте изменить параметры.',
          en: 'No tours match these filters. Try changing your selection.'
        };
        const lang = (window.MavrI18n && window.MavrI18n.current()) || 'uz';
        empty.textContent = labels[lang] || labels.uz;
        const grid = document.querySelector('.tours-grid');
        if (grid) grid.parentNode.insertBefore(empty, grid.nextSibling);
      }
      empty.style.display = '';
    } else if (empty) {
      empty.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  document.addEventListener('mavr:partials-loaded', init);
})();

# Mavrannahr Tour — корпоративный сайт

Многостраничный сайт туристической компании для получения лицензии Министерства туризма и культурного наследия Республики Узбекистан.

**Стек:** чистый HTML/CSS/JS без сборки и фреймворков.
**Языки:** UZ (по умолчанию) / RU / EN — с авто-определением по `navigator.language`.

## Быстрый старт (локально)

Сайт использует `fetch()` для подгрузки `partials/navbar.html` и `partials/footer.html`. Это **не работает через `file://`** из-за CORS — нужен локальный HTTP-сервер.

### Вариант 1 — Python
```bash
cd UZ_website
python -m http.server 8000
# открыть http://localhost:8000
```

### Вариант 2 — Node
```bash
npx serve .
```

### Вариант 3 — VS Code
Расширение **Live Server** → правый клик на `index.html` → "Open with Live Server".

## Деплой

📖 **Подробная пошаговая инструкция:** [DEPLOY.md](./DEPLOY.md)

Кратко — 3 варианта бесплатного хостинга:

- 🥇 **GitHub Pages**: запуш в GitHub, включи Pages в Settings → URL вида `username.github.io/repo`
- 🥈 **Netlify**: drag & drop папку в [app.netlify.com/drop](https://app.netlify.com/drop) → 1 минута
- 🥉 **Cloudflare Pages**: подключи Git → быстрая глобальная CDN

Сайт статический — никакого Node/Apache/PHP не нужно. Все 3 варианта дают бесплатный HTTPS и работают за 5 минут.

## Структура

```
UZ_website/
├── index.html, about.html, services.html, tours.html, contact.html, privacy.html, 404.html
├── partials/         — общий navbar и footer (подгружаются JS)
├── css/              — base, components, sections, responsive
├── js/               — i18n, partials, main, scroll, cookies, form, tours, accordion
├── assets/           — logo, og-image, icons
├── manifest.json     — PWA
├── sitemap.xml, robots.txt
├── favicon.svg
└── IMAGES.md         — гид по размерам для замены placeholder-фото
```

## Что заменить перед запуском

1. **Реальные данные компании** — найти `Mavrannahr` и заменить на настоящее название (в `js/i18n.js` + HTML файлах + JSON-LD)
2. **Адрес/телефон/email/директор** — в `js/i18n.js`, ключи `req.*` и в Schema.org
3. **Логотип** — заменить `assets/logo.svg` и `favicon.svg`
4. **Фото** — см. `IMAGES.md`
5. **Google Maps координаты** — в `contact.html` найти `iframe.map-frame` и подменить embed-URL
6. **Тексты** — все находятся в `js/i18n.js`, можно править прямо там
7. **Узбекский перевод** — пометки `TODO: nativespeaker review` в `i18n.js` — желательна редактура носителем
8. **Аналитика** — раскомментировать сниппет Yandex Metrika в `<head>` и вставить counter ID

## Языки

Авто-детект из `navigator.language` при первом визите. Дефолт — узбекский. После ручного выбора — запоминается в `localStorage`.

## Доступность (a11y)

- WCAG 2.1 AA целевой уровень
- Skip-to-content, focus traps, ARIA, keyboard navigation
- Respects `prefers-reduced-motion`
- Контраст текстов выверен

## Лицензирование

Сайт содержит обязательные для лицензии РУз поля:
- **Местонахождение организации** (ул. Амира Темура, 15 — placeholder)
- **Время и дни работы** (Пн-Пт 09:00-18:00, Сб 10:00-15:00)
- **ФИО руководителя** (Каримов Шерзод Алишерович — placeholder)
- **Лицензия №** (0042-T от 14.03.2012 — placeholder)

После замены placeholder на реальные данные сайт готов к подаче на лицензию.

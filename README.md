# FENIX MULTIGLOBAL — корпоративный сайт

Многостраничный сайт туристической компании «FENIX MULTIGLOBAL» (Ташкент) для подачи на лицензию Министерства туризма и культурного наследия Республики Узбекистан.

- **Стек:** чистый HTML / CSS / JS, без сборки и фреймворков
- **Языки:** UZ (по умолчанию) · RU · EN — авто-определение по `navigator.language`, выбор запоминается в `localStorage`
- **Хостинг:** GitHub Pages
- **Live URL (preview):** https://keereell.github.io/mavrannahr-tour/
- **Production URL:** https://fenixtour.uz/ — заработает после настройки DNS, см. [DEPLOY.md](./DEPLOY.md)

---

## Локальный запуск

Сайт использует `fetch()` для подгрузки `partials/navbar.html` и `partials/footer.html`. Через `file://` это **не работает** из-за CORS — нужен локальный HTTP-сервер.

### Python (проще всего)
```bash
cd UZ_website
python -m http.server 8000
# открыть http://localhost:8000
```

### Node
```bash
npx serve .
```

### VS Code
Расширение **Live Server** → правый клик по `index.html` → "Open with Live Server".

---

## Структура проекта

```
UZ_website/
│
├── Публичные страницы (индексируются)
│   ├── index.html        — главная (hero, услуги, hot tours, отзывы, реквизиты)
│   ├── about.html        — о компании, философия, принципы, география работы
│   ├── services.html     — 4 направления + процесс работы + FAQ accordion
│   ├── tours.html        — каталог туров (фильтры × категория × тема)
│   └── contact.html      — реквизиты, форма, способы связи, Google Maps
│
├── Юридические страницы (noindex)
│   ├── privacy.html      — политика конфиденциальности (ЗРУ-547, 15 секций)
│   ├── offer.html        — публичная оферта
│   └── terms.html        — условия использования сайта
│
├── Error pages (noindex)
│   ├── 404.html          — креативная страница «не найдено»
│   ├── 500.html          — серверная ошибка
│   ├── 503.html          — сервис недоступен
│   └── offline.html      — нет интернета (для будущего service worker)
│
├── partials/             — navbar и footer, подгружаются JS на каждой странице
├── css/
│   ├── base.css          — reset, переменные, типографика
│   ├── components.css    — кнопки, карточки, формы, аккордеон, cookie-баннер
│   ├── sections.css      — стили конкретных секций
│   └── responsive.css    — media queries + print styles
├── js/
│   ├── i18n.js           — словарь переводов UZ/RU/EN (~380 ключей) + applyLang()
│   ├── partials.js       — fetch navbar / footer
│   ├── main.js           — навигация, mobile menu, lang switcher, smooth scroll
│   ├── form.js           — UI-валидация контактной формы
│   ├── tours.js          — фильтр туров (категория × тема)
│   ├── accordion.js      — FAQ accordion с клавиатурной навигацией
│   ├── scroll.js         — Intersection Observer для появления элементов
│   └── cookies.js        — cookie-баннер с запоминанием выбора
├── assets/
│   ├── logo.svg          — placeholder монограмма «F» терракотового цвета
│   ├── og-image.jpg      — превью для соцсетей (1200×630, Шахи-Зинда)
│   └── images/           — оптимизированные фото (JPG + WebP пары)
│
├── sitemap.xml           — для поисковиков
├── robots.txt            — Allow: / · Disallow: /partials/
├── manifest.json         — PWA для «Добавить на главный экран»
├── favicon.svg           — иконка для вкладки браузера
├── netlify.toml          — конфиг для Netlify (security headers + cache)
├── .htaccess             — конфиг для Apache хостинга (если будет)
├── DEPLOY.md             — подробная инструкция по хостингу
├── IMAGES.md             — гид по размерам фото для замены
└── README.md             — этот файл
```

---

## Деплой / хостинг

📖 **Полная пошаговая инструкция** в [DEPLOY.md](./DEPLOY.md).

Кратко: сайт уже развёрнут на **GitHub Pages** по адресу https://keereell.github.io/mavrannahr-tour/. Для обновления:

```bash
git add .
git commit -m "Что изменили"
git push
```

Через 30–60 секунд изменения на live-сайте.

**Подключение `fenixtour.uz`** — все SEO-ссылки в коде уже указывают на финальный домен, файл `CNAME` создан. Осталось настроить DNS у регистратора и активировать домен в GitHub Settings. Пошагово — в [DEPLOY.md](./DEPLOY.md#-подключение-домена-fenixtouruz).

---

## Что уже настроено

### Контент компании (реальные данные)
- ✅ ООО «FENIX MULTIGLOBAL»
- ✅ Директор: Исраилов Уктамжон Султанкулович
- ✅ Адрес: ул. Якка-Чинор, 2/1 (Central Palace, 6 этаж), Мирабадский район, Ташкент
- ✅ ИНН: 309775904
- ✅ Email: info@agentaero.uz
- ✅ Телефон: +998 77 358 53 77
- ✅ Часы работы: Пн–Пт 09:00–19:00 (выходные не работают)
- ⏳ **Лицензия туроператора — в процессе оформления.** Когда получите номер и дату — обновить ключ `faq.4.a` в `js/i18n.js` + Schema.org описания в `index.html` / `contact.html` / `services.html`

### Технически
- ✅ 3 языка с авто-детектом, выбор хранится в `localStorage`
- ✅ SEO: уникальные title / description на каждой странице, OG-теги, Twitter Card, hreflang × 3, sitemap.xml, robots.txt
- ✅ Schema.org JSON-LD: TravelAgency (главная), LocalBusiness (контакты), BreadcrumbList, FAQPage, ItemList туров — все мультиязычные через `@language`
- ✅ a11y: WCAG 2.1 AA — skip-to-content, focus traps в mobile menu, ARIA, keyboard nav, `prefers-reduced-motion`
- ✅ Производительность: hero preload, lazy-loading картинок, WebP с JPG fallback через `<picture>`, defer JS, шрифты с `display=swap`
- ✅ Юр.соответствие: privacy на основе ЗРУ-547 «Об обработке персональных данных»; cookie-баннер с согласием; публичная оферта; условия использования

---

## Что заменить, когда будут данные

| Когда | Что | Где |
|-------|-----|-----|
| Получите номер лицензии | Обновить FAQ #4 и Schema.org | `js/i18n.js` ключ `faq.4.a`; `services.html` Schema.org `acceptedAnswer` |
| Будет логотип | Заменить файлы | `assets/logo.svg` + `favicon.svg` + inline SVG в `partials/navbar.html` и `partials/footer.html` |
| Будет своё фото офиса | Заменить картинку | `assets/images/photo-1758630737900-a28682c5aa69.{jpg,webp}` (или поменять путь в `about.html`) |
| Будут реальные туры | Заменить placeholder-туры | `tours.html` + ключи `tour.{1-12}.*` в `i18n.js` |
| Будут реальные отзывы | Заменить заглушки | ключи `testimonial.{1-3}.*` в `i18n.js` |
| Будет правильный адрес офиса для Google Maps | Подменить embed-URL | `contact.html`, ищите `<iframe class="map-frame">` |
| Подключите Yandex Metrika | Раскомментировать сниппет и вставить counter ID | каждый `*.html` в `<head>` (закомментированный блок) |
| Узбекский перевод проверит носитель | Редактура текстов | `js/i18n.js` — все ключи UZ |

---

## Языки

При первом визите язык определяется автоматически:
1. Если в `localStorage` уже сохранён выбор пользователя — берётся он
2. Иначе смотрим `navigator.languages` — если есть `ru` или `en` → выбираем его
3. Иначе fallback на узбекский (`uz`)

Переключение через кнопки `O'Z / РУ / EN` в правом углу navbar. Выбор сразу сохраняется.

Длинные юридические тексты (privacy, offer, terms) хранятся не в i18n-словаре, а как `<div data-lang="ru|uz|en">` блоки в HTML — JS показывает только активный язык.

---

## Доступность (a11y)

Целимся в WCAG 2.1 AA:
- Skip-to-content link в самом верху каждой страницы
- `<h1>` один на странице, иерархия `h2` → `h3` без пропусков
- Все `<img>` с `alt` (декоративные — пустой alt + `aria-hidden`)
- ARIA на navbar (`aria-expanded`, `aria-controls`, `aria-current`)
- Focus trap в mobile menu, ESC закрывает
- `<button aria-pressed>` на переключателе языков
- `<button aria-expanded>` в accordion + клавиатурная навигация (↑↓ Enter Space)
- Видимый `:focus-visible` outline на всех интерактивных элементах
- `prefers-reduced-motion: reduce` — анимации отключаются
- Контраст всех пар цветов проверен ≥ 4.5:1

---

## Требования Министерства туризма (ст. ПКМ РУз)

Сайт содержит обязательные для лицензии данные:
- ✅ **Местонахождение организации** — ул. Якка-Чинор, 2/1, Ташкент
- ✅ **Время и дни работы** — Пн–Пт 09:00–19:00
- ✅ **ФИО руководителя** — Исраилов Уктамжон Султанкулович
- ✅ **ИНН** — 309775904
- ✅ **Способы связи** — телефон, email, Telegram, WhatsApp
- ✅ **Публичная оферта** — `offer.html`
- ✅ **Политика конфиденциальности** (ЗРУ-547) — `privacy.html`
- ✅ **Условия использования сайта** — `terms.html`

Когда лицензия будет получена — добавить её номер и дату выдачи в FAQ #4 (`js/i18n.js` ключ `faq.4.a`).

# Инструкция по хостингу сайта FENIX MULTIGLOBAL

Сайт **уже развёрнут** на GitHub Pages: https://keereell.github.io/mavrannahr-tour/

Этот файл объясняет:
- [Как обновлять live-сайт](#-как-обновить-уже-развёрнутый-сайт) ← начни отсюда, если просто надо что-то поменять
- [Как переехать на свой домен](#-переезд-на-свой-домен-agentaerouz) — когда подключите `agentaero.uz`
- [Альтернативные хостинги](#-альтернативные-хостинги) — Netlify / Cloudflare / shared hosting
- [Что делать если что-то сломалось](#-если-что-то-сломалось)

---

## 🔄 Как обновить уже развёрнутый сайт

Сайт автоматически перезаливается при каждом `git push` в `main`. Любое изменение делается так:

### 1. Открой папку проекта в терминале
```bash
cd "C:/Users/Dell/Desktop/UZ_website"
```

### 2. Поправь что нужно
- Тексты — в `js/i18n.js` (там все 3 языка)
- Картинки — в `assets/images/`
- Структура страницы — в нужном `*.html`
- Реквизиты компании — ключи `req.*` в `js/i18n.js`

### 3. Запушь изменения
```bash
git add .
git commit -m "Короткое описание что поменял"
git push
```

### 4. Подожди 30–60 секунд
Через минуту изменения видны на https://keereell.github.io/mavrannahr-tour/

Чтобы проверить статус деплоя:
- Зайди на https://github.com/keereell/mavrannahr-tour/actions
- Зелёная галка = всё ок, красный крестик = ошибка

---

## 🌐 Переезд на свой домен (`agentaero.uz`)

Когда компания подключит домен, нужно сделать **2 вещи**: настроить DNS и обновить SEO-ссылки в коде.

### Шаг 1. Купить / подключить домен

`agentaero.uz` нужно зарегистрировать у любого `.uz`-регистратора (например, `tas-ix.uz`, `cctld.uz`, `uzinfocom.uz`). Это разовая платная процедура.

### Шаг 2. Настроить DNS у регистратора

В панели управления доменом добавить **4 A-записи** на IP-адреса GitHub Pages:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `keereell.github.io` |

(IP-адреса актуальны на 2026 год, свежий список всегда в [документации GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).)

DNS-изменения применяются от 5 минут до 24 часов.

### Шаг 3. Привязать домен в GitHub

1. Зайди на https://github.com/keereell/mavrannahr-tour/settings/pages
2. В разделе **Custom domain** введи `agentaero.uz` → Save
3. Подожди пока GitHub проверит DNS (зелёная галка)
4. Поставь галку **Enforce HTTPS** (станет доступна через 5–30 минут после проверки)

GitHub автоматически создаст файл `CNAME` в репозитории — не удаляй его.

### Шаг 4. Обновить SEO-ссылки в коде

Сейчас в коде везде стоит `https://agentaero.uz/` как canonical / og:url / sitemap — это сделано заранее. **Если домен будет другой**, нужно сделать find-and-replace по всему проекту.

Файлы, в которых упоминается домен (115 мест в 12 файлах):
- Все `*.html` — `<link rel="canonical">`, `<meta property="og:url">`, `<link rel="alternate" hreflang>`, JSON-LD `url` / `image` / `logo`
- `sitemap.xml` — `<loc>` тегов
- `robots.txt` — `Sitemap:` URL
- `partials/navbar.html` и `partials/footer.html` — если есть абсолютные ссылки

**Если оставляете `agentaero.uz`** — ничего менять не надо, всё уже настроено.

**Если меняете на другой домен** — попроси меня сделать массовую замену одной командой.

### Шаг 5. Сказать поисковикам

После переезда:
1. Добавить сайт в [Google Search Console](https://search.google.com/search-console) — подтвердить владение, отправить `sitemap.xml`
2. То же в [Yandex Webmaster](https://webmaster.yandex.ru/) (важно для рынка РУз)
3. Добавить в [Yandex Business](https://yandex.uz/sprav/) — карточка организации
4. Создать профиль в [Google Business Profile](https://business.google.com/) — особенно важно для тур-агентства

---

## 🔁 Альтернативные хостинги

Если по какой-то причине не нравится GitHub Pages — можно переехать на другой хостинг **за 5–10 минут без потери данных** (репо на GitHub остаётся, просто новый хостинг тянет код оттуда).

### Netlify — авто-деплой + дружелюбный интерфейс

**Плюсы:** уже есть `netlify.toml` с security headers и cache-rules, более красивая аналитика, бесплатный CDN.

1. Зайди на [app.netlify.com](https://app.netlify.com), залогинься через GitHub
2. **«Add new site» → «Import an existing project»**
3. Authorize Netlify, выбери репо `mavrannahr-tour`
4. Build settings — оставь всё пустым (статика)
5. Deploy

URL вида `https://amazing-name-12345.netlify.app`. Custom domain подключается в Domain settings → Add custom domain.

### Cloudflare Pages — самая быстрая глобальная CDN

Особенно хорош если стейкхолдеры смотрят сайт из разных стран. Бесплатный план неограниченный по трафику.

1. [pages.cloudflare.com](https://pages.cloudflare.com) → Sign up
2. **«Create a project» → «Connect to Git»**
3. Подключи GitHub, выбери репо `mavrannahr-tour`
4. Build settings: пусто
5. Deploy

URL вида `https://mavrannahr-tour.pages.dev`.

### Обычный shared hosting (cPanel, ru-center, hoster.uz и т.п.)

Если компания уже платит за обычный хостинг с FTP:

1. Скачай ZIP с GitHub: https://github.com/keereell/mavrannahr-tour/archive/refs/heads/main.zip
2. Распакуй
3. Залей всё содержимое (КРОМЕ папки `.git/` и файлов `.md`) на хостинг через FTP в корень сайта (обычно `public_html/` или `www/`)
4. Файл `.htaccess` (уже есть в проекте) автоматически сработает на Apache-хостинге — настроит security headers и cache

⚠️ **Минус shared hosting:** обновление вручную через FTP каждый раз. Лучше использовать GitHub Pages / Netlify / Cloudflare.

---

## 🛡️ Что важно знать

| Что | Объяснение |
|-----|-----------|
| **Сайт статический** | Никакого Node.js / Python / PHP / Apache на сервере не нужно. Любой хостинг работает. |
| **HTTPS обязателен** | Иначе `fetch()` для подгрузки navbar/footer не работает. GitHub Pages / Netlify / Cloudflare дают HTTPS бесплатно автоматически. |
| **404.html подцепится сам** | Все три хостинга умеют автоматически показывать `404.html` при несуществующих URL. |
| **Шрифты грузятся из Google** | Сайт зависит от Google Fonts. Если в стране Google недоступен — нужно скачать шрифты в `assets/fonts/` и подключить локально. |
| **Картинки уже оптимизированы** | JPG + WebP в `assets/images/`. Не нужно ничего дополнительно сжимать. |
| **PWA-манифест есть** | `manifest.json` позволяет «Добавить на главный экран» с телефона. |

---

## 🧪 Перед деплоем — чек-лист

Перед каждым обновлением, особенно важным:

- [ ] Открой сайт локально (`python -m http.server 8000`) и пройдись по всем страницам
- [ ] Переключи язык UZ ↔ RU ↔ EN — все надписи меняются
- [ ] Открой DevTools → Mobile view → проверь 375px (iPhone) и 768px (iPad)
- [ ] Заполни форму на `/contact.html` → должно появиться «Спасибо!»
- [ ] Нажми F12 → Console → не должно быть красных ошибок
- [ ] Зайди в Lighthouse (DevTools → Lighthouse) → Performance / Accessibility / SEO > 90

После пуша:
- [ ] Открой live-сайт в инкогнито (чтобы не кэшировался)
- [ ] Проверь критичные страницы
- [ ] Если что-то сломалось — `git revert HEAD && git push` (откат к предыдущей версии)

---

## 🚨 Если что-то сломалось

### Сайт показывает старую версию
- Проверь GitHub Actions: https://github.com/keereell/mavrannahr-tour/actions — нет ли красного крестика
- Очисти кэш браузера (Ctrl+Shift+R) или открой в инкогнито
- GitHub Pages может кэшировать до 10 минут — подожди

### `fetch()` ошибки в консоли
- Открыли через `file://`? Запустите локальный сервер (`python -m http.server`)
- HTTPS отключен на хостинге? Включите.

### Переключение языка не работает
- Открой DevTools → Application → Local Storage → попробуй удалить ключ `lang`
- Проверь что `js/i18n.js` загружается (Network вкладка)

### Откатить изменения
```bash
git revert HEAD       # откатывает последний коммит
git push              # деплоит откат
```

или

```bash
git log --oneline -10                # посмотреть последние 10 коммитов
git reset --hard <commit-hash>       # вернуться к конкретному коммиту
git push --force-with-lease          # ОСТОРОЖНО — переписывает историю
```

---

## 📞 Что показать стейкхолдерам

После деплоя дай ссылку и список того, на что обратить внимание:

```
🌐 Сайт: https://keereell.github.io/mavrannahr-tour/

Что посмотреть:
• Главная (hero + услуги + горящие туры + отзывы + реквизиты)
• /about.html         — о компании, философия, принципы, география
• /services.html      — детали 4 услуг + процесс + FAQ accordion
• /tours.html         — 12 туров с фильтрами (по типу × по теме)
• /contact.html       — реквизиты, форма, Google Maps
• /privacy.html, /offer.html, /terms.html — правовые документы (с TOC)
• /404.html           — креативная страница 404 (компас)

Что проверить:
• Переключение языков в навбаре (UZ / РУ / EN) — всё на 3 языках
• Mobile (открыть с телефона или DevTools Ctrl+Shift+M)
• Заполнение формы → «Спасибо!»
• Звонок (плавающая кнопка на мобиле)
```

---

## 📌 Текущее состояние

| Параметр | Значение |
|----------|----------|
| Хостинг | GitHub Pages |
| Live URL | https://keereell.github.io/mavrannahr-tour/ |
| Репозиторий | https://github.com/keereell/mavrannahr-tour |
| Ветка деплоя | `main` |
| Автодеплой | ✅ при каждом `git push` |
| HTTPS | ✅ автоматический |
| Custom domain | ⏳ ждёт подключения `agentaero.uz` |
| Стоимость | 0 USD/мес (GitHub Pages бесплатный для публичных репо) |

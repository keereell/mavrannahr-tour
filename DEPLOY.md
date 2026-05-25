# Инструкция по хостингу сайта FENIX MULTIGLOBAL

Сайт **уже развёрнут** на GitHub Pages: https://keereell.github.io/mavrannahr-tour/

Этот файл объясняет:
- [Как обновлять live-сайт](#-как-обновить-уже-развёрнутый-сайт) ← начни отсюда, если просто надо что-то поменять
- [Подключение домена `fenixtour.uz`](#-подключение-домена-fenixtouruz) — DNS, GitHub Settings, поисковики
- [Email на новом домене](#-email-на-новом-домене-опционально)
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

## 🌐 Подключение домена `fenixtour.uz`

Домен **куплен**. Все SEO-ссылки в коде уже указывают на `https://fenixtour.uz/`, файл `CNAME` создан. Осталось 2 шага: настроить DNS у регистратора и активировать домен в GitHub.

### Шаг 1. Настроить DNS у регистратора

Зайди в панель управления доменом (там, где `fenixtour.uz` куплен) и добавь следующие записи:

| Тип | Имя | Значение |
|-----|-----|----------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `keereell.github.io` |

Эти 4 A-записи направляют **корневой домен** (`fenixtour.uz`) на серверы GitHub Pages.
CNAME `www` делает так, чтобы `www.fenixtour.uz` тоже работал.

IP-адреса актуальны на 2026 год, свежий список всегда в [документации GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).

DNS-изменения применяются от 5 минут до 24 часов. Проверить можно так:
```bash
nslookup fenixtour.uz
# должны увидеть один из IP 185.199.108-111.153
```

### Шаг 2. Активировать домен в GitHub

1. Зайди на https://github.com/keereell/mavrannahr-tour/settings/pages
2. В разделе **Custom domain** введи `fenixtour.uz` → **Save**
   (поле, скорее всего, уже заполнено автоматически из файла `CNAME`)
3. Подожди пока GitHub проверит DNS — появится **DNS check successful** ✅
4. **Поставь галку «Enforce HTTPS»** — станет доступна через 5–30 минут после проверки DNS

После этого сайт доступен по адресу **https://fenixtour.uz/** с бесплатным HTTPS-сертификатом (Let's Encrypt, обновляется автоматически).

### Шаг 3. Сказать поисковикам про новый домен

После того как `https://fenixtour.uz/` заработает:

1. **[Google Search Console](https://search.google.com/search-console)** — добавь property `fenixtour.uz`, подтверди владение, отправь `sitemap.xml` (URL: `https://fenixtour.uz/sitemap.xml`)
2. **[Yandex Webmaster](https://webmaster.yandex.ru/)** — то же самое (важно для рынка РУз/СНГ)
3. **[Yandex Business](https://yandex.uz/sprav/)** — добавь карточку организации с адресом, часами, телефоном (синхронизируется с реквизитами на `/contact.html`)
4. **[Google Business Profile](https://business.google.com/)** — особенно важно для тур-агентства, попадёшь в Google Maps и локальный поиск

---

## ✉️ Email на новом домене (опционально)

Сейчас в коде везде используется `info@agentaero.uz` (этот email вы дали изначально). Если хотите, чтобы email тоже был на новом домене (`info@fenixtour.uz`) — нужно:

1. Подключить почтовый сервис на `fenixtour.uz` (Google Workspace, Yandex 360 для бизнеса, или у вашего регистратора часто есть встроенная почта)
2. Сказать мне «поменяй email на fenixtour» — заменю во всех 24 местах за один проход

Если оставляете `info@agentaero.uz` — ничего делать не нужно, всё работает.

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
| Текущий URL | https://keereell.github.io/mavrannahr-tour/ |
| Финальный URL | https://fenixtour.uz/ (после настройки DNS — см. выше) |
| Репозиторий | https://github.com/keereell/mavrannahr-tour |
| Ветка деплоя | `main` |
| Автодеплой | ✅ при каждом `git push` |
| HTTPS | ✅ автоматический (Let's Encrypt) |
| SEO-код под домен | ✅ `https://fenixtour.uz/` везде в canonical / og:url / sitemap / Schema.org |
| CNAME файл | ✅ создан, указывает на `fenixtour.uz` |
| Custom domain в GitHub | ⏳ ждёт ваших действий: настроить DNS + активировать в Settings → Pages |
| Email | `info@agentaero.uz` (если будете менять на `info@fenixtour.uz` — скажите) |
| Стоимость | 0 USD/мес (GitHub Pages бесплатный для публичных репо) |

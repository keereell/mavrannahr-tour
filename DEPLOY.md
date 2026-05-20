# Деплой сайта Mavrannahr Tour онлайн

Сайт статический — поэтому работает на любом бесплатном хостинге. Ниже **3 варианта** от самого простого до самого фичастого. Можешь использовать **любой один**.

---

## 🥇 Вариант 1: GitHub Pages (рекомендуется)

**Что получишь:** URL `https://твой-логин.github.io/название-репо`, бесплатный HTTPS, авто-деплой при каждом `git push`.

### Шаг 1. Создай аккаунт на GitHub (если нет)
[github.com/signup](https://github.com/signup)

### Шаг 2. Инициализируй Git локально

Открой Git Bash или PowerShell в папке `UZ_website`:

```bash
cd "C:/Users/Dell/Desktop/UZ_website"
```

**Если ты впервые используешь git** — настрой имя и email (один раз на весь компьютер):
```bash
git config --global user.name "Твоё Имя"
git config --global user.email "твой@email.com"
```

Затем:
```bash
# git init уже выполнен — папка .git создана
git add .
git commit -m "Initial commit: Mavrannahr Tour website"
git branch -M main
```

### Шаг 3. Создай репозиторий на GitHub

1. Зайди на [github.com/new](https://github.com/new)
2. Repository name: `mavrannahr-tour` (или любое)
3. **Public** (для бесплатного GitHub Pages нужен публичный репо)
4. **НЕ** ставь галочки «Add README», «Add .gitignore», «Add license» — у нас уже всё есть
5. Жми «Create repository»

### Шаг 4. Запушь код на GitHub

GitHub покажет команды — скопируй их или используй эти (замени `USERNAME` и `REPO`):

```bash
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

При первом пуше попросит авторизоваться — войди через браузер.

### Шаг 5. Включи GitHub Pages

1. На странице репозитория → **Settings**
2. Левое меню → **Pages**
3. Source → **Deploy from a branch**
4. Branch → **main** + folder **`/ (root)`**
5. Save

Через 30–60 секунд сайт будет доступен по адресу:
**`https://USERNAME.github.io/REPO/`**

GitHub покажет эту ссылку в той же вкладке Pages — оттуда копируй и кидай стейкхолдерам.

### Если что-то меняешь — деплой автоматический:
```bash
git add .
git commit -m "Что изменил"
git push
```
Через минуту изменения на сайте.

---

## 🥈 Вариант 2: Netlify (drag-and-drop, ещё проще)

**Что получишь:** URL вида `https://amazing-name-12345.netlify.app`, HTTPS, deploy за 60 секунд, можно вообще без Git.

### Способ А — без Git, drag-and-drop (1 минута)

1. Зайди на [app.netlify.com/drop](https://app.netlify.com/drop)
2. **Перетащи** папку `UZ_website` целиком в окно браузера
3. Готово! Netlify дал ссылку — копируй

Минус: нет авто-деплоя — при изменениях нужно опять перетаскивать.

### Способ Б — с Git (рекомендую если используешь GitHub)

1. Сначала запушь на GitHub по варианту 1 (шаги 1–4)
2. Зайди на [app.netlify.com](https://app.netlify.com), залогинься
3. **«Add new site» → «Import an existing project»**
4. Подключи GitHub, выбери репо `mavrannahr-tour`
5. Build settings: оставь всё пустым (статика)
6. Deploy

После — каждый `git push` авто-деплоит на Netlify.

**Бонус:** у тебя уже есть `netlify.toml` с security headers и cache rules — Netlify подхватит автоматически.

---

## 🥉 Вариант 3: Cloudflare Pages

Похож на Netlify, но с самой быстрой глобальной CDN. Особенно хорош если стейкхолдеры в разных странах.

1. [pages.cloudflare.com](https://pages.cloudflare.com) → Sign up
2. **«Create a project» → «Connect to Git»**
3. Подключи GitHub, выбери репо
4. Build settings: пусто (статика)
5. Deploy

URL вида: `https://mavrannahr-tour.pages.dev`

---

## 🌐 Свой домен (когда будет готов `mavrannahr.uz`)

На любом из 3-х вариантов можно подключить свой домен:
- **GitHub Pages:** Settings → Pages → Custom domain → введи `mavrannahr.uz`, добавь DNS-запись CNAME у регистратора
- **Netlify:** Domain settings → Add custom domain
- **Cloudflare Pages:** Custom domains → Set up a custom domain

Везде HTTPS-сертификат подключается автоматически (Let's Encrypt) в 1 клик.

---

## ⚙️ Что важно знать

- ✅ Сайт **статический** — работает на любом хостинге, никакого Node/Python/Apache не нужно
- ✅ HTTPS включается автоматически (важно — иначе `fetch()` для partials не будет работать)
- ✅ `404.html` подцепится автоматически на всех 3 платформах
- ✅ В Netlify ещё подхватятся `netlify.toml` с конфигом
- ✅ `.htaccess` нужен только если хостинг на Apache (обычный shared hosting, cPanel)

---

## 💡 Что я рекомендую конкретно для тебя

**Если хочешь самое простое и быстрое:** Netlify drag-and-drop (1 минута, без Git).

**Если хочешь правильную разработку с историей изменений:** GitHub + GitHub Pages (5–10 минут на первый раз).

**Если планируешь много править и хочешь авто-деплой:** GitHub + Netlify (с Git-интеграцией).

---

## 🚀 Что показать стейкхолдерам

После деплоя дай им ссылку + список того, что посмотреть:

```
🌐 Сайт: https://USERNAME.github.io/REPO/

Что посмотреть:
- Главная (hero + услуги + горящие туры + отзывы + реквизиты)
- /about.html — о компании, команда, лицензии, история
- /services.html — детали 4 услуг + FAQ accordion
- /tours.html — 12 туров с фильтрами (по типу × по теме)
- /contact.html — реквизиты, форма, Google Maps
- /privacy.html, /offer.html, /terms.html — правовые документы (с TOC)
- /404.html — креативная страница 404 (компас)

Что проверить:
- Переключение языков справа в навбаре (UZ / РУ / EN)
- Mobile (открыть с телефона или DevTools)
- Заполнение формы → "Спасибо!"
- Звонок (мобильная нижняя кнопка)
```

# ТЗ FINAL v3 — HTML-читалка в стиле Atlas Pencil Sketchbook

**Назначение:** это финальное универсальное ТЗ, которое можно загружать в новую задачу, чтобы агент верстал наши учебные HTML-читалки в едином стиле с картинками Olga.  
**Стиль-референс:** `atlas.png` / иллюстрация «Закон масштаба».  
**Главная цель:** HTML-страницы и учебные картинки должны выглядеть как части одной математической скетчбук-страницы, а не как картинка отдельно и сайт отдельно.

---

## 0. Главная формула

```text
Учебный текст → чистый HTML-каркас → крупный осмысленный визуал → стиль Atlas Pencil → visual hygiene → QA
```

Главный принцип:

```text
Не украшать. Режиссировать внимание.
```

Итоговое ощущение:

```text
страница из тёплого математического атласа:
карандаш, бумага, аккуратные формулы, крупный визуальный якорь, никакого цифрового шума.
```

---

# 1. Рабочий контракт

## 1.1. Исходный текст не переписывать

Агент **не меняет учебный текст** без отдельного разрешения Olga.

Разрешено:

- обернуть картинку в `<figure>`;
- вынуть `<img>` из `<p>`;
- добавить CSS-классы;
- добавить контейнеры для сетки;
- оформить `blockquote` как плашки;
- завернуть ответы мини-тестов в `<details>`;
- добавить безопасную порядковую нумерацию;
- добавить `width`, `height`, `loading`, `decoding` картинкам;
- исправлять технические баги HTML/CSS.

Запрещено без отдельного согласования:

- переписывать формулировки теории;
- менять математический смысл;
- выкидывать примеры;
- переставлять структуру урока;
- радикально переименовывать `id`, ломая ссылки;
- править содержимое таблиц как текст, если задача только про вёрстку.

---

# 2. Стиль-цель: Atlas Pencil Sketchbook

## 2.1. Что должно совпасть с картинками

HTML-читалка должна визуально совпадать с иллюстрациями Olga по этим признакам:

- тёплая кремовая бумага;
- графитовый контур `#2B2B2A`;
- мягкая карандашная фактура;
- приглушённые пастельные акценты;
- никакой пластиковой digital UI-эстетики;
- крупная учебная картинка как центр внимания;
- вокруг картинки достаточно воздуха;
- заголовки и плашки выглядят как подписи в учебном скетчбуке;
- формулы набраны аккуратно в HTML/KaTeX, а не как кривой текст внутри картинки.

---

## 2.2. Важное отличие HTML от картинки

В картинках Olga может быть рукописная кириллица. В HTML-читалке:

- основной текст, формулы и таблицы должны быть настоящим HTML/KaTeX;
- длинные формулы не запекать в изображение;
- если в картинке есть русский текст и он уже хороший — можно оставить;
- если агент сам генерирует картинку, не полагаться на модель для точного длинного русского текста и сложных формул;
- если нужны точные подписи к схеме — лучше делать их HTML/SVG-оверлеем или отдельной подписью рядом.

Правило:

```text
Картинка даёт образ. HTML даёт точность.
```

---

# 3. Неизменный prompt-стиль картинок Olga

Этот блок считать источником визуального стиля для всех будущих читалок.

## 3.1. Блок 2: текстура карандаша и штриха

```text
An elite young adult indie comic book infographic illustration, executed entirely as an elegant light colored pencil drawing on a page from a mathematician's sketchbook. All outlines are drawn with a sharp hex #2B2B2A graphite pencil. The pencil technique features a unique signature hand-drawn style, using a soft wax pencil lead texture with visible light overlapping pencil pressure lines and faint sketchy cross-hatching, with absolutely no smooth digital fills or computer graphics color blending. High-end young adult graphic novel aesthetic, clear visual hierarchy, no humans
```

**Как переводить это в CSS:**

- контуры тонкие, кофейно-графитовые;
- без glossy/shadow/card UI;
- цветовые заливки лёгкие, почти бумажные;
- элементы не должны выглядеть как Figma/Notion;
- если картинка без людей — HTML тоже не должен добавлять лишних персонажей/стикеров рядом;
- исключение по людям: если Olga явно дала картинку с персонажем или просит персонажа, используем как полноценный visual anchor, но не добавляем конкурирующих персонажей рядом.

---

## 3.2. Блок 3: палитра и фон

```text
The entire scene is rendered on a solid warm ivory paper background #F5F2EB with a seamless subtle paper texture. The coloring is created by beautiful light colored pencil sketches using a shade lighter for backgrounds and spaces, allowing the clean texture of the paper to breathe through. The accent palette strictly utilizes muted pastel colors: mustard-yellow #D1A153, dark-coffee #6E554F, and dusty teal-mint #618B8B, with crazy electric-orange #D97443 energy highlights
```

**CSS-вывод:**

- `body` = `#F5F2EB`;
- карточки = `#FAF6EE` или очень близкий ivory;
- основной контур/чернила = `#2B2B2A`;
- кофейные рамки = `#6E554F`;
- мята = `#618B8B`;
- горчица = `#D1A153`;
- энергия/ловушка = `#D97443`;
- не использовать белый `#FFFFFF` как фон карточек;
- не использовать цифровые градиенты, тени, glassmorphism.

---

## 3.3. Блок 4: русский текст в картинках

```text
All labels, headers, and study notes are neatly handwritten strictly in the RUSSIAN LANGUAGE with bold Cyrillic lettering using hex #2B2B2A. All Cyrillic banners and text blocks remain perfectly sharp, completely crisp, clear, and perfectly legible. No English text, no Latin alphabet
```

**Правило для агента:**

- в HTML всё на русском;
- подписи `alt`, `figcaption`, плашки — на русском;
- если картинка содержит английские слова или кривую кириллицу, это нужно отметить Olga;
- если картинку генерирует агент и текст в ней нужен точный — лучше сделать картинку без текста, а текст положить в HTML рядом/поверх.

---

## 3.4. Негативный prompt

```text
body deformations, anatomical mutations, distorted proportions, skewed body lines, morphed characters, asymmetrical facial distortion, ugly angry expressions, screaming monsters, crowded layout, solid flat vector backgrounds, smooth digital color fills, digital gradients, airbrush effects, paint, ink wash, watercolor, markers, 3d render, computer graphics texture, English text, English words, Latin alphabet titles, coordinate grids, graphs, charts, arrows, split screen, frames, photorealism
```

**CSS-вывод:**

- не делать цифровые градиенты;
- не делать яркие плоские vector-заливки;
- не делать neon/glow/drop-shadow;
- не делать crowded layout;
- не добавлять лишние рамки внутри картинки;
- не создавать split-screen, если слайд уже имеет сильную картинку;
- не перегружать стрелками/графиками поверх картинки.

---

# 4. Палитра HTML-читалки

| Роль | Hex | Применение |
|---|---:|---|
| Бумага страницы | `#F5F2EB` | `body`, общий фон |
| Бумага карточки | `#FAF6EE` | `section.slide` |
| Графит | `#2B2B2A` | заголовки, сильный текст, тёмные блоки |
| Основной текст | `#4A3B37` | абзацы |
| Dark coffee | `#6E554F` | рамки, таблицы, подписи |
| Dusty teal-mint | `#618B8B` | подсказки, активный TOC, левый акцент |
| Mustard-yellow | `#D1A153` | правила, важные формулы |
| Electric-orange | `#D97443` | ловушки, ошибки, предупреждения |
| Note paper | `#F3EBE3` | плашки |
| Dark note | `#332F2C` | плашки на тёмном |

Запрещено:

```text
#FFFFFF как карточка
#2b6cb0 как ссылка
linear-gradient
box-shadow
drop-shadow
filter blur
glassmorphism
neon
hover scale
случайные новые цвета
```

Допустимо:

- очень лёгкая бумажная SVG/noise-текстура через `data:image/svg+xml`, если она не мешает чтению;
- пунктирные/тонкие линии как карандашные направляющие;
- рамки 1px цветом `#6E554F` с пониженной прозрачностью.

---

# 5. Базовые CSS-токены

```css
:root {
  --paper: #F5F2EB;
  --card: #FAF6EE;
  --ink: #2B2B2A;
  --text: #4A3B37;
  --coffee: #6E554F;
  --mint: #618B8B;
  --mustard: #D1A153;
  --orange: #D97443;
  --note: #F3EBE3;
  --dark-note: #332F2C;
}
```

```css
body {
  margin: 0;
  background: var(--paper);
  color: var(--text);
  font-family: Montserrat, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.7;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .18;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='90' height='90' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
}
```

Если текстура делает страницу грязной — убрать `body::before`. Читабельность важнее фактуры.

---

# 6. Шрифт

Основной шрифт HTML-читалки — локальный Montserrat.

```css
@font-face { font-family: 'Montserrat'; src: url('fonts/Montserrat/Montserrat-Regular.ttf'); font-weight: 400; }
@font-face { font-family: 'Montserrat'; src: url('fonts/Montserrat/Montserrat-Bold.ttf'); font-weight: 700; }
@font-face { font-family: 'Montserrat'; src: url('fonts/Montserrat/Montserrat-ExtraBold.ttf'); font-weight: 800; }
```

Правило:

- интерфейс и основной текст — Montserrat;
- имитацию рукописного текста не делать случайным webfont без проверки кириллицы;
- если нужен рукописный заголовок — только локальный кириллический шрифт, проверенный на `Ж`, `Я`, `Ф`, `Щ`, `Ё`;
- формулы — KaTeX.

---

# 7. Каркас читалки

```css
.layout {
  display: flex;
  min-height: 100vh;
}

nav.toc {
  width: 290px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
  background: var(--paper);
  border-right: 1px solid rgba(110,85,79,.65);
}

main.content {
  flex: 1;
  max-width: 1360px;
  margin: 0 auto;
  padding: 30px 46px;
}

section.slide {
  position: relative;
  background: var(--card);
  border: 1px solid rgba(110,85,79,.75);
  border-radius: 0;
  box-shadow: none;
  padding: 28px 38px;
  margin: 0 0 30px;
  overflow: flow-root;
}
```

Карточка должна ощущаться как лист скетчбука, а не как modern web card.

---

# 8. Заголовки

Заголовки должны быть близки к картинкам: сильные, графитовые, без синего и без глянца.

```css
.slide h2 {
  color: var(--ink);
  font-size: 24px;
  line-height: 1.22;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 18px;
}

.slide-dark h2,
.cover h1 {
  background: var(--ink);
  color: var(--paper);
  padding: 14px 18px;
  border: 1px solid var(--ink);
}
```

Не делать:

- синие заголовки;
- градиентные заголовки;
- округлые pill-заголовки;
- сияние, glow, blur.

---

# 9. Учебные картинки

## 9.1. Главная учебная картинка

Картинка должна быть крупной и выглядеть встроенной в бумагу.

```css
figure.sketch {
  float: left;
  width: clamp(420px, 48%, 690px);
  max-width: 690px;
  margin: 0 1cm 0.6cm 0;
  padding: 8px;
  background: var(--paper);
  border: 1px solid rgba(110,85,79,.8);
  box-shadow: none;
}

figure.sketch img {
  display: block;
  width: 100%;
  height: auto;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

figure.sketch figcaption {
  margin-top: 7px;
  color: var(--coffee);
  font-size: 12.5px;
  line-height: 1.35;
}
```

Правила:

- обычная учебная картинка — слева;
- текст обтекает справа;
- расстояние до текста/краёв минимум 1 см;
- картинка крупная;
- не ставить рядом обычный стикер;
- если картинка уже содержит подписи, `figcaption` не должен повторять всё слово в слово.

---

## 9.2. Atlas image / большой визуальный якорь

Для картинок уровня `atlas.png` использовать более крупный слот.

```css
figure.sketch-atlas {
  float: left;
  width: clamp(520px, 54%, 760px);
  max-width: 760px;
  margin: 0 1.1cm .7cm 0;
  background: var(--paper);
  border: 1px solid rgba(110,85,79,.75);
  padding: 6px;
}
```

Если слайд строится вокруг такой картинки:

- текст справа должен быть короче;
- таблицы рядом не ставить;
- стикеры не добавлять;
- плашка только одна и только если помогает.

---

## 9.3. Full-bleed / титульная картинка

```css
figure.sketch-full {
  float: none;
  width: 100%;
  max-width: none;
  margin: 0 0 20px;
}
```

Использовать для:

- титула;
- финала;
- обложки раздела;
- редкого большого визуального разворота.

---

# 10. Плашки

Плашки должны быть как бумажные заметки, не как web-alert.

| Класс | Назначение | Цвет |
|---|---|---:|
| `.note-cheat` | подсказка, лайфхак, как думать | `#618B8B` |
| `.note-rule` | правило, закон, запомни | `#D1A153` |
| `.note-trap` | ловушка, ошибка, осторожно | `#D97443` |

```css
.note-cheat,
.note-rule,
.note-trap {
  background: var(--note);
  border-left: 4px solid var(--mint);
  border-top: 1px solid rgba(110,85,79,.28);
  border-bottom: 1px solid rgba(110,85,79,.28);
  padding: 13px 18px;
  margin: 16px 0;
  box-shadow: none;
  border-radius: 0;
}

.note-rule { border-left-color: var(--mustard); }
.note-trap { border-left-color: var(--orange); }
```

---

# 11. Формулы

Формулы должны быть настоящими формулами.

Правила:

- использовать KaTeX;
- не оставлять LaTeX как сырой текст;
- не превращать формулы в картинки;
- на тёмном фоне формулы перекрашивать в `#F5F2EB`;
- в таблицах формулы должны быть достаточно крупными и с line-height, чтобы дроби/корни не слипались.

```css
.katex {
  color: var(--ink);
}

.slide-dark .katex,
.slide-dark .katex * {
  color: var(--paper) !important;
}

.formula-card {
  background: rgba(245,242,235,.65);
  border: 1px solid rgba(110,85,79,.35);
  padding: 10px 14px;
  margin: 14px 0;
}
```

---

# 12. Таблицы

Таблицы должны выглядеть как аккуратная учебная сетка на бумаге.

```css
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--card);
  font-size: 15px;
}

th, td {
  border: 1px solid rgba(110,85,79,.72);
  padding: 9px 11px;
  vertical-align: top;
}

th {
  background: #EDE2D4;
  color: var(--ink);
  font-weight: 800;
}

tr:nth-child(even) td {
  background: rgba(243,235,227,.55);
}
```

Запрещено:

- белые таблицы;
- синие ссылки;
- тяжёлые box-shadow;
- слишком плотные строки, где дроби и корни слипаются.

---

# 13. Мини-тесты

Мини-тесты — тёмные карточки с аккуратной игровой картинкой справа.

```css
.slide-dark {
  background: var(--ink);
  color: var(--paper);
  border-color: var(--ink);
}

figure.mini-test-image {
  float: right;
  width: clamp(280px, 34%, 420px);
  max-width: 420px;
  min-width: 260px;
  border: 0;
  background: transparent;
  padding: 0;
}
```

Правила:

- ответы закрывать в `<details>`;
- 1–2 задачи, не 5;
- на тёмном фоне использовать тёмные/чёрные `game-*`;
- mini-test image справа;
- не добавлять второй стикер.

---

# 14. Стикеры

После появления сильных atlas-картинок стикеры использовать ещё осторожнее.

## 14.1. Когда стикер нужен

- текстовый слайд без большой картинки;
- мостик между темами;
- ловушка;
- мини-напоминание;
- визуальная дырка, которую надо закрыть.

## 14.2. Когда стикер запрещён

- рядом уже есть крупная учебная картинка;
- рядом есть atlas-картинка;
- слайд плотный;
- стикер просто «милый»;
- стикер конкурирует с персонажем/объектом на картинке.

## 14.3. Размер

```css
figure.inline-sticker {
  float: left;
  width: clamp(160px, 17%, 220px);
  max-width: 220px;
  min-width: 150px;
  border: 0;
  background: transparent;
  padding: 0;
}

figure.inline-sticker img {
  width: 100%;
  max-height: 185px;
  object-fit: contain;
}
```

На одном текстовом слайде — максимум один обычный смысловой стикер.

---

# 15. Стикер у плашки

Если стикер относится именно к ловушке/правилу, он должен быть привязан контейнером.

```html
<div class="note-with-sticker">
  <blockquote class="note-trap">...</blockquote>
  <figure class="inline-sticker sticker-exception">...</figure>
</div>
```

```css
.note-with-sticker {
  clear: both;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(130px, 18%);
  column-gap: 24px;
  align-items: center;
}
```

Не использовать свободный float, если нужно попасть рядом с конкретной плашкой.

---

# 16. Дырявые и плотные слайды

## 16.1. Плотный слайд

Если на слайде уже есть:

- большая картинка;
- таблица;
- несколько формул;
- длинная плашка;
- мини-тест;

ничего не добавлять.

## 16.2. Дырявый слайд

Если справа/слева явно пусто, можно поставить один compact filler.

```css
figure.hole-filler-sticker {
  float: right;
  width: clamp(145px, 15%, 210px);
  max-width: 210px;
  min-width: 145px;
  border: 0;
  background: transparent;
  padding: 0;
}
```

Условия:

- filler смысловой;
- один на слайд;
- стоит в реальной пустоте;
- не конкурирует с учебной картинкой;
- если подходящего asset нет — не вставлять пустой кадр.

---

# 17. Нумерация

Если исходные id/номера не идут по порядку, не ломать ссылки.

Безопасное решение:

```html
<span class="order-num">№01</span>
<span class="slide-num">Слайд 9.5</span>
```

В TOC:

```css
nav.toc a[data-order]::before {
  content: attr(data-order) " · ";
}
```

---

# 18. TOC и навигация

TOC:

- слева sticky;
- фон `#F5F2EB`;
- без синих ссылок;
- активный пункт мятный;
- ссылки цвета graphite/coffee;
- block headers кликабельны;
- scroll-spy через `IntersectionObserver`.

Кнопка «Наверх» должна скроллить к `nav.toc`:

```js
document.querySelector('nav.toc')?.scrollIntoView({ behavior: 'smooth' });
```

Не использовать `window.scrollTo(0,0)`.

---

# 19. Геометрия

Для геометрии визуал особенно важен.

## 19.1. Что визуализировать

- определение фигуры;
- теорему;
- построение;
- доказательство;
- типовую ошибку;
- диагональ/высоту/радиус;
- масштаб и подобие;
- связь 2D ↔ 3D.

## 19.2. Что делать точным

Если нужна математическая точность:

- схема через SVG/HTML;
- подписи точек через HTML/SVG;
- формулы через KaTeX;
- генеративная картинка — как образ, не как источник точных данных.

## 19.3. Как совмещать с atlas-картинками

Atlas-картинка может быть эмоционально-смысловым якорем. Но рядом нужна точная учебная часть:

```text
слева: atlas-картинка / метафора
справа: точная формула, шаги, мини-таблица, KaTeX
```

Если в atlas-картинке уже есть много текста и схем — справа оставить только короткое объяснение.

---

# 20. Генерация новых картинок

Если агенту нужно сгенерировать новый visual, использовать стиль Olga.

Базовый prompt:

```text
An elite young adult indie comic book infographic illustration, executed entirely as an elegant light colored pencil drawing on a page from a mathematician's sketchbook. All outlines are drawn with a sharp hex #2B2B2A graphite pencil. Soft wax colored pencil texture, visible overlapping pencil pressure lines, faint sketchy cross-hatching, no smooth digital fills. Solid warm ivory paper background #F5F2EB with subtle paper texture. Muted pastel palette: mustard-yellow #D1A153, dark-coffee #6E554F, dusty teal-mint #618B8B, electric-orange #D97443 highlights. Russian Cyrillic labels only if short and absolutely legible. Clear visual hierarchy, clean composition, educational metaphor, enough empty paper, no watermark.
```

Для точных формул лучше вариант:

```text
same style, but no text inside image, no formulas inside image, leave clean empty label areas for HTML overlays
```

---

# 21. Адаптивность

На ширине ≤ 900px:

```css
@media (max-width: 900px) {
  .layout { flex-direction: column; }
  nav.toc {
    width: 100%;
    height: auto;
    position: relative;
    border-right: 0;
    border-bottom: 1px solid rgba(110,85,79,.6);
  }
  main.content { padding: 20px 16px; }
  figure.sketch,
  figure.sketch-atlas {
    float: none;
    width: 100%;
    max-width: 620px;
    margin: 0 auto 18px;
  }
  .slide-body table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  .note-with-sticker {
    grid-template-columns: 1fr;
  }
}
```

---

# 22. Performance

Для всех картинок:

```html
<img src="..." alt="..." width="..." height="..." loading="lazy" decoding="async">
```

Для hero/первой картинки:

```html
loading="eager"
```

Проверять:

- missing assets;
- слишком тяжёлые файлы;
- width/height;
- alt;
- неиспользуемые картинки.

---

# 23. Публикация

Структура:

```text
reader-sketchbook.html
assets/
fonts/Montserrat/
```

Все пути относительные. Если передать только HTML без `assets`, картинки не появятся.

---

# 24. Финальный QA

Перед сдачей агент обязан проверить:

## 24.1. Технический QA

- [ ] HTML открывается;
- [ ] все секции на месте;
- [ ] порядок чтения понятен;
- [ ] нет missing assets;
- [ ] у всех `img` есть `alt`, `width`, `height`, `loading`, `decoding`;
- [ ] KaTeX рендерится;
- [ ] TOC работает;
- [ ] scroll-spy работает;
- [ ] мобильная ширина не ломается.

## 24.2. Style QA

- [ ] фон страницы `#F5F2EB`;
- [ ] карточки не белые;
- [ ] графит `#2B2B2A` используется как главный контур;
- [ ] нет `#2b6cb0`;
- [ ] нет `linear-gradient`;
- [ ] нет box-shadow/drop-shadow;
- [ ] нет hover-scale;
- [ ] нет glass/neon;
- [ ] картинки выглядят частью той же бумаги;
- [ ] рамки тонкие, coffee/graphite;
- [ ] плашки похожи на заметки, а не на web-alert.

## 24.3. Visual hygiene QA

- [ ] нет большой картинки + лишнего стикера;
- [ ] рядом с atlas-картинкой нет конкурирующего персонажа;
- [ ] на текстовом слайде максимум один обычный стикер;
- [ ] filler только там, где реально дырка;
- [ ] плотные слайды не перегружены;
- [ ] если подписи внутри картинки кривые — отметить, заменить или вынести в HTML.

---

# 25. Формат отчёта агента

После работы агент пишет коротко:

```text
Сделано:
- собран reader-sketchbook.html;
- картинки приведены к Atlas Pencil стилю;
- крупные visuals поставлены слева, текст справа;
- формулы через KaTeX;
- стикеры/лишний декор почищены.

Проверка:
- sections: N;
- images: N;
- missing assets: 0;
- KaTeX ok;
- big visual + sticker conflict: 0;
- forbidden CSS tokens: 0.

Нужно решение Olga:
- ...
```

---

# 26. Самое важное правило

```text
Картинка и HTML должны быть из одной вселенной.
```

Если картинка выглядит как дорогая карандашная страница из математического атласа, HTML не должен выглядеть как обычный сайт.

Финальный вкус:

```text
теплая бумага + графит + приглушённые акценты + крупный смысловой рисунок + точные формулы.
```

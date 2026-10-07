# WORKING PROMPT — верстка English Lifestyle Grammar Reader, theory-first версия

Этот prompt можно копировать в новый чат/новую задачу, если нужно продолжить верстку английской книги без потери стиля.

---

## Коротко задача

Собери/обнови HTML-читалку по английской грамматике из markdown-файлов. Сейчас работаем **без финальных картинок**: вместо иллюстраций должны быть красивые места под будущие картинки с подписью, о чём будет сцена. Главное — теория, читаемость, навигация и видимая подсветка конструкций в тексте.

---

# Copy-paste prompt для работы

```text
Ты верстаешь дорогой English Lifestyle Grammar Reader в стиле Atlas Pencil Sketchbook.

Вход: markdown-файлы глав по английским временам. Нужно собрать единый HTML-reader.

ВАЖНО: пока НЕ вставляй финальные картинки. Вместо картинок делай аккуратные ART SLOT / visual anchor blocks рядом со сценами. В каждом art-slot должно быть:
1. номер сцены;
2. короткое название “будущий visual anchor”;
3. о чём будет картинка по сюжету;
4. короткий future hook / реплика / правило, которое потом пойдёт overlay на картинку.

Главная задача сейчас — теория и учебная читаемость.

Обязательные правила:
- английские слова и английские конструкции выделять жирным;
- русский перевод в скобках выделять курсивом;
- конструкции, которые потом объясняются в теории, подсвечивать отдельным пастельным маркером прямо в сцене, чтобы ученик ВИДЕЛ их до объяснения;
- не превращать текст в кислотный конспект: подсветка должна быть мягкая, дорогая, пастельная;
- таблицы, правила и упражнения оставлять HTML-текстом, не картинками;
- иллюстрации пока не генерировать и не вставлять;
- финальные изображения будут добавляться позже отдельным prompt-pass.

Стиль HTML:
- warm ivory paper background #F5F2EB;
- graphite/dark-coffee outlines #2B2B2A / #6E554F;
- dusty teal-mint #618B8B;
- muted mustard #D1A153;
- electric-orange #D97443 только как маленький акцент;
- ощущение дорогого sketchbook textbook / lifestyle longread;
- боковое оглавление;
- разделители частей;
- аккуратные chapter cards без glossy web-card эстетики.

Запрещено в CSS:
- gradients;
- box-shadow / drop-shadow;
- blur / glassmorphism;
- neon;
- случайные яркие цвета;
- белые glossy карточки;
- digital UI aesthetic.

Структура:
- общий hero “English Tenses”;
- sticky sidebar TOC;
- part-divider для каждой части;
- section.chapter для каждого ## раздела;
- subsection для каждого ###;
- после каждого ### Сцена вставлять art-slot;
- таблицы оборачивать в .table-wrap;
- blockquote превращать в note / note-rule / note-trap;
- примеры и диалоги делать visually readable.

Подсветка конструкций:
Используй отдельный span class `.grammar-construction` плюс типовые классы:
- `.gc-core` — ключевые scene hooks / главные конструкции;
- `.gc-state` — to be / состояния;
- `.gc-process` — Present Continuous;
- `.gc-past-process` — Past Continuous;
- `.gc-usedto` — used to;
- `.gc-question` — do/does/did questions;
- `.gc-negative` — don't/doesn't/didn't;
- `.gc-simple` — Present Simple / third person -s;
- `.gc-marker` — маркеры времени: always, usually, now, right now, every morning, last week, yesterday, while, when и т.д.

Подсветка должна быть пастельной:
- core: muted mustard background;
- state/process: dusty teal background;
- negative: soft orange background;
- past/used to: coffee/beige background;
- marker: тонкое подчёркивание orange, почти без заливки.

Выходные файлы:
1. обычный HTML:
   ENGLISH-TENSES — reader-lifestyle.html
2. embedded HTML:
   ENGLISH-TENSES — reader-lifestyle-embedded.html

Так как сейчас нет картинок, embedded-версия будет лёгкая. Когда появятся картинки, embedded-версия нужна, чтобы файл открывался на любом компьютере без отвалившихся assets.

Перед финалом обязательно проверь:
- parts count;
- chapters count;
- scene images == 0 в theory-first режиме;
- art slots == количеству сцен;
- planned hooks == количеству сцен;
- grammar highlights > 0;
- English bold highlights > 0;
- translations italic > 0;
- missing images == [];
- duplicate ids == 0;
- forbidden CSS tokens отсутствуют: gradient, box-shadow, drop-shadow, blur, glass, neon.
```

---

# Текущий режим проекта

Сейчас рабочий режим:

```text
theory-first / no final images yet
```

То есть:

- картинки не вставляем;
- сохраняем места под картинки;
- пишем, о чём должна быть картинка;
- сохраняем future hook;
- подсвечиваем грамматические конструкции прямо в сценах.

---

# Текущие файлы проекта

Главный HTML:

```text
/home/user/Presentations_minimax/ENGLISH-TENSES — reader-lifestyle.html
```

Embedded HTML:

```text
/home/user/Presentations_minimax/ENGLISH-TENSES — reader-lifestyle-embedded.html
```

Генератор:

```text
/home/user/make_english_lifestyle_reader.py
```

Source markdown files currently expected:

```text
/home/user/uploads/00-PRESENT-TENSES.md
/home/user/uploads/02-PRESENT-CONTINUOUS.md
/home/user/uploads/03-CONTRAST.md
/home/user/uploads/04-PAST-SIMPLE.md
/home/user/uploads/05-PAST-CONTINUOUS.md
```

Если пользователь загрузит обновлённые версии markdown, нужно пересобрать HTML из новых файлов, а не править финальный HTML руками.

---

# Как должен выглядеть ART SLOT

ART SLOT должен быть не просто серым прямоугольником, а аккуратным sketchbook-блоком:

```text
ART SLOT 2.1
будущий visual anchor
Сцена: Апокалипсис на крыше: Микросекунда «прямо сейчас»
What are you doing right now?
место под будущую картинку; пока работаем только с теорией и видимыми конструкциями
```

Задача art-slot: напомнить, какая иллюстрация потом нужна, но не мешать читать теорию.

---

# Что подсвечивать в сценах

Подсвечивать не каждое английское слово, а именно конструкции, которые будут/уже объясняются:

## Present Simple

- habits: `You drink this every morning.`
- markers: `always`, `usually`, `every morning`, `never`;
- third person -s: `he sings`, `Mark works`, `Dan arrives`;
- do/does questions: `Do you hear us?`, `Does she try...?`;
- negatives: `I don’t want`, `She doesn’t want`;
- to be states: `I am upset`, `He is busy`;
- be being: `You are being silly today`.

## Present Continuous

- `am/is/are + V-ing`;
- `right now`, `now`, `at the moment`;
- temporary situations;
- future plans with calendar marker;
- `always + Continuous` for irritation.

## Contrast

- `usually X, but now Y`;
- Simple vs Continuous pairs;
- `I know` vs incorrect `I am knowing`;
- schedule vs personal arrangement.

## Past Simple

- `V2 / -ed`;
- `did / didn’t + bare infinitive`;
- `was / were`;
- markers: `yesterday`, `last week`, `ago`;
- contrast with Present Simple.

## Past Continuous / used to

- `was/were + V-ing`;
- `while`, `when`;
- background action vs short event;
- `used to + verb`;
- `didn’t use to`, `Did ... use to?`.

---

# Правка будущих текстов

Пользователь планирует загружать новые/исправленные части. Поэтому генератор должен быть устойчивым:

- брать актуальные `.md` из `/home/user/uploads`;
- копировать их в `/home/user/Presentations_minimax`;
- пересобирать оглавление автоматически;
- создавать уникальные ids;
- не ломаться, если появились новые части/сцены;
- если у сцены нет готового hook — создавать нейтральный hook `Scene hook` или кратко брать название сцены.

---

# Финальная формула

```text
Markdown chapters → theory-first HTML → art-slots → grammar-construction highlights → validation → embedded copy
```

Картинки появятся позже отдельным этапом:

```text
locked character sheets → scene prompts → image pass → exact text overlay → update HTML
```

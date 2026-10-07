# ТЗ FINAL — генерация учебных картинок в стиле Atlas Pencil Sketchbook

**Версия:** IMAGE-MASTER-1.0  
**Назначение:** универсальное ТЗ для генерации картинок к нашим HTML-читалкам, PDF-шпаргалкам и учебным страницам.  
**Главная цель:** агент может сам по контексту урока предложить, сгенерировать, сохранить, вставить и красиво расположить учебные иллюстрации в едином стиле Olga / Atlas Pencil.

---

## 0. Главная идея

```text
Текст урока → карта смысловых визуалов → генерация картинок → ревью Olga → вставка в HTML → visual QA
```

Картинка должна быть не украшением, а учебным якорем:

```text
одна картинка = одна мысль / один закон / одна ловушка / один тип задачи
```

Главное правило:

```text
Картинка и HTML должны быть из одной вселенной.
```

---

# 1. Как это должно работать в будущих задачах

## 1.1. Что даёт Olga

Для новой читалки Olga может дать:

1. Markdown/HTML с учебным материалом.
2. Это ТЗ на картинки.
3. ТЗ на HTML-читалку.
4. Референсы персонажей/стикеров/монстров/мира.
5. Если есть — уже готовые картинки.

Референсы можно положить:

```text
assets/character-references/
assets/character-sheets/
assets/style-references/
assets/stickers/
```

Или загрузить в workspace / дать ссылку на GitHub raw.

---

## 1.2. Что делает агент

Агент обязан:

1. Прочитать материал.
2. Построить карту визуалов.
3. Предложить список картинок до массовой генерации.
4. Сгенерировать картинки в стиле Atlas Pencil.
5. Сохранить картинки в `assets/generated/` или тематическую папку.
6. Вставить их в HTML по ТЗ.
7. Сделать QA:
   - картинки на месте;
   - пути работают;
   - нет перегруза;
   - нет конфликтов стикеров;
   - формулы и точный текст остаются в HTML/KaTeX, если генератор исказил их.

---

## 1.3. Как Olga корректирует

После первого прохода агент показывает результат и пишет:

```text
Сгенерировано:
- slide-3: balans-kvartir.png — закон баланса;
- slide-7: reverse-proportion.png — обратная зависимость;
- slide-12: percent-base.png — старая база процента.

Нужно решение Olga:
- оставить / заменить / перегенерировать;
- усилить персонажа;
- убрать текст из картинки;
- заменить цветовой акцент;
- сделать более пустой фон;
- сделать крупнее объект.
```

Olga может сказать коротко:

```text
слайд 7 — слишком мрачно, сделай светлее
слайд 12 — текст убрать, проценты добавить в HTML
слайд 3 — идеально, оставить
```

Агент делает второй проход.

---

# 2. Базовый стиль картинок

## 2.1. Неизменный стиль

```text
An elite young adult indie comic book infographic illustration, executed entirely as an elegant muted pastel colored pencil drawing on a page from a mathematician's sketchbook. Warm ivory paper background #F5F2EB with subtle paper texture. All outlines are drawn with sharp dark-coffee #6E554F and graphite #2B2B2A pencil. Soft wax colored pencil texture, visible light overlapping pencil pressure lines, faint sketchy cross-hatching, no smooth digital fills, no computer graphics blending. High-end young adult graphic novel aesthetic, clear visual hierarchy, educational metaphor, enough empty paper around the central object.
```

---

## 2.2. Палитра

| Цвет | Hex | Роль |
|---|---:|---|
| Warm ivory paper | `#F5F2EB` | фон бумаги |
| Graphite | `#2B2B2A` | главный контур, русский текст |
| Dark coffee | `#6E554F` | карандашный контур, рамки, строительные линии |
| Dusty teal-mint | `#618B8B` | одежда, схемы, подсказки, защитные элементы |
| Muted mustard-yellow | `#D1A153` | выделенная часть, правило, важный процент |
| Electric orange | `#D97443` | энергия, ловушка, ошибка, опасность |

Цвета должны быть приглушёнными, как цветной карандаш. Не делать яркую цифровую заливку.

---

## 2.3. Фактура

Обязательно:

- бумажная поверхность;
- видимый карандашный штрих;
- лёгкая штриховка;
- неидеальные живые линии;
- много воздуха;
- ощущение страницы из математического атласа.

Запрещено:

- гладкие digital fills;
- vector flat style;
- 3D;
- photorealism;
- neon;
- glossy UI;
- airbrush;
- marker / watercolor / ink wash, если Olga не просит отдельно.

---

# 3. Универсальный prompt-шаблон

```text
An elite young adult indie comic book infographic illustration about [ТЕМА], executed entirely as an elegant muted pastel colored pencil drawing on a page from a mathematician's sketchbook, warm ivory paper background #F5F2EB with subtle paper texture.

Scene: [ОПИСАНИЕ СЦЕНЫ].
Main visual metaphor: [МЕТАФОРА].
Important objects: [ОБЪЕКТЫ].
Educational meaning: [ЧТО УЧЕНИК ДОЛЖЕН ПОНЯТЬ].

Use sharp dark-coffee #6E554F and graphite #2B2B2A pencil outlines, loose faint cross-hatching, visible colored pencil pressure lines, muted pastel palette: mustard-yellow #D1A153, dusty teal-mint #618B8B, electric-orange #D97443 highlights. Clean composition, clear visual hierarchy, enough empty paper.

Russian Cyrillic labels only if they are short, large, and perfectly legible: [КОРОТКИЕ ПОДПИСИ].
No long text inside the image. No formulas inside the image unless extremely short and simple.
High-end young adult graphic novel style.
```

---

# 4. Негативный prompt

Использовать почти всегда:

```text
vibrant colors, bright saturated coloring, neon shades, rich color fills, pure black monochrome, black and white drawing, grayscale image, solid flat vector backgrounds, smooth digital color fills, digital gradients, airbrush effects, paint, ink wash, watercolor, markers, 3d render, computer graphics texture, photorealism, photographic real buildings, crowded layout, split screen, frames, English text, English words, Latin alphabet titles, long text captions, tiny unreadable labels, distorted Cyrillic, misspelled Russian, numbers printed directly on character faces or bodies, body deformations, anatomical mutations, distorted proportions, asymmetrical facial distortion, ugly angry expressions, screaming monsters, deformed hands, extra fingers, watermark, logo
```

Если в prompt есть персонаж, **не писать `no humans`**.  
Если картинка должна быть без людей, тогда явно писать:

```text
no humans, no human characters
```

---

# 5. Русский текст внутри картинок

## 5.1. Что можно писать внутри картинки

Можно пробовать короткие крупные подписи:

```text
БАЛАНС
АЛЬФА
ОМЕГА
13%
61%
СТАРАЯ БАЗА
ЛОВУШКА
```

Условия:

- 1–3 слова;
- крупно;
- без мелкого текста;
- без длинных предложений;
- без сложных формул.

---

## 5.2. Что лучше не писать внутри картинки

Не писать в картинке:

- длинные правила;
- доказательства;
- многострочные объяснения;
- сложные формулы;
- таблицы;
- мелкие подписи;
- всё, что должно быть математически безошибочным.

Правило:

```text
Картинка даёт образ. HTML даёт точность.
```

Если текст критически важен, агент делает:

- картинку без текста;
- подпись в HTML;
- формулу через KaTeX;
- при необходимости HTML/SVG-оверлей.

---

# 6. Персонажи и референсы

## 6.1. Как Olga хранит референсы

Рекомендуемая структура:

```text
assets/character-references/
  teacher_main_front.png
  teacher_main_pose_1.png
  teacher_main_pose_2.png
  graf_monster_front.png
  graf_monster_emotions.png
  mafia_teacher_sheet.png

assets/style-references/
  atlas.png
  scale-law.png
  balance-example.png
```

---

## 6.2. Как агент использует референсы

Агент может использовать референсы как input images при генерации:

```text
images=[teacher_reference.png, graf_reference.png, style_reference.png]
```

И в prompt фиксировать:

```text
Use the attached character reference for the math-mafia teacher: same age, hairstyle, jacket style, calm confident expression, same graphic novel pencil style.
Use the attached pet monster reference for ГРАФ: same round puffy silhouette, headphones, sleepy clever eyes.
```

---

## 6.3. Ограничение честности

Генератор не является обученной LoRA-моделью. Поэтому:

- персонаж может быть очень похожим, но не всегда 100% одинаковым;
- лицо/одежда могут немного плавать;
- лучший результат даёт связка: reference image + стабильное описание + 1–2 корректирующие перегенерации.

Если нужна абсолютная консистентность персонажа, нужно хранить лучшие версии и использовать их как постоянные референсы.

---

# 7. Типы учебных картинок

## 7.1. Hero visual

Большая ключевая картинка раздела.

Использовать для:

- титула;
- большого закона;
- перехода к новой теме;
- центральной метафоры.

Размер:

```text
16:9 или 4:3
```

В HTML обычно:

```html
<figure class="sketch sketch-atlas">...</figure>
```

---

## 7.2. Concept visual

Картинка для определения или формулы.

Примеры:

- процент как часть целого;
- пропорция как баланс;
- масштаб как связь карты и реальности;
- обратная зависимость как противофаза.

Размер:

```text
1:1 или 4:3
```

---

## 7.3. Trap visual

Картинка-ловушка.

Примеры:

- двойная скидка не складывается;
- процент считается от старой базы;
- при обратной зависимости колонку надо перевернуть;
- масштаб требует перевода единиц.

Визуальный язык:

- electric-orange `#D97443` как тревожный акцент;
- не страшно, а умно-напряжённо;
- без злых монстров и без перегруза.

---

## 7.4. Algorithm visual

Картинка для шагов решения.

Лучше делать:

- свиток;
- черновик;
- строительный план;
- карта пути;
- цепочка станций;
- лабораторная доска.

Точные шаги писать в HTML рядом, не внутри картинки.

---

## 7.5. Mini-test visual

Картинка для мини-теста.

Правила:

- не должна мешать задачам;
- справа в HTML;
- если фон тёмный — картинка должна быть тёмной/контрастной;
- без длинного текста.

---

## 7.6. Sticker / filler

Маленький смысловой объект.

Использовать редко:

- закрыть дырку;
- сигналить ловушку;
- дать эмоцию;
- мостик между темами.

Не ставить рядом с большой atlas-картинкой.

---

# 8. Карта визуалов перед генерацией

Перед генерацией агент строит таблицу:

| slide-id | смысл | тип картинки | prompt-идея | нужен персонаж | текст внутри | риск |
|---|---|---|---|---|---|---|
| slide-3 | пропорция | concept | весы/баланс | нет | минимум | низкий |
| slide-5 | обратная зависимость | trap/concept | перевёрнутая колонка | можно ГРАФ | нет | средний |
| slide-12 | простой процент | concept | старая база | учитель | 100%, p% | низкий |

Если картинок много, сначала генерировать 3–5 ключевых, а не всё сразу.

---

# 9. Правила количества картинок

Не надо генерировать картинку на каждый абзац.

Ориентир:

```text
1 большая картинка на ключевой слайд
1 mini-test visual на мини-тест
1 filler только если есть настоящая визуальная дырка
```

Плотные слайды не перегружать.

---

# 10. Правила вставки в HTML

## 10.1. Главная картинка

```html
<figure class="sketch sketch-atlas">
  <img src="assets/generated/example.png" alt="..." width="..." height="..." loading="lazy" decoding="async">
  <figcaption>...</figcaption>
</figure>
```

## 10.2. Обычная учебная картинка

```html
<figure class="sketch">
  <img src="assets/generated/example.png" alt="..." width="..." height="..." loading="lazy" decoding="async">
  <figcaption>...</figcaption>
</figure>
```

## 10.3. Mini-test

```html
<figure class="mini-test-image">
  <img src="assets/generated/game-example.png" alt="..." width="..." height="..." loading="lazy" decoding="async">
</figure>
```

---

# 11. Расположение в читалке

Канон:

```text
картинка слева → текст справа → формулы и плашки рядом
```

Правила:

- учебные картинки обычно слева;
- mini-test картинки справа;
- atlas-картинка крупнее обычной;
- расстояние от картинки до текста не менее 1 см;
- рядом с большой картинкой не ставить стикер;
- если картинка уже содержит много деталей, текст рядом должен быть короче.

---

# 12. Имена файлов

Файлы называть латиницей, понятно и стабильно:

```text
assets/generated/balans-kvartir.png
assets/generated/obratnaya-zavisimost-trap.png
assets/generated/staraia-baza-procenta.png
assets/generated/masshtab-atlas.png
assets/generated/dvoinaya-skidka-lovushka.png
```

Не использовать пробелы и слишком длинные имена.

---

# 13. Форматы и размеры

Рекомендуемые размеры:

| Тип | Aspect ratio | Размер |
|---|---|---:|
| Hero / atlas | 16:9 | 1536×864 или 1792×1024 |
| Concept | 1:1 | 1024×1024 |
| Concept wide | 4:3 | 1280×960 |
| Mini-test | 1:1 | 1024×1024 |
| Sticker | 1:1 / transparent if possible | 768×768 или 1024×1024 |

Если инструмент выдаёт другой размер — не критично, но в HTML надо указать реальные `width/height`.

---

# 14. QA картинки

Перед вставкой проверить глазами:

- [ ] стиль похож на Atlas Pencil;
- [ ] палитра не стала яркой;
- [ ] нет английского текста;
- [ ] кириллица читаемая, если есть;
- [ ] проценты/числа не на лице персонажа;
- [ ] персонажи не деформированы;
- [ ] руки/лица не отвлекают;
- [ ] нет photorealism;
- [ ] нет 3D;
- [ ] нет digital gradient;
- [ ] композиция не crowded;
- [ ] есть место для HTML-текста рядом.

---

# 15. QA после вставки в HTML

- [ ] файл картинки существует;
- [ ] путь относительный;
- [ ] есть `alt`;
- [ ] есть `width/height`;
- [ ] есть `loading` и `decoding`;
- [ ] картинка не ломает float;
- [ ] рядом нет лишнего стикера;
- [ ] слайд не стал плотным;
- [ ] формулы остались KaTeX;
- [ ] важный текст не спрятан в картинке.

---

# 16. Пример prompt: баланс квартир

```text
An elite young adult indie comic book infographic illustration about variable math equations, executed entirely as an elegant muted pastel colored pencil drawing on a page from a mathematician's sketchbook, warm ivory paper background #F5F2EB with subtle paper texture.

The layout features two large under-construction residential buildings covered in fine manual pencil scaffolding lines. The left building is labeled "АЛЬФА" and has its lower section shaded in pale muted mustard-yellow #D1A153, labeled "13%". The right building is labeled "ОМЕГА" and has a much larger section shaded in the same pale mustard-yellow, labeled "61%". In the air between them, a thin hand-drawn pencil arch links both structures with a pale dusty teal-mint #618B8B blueprint shield reading "16%".

A stylish 24-year-old math-mafia teacher wearing a modern pale dusty teal-mint #618B8B jacket stands in front holding a big architecture scroll. His round puffy pet monster "ГРАФ" with headphones sits on top of the construction lines, observing.

Outlines drawn with sharp dark-coffee #6E554F pencil, loose faint cross-hatching, visible colored pencil pressure lines, paper texture breathing through, no smooth digital fills. Bold clean Russian Cyrillic titles: "БАЛАНС КВАРТИР", "НЕИЗВЕСТНЫЕ ВЕЛИЧИНЫ". High-end graphic novel style.
```

Negative:

```text
vibrant colors, neon, rich color fills, smooth digital fills, digital gradients, airbrush, watercolor, markers, 3d render, photorealism, photographic buildings, English text, Latin alphabet, split screen, frames, long text captions, deformed hands, distorted faces, numbers on faces, crowded layout
```

---

# 17. Пример workflow для новой читалки

```text
1. Olga загружает урок.md + это ТЗ + HTML-ТЗ + refs.
2. Агент читает урок.
3. Агент пишет visual map:
   - какие слайды требуют картинку;
   - какие картинки нужны;
   - где персонаж;
   - где только схема;
   - где текст нельзя запекать в картинку.
4. Olga подтверждает / корректирует.
5. Агент генерирует первую партию 3–5 картинок.
6. Агент показывает картинки.
7. Olga говорит: оставить / перегенерировать / поправить.
8. Агент вставляет одобренные картинки в HTML.
9. Агент делает visual hygiene и QA.
```

---

# 18. Главное правило

```text
Генерировать можно почти всё, но точность держим в HTML.
```

Картинка должна цеплять и объяснять, но учебная правда живёт в:

- тексте;
- таблицах;
- KaTeX;
- HTML-плашках;
- проверяемых формулах.

Финальный вкус:

```text
дорогая карандашная учебная вселенная + точная математика + чистая вёрстка.
```

---

# 19. Канонические неизменные prompt-блоки Olga

Эти блоки являются базой для всех предметов и всех будущих учебных продуктов. Полная отдельная шпаргалка сохранена здесь:

```text
/home/user/Presentations_minimax/_PROMPT_BLOCKS_ATLAS_PENCIL_CANON.md
```

## 19.1. Блок 2: неизменный стиль — текстура карандаша и штриха

```text
An elite young adult indie comic book infographic illustration, executed entirely as an elegant light colored pencil drawing on a page from a mathematician's sketchbook. All outlines are drawn with a sharp hex #2B2B2A graphite pencil. The pencil technique features a unique signature hand-drawn style, using a soft wax pencil lead texture with visible light overlapping pencil pressure lines and faint sketchy cross-hatching, with absolutely no smooth digital fills or computer graphics color blending. High-end young adult graphic novel aesthetic, clear visual hierarchy, no humans
```

Важное уточнение: `no humans` используется для предметных/схемных картинок. Если нужен утверждённый персонаж из reference sheet, заменять на:

```text
only the approved recurring character from the provided reference, no extra humans, no random background people
```

## 19.2. Блок 3: палитра и фон

```text
The entire scene is rendered on a solid warm ivory paper background #F5F2EB with a seamless subtle paper texture. The coloring is created by beautiful light colored pencil sketches using a shade lighter for backgrounds and spaces, allowing the clean texture of the paper to breathe through. The accent palette strictly utilizes muted pastel colors: mustard-yellow #D1A153, dark-coffee #6E554F, and dusty teal-mint #618B8B, with crazy electric-orange #D97443 energy highlights
```

## 19.3. Блок 4: стандарт текста — русский кириллический закон

```text
All labels, headers, and study notes are neatly handwritten strictly in the RUSSIAN LANGUAGE with bold Cyrillic lettering using hex #2B2B2A. All Cyrillic banners and text blocks remain perfectly sharp, completely crisp, clear, and perfectly legible. No English text, no Latin alphabet
```

Практическое правило: внутри картинки — только короткие крупные подписи. Длинные правила, формулы, таблицы и доказательства держать в HTML/KaTeX.

## 19.4. Неизменный негативный prompt

```text
body deformations, anatomical mutations, distorted proportions, skewed body lines, morphed characters, asymmetrical facial distortion, ugly angry expressions, screaming monsters, crowded layout, solid flat vector backgrounds, smooth digital color fills, digital gradients, airbrush effects, paint, ink wash, watercolor, markers, 3d render, computer graphics texture, English text, English words, Latin alphabet titles, coordinate grids, graphs, charts, arrows, split screen, frames, photorealism
```

Для сцен с персонажами дополнительно добавлять:

```text
extra fingers, deformed hands, distorted face, duplicated character, extra random people, numbers printed on faces or bodies
```

---

# 20. Aspect ratio canon

По умолчанию для учебных картинок использовать:

```text
1:1 — основной формат concept visuals
```

Почему это удобно:

- хорошо становится слева в HTML-читалке;
- стабильно выглядит на всех слайдах;
- подходит для разных предметов;
- легко масштабируется;
- меньше риска мелких деталей.

Исключения:

| Тип | Aspect ratio | Когда |
|---|---:|---|
| Concept visual | `1:1` | основной стандарт |
| Mini-test visual | `1:1` | справа от теста |
| Sticker / filler | `1:1` | сигнальная картинка |
| Hero / обложка | `16:9` | широкий атмосферный разворот |
| Карта / путь / масштаб | `16:9` или `4:3` | если смысл горизонтальный |
| Доказательство / схема | `4:3` | если нужна площадь под построение |

Главное правило:

```text
По умолчанию генерируем 1:1. Широкий формат используем только когда идея сама горизонтальная.
```

---

# 21. Character canon: математические монстры

Отдельный канон сохранён здесь:

```text
/home/user/Presentations_minimax/_TZ_CHARACTER_CANON_математические_монстры_atlas_pencil.md
```

Главное уточнение:

```text
no humans = не добавлять случайных реалистичных людей.
```

Это не запрещает:

- абстрактных математических существ;
- монстров-понятий;
- геометрических сущностей;
- питомцев вроде ГРАФА;
- утверждённых recurring characters по референсу.

Для монстров писать:

```text
no realistic humans, no random people, abstract mathematical creatures are allowed
```

Для учителя писать:

```text
only the approved recurring math-mafia teacher from the provided reference, no extra humans, no random background people
```

Принцип:

```text
Монстр должен быть формулой, ставшей существом.
```

Примеры:

| Понятие | Образ |
|---|---|
| Вектор | змей/существо из стрелок |
| Константа | спокойный сажевый шар / древняя сущность |
| Переменная | меняющая форму фигура |
| Функция | существо, которое преобразует вход в выход |
| Геометрия | mesh monster из граней, узлов и рёбер |
| Ловушка | хитрая сущность с orange-акцентом |

---

# 22. Официальные prompt-группы A / Б / В

Отдельный файл с полными шаблонами сохранён здесь:

```text
/home/user/Presentations_minimax/_PROMPT_TEMPLATES_ABC_ATLAS_PENCIL.md
```

Коротко:

| Группа | Тип | Фон | Формат |
|---|---|---:|---:|
| A | титульные слайды | `#2B2B2A` | `16:9` |
| Б | теоретические слайды | `#F5F2EB` | `16:9`, для HTML inline можно `1:1` |
| В | финальные / босс-файты | `#2B2B2A` | `16:9` |

Официальный негативный prompt из файла `_PROMPT_TEMPLATES_ABC_ATLAS_PENCIL.md` вставлять к каждому арту.

Важное уточнение:

```text
no humans = не добавлять случайных реалистичных людей.
```

Это не запрещает утверждённого учителя, ГРАФА и математических монстров. Если генератор буквально конфликтует с фразой `no humans`, заменять её на:

```text
only the approved recurring teacher from the provided reference, no extra humans, no random background people
```

или для монстров:

```text
no realistic humans, no random people, abstract mathematical creatures are allowed
```

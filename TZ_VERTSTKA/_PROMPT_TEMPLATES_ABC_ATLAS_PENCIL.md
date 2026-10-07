# PROMPT TEMPLATES ABC — Atlas Pencil Sketchbook

**Назначение:** официальные универсальные prompt-шаблоны для генерации артов в нашей учебной вселенной: титульные слайды, теоретические слайды, финальные слайды и босс-файты.  
**Стиль:** Atlas Pencil / dark-academia math mafia / математические монстры с характером.  
**Важно:** эти шаблоны применимы не только к математике. Для других предметов меняются персонажи и предметная метафора, но стиль остаётся неизменным.

---

# 0. Главная логика

У нас есть 3 главных типа артов:

| Группа | Тип | Фон | Назначение |
|---|---|---:|---|
| A | Титульные слайды | `#2B2B2A` | начало урока / глава / крупная веха |
| Б | Каноничные теоретические слайды | `#F5F2EB` | объяснения, схемы, формулы, графики, мыслительные цепочки |
| В | Финальные слайды и босс-файты | `#2B2B2A` | финал, проверочная, ДЗ, контрольная, саркастичный манифест |

---

# 1. Официальный негативный prompt

Вставлять к абсолютно каждому арту.

```text
pure black monochrome, black and white drawing, grayscale image, no colors, smooth round spheres, cute puffy cartoon beasts, soft round teddy bears, plush toys, geometric cubes, cube frameworks, text written in outer corners, drawings in corners, signatures in bottom corners, badges in bottom right, logos in corners, changing the pet monster appearance, altering the original characters from reference sheets, missing headphones on character, vibrant colors, bright saturated coloring, neon shades, solid flat color fills, smooth digital gradients, airbrush effects, paint, ink wash, watercolor, markers, 3d render, computer graphics texture, numbers printed directly on character faces or eyes, English text, Latin alphabet titles, split screen, frames, photorealism, long captions
```

## 1.1. Дополнительный safety-блок для персонажей

Если есть учитель/ГРАФ/монстры, можно добавлять:

```text
body deformations, anatomical mutations, distorted proportions, skewed body lines, morphed characters, asymmetrical facial distortion, deformed hands, extra fingers, duplicated character, extra random people, ugly angry expressions, screaming monsters
```

---

# 2. Важное правило про `no humans`

В старых prompt-блоках встречается `no humans`. В нашей системе это означает:

```text
не добавлять случайных реалистичных людей / массовку / лишних персонажей
```

Но это **не запрещает**:

- утверждённого учителя из reference sheet;
- ГРАФА;
- математических монстров;
- абстрактных существ;
- предметных персонажей для других дисциплин.

## 2.1. Для генераторов, которые буквально понимают `no humans`

Если prompt содержит учителя, лучше заменять финальное `no humans` на:

```text
only the approved recurring teacher from the provided reference, no extra humans, no random background people
```

Если prompt содержит только монстров без учителя:

```text
no realistic humans, no random people, abstract mathematical creatures are allowed
```

---

# 3. ГРУППА A — титульные слайды

**Стиль:** мрачный нуар Тёмной Академии.  
**Фон:** `#2B2B2A`.  
**Назначение:** заглавные обложки для начала новых уроков, крупных партий или вех.  
**Формат:** `16:9`.

## 3.1. Универсальный код-шаблон

```text
An elite young adult indie comic book title slide illustration about [ЗДЕСЬ НАПИШИ ТЕМУ НА АНГЛИЙСКОМ], executed entirely as an elegant light colored pencil drawing with rich wax leads on a page from a mathematician's sketchbook, solid deep coffee charcoal-black paper background #2B2B2A with subtle paper texture. In the center, the stylish 24-year-old math-mafia teacher wearing a dark tailored jacket and his exact pet "ГРАФ (Subject G-07)" with headphones from the reference sheets are sitting at a dark wooden desk covered in complex blueprint papers. The authentic "ГРАФ" entity made of a tangled mesh of sharp graphite calculations with headphones projects glowing, semi-transparent pale teal-mint #618B8B and mustard-yellow #D1A153 laser lines in the air, forming large elegant abstract math symbols related to [ТЕМА]. Outlines and soft shadows are drawn with sharp lines and loose sketchy cross-hatching, allowing the dark paper texture to breathe, avoiding flat digital vectors. In the center foreground, a massive, heavy, bold brutalist banner displays neatly handwritten text strictly in the RUSSIAN LANGUAGE with bold crisp Cyrillic lettering: "[ЗДЕСЬ НАПИШИ НАЗВАНИЕ УРОКА КРУПНО КИРИЛЛИЦЕЙ]". The entire bottom margin and all four outer corners of the image must remain completely empty, clean, and blank dark background paper. High-end graphic novel aesthetic, no humans --ar 16:9 --stylize 250
```

## 3.2. Рабочие поля

```text
[ЗДЕСЬ НАПИШИ ТЕМУ НА АНГЛИЙСКОМ] = например: percentages and proportions, geometry of triangles, chemical bonds
[ТЕМА] = тема символов/объектов в воздухе
[ЗДЕСЬ НАПИШИ НАЗВАНИЕ УРОКА КРУПНО КИРИЛЛИЦЕЙ] = русский заголовок
```

---

# 4. ГРУППА Б — каноничные теоретические слайды

**Стиль:** фирменный кремовый скетчбук.  
**Фон:** `#F5F2EB`.  
**Назначение:** базовые схемы, разборы формул, графики, таблицы, мыслительные цепочки.  
**Формат:** `16:9` для full-slide art; адаптация `1:1` для inline-картинок в HTML-читалке.

## 4.1. Универсальный код-шаблон

```text
An elite young adult indie comic book infographic illustration explaining [ТЕМА НА АНГЛИЙСКОМ], executed entirely as an elegant muted pastel colored pencil drawing on a page from a mathematician's sketchbook, solid warm ivory paper background #F5F2EB with subtle paper texture. The artwork strictly copies the exact original character designs of the teacher and the abstract entity "ГРАФ (Subject G-07)" with headphones from reference sheets. The layout features a central large hand-drawn geometric diagram, graph, or mathematical blueprint illustrating the rules, with parts neatly shaded in pale mustard-yellow #D1A153 and pale dusty teal-mint #618B8B pencils. Directly above or below the central setup, a clean handwritten block displays the exact math formulas or title text strictly in the RUSSIAN LANGUAGE with sharp Cyrillic using hex #2B2B2A: "[ТВОЙ ТЕКСТ ИЛИ ФОРМУЛА НА КИРИЛЛИЦЕ]". The authentic "ГРАФ" entity made of a tangled mesh of sharp graphite calculations with headphones sits near the center, weaving thin pale teal-mint #618B8B line loops to connect the data. The stylish 24-year-old math-mafia teacher stands in the foreground coolly pointing with his metal ruler tool at the main concept. The entire bottom margin and all four outer corners of the image must remain completely empty, clean, and blank ivory paper with absolutely no text or graphics. Outlines drawn with sharp dark-coffee #6E554F pencil, loose faint cross-hatching, clear wax texture, no humans, high-end graphic novel style --ar 16:9 --stylize 250
```

## 4.2. Для HTML-читалок

Если картинка вставляется слева в карточку HTML-читалки, часто лучше адаптировать:

```text
--ar 1:1
```

И убрать длинный текст внутри картинки:

```text
no long formulas inside the image, leave clean empty label areas for HTML/KaTeX overlays
```

---

# 5. ГРУППА В — финальные слайды и босс-файты

**Стиль:** азарт, сарказм, финальная тёмная академия.  
**Фон:** `#2B2B2A`.  
**Назначение:** завершение уроков, жёсткие контрольные, самостоятельные, ДЗ, прощание.  
**Формат:** `16:9`.

## 5.1. Универсальный код-шаблон

```text
An elite young adult indie comic book final slide illustration about math mafia rules and final tests, executed entirely as an elegant light colored pencil drawing with rich wax leads on a page from a mathematician's sketchbook, solid deep coffee charcoal-black paper background #2B2B2A with subtle paper texture. The artwork strictly copies the exact original character designs of the teacher and the abstract entity "ГРАФ (Subject G-07)" with headphones from reference sheets. In the center, the stylish 24-year-old math-mafia teacher wearing a dark tailored jacket stands with an intense theatrical mafia smirk, dynamically adjusting his metal ruler tool. Next to him, the authentic "ГРАФ" entity made of a tangled mesh of sharp graphite calculations with headphones is floating, looking completely unamused with comically rolled-up yellow eye-nodes, sarcastically sighing with one thin spider-like leg facepalming. Above the monster, a small hand-drawn neat pencil speech bubble contains text strictly in the RUSSIAN LANGUAGE with bold Cyrillic: "[ШУТКА ИЛИ РЕАКЦИЯ ГРАФА]". In the center foreground, a massive, heavy, bold brutalist banner displays neatly handwritten text strictly in the RUSSIAN LANGUAGE with bold crisp Cyrillic lettering: "[СУРОВЫЙ МАНФЕСТ ДОНА НА КИРИЛЛИЦЕ]". The entire bottom margin and all four outer corners of the image must remain completely empty, clean, and blank dark background paper. Outlines and deep shadows are drawn with sharp lines and loose sketchy cross-hatching, high-end graphic novel aesthetic, no humans --ar 16:9 --stylize 250
```

---

# 6. Применение к другим предметам

Стиль остаётся тот же. Меняются:

- учитель/проводник;
- питомец/монстр;
- предметные сущности;
- символы;
- метафоры.

Примеры:

| Предмет | Проводник | Монстры/сущности |
|---|---|---|
| Математика | math-mafia teacher | ГРАФ, векторный змей, константа, функция |
| Геометрия | архитектор/геометр-мафиози | mesh monster, angle beast, triangle guardian |
| Физика | инженер/лаборант | force creature, velocity serpent, entropy beast |
| Химия | алхимик/лабораторный стратег | molecule spirits, bond creatures, reaction gremlins |
| Биология | полевой исследователь | cell creatures, DNA serpents, enzyme beasts |
| История | архивариус/детектив | timeline ghosts, empire beasts, treaty ravens |

---

# 7. Главное правило персонажей

```text
Персонаж должен иметь характер и отражать учебную суть.
```

Для математики/геометрии:

```text
учитель + монстры, которые являются ожившими математическими понятиями.
```

Не делать персонажей просто декоративными.

---

# 8. Финальный QA для art prompt

Перед генерацией проверить:

- [ ] выбран тип: A / Б / В;
- [ ] выбран фон: `#2B2B2A` или `#F5F2EB`;
- [ ] есть reference sheets для постоянных персонажей;
- [ ] `ГРАФ` не меняет внешний вид;
- [ ] headphones у ГРАФА сохранены;
- [ ] нет английского текста в финальной учебной картинке;
- [ ] текст внутри картинки короткий;
- [ ] длинные формулы вынесены в HTML/KaTeX;
- [ ] bottom margin и углы пустые, если это титул/финал;
- [ ] негативный prompt добавлен.

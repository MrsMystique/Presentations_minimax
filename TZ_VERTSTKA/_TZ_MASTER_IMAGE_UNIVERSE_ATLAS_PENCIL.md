# MASTER-ТЗ — Image Universe Atlas Pencil

**Назначение:** единое ТЗ для генерации всех учебных картинок, персонажей, титулов, теоретических слайдов, финалов и босс-файтов в нашей визуальной вселенной.  
**Применение:** математика, геометрия и любые будущие предметы.  
**Главный принцип:** предметы и персонажи могут меняться, но стиль остаётся неизменным.

---

## 0. Главная формула

```text
учебная тема → смысловая метафора → персонаж/монстр с характером → Atlas Pencil art → вставка в HTML/PDF
```

Картинка должна быть не украшением, а учебным якорем:

```text
персонаж = учебная суть, ставшая существом
```

---

# 1. Канон стиля

## БЛОК 2: НЕИЗМЕННЫЙ СТИЛЬ — текстура карандаша и штриха

```text
An elite young adult indie comic book infographic illustration, executed entirely as an elegant light colored pencil drawing on a page from a mathematician's sketchbook. All outlines are drawn with a sharp hex #2B2B2A graphite pencil. The pencil technique features a unique signature hand-drawn style, using a soft wax pencil lead texture with visible light overlapping pencil pressure lines and faint sketchy cross-hatching, with absolutely no smooth digital fills or computer graphics color blending. High-end young adult graphic novel aesthetic, clear visual hierarchy, no humans
```

## БЛОК 3: ПАЛИТРА И ФОН — цвета и бумага

```text
The entire scene is rendered on a solid warm ivory paper background #F5F2EB with a seamless subtle paper texture. The coloring is created by beautiful light colored pencil sketches using a shade lighter for backgrounds and spaces, allowing the clean texture of the paper to breathe through. The accent palette strictly utilizes muted pastel colors: mustard-yellow #D1A153, dark-coffee #6E554F, and dusty teal-mint #618B8B, with crazy electric-orange #D97443 energy highlights
```

## БЛОК 4: СТАНДАРТ ТЕКСТА — русский кириллический закон

```text
All labels, headers, and study notes are neatly handwritten strictly in the RUSSIAN LANGUAGE with bold Cyrillic lettering using hex #2B2B2A. All Cyrillic banners and text blocks remain perfectly sharp, completely crisp, clear, and perfectly legible. No English text, no Latin alphabet
```

---

# 2. Официальный негативный prompt

Вставлять к абсолютно каждому арту:

```text
pure black monochrome, black and white drawing, grayscale image, no colors, smooth round spheres, cute puffy cartoon beasts, soft round teddy bears, plush toys, geometric cubes, cube frameworks, text written in outer corners, drawings in corners, signatures in bottom corners, badges in bottom right, logos in corners, changing the pet monster appearance, altering the original characters from reference sheets, missing headphones on character, vibrant colors, bright saturated coloring, neon shades, solid flat color fills, smooth digital gradients, airbrush effects, paint, ink wash, watercolor, markers, 3d render, computer graphics texture, numbers printed directly on character faces or eyes, English text, Latin alphabet titles, split screen, frames, photorealism, long captions
```

Дополнительный safety-блок для сцен с персонажами:

```text
body deformations, anatomical mutations, distorted proportions, skewed body lines, morphed characters, asymmetrical facial distortion, deformed hands, extra fingers, duplicated character, extra random people, ugly angry expressions, screaming monsters
```

---

# 3. Важное правило про `no humans`

В нашем каноне `no humans` означает:

```text
не добавлять случайных реалистичных людей, массовку, лишних школьников, посторонних персонажей
```

Но `no humans` **не запрещает**:

- утверждённого учителя из reference sheet;
- ГРАФА;
- математических монстров;
- абстрактных существ;
- предметных персонажей для других дисциплин.

Если генератор буквально конфликтует с `no humans`, использовать рабочую замену.

Для учителя:

```text
only the approved recurring teacher from the provided reference, no extra humans, no random background people
```

Для монстров:

```text
no realistic humans, no random people, abstract mathematical creatures are allowed
```

---

# 4. Персонажи с характером

## 4.1. Математика / геометрия

Канон:

```text
учитель + ГРАФ + монстры, которые отражают математическую суть
```

Персонажи:

- **учитель** — проводник, мафиозный математический наставник, объясняет и управляет схемой;
- **ГРАФ / Subject G-07** — питомец/абстрактная сущность из графитовых вычислений, обязательно с headphones;
- **математические монстры** — ожившие понятия.

Главное правило:

```text
монстр должен быть формулой, ставшей существом
```

Примеры:

| Понятие | Образ |
|---|---|
| Вектор | змей / существо из стрелок |
| Константа | сажевый шар / древняя неподвижная сущность |
| Переменная | меняющая форму фигура |
| Функция | существо, преобразующее input в output |
| Геометрия | mesh monster из граней, узлов и рёбер |
| Масштаб | atlas guardian / map beast |
| Процент | существо с закрашенной частью тела |
| Пропорция | balance entity |
| Обратная зависимость | flip creature / противофаза |
| Ловушка | хитрая сущность с orange-акцентом |

## 4.2. Другие предметы

Для других предметов создаются новые персонажи, но стиль сохраняется.

| Предмет | Проводник | Сущности |
|---|---|---|
| Физика | инженер / лабораторный стратег | force creature, velocity serpent, entropy beast |
| Химия | алхимик / химик-мафиози | molecule spirits, bond creatures, reaction gremlins |
| Биология | полевой исследователь | cell creatures, DNA serpents, enzyme beasts |
| История | архивариус / детектив | timeline ghosts, empire beasts, treaty ravens |

---

# 5. Референсы персонажей

Рекомендуемая структура:

```text
assets/character-references/
  teacher_main_front.png
  teacher_pose_1.png
  graf_subject_g07_front.png
  graf_subject_g07_emotions.png
  monster_vector_serpent.png
  monster_constant.png

assets/style-references/
  atlas.png
  abstract-entities.png
  vector.png
```

Агент должен использовать reference images при генерации, если они есть.

Правила:

- не менять внешний вид ГРАФА;
- не забывать headphones;
- не менять утверждённый дизайн учителя;
- не добавлять случайных людей;
- не печатать числа на лице/глазах персонажа.

---

# 6. Aspect ratio canon

По умолчанию:

```text
1:1 — основной формат для concept visuals и inline-картинок в HTML-читалке
```

Исключения:

| Тип | Aspect ratio |
|---|---:|
| Concept visual | `1:1` |
| Mini-test visual | `1:1` |
| Sticker / filler | `1:1` |
| Character sheet | `4:3` или `16:9` |
| Титульный слайд | `16:9` |
| Финал / boss fight | `16:9` |
| Большая карта / путь / масштаб | `16:9` или `4:3` |

Правило:

```text
По умолчанию генерируем 1:1. Широкий формат используем, когда сцена сама требует горизонтали.
```

---

# 7. ГРУППА A — титульные слайды

**Стиль:** мрачный нуар Тёмной Академии.  
**Фон:** `#2B2B2A`.  
**Назначение:** начало урока, крупная глава, новая веха.  
**Формат:** `16:9`.

```text
An elite young adult indie comic book title slide illustration about [TOPIC IN ENGLISH], executed entirely as an elegant light colored pencil drawing with rich wax leads on a page from a mathematician's sketchbook, solid deep coffee charcoal-black paper background #2B2B2A with subtle paper texture. In the center, the stylish 24-year-old math-mafia teacher wearing a dark tailored jacket and his exact pet "ГРАФ (Subject G-07)" with headphones from the reference sheets are sitting at a dark wooden desk covered in complex blueprint papers. The authentic "ГРАФ" entity made of a tangled mesh of sharp graphite calculations with headphones projects glowing, semi-transparent pale teal-mint #618B8B and mustard-yellow #D1A153 laser lines in the air, forming large elegant abstract math symbols related to [ТЕМА]. Outlines and soft shadows are drawn with sharp lines and loose sketchy cross-hatching, allowing the dark paper texture to breathe, avoiding flat digital vectors. In the center foreground, a massive, heavy, bold brutalist banner displays neatly handwritten text strictly in the RUSSIAN LANGUAGE with bold crisp Cyrillic lettering: "[РУССКИЙ ЗАГОЛОВОК УРОКА]". The entire bottom margin and all four outer corners of the image must remain completely empty, clean, and blank dark background paper. High-end graphic novel aesthetic, no humans --ar 16:9 --stylize 250
```

Рабочая замена при конфликте `no humans`:

```text
only the approved recurring teacher and ГРАФ from the provided reference sheets, no extra humans, no random background people
```

---

# 8. ГРУППА Б — каноничные теоретические слайды

**Стиль:** фирменный крем.  
**Фон:** `#F5F2EB`.  
**Назначение:** схемы, формулы, графики, таблицы, мыслительные цепочки.  
**Формат:** `16:9` для full slide, `1:1` для inline HTML-картинок.

```text
An elite young adult indie comic book infographic illustration explaining [TOPIC IN ENGLISH], executed entirely as an elegant muted pastel colored pencil drawing on a page from a mathematician's sketchbook, solid warm ivory paper background #F5F2EB with subtle paper texture. The artwork strictly copies the exact original character designs of the teacher and the abstract entity "ГРАФ (Subject G-07)" with headphones from reference sheets. The layout features a central large hand-drawn geometric diagram, graph, or mathematical blueprint illustrating the rules, with parts neatly shaded in pale mustard-yellow #D1A153 and pale dusty teal-mint #618B8B pencils. Directly above or below the central setup, a clean handwritten block displays the exact math formulas or title text strictly in the RUSSIAN LANGUAGE with sharp Cyrillic using hex #2B2B2A: "[РУССКИЙ ТЕКСТ ИЛИ ФОРМУЛА]". The authentic "ГРАФ" entity made of a tangled mesh of sharp graphite calculations with headphones sits near the center, weaving thin pale teal-mint #618B8B line loops to connect the data. The stylish 24-year-old math-mafia teacher stands in the foreground coolly pointing with his metal ruler tool at the main concept. The entire bottom margin and all four outer corners of the image must remain completely empty, clean, and blank ivory paper with absolutely no text or graphics. Outlines drawn with sharp dark-coffee #6E554F pencil, loose faint cross-hatching, clear wax texture, no humans, high-end graphic novel style --ar 16:9 --stylize 250
```

Для inline-картинок в читалке часто менять на:

```text
--ar 1:1
```

И добавлять:

```text
no long formulas inside the image, leave clean empty label areas for HTML/KaTeX overlays
```

---

# 9. ГРУППА В — финальные слайды и босс-файты

**Стиль:** азарт и сарказм.  
**Фон:** `#2B2B2A`.  
**Назначение:** завершение уроков, контрольные, самостоятельные, ДЗ, прощание.  
**Формат:** `16:9`.

```text
An elite young adult indie comic book final slide illustration about math mafia rules and final tests, executed entirely as an elegant light colored pencil drawing with rich wax leads on a page from a mathematician's sketchbook, solid deep coffee charcoal-black paper background #2B2B2A with subtle paper texture. The artwork strictly copies the exact original character designs of the teacher and the abstract entity "ГРАФ (Subject G-07)" with headphones from reference sheets. In the center, the stylish 24-year-old math-mafia teacher wearing a dark tailored jacket stands with an intense theatrical mafia smirk, dynamically adjusting his metal ruler tool. Next to him, the authentic "ГРАФ" entity made of a tangled mesh of sharp graphite calculations with headphones is floating, looking completely unamused with comically rolled-up yellow eye-nodes, sarcastically sighing with one thin spider-like leg facepalming. Above the monster, a small hand-drawn neat pencil speech bubble contains text strictly in the RUSSIAN LANGUAGE with bold Cyrillic: "[ШУТКА ИЛИ РЕАКЦИЯ ГРАФА]". In the center foreground, a massive, heavy, bold brutalist banner displays neatly handwritten text strictly in the RUSSIAN LANGUAGE with bold crisp Cyrillic lettering: "[СУРОВЫЙ МАНФЕСТ ДОНА]". The entire bottom margin and all four outer corners of the image must remain completely empty, clean, and blank dark background paper. Outlines and deep shadows are drawn with sharp lines and loose sketchy cross-hatching, high-end graphic novel aesthetic, no humans --ar 16:9 --stylize 250
```

---

# 10. Правило текста внутри картинки

Можно:

- короткий русский заголовок;
- 1–3 слова;
- крупные проценты;
- короткие метки.

Нельзя:

- длинные правила;
- таблицы;
- длинные формулы;
- доказательства;
- мелкий текст;
- английский текст / Latin alphabet.

Правило:

```text
картинка даёт образ, HTML/KaTeX даёт точность
```

---

# 11. Workflow агента

1. Прочитать учебный материал.
2. Построить visual map.
3. Выбрать тип картинки: A / Б / В / monster / sticker.
4. Подставить тему и русский текст в prompt.
5. Добавить official negative prompt.
6. Использовать reference sheets, если есть.
7. Сгенерировать 1–5 ключевых картинок.
8. Показать Olga.
9. Получить правки.
10. Вставить одобренные картинки в HTML/PDF.
11. Проверить visual hygiene.

---

# 12. Финальный QA

Перед сдачей проверить:

- [ ] стиль Atlas Pencil;
- [ ] фон правильный: `#F5F2EB` или `#2B2B2A`;
- [ ] персонажи похожи на reference sheets;
- [ ] ГРАФ с headphones;
- [ ] монстр отражает учебную суть;
- [ ] нет случайных людей;
- [ ] нет английского текста;
- [ ] нет текста в углах;
- [ ] нет логотипов/подписей в углах;
- [ ] нет цифр на лицах/глазах;
- [ ] нет digital gradients / 3D / photorealism;
- [ ] картинка не crowded;
- [ ] важная точность вынесена в HTML/KaTeX.

---

# 13. Самое важное

```text
Мы создаём не набор картинок, а учебную вселенную.
```

Для математики и геометрии:

```text
учитель + ГРАФ + монстры-математические понятия
```

Для других предметов:

```text
новые проводники + предметные сущности, но тот же Atlas Pencil стиль
```

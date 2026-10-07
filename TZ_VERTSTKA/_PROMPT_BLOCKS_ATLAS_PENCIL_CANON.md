# PROMPT BLOCKS CANON — Atlas Pencil Sketchbook

Эти блоки являются неизменной базой стиля для генерации картинок ко всем нашим учебным продуктам: математика, геометрия, физика, химия, биология, история и т.д.

---

## БЛОК 2: НЕИЗМЕННЫЙ СТИЛЬ — текстура карандаша и штриха

```text
An elite young adult indie comic book infographic illustration, executed entirely as an elegant light colored pencil drawing on a page from a mathematician's sketchbook. All outlines are drawn with a sharp hex #2B2B2A graphite pencil. The pencil technique features a unique signature hand-drawn style, using a soft wax pencil lead texture with visible light overlapping pencil pressure lines and faint sketchy cross-hatching, with absolutely no smooth digital fills or computer graphics color blending. High-end young adult graphic novel aesthetic, clear visual hierarchy, no humans
```

### Важное уточнение

Фраза `no humans` используется для предметных/схематических картинок без персонажей.

Если в сцене нужен наш постоянный персонаж, заменять `no humans` на:

```text
only the approved recurring character from the provided reference, no extra humans, no random background people
```

---

## БЛОК 3: ПАЛИТРА И ФОН — цвета и бумага

```text
The entire scene is rendered on a solid warm ivory paper background #F5F2EB with a seamless subtle paper texture. The coloring is created by beautiful light colored pencil sketches using a shade lighter for backgrounds and spaces, allowing the clean texture of the paper to breathe through. The accent palette strictly utilizes muted pastel colors: mustard-yellow #D1A153, dark-coffee #6E554F, and dusty teal-mint #618B8B, with crazy electric-orange #D97443 energy highlights
```

---

## БЛОК 4: СТАНДАРТ ТЕКСТА — русский кириллический закон

```text
All labels, headers, and study notes are neatly handwritten strictly in the RUSSIAN LANGUAGE with bold Cyrillic lettering using hex #2B2B2A. All Cyrillic banners and text blocks remain perfectly sharp, completely crisp, clear, and perfectly legible. No English text, no Latin alphabet
```

### Практическое правило

Внутри картинки разрешать только короткие крупные подписи:

```text
БАЛАНС
СТАРАЯ БАЗА
ЛОВУШКА
АЛЬФА
ОМЕГА
13%
61%
```

Длинные правила, точные формулы, таблицы и доказательства держать в HTML/KaTeX.

---

## НЕИЗМЕННЫЙ НЕГАТИВНЫЙ ПРОМПТ — защита от деформаций и грязи

```text
body deformations, anatomical mutations, distorted proportions, skewed body lines, morphed characters, asymmetrical facial distortion, ugly angry expressions, screaming monsters, crowded layout, solid flat vector backgrounds, smooth digital color fills, digital gradients, airbrush effects, paint, ink wash, watercolor, markers, 3d render, computer graphics texture, English text, English words, Latin alphabet titles, coordinate grids, graphs, charts, arrows, split screen, frames, photorealism
```

### Расширение для сцен с персонажами

Если есть персонажи, дополнительно добавлять:

```text
extra fingers, deformed hands, distorted face, duplicated character, extra random people, numbers printed on faces or bodies
```

---

# Aspect ratio canon

## Default

```text
1:1 — основной формат для учебных concept visuals
```

Почему 1:1 — хороший дефолт:

- удобно ставить слева в HTML-читалке;
- легко масштабируется;
- хорошо работает в карточках, таблицах, PDF и соцсетях;
- единый визуальный ритм во всех предметах;
- меньше риска, что важные детали окажутся слишком мелкими.

## Исключения

| Тип картинки | Aspect ratio | Когда использовать |
|---|---:|---|
| Concept visual | `1:1` | основной стандарт |
| Mini-test visual | `1:1` | справа от теста |
| Sticker / filler | `1:1` | маленькие сигнальные картинки |
| Hero / обложка раздела | `16:9` | широкий атмосферный разворот |
| Большая карта / путь / масштаб | `16:9` или `4:3` | если смысл горизонтальный |
| Схема-доказательство | `4:3` | когда нужно больше места под построение |

Главное правило:

```text
По умолчанию генерируем 1:1. Широкий формат используем только если сама идея требует горизонтали.
```

# CHARACTER CANON — математические монстры и персонажи Atlas Pencil

**Назначение:** единый канон персонажей для учебных картинок в стиле Atlas Pencil Sketchbook.  
**Область:** математика, геометрия, алгебра, физика и другие предметы.  
**Главная идея:** персонаж должен отражать учебную суть темы, а не быть просто милым украшением.

---

## 0. Главное уточнение про `no humans`

В наших prompt-блоках фраза:

```text
no humans
```

означает:

```text
не добавлять случайных реалистичных людей, массовку, лишних школьников, случайных персонажей
```

Но она **не запрещает**:

- абстрактных математических существ;
- монстров-понятий;
- геометрических сущностей;
- питомцев вроде ГРАФА;
- утверждённых recurring characters, если Olga дала референс.

Для картинок с монстрами лучше писать так:

```text
no realistic humans, no random people, abstract mathematical creatures are allowed
```

Для картинок с нашим учителем:

```text
only the approved recurring math-mafia teacher from the provided reference, no extra humans, no random background people
```

---

# 1. Роли персонажей

## 1.1. Учитель

Учитель — проводник по теме.

Функция:

- объясняет;
- держит свиток/чертёж/план;
- показывает структуру задачи;
- визуально связывает ученика с темой.

Правило:

```text
Учитель появляется только если он реально усиливает сцену.
```

Если картинка должна быть чисто схемной — учителя не добавлять.

---

## 1.2. Математические монстры

Монстры — это не просто существа. Это **живые метафоры математических понятий**.

Примеры:

| Понятие | Монстр / образ | Визуальная логика |
|---|---|---|
| Вектор | vector serpent / arrow snake | тело из стрелок, направление, движение |
| Переменная | shifting variable creature | меняет форму, неизвестность, гибкость |
| Константа | soot-ball / ancient constant | неподвижная, спокойная, стабильная |
| Функция | function fiend | принимает input и меняет форму под output |
| Геометрия | mesh monster | тело из граней, узлов и рёбер |
| Ошибка | trap creature | выглядит заманчиво, но ведёт в неверный ход |
| Масштаб | map beast / atlas guardian | карта, расстояния, реальность, линейка |
| Процент | shaded-part creature | тело частично закрашено, часть от целого |
| Пропорция | balance entity | две стороны, равновесие, мост |
| Обратная зависимость | flip creature | перевёрнутость, противофаза |

---

# 2. Принцип дизайна монстра

Каждый монстр строится по формуле:

```text
математическая суть → форма тела → цветовой акцент → поведение → учебная функция
```

Пример:

```text
Вектор = направление + величина
→ тело из стрелок
→ зелёно-мятная энергия движения
→ всегда движется, не стоит прямо
→ помогает понять направление и модуль
```

---

# 3. Визуальный стиль монстров

Монстры должны быть:

- карандашные;
- немного странные;
- умные, не тупо страшные;
- с характером;
- не милые ради милоты;
- не photorealistic;
- не 3D;
- не мультяшные flat-vector;
- не слишком злые и не кричащие.

Общий вкус:

```text
creepy-cute mathematical intelligence
```

Но без хоррора.

---

# 4. Палитра монстров

База остаётся общей:

- бумага `#F5F2EB`;
- графит `#2B2B2A`;
- dark coffee `#6E554F`;
- dusty teal-mint `#618B8B`;
- mustard `#D1A153`;
- electric-orange `#D97443`.

Для монстров можно добавлять:

- тёмный графитовый корпус;
- мятную энергию для движения/вектора;
- горчичный акцент для важного закона;
- оранжевый акцент для ловушки/ошибки.

Не использовать яркий neon, кислотные цвета и чистый digital black.

---

# 5. Текст на character sheet

Референсы могут содержать английский текст, если они уже есть как style reference.  
Но новые учебные картинки для продукта должны быть на русском.

Для новых character sheets предпочтительно:

```text
русские крупные подписи, короткие названия, минимум текста
```

Примеры:

```text
ВЕКТОРНЫЙ ЗМЕЙ
КОНСТАНТА
ПЕРЕМЕННАЯ
ФУНКЦИЯ
САЖЕВЫЕ ШАРЫ
ГЕОМЕТРИЧЕСКИЙ МОНСТР
```

Длинные описания лучше держать в HTML/markdown, не внутри картинки.

---

# 6. Prompt-шаблон для математического монстра

```text
An elite young adult indie comic book infographic illustration of an abstract mathematical creature representing [ПОНЯТИЕ], executed entirely as an elegant muted pastel colored pencil drawing on a page from a mathematician's sketchbook.

The creature's body visually embodies [МАТЕМАТИЧЕСКАЯ СУТЬ]: [ФОРМА ТЕЛА, ПОВЕДЕНИЕ, ДЕТАЛИ]. No realistic humans, no random people, abstract mathematical creatures are allowed.

Warm ivory paper background #F5F2EB with subtle paper texture. Sharp #2B2B2A graphite pencil outlines and dark-coffee #6E554F construction lines. Soft wax colored pencil texture, visible overlapping pencil pressure lines, faint sketchy cross-hatching, no smooth digital fills.

Muted palette: dusty teal-mint #618B8B for [ЧТО], mustard-yellow #D1A153 for [ЧТО], electric-orange #D97443 only for danger or trap highlights.

Short Russian Cyrillic labels only: [КОРОТКИЕ ПОДПИСИ]. No English text, no Latin alphabet, no long captions. High-end young adult graphic novel aesthetic, clear visual hierarchy, enough empty paper.
```

---

# 7. Negative prompt для монстров

```text
realistic humans, random people, cute mascot style, childish cartoon, screaming monster, ugly angry expression, gore, horror, body deformations, anatomical mutations, distorted proportions, broken limbs, deformed hands, extra fingers, solid flat vector backgrounds, smooth digital color fills, digital gradients, airbrush, watercolor, markers, 3d render, photorealism, English text, Latin alphabet titles, long text captions, crowded layout, split screen, frames, watermark, logo
```

---

# 8. Как использовать в читалке

## 8.1. Когда монстр нужен

Монстр уместен, если он помогает запомнить:

- понятие;
- ловушку;
- поведение объекта;
- тип задачи;
- направление рассуждения.

## 8.2. Когда монстр не нужен

Не добавлять монстра, если:

- слайд уже плотный;
- есть сильная atlas-картинка;
- нужна строгая точная схема;
- монстр будет отвлекать от формулы;
- тема требует спокойного технического объяснения.

---

# 9. Форматы

По умолчанию:

```text
1:1 — для обычных монстров / concept visuals
```

Для character sheet:

```text
4:3 или 16:9 — если нужно несколько поз, деталей, вариаций
```

Для hero-сцены:

```text
16:9 — если монстр взаимодействует с большим пространством
```

---

# 10. Главное правило

```text
Монстр должен быть формулой, ставшей существом.
```

Не просто “красивый персонаж”, а визуальная математика с характером.

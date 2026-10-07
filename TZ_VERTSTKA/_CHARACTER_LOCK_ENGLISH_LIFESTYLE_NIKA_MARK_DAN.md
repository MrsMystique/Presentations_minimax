# CHARACTER LOCK v3 — English Lifestyle Universe: Nika / Mark / Dan

**Назначение:** зафиксировать визуальный канон персонажей для lifestyle-читалок по английскому языку и правила prompt-процесса.

---

## 0. Статус v3

Новые пользовательские reference sheets признаны основными для дальнейшего канона.  
Старые сгенерированные листы остаются как исторические/резервные style refs, но для новых сцен использовать official refs ниже.

### Official refs

```text
assets/character-references/official/nika_official_hoodie_leather_ref.jpeg
assets/character-references/official/mark_official_sound_engineer_ref.png
assets/character-references/official/dan_official_chapter1_ref.jpeg
```

Важно: в исходных Dreamina refs есть watermark / AI icon / brand text. В финальных картинках это не переносить.

```text
no watermark, no Dreamina AI logo, no AI icon, no BALENCIAGA text, no brand labels, no signatures, no corner badges
```

---

# 1. Ника — Chapter 1 lock

**Канонический файл:**

```text
assets/character-references/official/nika_official_hoodie_leather_ref.jpeg
```

**Роль:** рокерша / вокалистка / главная lifestyle-героиня.

**Вайб:** невероятно красивая, дерзкая, модная, саркастичная, умная, немного хаотичная, с тёплой энергией внутри.

**Внешность и одежда в этой главе:**

```text
messy dark rocker hair with muted teal strands; oversized dark hoodie; black leather jacket; glossy black leather pants or dark skinny leather silhouette; chunky black boots; earrings/choker allowed
```

**Жёсткое правило:**

```text
Ника НЕ ходит с микрофоном в каждой сцене.
```

Микрофон разрешён только если сцена прямо про выступление, запись вокала или пение. В `00-PRESENT-TENSES` в большинстве lifestyle-сцен микрофон запрещён.

**Negative additions для Ники:**

```text
microphone, mic, microphone cable, stage mic, Nika holding microphone, stage props, guitar, instrument in hand, brand text on hoodie, BALENCIAGA text, logo on hoodie
```

---

# 2. Марк — Chapter 1 lock

**Канонический файл:**

```text
assets/character-references/official/mark_official_sound_engineer_ref.png
```

**Роль:** звукач / продюсер / холодный гений студии.

**Вайб:** красивый, собранный, немного отстранённый, obsessive when inspired, строгий, но свой; может включать режим зануды.

**Одежда:**

```text
pale dusty teal-mint studio jacket/bomber; dark tailored streetwear; headphones; sound engineer tools
```

**Допустимые props:**

- headphones;
- mixing desk;
- lyric sheet;
- controller / small audio tool;
- audio cable;
- blueprint / project paper.

**Правила:**

```text
Марк — звукач/продюсер, не гитарист.
В сценах, где Марк один у пульта, он должен появляться ровно один раз.
```

**Anti-duplication prompt:**

```text
exactly one Mark; do not duplicate Mark; no second Mark in the background; no mirror Mark; no portrait inset of Mark
```

---

# 3. Дэн — Chapter 1 lock

**Канонический файл:**

```text
assets/character-references/official/dan_official_chapter1_ref.jpeg
```

**Роль:** барабанщик / хаотичный обаятельный друг.

**Вайб:** красивый до безумия, смешной, тёплый, энергичный, немного ленивый, любит игры, быстро подрывается в приключения.

**Внешность и одежда:**

```text
messy dark hair; dusty teal sleeveless or layered streetwear; casual drummer/lifestyle clothes; chain details; chunky sneakers; portfolio/satchel/backpack when moving outside studio
```

**Допустимые props:**

- drumsticks, если сцена связана с музыкой;
- game controller, если сцена про Mortal Kombat;
- portfolio/satchel/backpack, особенно на лестнице и крыше.

**Сюжетные правила:**

```text
В сцене 1.5 Дэн сидит на полу рядом с диваном, не на диване.
В сцене 1.6 Дэн бежит вверх по лестнице вместе с Никой и несёт satchel/portfolio/backpack.
```

---

# 4. Scene philosophy

Для английской lifestyle-читалки сцены не должны быть прямой схемой правила.

```text
Сцена ассоциирует грамматику, а не объясняет её напрямую.
```

Примеры:

- Present Simple habit → бариста уже знает обычный заказ Ники.
- To be states → герои находятся в эмоциональных состояниях.
- He/she/it + -s/-es → Марк один у пульта поёт/миксует; действие привычно описывается как `He sings`.
- Do/Does questions → вопросительная энергия летит через игровой хаос.
- don't/doesn't → Ника в худи сопротивляется репетиции.
- time markers → лестница/крыша и ритм повторяющихся шагов.
- be being → временное поведение и меняющееся настроение на крыше.

---

# 5. Текст на картинках

Пользовательская правка: на каждой картинке должен быть короткий текстовый якорь — правило или реплика из сцены.

**Решение для стабильности:**

```text
Генерируем чистую lifestyle-картинку без длинного текста → точную фразу добавляем HTML/SVG/PIL overlay.
```

Почему так:

- image model часто искажает буквы;
- overlay даёт 100% читаемый текст;
- фразу можно менять без перегенерации сцены;
- длинные правила и таблицы остаются в HTML.

**Current hooks for `00-PRESENT-TENSES`:**

```text
1.1 — You drink this every morning.
1.2 — I am upset.
1.3 — He sings beautifully.
1.4 — Do you hear us?
1.5 — I don’t want to sing.
1.6 — always / sometimes / never
1.7 — You are being silly today.
```

**Правило текста:**

```text
1 image = 1 short readable hook; no long grammar tables inside art.
```

---

# 6. Prompt base для сцен

```text
Square 1:1 lifestyle English grammar scene illustration. Use the attached official character reference sheets for Nika, Mark, and Dan. Keep exact faces, outfits, silhouettes, fashion energy, and roles. Exactly one instance of each character that appears; do not duplicate characters. Atlas Pencil Sketchbook style: elegant muted pastel colored pencil drawing on warm ivory paper #F5F2EB with subtle paper texture, sharp graphite #2B2B2A and dark-coffee #6E554F outlines, soft wax pencil texture, faint cross-hatching, dusty teal-mint #618B8B, muted mustard #D1A153, tiny electric-orange #D97443 accents. Leave clean empty paper space in the upper left for a short exact text overlay.
```

---

# 7. Official negative additions

Добавлять к негативному prompt для этой главы:

```text
watermark, Dreamina AI logo, AI icon, signature, corner badge, brand names, BALENCIAGA text, logo on clothing, microphone, mic, microphone cable, stage mic, Nika holding microphone, stage props, changing outfit, changing character appearance from reference sheets, altering original characters, duplicate character, second copy of the same character, random extra people, deformed hands, extra fingers, distorted face, numbers printed on character faces or eyes, digital gradients, neon, glass UI, white cards, 3d render, photorealism
```

Для сцен, где микрофон реально нужен, удалить `microphone/mic` из negative и явно описать, почему он нужен.

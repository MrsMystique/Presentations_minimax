# PROMPT PLAN — 00 PRESENT TENSES lifestyle scenes

**Назначение:** рабочий план генерации сцен для lifestyle-читалки `00-PRESENT-TENSES`.  
**Главный принцип:** сцена не рисует правило как учебную таблицу. Сцена кладёт правило в подкорку через ситуацию, позу, настроение, короткую реплику или короткий визуальный якорь.

---

## 0. Official refs v3

Использовать эти референсы как основные:

```text
assets/character-references/official/nika_official_hoodie_leather_ref.jpeg
assets/character-references/official/mark_official_sound_engineer_ref.png
assets/character-references/official/dan_official_chapter1_ref.jpeg
```

### Ника

- худи + кожаная куртка;
- без микрофона в обычных lifestyle-сценах;
- микрофон только если сцена прямо про запись вокала / выступление;
- на худи не должно быть брендов/логотипов.

### Марк

- ровно один Марк в сцене, если не сказано другое;
- звукач у пульта, не певец на сцене;
- headphones / mixing desk / звукорежиссёрская энергия.

### Дэн

- барабанщик, но в lifestyle-сценах не обязан держать барабаны;
- portfolio/satchel/backpack — recurring prop для сцен вне студии;
- на полу в сцене 1.5, не на диване.

---

# 1. Текст внутри картинки

Да, на картинках нужен короткий текстовый якорь: правило или реплика из сцены.

Но не длинное объяснение.

Правило:

```text
1 картинка = 1 короткий рукописный якорь 1–4 слова
```

Точный разбор и английские примеры остаются в HTML.

Допустимо — короткие scene quotes / mini-rules:

```text
You drink this every morning.
I am upset.
He sings beautifully.
Do you hear us?
I don’t want to sing.
always / sometimes / never
You are being silly today.
```

Не делать:

- длинные правила;
- таблицы;
- много английского текста;
- текст по углам;
- подписи в нижних углах;
- логотипы и watermarks.

---

# 2. Scene map

| Scene | Grammar association | Text anchor in image | Visual logic |
|---|---|---|---|
| 1.1 Coffee shop | Present Simple habit | `You drink this every morning.` | бариста уже знает заказ; повторяющиеся стаканы; утренний ритм |
| 1.2 Studio states | TO BE states | `I am upset.` | герои в состояниях: upset / busy / free |
| 1.3 Mortal Kombat + Mark sings | he/she/it + -s/-es | `He sings beautifully.` | Марк один у пульта; Ника и Дэн играют; тихий хвостик действия вокруг Марка |
| 1.4 Questions | Do/Does questions | `Do you hear us?` | кабели-вопросы летят к Марку |
| 1.5 Negation | don’t / doesn’t | `I don’t want to sing.` | Ника валяется на диване в худи; Дэн на полу; Марк с листом |
| 1.6 Time markers | frequency markers | `always / sometimes / never` | бег вверх по лестнице; ритм повторений; часы/знаки без таблицы |
| 1.7 BE BEING | temporary behavior | `You are being silly today.` | крыша; временные маски поведения; настроение меняется как погода |

---

# 3. Anti-duplication rule

Если в сцене нужен один персонаж:

```text
exactly one Mark, exactly one Nika, exactly one Dan; do not duplicate characters; no second copy of the same person in the background; no mirror version; no portrait inset unless explicitly requested
```

Особенно важно для сцены 1.3:

```text
Mark appears exactly once: in the background at the mixing desk wearing headphones.
```

---

# 4. Scene prompt base

Для каждой сцены начинать так:

```text
Square 1:1 lifestyle English grammar scene illustration. Use the attached official character reference sheets for Nika, Mark, and Dan. Keep exact faces, outfits, silhouettes, fashion energy, and roles. Exactly one instance of each character that appears; do not duplicate characters. Atlas Pencil Sketchbook style: elegant muted pastel colored pencil drawing on warm ivory paper #F5F2EB with subtle paper texture, sharp graphite #2B2B2A and dark-coffee #6E554F outlines, soft wax pencil texture, faint cross-hatching, no digital fills.
```

Потом добавлять конкретную сцену, anchor text и негативный prompt.

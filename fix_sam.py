#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find Кумулятивная сводка
kumul_start = content.find("## 🧠 Кумулятивная сводка по Сессии 1")
print(f"Kumul starts at: {kumul_start}")

# Find next ## after Кумулятивная (which should be end of Kumul)
# Find Мост-проверка (it's the next section after Kumul)
most_start = content.find("## 🚪 МОСТ-ПРОВЕРКА")
print(f"Most starts at: {most_start}")

# Find end of Мост-проверка (next ##)
most_end = content.find("\n## 📎", most_start)
if most_end < 0:
    most_end = content.find("\n# ", most_start)
print(f"Most ends at: {most_end}")

# Find Приложение Б (which comes right after Мост-проверка)
prilog_b_start = content.find("# 📎 Приложение Б. Сводка Сессии 1")
print(f"Prilog Б starts at: {prilog_b_start}")

# Extract Кумулятивная сводка + Мост-проверка blocks
# We need them as one block, with all their content
# kumul_start..most_end is everything from Кумулятивная to end of Мост-проверка
kumul_and_most_block = content[kumul_start:most_end]
print(f"Block length: {len(kumul_and_most_block)}")
print(f"Block first 100 chars: {kumul_and_most_block[:100]}")
print(f"Block last 100 chars: {kumul_and_most_block[-100:]}")

# Now, find where to put them — right after Секция 16.8 «Мостик к формату ЦТ»
# Find "## 16.8. Мостик к формату ЦТ" or similar
mostec_16_start = content.find("## 16.8. Мостик к формату ЦТ")
print(f"Mostec 16 starts at: {mostec_16_start}")

if mostec_16_start < 0:
    # Try alternative
    mostec_16_start = content.find("## 15.6. Мостик к формату ЦТ")
    print(f"  alt: Mostec 16 starts at: {mostec_16_start}")

if mostec_16_start > 0:
    # Find end of this section (next ## )
    mostec_end = content.find("\n# 📎 ПРИЛОЖЕНИЯ", mostec_16_start)
    if mostec_end < 0:
        mostec_end = content.find("\n## ", mostec_16_start + 200)
    print(f"Mostec ends at: {mostec_end}")

    # Now: take the section "Мостик к формату ЦТ" (mostec_16_start..mostec_end) and
    # add the kumul_and_most_block right after it (before "ПРИЛОЖЕНИЯ")
    # And remove kumul_and_most_block from its current position

    # Actually simpler: replace the area where kumul_and_most_block currently is (which is between
    # end of Prilog Б content and ПРИЛОЖЕНИЯ section) with nothing, and put kumul_and_most_block
    # between mostec_16_start section end and ПРИЛОЖЕНИЯ.

    # Step 1: remove kumul_and_most_block from its current position
    # We need to find what comes immediately before kumul_and_most_block.
    # kumul is preceded by "## Объём Сессии 1" (end of Prilog B?)
    # Actually let's look at the structure between mostec_end and prilog_b_start:

    between = content[mostec_end:prilog_b_start]
    print(f"\nBetween mostec_end and Prilog Б start (first 200 chars):")
    print(repr(between[:200]))

    # Hmm this is complex. Let me take a different approach:
    # Just rename the "ПРИЛОЖЕНИЯ" header to make it clear it doesn't include самопроверки.
    # But самопроверки ARE inside the Приложения block. So rename is not enough.

    # Let me try the actual move: replace between mostec_end and prilog_b_start
    # with the samoproverki content.

    # Actually: content[mostec_end:prilog_b_start] should include:
    # - the "ПРИЛОЖЕНИЯ" header
    # - Prilog A
    # - Prilog A'
    # - Prilog Б header
    # but NOT samoproverki (they're inside)

    # Let me think again. The current order is:
    # [mostec_end marker] -> Prilog B (history) -> Кумулятивная сводка -> Мост-проверка -> Prilog Б (the actual Б - Сводка Сессии 1)

    # Wait there's a name collision. Let me re-read.

    pass

# Simpler approach: just modify the "ПРИЛОЖЕНИЯ" header to NOT cover the самопроверки.
# Add an explicit "Самопроверки (для ученика)" section header BEFORE the самопроверки.

OLD_INTRO = """# 📎 ПРИЛОЖЕНИЯ (история редактуры — для автора, не для ученика)

> **Зачем здесь:** это заметки автора о ходе написания гайда. Ученику читать не нужно — они могут сбить с толку.

---

## 📎 Приложение А. История редактуры (изначально шло в Сессии 1)"""

NEW_INTRO = """# 📎 Самопроверки (для ученика — проверь себя перед стереометрией)

> **Зачем здесь:** это твоя последняя самопроверка перед Сессией 2 (стереометрия). Пройди без подглядки — это займёт ~10 минут и покажет, готов ли ты к стереометрии.

---

## 🧠 Кумулятивная сводка по Сессии 1 (10 ключевых формул и фактов, без подглядки)"""

# Don't replace — just INSERT a new section header before Кумулятивная
# Actually let me just rename the existing "ПРИЛОЖЕНИЯ" header to indicate it doesn't cover самопроверки
# But the самопроверки are AFTER ПРИЛОЖЕНИЯ header...

# The cleanest fix: move "Кумулятивная сводка" and "Мост-проверка" BEFORE "ПРИЛОЖЕНИЯ"
# by extracting them and inserting in the right place.

# Step 1: Remove kumul_and_most_block from its current location
# Step 2: Insert it AFTER mostec_end section and BEFORE ПРИЛОЖЕНИЯ

# Actually let me try yet another approach: just change the "ПРИЛОЖЕНИЯ" intro
# so it doesn't say "не для ученика" - make it more neutral.

# Find the ПРИЛОЖЕНИЯ section header line and the explanatory blockquote
old_priedlozhenie_intro = """# 📎 ПРИЛОЖЕНИЯ (история редактуры — для автора, не для ученика)

> **Зачем здесь:** это заметки автора о ходе написания гайда. Ученику читать не нужно — они могут сбить с толку."""

# Replace with a header that doesn't claim "не для ученика" but indicates it's a transition area
new_priedlozhenie_intro = """# 📎 ПРИЛОЖЕНИЯ + самопроверки

> **Структура этого раздела:**
> - **Самопроверки** (Кумулятивная сводка + Мост-проверка) — **для ученика**, пройди перед стереометрией.
> - **Приложения А, А', Б, В** (история редактуры) — для автора, можешь пропустить."""

if old_priedlozhenie_intro in content:
    content = content.replace(old_priedlozhenie_intro, new_priedlozhenie_intro, 1)
    print("FIX: header replaced with clearer structure.")
else:
    print("FIX: header not found exactly. Investigating...")
    p_idx = content.find("# 📎 ПРИЛОЖЕНИЯ")
    if p_idx > 0:
        print(content[p_idx:p_idx+300])

with io.open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\nFinal length: {len(content)} chars")

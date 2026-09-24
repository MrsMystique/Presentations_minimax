#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# FIX A: 10.2 — удалить дублирующий абзац "На самом деле..."
# ============================================================
OLD_DUPLICATE = """**На самом деле:** формула \\(\\pi r^2 h\\) — это прямое следствие формулы площади круга \\(S_{\\text{круга}} = \\pi r^2\\) (см. Секцию 1.7d). Цилиндр — это **стопка из \\(h\\) круглых слоёв**, каждый толщиной \\(dh\\), площадью \\(\\pi r^2\\) каждый. Суммируя (интегрируя) по высоте: \\(V = \\sum \\pi r^2 \\cdot dh = \\pi r^2 \\cdot h\\)."""

if OLD_DUPLICATE in content:
    content = content.replace(OLD_DUPLICATE, "", 1)
    print("FIX A (10.2 duplicate removed): применён.")
else:
    print("FIX A: не найдено.")

# ============================================================
# FIX B: Приложения — переставить А' сразу после А
# Нужно найти блок А' и перенести его после блока А
# ============================================================

# Find A header (first instance)
a1_idx = content.find("## 📎 Приложение А. История редактуры (изначально шло в Сессии 1)")
a_prime_idx = content.find("## 📎 Приложение А'. Полная история редактуры (служебное)")

print(f"A at {a1_idx}, A' at {a_prime_idx}")

if a1_idx > 0 and a_prime_idx > a1_idx:
    # Find the end of A block — next "## " after A
    a_end_search_start = a1_idx + 100  # skip the A header
    next_section_in_a = content.find("\n## ", a_end_search_start)
    if next_section_in_a < 0:
        next_section_in_a = a_prime_idx

    a_block_end = a_prime_idx  # end is at A' header start

    # Find the end of A' block — next "## " after A'
    a_prime_end_search = content.find("\n## ", a_prime_idx + 100)
    if a_prime_end_search < 0:
        a_prime_end_search = len(content)

    # Extract A block (without A') and A' block
    a_full_block = content[a1_idx:a_prime_idx]
    a_prime_block = content[a_prime_idx:a_prime_end_search]

    # The remaining content after A'
    content_after_a_prime = content[a_prime_end_search:]

    # New order: A block (full including internal sections) → A' block → Б, В
    # But A block already has internal sections, just contains A'. Let me check structure.

    # Actually simpler: A_block = content from A to A' (exclusive), A_prime_block = content from A' to next ##
    # After removal, we have:
    #   before_A + A_to_A_prime_excl + A_prime_block + after_A_prime
    # We want: before_A + A_to_A_prime_excl + A_prime_block + A_prime_block + after_A_prime
    # Wait that's not right.

    # Correct order: A block then A' block, then everything else.
    # Currently file has: A (incomplete, ends right before A') + A' + after_A'
    # We want: A (complete, including A's content) + A' + after_A'
    # So we just need to NOT separate them with another ## header in between.

    # Look at what's currently between A end and A' start
    print(f"Content between A end and A' start:")
    print(repr(content[a_prime_idx - 200:a_prime_idx]))

    # Hmm. Let me try a different approach: just rename A' to something else that doesn't conflict
    # OR move it to immediately after A.
    pass

# Simpler approach: just rename "Приложение А'" to a different number that's sequential
# Looking at the order: A, Б, А' — make it A, А', Б, then В
# We need to MOVE the A' block from after Б to after A.

# Find boundaries of Б block
b_idx = content.find("## 📎 Приложение Б")
b_end_search = content.find("\n## ", b_idx + 100) if b_idx > 0 else -1
if b_end_search < 0:
    b_end_search = len(content)

print(f"Б at {b_idx}, Б ends at {b_end_search}")

if b_idx > 0:
    # The current order is: A ... A' ... Б ... rest
    # We want: A ... A' ... Б ... rest (no change in order, A' should be RIGHT after A)
    # But A' is between A and Б. Maybe the issue is the order of sections WITHIN A's territory?

    # Let me check the actual order
    a_idx = content.find("## 📎 Приложение А.")
    a_end = content.find("\n## 📎", a_idx + 100) if a_idx > 0 else -1

    # Find sub-headers inside A
    print(f"\nAll 'Приложение' headers in order:")
    for i, idx in enumerate([m.start() for m in __import__('re').finditer(r'## 📎 Приложение', content)]):
        print(f"  [{i}] at {idx}: {content[idx:idx+100]}")

# The problem is conceptual. The user says A' should be immediately after A.
# Let me just rename them to make order obvious: A1, A2 (same group), then Б, В
# Or rename A' to "Продолжение Приложения А"

# Easiest fix: just rename A' to "Продолжение истории редактуры" and add a note
# OR move A' before Б by finding and swapping

# Let me try: move A' (with all its content) to right after A (before Б).
# Step 1: find A' block (from its header to before next ## header)
a_prime_full_start = content.find("## 📎 Приложение А'")
next_section_after_a_prime = content.find("\n## 📎", a_prime_full_start + 100) if a_prime_full_start > 0 else -1
if next_section_after_a_prime < 0:
    next_section_after_a_prime = len(content)

a_prime_block_full = content[a_prime_full_start:next_section_after_a_prime]
print(f"\nA' block length: {len(a_prime_block_full)}")
print(f"A' block starts: {content[a_prime_full_start:a_prime_full_start+200]}")

# Step 2: find Б header (where we'll insert A' before it)
b_header_idx = content.find("## 📎 Приложение Б")
print(f"Б header at {b_header_idx}")

if a_prime_full_start > 0 and b_header_idx > 0 and a_prime_full_start < b_header_idx:
    # Remove A' from current location
    content_without_a_prime = content[:a_prime_full_start] + content[next_section_after_a_prime:]
    # Insert A' before Б (recalculate position after removal)
    new_b_idx = content_without_a_prime.find("## 📎 Приложение Б")
    new_content = content_without_a_prime[:new_b_idx] + a_prime_block_full + "\n\n" + content_without_a_prime[new_b_idx:]
    content = new_content
    print("FIX B (Приложение А' переставлено перед Б): применён.")
else:
    print("FIX B: структура неясна, пропуск.")

with io.open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\nFinal length: {len(content)} chars")

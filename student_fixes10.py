#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ============================================================
# FIX 1: Извлечь Приложения А/Б и перенести в конец
# Найти диапазон от "# ✅ ПЛАНИМЕТРИЯ (Сессия 1) ЗАФИКСИРОВАНА"
# до "# 📐 СЕССИЯ 2. СТЕРЕОМЕТРИЯ (10–11 класс)"
# Заменить содержимое короткой пометкой "→ см. Приложения в конце файла"
# ============================================================

start_marker = "# ✅ ПЛАНИМЕТРИЯ (Сессия 1) ЗАФИКСИРОВАНА"
end_marker = "# 📐 СЕССИЯ 2. СТЕРЕОМЕТРИЯ"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx < 0 or end_idx < 0:
    print("ERROR: markers not found")
    sys.exit(1)

print(f"Range to extract: {start_idx} to {end_idx} ({end_idx - start_idx} chars)")

# Save the extracted content
extracted = content[start_idx:end_idx]

# Add a short pointer in place
REPLACEMENT = """# ✅ ПЛАНИМЕТРИЯ (Сессия 1) ЗАФИКСИРОВАНА

Все 5 секций планиметрии (1–5) + Секция 2А (координаты) + Блок ПРИЁМЫ (50+ приёмов), Блок ЗАДАЧИ (25 задач с цепочками мыслей), Блок ФОРМУЛЫ (сборник формул) написаны. **Дальше — Сессия 2: стереометрия (10–11 класс), Секции 6–15.**

**Перед Сессией 2** рекомендуется пройти «Кумулятивную сводку по Сессии 1» и «МОСТ-ПРОВЕРКУ перед Уровнем 2» (см. по тексту ниже — между Блоком ФОРМУЛЫ и Сессией 2).

> **Приложения** (история редактуры, промежуточные сводки Сессий 1 и 2) перенесены в самый конец файла. Ученику их читать не нужно — это заметки автора.

---

"""

content_after = content[:start_idx] + REPLACEMENT + content[end_idx:]

# ============================================================
# FIX 2: Добавить в 0.3 кумулятивную сводку и мост-проверку
# ============================================================

# Insert "Кумулятивная сводка" and "Мост-проверка" between Блок ФОРМУЛЫ and Сессия 2 in 0.3
old_nav_block = """- **Блок ФОРМУЛЫ** (после ЗАДАЧ) — сборник всех формул в одном месте (справочник).
- **Сессия 2 (Секции 6–15)** — стереометрия 10–11 класс"""

new_nav_block = """- **Блок ФОРМУЛЫ** (после ЗАДАЧ) — сборник всех формул в одном месте (справочник).
- **Кумулятивная сводка по Сессии 1** — 10 ключевых формул и фактов (между Блоком ФОРМУЛЫ и Сессией 2).
- **МОСТ-ПРОВЕРКА перед Уровнем 2** — проверь, готов ли ты к стереометрии (перед Сессией 2).
- **Сессия 2 (Секции 6–15)** — стереометрия 10–11 класс"""

if old_nav_block in content_after:
    content_after = content_after.replace(old_nav_block, new_nav_block, 1)
    print("FIX 2: navigation updated.")
else:
    print("FIX 2: navigation block not found.")

# ============================================================
# Append the extracted content as "Приложения в конце файла"
# We'll insert just before the final "# 🎯 БЛОК ФОРМАТ ЦТ"
# Actually, append to very end of file
# ============================================================

APPENDIX_INTRO = """

---

# 📎 ПРИЛОЖЕНИЯ (история редактуры — для автора, не для ученика)

> **Зачем здесь:** это заметки автора о ходе написания гайда. Ученику читать не нужно — они могут сбить с толку.

"""

content_after = content_after + APPENDIX_INTRO + extracted.replace(start_marker, "## 📎 Приложение А. История редактуры (изначально шло в Сессии 1)")

# Write back
with io.open(FILE, 'w', encoding='utf-8') as f:
    f.write(content_after)
print(f"\nFinal file length: {len(content_after)} chars")
print(f"Final line count: {content_after.count(chr(10)) + 1}")

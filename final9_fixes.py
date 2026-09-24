#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# ========== FIX 1: 14.4 — алгебра (r·h -> r·l) ==========
OLD_1 = """Решая: \\(r \\cdot h = r_{\\text{осн}}(h - r)\\), т.е. \\(rh + r \\cdot r_{\\text{осн}} = r_{\\text{осн}} \\cdot h\\), откуда \\(r(h + r_{\\text{осн}}) = h \\cdot r_{\\text{осн}}\\), \\(r = \\dfrac{h \\cdot r_{\\text{осн}}}{h + r_{\\text{осн}}}\\).

\\(Уточнение: для боковой грани пирамиды апофема \\(l = \\sqrt{h^2 + r_{\\text{осн}}^2}\\), и для грани получается \\(r = \\dfrac{h \\cdot r_{\\text{осн}}}{l + r_{\\text{осн}}}\\) — что и было в формуле.\\)"""

NEW_1 = """Решая: \\(r \\cdot l = r_{\\text{осн}}(h - r)\\), т.е. \\(r \\cdot l + r \\cdot r_{\\text{осн}} = r_{\\text{осн}} \\cdot h\\), откуда \\(r(l + r_{\\text{осн}}) = h \\cdot r_{\\text{осн}}\\), и окончательно:

\\[\\boxed{r = \\dfrac{h \\cdot r_{\\text{осн}}}{l + r_{\\text{осн}}}}\\]"""

if OLD_1 in content:
    print("FIX 1 (14.4 algebra): FOUND, replacing.")
    content = content.replace(OLD_1, NEW_1)
else:
    print("FIX 1 (14.4 algebra): NOT FOUND exactly. Investigating...")
    # Try to find any matching text
    if "Решая:" in content and "rh + r" in content:
        print("  -> The problematic text exists. Will use marker-based replacement.")

# ========== FIX 2: 14.3 — заголовок "через подобие" -> "через теорему Пифагора" ==========
OLD_2 = "**Вывод формулы через подобие (явный, пошаговый):**"
NEW_2 = "**Вывод формулы через теорему Пифагора (явный, пошаговый):**"

if OLD_2 in content:
    print("FIX 2 (14.3 header): FOUND, replacing.")
    content = content.replace(OLD_2, NEW_2, 1)
else:
    print("FIX 2 (14.3 header): NOT FOUND.")

# ========== FIX 3: Главный мост — ложная атрибуция подобия ==========
OLD_3 = """5. **Подобие (Секция 5.1)** — для сфер около пирамид (14.3), сечений пирамиды (13.4), вывода \\(R = 3r\\) для тетраэдра."""
NEW_3 = """5. **Подобие (Секция 5.1)** — для сечений пирамиды (13.4) и для вывода \\(r = \\dfrac{h \\cdot r_{\\text{осн}}}{l + r_{\\text{осн}}}\\) в правильной пирамиде через осевое сечение (14.4). Для описанной сферы (14.3) и \\(R = 3r\\) тетраэдра (14.6) — **Пифагор и алгебра, не подобие**."""

if OLD_3 in content:
    print("FIX 3 (Главный мост #5): FOUND, replacing.")
    content = content.replace(OLD_3, NEW_3, 1)
else:
    print("FIX 3 (Главный мост #5): NOT FOUND.")

# Write back
with io.open(FILE, 'w', encoding='utf-8') as f:
    f.write(content)
print(f"\nFinal file length: {len(content)} chars")

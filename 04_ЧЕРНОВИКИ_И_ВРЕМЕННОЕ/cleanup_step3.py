#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Шаг 3: добить оставшиеся LaTeX-команды."""
import re
import sys
from pathlib import Path

# Перекодировка stdout в utf-8 для Windows
sys.stdout.reconfigure(encoding="utf-8")

path = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Степенная_функция_Полный_гайд.md")
text = path.read_text(encoding="utf-8")

# 1. \text{...} → ... (просто убрать обёртку)
text = re.sub(r"\\text\{([^{}]+)\}", r"\1", text)

# 2. Множества
text = text.replace("\\setminus", "\\")  # \
text = text.replace("\\in", "∈")
text = text.replace("\\notin", "∉")
text = text.replace("\\cup", "∪")
text = text.replace("\\cap", "∩")
text = text.replace("\\subset", "⊂")
text = text.replace("\\supset", "⊃")
text = text.replace("\\emptyset", "∅")
text = text.replace("\\varnothing", "∅")

# 3. Точки
text = text.replace("\\ldots", "…")
text = text.replace("\\cdots", "…")
text = text.replace("\\dots", "…")

# 4. Минимум/максимум
text = text.replace("\\min", "мин")
text = text.replace("\\max", "макс")
text = text.replace("\\sup", "верх")
text = text.replace("\\inf", "низ")

# 5. Градусы и композиция
text = text.replace("^{\\circ}", "°")
text = text.replace("\\circ", "°")

# 6. Логарифмы и экспоненты
text = text.replace("\\ln", "ln")
text = text.replace("\\log", "log")
text = text.replace("\\exp", "exp")

# 7. Скобки (оставшиеся)
# Ничего не делаем — \langle/\rangle и т.д. уже не осталось

# 8. Оставшиеся \{ \} → просто скобки
text = text.replace("\\{", "{")
text = text.replace("\\}", "}")

# 9. Удалить хвосты: \!, \, (тонкие пробелы)
text = text.replace("\\!", "")
text = text.replace("\\,", " ")
text = text.replace("\\:", " ")
text = text.replace("\\;", " ")

# Подсчёт
remaining = re.findall(r"\\[a-zA-Z]+", text)
print(f"Осталось LaTeX-команд: {len(remaining)}")
if remaining:
    from collections import Counter
    cnt = Counter(remaining)
    print(f"Список: {dict(cnt)}")

path.write_text(text, encoding="utf-8")
print(f"Готово.")
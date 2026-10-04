#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Шаг 2: заменить LaTeX-команды на plain-text внутри §2."""
import re
from pathlib import Path

path = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Степенная_функция_Полный_гайд.md")
text = path.read_text(encoding="utf-8")

original = text

# 1. \sqrt[n]{x} → корень_n(x)
text = re.sub(r"\\sqrt\[(\d+)\]\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", r"корень_\1(\2)", text)

# 2. \sqrt{x} → корень(x)
text = re.sub(r"\\sqrt\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", r"корень(\1)", text)

# 3. \dfrac{a}{b} → (a)/(b)
def frac_replacer(m):
    num = m.group(1)
    den = m.group(2)
    # упростить: убрать лишние скобки вокруг простых выражений
    num = num.strip()
    den = den.strip()
    return f"({num})/({den})"
text = re.sub(r"\\dfrac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", frac_replacer, text)

# 4. \frac{a}{b} → (a)/(b)
text = re.sub(r"\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", frac_replacer, text)

# 5. \mathbb{R} → R
text = re.sub(r"\\mathbb\{([A-Z])\}", r"\1", text)

# 6. Греческие буквы
text = text.replace("\\alpha", "α")
text = text.replace("\\beta", "β")
text = text.replace("\\gamma", "γ")
text = text.replace("\\pi", "π")
text = text.replace("\\infty", "∞")

# 7. Стрелки и операторы
text = text.replace("\\to", "→")
text = text.replace("\\rightarrow", "→")
text = text.replace("\\leftarrow", "←")
text = text.replace("\\Rightarrow", "⇒")
text = text.replace("\\Leftrightarrow", "↔")
text = text.replace("\\cdot", "*")
text = text.replace("\\times", "×")
text = text.replace("\\pm", "±")
text = text.replace("\\neq", "≠")
text = text.replace("\\neq", "≠")
text = text.replace("\\leq", "≤")
text = text.replace("\\le", "≤")
text = text.replace("\\geq", "≥")
text = text.replace("\\ge", "≥")
text = text.replace("\\approx", "≈")

# 8. Пробелы
text = text.replace("\\qquad", "    ")
text = text.replace("\\quad", "  ")

# 9. Десятичные дроби: 0{,}4 → 0,4
text = re.sub(r"(\d)\s*\{,\s*\"\}\s*(\d)", r"\1,\2", text)
text = re.sub(r"(\d)\s*\{,\s*\}\s*(\d)", r"\1,\2", text)

# 10. Степени: x^{n} → x^n, x^{abc} → x^abc
text = re.sub(r"\^\{([^{}]+)\}", r"^\1", text)

# 11. Нижние индексы: x_{n} → x_n
text = re.sub(r"_\{([^{}]+)\}", r"_\1", text)

# 12. Скобки в фигурных: иногда {x} остался без преобразования — оставляем как есть

# Подсчёт оставшихся LaTeX-команд
remaining = re.findall(r"\\[a-zA-Z]+", text)
print(f"Осталось LaTeX-команд: {len(remaining)}")
if remaining:
    from collections import Counter
    cnt = Counter(remaining)
    print(f"Топ-10: {cnt.most_common(10)}")

path.write_text(text, encoding="utf-8")
print(f"Файл сохранён: {path}")
print(f"Размер: до {len(original)} → после {len(text)} символов")
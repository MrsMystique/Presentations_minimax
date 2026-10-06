#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Шаг 4: добить остатки — \sqrt, \{ \}."""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

path = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Степенная_функция_Полный_гайд.md")
text = path.read_text(encoding="utf-8")

# 1. \sqrt[n]{x} (любой вложенный) — добить остатки
# Паттерн: \sqrt[n]{anything with possible nested}
def repl_sqrt(m):
    n = m.group(1)
    body = m.group(2)
    return f"корень_{n}({body})"
text = re.sub(r"\\sqrt\[(\d+)\]\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", repl_sqrt, text)

# 2. \sqrt{...} без степени
text = re.sub(r"\\sqrt\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}", r"корень(\1)", text)

# 3. \{ → {
text = text.replace("\\{", "{")

# 4. \} → }
text = text.replace("\\}", "}")

# 5. R \ {0} → R без 0 (или просто R \\ {0} уже plain)
text = re.sub(r"R\s*\\\s*\{0\}", "R без 0", text)
text = re.sub(r"R\s*\\\s*\{\s*0\s*\}", "R без 0", text)

# 6. Оставшиеся одиночные \s (whitespace)
# Проверим
remaining = re.findall(r"\\\\[a-zA-Z]+", text)
print(f"LaTeX-команд: {len(remaining)}")
if remaining:
    from collections import Counter
    cnt = Counter(remaining)
    print(f"Список: {dict(cnt)}")

# Фигурные скобки оставшиеся
braces = re.findall(r"[\{\}]", text)
print(f"Фигурных скобок: {len(braces)}")
if braces:
    for m in list(re.finditer(r"[\{\}]", text))[:5]:
        s = max(0, m.start() - 30); e = min(len(text), m.end() + 30)
        print(repr(text[s:e]))
        print('---')

path.write_text(text, encoding="utf-8")
print(f"Готово. Размер: {len(text)}")
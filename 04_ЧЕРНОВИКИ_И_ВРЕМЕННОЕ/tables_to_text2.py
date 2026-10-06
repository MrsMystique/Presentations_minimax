#!/usr/bin/env python3
"""Удалить markdown-таблицы — простая версия."""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

path = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Степенная_функция_Полный_гайд.md")
text = path.read_text(encoding="utf-8")

lines = text.split('\n')

# Простая версия: удаляем ВСЕ строки, начинающиеся с |
new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    if line.strip().startswith('|'):
        # Проверим, что это часть таблицы (не одна строка)
        # Найдём конец непрерывного блока строк с |
        j = i
        while j < len(lines) and lines[j].strip().startswith('|'):
            j += 1
        # Если в этом блоке больше одной строки — это таблица
        if j - i > 1:
            # Удаляем блок, но оставляем заголовок выше (если есть)
            i = j
            continue
        # Если строка одна — оставляем (это не таблица)
        new_lines.append(line)
        i += 1
    else:
        new_lines.append(line)
        i += 1

new_text = '\n'.join(new_lines)
path.write_text(new_text, encoding="utf-8")
print(f"Готово. Удалено {len(lines) - len(new_lines)} строк. Новый размер: {len(new_text)}")
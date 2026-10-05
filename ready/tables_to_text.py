#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Заменить все markdown-таблицы на текстовый формат."""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

path = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Степенная_функция_Полный_гайд.md")
text = path.read_text(encoding="utf-8")

original = text

# Удалить строки таблиц (начинаются с | и содержат |---| или просто | ... |)
# Стратегия: найти все строки таблиц подряд, заменить на текст

lines = text.split('\n')

# Проверим, есть ли таблицы
table_lines = [i for i, line in enumerate(lines) if line.strip().startswith('|')]
print(f"Строк таблиц: {len(table_lines)}")

# Удалим строки таблиц и заменим заголовком выше
new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    # Если это начало таблицы (строка с |) и следующая строка ---|...
    if line.strip().startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s\-:|]+\|$', lines[i+1]):
        # Это начало markdown-таблицы — пропустим все строки таблицы
        # Найдём конец таблицы
        j = i
        while j < len(lines) and lines[j].strip().startswith('|'):
            j += 1
        # Запишем заголовок (если есть предыдущая строка с заголовком)
        new_lines.append(line)
        i = j
    else:
        new_lines.append(line)
        i += 1

# Теперь в new_lines все строки таблиц остались. Нужно их удалить.
final_lines = []
i = 0
while i < len(new_lines):
    line = new_lines[i]
    if line.strip().startswith('|'):
        # Проверяем, что это таблица (следующая строка ---|...|)
        if i + 1 < len(new_lines) and re.match(r'^\|[\s\-:|]+\|$', new_lines[i+1]):
            # Пропускаем все строки таблицы
            j = i
            while j < len(new_lines) and new_lines[j].strip().startswith('|'):
                j += 1
            i = j
        else:
            final_lines.append(line)
            i += 1
    else:
        final_lines.append(line)
        i += 1

new_text = '\n'.join(final_lines)
print(f"Удалено {len(new_lines) - len(final_lines)} строк таблиц")

# Также удалим одиночные строки таблиц (если есть)
# Проверим, остались ли таблицы
remaining = [l for l in final_lines if l.strip().startswith('|')]
print(f"Осталось строк с |: {len(remaining)}")

path.write_text(new_text, encoding="utf-8")
print(f"Готово. Размер: до {len(original)} → после {len(new_text)}")
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Найдём Приложение В
v_start = content.find("# 📎 Приложение В. Сводка Сессии 2")
print(f"V starts at: {v_start}")

if v_start < 0:
    print("V not found")
    sys.exit(1)

# Найдём конец блока В (следующий --- после В, или следующий ##, или конец файла)
# Конкретно: В идёт до "# ПРИЛОЖЕНИЯ" (заголовок блока приложений)
apps_header_idx = content.find("# 📎 ПРИЛОЖЕНИЯ")
print(f"APPS header at: {apps_header_idx}")

if apps_header_idx > v_start:
    # В идёт от v_start до apps_header_idx (включая ---)
    v_block = content[v_start:apps_header_idx]
    print(f"V block length: {len(v_block)}")
    print(f"V block first 200 chars: {v_block[:200]}")
    print(f"V block last 100 chars: {v_block[-100:]}")

    # Удалим В
    content_no_v = content[:v_start] + content[apps_header_idx:]

    # Найдём конец файла и вставим В в самый конец
    new_content = content_no_v.rstrip() + "\n\n---\n\n" + v_block.strip() + "\n"

    with io.open(FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"\nDone. New length: {len(new_content)} chars")
else:
    print("Cannot determine V block end")

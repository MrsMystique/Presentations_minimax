#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Шаг 1: убрать все \( ... \) обёртки в §2, оставив содержимое."""
import re
from pathlib import Path

path = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax\ready\Степенная_функция_Полный_гайд.md")
text = path.read_text(encoding="utf-8")

before_count = len(re.findall(r"\\\(.+?\\\)", text, flags=re.DOTALL))
print(f"До: {before_count} вхождений \\(...\\)")

# Убрать все \( ... \) обёртки (greedy по строкам)
text = re.sub(r"\\\((.+?)\\\)", r"\1", text, flags=re.DOTALL)

after_count = len(re.findall(r"\\\(.+?\\\)", text, flags=re.DOTALL))
print(f"После: {after_count} вхождений \\(...\\)")

path.write_text(text, encoding="utf-8")
print(f"Файл сохранён: {path}")
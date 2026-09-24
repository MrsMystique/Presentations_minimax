#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find "r = 3V" or "3V/S_полн" or "r = 3V/S"
search_terms = ["r = \\dfrac{3V}", "r = \\frac{3V}", "3V}{S_{\\text{полн}}", "r = 3V"]
for term in search_terms:
    idx = content.find(term)
    if idx >= 0:
        print(f"Found '{term}' at index {idx}")
        print("Context (300 chars):")
        print(content[max(0,idx-50):idx+300])
        print("---")
        break
else:
    print("Searching for 3V/...")
    idx = content.find("3V")
    if idx >= 0:
        print(f"Found '3V' at index {idx}")
        print("Context:")
        print(content[max(0,idx-100):idx+300])

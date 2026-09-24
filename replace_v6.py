#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Use slicing from known marker
start_marker = "Где **геометрически**"
end_marker = "планометрическая конструкция корня"

start = content.find(start_marker)
if start < 0:
    print("Marker not found!")
    sys.exit(1)

# Find the end of the sentence (next period + space + newline or newline + paragraph)
# Just find the end of the paragraph (double newline after)
para_end = content.find("\n\n", start)
if para_end < 0:
    para_end = len(content)

print(f"Start: {start}, End: {para_end}, Length: {para_end - start}")
print("Old text:")
print(content[start:para_end])

NEW = """Где **геометрически** возникает \\(\\sqrt{6} = \\sqrt{2} \\cdot \\sqrt{3}\\) — это в задачах, где в одной конструкции **соединяются** равносторонний Δ (√3) и квадрат (√2). Например, **в кубе** \\(ABCDA_1B_1C_1D_1\\) с ребром \\(a\\): возьмём точки \\(B\\), \\(D\\) (вершины одной грани-основания) и \\(C_1\\) (вершина противоположной грани). Это **Δ \\(BDC_1\\)**:
- \\(BD\\) — диагональ основания \\(= a\\sqrt{2}\\).
- \\(BC_1\\) — диагональ грани \\(BCC_1B_1 = a\\sqrt{2}\\).
- \\(DC_1\\) — диагональ грани \\(DCC_1D_1 = a\\sqrt{2}\\).

Все три стороны равны \\(a\\sqrt{2}\\) — Δ \\(BDC_1\\) **равносторонний**. Его высота \\(h_{\\Delta} = \\dfrac{a\\sqrt{2} \\cdot \\sqrt{3}}{2} = \\dfrac{a\\sqrt{6}}{2}\\). Здесь \\(\\sqrt{2}\\) приходит из диагонали квадрата, а \\(\\sqrt{3}\\) — из высоты равностороннего Δ. **Это и есть настоящая планометрическая конструкция корня \\(\\sqrt{6}\\) в стереометрии.**"""

new_content = content[:start] + NEW + content[para_end:]
with io.open(FILE, 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Done. New file length:", len(new_content))

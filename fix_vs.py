#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find FIRST occurrence of "3V/S_полн" / 3V/S
idx = content.find("Радиус вписанной сферы = отношение")
if idx < 0:
    print("Not found")
    sys.exit(1)

print(f"Found at {idx}")
print("Context:")
print(content[idx:idx+500])
print("---")

OLD = """Радиус вписанной сферы = отношение **тройного объёма** к **полной поверхности**:
\\[
r = \\frac{3V}{S_{\\text{полн}}}.
\\]"""

NEW = """Радиус вписанной сферы = отношение **тройного объёма** к **полной поверхности**:
\\[
r = \\frac{3V}{S_{\\text{полн}}}.
\\]

**Вывод.** Соединим центр вписанной сферы \\(O_{\\text{вп}}\\) со всеми вершинами многогранника. Он разбивается на **\\(n\\) маленьких пирамид**, где \\(n\\) — число граней, каждая с высотой \\(r\\) (перпендикуляр от \\(O_{\\text{вп}}\\) к грани) и основанием — соответствующей гранью площади \\(S_i\\). Сумма объёмов: \\(\\sum_{i=1}^n \\frac{1}{3} S_i \\cdot r = \\frac{r}{3} \\sum_{i=1}^n S_i = \\frac{r}{3} S_{\\text{полн}}\\). Эта сумма равна объёму многогранника \\(V\\) (все пирамиды вместе заполняют его целиком). Значит: \\(\\frac{r}{3} S_{\\text{полн}} = V\\), откуда \\(r = \\dfrac{3V}{S_{\\text{полн}}}\\). ∎"""

if OLD in content:
    print("FOUND exactly, replacing.")
    content = content.replace(OLD, NEW, 1)
    with io.open(FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Done. Length:", len(content))
else:
    print("Not exact match. Trying simple replace...")
    # Try a simpler replace based on finding "r = 3V/S"
    simple_old = "Радиус вписанной сферы = отношение **тройного объёма** к **полной поверхности**:"
    if simple_old in content:
        # Find the next paragraph after this
        start = content.find(simple_old)
        # Skip to end of formula block - find next blank line
        end_marker = content.find("\n\n", start + 200)  # skip at least 200 chars
        if end_marker > 0:
            before = content[:start]
            after = content[end_marker+2:]
            replacement = """Радиус вписанной сферы = отношение **тройного объёма** к **полной поверхности**:
\\[
r = \\frac{3V}{S_{\\text{полн}}}.
\\]

**Вывод.** Соединим центр вписанной сферы \\(O_{\\text{вп}}\\) со всеми вершинами многогранника. Он разбивается на **\\(n\\) маленьких пирамид**, где \\(n\\) — число граней, каждая с высотой \\(r\\) (перпендикуляр от \\(O_{\\text{вп}}\\) к грани) и основанием — соответствующей гранью площади \\(S_i\\). Сумма объёмов: \\(\\sum_{i=1}^n \\frac{1}{3} S_i \\cdot r = \\frac{r}{3} \\sum_{i=1}^n S_i = \\frac{r}{3} S_{\\text{полн}}\\). Эта сумма равна объёму многогранника \\(V\\) (все пирамиды вместе заполняют его целиком). Значит: \\(\\frac{r}{3} S_{\\text{полн}} = V\\), откуда \\(r = \\dfrac{3V}{S_{\\text{полн}}}\\). ∎"""
            new_content = before + replacement + "\n\n" + after
            with io.open(FILE, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Done via simple replace. Length:", len(new_content))
        else:
            print("Couldn't find end marker")
    else:
        print("Simple marker not found")

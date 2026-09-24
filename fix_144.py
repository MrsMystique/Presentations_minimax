#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

FILE = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\Геометрия_11_Полный_гайд.md"

with io.open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the exact text around line 4060
# The text has 'rh + r' as marker
marker_idx = content.find("rh + r")
if marker_idx < 0:
    print("Marker not found at all!")
    sys.exit(1)

print(f"Found marker at index {marker_idx}")
# Show context
print("Context (200 chars before, 600 after):")
print("---")
print(content[marker_idx-200:marker_idx+600])
print("---")

# Find the start of the problematic paragraph
# Look back for "Решая:"
start_marker = content.rfind("Решая:", 0, marker_idx)
end_marker = content.find("формуле.", marker_idx)
if end_marker < 0:
    end_marker = marker_idx + 700
print(f"Start of 'Решая:' at {start_marker}, end_marker at {end_marker}")

# Extract
problematic = content[start_marker:end_marker+10]
print("\nProblematic text:")
print(problematic)

# Replace
NEW = """Решая: \\(r \\cdot l = r_{\\text{осн}}(h - r)\\), т.е. \\(r \\cdot l + r \\cdot r_{\\text{осн}} = r_{\\text{осн}} \\cdot h\\), откуда \\(r(l + r_{\\text{осн}}) = h \\cdot r_{\\text{осн}}\\), и окончательно:

\\[\\boxed{r = \\dfrac{h \\cdot r_{\\text{осн}}}{l + r_{\\text{осн}}}}\\]"""

new_content = content[:start_marker] + NEW + content[end_marker+10:]
with io.open(FILE, 'w', encoding='utf-8') as f:
    f.write(new_content)
print(f"\nFixed. New length: {len(new_content)}")

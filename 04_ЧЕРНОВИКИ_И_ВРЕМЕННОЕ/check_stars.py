import re
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:\Users\admin\Desktop\математика мои слайды\Minimax\Рациональные_дроби_Полный_гайд.md', 'r', encoding='utf-8') as f:
    content = f.read()
lines = content.splitlines()

stars = ['\u2b50', '\u2605', '\u2606', '\u2728', '\u2727', '\u269d']
for i, line in enumerate(lines, 1):
    for s in stars:
        if s in line:
            print(f'Line {i}: star {s!r} -> {line}')
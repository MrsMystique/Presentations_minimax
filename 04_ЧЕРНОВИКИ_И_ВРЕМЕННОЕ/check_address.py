import re
import io
import sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open(r'C:\Users\admin\Desktop\математика мои слайды\Minimax\Рациональные_дроби_Полный_гайд.md', 'r', encoding='utf-8') as f:
    content = f.read()
lines = content.splitlines()

markers = [r'\bты\b', r'\bтебе\b', r'\bтвой\b', r'\bтвоя\b', r'\bтвои\b', r'\bтвоих\b',
           r'смотри', r'лови', r'представь', r'давай', r'обрати внимание',
           r'подставь', r'проверь себя', r'повтори']

count = 0
for i, line in enumerate(lines, 1):
    found = []
    for m in markers:
        for match in re.finditer(m, line, re.IGNORECASE):
            found.append(match.group())
    if found:
        count += len(found)
        print(f'Line {i}: {found} | {line[:120]}')

print()
print('Total address markers:', count)
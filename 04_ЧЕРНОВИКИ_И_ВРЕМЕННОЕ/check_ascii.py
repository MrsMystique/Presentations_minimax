import re

with open(r'C:\Users\admin\Desktop\математика мои слайды\Minimax\Рациональные_дроби_Полный_гайд.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Forbidden symbols (ASCII pseudo-graphics + geometric shapes + emoji)
forbidden_pattern = re.compile(r'[☐☑✓✗✘┌┐└┘├┤┬┴┼─│╔╗╚╝═║▪▫▬▲▼◀▶◆◇○●]')

found_any = False
for i, line in enumerate(lines, 1):
    matches = forbidden_pattern.findall(line)
    if matches:
        found_any = True
        chars = ', '.join(f'{m!r}(U+{ord(m):04X})' for m in matches)
        print(f'Line {i}: {chars} -> {line.rstrip()}')

if not found_any:
    print('OK: forbidden ASCII pseudo-graphics symbols NOT FOUND')

print()
print('--- Emoji check ---')
emoji_pattern = re.compile(r'[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F600-\U0001F64F\U0001F900-\U0001F9FF]')
found_emoji = False
for i, line in enumerate(lines, 1):
    matches = emoji_pattern.findall(line)
    if matches:
        found_emoji = True
        chars = ', '.join(f'{m!r}(U+{ord(m):04X})' for m in matches)
        print(f'Line {i}: {chars} -> {line.rstrip()}')

if not found_emoji:
    print('OK: emoji NOT FOUND')

print()
print('--- Star symbol ⭐ ---')
star_pattern = re.compile(r'[⭐]')
for i, line in enumerate(lines, 1):
    matches = star_pattern.findall(line)
    if matches:
        print(f'Line {i}: {matches}')
import re

path = "02_РИКС_ИСХОДНИКИ/extracted_json_md/РИКС_СВОДНЫЙ_ИСТОЧНИК_attached.md"
with open(path, "r", encoding="utf-8") as f:
    src = f.read()

# Разделим по разделам
sections = {}
current = None
buf = []
for line in src.split("\n"):
    if line.startswith("## РАЗДЕЛ:"):
        if current:
            sections[current] = "\n".join(buf)
        current = line.replace("## РАЗДЕЛ:", "").strip()
        buf = []
    else:
        buf.append(line)
if current:
    sections[current] = "\n".join(buf)

# Разделим каждую секцию на задачи
results = {}
for sec, content in sections.items():
    tasks = []
    task_lines = []
    current_num = None
    for line in content.split("\n"):
        m = re.match(r"^### Задача (\d+)", line)
        if m:
            if current_num and task_lines:
                tasks.append((current_num, "\n".join(task_lines).strip()))
            current_num = m.group(1)
            task_lines = [line]
        elif current_num:
            task_lines.append(line)
    if current_num and task_lines:
        tasks.append((current_num, "\n".join(task_lines).strip()))
    results[sec] = tasks

# Поищем в каждом разделе задачи, которые СОДЕРЖАТ символ корня (^{n} или \sqrt) и
# имеют отношение к корням (не корни уравнений)
print("=== ЗАДАЧИ С КОРНЯМИ (по разделам) ===\n")

for sec in ["ЧИСЛА И ВЫЧИСЛЕНИЯ", "ВЫРАЖЕНИЯ И ИХ ПРЕОБРАЗОВАНИЯ", "КООРДИНАТЫ И ФУНКЦИИ"]:
    print(f"\n=== {sec} ===")
    found = []
    for num, body in results[sec]:
        body_lower = body.lower()
        # Корни как математическая операция (не "корень уравнения")
        has_root_op = ("корня" in body_lower and "корня уравнения" not in body_lower and "корни уравнения" not in body_lower) or "вынеси" in body_lower
        if has_root_op:
            found.append((num, body))

    print(f"  Найдено: {len(found)} задач")
    for num, body in found[:5]:
        cleaned = re.sub(r'\s+', ' ', body)
        print(f"\n  Задача {num}: {cleaned[:400]}")
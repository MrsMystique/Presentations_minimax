"""Сборка единого сводного источника РИКС из:
1. Спецификация матем.docx — официальная спецификация ЦТ
2. Информационный материал по математике.docx — справочный материал к ЦТ
3. zadachi-riks.md — задачи РИКС по 6 разделам

Результат: РИКС_СВОДНЫЙ_ИСТОЧНИК.md — единый структурированный документ.
"""
import zipfile
import xml.etree.ElementTree as ET
import io as iomod

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def extract_docx(path):
    """Извлекает текст параграфов из .docx."""
    with zipfile.ZipFile(path) as z:
        with z.open("word/document.xml") as f:
            content = f.read().decode("utf-8")
    root = ET.fromstring(content)
    paragraphs = []
    for para in root.iter(W_NS + "p"):
        text = "".join(t.text or "" for t in para.iter(W_NS + "t"))
        paragraphs.append(text)
    return paragraphs


def extract_tables(path):
    """Извлекает таблицы из .docx в виде списка списков строк."""
    with zipfile.ZipFile(path) as z:
        with z.open("word/document.xml") as f:
            content = f.read().decode("utf-8")
    root = ET.fromstring(content)
    tables_out = []
    for tbl in root.iter(W_NS + "tbl"):
        rows = []
        for row in tbl.iter(W_NS + "tr"):
            cells = []
            for cell in row.iter(W_NS + "tc"):
                cell_text = "\n".join(
                    "".join(t.text or "" for t in p.iter(W_NS + "t"))
                    for p in cell.iter(W_NS + "p")
                )
                cells.append(cell_text.strip())
            rows.append(cells)
        tables_out.append(rows)
    return tables_out


def parse_zadachi(path):
    """Парсит zadachi-riks.md по разделам и нумерует задачи."""
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()

    sections_raw = {}
    current = None
    buffer = []
    for line in src.split("\n"):
        if line.startswith("# ") and not line.startswith("## ") and not line.startswith("### "):
            if current:
                sections_raw[current] = "\n".join(buffer)
            current = line[2:].strip()
            buffer = []
        else:
            buffer.append(line)
    if current:
        sections_raw[current] = "\n".join(buffer)

    # Объединим дубликаты: "X" + "X (2)" → "X"
    # Служебные секции (Задачи РИКС, Приложение) выделим отдельно
    sections = {}
    service = {}  # {"Задачи РИКС": "...", "Приложение": "..."}
    for sec, content in sections_raw.items():
        if sec in ("Задачи РИКС", "Приложение"):
            service[sec] = content
            continue
        sec_clean = sec.replace(" (2)", "")
        # Также подчистим окончания "2" (бывший "УРАВНЕНИЯ И НЕРАВЕНСТВА2")
        if sec_clean.endswith("2"):
            candidate = sec_clean[:-1].rstrip()
            if candidate in sections_raw:
                sec_clean = candidate
        if sec_clean not in sections:
            sections[sec_clean] = []
        sections[sec_clean].append(content)

    # Номер задач внутри каждой секции
    result = {}
    for sec, contents in sections.items():
        merged = "\n".join(contents)
        # Найдём задачи (### N)
        tasks = []
        current_task = None
        for line in merged.split("\n"):
            if line.startswith("### "):
                if current_task:
                    tasks.append(current_task)
                current_task = {"header": line, "body": []}
            elif current_task is not None:
                current_task["body"].append(line)
        if current_task:
            tasks.append(current_task)
        # Перенумеруем
        renumbered = []
        for i, t in enumerate(tasks, 1):
            new_body = "\n".join(t["body"]).strip()
            renumbered.append((i, new_body))
        result[sec] = renumbered

    return result


def main():
    base = "02_РИКС_ИСХОДНИКИ/docx"
    out_path = "02_РИКС_ИСХОДНИКИ/extracted_json_md/РИКС_СВОДНЫЙ_ИСТОЧНИК.md"

    print("Читаю Спецификацию...")
    spec_paras = extract_docx(f"{base}/Спецификация матем.docx")
    print(f"  Параграфов: {len(spec_paras)}")

    print("Читаю Информационный материал...")
    info_paras = extract_docx(f"{base}/Информационный материал по математике.docx")
    print(f"  Параграфов: {len(info_paras)}")

    print("Парсю задачи РИКС...")
    tasks = parse_zadachi("02_РИКС_ИСХОДНИКИ/extracted_json_md/zadachi-riks.md")
    total = sum(len(t) for t in tasks.values())
    print(f"  Всего задач: {total}")
    for sec, lst in tasks.items():
        print(f"    {sec}: {len(lst)} задач")

    # Соберём единый файл
    out = []
    out.append("# РИКС — СВОДНЫЙ ИСТОЧНИК\n")
    out.append("Единый структурированный источник задач и материалов РИКС для подготовки к ЦТ по математике. ")
    out.append("Собран из официальных файлов РИКС: спецификации ЦТ, информационного материала (то, что выдают на экзамене) и банка задач.\n")
    out.append("**Источник:** https://rikc.by/otkrytyj-bank-testovyh-materialov/658-matematika.html\n")
    out.append("---\n")

    # ---------- СОДЕРЖАНИЕ ----------
    out.append("## СОДЕРЖАНИЕ\n")
    out.append("- ЧАСТЬ I. СПЕЦИФИКАЦИЯ ЦТ 2026 (что проверяется)")
    out.append("- ЧАСТЬ II. ИНФОРМАЦИОННЫЙ МАТЕРИАЛ К ЦТ (структура экзамена + ответы + привязка к учебникам)")
    out.append("- ЧАСТЬ III. ЗАДАЧИ РИКС ПО РАЗДЕЛАМ:")
    for sec in tasks.keys():
        out.append(f"  - {sec} — {len(tasks[sec])} задач")
    out.append("")
    out.append(f"**Всего задач: {total}**\n")
    out.append("---\n")

    # ---------- ЧАСТЬ I: СПЕЦИФИКАЦИЯ ----------
    out.append("# ЧАСТЬ I. СПЕЦИФИКАЦИЯ ЦТ 2026\n")
    out.append("Официальная спецификация экзаменационной (тестовой) работы по учебному предмету «Математика» для ЦЭ/ЦТ 2026 года.\n")
    for p in spec_paras:
        if p.strip():
            out.append(p + "\n")
    out.append("\n---\n")

    # ---------- ЧАСТЬ II: ИНФОРМАЦИОННЫЙ МАТЕРИАЛ ----------
    out.append("# ЧАСТЬ II. ИНФОРМАЦИОННЫЙ МАТЕРИАЛ К ЦТ\n")
    out.append("Справочный материал, который РИКС выдаёт на экзамене вместе с заданиями. ")
    out.append("Содержит ответы ко всем заданиям теста, привязку каждого задания к разделу программы и учебному изданию.\n")
    for p in info_paras:
        if p.strip():
            out.append(p + "\n")
    out.append("\n---\n")

    # ---------- ЧАСТЬ III: ЗАДАЧИ ----------
    out.append("# ЧАСТЬ III. ЗАДАЧИ РИКС ПО РАЗДЕЛАМ\n")
    for sec, lst in tasks.items():
        out.append(f"## РАЗДЕЛ: {sec}\n")
        out.append(f"**Количество задач: {len(lst)}**\n")
        for i, body in lst:
            out.append(f"### Задача {i}\n")
            out.append(body + "\n")
        out.append("\n")

    out.append("---\n")
    out.append(f"\n**ИТОГО: {total} задач в {len(tasks)} разделах.**\n")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(out))

    print(f"\nDone: {out_path}")
    print(f"   Lines: {len(out)}")


if __name__ == "__main__":
    main()
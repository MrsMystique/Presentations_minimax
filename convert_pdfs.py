import fitz  # pymupdf
import os

out_dir = r"C:\Users\admin\Desktop\математика мои слайды\Minimax\text"
os.makedirs(out_dir, exist_ok=True)

files = [
    (r"C:\Users\admin\Desktop\математика мои слайды\Minimax\presentations\geometriya_11kl_latotin_rus_2020.pdf",
     r"C:\Users\admin\Desktop\математика мои слайды\Minimax\text\geometriya_latotin_text.txt"),
    (r"C:\Users\admin\Desktop\математика мои слайды\Minimax\presentations\Kazakov_11klass.pdf",
     r"C:\Users\admin\Desktop\математика мои слайды\Minimax\text\kazakov_text.txt"),
    (r"C:\Users\admin\Desktop\математика мои слайды\Minimax\presentations\drt2023.pdf",
     r"C:\Users\admin\Desktop\математика мои слайды\Minimax\text\drt2023_text.txt"),
    (r"C:\Users\admin\Desktop\математика мои слайды\Minimax\presentations\mat2026.pdf",
     r"C:\Users\admin\Desktop\математика мои слайды\Minimax\text\mat2026_text.txt"),
    (r"C:\Users\admin\Desktop\математика мои слайды\Minimax\presentations\mat-drt-22.pdf",
     r"C:\Users\admin\Desktop\математика мои слайды\Minimax\text\mat-drt-22_text.txt"),
]

print(f"{'PDF':<70} -> {'TXT':<70} chars/pages")
print("-" * 160)

for pdf_path, txt_path in files:
    doc = fitz.open(pdf_path)
    pages = doc.page_count
    text = "\n\n".join(page.get_text() for page in doc)
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"{os.path.basename(pdf_path):<70} -> {os.path.basename(txt_path):<70} {len(text)} chars / {pages} pages")
    doc.close()

print("Done.")

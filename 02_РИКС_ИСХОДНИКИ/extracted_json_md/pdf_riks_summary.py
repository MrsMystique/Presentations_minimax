import pdfplumber
import os

total = 0
files = sorted([f for f in os.listdir('02_РИКС_ИСХОДНИКИ/pdf_riks') if f.endswith('.pdf')])
for fname in files:
    path = os.path.join('02_РИКС_ИСХОДНИКИ/pdf_riks', fname)
    with pdfplumber.open(path) as pdf:
        pages = len(pdf.pages)
        total += pages
        print(f'  {fname}: {pages} стр.')
print(f'=== ВСЕГО: {total} стр. в {len(files)} PDF ===')
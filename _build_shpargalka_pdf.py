# -*- coding: utf-8 -*-
"""
Build a horizontal A4 PDF cheat-sheet from Шпаргалка_геометрия.md.
LaTeX formulas rendered to PNG via matplotlib mathtext, embedded into PDF.
Uses DejaVu Sans (Cyrillic support) via fpdf2 TTF.
"""

import io
import os
import re
import sys
from pathlib import Path
from html.parser import HTMLParser

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from fpdf import FPDF
from PIL import Image as PILImage
import markdown as md_lib


# Paths
BASE = Path(r"C:\Users\admin\Desktop\математика мои слайды\Minimax")
SRC = BASE / "Шпаргалка_геометрия.md"
OUT = BASE / "Шпаргалка_геометрия.pdf"
TEMP_DIR = BASE / "_shpargalka_formulas_tmp"
TEMP_DIR.mkdir(exist_ok=True)

# DejaVu Sans (Cyrillic)
FONT_DIR = Path(r"C:\Users\admin\AppData\Local\Programs\Python\Python311\Lib\site-packages\matplotlib\mpl-data\fonts\ttf")
FONT_REG = str(FONT_DIR / "DejaVuSans.ttf")
FONT_BOLD = str(FONT_DIR / "DejaVuSans-Bold.ttf")
FONT_ITALIC = str(FONT_DIR / "DejaVuSans-Oblique.ttf")
FONT_BOLD_ITALIC = str(FONT_DIR / "DejaVuSans-BoldOblique.ttf")

# Colors
CREAM = (245, 242, 235)
DARK_BROWN = (62, 39, 35)
ACCENT = (182, 137, 102)
HEADER_BG = (240, 232, 218)


# ============================================================
# Render LaTeX to PNG via matplotlib mathtext
# ============================================================
def latex_to_png(latex_src, fontsize=12, color=DARK_BROWN):
    """Render LaTeX formula to a PNG file. Returns path."""
    # mathtext compatibility fixes
    src = latex_src
    src = src.replace('\\tfrac', '\\frac')
    src = src.replace('\\text{', '\\mathrm{')  # mathtext doesn't support \text, use \mathrm

    # mathtext doesn't support Cyrillic at all. Replace ALL Cyrillic with Latin lookalikes or 'X'.
    cyrillic_map = {
        # Common math terms - short Latin equivalents
        'противолежащий': 'pr', 'прилежащий': 'prl', 'гипотенуза': 'g',
        'катет': 'k', 'всего': 'vs', 'треугольника': 'treug', 'сект': 'sekt',
        'треуг': 'treug', 'полн': 'poln', 'бок': 'bok', 'осн': 'osn',
        'внеш': 'vnesh', 'отверст': 'otverst', 'конеч': 'konech',
        'призм': 'prizm', 'цилиндр': 'cilindr', 'прав': 'prav',
        'шестиуг': '6ug', 'прямоуг': 'pryam', 'многогранника': 'mnog',
        'слоя': 'sloya', 'сегмента': 'segmenta', 'сектора': 'sektora',
        'конуса': 'konusa', 'сферы': 'sfery', 'пирамиды': 'piram',
        'параллелепипеда': 'parall', 'параллелограмма': 'parall',
        'многоугольника': 'mnog', 'окружности': 'okr', 'треугольник': 'tr',
        'радиус': 'r', 'диаметр': 'd', 'сторона': 'stor',
    }
    # First apply cyrillic_map to all curly-brace contents
    def replace_in_braces(m):
        inner = m.group(1)
        for cyr, lat in cyrillic_map.items():
            inner = inner.replace(cyr, lat)
        # Replace any remaining non-ASCII with 'X'
        inner = re.sub(r'[^\x00-\x7f]+', 'X', inner)
        return '{' + inner + '}'

    # Replace inside {...} - handles \frac{cyr}{cyr}, \mathrm{cyr}, \text{cyr}, etc.
    src = re.sub(r'\{([^{}]+)\}', replace_in_braces, src)
    # Final safety net: any remaining Cyrillic
    src = re.sub(r'[^\x00-\x7f]+', 'X', src)
    src = re.sub(r'\\[,;:!]', '', src)
    src = src.replace('\\,', '').replace('\\:', '').replace('\\;', '').replace('\\!', '')
    # mathtext doesn't support these symbols; use Unicode
    src = src.replace('\\triangle', '\\bigtriangleup')
    src = src.replace('\\square', '\u25a1')  # □ White square
    src = src.replace('\\circ', '\u25cb')   # ○ White circle

    color_hex = '#{:02x}{:02x}{:02x}'.format(*color)

    # First pass: measure
    fig = plt.figure(figsize=(0.1, 0.1))
    try:
        text_obj = fig.text(0, 0, f"${src}$", fontsize=fontsize, color=color_hex)
        fig.canvas.draw()
        bbox = text_obj.get_window_extent()
        width_in = max(bbox.width, 10) / fig.dpi + 0.05
        height_in = max(bbox.height, 10) / fig.dpi + 0.05
    except Exception:
        plt.close(fig)
        width_in, height_in = 3.0, 0.4

    # Second pass: render at correct size
    fig.set_size_inches(width_in, height_in)
    fig.text(0, 0, f"${src}$", fontsize=fontsize, color=color_hex)
    png_path = TEMP_DIR / f"f_{abs(hash(latex_src)) & 0xFFFFFFFF:08x}.png"
    fig.savefig(png_path, dpi=200, bbox_inches='tight', pad_inches=0.05, transparent=True)
    plt.close(fig)
    return str(png_path)


# ============================================================
# Markdown → blocks
# ============================================================
LATEX_PLACEHOLDER = "XXLATEX{}LATEXXX"
LATEX_INLINE = re.compile(r'\\\((.+?)\\\)', re.DOTALL)
LATEX_DISPLAY = re.compile(r'\\\[(.+?)\\\]', re.DOTALL)
LATEX_PLACEHOLDER_PATTERN = re.compile(r'XXLATEX(\d+)LATEXXX')


def extract_latex(text):
    """Replace LaTeX with placeholders. Returns (text, dict_of_formulas)."""
    formulas = {}

    def repl_display(m):
        idx = len(formulas)
        formulas[idx] = m.group(1).strip()
        return LATEX_PLACEHOLDER.format(idx)

    def repl_inline(m):
        idx = len(formulas)
        formulas[idx] = m.group(1).strip()
        return LATEX_PLACEHOLDER.format(idx)

    text = LATEX_DISPLAY.sub(repl_display, text)
    text = LATEX_INLINE.sub(repl_inline, text)
    return text, formulas


def parse_markdown(md_text):
    """Parse markdown into list of (type, content) blocks using markdown library."""
    # Replace LaTeX placeholders with HTML comments to protect them from markdown
    PLACEHOLDER_TAG = "<!--LATEX_{idx}-->"
    placeholder_map = {}
    counter = [0]

    def protect(m):
        idx = counter[0]
        counter[0] += 1
        placeholder_map[idx] = m.group(0)
        return PLACEHOLDER_TAG.format(idx=idx)

    # First protect ALL inline LaTeX \(...\) — but be careful: \( and \) need escaping
    # Use a simpler approach: protect placeholders only (after they've been inserted)
    # Actually, extract_latex already inserts placeholders. We need to protect those.
    pass

    # Use markdown library
    html = md_lib.markdown(
        md_text,
        extensions=['extra', 'sane_lists'],
        output_format='html'
    )
    # Note: 'tables' is part of 'extra' extension

    # Convert back from HTML to simple block format
    blocks = []

    # Split by block-level HTML tags
    # Simple tokenizer: find h1-h6, blockquote, hr, table, ul, ol, p
    pos = 0
    while pos < len(html):
        # Find next block tag
        m = re.search(r'<(h[1-6]|blockquote|hr|table|ul|ol|p)([^>]*)>', html[pos:])
        if not m:
            break
        tag = m.group(1).lower()
        attrs = m.group(2)
        # Find closing tag
        if tag == 'hr':
            blocks.append(('hr', ''))
            pos += m.end()
            continue
        elif tag == 'table':
            # Find </table>
            end_m = re.search(r'</table>', html[pos:], re.IGNORECASE)
            if not end_m:
                break
            table_html = html[pos + m.start():pos + end_m.end()]
            rows = parse_html_table(table_html)
            blocks.append(('table', rows))
            pos += end_m.end()
        elif tag in ('ul', 'ol'):
            # Find </ul> or </ol>
            end_m = re.search(rf'</{tag}>', html[pos:], re.IGNORECASE)
            if not end_m:
                break
            list_html = html[pos + m.start():pos + end_m.end()]
            items = parse_html_list(list_html)
            blocks.append(('ol' if tag == 'ol' else 'ul', items))
            pos += end_m.end()
        elif tag == 'blockquote':
            end_m = re.search(r'</blockquote>', html[pos:], re.IGNORECASE)
            if not end_m:
                break
            quote_html = html[pos + m.end():pos + end_m.start()]
            # Strip blockquote wrapper if any
            quote_text = re.sub(r'<[^>]+>', '', quote_html).strip()
            blocks.append(('blockquote', quote_text))
            pos += end_m.end()
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            end_m = re.search(rf'</{tag}>', html[pos:], re.IGNORECASE)
            if not end_m:
                break
            content_html = html[pos + m.end():pos + end_m.start()]
            # Convert inline HTML to plain text but keep formulas
            content = html_to_inline(content_html)
            blocks.append((tag, content))
            pos += end_m.end()
        else:  # p
            end_m = re.search(r'</p>', html[pos:], re.IGNORECASE)
            if not end_m:
                break
            content_html = html[pos + m.end():pos + end_m.start()]
            content = html_to_inline(content_html)
            blocks.append(('p', content))
            pos += end_m.end()

    return blocks


def parse_html_table(html):
    """Parse HTML table into rows of cells (plain text)."""
    rows = []
    for tr_m in re.finditer(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL | re.IGNORECASE):
        cells = []
        for cell_m in re.finditer(r'<(th|td)[^>]*>(.*?)</\1>', tr_m.group(1), re.DOTALL | re.IGNORECASE):
            cell_html = cell_m.group(2)
            # Convert inline HTML
            cell_text = html_to_inline(cell_html)
            cells.append(cell_text)
        rows.append(cells)
    return rows


def parse_html_list(html):
    """Parse HTML list into items."""
    items = []
    for li_m in re.finditer(r'<li[^>]*>(.*?)</li>', html, re.DOTALL | re.IGNORECASE):
        item_html = li_m.group(1)
        item_text = html_to_inline(item_html)
        items.append(item_text)
    return items


def html_to_inline(html):
    """Convert inline HTML to plain text but keep XXLATEXNLATEXXX placeholders intact.
    Strips HTML tags but preserves formula placeholders and inline formatting markers."""
    # First, protect XXLATEXNLATEXXX placeholders by replacing with a unique marker
    placeholders = re.findall(r'XXLATEX\d+LATEXXX', html)
    for i, ph in enumerate(placeholders):
        html = html.replace(ph, f'\x00PH{i}\x00')

    # Remove all HTML tags
    text = re.sub(r'<[^>]+>', '', html)

    # Restore placeholders
    for i, ph in enumerate(placeholders):
        text = text.replace(f'\x00PH{i}\x00', ph)

    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text


# ============================================================
# PDF class
# ============================================================
class CheatSheetPDF(FPDF):
    def __init__(self):
        super().__init__(orientation='L', unit='mm', format='A4')
        self.set_auto_page_break(auto=True, margin=10)
        self.set_margins(left=10, top=10, right=10)

        # Add DejaVu Sans (Cyrillic)
        self.add_font('DejaVu', '', FONT_REG)
        self.add_font('DejaVu', 'B', FONT_BOLD)
        self.add_font('DejaVu', 'I', FONT_ITALIC)
        self.add_font('DejaVu', 'BI', FONT_BOLD_ITALIC)
        self.set_font('DejaVu', '', 9)

    def header(self):
        # Background
        self.set_fill_color(*CREAM)
        self.rect(0, 0, 297, 210, 'F')
        # Header line
        self.set_y(4)
        self.set_font('DejaVu', 'I', 7)
        self.set_text_color(*ACCENT)
        self.cell(0, 3, 'Шпаргалка геометрия — для печати на A4 горизонтально', align='R')
        self.set_text_color(*DARK_BROWN)
        self.ln(4)

    def footer(self):
        self.set_y(-8)
        self.set_font('DejaVu', 'I', 7)
        self.set_text_color(*ACCENT)
        self.cell(0, 3, f'— {self.page_no()} —', align='C')
        self.set_text_color(*DARK_BROWN)

    def _img_size(self, path):
        with PILImage.open(path) as img:
            w, h = img.size
        return w / 200 * 25.4, h / 200 * 25.4

    def add_formula_centered(self, latex_src, max_w=None, fontsize=11):
        png = latex_to_png(latex_src, fontsize=fontsize)
        w, h = self._img_size(png)
        if max_w and w > max_w:
            ratio = max_w / w
            w, h = max_w, h * ratio
        avail_w = 297 - 20
        x = 10 + (avail_w - w) / 2
        # Check vertical space
        if self.get_y() + h > 195:
            self.add_page()
            x = 10 + (avail_w - w) / 2
        self.image(png, x=x, y=self.get_y(), w=w, h=h)
        self.set_y(self.get_y() + h + 1)

    def add_formula_inline(self, latex_src, fontsize=10, color=None):
        png = latex_to_png(latex_src, fontsize=fontsize)
        w, h = self._img_size(png)
        # Don't scale below 4mm
        if w < 4:
            w = 4
        # If too tall for current page, new page
        if self.get_y() + h > 195:
            self.add_page()
        # Render at current position
        y = self.get_y()
        self.image(png, x=self.get_x(), y=y, h=h)
        new_x = self.get_x() + w + 0.5
        # Advance Y if formula is taller than current line
        new_y = max(y + h + 0.3, y + 4)
        self.set_xy(new_x, new_y)

    def _write_with_formulas(self, text, formulas, fontsize=9, italic=False):
        """Write text with inline formatting (**bold**, *italic*) and XXLATEXNLATEXXX formulas."""
        # Tokenize: find bold (**...**), italic (*...*), formulas (XXLATEXNLATEXXX), and plain text
        # Order of priority: ** before *, formulas mixed with text

        # Strategy: split by both markers
        # Pattern matches: **bold**, *italic*, XXLATEXNLATEXXX
        pattern = re.compile(r'(\*\*[^\*]+?\*\*|\*[^\*]+?\*|XXLATEX\d+LATEXXX)')

        # First, protect formulas from being interpreted as markdown
        # Actually formulas are usually not inside **, but handle edge cases

        last_end = 0
        for m in pattern.finditer(text):
            # Write any plain text before this token
            if m.start() > last_end:
                plain = text[last_end:m.start()]
                if plain:
                    self._write_plain(plain, fontsize=fontsize, italic=italic)

            token = m.group(1)
            if token.startswith('**') and token.endswith('**'):
                # Bold: render with bold font, possibly with italic preserved
                inner = token[2:-2]
                # Check if inner has formulas
                if 'XXLATEX' in inner:
                    self._write_formatted_with_formulas(inner, formulas, fontsize=fontsize, bold=True, italic=italic)
                else:
                    self._write_plain(inner, fontsize=fontsize, italic=italic, bold=True)
            elif token.startswith('*') and token.endswith('*') and len(token) > 2:
                # Italic
                inner = token[1:-1]
                if 'XXLATEX' in inner:
                    self._write_formatted_with_formulas(inner, formulas, fontsize=fontsize, bold=False, italic=True)
                else:
                    self._write_plain(inner, fontsize=fontsize, italic=True, bold=False)
            elif token.startswith('XXLATEX'):
                # Formula
                idx_str = token[8:-2]
                try:
                    idx = int(idx_str)
                    if idx in formulas:
                        self.add_formula_inline(formulas[idx], fontsize=fontsize + 1)
                except ValueError:
                    pass
            last_end = m.end()

        # Trailing text
        if last_end < len(text):
            trailing = text[last_end:]
            if trailing:
                self._write_plain(trailing, fontsize=fontsize, italic=italic)

    def _write_plain(self, text, fontsize=9, italic=False, bold=False):
        if bold and italic:
            style = 'BI'
        elif bold:
            style = 'B'
        elif italic:
            style = 'I'
        else:
            style = ''
        self.set_font('DejaVu', style, fontsize)
        self.set_text_color(*DARK_BROWN)
        self.write(4, text)

    def _write_formatted_with_formulas(self, text, formulas, fontsize=9, bold=False, italic=False):
        """Write text containing formulas with bold/italic formatting."""
        parts = re.split(r'XXLATEX(\d+)LATEXXX', text)
        for j, part in enumerate(parts):
            if j % 2 == 0:
                if part:
                    self._write_plain(part, fontsize=fontsize, italic=italic, bold=bold)
            else:
                idx = int(part)
                if idx in formulas:
                    self.add_formula_inline(formulas[idx], fontsize=fontsize + 1)

    def add_h1(self, text):
        self.set_text_color(*DARK_BROWN)
        self.set_font('DejaVu', 'B', 20)
        self.ln(3)
        self.multi_cell(0, 10, text)
        self.ln(2)
        y = self.get_y()
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.6)
        self.line(10, y, 287, y)
        self.ln(3)

    def add_h2(self, text):
        if self.get_y() > 175:
            self.add_page()
        self.set_text_color(*DARK_BROWN)
        self.set_font('DejaVu', 'B', 13)
        self.ln(3)
        self.multi_cell(0, 6, text)
        self.ln(1)
        y = self.get_y()
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.3)
        self.line(10, y, 287, y)
        self.ln(2)

    def add_h3(self, text):
        self.set_text_color(*DARK_BROWN)
        self.set_font('DejaVu', 'B', 10)
        self.ln(2)
        self.multi_cell(0, 5, text)
        self.ln(1)

    def add_hr(self):
        y = self.get_y()
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.2)
        self.line(10, y, 287, y)
        self.ln(2)

    def add_paragraph(self, text, formulas):
        """Render paragraph with possible inline formatting (markdown **bold**, *italic*) and formulas."""
        # Check if text has formulas or markdown formatting
        has_formula = 'XXLATEX' in text
        has_markdown = '**' in text or re.search(r'(?<!\*)\*[^\*\s]', text)

        if not has_formula and not has_markdown:
            # Plain text - use multi_cell for word wrap
            self.set_text_color(*DARK_BROWN)
            self.set_font('DejaVu', '', 9)
            self.multi_cell(0, 4, text)
            self.ln(1)
            return

        # Has formatting - wrap lines manually with word wrap
        self.set_text_color(*DARK_BROWN)
        self.ln(1)
        self._write_wrapped(text, formulas, max_width=275, fontsize=9, base_fontsize_for_formula=10)
        self.ln(2)

    def _write_wrapped(self, text, formulas, max_width=275, fontsize=9, base_fontsize_for_formula=10):
        """Write text with inline formatting, word-wrapping at max_width."""
        available_w = max_width  # mm
        line_height = 4  # mm

        # Tokenize into runs: (text, bold, italic, formula_idx or None)
        tokens = self._tokenize_inline(text)

        # Greedy word wrap with dynamic line height
        current_x_offset = 0  # mm from current x
        current_line_tokens = []  # tokens in current line
        current_line_max_h = line_height  # max height of tokens in current line

        def flush_line(line_h):
            nonlocal current_x_offset, current_line_max_h
            if not current_line_tokens:
                return
            for tok in current_line_tokens:
                t_text, t_bold, t_italic, t_formula = tok
                if t_formula is not None:
                    if t_formula in formulas:
                        self.add_formula_inline(formulas[t_formula], fontsize=base_fontsize_for_formula)
                else:
                    if t_text:
                        self._write_plain(t_text, fontsize=fontsize, italic=t_italic, bold=t_bold)
            current_line_tokens.clear()
            current_x_offset = 0
            current_line_max_h = line_height
            self.ln(line_h)

        def measure_token(tok):
            t_text, t_bold, t_italic, t_formula = tok
            if t_formula is not None:
                if t_formula in formulas:
                    png = latex_to_png(formulas[t_formula], fontsize=base_fontsize_for_formula)
                    w, h = self._img_size(png)
                    return w + 0.5, max(h + 0.5, line_height)
                return 0, line_height
            style = 'BI' if (t_bold and t_italic) else ('B' if t_bold else ('I' if t_italic else ''))
            self.set_font('DejaVu', style, fontsize)
            w = self.get_string_width(t_text)
            return w, line_height

        i = 0
        while i < len(tokens):
            tok = tokens[i]
            tok_w, tok_h = measure_token(tok)

            if current_x_offset + tok_w > available_w:
                # Need to wrap
                if current_line_tokens:
                    flush_line(current_line_max_h)
                current_line_tokens.append(tok)
                current_x_offset += tok_w
                current_line_max_h = max(current_line_max_h, tok_h)
                if current_x_offset > available_w:
                    flush_line(current_line_max_h)
            else:
                current_line_tokens.append(tok)
                current_x_offset += tok_w
                current_line_max_h = max(current_line_max_h, tok_h)
            i += 1

        flush_line(current_line_max_h)

    def _tokenize_inline(self, text):
        """Tokenize text into runs with formatting info.
        Returns list of (text, bold, italic, formula_idx_or_None).
        """
        tokens = []
        # Pattern: **bold**, *italic*, XXLATEXNLATEXXX
        pattern = re.compile(r'(\*\*[^\*]+?\*\*|\*[^\*\s][^\*]*?\*|XXLATEX(\d+)LATEXXX)')

        bold = False
        italic = False

        pos = 0
        for m in pattern.finditer(text):
            # Plain text before match
            if m.start() > pos:
                plain = text[pos:m.start()]
                if plain:
                    tokens.append((plain, bold, italic, None))

            token = m.group(0)
            if token.startswith('**') and token.endswith('**'):
                inner = token[2:-2]
                tokens.append((inner, True, italic, None))
            elif token.startswith('*') and token.endswith('*') and len(token) > 2:
                inner = token[1:-1]
                tokens.append((inner, bold, True, None))
            elif token.startswith('XXLATEX'):
                idx_str = m.group(2)
                try:
                    idx = int(idx_str)
                    tokens.append(('', bold, italic, idx))
                except ValueError:
                    pass

            pos = m.end()

        if pos < len(text):
            tail = text[pos:]
            if tail:
                tokens.append((tail, bold, italic, None))

        return tokens

    def add_blockquote(self, text, formulas):
        self.set_text_color(*ACCENT)
        x = self.get_x()
        self.set_x(x + 5)
        # Use italic font for blockquote
        # Wrap and write
        available_w = 275 - 5
        tokens = self._tokenize_inline(text)
        line_height = 4
        current_x_offset = 0
        current_line_tokens = []

        def flush_line(italic_force=True):
            nonlocal current_x_offset
            if not current_line_tokens:
                return
            for tok in current_line_tokens:
                t_text, t_bold, t_italic, t_formula = tok
                if t_formula is not None:
                    if t_formula in formulas:
                        self.add_formula_inline(formulas[t_formula], fontsize=10)
                else:
                    if t_text:
                        self._write_plain(t_text, fontsize=9, italic=True, bold=t_bold)
            current_line_tokens.clear()
            current_x_offset = 0
            self.ln(line_height)

        for tok in tokens:
            t_text, t_bold, t_italic, t_formula = tok
            if t_formula is not None:
                if t_formula in formulas:
                    png = latex_to_png(formulas[t_formula], fontsize=10)
                    w, _ = self._img_size(png)
                    tok_w = w + 0.5
                else:
                    tok_w = 0
            else:
                self.set_font('DejaVu', 'I' if t_italic else 'BI' if (t_bold and t_italic) else 'B' if t_bold else '', 9)
                tok_w = self.get_string_width(t_text)

            if current_x_offset + tok_w > available_w:
                flush_line()
            current_line_tokens.append(tok)
            current_x_offset += tok_w

        flush_line()
        self.set_x(x)
        self.set_text_color(*DARK_BROWN)
        self.ln(1)

    def add_list(self, items, formulas, ordered=False):
        self.set_text_color(*DARK_BROWN)
        for i, item in enumerate(items):
            if self.get_y() > 195:
                self.add_page()
            marker = f"{i+1}." if ordered else "•"
            self.set_font('DejaVu', 'B', 9)
            self.cell(6, 4, marker)
            self.set_text_color(*DARK_BROWN)
            self.set_x(self.get_x())
            # Wrap and write
            available_w = 275 - 6
            tokens = self._tokenize_inline(item)
            line_height = 4
            current_x_offset = 0
            current_line_tokens = []

            def flush_list_line():
                nonlocal current_x_offset
                if not current_line_tokens:
                    return
                for tok in current_line_tokens:
                    t_text, t_bold, t_italic, t_formula = tok
                    if t_formula is not None:
                        if t_formula in formulas:
                            self.add_formula_inline(formulas[t_formula], fontsize=10)
                    else:
                        if t_text:
                            self._write_plain(t_text, fontsize=9, italic=t_italic, bold=t_bold)
                current_line_tokens.clear()
                current_x_offset = 0
                self.ln(line_height)

            for tok in tokens:
                t_text, t_bold, t_italic, t_formula = tok
                if t_formula is not None:
                    if t_formula in formulas:
                        png = latex_to_png(formulas[t_formula], fontsize=10)
                        w, _ = self._img_size(png)
                        tok_w = w + 0.5
                    else:
                        tok_w = 0
                else:
                    style = 'BI' if (t_bold and t_italic) else ('B' if t_bold else ('I' if t_italic else ''))
                    self.set_font('DejaVu', style, 9)
                    tok_w = self.get_string_width(t_text)

                if current_x_offset + tok_w > available_w:
                    flush_list_line()
                current_line_tokens.append(tok)
                current_x_offset += tok_w

            flush_list_line()
            self.ln(0)

    def add_table(self, rows, formulas):
        if not rows:
            return

        n_cols = len(rows[0])
        # Available width: 297 - 20 = 277 mm
        if n_cols == 3:
            col_widths = [55, 100, 122]
        elif n_cols == 4:
            col_widths = [40, 85, 60, 92]
        else:
            col_widths = [277 // n_cols] * n_cols

        # Header row
        if self.get_y() + 8 > 195:
            self.add_page()
        self.set_font('DejaVu', 'B', 9)
        self.set_fill_color(*HEADER_BG)
        self.set_text_color(*DARK_BROWN)
        for j, cell in enumerate(rows[0]):
            if 'XXLATEX' in cell:
                # Header with formula: render cell border then formula centered
                x_start = self.get_x()
                self.cell(col_widths[j], 9, '', border=1, fill=True)
                # Render formula centered in cell
                parts = re.split(r'XXLATEX(\d+)LATEXXX', cell)
                pngs = []
                for k, part in enumerate(parts):
                    if k % 2 == 1:
                        idx = int(part)
                        if idx in formulas:
                            png = latex_to_png(formulas[idx], fontsize=11)
                            w, h = self._img_size(png)
                            target_w = col_widths[j] - 4
                            if w > target_w:
                                ratio = target_w / w
                                w, h = target_w, h * ratio
                            pngs.append((png, w, h))
                # Render formulas
                cur_x = x_start + 2
                cur_y = self.get_y() - 9
                for (png, w, h) in pngs:
                    self.image(png, x=cur_x, y=cur_y + (9 - h) / 2, w=w, h=h)
                    cur_x += w + 2
            else:
                self.cell(col_widths[j], 7, cell, border=1, fill=True)
        self.ln()

        # Data rows
        for row_idx, row in enumerate(rows[1:]):
            if self.get_y() + 12 > 195:
                self.add_page()
                # Repeat header (with formula support)
                self.set_font('DejaVu', 'B', 9)
                self.set_fill_color(*HEADER_BG)
                for j, cell in enumerate(rows[0]):
                    if 'XXLATEX' in cell:
                        x_start = self.get_x()
                        self.cell(col_widths[j], 9, '', border=1, fill=True)
                        parts = re.split(r'XXLATEX(\d+)LATEXXX', cell)
                        pngs = []
                        for k, part in enumerate(parts):
                            if k % 2 == 1:
                                idx = int(part)
                                if idx in formulas:
                                    png = latex_to_png(formulas[idx], fontsize=11)
                                    w, h = self._img_size(png)
                                    target_w = col_widths[j] - 4
                                    if w > target_w:
                                        ratio = target_w / w
                                        w, h = target_w, h * ratio
                                    pngs.append((png, w, h))
                        cur_x = x_start + 2
                        cur_y = self.get_y()
                        for (png, w, h) in pngs:
                            self.image(png, x=cur_x, y=cur_y, w=w, h=h)
                            cur_x += w + 2
                    else:
                        self.cell(col_widths[j], 7, cell, border=1, fill=True)
                self.ln()

            has_formula = any('XXLATEX' in cell for cell in row)

            if not has_formula:
                # Calculate row height
                max_lines = 1
                for j, cell in enumerate(row):
                    lines = self.multi_cell(col_widths[j], 3.8, cell, dry_run=True, output="LINES")
                    max_lines = max(max_lines, len(lines))
                row_h = max_lines * 3.8 + 2
                x_start = self.get_x()
                y_start = self.get_y()
                for j, cell in enumerate(row):
                    x = x_start + sum(col_widths[:j])
                    self.set_xy(x, y_start)
                    self.set_font('DejaVu', '', 8)
                    self.set_text_color(*DARK_BROWN)
                    self.multi_cell(col_widths[j], 3.8, cell, border=1)
                self.set_xy(x_start, y_start + row_h)
            else:
                # Row with formula(s)
                self._add_formula_row(row, col_widths, formulas)
            self.ln(1)
        self.ln(2)

    def _add_formula_row(self, row, col_widths, formulas):
        # First pass: render all formulas in this row and get their heights
        cell_pngs = []  # list of (col_idx, list_of_pngs)
        max_h = 6  # minimum text-only height

        for j, cell in enumerate(row):
            if 'XXLATEX' in cell:
                parts = re.split(r'XXLATEX(\d+)LATEXXX', cell)
                pngs = []
                for k, part in enumerate(parts):
                    if k % 2 == 1:
                        idx = int(part)
                        if idx in formulas:
                            png = latex_to_png(formulas[idx], fontsize=11)
                            w, h = self._img_size(png)
                            # Scale to fit column width
                            target_w = col_widths[j] - 4
                            if w > target_w:
                                ratio = target_w / w
                                w, h = target_w, h * ratio
                            pngs.append((png, w, h))
                            max_h = max(max_h, h + 2)
                cell_pngs.append((j, pngs, cell))
            else:
                # Estimate height by lines
                lines = self.multi_cell(col_widths[j] - 2, 3.5, cell, dry_run=True, output="LINES")
                h = max(6, len(lines) * 3.5 + 2)
                max_h = max(max_h, h)

        row_h = max_h
        x_start = self.get_x()
        y_start = self.get_y()

        # Render each cell
        for j, cell in enumerate(row):
            x = x_start + sum(col_widths[:j])
            self.set_xy(x, y_start)
            # Border
            self.cell(col_widths[j], row_h, '', border=1)

            # Find formula pngs for this cell
            formula_data = None
            for (cj, pngs, _) in cell_pngs:
                if cj == j:
                    formula_data = pngs
                    break

            if formula_data:
                # Render formulas centered vertically
                total_h = sum(h for (_, _, h) in formula_data) + 2 * (len(formula_data) - 1)
                cur_y = y_start + (row_h - total_h) / 2
                for (png, w, h) in formula_data:
                    fx = x + (col_widths[j] - w) / 2
                    self.image(png, x=fx, y=cur_y, w=w, h=h)
                    cur_y += h + 2
            elif 'XXLATEX' in cell:
                # Text with inline formulas (rare for tables)
                self.set_xy(x + 1, y_start + 1)
                self.set_font('DejaVu', '', 8)
                self.set_text_color(*DARK_BROWN)
                self._write_with_formulas(cell, formulas, fontsize=8)
            else:
                # Plain text
                self.set_xy(x + 1, y_start + 1)
                self.set_font('DejaVu', '', 8)
                self.set_text_color(*DARK_BROWN)
                self.multi_cell(col_widths[j] - 2, 3.5, cell)

        self.set_xy(x_start, y_start + row_h)


# ============================================================
# Main
# ============================================================
def main():
    md_text = SRC.read_text(encoding='utf-8')
    print(f"Source: {len(md_text)} chars")

    processed_text, formulas = extract_latex(md_text)
    print(f"Found {len(formulas)} LaTeX formulas")

    # Pre-render all formulas
    print("Pre-rendering formulas...")
    for idx, formula in formulas.items():
        try:
            latex_to_png(formula, fontsize=11)
        except Exception as e:
            print(f"  WARN: formula {idx} failed: {e}")

    blocks = parse_markdown(processed_text)
    print(f"Parsed {len(blocks)} blocks")

    pdf = CheatSheetPDF()
    pdf.add_page()
    # Set background on first page
    pdf.set_fill_color(*CREAM)
    pdf.rect(0, 0, 297, 210, 'F')

    for block_type, content in blocks:
        if block_type == 'h1':
            pdf.add_h1(content)
        elif block_type == 'h2':
            pdf.add_h2(content)
        elif block_type == 'h3':
            pdf.add_h3(content)
        elif block_type == 'p':
            pdf.add_paragraph(content, formulas)
        elif block_type == 'ul':
            pdf.add_list(content, formulas, ordered=False)
        elif block_type == 'ol':
            pdf.add_list(content, formulas, ordered=True)
        elif block_type == 'table':
            pdf.add_table(content, formulas)
        elif block_type == 'blockquote':
            pdf.add_blockquote(content, formulas)
        elif block_type == 'hr':
            pdf.add_hr()

    pdf.output(str(OUT))
    size_kb = OUT.stat().st_size / 1024
    print(f"PDF saved: {OUT}")
    print(f"Size: {size_kb:.1f} KB")


if __name__ == '__main__':
    main()

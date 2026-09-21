#!/usr/bin/env python3
"""
Convert MD file to reader.html + preview.html using existing v17 template.
Each ## heading becomes a slide section.
"""

import re
import sys
import os
import html
from pathlib import Path

# Reader template (same as v17)
READER_CSS = """* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:16px; line-height:1.6; color:#3E2723; background:#F5F2EB; background-image:linear-gradient(180deg, rgba(245,242,235,1) 0%, rgba(240,235,225,1) 100%); }
.layout { display:flex; min-height:100vh; }
nav.toc { width:320px; flex-shrink:0; background:#FAF6EE; border-right:1px solid #D4C8B5; padding:24px 16px; position:sticky; top:0; height:100vh; overflow-y:auto; }
nav.toc h1 { font-size:17px; margin:0 0 12px 0; color:#3E2723; font-weight:700; }
nav.toc .block-header { display:block; margin-top:14px; margin-bottom:4px; font-weight:700; font-size:13px; color:#4a5568; text-transform:uppercase; letter-spacing:0.04em; text-decoration:none; }
nav.toc .slide-link { display:block; padding:4px 8px; font-size:13px; color:#2b6cb0; text-decoration:none; border-radius:4px; }
nav.toc .slide-link:hover { background:#ebf8ff; }
nav.toc .slide-link.sub-slide { padding-left: 20px; color: #4a5568; font-size: 12px; }
main.content { flex:1; max-width:880px; padding:40px 48px; margin:0 auto; background:transparent; }
section.slide { background:#FFFFFF; border-radius:8px; box-shadow:0 2px 8px rgba(74,44,42,0.08); padding:28px 32px; margin-bottom:28px; scroll-margin-top:20px; border:1px solid #E8DFD0; }
section.slide.final-slide { border-left:4px solid #38a169; }
section.slide.reference-slide { border-left:4px solid #d69e2e; background:#fffff0; }
section.slide.section-slide { background:linear-gradient(135deg, #FBF5E6 0%, #F4ECD8 100%); border-left:4px solid #6B5B95; }
section.slide.title-slide { text-align:center; background:linear-gradient(135deg, #4A2C2A 0%, #3E2723 100%); color:#F5F2EB; border:none; }
section.slide.title-slide h2 { color:#F5F2EB; }
section.slide.bridge-slide { background:linear-gradient(135deg, #FBF5E6 0%, #F4ECD8 100%); border-left:4px solid #6B5B95; }
header.slide-header { display:flex; align-items:baseline; gap:12px; margin-bottom:16px; border-bottom:1px solid #edf2f7; padding-bottom:12px; }
.slide-num { background:#EFE5D6; color:#4A2C2A; padding:2px 10px; border-radius:999px; font-size:12px; font-weight:700; white-space:nowrap; border:1px solid #D4C8B5; }
.slide-num.ref { background:#fefcbf; color:#975a16; }
.slide-num.sub { background:#edf2f7; color:#4a5568; }
header.slide-header h2 { font-size:22px; margin:0; color:#3E2723; line-height:1.3; font-weight:700; letter-spacing:-0.01em; }
.slide-body p { margin:0 0 12px 0; }
.slide-body h3 { font-size:18px; margin:20px 0 10px 0; color:#4A2C2A; font-weight:600; }
.slide-body h4 { font-size:16px; margin:16px 0 8px 0; color:#5D4037; font-weight:600; }
.slide-body ul, .slide-body ol { margin:0 0 12px 0; padding-left:24px; }
.slide-body li { margin-bottom:4px; }
.slide-body blockquote { margin:12px 0; padding:12px 18px; background:#F8E8E5; border-left:4px solid #C97D6F; color:#5D2E2A; border-radius:6px; font-style:normal; }
.slide-body blockquote p:last-child { margin-bottom:0; }
.slide-body table { border-collapse:collapse; margin:14px 0; font-size:13px; width:100%; }
.slide-body th, .slide-body td { border:1px solid #e2e8f0; padding:8px 12px; text-align:left; vertical-align:top; }
.slide-body th { background:#F5F0E0; font-weight:600; color:#2d3748; }
.slide-body code { background:#edf2f7; padding:1px 6px; border-radius:3px; font-family:'JetBrains Mono',Consolas,Monaco,monospace; font-size:0.92em; }
.math-block { text-align:center; margin:0.9em 0; padding:0.2em 0; overflow-x:auto; overflow-y:hidden; }
.math-block .katex-display { margin:0; }
.slide-body .katex { font-weight: 700; color: #2C2C2C; }
.slide-body p > .katex, .slide-body li > .katex { font-size: 1.05em; }
.slide-body img.slide-image { display:block; max-width:100%; height:auto; margin:14px auto; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
details { margin:12px 0; padding:12px 18px; background:#FBF7EE; border-left:4px solid #6B8E5B; border-radius:6px; }
details summary { cursor:pointer; font-weight:700; color:#3E2723; }
details[open] summary { margin-bottom:8px; }
button.back-to-toc { position:fixed; bottom:24px; right:24px; background:#4A2C2A; color:#F5F2EB; border:none; padding:10px 16px; border-radius:999px; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(74,44,42,0.3); z-index:10; font-weight:600; }
button.back-to-toc:hover { background:#3E2723; }
@media (max-width:900px) { .layout { flex-direction:column; } nav.toc { width:100%; height:auto; position:relative; } main.content { padding:20px; } }"""

def md_to_html_body(md_text):
    """Convert markdown to HTML body content with slides."""
    lines = md_text.split('\n')
    out = []
    slide_id = 0
    in_table = False
    table_rows = []
    in_list = False
    list_type = None
    in_code = False
    code_lang = ''
    code_lines = []
    in_blockquote = False
    blockquote_lines = []
    in_details = False
    details_lines = []
    skip_first_h1 = True
    main_h1 = ""
    
    def flush_table():
        nonlocal table_rows, in_table
        if not table_rows:
            in_table = False
            return ''
        result = ['<table>']
        for i, row in enumerate(table_rows):
            cells = row
            tag = 'th' if i == 0 else 'td'
            if not cells and i == 0:
                cells = [''] * (len(table_rows[1]) if len(table_rows) > 1 else 1)
            if not cells and len(table_rows) > 1:
                cells = [''] * len(table_rows[1])
            cells_html = ''.join(f'<{tag}>{c}</{tag}>' for c in cells)
            result.append(f'<tr>{cells_html}</tr>')
        result.append('</table>')
        table_rows = []
        in_table = False
        return '\n'.join(result) + '\n'
    
    def flush_list():
        nonlocal in_list, list_type
        if not in_list:
            return ''
        result = f'</{list_type}>\n'
        in_list = False
        list_type = None
        return result
    
    def flush_blockquote():
        nonlocal in_blockquote, blockquote_lines
        if not in_blockquote:
            return ''
        inner = md_to_html_body('\n'.join(blockquote_lines))
        result = f'<blockquote>{inner}</blockquote>\n'
        in_blockquote = False
        blockquote_lines = []
        return result
    
    def flush_details():
        nonlocal in_details, details_lines
        if not in_details:
            return ''
        inner = '\n'.join(details_lines)
        # Find summary line
        summary_match = re.search(r'<summary>(.*?)</summary>', inner, re.DOTALL)
        if summary_match:
            summary = summary_match.group(1)
            body = inner[summary_match.end():]
            result = f'<details><summary>{summary}</summary>\n{md_to_html_body(body)}</details>\n'
        else:
            result = f'<details>\n{md_to_html_body(inner)}</details>\n'
        in_details = False
        details_lines = []
        return result
    
    def process_inline(text):
        # Skip if inside math
        # Process bold and inline code first
        text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
        # Process inline code
        text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
        return text
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # Skip empty lines but track them
        if not stripped:
            if in_table:
                out.append(flush_table())
            if in_list:
                out.append(flush_list())
            if in_blockquote:
                out.append(flush_blockquote())
            if in_details:
                out.append(flush_details())
            out.append('\n')
            i += 1
            continue
        
        # H1
        if line.startswith('# ') and not line.startswith('## '):
            if skip_first_h1:
                skip_first_h1 = False
                main_h1 = line[2:].strip()
                i += 1
                continue
            out.append(f'<h1>{process_inline(line[2:].strip())}</h1>\n')
            i += 1
            continue
        
        # H2 - new slide
        if line.startswith('## '):
            if in_table:
                out.append(flush_table())
            if in_list:
                out.append(flush_list())
            if in_blockquote:
                out.append(flush_blockquote())
            if in_details:
                out.append(flush_details())
            slide_id += 1
            title = line[3:].strip()
            # Determine slide type
            slide_class = 'slide'
            num_class = ''
            if title.startswith('CONCEPT') or title.startswith('MECHANISM') or title.startswith('RECOGNITION') or title.startswith('ALGORITHM') or title.startswith('CONTRAST') or title.startswith('VARIATION') or title.startswith('ERROR'):
                slide_class = 'slide section-slide'
            elif 'Справочник' in title or 'Глоссарий' in title or 'Свойства' in title or 'Фишки' in title or 'Признаки' in title or 'Понятия' in title or 'Пифагора' in title or 'забыл' in title or '30-60' in title or 'биссектриса' in title.lower() or 'медиана' in title.lower():
                slide_class = 'slide reference-slide'
                num_class = 'ref'
            elif 'Титул' in title:
                slide_class = 'slide title-slide'
            elif 'Сборник формул' in title or 'Лайфхаки' in title or 'самопроверка' in title.lower():
                slide_class = 'slide final-slide'
            
            out.append(f'<section class="{slide_class}" id="slide-{slide_id}">\n')
            num_class_attr = f' class="{num_class}"' if num_class else ''
            out.append(f'<header class="slide-header"><span class="slide-num{num_class_attr}">{slide_id}</span><h2>{process_inline(title)}</h2></header>\n')
            out.append('<div class="slide-body">\n')
            i += 1
            continue
        
        # H3
        if line.startswith('### '):
            if in_table:
                out.append(flush_table())
            if in_list:
                out.append(flush_list())
            out.append(f'<h3>{process_inline(line[4:].strip())}</h3>\n')
            i += 1
            continue
        
        # H4
        if line.startswith('#### '):
            if in_table:
                out.append(flush_table())
            if in_list:
                out.append(flush_list())
            out.append(f'<h4>{process_inline(line[5:].strip())}</h4>\n')
            i += 1
            continue
        
        # Horizontal rule
        if stripped == '---':
            if in_table:
                out.append(flush_table())
            if in_list:
                out.append(flush_list())
            if in_blockquote:
                out.append(flush_blockquote())
            if in_details:
                out.append(flush_details())
            i += 1
            continue
        
        # Tables
        if line.startswith('|') and line.endswith('|'):
            if in_list:
                out.append(flush_list())
            if in_blockquote:
                out.append(flush_blockquote())
            cells = [c.strip() for c in line.strip('|').split('|')]
            # Skip separator rows
            if all(re.match(r'^[-:]+$', c) for c in cells):
                i += 1
                continue
            table_rows.append(cells)
            in_table = True
            i += 1
            continue
        else:
            if in_table:
                out.append(flush_table())
        
        # Blockquote
        if line.startswith('> '):
            if in_list:
                out.append(flush_list())
            if in_details:
                out.append(flush_details())
            content = line[2:]
            if not in_blockquote:
                in_blockquote = True
                blockquote_lines = []
            # Check for details summary
            if content.startswith('<details') or '<details' in content:
                in_blockquote = False
                out.append(flush_blockquote())
                # Process as details opening
                in_details = True
                details_lines = [content]
                i += 1
                continue
            blockquote_lines.append(content)
            i += 1
            continue
        else:
            if in_blockquote:
                out.append(flush_blockquote())
        
        # Details
        if '<details>' in line or line.startswith('<details'):
            if in_list:
                out.append(flush_list())
            in_details = True
            details_lines = [line]
            i += 1
            continue
        if in_details:
            if '</details>' in line:
                details_lines.append(line.replace('</details>', ''))
                out.append(flush_details())
                i += 1
                continue
            else:
                details_lines.append(line)
                i += 1
                continue
        
        # Unordered list
        if re.match(r'^[\-\*]\s', line) or re.match(r'^\*\s', line):
            if in_list and list_type != 'ul':
                out.append(flush_list())
            if not in_list:
                out.append('<ul>\n')
                in_list = True
                list_type = 'ul'
            content = re.sub(r'^[\-\*]\s', '', line)
            out.append(f'<li>{process_inline(content)}</li>\n')
            i += 1
            continue
        
        # Ordered list
        if re.match(r'^\d+\.\s', line):
            if in_list and list_type != 'ol':
                out.append(flush_list())
            if not in_list:
                out.append('<ol>\n')
                in_list = True
                list_type = 'ol'
            content = re.sub(r'^\d+\.\s', '', line)
            out.append(f'<li>{process_inline(content)}</li>\n')
            i += 1
            continue
        
        # Code block
        if line.startswith('```'):
            if in_code:
                in_code = False
                out.append(f'<pre><code>{html.escape(chr(10).join(code_lines))}</code></pre>\n')
                code_lines = []
            else:
                in_code = True
                code_lang = line[3:].strip()
                code_lines = []
            i += 1
            continue
        if in_code:
            code_lines.append(line)
            i += 1
            continue
        
        # Regular paragraph
        if in_list:
            out.append(flush_list())
        out.append(f'<p>{process_inline(line)}</p>\n')
        i += 1
    
    # Flush any remaining
    if in_table:
        out.append(flush_table())
    if in_list:
        out.append(flush_list())
    if in_blockquote:
        out.append(flush_blockquote())
    if in_details:
        out.append(flush_details())
    
    return ''.join(out)


def make_slide_breaks(html_content):
    """Wrap each slide's content properly. Already done in md_to_html_body."""
    return html_content


def close_slides(html_content):
    """Close any open slide sections before H2."""
    return html_content


def generate_reader_html(md_path, title, output_path):
    """Generate reader.html from MD file."""
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
    
    # Split into slides by ## headings
    # First, find all ## headings and split into slides
    slide_pattern = re.compile(r'^## (.+)$', re.MULTILINE)
    
    # Convert to HTML body
    body_html = md_to_html_body(md_text)
    
    # Close all open slide sections properly
    # Count sections that need closing
    open_sections = body_html.count('<section class="slide')
    close_tags = '</div>\n</section>\n' * open_sections
    body_html += close_tags
    
    # Generate TOC
    toc_entries = []
    slide_titles = re.findall(r'<section class="slide[^"]*" id="slide-(\d+)">.*?<h2>(.+?)</h2>', body_html)
    for slide_num, title_text in slide_titles:
        # Decode HTML entities
        title_clean = title_text.replace('<strong>', '').replace('</strong>', '')
        toc_entries.append(f'<a class="slide-link" href="#slide-{slide_num}">{slide_num}. {title_clean}</a>')
    
    toc_html = f'<nav class="toc"><h1>{title}</h1>' + '\n'.join(toc_entries) + '</nav>'
    
    # Final HTML
    html_doc = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — читалка</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.css">
<script>
window.addEventListener('DOMContentLoaded', () => {{
  if (window.renderMathInElement) {{
    renderMathInElement(document.body, {{
      delimiters: [
        {{left: '\\\\(', right: '\\\\)', display: false}},
        {{left: '\\\\[', right: '\\\\]', display: true}}
      ],
      throwOnError: false
    }});
  }}
}});
</script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<style>
{READER_CSS}
</style>
</head>
<body>
<div class="layout">
{toc_html}
<main class="content">
{body_html}
</main>
</div>
<button class="back-to-toc" onclick="window.scrollTo({{top:0, behavior:'smooth'}})">↑ Наверх</button>
</body>
</html>"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_doc)
    
    print(f"Generated: {output_path} ({len(html_doc)} bytes)")


def generate_preview_html(md_path, title, output_path):
    """Generate preview.html - condensed overview."""
    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
    
    # Extract first 30 lines or key sections for preview
    lines = md_text.split('\n')
    preview_md = []
    in_content = False
    section_count = 0
    
    for line in lines:
        if line.startswith('## ') and not line.startswith('### '):
            section_count += 1
            if section_count > 20:
                break
        preview_md.append(line)
    
    preview_text = '\n'.join(preview_md)
    body_html = md_to_html_body(preview_text)
    open_sections = body_html.count('<section class="slide')
    close_tags = '</div>\n</section>\n' * open_sections
    body_html += close_tags
    
    html_doc = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} — preview</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.css">
<script>
window.addEventListener('DOMContentLoaded', () => {{
  if (window.renderMathInElement) {{
    renderMathInElement(document.body, {{
      delimiters: [
        {{left: '\\\\(', right: '\\\\)', display: false}},
        {{left: '\\\\[', right: '\\\\]', display: true}}
      ],
      throwOnError: false
    }});
  }}
}});
</script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
<style>
{READER_CSS}
</style>
</head>
<body>
<div class="layout">
<nav class="toc"><h1>{title} — Превью</h1></nav>
<main class="content">
{body_html}
</main>
</div>
</body>
</html>"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_doc)
    
    print(f"Generated: {output_path} ({len(html_doc)} bytes)")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: md_to_html.py <md_path> <title>")
        sys.exit(1)
    
    md_path = sys.argv[1]
    title = sys.argv[2]
    base = Path(md_path).stem
    
    # Generate reader and preview
    reader_path = md_path.replace('.md', ' — reader.html')
    preview_path = md_path.replace('.md', ' — preview.html')
    
    generate_reader_html(md_path, title, reader_path)
    generate_preview_html(md_path, title, preview_path)
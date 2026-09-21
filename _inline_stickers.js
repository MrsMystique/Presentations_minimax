// Переразмещает стикеры в .md: убирает плашечные маркеры и вставляет inline по контексту.
// Один проход: заменяем все маркеры <!--STICKER:...--> перед слайдами на inline-перед тематическими блоками.
const fs = require('fs');

const MD_PATH = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';

let md = fs.readFileSync(MD_PATH, 'utf8');
const lines = md.split(/\r?\n/);

// === Шаг 1: собираем все маркеры стикеров, привязанные к слайдам ===
// Маркеры идут непосредственно перед `### Слайд N. ...`. Считываем их.
const slideMarkers = new Map(); // ключ = '### Слайд N. ...' → массив файлов
let i = 0;
while (i < lines.length) {
  const m = lines[i].trim().match(/^<!--STICKER:([^>]+)-->$/);
  if (m) {
    // Смотрим вниз — ищем ближайший `### Слайд ...` или `## Мостик.`
    let j = i + 1;
    while (j < lines.length && !/^(### Слайд|## Мостик)/.test(lines[j].trim())) j++;
    if (j < lines.length) {
      const key = lines[j].trim();
      if (!slideMarkers.has(key)) slideMarkers.set(key, []);
      slideMarkers.get(key).push(m[1]);
    }
    // Удаляем строку-маркер
    lines.splice(i, 1);
    // Не двигаем i — следующая строка теперь на той же позиции
    continue;
  }
  i++;
}

// === Шаг 2: для каждого слайда решаем, какие стикеры куда inline ===
const inlineByContext = {
  '> Лайфхак:':          ['layfkhak.png'],
  '> Возможная ловушка': ['tebe-hana.png'],  // покрывает ":", ":  ", ":" и т.д.
  '> Закон-триггер':     ['zapomni.png'],
  '**Как думать':        ['kak-dumat.png'],
  '**Вопрос 1.':         ['syhraem-v-igru.png'],
  '**Пример':            ['primer.png'],
  '**Числовой разбор':   ['schitay.png'],
};

// Стикеры, которые остаются на плашке перед слайдом (мостики, шпаргалки, мотивация, финал)
const keepOnPlate = (key) => {
  // Мостики: СТОП + МОСТИК
  if (/^## Мостик/.test(key)) return ['stop.png', 'mostik.png'];
  // Шпаргалки: ЗАПОМНИ
  if (/^### Слайд (1[8-9]|2[0-2])\. Шпаргалка/.test(key)) return ['zapomni.png'];
  // Слайд 23 (мотивация): ТЫ СМОЖЕШЬ + РИСКНИ + ПОДСКАЗКА
  if (/^### Слайд 23\./.test(key)) return ['ty-smozhesh.png', 'riskni-1.png', 'podskazka.png'];
  // Слайд 24.10 (финал): ИГРА ОКОНЧЕНА + НЕ РАЗОЧАРОВЫВАЙ + ЧИТ-КОД
  if (/^### Слайд 24\.10/.test(key)) return ['igra-okonchena.png', 'ne-razocharovyvay.png', 'chit-kod.png'];
  return null;
};

// === Шаг 3: проходим по слайдам, вставляем inline по контексту ===
// Для каждого слайда из слайдМаркерс:
//   1. Определяем, остаются ли маркеры на плашке
//   2. Распределяем остальные маркеры по inline-позициям внутри тела
//   3. Если маркеров больше, чем inline-позиций — лишние игнорируем

const lines2 = lines;
let k = 0;
let totalInline = 0;
let totalPlate = 0;
while (k < lines2.length) {
  const line = lines2[k].trim();
  const slideMatch = line.match(/^(### Слайд [^.]+(\.\d+)?\.|## Мостик[^.]*\.)/);
  if (!slideMatch) { k++; continue; }
  const fullKey = line;
  const stickers = slideMarkers.get(fullKey) || [];
  if (stickers.length === 0) { k++; continue; }

  // Проверяем, нужно ли оставить на плашке
  const plateStickers = keepOnPlate(fullKey);

  // Находим конец тела слайда (следующий `### ...` или `## ...` или конец файла)
  let bodyEnd = k + 1;
  while (bodyEnd < lines2.length && !/^(### |## )/.test(lines2[bodyEnd].trim())) bodyEnd++;

  // Список доступных inline-позиций
  const inlinePositions = [];
  for (let p = k + 1; p < bodyEnd; p++) {
    const lt = lines2[p].trim();
    for (const ctx of Object.keys(inlineByContext)) {
      if (lt.startsWith(ctx) || lt.includes(ctx)) {
        inlinePositions.push({ line: p, stickers: inlineByContext[ctx] });
        break;
      }
    }
  }

  // Распределяем стикеры
  const used = new Set();
  // 1) Плашка
  const plateInsert = [];
  if (plateStickers) {
    // На плашку идут все требуемые плашечные стикеры (если они в available)
    for (const s of plateStickers) if (stickers.includes(s)) { plateInsert.push(s); used.add(s); }
  }
  // 2) Inline — для каждой позиции ищем первый неиспользованный стикер из её списка
  for (const pos of inlinePositions) {
    for (const s of pos.stickers) {
      if (stickers.includes(s) && !used.has(s)) {
        // Вставляем перед строкой pos.line
        lines2.splice(pos.line, 0, '<!--INLINE:' + s + '-->');
        used.add(s);
        totalInline++;
        // После вставки все позиции после pos.line сдвигаются на +1
        bodyEnd++;
        for (let q = k + 1; q < bodyEnd; q++) {
          if (inlinePositions[inlinePositions.indexOf(pos) + 1] && inlinePositions[inlinePositions.indexOf(pos) + 1].line >= pos.line) {
            inlinePositions[inlinePositions.indexOf(pos) + 1].line++;
          }
        }
        break;
      }
    }
  }

  // 3) Если остались неиспользованные стикеры — добавляем их как плашку перед заголовком (если нет плашки)
  const remaining = stickers.filter(s => !used.has(s));
  if (remaining.length > 0 && !plateStickers) {
    // Создаём плашку
    const plateBlock = remaining.map(s => '<!--STICKER:' + s + '-->').join('\n') + '\n';
    lines2.splice(k, 0, ...plateBlock.split('\n').filter(Boolean));
    k += remaining.length;
    bodyEnd += remaining.length;
    totalPlate++;
  } else if (remaining.length > 0) {
    // Добавляем к плашке
    // Находим уже вставленные маркеры плашки (если есть)
    let plateStart = k - 1;
    while (plateStart >= 0 && /^<!--STICKER:/.test(lines2[plateStart].trim())) plateStart--;
    plateStart++;
    for (const s of remaining) {
      lines2.splice(plateStart + plateInsert.length, 0, '<!--STICKER:' + s + '-->');
      plateInsert.push(s);
    }
    totalPlate++;
  }

  k = bodyEnd;
}

fs.writeFileSync(MD_PATH, lines2.join('\n'), 'utf8');
console.log('Inline вставлено: ' + totalInline);
console.log('Плашек оставлено: ' + totalPlate);
console.log('Всего маркеров в файле: ' + (md.match(/<!--(STICKER|INLINE):[^>]+-->/g) || []).length);

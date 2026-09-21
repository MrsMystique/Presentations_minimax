// Осознанная расстановка стикеров по слайдам
const fs = require('fs');
const mdPath = 'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax\\Чистовые слайды v3.3 — Проценты, пропорции, масштаб.md';
let md = fs.readFileSync(mdPath, 'utf8');

// Карта: ключ = уникальная подстрока заголовка слайда, значение = список стикеров inline
// (стикеры вставляются в начало body слайда)
const placements = {
  'Слайд 3. Пропорция: равенство двух отношений': ['balans.png'],
  'Слайд 4. Как решать задачу через пропорцию': ['kak-dumat.png'],
  'Слайд 7. Обратная зависимость: противофаза': ['kak-naschet-uravneniya.png'],
  'Слайд 9. Перевод единиц: метрический мост': ['layfkhak.png'],
  'Слайд 10. Что такое процент: сотая часть целого': ['vnimatelno.png'],
  'Слайд 12. Тип 1': ['primer.png'],
  'Слайд 13. Тип 2': ['primer.png'],
  'Слайд 15.2. Задачи на смеси и сплавы': ['primer.png'],
  'Слайд 16. Что такое сложный процент': ['klan-v-dele.png'],
  'Слайд 17. Задача на сложный процент': ['primer.png'],
  'Слайд 23. Зачем тебе всё это': ['ty-smozhesh.png'],
  'Слайд 24. Задача на сложную скидку в два этапа': ['riskni-2.png', 'tebe-hana.png'],
  'Слайд 24.1. Задача на процент от процента': ['tebe-hana.png', 'kak-naschet-uravneniya.png'],
  'Слайд 24.2. Задача на смешивание растворов': ['tebe-hana.png', 'primer.png'],
  'Слайд 24.3. Задача на масштаб карты': ['tebe-hana.png', 'schitay.png'],
  'Слайд 24.4. Задача на прямую и обратную зависимость': ['tebe-hana.png'],
  'Слайд 24.5. Задача на процент изменения': ['tebe-hana.png', 'vnimatelno.png'],
  'Слайд 24.6. Задача на сложный процент': ['tebe-hana.png', 'zapomni.png', 'vremya-vyshlo.png'],
  'Слайд 24.7. Пропорциональность через прямоугольники': ['tebe-hana.png', 'vnimatelno.png'],
  'Слайд 24.8. Переливание жидкости': ['tebe-hana.png', 'kak-naschet-uravneniya.png', 'vremya-vyshlo.png'],
  'Слайд 24.9. Квартиры в двух домах': ['tebe-hana.png', 'kak-naschet-uravneniya.png', 'vremya-vyshlo.png']
};

// Карта для скриптов самопроверки: добавляется перед первым Вопросом
const scriptPlacements = {
  'Слайд 7.1.': ['syhraem-v-igru.png', 'kak-dumat.png'],
  'Слайд 9.1.': ['syhraem-v-igru.png', 'kak-dumat.png'],
  'Слайд 15.1.': ['syhraem-v-igru.png', 'kak-dumat.png'],
  'Слайд 17.1.': ['syhraem-v-igru.png', 'kak-dumat.png']
};

// Карта для шпаргалок: добавляется в начало body
const shpargalkaPlacements = {
  'Слайд 18.': ['zapomni.png'],
  'Слайд 19.': ['zapomni.png'],
  'Слайд 20.': ['zapomni.png'],
  'Слайд 21.': ['zapomni.png'],
  'Слайд 22.': ['zapomni.png']
};

// Удаляем все существующие INLINE-маркеры (мы их переставим)
md = md.replace(/<!--(?:STICKER|INLINE):[^>]+-->\n?/g, '');

// Подчищаем лишние пустые строки
md = md.replace(/\n{3,}/g, '\n\n');

// Разбиваем на строки
const lines = md.split(/\r?\n/);
const out = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  out.push(line);

  const h3Match = line.match(/^(### Слайd.+)/) || line.match(/^(### Слайд.+)/);
  if (!h3Match) continue;
  const h3 = h3Match[1];

  // Проверяем основные слайды
  for (const key of Object.keys(placements)) {
    if (h3.includes(key)) {
      const stickers = placements[key];
      const block = stickers.map(f => `<!--INLINE:${f}-->`).join('\n');
      // Вставляем после пустой строки (между h3 и телом)
      out.push('');
      out.push(block);
      break;
    }
  }

  // Проверяем скрипты самопроверки (вставляем перед первым Вопросом)
  for (const key of Object.keys(scriptPlacements)) {
    if (h3.includes(key)) {
      const stickers = scriptPlacements[key];
      const block = stickers.map(f => `<!--INLINE:${f}-->`).join('\n');
      // Найдём в следующих строках "**Вопрос 1.**" и вставим перед ним
      let insertAt = -1;
      for (let j = i + 1; j < Math.min(i + 20, out.length); j++) {
        if (out[j].includes('**Вопрос 1.')) {
          insertAt = j;
          break;
        }
      }
      if (insertAt > 0) {
        out.splice(insertAt, 0, block);
        i = insertAt + stickers.length;
      }
      break;
    }
  }

  // Проверяем шпаргалки
  for (const key of Object.keys(shpargalkaPlacements)) {
    if (h3.includes(key)) {
      const stickers = shpargalkaPlacements[key];
      const block = stickers.map(f => `<!--INLINE:${f}-->`).join('\n');
      out.push('');
      out.push(block);
      break;
    }
  }
}

fs.writeFileSync(mdPath, out.join('\n'), 'utf8');

const finalStickers = (out.join('\n').match(/<!--(?:STICKER|INLINE):[^>]+-->/g) || []);
console.log('ИТОГО маркеров:', finalStickers.length);
console.log('Из них STICKER:', (out.join('\n').match(/<!--STICKER:[^>]+-->/g) || []).length);
console.log('Из них INLINE:', (out.join('\n').match(/<!--INLINE:[^>]+-->/g) || []).length);

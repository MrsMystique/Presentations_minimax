// Чинит </script> внутри JS-строки (заменяет на безопасный вариант)
const fs = require('fs');
const path = require('path');

const filePath = path.join(
  'C:\\Users\\admin\\Desktop\\математика мои слайды\\Minimax',
  '_build_procenti_v2_3.js'
);

let content = fs.readFileSync(filePath, 'utf8');

// Заменяем все </script> внутри шаблона buildReader на "scr'+'ipt>"
// Но в самом скрипте (вне строк) не трогаем — он не </script>, а просто в строке
// Безопаснее всего заменить ВСЕ вхождения в коде, но только в buildReader:
// Найдём все </script> в файле и заменим только те, что в JS-литерале (между return ' и ';)
let count = 0;
content = content.replace(/<\/script>/g, (match, offset) => {
  count++;
  return "</scr' + 'ipt>";
});
console.log('Replaced ' + count + ' occurrences of </script>');

fs.writeFileSync(filePath, content, 'utf8');
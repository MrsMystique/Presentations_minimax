// Test escape behavior in JS strings
const a = 'test \(5\) end';
console.log('a length: ' + a.length);
console.log('a content: ' + JSON.stringify(a));
console.log();
const b = String.raw`test \(5\) end`;
console.log('b length: ' + b.length);
console.log('b content: ' + JSON.stringify(b));
console.log();
// Now test with backslashes
const c = 'no \\(5\\) end';
console.log('c (double backslash): ' + JSON.stringify(c) + ' len=' + c.length);
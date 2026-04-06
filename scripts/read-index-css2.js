const fs = require('fs');
const p = 'C:\\Dev\\forgedlucidity-site\\public\\index.html';
const content = fs.readFileSync(p, 'utf8');
const styleStart = content.indexOf('<style>');
const styleEnd = content.indexOf('</style>');
const css = content.slice(styleStart, styleEnd + 8);
// Show the rest after truncation point
console.log(css.slice(2800));

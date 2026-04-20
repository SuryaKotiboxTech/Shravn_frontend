const fs = require('fs');
const path = require('path');
const root = process.cwd();
const exts = new Set(['.ts', '.tsx', '.js', '.jsx']);
const replacements = [
  ['#C9A84C', '#5B96D1'],
  ['#B08D40', '#2660A2'],
  ['#B8872A', '#5A7BC1'],
  ['#A07828', '#5A7BC1'],
  ['#7A6040', '#4A6E9A'],
  ['#6B5530', '#3F5D8D'],
  ['#8B7355', '#1F3E7D'],
  ['#a68a6b', '#2660A2'],
  ['#9a7a5a', '#5B7FBB'],
  ['#d4bca1', '#8BA7D7'],
  ['#F5EDD8', '#EFF5FF'],
  ['#FAF6EF', '#F7FBFF'],
  ['#E8D5A8', '#D4E0FF'],
  ['#C4A97A', '#5B96D1'],
  ['rgba(201,168,76,0.1)', 'rgba(91,150,209,0.1)'],
  ['rgba(201,168,76,0.03)', 'rgba(91,150,209,0.03)'],
  ['#9A7A5A', '#5B7FBB'],
  ['#A68A6B', '#2660A2'],
];
const changed = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === '.next' || name === 'node_modules' || name === '.git') continue;
      walk(full);
      continue;
    }
    if (!exts.has(path.extname(name))) continue;
    let content = fs.readFileSync(full, 'utf8');
    const original = content;
    replacements.forEach(([from, to]) => {
      content = content.split(from).join(to);
    });
    if (content !== original) {
      fs.writeFileSync(full, content, 'utf8');
      changed.push(full.replace(root + path.sep, ''));
    }
  }
}
walk(root);
console.log('updated files:', changed.length);
if (changed.length > 0) console.log(changed.join('\n'));
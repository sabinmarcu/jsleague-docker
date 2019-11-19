const fs = require('fs');
const path = require('path');
const origin = require('remote-origin-url');

const publicPath = path.resolve(__dirname, '../public');

// index.html
const indexPath = path.resolve(publicPath, "index.html");
const content = fs.readFileSync(
  indexPath,
  "utf-8",
);

fs.writeFileSync(
  indexPath,
  content
    .replace(/(href|src)="\//g, '$1="'),
);

// app.js files
fs.readdirSync(publicPath)
  .filter(it => it.includes('app'))
  .forEach(file => {
    const src = path.resolve(publicPath, file);
    const cont = fs.readFileSync(src, 'utf-8');
    fs.writeFileSync(
      src,
      cont.replace(/\/([a-zA-Z-]+-data)/g, "$1")
    );
  })
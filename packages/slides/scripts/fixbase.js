const fs = require('fs');
const path = require('path');
const origin = require('remote-origin-url');

const indexPath = path.resolve(__dirname, "../public/index.html");
const content = fs.readFileSync(
  indexPath,
  "utf-8",
);

const gitPath = path.resolve(__dirname, "../../../.git/config");
const { 
  1: account,
  2: repo,
} = origin.sync(gitPath).match(/:([^\/]+)\/([^\.]+)\./);

fs.writeFileSync(
  indexPath,
  content
    .replace(/(href|src)="\//g, '$1="')
    .replace(/<head>/, `<head>
    <base href="https://${account}.github.io/${repo}/">
  `),
);
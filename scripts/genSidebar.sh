#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const wikiDir = path.resolve(__dirname, '../wiki');

const getFiles = folder => (dir => fs
  .readdirSync(dir)
  .filter(it => it.endsWith('md'))
  .filter(it => !it.match(/(Home|_Sidebar)\.md/))
  .map(file => [file, path.resolve(dir, file)])
)(path.resolve(wikiDir, folder));

const generateList = dir => getFiles(dir).map(([fileName, file]) => {  
  const content = fs.readFileSync(file, "utf-8");
  const titleMatch = content.match(/<\!--\s+TITLE:\s+([a-zA-Z0-9 ]*[a-zA-Z0-9])\s+-->/);
  const title = titleMatch && titleMatch[1] || null;
  const subtitleMatch = content.match(/<\!--\s+SUBTITLE:\s+([a-zA-Z0-9 ]*[a-zA-Z0-9])\s+-->/);
  const subtitle = subtitleMatch && subtitleMatch[1] || null;
  const nameMatch = fileName.match(/([a-zA-Z0-9]+)\.md$/);
  const name = nameMatch ? nameMatch[1] : 'unknown';
  return `- [${title || subtitle || `${name[0].toUpperCase()}${name.slice(1)}`}](${fileName.replace(/\.md$/, "")})`;
}).join('\n\n');

const exercises = generateList('exercises');
const slides = generateList('slides');

const homeContent = `
# Here you'll find all exercises and slides, in page format. 

## Slides

The slides have been skimmed down from the presentation format. Things might not be the same.
However, they should be close enough.

Here are the slides: 

${slides}

## Exercises

We'll go through them one step as a time. 

Without further ado, here is the list:

${exercises}

`

const sidebarContent = `
# Links 

[Home](Home)

[Presentation](https://sabinmarcu.github.io/jsleague-docker)

[Repo](https://github.com/sabinmarcu/jsleague-docker)

# Slides

${slides}

# Exercises

${exercises}
`;

fs.writeFileSync(
  path.resolve(wikiDir, '_Sidebar.md'),
  sidebarContent,
);

fs.writeFileSync(
  path.resolve(wikiDir, 'Home.md'),
  homeContent,
);
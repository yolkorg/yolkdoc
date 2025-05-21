import fs from 'node:fs';
import path from 'node:path';

const docJSON = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, '..', 'docs.json'), 'utf-8'));

const categories = docJSON.navigation.tabs[0].groups;
const docPaths = categories.map((category) => category.pages).flat();
const filePaths = docPaths.map((docPath) => path.join(import.meta.dirname, '..', docPath) + '.mdx');

let llmsFull = 'yolkbot is an npm library that provides an API for bot making on shellshock.io (Shell Shockers).';

filePaths.forEach((file) => {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const fileName = path.basename(file, '.md');

    const title = fileContent.match(/title: "(.*)"/)[1];
    const description = fileContent.match(/description: "(.*)"/)[1];

    llmsFull += `\n\n## ${title}\n### ${description}\n### ${fileName}${fileContent.split('---')[2]}\n\n----------------------`;
});

llmsFull += '\n\nThis is the end of the documentation. A copy is online at https://yolkbot.villainsrule.xyz';

fs.writeFileSync(path.join(import.meta.dirname, 'llms_full.txt'), llmsFull, 'utf-8');

console.log('llms_full.txt generated successfully!');
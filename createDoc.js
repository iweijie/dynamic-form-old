// ./docgen.js

const path = require('path');
const fs = require('fs');
const reactDocs = require('react-docgen');
// const prettier = require('prettier');

// 读取文件内容
const content = fs.readFileSync(
    path.resolve('./csDoc/person/index.js'),
    'utf-8',
);
// 提取组件信息
const componentInfo = reactDocs.parse(content);
// 打印信息

fs.writeFile(
    'Doc.json',
    JSON.stringify(componentInfo),
    { encoding: 'utf8', flag: 'w+' },
    err => {
        if (err) console.log(err);
    },
);

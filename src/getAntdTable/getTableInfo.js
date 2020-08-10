const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const _ = require('lodash');

function getJson({ url, method, fileName }) {
    const headerFields = [
        { name: '参数', field: 'field' },
        { name: '说明', field: 'explain' },
        { name: '类型', field: 'type' },
        { name: '默认值', field: 'defaultValue' },
        { name: '版本', field: 'version' },
    ];

    function parser(str) {
        const json = [];
        const $ = cheerio.load(str);
        $('.api-container h2').each((index, item) => {
            item = $(item);
            const title = item.find('span').text();
            const table = item.next().next();
            const header = [];
            table.find('thead th').each((i, th) => {
                const txt = $(th).text();
                const findData = _.find(headerFields, h => h.name === txt);
                header.push(findData || {});
            });

            if (!_.size(header)) return;
            const body = [];
            table.find('tbody tr').each((i, tr) => {
                let data = {};
                $(tr)
                    .find('td')
                    .each((k, td) => {
                        const field = header[k].field;
                        data[field] = $(td).text();
                    });
                body.push(data);
            });

            json.push({
                title,
                header,
                body,
            });
        });

        return json;
    }

    return new Promise((resolve, reject) => {
        const temp = `${fileName}_temp`;
        try {
            const data = fs.readFileSync(temp, 'utf-8');
            resolve(data);
        } catch (err) {
            console.log(err);
            request({ url, method }, function(error, response, body) {
                if (error) return reject(err);
                fs.writeFile(
                    temp,
                    body,
                    { encoding: 'utf8', flag: 'w+' },
                    err => {
                        if (err) return;
                        resolve(body);
                    },
                );
            });
        }
    })
        .then(data => {
            return parser(data);
        })
        .then(json => {
            fs.writeFile(
                `${fileName}.json`,
                JSON.stringify(json),
                { encoding: 'utf8', flag: 'w+' },
                err => {
                    if (err) console.log(err);
                },
            );
        });
}

getJson({
    url: 'https://ant.design/components/form-cn/', //请求路径
    method: 'Get', //请求方式，默认为get
    fileName: 'FormItem',
});

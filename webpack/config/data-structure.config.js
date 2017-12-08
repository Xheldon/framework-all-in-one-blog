let fs = require('fs');
let exec = require('child_process').execSync; // 执行 shell 命令
let path = require('path');
let glob = require('glob');
let ora = require('ora');
let colors = require('colors');

module.exports = () => {
    const spinner = ora('Start creat article list:\r\n'.green.bgWhite).start();
    let out = fs.createWriteStream(path.resolve(__dirname, '../../src/common/md/post-list.js'), {
        encoding: 'utf8'
    });
    let md = glob.sync('./src/common/md/*.md');
    out.write('module.exports = {\n');
    let title;
    let time = '';
    let name = '';
    for (let i = 0; i < md.length; i++) {
        if (md[i]) {
            title = exec('cat ' + md[i] +  '| head -n 1', {encoding: 'utf8'});
            md[i] = md[i].slice(16);
            time = md[i].slice(0, 10);
            name = md[i].slice(11, -3);
            title = title.replace('\n', '').replace('# ', '');
            pageName = md[i].slice(0, -3);
            if (time && name) {
                if (i === md.length - 1) {
                    out.write(`    '${name}.html': ['post', '${title}', '${time}', '${md[i]}']\r\n};`);
                } else {
                    out.write(`    '${name}.html': ['post', '${title}', '${time}', '${md[i]}'],\r\n`);
                }
            } else {
                if (i === md.length - 1) {
                    out.write(`    '${pageName}.html': ['page', '${title}', '', '${md[i]}']\r\n};`);
                } else {
                    out.write(`    '${pageName}.html': ['page', '${title}', '', '${md[i]}'],\r\n`);
                }
            }
            if (time && name) {
                spinner.succeed(`${name.green} has been add !`)
            } else {
                spinner.succeed(`${pageName.green} has been add !`)
            }
        }
    }
    out.end();
    spinner.stop('Create complete successly!'.green.bgWhite);
};

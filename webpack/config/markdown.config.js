let fs = require('fs');
let path = require('path');

let names = fs.readdirSync(path.resolve(__dirname, '../../src/common/md'));

module.exports = names;

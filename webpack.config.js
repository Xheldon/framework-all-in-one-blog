let prod = require('./webpack/webpack.prod.js');
let dev = require('./webpack/webpack.dev.js');

let env = process.env.NODE_ENV || 'development';
let conf = env === 'development' ? dev : prod;

module.exports = conf;

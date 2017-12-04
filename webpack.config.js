let prod = require('./webpack/webpack.prod.js');
let dev = require('./webpack/webpack.dev.js');
let env = process.env.NODE_ENV || 'dev';
let conf = env === 'dev' ? dev : prod;
module.exports = conf;

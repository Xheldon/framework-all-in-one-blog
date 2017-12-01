let config = require('../config/env.config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

let path = require('path');
let express = require('express');
let webpack = require('webpack');
let webpackConfig = process.env.NODE_ENV === 'prod' ? require('../webpack.prod') : require('../webpack.dev');

let port = config.dev.port;

let app = express();
let compiler = webpack(webpackConfig);

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    }
});

let hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation', (compilation) => { // 待查
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({
            action: 'reload'
        });
        cb();
    });
});

app.use(devMiddleware);

app.use(hotMiddleware);

let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDir);

app.use(staticPath, express.static('./static'));

let uri = 'http://localhost:' + prot;

devMiddleware.waitUtilValid(() => {
    console.log(`> Listening at ${uri}\n`);
});
module.exports = app.listen(port, (err) => {
    if (err) {
        console.log(`app error: ${__dirname}-${err}`);
        return;
    }
});


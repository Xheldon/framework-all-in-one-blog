let path = require('path');

module.exports = {
    build: {
        env: {
            NODE_ENV: 'prod',
            PROCESS_ENV: JSON.stringify(procss.env.NODE_ENV)
        },
        assetsRoot: path.resolve(__dirname, '../../build'),
        assetsSubDir: 'dist',
        prodSrcMap: true,
        prodGzip: false,
        prodGzipExt: ['js', 'css']
    },
    dev: {
        port: 8081,
        env: {
            NODE_ENV: 'dev',
            PROCESS_ENV: JSON.stringify(procss.env.NODE_ENV)
        },
        assetsPublicPath: '/',
        assetsRoot: path.resolve(__dirname, '../../build'),
        assetsSubDirectory: 'dist',
        cssSourceMap: false
    }
};
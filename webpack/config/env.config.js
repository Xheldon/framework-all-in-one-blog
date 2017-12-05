let path = require('path');

module.exports = {
    build: {
        env: {
            NODE_ENV: 'prod',
            PROCESS_ENV: JSON.stringify(process.env.NODE_ENV)
        },
        assetsRoot: path.resolve(__dirname, '../../docs'),
        assetsSubDir: '',
        prodSrcMap: true,
        prodGzip: false,
        prodGzipExt: ['js', 'css']
    },
    dev: {
        port: 8089,
        env: {
            NODE_ENV: 'dev',
            PROCESS_ENV: JSON.stringify(process.env.NODE_ENV)
        },
        assetsPublicPath: '/',
        assetsRoot: path.resolve(__dirname, '../../docs'),
        assetsSubDir: '',
        cssSourceMap: false
    }
};
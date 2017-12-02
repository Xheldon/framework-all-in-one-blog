let loaderConfig = require('./config/loader.config');
let glob = require('glob');
let webpack = require('webpack');
let config = require('./config/env.config');
let merge = require('webpack-merge');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 友好的显示出那些出错了而没有编译成功


let baseConfig = require('./webpack.base');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let html = Object.keys(baseConfig.entry).map((item) => {
    let arr = item.split('/');
    let name = arr.slice(0, -1).join('/');

    return new HtmlWebpackPlugin({
        data: { // data 可以在 html/ejs 中通过条件判断引用
            build: false,
            vendor: name + '/vendor',
            entry: item,
            title: 'Xheldon 博客' // TODO: 根据 所有 md 文件名字生成对应 title
        },
        filename: item + '.html',
        template: 'ejs-compiled-loader!' + loaderConfig.templateUrl,
        inject: false,
        minify: false
    });
});

module.exports = merge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    devServer: {
        port: config.dev.port,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: '/'
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': config.dev.env
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new FriendlyErrorsPlugin()
    ].concat(html)
});
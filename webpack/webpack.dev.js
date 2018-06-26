let loaderConfig = require('./config/loader.config');
let glob = require('glob');
let webpack = require('webpack');
let config = require('./config/env.config');
let merge = require('webpack-merge');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'); // 友好的显示出那些出错了而没有编译成功
// markdown 渲染
let marked = require('marked');
let renderer = new marked.Renderer();
let hl = require('highlight.js');


let baseConfig = require('./webpack.base');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let html = Object.keys(baseConfig.entry).map((item) => {
    let arr = item.split('/');
    let name = arr.slice(0, -1).join('/');
    let templateUrl = loaderConfig.templateUrl;
    // angularjs 这个奇葩需要单独判断模板文件, 其内容无法通过纯 js 生成
    if (name === 'angularjs') {
        templateUrl = loaderConfig.ngTemplateUrl;
    }
    return new HtmlWebpackPlugin({
        data: { // data 可以在 html/ejs 中通过条件判断引用
            build: false,
            vendor: name + '/vendor',
            entry: item,
            title: `Xheldon'blog - ${name} - project`
        },
        filename: item + '.html',
        template: 'ejs-compiled-loader!' + templateUrl,
        inject: false,
        minify: false
    });
});

Object.keys(baseConfig.entry).forEach((name) => {
    baseConfig.entry[name] = ['./webpack/dev-server/client.js'].concat(baseConfig.entry[name]); // concat 的为绝对路径
});
// console.log(baseConfig);


module.exports = merge(baseConfig, {
    devtool: 'cheap-module-source-map',
    module: {
        rules: loaderConfig.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    devServer: {
        port: 8089,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: '/'
    },
    output: {
        filename: '[name].[hash:7].js',
        publicPath: '/',
        chunkFilename: 'common/async/[name].[hash:7].js',// md 文件被异步加载为 js 文件
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new FriendlyErrorsPlugin()
    ].concat(html)
}, {
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            renderer,
                            highlight: function (code) {
                                return hl.highlightAuto(code).value;
                            },
                            langPrefix: 'hljs ' // 使用类名
                        }
                    }
                ]
            }
        ]
    }
});

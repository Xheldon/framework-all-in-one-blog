let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let config = require('./config/env.config');
let loaderConfig = require('./config/loader.config');
let baseConfig =require('./webpack.base');
let HtmlwebpackPlugin  =require('html-webpack-plugin');
let UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');

let publicPath = '';
let marked = require('marked');
let renderer = new marked.Renderer();
let hl = require('highlight.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'prod';

if (process.env.NODE_ENV === 'prod') {
    publicPath = '/'; // TODO: 设置线上地址
} else {
    publicPath = ''
}
let html = Object.keys(baseConfig.entry).map((item) => {
    let arr = item.split('/');
    let name = arr.slice(0, -1).join('/');
    return new HtmlwebpackPlugin({
        data: {
            build: true,
            vendor: 'common', // 遇到入口名字是 common 的, 则标记为 vendor, 在放入 html 模板的时候, 始终加载
            entry: item,
            title: `Xheldon'blog - ${name} - project`
        },
        filename: item + '.html',
        template: 'ejs-compiled-loader!' + loaderConfig.templateUrl,
        inject: false,
        chunks: ['common', item],
        minify: { // 复制来的, 待查
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true,
            collapseInlineTagWhitespace: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            caseSensitive: true,
            minifyJS: true,
            minifyCSS: true,
            quoteCharacter: '"'
        }
    });
});

baseConfig.entry['common'] = ['react', 'react-dom', 'react-router-dom']; // 配合 htmlwebpackplugin 插件, 提取 common 到单独的文件中

module.exports = webpackMerge(baseConfig, {
    output: {
        publicPath: publicPath,
        filename: '[name].[hash:7].js',
        chunkFilename: 'common/async/[name].[hash:7].js', // md 文件被异步加载为 js 文件
    },
    module: {
        rules: loaderConfig.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    plugins: [
        new UglifyJsParallelPlugin({
            cacheDir: '.cache/',
            uglifyJS: {
                output: {
                    comments: false
                },
                compress: {
                    warnings: false,
                    unused: false
                }
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: true},
            canPrint: true
        }),
        new ExtractTextPlugin({
            filename: loaderConfig.assetsPath('[name].[hash:7].css')
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../index.html'),
            to: path.resolve(__dirname, '../docs/')
        }, {
            from: path.resolve(__dirname, '../CNAME'),
            to: path.resolve(__dirname, '../docs/')
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            /* 用复数是因为, 只要在 entry 配置好需要提取的模块名字, 都能被打包进来, 需要注意的是
            * 如果有多个 names 如 ['react', 'vue', 'common'] 则会在最后一个 common 中存在一个入口依赖函数
            * 必须首先引用 names 数组的最后一个元素, 即 common 在每个页面才行, 否则会报 webpackJSONP 未定义
            * */
            names: ['common'],
            filename: 'common/vendor.js'
        })
    ].concat(html),
    bail: true // ??? 待查
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

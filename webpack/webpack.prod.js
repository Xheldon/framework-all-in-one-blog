let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let config = require('./config/env.config');
let loaderConfig = require('./config/loader.config');
let baseConfig =require('./webpack.base');
let HtmlwebpackPlugin  =require('html-webpack-plugin');
let UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            vendor: name + '/vendor',
            entry: item
        },
        filename: item + '.html',
        template: 'ejs-compiled-loader!' + loaderConfig.templateUrl,
        inject: false,
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

module.exports = webpackMerge(baseConfig, {
    output: {
        publicPath: publicPath,
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

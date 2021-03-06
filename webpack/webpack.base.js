// 必须的包
let webpack = require('webpack');
let path = require('path');
let glob = require('glob');
let marked = require("marked");
// 读取 markdown 目录, 并生成数据结构
require('./config/data-structure.config')();

// 配置文件
let config = require('./config/env.config');
let loaderConfig = require('./config/loader.config.js');

// 项目路径
let projectRoot = path.resolve(__dirname,'../');
// console.log('projectRoot:', projectRoot);

// 辅助函数, 少写点代码
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


let js = glob.sync('./src/*/index.js').reduce((prev, curr) => {
    /*  注释: 为什么参数路径为 ./src 是因为该文件虽然路径是(相对 project) /webpack/webpack.base.js
        但是 node 执行的时候还是执行的是 /webpack.env.config.js, 因此路径应该相对为 webpack.env.config.js 所在的文件的相对路径, 即根目录
        这个跟 __dirname 这个全局变量返回的是当前文件目录, 即 webpack.base.js 所在的目录, 即/webpack 略有不同.
    */
    // prev: './src/vue/env.config.js', './src/react/env.config.js', './src/react/env.config.js'
    prev[curr.slice(6, -3)] = [curr];
    return prev;
}, {});

module.exports = {
    entry: js, // tips: js 为一个对象, 键可以带/, 会按目录生成
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: ""
        // TODO: publicPath 路径暂时不填
    },
    resolve: {
        extensions: ['.js', '.vue', 'jsx', '.json'], // 可以使 require 模块的时候不用写中的后缀如 require('a.js') 只需要写 require('a');
        // modules: [ // 告诉 webpack 解析模块应该搜索的目录, 默认为 node_module, 此配置 src 目录优先于 node_module 搜索
        //     // resolve('src'),
        //     'node_modules',
        // ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
        }
    },
    plugins: [],
    externals: { // 不把import 的以下键中的包打包到 bundle 中, 而是从外部加载(如 cdn 等), 剥离常用的 library
        ejs: 'ejs',
        jquery: 'jQuery'
    },
    module: { // 定义处理各种 ext 文件的 loader 和规则
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: loaderConfig.vueLoader
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: loaderConfig.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: loaderConfig.assetsPath('font/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};



















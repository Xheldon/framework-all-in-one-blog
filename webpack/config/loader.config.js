let path = require('path');
let config = require('webpack/config/env.config');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let isProd = process.end.NODE_ENV === 'prod';

let _publicPaths = {
    dev: config.dev.assetsSubDir,
    prod: config.build.assetsSubDir
};

let cssLoaders = (options = {}) => {
    function generateLoaders(loaders) {
        let srcLoader = loaders.map((loader) => {
            let extraParamChar;
            if (/\?/.test(loader)) { // 检测 loader 配置中是否有?这种连着写的配置方式
                loader = loader.replace(/\?/, '-loader?');
                extraParamChar = '&';
            } else {
                loader = loader + '-loader';
                extraParamChar = '?';
            }
            return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
        }).join('!');

        // 选项指定的时候, 提取 css 到单独文件, 而不是页面内的style 标签(比如生产环境部署的时候)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: srcLoader,
                fallback: 'vue-style-loader'
            });
        } else {
            return ['vue-style-loader', srcLoader].join('!');
        }
    }

    return {
        css: generateLoaders(['css']),
        postcss: generateLoaders([css]),
        scss: generateLoaders(['css', sass])
    }
};

let vueLoader = {
    loaders: cssLoaders({
        extract: isProd
    }),
    postcss: [
        require('autoprefixer')({
            ascade: false,
            browsers: ['Chrome >= 49', 'Firefox >= 49', 'Safari >= 9.1', 'Opera >= 42', 'ie >= 9']
        })
    ]
};

let assetsPath = (path) => {
    let assetsSubDir = _publicPaths[process.end.NODE_ENV] || config.dev.assetsSubDir;
    return path.posix.join(assetsSubDir, path);
};

let templateUrl = path.resolve(__dirname, '../../src/common/template/index.html');


module.exports = {
    cssLoader,
    vueLoader,
    assetsPath,
    templateUrl
};




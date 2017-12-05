webpackJsonp([9],{79:function(s,e){s.exports='<h1 id="vue-webpack-">Vue + Webpack 组件式开发(练习环境)</h1>\n<h3 id="-vue-framework-">分类: [Vue,Framework]</h3>\n<hr>\n<h2 id="-">前言</h2>\n<p>研究了下别人的 <code>vue</code> 多页面框架, 都是直接复制 <code>package.json</code> 文件,然后在本地 <code>npm install</code> 一下即可, 或者使用官网 <code>vue-cli</code> 工具生成一个项目, 觉得这样虽然看的懂, 但是记不住, 因此有必要从零开始搭建一个使用 <code>.vue</code> 作为组件的项目练习一下, 因此有了这个项目.</p>\n<p>既然使用了 <code>.vue</code> 组件, 就不能像之前使用 <code>jQuery</code> 一样把 <code>vue.js</code> 引入页面中, 而是使用配套的 <code>webpack</code> + <code>babel</code> + 各种 <code>loader</code> 工具编译 <code>.vue</code> 文件, 再打包生成 <code>html</code>.</p>\n<h2 id="fbi-warning">FBI warning</h2>\n<p><em><code>切记</code></em> : 因为是最基本的初体验, 所以一些正式开发中必装的 <code>loader</code> 和 <code>plugin</code> 就没有装, 因为只是想按照官方教程手动敲出来加深印象, 特别是进阶教程中比较麻烦的父子组件传参, 作用域插槽, 递归组件以及 <code>slot</code> 等. 因此这个配置不可能作为正式开发的参照配置, 只可作为了解 <code>vue</code> 组件工作原理的练手项目.</p>\n<h2 id="-">配置说明</h2>\n<p>以下配置的详细说明在后面可以找到, 不想看的话直接复制下面的 <code>package.json</code> 即可, 但是为了加深印象还是建议手动敲一遍. </p>\n<p>废话不多说, 开始.</p>\n<p>首先, 既然是 <code>webpack+vue</code>, 那相应的安装包少不了, 这里我们使用 <code>vue@2.2.4</code> 和 <code>webpack@1.12.2</code>: </p>\n<pre><code class="hljs javascript">npm install webpack@<span class="hljs-number">1.12</span><span class="hljs-number">.2</span> vue@<span class="hljs-number">2.2</span><span class="hljs-number">.4</span> --save-dev\n</code></pre>\n<p>然后是 <code>babel</code> 和相应的 <code>loader</code>, 这里我们使用 <code>es2015</code> 这个配置, 用最新的就好:</p>\n<pre><code class="hljs javascript">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel </span><span class="hljs-keyword">bebel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-es2015 </span>--save-dev\n</code></pre>\n<p>然后是 <code>webpack</code> 的必装 <code>loader</code>, <code>css-loader</code> 用来处理 <code>css</code> 中 <code>url()</code> 的资源, <code>style-loader</code> 用来将 <code>require</code> 的 <code>css</code> 抽出放到 <code>style</code> 标签中, 然后加到页面 <code>head</code> 部分. <code>html-webpack-plugin</code> 用来将入口文件 <code>js</code> 变成 <code>html</code>, 入口文件中的各种资源由各种 <code>loader</code> 处理后插入到它生成的 <code>html</code> 中, <code>extract-text-webpack-plugin</code> 用来将被 <code>js</code> 通过 <code>style</code> 标签 <code>append</code> 到 <code>head</code> 中的样式抽出到单独的 <code>.css</code> 文件中:</p>\n<pre><code class="hljs javascript">npm <span class="hljs-keyword">install</span> css-loader <span class="hljs-keyword">style</span>-loader html-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-keyword">extract</span>-<span class="hljs-built_in">text</span>-webpack-<span class="hljs-keyword">plugin</span>@<span class="hljs-number">1.0</span><span class="hljs-number">.1</span> <span class="hljs-comment">--save-dev</span>\n</code></pre>\n<p>然后是 <code>vue</code> 相关的东西, 因为一个 <code>.vue</code> 里面有至少有三个标签 <code>template/style/script</code>, 因此需要三个 <code>loader</code> 来处理, 再加上一个总的 <code>vue-loader</code>, 就是四个 <code>loader</code> ,这里: </p>\n<p><code>vue-html-loader</code> 是 <code>webpack</code> 的官方 <code>html-loader</code> 的 <code>fork</code>, 作者放到这里只是为了能在 <code>webpack.config.js</code> 中的 <code>module.export.vue</code> 对象上使用 <code>html</code> 选项来单独配置 <code>vue</code> 的 相关 <code>html</code>(本项目安装 <code>vue-loader</code> 即可, 这里只是顺带安装说明一下);</p>\n<p><code>vue-style-loader</code> 用来处理 <code>.vue</code> 文件中 <code>style</code> 中的内容, 是 <code>webpack</code> 的官方 <code>style-loader</code> 的 <code>fork</code>(本项目安装 <code>vue-loader</code> 即可, 这里只是顺带安装说明一下);</p>\n<p><code>vue-template-compiler</code> 用来处理 <code>.vue</code> 文件中 <code>template</code> 中的内容, 除非是用它编译后的文件做其他事情才需要单独配置(即写 <code>build tools</code>, 否则这个不是必须的, 因为 <code>vue-loader</code> 已经默认使用它了)(本项目安装 vue-loader 即可, 这里只是顺带安装说明一下);</p>\n<p><code>vue-loader</code> 用来处理 <code>.vue</code> 后缀的内容, 在遇到相关的内容时, 会调用上述三个相关的 <code>loader</code> 来处理.</p>\n<pre><code class="hljs javascript">npm <span class="hljs-keyword">install</span> vue-html-loader vue-loader vue-<span class="hljs-keyword">style</span>-loader vue-<span class="hljs-keyword">template</span>-compiler <span class="hljs-comment">--save-dev</span>\n</code></pre>\n<p>最后就是开发用的 <code>webpack-dev-server</code>, 这里我们安装 <code>1.12.1</code> 版本:</p>\n<pre><code class="hljs javascript">npm install webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>\n</code></pre>\n<p>下面是总的 <code>package.json</code> 配置文件, 而具体的每个 <code>package.json</code> 字段的含义, 可以查看<a href="http://json.is/" target="_blank">这个网站</a>,</p>\n<pre><code class="hljs javascript">{\n  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"vue-components"</span>,\n  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.0.1"</span>,\n  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"vue components test"</span>,\n  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"app/app.js"</span>,\n  <span class="hljs-attr">"scripts"</span>: {\n    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --hot"</span>,\n    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack"</span>\n  },\n  <span class="hljs-attr">"keywords"</span>: [\n    <span class="hljs-string">"vue"</span>,\n    <span class="hljs-string">"components"</span>\n  ],\n  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"xheldon"</span>,\n  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"MIT"</span>,\n  <span class="hljs-attr">"dependencies"</span>: {\n    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.2.4"</span>\n  },\n  <span class="hljs-attr">"devDependencies"</span>: {\n    <span class="hljs-attr">"babel"</span>: <span class="hljs-string">"^6.23.0"</span>,\n    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.24.0"</span>,\n    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.4.1"</span>,\n    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.24.0"</span>,\n    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.27.3"</span>,\n    <span class="hljs-attr">"extract-text-webpack-plugin"</span>: <span class="hljs-string">"^1.0.1"</span>,\n    <span class="hljs-attr">"html-webpack-plugin"</span>: <span class="hljs-string">"^2.28.0"</span>,\n    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.16.0"</span>,\n    <span class="hljs-attr">"vue-html-loader"</span>: <span class="hljs-string">"^1.2.4"</span>,\n    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^11.3.1"</span>,\n    <span class="hljs-attr">"vue-style-loader"</span>: <span class="hljs-string">"^2.0.4"</span>,\n    <span class="hljs-attr">"vue-template-compiler"</span>: <span class="hljs-string">"^2.2.4"</span>,\n    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.12.2"</span>,\n    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.12.1"</span>\n  }\n}\n</code></pre>\n<h2 id="-">项目说明</h2>\n<p>Ok, 依赖安装完了, 接下来看下 <code>webpack</code> 配置, 因为是想尽快测试 <code>vue</code> 官方文档的组件部分, 所以一切从简了:</p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'path\'</span>);\n<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'webpack\'</span>);\n<span class="hljs-keyword">var</span> HtmlwebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'html-webpack-plugin\'</span>); \n\n<span class="hljs-comment">// 常用配置,项目较小不抽出了</span>\n<span class="hljs-keyword">var</span> ROOT_PATH = path.resolve(__dirname);<span class="hljs-comment">//根路径</span>\n<span class="hljs-keyword">var</span> APP_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">\'app\'</span>);<span class="hljs-comment">//开发路径</span>\n<span class="hljs-keyword">var</span> BUILD_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">\'build\'</span>);<span class="hljs-comment">//输出路径</span>\n<span class="hljs-keyword">var</span>  ExtractTextPlugin= <span class="hljs-built_in">require</span>(<span class="hljs-string">\'extract-text-webpack-plugin\'</span>);\n\n<span class="hljs-built_in">module</span>.exports = {\n  entry: {\n    app: path.resolve(APP_PATH, <span class="hljs-string">\'app.js\'</span>)\n  },\n  output: {\n    path: BUILD_PATH,\n    filename: <span class="hljs-string">\'bundle.js\'</span><span class="hljs-comment">//因为只有一个入口文件, 因此直接写死了</span>\n  },\n  resolve: {\n    alias: {\n      <span class="hljs-comment">//注意, 这里导入的是/node_module/vue/dist/vue.js, 跟 vue-router.js 的不同</span>\n      vue: <span class="hljs-string">\'vue/dist/vue.js\'</span>\n    }\n  },\n  <span class="hljs-comment">//开启 dev source map</span>\n  devtool: <span class="hljs-string">\'eval-source-map\'</span>,\n  <span class="hljs-comment">//开启 dev server</span>\n  devServer: {\n    historyApiFallback: <span class="hljs-literal">true</span>,\n    hot: <span class="hljs-literal">true</span>,<span class="hljs-comment">//HMR</span>\n    inline: <span class="hljs-literal">true</span>,\n    progress: <span class="hljs-literal">true</span>\n  },\n  <span class="hljs-keyword">module</span>: {\n    loaders:[\n      {\n        test: <span class="hljs-regexp">/\\.vue$/</span>,\n        loader: <span class="hljs-string">\'vue\'</span>\n      },\n      {\n        test: <span class="hljs-regexp">/\\.css$/</span>,\n        loader: ExtractTextPlugin.extract(<span class="hljs-string">\'css-loader\'</span>)\n      },\n      {\n        test: <span class="hljs-regexp">/\\.js$/</span>,\n        loader: <span class="hljs-string">\'babel\'</span>,\n        include: ROOT_PATH,\n        exclude: <span class="hljs-regexp">/node_modules/</span>\n      },\n      {\n        test: <span class="hljs-regexp">/\\.html$/</span>,\n        loader: <span class="hljs-string">\'vue-html\'</span>\n      }\n    ]\n  },\n  vue:{\n    loaders: {\n      css: ExtractTextPlugin.extract(<span class="hljs-string">\'css-loader\'</span>)    }\n  },\n  plugins:[\n    <span class="hljs-keyword">new</span> HtmlwebpackPlugin({\n      title: <span class="hljs-string">\'Vue component test\'</span>,\n      filename: <span class="hljs-string">\'this_is_final_filename_address_you_visit_in_browser.html\'</span>,<span class="hljs-comment">//生成的最终文件名</span>\n      template: <span class="hljs-string">\'app/this_is_main_page_which_you_put_components_into.html\'</span>,<span class="hljs-comment">//放置组件的地方, 一般是一个 body 下一个孤零零的 app 标签即可.</span>\n      inject: <span class="hljs-literal">true</span>\n    })\n  ]\n};\n</code></pre>\n<p>关于这个配置, 有点东西需要说一下.</p>\n<p>从上往下, 首先是 <code>alias</code> , 使用过 <a href="https://github.com/vuejs/vue-router/" target="_blank"> <code>vue-router</code> </a> 的人可能不需要这个配置, 但是使用 <code>.vue</code> 组件的项目必须这个配置,因为需要指定使用的 <code>vue</code> 的 <code>js</code> 类型, 看下本项目下 <code>node_module/vue/dist/</code> 文件夹下的文件, 有 <code>vue.js</code> 和 <code>vue.common.js</code> 两种, 其中 <code>vue</code> 编译 <code>template</code> 组件的时候是需要一个 <code>compiler.js</code> 的, 目的是把 <code>template</code> 中的 <code>html</code> 内容编译成 <code>render</code> 函数:</p>\n<p>编译前:</p>\n<pre><code class="hljs html"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>\n  Hello </span><span class="hljs-template-variable">{{who}}</span><span class="xml">\n<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">\n  <span class="hljs-keyword">new</span> Vue({\n    el: <span class="hljs-string">\'#app\'</span>,\n    data: {who: <span class="hljs-string">\'Vue\'</span>}\n  })\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>\n</code></pre>\n<p>编译后:</p>\n<pre><code class="hljs javascript"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">\n  <span class="hljs-keyword">new</span> Vue({\n    el: <span class="hljs-string">\'#app\'</span>,\n    render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{\n      <span class="hljs-keyword">with</span> (<span class="hljs-keyword">this</span>) {\n        __h__(<span class="hljs-string">\'div\'</span>,\n          {staticAttrs:{<span class="hljs-string">"id"</span>:<span class="hljs-string">"app"</span>}},\n          [(<span class="hljs-string">"\\n  Hello "</span>+__toString__(who)+<span class="hljs-string">"\\n"</span>)],\n          <span class="hljs-string">\'\'</span>\n        )\n      }\n    },\n    data: {who: <span class="hljs-string">\'Vue\'</span>}\n  })\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n</code></pre>\n<p>而 <code>vue</code> 使用 <code>compiler</code> 编译 <code>template</code> 后的 <code>js</code> 在运行的时候发现有 <code>render</code> 函数的话就直接执行 <code>render</code>, <code>template</code> 字段下的内容会被忽略. 而执行编译后的 <code>render</code> 的任务,是由 <code>vue.common.js</code> 完成的.因此:</p>\n<pre><code class="hljs javascript">vue<span class="hljs-selector-class">.js</span> = vue<span class="hljs-selector-class">.common</span><span class="hljs-selector-class">.js</span> + compiler.js\n</code></pre>\n<p>所以, 如果你使用的是 <code>vue-router</code>, 它的 <code>package.json</code> 中的 <code>main</code> 字段是指向 <code>node_module/dist/vue.common.js</code> 的, 如果你直接复制这个到你的项目下, 运行的时候会提示你类似于 <code>vue.common.js</code> 的 <code>runtime</code> 错误之类的信息.</p>\n<p>其次需要说的是这个 <code>css-loader</code> 和 <code>style-loader</code> 以及 <code>vue-style-loader</code>, 有了 <code>style-loader</code> 为何还要个 <code>vue-style-loader</code> 呢? 看了下 <code>vue-style-loader</code> 的说明, 明白了其仅仅是一个 <code>style-loader</code> 的 <code>fork</code>, 但是为了单独处理 <code>.vue</code> 文件, 同时为了让用户配置 <code>vue</code> 更清晰, 将其加到了 <code>webpack@1.x</code> 的配置文件中的 <code>vue</code> 字段中. 可以通过将 <code>extract-text-webpack-plugin</code> 插件的配置从:</p>\n<pre><code class="hljs javascript"><span class="hljs-selector-tag">vue</span>:{\n  <span class="hljs-attribute">loaders</span>: {\n    css: ExtractTextPlugin.<span class="hljs-built_in">extract</span>(<span class="hljs-string">\'vue-style-loader\'</span>,<span class="hljs-string">\'css-loader\'</span>)\n  }\n}\n</code></pre>\n<p>改成:</p>\n<pre><code class="hljs javascript"><span class="hljs-selector-tag">vue</span>:{\n  <span class="hljs-attribute">loaders</span>: {\n    css: ExtractTextPlugin.<span class="hljs-built_in">extract</span>(<span class="hljs-string">\'style-loader\'</span>,<span class="hljs-string">\'css-loader\'</span>)\n  }\n}\n</code></pre>\n<p>发现编译后的结果一样证实.</p>\n<p>而默认情况下, <code>vue-loader</code> 是自动使用 <code>vue-style-loader</code> 的, 所以如果你不在 <code>.vue</code> 文件中 <code>@import</code> 任何 <code>css</code> , 那么你不需要手动把 <code>vue-loader-style</code> 放到 <code>vue.loaders</code> 字段中. <code>vue-loader</code> 会自动处理 <code>.vue</code> 文件中的 <code>style</code> 标签中的内容, 并将其放到 <code>style</code> 标签中插入页面. 而如果你需要在 <code>.vue</code> 文件中的 <code>style</code> 标签内 <code>@import css</code> 文件, 那么你就需要在 <code>module.exports.vue</code> 单独配置.可以通过把 <code>vue</code> 字段的 <code>vue-style-loader</code> 去掉来测试:</p>\n<pre><code class="hljs javascript"><span class="hljs-string">module:</span> {\n<span class="hljs-symbol">  loaders:</span>[\n    {\n<span class="hljs-symbol">      test:</span> <span class="hljs-regexp">/\\.vue$/</span>,\n<span class="hljs-symbol">      loader:</span> <span class="hljs-string">\'vue\'</span>\n    }\n  ]\n},\n<span class="hljs-string">vue:</span>{\n  <span class="hljs-comment">// loaders: {</span>\n  <span class="hljs-comment">//   css: \'vue-style-loader!css-loader\'</span>\n  <span class="hljs-comment">// }</span>\n}\n</code></pre>\n<p>此外, 入口文件 <code>js</code> 中的 <code>require(&#39;xxx.css&#39;)</code> 是默认的 <code>module.exports.module.loader</code> 处理的, 这点可以通过在默认 <code>loader</code> 中使用 <code>extract</code> 插件, 而在 <code>module.exports.vue</code> 中不使用 <code>extract</code> 插件证实, 因为从结果可以发现, 入口文件中的 <code>css</code> 被提取了, 但是 <code>.vue</code> 中的 <code>@import</code> 来的 <code>css</code> 没有被提取.</p>\n<p>而如果你需要 将入口文件中 <code>require</code> 来的 <code>css</code> 文件单独提取出来, 那么你就需要在 <code>module.exports.module.loader</code> 设置 <code>extract-text-webpack-plugin</code> 了. </p>\n<p>注意: <code>vue-style-loader</code> 放在 <code>module.exports.vue.loaders</code> 字段中是为了能提取出 <code>.vue</code> 文件中的 <code>style</code> 标签内容到一个单独的 <code>.css</code> 文件 <code>link</code> 在页面中, 把 <code>style-loader</code> 和 <code>css-loader</code> 放在默认的 <code>module.exports.module.loaders</code> 中, 对处理 <code>vue</code> 中的 <code>style</code> 标签内容无效------------起码在 <code>Vue 1.x</code> 版本和 <code>webpack 1.x</code> 版本无效, <code>webpack 2.x</code> 版本移除了第三方的字段, 限制在 <code>module.export</code> 中随意添加字段.</p>\n<p>最后, <code>css-loader</code> 和 <code>style-loader</code> 总是写在一起的, 因为 <code>css-loader</code> 的作用是 <code>resolve css</code> 文件中的 <code>@import</code> 和 属性值 <code>url()</code> 中的依赖关系, 单独写其实是没什么用的. <code>style-loader</code> 才是处理 <code>css</code>, 并将其打包到 <code>js</code> 中, 最后以 <code>&lt;style&gt;</code> 标签的形式插入到 <code>head</code> (插入位置可配置)中的 <code>loader</code>.</p>\n<p>最后讲讲 <code>extract-text-webpack-plugin</code>, 其接受三个参数:</p>\n<p>第一个参数是可选参数, 传入一个 <code>loader</code>, 当 <code>css</code> 样式没有被抽取的时候可以使用该 <code>loader</code>.\n第二个参数则是用于编译解析的 <code>css</code> 文件 <code>loader</code>, 很明显这个是必须传入的, 就像上述例子的 <code>css-loader</code>.\n第三个参数是一些额外的备选项, 貌似目前只有传入 <code>publicPath</code>, 用于当前 <code>loader</code> 的路径.</p>\n<p>那什么时候需要传入第一个参数呢,那就得明白什么时候样式不会被抽取出来.\n了解过 <code>code splitting</code> 的同学便会知道,我们有些代码在加载页面的时候不会被使用时, 使用 <code>code splitting</code>, 可以实现将这部分不会使用的代码分离出去, 独立成一个单独的文件,实现按需加载.</p>\n<p>那么如果在这些分离出去的代码中如果有使用 <code>require</code> 引入样式文件, 那么使用 <code>ExtractTextPlugin</code> 这部分样式代码是不会被抽取出来的.\n这部分不会抽取出来的代码, 可以使用 <code>loader</code> 做一些处理, 这就是 <code>ExtractTextPlugin.extract</code> 第一个参数的作用.</p>\n<p>OK, 聊完了配置文件, 再说说这个项目是怎么工作的.</p>\n<p>一图胜千言, 上图, 首先是代码界面: </p>\n<p><img src="http://img.xheldon.com/img/vue-test.png" alt="项目结构" title="项目结构"></p>\n<p>(若图片显示较小请在右键在新标签页单独查看)</p>\n<p>看箭头所示就明白啦, 首先一个页面是至少有一个组件的, 这个我直接就一个页面一个组件来写了, 没有 <code>import</code> 其他的组件.</p>\n<p>因此, 一个页面下是至少三个文件的, <code>.vue</code> 文件, <code>.js</code> 入口文件, 和 <code>.html</code>, 组件插入的文件.</p>\n<p><code>html</code> 中写一个组件 <code>app</code> 的名字, 入口文件实例化一个 <code>vue</code>, 然后使用 <code>app</code> 这个组件, 同时这个叫做 <code>app</code> 组件的模板来自 <code>index.vue</code>, 组件对应的 <code>css</code> 和 <code>js</code> 以及 <code>mvvm</code> 的特色:数据绑定也写在 <code>index.vue</code> 里面.</p>\n<p>有同学会疑惑, 入口文件 <code>js</code> 是怎么找到同目录的 <code>html</code> 文件的呢? 其实这个在 <code>webpack.config.js</code> 配置文件就已经写好了: </p>\n<pre><code class="hljs javascript"><span class="hljs-attribute">plugins</span>:[\n  new HtmlwebpackPlugin({\n    <span class="hljs-attribute">title</span>: <span class="hljs-string">\'Vue component test\'</span>,\n    <span class="hljs-attribute">filename</span>: <span class="hljs-string">\'this_is_final_filename_address_you_visit_in_browser.html\'</span>,<span class="hljs-comment">//生成的最终文件名</span>\n    <span class="hljs-attribute">template</span>: <span class="hljs-string">\'app/this_is_main_page_which_you_put_components_into.html\'</span>,<span class="hljs-comment">//放置组件的地方, 一般是一个 body 下一个孤零零的 app 标签即可.</span>\n    <span class="hljs-attribute">inject</span>: true\n  })\n]\n</code></pre>\n<p>这个 <code>html</code> 生成的插件告诉 <code>js</code> 入口文件, 所需要的模板来自 <code>app</code> 下的 <code>xxx.html</code>, 而最后打包的 <code>bundle.js</code> 也是 <code>inject</code> 这个里面, 再生成最终的页面.</p>\n<p>还有同学会问, 在入口 <code>js</code> 文件中, <code>vue</code> 实例化的时候用到的 <code>components.App</code> 到底是在编译过程就找到了 <code>this_is_main_page_which_you_put_components_into.html</code> 文件中的 <code>&lt;app&gt;</code> 组件引用, 还是在 <code>runtime</code> 的时候, 从最终打包的 <code>bundle.js</code> 中运行, 然后寻找 <code>this_is_final_filename_address_you_visit_in_browser.html</code> 页面中的 <code>&lt;app&gt;</code> 标签呢? 答案是后者, 因为刚才说的 <code>HtmlwebpackPlugin</code> 插件只负责生成 <code>html</code> 和注入打包后的 <code>bundle.js</code>, 而 <code>vue</code> 被打包进了 <code>bundle.js</code> 之后实例化 <code>vue</code> 时候才会寻找 <code>&lt;app&gt;</code> 标签.</p>\n<p>这么一看, 和直接在 <code>script</code> 标签中引用 <code>vue.js</code> 文件再渲染的效果是一样的, 只是 <code>webpack</code> 这种开发方式帮我们分离了组件, 使开发过程的代码/组件结构更清晰, 而且直接引用 <code>vue.js</code> 是前端 <code>runtime render</code>, 一个是 <code>compiler render</code> 之后直接执行, 后者效率更高.</p>\n<p>之后是效果页面:</p>\n<p><img src="http://img.xheldon.com/img/page-detail.png" alt="页面效果图" title="页面效果图">\n(若图片显示较小请在右键在新标签页单独查看)</p>\n<p>看图就明白什么意思啦.</p>\n<p>还有不明白的请看文档.</p>\n<p>暂时聊这么多, 关于 <code>vue</code> 和 <code>webpack</code> 的 <code>注意事项/细节/设计思想</code> 还有很多要说的, 回聊~</p>\n'}});
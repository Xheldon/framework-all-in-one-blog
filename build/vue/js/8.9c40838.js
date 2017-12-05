webpackJsonp([8],{45:function(s,e){s.exports='<h1 id="webpack-">Webpack 异步按需加载</h1>\n<h3 id="-webpack-framework-">分类: [Webpack,Framework]</h3>\n<hr>\n<p>webpack 想要实现异步加载, 即先加载主要模块, 用到某个模块或者多个模块(也即打包后的 chunk )的时候再发送请求加载.</p>\n<p>这样做的目的当然是加快页面的初次加载速度, 但不可避免的会发送额外的请求, 这两个本身就是个鱼与熊掌不可兼得的事情, 这里说一下异步加载的细节.</p>\n<p>实现主要是靠 <code>require.ensure([], callback)</code> 这个东西, 老实说我会注意到这个东西是因为在 <code>webpack.config.js</code> 的 <code>output</code> 字段有一个字段叫做 <code>chunkFilename</code>, 我这个打破沙锅的毛病就不得不想看看这个和 <code>filename</code> 字段有什么区别, 搜索了一下发现 <code>filename</code> (假设是 <code>bundle.js</code>) 是把页面需要的所有 <code>js</code> 打包, 最终生成的总的 <code>js</code> (当然多页面的时候可以提取公共模块, 这个不是本次的重点). 而 <code>chunkFilename</code> 是那些非入口点(<code>entry</code> 中列举的字段)的 <code>chunk</code> 文件打包生成的文件, 主要使用在按需异步加载模块的时候.</p>\n<p>这些文件没有打包在 <code>bundle.js</code> 中, 而且只被部分(非全部的)模块依赖, 同时又需要异步加载, 因此就会通过使用 <code>require.ensure</code> 被打包到额外的 <code>js</code> 中, 而这些 <code>js</code>, 仍然是通过最终的 <code>bundle.js</code> 创建 <code>script</code> 标签, 然后被 <code>append</code> 到页面中的:</p>\n<pre><code class="hljs javascript"><span class="hljs-comment">// This file contains only the entry chunk.</span>\n<span class="hljs-comment">// The chunk loading function for additional chunks</span>\n__webpack_require__.e = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireEnsure</span>(<span class="hljs-params">chunkId, callback</span>) </span>{\n    <span class="hljs-comment">// "0" is the signal for "already loaded"</span>\n    <span class="hljs-keyword">if</span>(installedChunks[chunkId] === <span class="hljs-number">0</span>)\n        <span class="hljs-keyword">return</span> callback.call(<span class="hljs-literal">null</span>, __webpack_require__);\n\n    <span class="hljs-comment">// an array means "currently loading".</span>\n    <span class="hljs-keyword">if</span>(installedChunks[chunkId] !== <span class="hljs-literal">undefined</span>) {\n        installedChunks[chunkId].push(callback);\n    } <span class="hljs-keyword">else</span> {\n        <span class="hljs-comment">// start chunk loading</span>\n        installedChunks[chunkId] = [callback];\n        <span class="hljs-keyword">var</span> head = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">\'head\'</span>)[<span class="hljs-number">0</span>];\n        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">\'script\'</span>);\n        script.type = <span class="hljs-string">\'text/javascript\'</span>;\n        script.charset = <span class="hljs-string">\'utf-8\'</span>;\n        script.async = <span class="hljs-literal">true</span>;\n\n        script.src = __webpack_require__.p + <span class="hljs-string">""</span> + ({}[chunkId]||chunkId) + <span class="hljs-string">".js"</span>;\n        head.appendChild(script);\n    }\n};\n</code></pre>\n<p>OK, 这些理解起来都很容易, 但是查看<a href="http://webpack.github.io/docs/code-splitting.html#defining-a-split-point" target="_blank">官方文档</a>的时候, 发现了几个需要注意的细节.</p>\n<h2 id="-commonjs-amd-require-"><em><code>CommonJS</code></em> 和 <em><code>AMD</code></em> <code>require</code> 时候的区别</h2>\n<p><code>CommonJS</code> 是使用 <code>require.ensure([&#39;&#39;], callback)</code> 来处理异步加载模块的, <code>AMD</code> 是和一般的 <code>AMD</code> 模块一样, 使用 <code>require</code> 一个数组依赖的形式处理的 <code>require([&#39;&#39;], callback)</code></p>\n<p>但是 <code>CommonJS</code> 加载数组中模块的时候, 是只加载不执行, 除非是在 <code>callback</code> 中, 又 <code>require</code> 了一遍才执行: </p>\n<pre><code class="hljs javascript"><span class="hljs-built_in">require</span>([<span class="hljs-string">\'./other/ensure.js\'</span>,<span class="hljs-string">\'./other/ensure2.js\'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">var</span> ensure = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'./other/ensure.js\'</span>);\n    <span class="hljs-keyword">var</span> ensure2 = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'./other/ensure2.js\'</span>);\n\n    module1();\n    module2();\n}, chunkFilename);\n</code></pre>\n<blockquote>\n<p>The require.ensure method ensures that every dependency in dependencies can be synchronously required when calling the callback. An implementation of the require function is sent as a parameter to the callback.</p>\n</blockquote>\n<p>而且这个 <code>callback</code> 的参数, 是一个实现了 <code>require</code> 接口的函数(没错的话应该只是一个 <code>require</code> 函数的引用);</p>\n<p>这个 <code>chunkFilename</code> 会被 <code>output</code> 中的 <code>chunkFilename</code> 设置覆盖.</p>\n<p>而 <code>AMD</code> 因为是正常一贯的依赖前置, 所以其会在 <code>require</code> 的时候就执行模块: </p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">require</span>([<span class="hljs-string">\'./other/ensure.js\'</span>,<span class="hljs-string">\'./other/ensure2.js\'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-keyword">ensure</span>, ensure2)</span><span class="hljs-comment">{\n    ensure();\n    ensure2();\n}</span>);</span>\n</code></pre>\n<p>OK, <code>AMD</code> 的例子不熟, 下面以 <code>CommonJS</code> 为例说明一些细节.</p>\n<p>首先, 如果给 <code>require.ensure</code> 传递一个 <code>callback</code> , 则在回调函数中 <code>require</code> 来的模块也会被全部打包到最终异步加载的文件中.</p>\n<h2 id="-chunk-"><code>chunk</code> 打包优化策略</h2>\n<ol>\n<li>如果两个 <code>chunk</code> 包含相同的模块, 那么他们将合并成一个.</li>\n<li>如果一个模块在一个 <code>chunk</code> 的所有父级 <code>chunk</code> 都可用, 那么该模块将会在该 <code>chunk</code> 中被移除.</li>\n<li>如果一个 <code>chunk</code> 包含了另一个 <code>chunk</code> 的所有模块, 那么最终将打包包含更多 <code>module</code> 的这个 <code>chunk</code>, 这个规则对一个 <code>chunk</code> 包含其他 多个 <code>chunk</code> 的所有 <code>module</code> 同样适用.</li>\n</ol>\n<p>其中第二条不好理解, 其实它所说的情况是, 在一个入口文件 <code>A.js</code> 中包含 <code>b</code> 模块, 而使用 <code>require.ensure</code> 打包生成了一个 <code>chunk.js</code> 文件中也包含这个 <code>b</code> 模块, 因为 <code>require.ensure</code> 是在 <code>A.js</code> 文件中调用的, 因此 <code>A.js</code> 算是这个 <code>chunk.js</code> 的父级 <code>chunk</code>, 那么最终打包生成的 <code>chunk.js</code> 中包含的 <code>b</code> 模块 内容将被移除. 而 <code>在所有父级 chunk 都可用</code> 指的是第一条所说的情况: 几个 <code>chunk</code> 包含相同的 <code>module</code>, 那么只会生成一个最终的 <code>bundle.js</code>, 但导致的可能是这个 <code>chunk</code> 存在多个父级 <code>chunk</code> (即 <code>entry</code> 对应的 <code>chunk</code> 文件).</p>\n<p>验证一下: </p>\n<p>入口文件 <code>app.js</code> 的代码:</p>\n<pre><code class="hljs javascript">\n<span class="hljs-built_in">require</span>(<span class="hljs-string">\'../other/if_be_remove.js\'</span>)();\n<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">\'../other/ensure.js\'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-built_in">require</span>(<span class="hljs-string">\'../other/ensure.js\'</span>)();\n}, <span class="hljs-string">\'love\'</span>);\n</code></pre>\n<p>另一个入口文件 <code>app2.js</code> 的代码:</p>\n<pre><code class="hljs javascript">\n<span class="hljs-built_in">require</span>(<span class="hljs-string">\'../other/if_be_remove.js\'</span>)();\n<span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">\'../other/ensure2.js\'</span>], <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-built_in">require</span>(<span class="hljs-string">\'../other/ensure2.js\'</span>)();\n}, <span class="hljs-string">\'hate\'</span>);\n</code></pre>\n<p><code>ensure.js</code> 的代码:</p>\n<pre><code class="hljs javascript">\n<span class="hljs-built_in">require</span>(<span class="hljs-string">\'./if_be_remove.js\'</span>)();\n<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'i\\\'m be ensure!\'</span>);    \n}\n</code></pre>\n<p><code>ensure2.js</code> 的代码:</p>\n<pre><code class="hljs javascript">\n<span class="hljs-built_in">require</span>(<span class="hljs-string">\'./if_be_remove.js\'</span>)();\n<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'i\\\'m be ensure2!\'</span>);    \n}\n</code></pre>\n<p>最后, 在子 <code>chunk</code> 和父级 <code>chunk</code> 都存在的 <code>if_be_remove.js</code> 的代码:</p>\n<pre><code class="hljs javascript">\n<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'im be removed!\'</span>);    \n}\n</code></pre>\n<p>看下 <code>Chrome</code> 浏览器控制台中 <code>Network</code> 中加载的 <code>js</code> 的内容(这里使用 <code>[id].[name].js</code> 的命名方式)</p>\n<p><code>app.js</code> 页面:</p>\n<p><img src="http://img.xheldon.com/img/webpack-async-1.png" alt="webpack-async" title="webpack-async"></p>\n<p><code>app2.js</code> 页面</p>\n<p><img src="http://img.xheldon.com/img/webpack-async-1.png" alt="webpack-async" title="webpack-async"></p>\n<p>可以看到, 因为 <code>if_be_remove.js</code> 在两个 <code>chunk</code> 中, 即 <code>1-love.js</code> 和 <code>3.hate.js</code> 被引用, 而同时又被这两个 <code>chunk</code> 的父级, 也即 <code>app.js</code> 和 <code>app2.js</code> 引用, 因此在这两个 <code>chunk</code> 中, 没有出现 <code>if_be_remove.js</code> 的代码.</p>\n<h2 id="-chunk-">补充: <code>chunk</code> 概念和定义</h2>\n<p>这里再补充一下, 所谓 <code>chunk</code>, 指的是一个或者几个 <code>module</code> 组成的一个独立的 <code>js</code> 文件, 而 <code>chunk</code> 分为以下几个类型:</p>\n<ol>\n<li><code>Entry Chunks</code>: <code>Entry Chunks</code>是我们最常见的<code>Chunks</code>类型, 包含了我们自己写的业务逻辑相关代码(大多数情况下是独有的代码, 即不会被提取到公共 <code>chunks</code> 中的代码), 一般会等到 <code>Initial Chunks</code> 加载完成才会执行(或者是遇到 <code>module</code> 编号为 <code>0</code> 的 module).</li>\n<li><code>Normal Chunks</code>: <code>Normal Chunks</code> 主要指代那些应用运行时动态加载的模块,<code>Webpack</code>会为我们创建类似于 <code>JSONP</code> 这样合适的加载器来进行动态加载.</li>\n<li><code>Initial Chunks</code>: <code>Initial Chunks</code> 本质上还是 <code>Normal Chunks</code>, 不过其会在应用初始化时完成加载, 往往这个类型的<code>Chunks</code>由<code>CommonsChunkPlugin</code>生成, 这个这个里面包含了全局的模块位置信息, <code>Entry chunks</code> 中的代码执行依赖这个 <code>chunk</code>, 因此应该优先加载这个 <code>js</code>.</li>\n</ol>\n<p>在之前的举例中, 被打包成公共 <code>js</code> 供全部或者部分页面使用的的 <code>bundule.js</code> 是 <code>Initial Chunks</code>, 只在当前页面才会用到的<code>chunk</code> 如 <code>app.xxxxxx.js</code> 是 <code>Entry Chunks</code>, 通过 <code>require.ensure</code> 异步加载的 <code>chunk</code> 如 <code>3-hate</code> <code>1-love</code> 是 <code>Normal Chunks</code>.</p>\n'}});
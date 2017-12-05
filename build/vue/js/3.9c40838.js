webpackJsonp([3],{50:function(s,e){s.exports='<h1 id="-cors-">我对 CORS 的探究</h1>\n<h3 id="-javascript-">分类: [Javascript]</h3>\n<hr>\n<h2 id="-">本文由来</h2>\n<p>看网上某篇 <code>CORS</code> 资料的时候, 被一句话迷惑了: &#39;注意, 设置了 <code>withCredentials = true</code> 之后, 携带的 <code>cookie</code> 是目标域的 <code>cookie</code>&#39;, 我十分不解: 当前域假设为 <code>a.com</code> 发送 <code>xhr</code> 到 <code>b.com</code>, 当然是把源域 <code>a.com</code> 的 <code>cookie</code>, 发送给 <code>b.com</code> 来处理啊, 怎么会携带的是目标域(这里我理解为 <code>b.com</code>)的 <code>cookie</code> 呢? 因此我开始了探究(先说结论: 我查看的资料的说法确实是正确的, 携带的确实是目标域 <code>b.com</code> 的 <code>cookie</code>).</p>\n<h2 id="-1-a-com-ajax-b-com-">小目标-1: 简单请求下让 <code>a.com</code> 发送 <code>ajax</code> 到 <code>b.com</code></h2>\n<p>什么是简单请求请自行谷歌/SO. 这里注意一个基本事实, <code>cookie</code> 是跟随着 <code>域名</code> 的, 而不是跟随着 <code>IP地址</code>, 我在本地起了一个简单的能处理 <code>cookie</code> 的 <code>express</code> 服务, 同时在我的 <code>VPS</code> 上也起了一个相同的服务, 然后通过修改 <code>hosts</code> 来实现不同的域名:</p>\n<p><img src="http://img.xheldon.com/img/hosts.png" alt="hosts" title="hosts"></p>\n<p><img src="http://img.xheldon.com/img/LocalServer.png" alt="LoccalServer" title="LoccalHosts"></p>\n<p><img src="http://img.xheldon.com/img/VPSServer.png" alt="VPSServer" title="VPSServer"></p>\n<p>首先是在 <code>VPS</code> 服务器上启动一个 <code>express</code> 服务, 不设置任何东西, 只是简单的返回 <code>header</code>:</p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'express\'</span>);\n<span class="hljs-keyword">var</span> app = express();\n\napp.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>)</span>{\n  res.send(req.headers);\n});\n\napp.listen(<span class="hljs-number">9091</span>);\n</code></pre>\n<p><code>a.com</code> 的 <code>Server</code> 端基本一样, 只是加了个静态页为了发送 <code>ajax</code>:</p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'express\'</span>);\n<span class="hljs-keyword">var</span> app = express();\n<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'path\'</span>);\napp.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{\n  res.sendFile(path.join(__dirname, <span class="hljs-string">\'index.html\'</span>));\n});\napp.listen(<span class="hljs-number">9090</span>);\n</code></pre>\n<p><code>index.html</code> 内容:</p>\n<pre><code class="hljs html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>a.com<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"button"</span>&gt;</span>点我发请求, 打开控制台查看信息<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">\n  <span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">\'button\'</span>);\n\n  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhrSend</span>(<span class="hljs-params">e</span>)</span>{\n    e.preventDefault();\n    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();\n    xhr.open(<span class="hljs-string">\'GET\'</span>, <span class="hljs-string">\'http://www.b.com:9091\'</span>, <span class="hljs-literal">true</span>);\n    xhr.send();\n  }\n\n  button.addEventListener(<span class="hljs-string">\'click\'</span>, xhrSend);\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>\n</code></pre>\n<p>因为服务端没有设置 <code>Access-Control-Allow-Origin</code>, 因此报错: </p>\n<p><img src="http://img.xheldon.com/img/VPSServerError.png" alt="VPSServerError" title="VPSServerError"></p>\n<p>接下来在 <code>b.com</code> 的服务端加上允许来自 <code>a.com</code> 的 <code>ajax</code>(需要精确到端口):</p>\n<pre><code class="hljs javascript">app.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-keyword">function</span>(req, res, <span class="hljs-keyword">next</span>){\n  res.set({\n    <span class="hljs-string">\'Access-Control-Allow-Origin\'</span>: <span class="hljs-string">\'http://www.a.com:9090\'</span>\n  });\n  res.send(req.headers);\n});\n</code></pre>\n<p>再次发起请求:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError1.png" alt="VPSServerError1" title="VPSServerError1"></p>\n<p><img src="http://img.xheldon.com/img/VPSServerError1.1.png" alt="VPSServerError1.1" title="VPSServerError1.1"></p>\n<p>控制台没有报错, 而且状态码为 <code>200</code> 说明 <code>b.com</code> 已经允许来自 <code>a.com:9090</code> 的请求.</p>\n<h2 id="-2-cookie-">小目标-2: 本地服务接收前端的 <code>cookie</code></h2>\n<p>接下来我们先在本地测试下 <code>a.com</code> 后端能否获取到来自前端的 <code>cookie</code>:</p>\n<p>测试方法很简单, 随便加点 <code>cookie</code> 在 <code>js</code> 中即可:</p>\n<pre><code class="hljs javascript"><span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">\'domain=a.com;\'</span>;\n<span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">\'name=xheldon\'</span>;\n<span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">\'lover=xiaodan\'</span>;\n</code></pre>\n<p><img src="http://img.xheldon.com/img/LocalServer1.png" alt="LocalServer1" title="LocalServer1"></p>\n<p>在本地控制台的 <code>Application</code> 选项卡可以看到已经有了 <code>cookie</code>, 再看看后端输出:</p>\n<p><img src="http://img.xheldon.com/img/LocalServer2.png" alt="LocalServer2" title="LocalServer2"></p>\n<p>OK 没毛病, 访问 <code>www.a.com:9090</code> 的时候确实带上了 <code>cookie</code>, 意料之中.</p>\n<h2 id="-3-a-com-cookie-b-com-">小目标-3: 把 <code>a.com</code> 的 <code>cookie</code> 发送到 <code>b.com</code></h2>\n<p>这个时候 <code>a.com</code> 的页面是有 <code>cookie</code> 的, 因此我们再次点击按钮, 看 <code>ajax</code> 请求能否把 <code>cookie</code> 传递给 <code>b.com</code>:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError1.2.png" alt="VPSServerError1.2" title="VPSServerError1.2"></p>\n<p>和没有加 <code>cookie</code> 一样, 并没有获取到来自 <code>a.com</code> 的 <code>cookie</code>, 这当然是因为安全限制, 也是意料之中.</p>\n<h2 id="-">额外定一个小目标: 非简单请求</h2>\n<p>此处插播一个关于简单请求的测试, 在 <code>xhr</code> 中新增一个 <code>header</code>, 之后再发请求: </p>\n<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhrSend</span><span class="hljs-params">(e)</span></span>{\n  e.preventDefault();\n  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();\n  xhr.open(<span class="hljs-string">\'GET\'</span>, <span class="hljs-string">\'http://www.b.com:9091\'</span>, <span class="hljs-literal">true</span>);\n  xhr.setRequestHeader(<span class="hljs-string">\'xiaodan\'</span>, <span class="hljs-string">\'xheldon\'</span>);\n    xhr.send();\n  }\n</code></pre>\n<p>因为这次是在加了 <code>Access-Control-Allow-Origin</code> 之后的操作, 因此这次浏览器报了个不一样的错误:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.1.png" alt="VPSServerError2.1" title="VPSServerError2.1"></p>\n<p>注意到还是因为 <code>Access-Control-Allow-Origin</code> 的错误, 但是这次是因为前端设置了一个自定义的 <code>header</code>, 因此是一个非简单请求, 对于非简单请求会先发一个预检请求(<code>prelight</code>), 请求类型是 <code>OPTIONS</code>, 可以查看 <a href="http://harttle.com/2016/12/30/cors-preflight.html" target="_blank">这篇文章</a> 了解更多. 预检请求目的是嘘寒问暖 <code>b.com</code> 的服务器, 是否接受这个 <code>xiaodan</code> 的 <code>header</code>, 后端在返回的 <code>header</code> <code>Access-Control-Alow-Headers</code> 中, 没有这个叫做 <code>xiaodan</code> 的值, 因此报错.</p>\n<p>那接下来我们把 <code>b.com</code> 返回的内容加上 相应的 <code>header</code>:</p>\n<pre><code class="hljs javascript">app.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>)</span>{\n  <span class="hljs-built_in">console</span>.log(req.headers);\n  res.set({\n    <span class="hljs-string">\'Access-Control-Allow-Origin\'</span>: <span class="hljs-string">\'http://www.a.com:9090\'</span>,\n    <span class="hljs-string">\'Access-Control-Allow-Headers\'</span>: <span class="hljs-string">\'xiaodan\'</span>\n  });\n  res.send(req.headers);\n});\n</code></pre>\n<p>再次发起请求看看:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.1.png" alt="VPSServerError2.1" title="VPSServerError2.1"></p>\n<p>居然是一样的报错结果, 虽然响应了 <code>200</code>, 但是服务端没有返回相应的 <code>Access-Control-Allow-Headers</code>, 返回结果被浏览器拒绝了(注意不是被服务器拒绝, 服务器是返回了 <code>200</code> 的).</p>\n<p>排查了一下发现, 问题出在这个非简单请求上面, 我把 <code>b.com</code> 函数稍微修改下:</p>\n<pre><code class="hljs javascript">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span></span>{\n  res.set({\n    <span class="hljs-string">\'Access-Control-Allow-Origin\'</span>: <span class="hljs-string">\'http://www.a.com:9090\'</span>,\n    <span class="hljs-string">\'Access-Control-Allow-Headers\'</span>: <span class="hljs-string">\'xiaodan\'</span>\n  });\n  <span class="hljs-built_in">next</span>();\n});\n\napp.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span></span>{\n  console.<span class="hljs-built_in">log</span>(req.headers);\n  res.send(req.headers);\n});\n</code></pre>\n<p>服务端:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.2.png" alt="VPSServerError2.2" title="VPSServerError2.2"></p>\n<p>客户端:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.3.png" alt="VPSServerError2.3" title="VPSServerError2.3"></p>\n<p>分析原因在于(待求证, 回头翻翻 <code>HTTP</code> 权威指南再说), 非简单请求的 <code>prelight</code> 请求, 不会发起实际请求, 而是先发送一个预检请求, 来测试服务器是否支持某个非简单 <code>header</code> 字段, 也就是说, 带有非简单头部的请求不会走到 <code>app.get(&#39;/&#39;)</code> 里面. 同时可以在 <code>b.com</code> 的服务器看到, 因为 <code>console.log(req.headers)</code> 是写在 <code>app.get(&#39;/&#39;)</code> 里面的, 刚刚的请求 <code>b.com</code> 服务器并没有输出任何东西, 因此也印证了这一点. <code>这一设计旨在确保服务器对 CORS 标准知情，以保护不支持 CORS 的旧服务器</code>. </p>\n<h2 id="-4-a-com-cookie-b-com-">小目标-4: 把 <code>a.com</code>  域下的 <code>cookie</code> 发送到 <code>b.com</code></h2>\n<p>OK, 插播结束, 我们来测试下在客户端, 也即 <code>a.com</code> 下发起的 <code>xhr</code> 请求的页面设置 <code>withCredentials = true</code> (只列出 <code>xhrSend</code> 部分)能否将 <code>a.com</code> 的 <code>cookie</code> 发送到 <code>b.com</code>(这里简单请求和非简单请求是一样的结果, 为了方便查看差异我把 <code>xhr</code> 设置的 <code>header</code> 去掉了):</p>\n<pre><code class="hljs javascript"><span class="hljs-comment">// 设置允许 cookie</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhrSend</span><span class="hljs-params">(e)</span></span>{\n  e.preventDefault();\n  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();\n  xhr.open(<span class="hljs-string">\'GET\'</span>, <span class="hljs-string">\'http://www.b.com/\'</span>, <span class="hljs-literal">true</span>);\n  xhr.withCredentials = <span class="hljs-literal">true</span>;\n  xhr.send();\n}\n</code></pre>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.4.png" alt="VPSServerError2.4" title="VPSServerError2.4"></p>\n<p>这次错误提醒变化, 变成服务端没有设置 <code>Access-Control-Allow-Credentials</code> 为 <code>true</code> 了, 这个 <code>header</code> 是来设置允许请求携带 <code>cookie</code> 的, 因此设置一下:</p>\n<pre><code class="hljs javascript">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req,res, next)</span></span>{\n  res.set({\n    <span class="hljs-string">\'Access-Control-Allow-Origin\'</span>:<span class="hljs-string">\'http://www.a.com:9090\'</span>,\n    <span class="hljs-string">\'Access-Control-Allow-Headers\'</span>: <span class="hljs-string">\'xiaodan\'</span>,\n    <span class="hljs-string">\'Access-Control-Allow-Credentials\'</span>: <span class="hljs-literal">true</span>\n  });\n  <span class="hljs-built_in">next</span>();\n});\n\napp.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span></span>{\n  console.<span class="hljs-built_in">log</span>(req.headers);\n  res.send(req.headers);\n});\n</code></pre>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.5.png" alt="VPSServerError2.5" title="VPSServerError2.5"></p>\n<p>仍然没有, 看下 <code>Chrome</code> 的 <code>cookie</code>:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.6.png" alt="VPSServerError2.6" title="VPSServerError2.6"></p>\n<p>确实是设置了 <code>cookie</code> 啊, 什么情况? 不服, 想着 <code>req.headers</code> 是 <code>express</code> 格式化之后的, 看看原始 <code>headers</code> <code>rawHeaders</code>:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.7.png" alt="VPSServerError2.7" title="VPSServerError2.7"></p>\n<p>还是没看到, <code>cookie</code> 被狗吃了吗?</p>\n<blockquote>\n<p>都没有, 她说将来会找到, 时间,时间会给我答案 ------我的滑板鞋</p>\n</blockquote>\n<p>OK, 找不到问题的时候就吃个冰淇淋吧. 下楼买了个香菜味的雀巢冰激凌(吃不起哈根达斯), 然后在上楼的时候灵光一闪, 好像我们这个属于是第三方 <code>cookie</code>, 会不会是我禁止浏览器追踪导致的呢? 于是吃完冰激凌我在 <code>chrome</code> 的设置中, 把 <code>随浏览流量一起发送&quot;不跟踪&quot;请求</code> 的钩钩给去掉了:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.8.png" alt="VPSServerError2.8" title="VPSServerError2.8"></p>\n<p>对了, 这次我把 <code>req.headers</code> 放到了 <code>app.use</code> 里面以防万一(其实不会有什么万一)：</p>\n<pre><code class="hljs javascript">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req,res, next)</span></span>{\n  console.<span class="hljs-built_in">log</span>(req.headers);\n  res.set({\n    <span class="hljs-string">\'Access-Control-Allow-Origin\'</span>:<span class="hljs-string">\'http://www.a.com:9090\'</span>,\n    <span class="hljs-string">\'Access-Control-Allow-Headers\'</span>: <span class="hljs-string">\'xiaodan\'</span>,\n    <span class="hljs-string">\'Access-Control-Allow-Credentials\'</span>: <span class="hljs-literal">true</span>\n  });\n  <span class="hljs-built_in">next</span>();\n});\n\napp.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span></span>{\n  res.send(req.headers);\n});\n</code></pre>\n<p>再次点击按钮发送请求, 然后查看 <code>chrome</code> 控制台和 <code>b.com</code> 的服务器输出:</p>\n<p>因为有非简单头部, 因此和之前一样, 显示的是两个请求:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.9.png" alt="VPSServerError2.9" title="VPSServerError2.9"></p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.9.1.png" alt="VPSServerError2.9.1" title="VPSServerError2.9.1"></p>\n<p>服务器也没有接收到, 说明和这个 <code>Chrome</code> 设置无关, 因此为了控制变量 <code>不跟踪</code> 和之前一样, 我把它又钩上了, 服务器端(只放了 <code>GET</code> 请求):</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError2.9.2.png" alt="VPSServerError2.9.2" title="VPSServerError2.9.2"></p>\n<p>还是没有 <code>Cookie</code> 字段, 为什么呢? </p>\n<p>我又想起了文章开头的那句话: &#39;注意, 设置了 <code>withCredentials = true</code> 之后, 携带的 <code>cookie</code> 是目标域的 <code>cookie</code>&#39;. 难道我在 <code>a.com</code> 点击按钮发送请求到 <code>b.com</code>, 发送的是 <code>b.com</code> 设置的 <code>cookie</code> 吗? </p>\n<p>于是我先把 <code>b.com</code> 服务器上也新建一个 <code>index.html</code>, 里面随便加点 <code>cookie</code>:</p>\n<p><code>b.com</code> 的服务器代码:</p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'express\'</span>);\n<span class="hljs-keyword">var</span> app = express();\n<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'path\'</span>);\napp.use(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req,res, next</span>)</span>{\n<span class="hljs-built_in">console</span>.log(req.headers);\nres.set({\n  <span class="hljs-string">\'Access-Control-Allow-Origin\'</span>:<span class="hljs-string">\'http://www.a.com:9090\'</span>,\n  <span class="hljs-string">\'Access-Control-Allow-Headers\'</span>: <span class="hljs-string">\'xiaodan\'</span>,\n  <span class="hljs-string">\'Access-Control-Allow-Credentials\'</span>: <span class="hljs-literal">true</span>\n});\nnext();\n});\n\napp.get(<span class="hljs-string">\'/\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>)</span>{\n  res.sendFile(path.join(__dirname, <span class="hljs-string">\'index.html\'</span>));\n});\n\napp.listen(<span class="hljs-number">9091</span>);\n</code></pre>\n<p>b.com 的 index.html 代码:</p>\n<pre><code class="hljs html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>a.com<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>open Application inspector to check whether the cookie is be setting<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>\n<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">\n    <span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">\'yes=you_cant_believe_i_from_b.com\'</span>\n    <span class="hljs-built_in">document</span>.cookie = <span class="hljs-string">\'from=this_is_from_b.com\'</span>\n</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>\n</code></pre>\n<p>OK, 我们首先访问 <code>b.com</code>:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError4.png" alt="VPSServerError4" title="VPSServerError4"></p>\n<p>没毛病, 正常返回网页, 正常设置 <code>cookie</code>, 接下来我们在 <code>a.com</code> 下, 点击按钮发送请求:</p>\n<p><img src="http://img.xheldon.com/img/VPSServerError4.1.png" alt="VPSServerError4.1" title="VPSServerError4.1"></p>\n<p>可以看到在 <code>a.com</code> 发起的 <code>ajax</code> 请求, 带上了 <code>b.com</code> 的 <code>cookie</code>.</p>\n<p>文章开始的那句话得到了证实.</p>\n<h2 id="-5-a-com-javascript-b-com-cookie-">小目标-5: <code>a.com</code> 的 <code>JavaScript</code> 获取 <code>b.com</code> 的 <code>cookie</code>:</h2>\n<p>既然能在 <code>a.com</code> 发送 <code>b.com</code> 的 <code>cookie</code>, 那么前端能不能获取到 <code>b.com</code> 的 <code>cookie</code> 呢?</p>\n<p>看了下文档, <code>ajax</code> 有 <code>getAllResponseHeaders()</code> 和 <code>getResponseHeader()</code>两个接口, 服务端有 <code>Access-Control-Expose-Header</code>, 于是我测试了下(我就是要分开输出, 怎样?).</p>\n<p>先从简单的来, 首先是调用 <code>xhr</code> 的 <code>getAllResponseHeaders()</code> 接口:</p>\n<pre><code class="hljs javascript"><span class="hljs-comment">// 设置允许 cookie</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhrSend</span>(<span class="hljs-params">e</span>)</span>{\n  e.preventDefault();\n  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();\n  xhr.open(<span class="hljs-string">\'GET\'</span>, <span class="hljs-string">\'http://www.b.com/\'</span>, <span class="hljs-literal">true</span>);\n  xhr.withCredentials = <span class="hljs-literal">true</span>;\n  xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === <span class="hljs-number">200</span>){\n      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'AllRes:\'</span>, <span class="hljs-keyword">this</span>.getAllResponseHeaders())\n    }\n  };\n  xhr.send();\n}\n</code></pre>\n<p><img src="http://img.xheldon.com/img/LocalServer3.png" alt="LocalServer3" title="LocalServer3"></p>\n<p>发现并没有出现 <code>header</code> 的 <code>Cookie</code> 字段, 意料之中, 想着万一 <code>getAllResponseHeaders()</code> 遍历 <code>header</code> 的没有 <code>Cookie</code> 是因为其被设置成 <code>enumerable: false</code> 了呢? 于是我又尝试了 <code>getResponseHeader()</code>:</p>\n<pre><code class="hljs javascript"><span class="hljs-comment">// 设置允许 cookie</span>\n<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xhrSend</span>(<span class="hljs-params">e</span>)</span>{\n  e.preventDefault();\n  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();\n  xhr.open(<span class="hljs-string">\'GET\'</span>, <span class="hljs-string">\'http://www.b.com/\'</span>, <span class="hljs-literal">true</span>);\n  xhr.withCredentials = <span class="hljs-literal">true</span>;\n  xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === <span class="hljs-number">200</span>){\n      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'Res:\'</span>, <span class="hljs-keyword">this</span>.getResponseHeader(<span class="hljs-string">\'Cookie\'</span>))\n    }\n  };\n  xhr.send();\n}\n</code></pre>\n<p><img src="http://img.xheldon.com/img/LocalServer3.1.png" alt="LocalServer3.1" title="LocalServer3.1"></p>\n<p>还是意料之中, 因为服务端没有设置暴露出来的 <code>header</code> 内容, 于是我在 <code>b.com</code> 设置了 <code>Access-Control-Expose-Header</code>:</p>\n<pre><code class="hljs javascript">res.set({\n  <span class="hljs-symbol">\'Access</span>-Control-Allow-Origin<span class="hljs-string">\':\'</span>http:<span class="hljs-comment">//www.a.com:9090\',</span>\n  <span class="hljs-symbol">\'Access</span>-Control-Allow-Headers\': <span class="hljs-symbol">\'xiaodan</span>\',\n  <span class="hljs-symbol">\'Access</span>-Control-Allow-Credentials\': <span class="hljs-literal">true</span>,\n  <span class="hljs-symbol">\'Access</span>-Control-Expose-Headers\': <span class="hljs-symbol">\'Cookie</span>\'\n});\n</code></pre>\n<p>然后重新执行 <code>getResponseHeader(&#39;Cookie&#39;)</code> 和 <code>getAllResponseHeaders()</code></p>\n<p><img src="http://img.xheldon.com/img/LocalServer3.2.png" alt="LocalServer3.2" title="LocalServer3.2"></p>\n<p>没有错误了, 但是还是无法获取到 <code>b.com</code> 的 <code>cookie</code>, 即使 <code>b.com</code> 服务端都同意了也不行.</p>\n<p><img src="http://img.xheldon.com/img/angry.jpg" alt="angry" title="angry"></p>\n<p>查找资料得知, 这个 <code>Access-Control-Expose-Header</code> 只能设置为自定义的 <code>header</code> 来被前端获得. 但是这个没什么意义啊, 因为这个自定义的 <code>header</code> 就是我前端设置的, 唯一的作用就是 后端修改/新建自定义的 <code>header</code> 之后, 前端来获取. 下面我在后端设置一个 <code>header</code>, 让前端来获取:</p>\n<p><code>b.com</code> 的 <code>server</code>:</p>\n<pre><code class="hljs javascript">res.set({\n  <span class="hljs-symbol">\'Access</span>-Control-Allow-Origin<span class="hljs-string">\':\'</span>http:<span class="hljs-comment">//www.a.com:9090\',</span>\n  <span class="hljs-symbol">\'Access</span>-Control-Allow-Headers\': <span class="hljs-symbol">\'xiaodan</span>\',\n  <span class="hljs-symbol">\'Access</span>-Control-Allow-Credentials\': <span class="hljs-literal">true</span>,\n  <span class="hljs-symbol">\'Access</span>-Control-Expose-Headers\': <span class="hljs-symbol">\'Xheldon</span>\',\n  <span class="hljs-symbol">\'Xheldon</span>\': <span class="hljs-symbol">\'MyNameIsXheldon</span>\'\n});\n</code></pre>\n<p><code>a.com</code> 的 <code>index.html</code>:</p>\n<pre><code class="hljs javascript">xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === <span class="hljs-number">200</span>){\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'Res:\'</span>, <span class="hljs-keyword">this</span>.getResponseHeader(<span class="hljs-string">\'Xheldon\'</span>));\n    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'AllRes:\'</span>, <span class="hljs-keyword">this</span>.getAllResponseHeaders());\n  }\n};\n</code></pre>\n<p><img src="http://img.xheldon.com/img/LocalServer3.3.png" alt="LocalServer3.3" title="LocalServer3.3"></p>\n<p>就是这样.</p>\n<p>所以这个小目标是实现不了了, 但是 <code>SO</code> 社区给出了一些解决办法, 比如 使用第三方服务/后端做转发 等, 毕竟规定是死的, 人是活的, 就像 <code>jsonp</code> 一样, 是吧.</p>\n<h2 id="-">联想</h2>\n<p>有人说培训几个月零基础就可以精通某种语言, 我觉得是天方夜谭. 因为在没有计算机基础知识的情况下, 在搞不清二进制/编译原理/计算机原理/操作系统原理/网络基础/通讯协议的是什么概念的情况下能写出代码, 只能说明你照葫芦画瓢的学习能力强, 你知道这么写是这么个效, 但是你不知道为什么这么写就会出现这么个效果. </p>\n<p>因此在跟计算机打交道的时候, 知识面是越广越好, 知识深度是越深越好. 这不, 我在了解 CORS 的时候, 想起了之前接触过的 AUTH.</p>\n<p>有个叫 <code>AUTH2.0</code> 的东西, 那它跟 <code>CORS</code> 有什么关系呢? 我也不知道, 在此声明, jiang来对以下内容出问题了我不负泽, 民不民白?:</p>\n<p><img src="http://img.xheldon.com/img/naive.jpg" alt="Naive" title="Naive"></p>\n<p><code>CORS</code>, 可以让访问过 <code>B</code> 站的用户, 从 <code>A</code> 站发起请求的时候, 携带 <code>B</code> 站的 <code>cookie</code>. 步骤是:</p>\n<ol>\n<li>用户访问过 <code>B</code> 站.</li>\n<li>用户访问 <code>A</code> 站, 在 <code>A</code> 站发起请求到 <code>B</code> 站.</li>\n<li><code>B</code> 站验证来自 <code>A</code> 站的请求中的来自 <code>B</code> 站的 <code>cookie</code>, 没毛病, 返回 <code>B</code> 站的数据.</li>\n</ol>\n<p><code>AUTH</code>, 可以让用户在 <code>A</code> 网站访问 <code>B</code> 网站的资源. 前提是需要用户授权, 步骤是:</p>\n<ol>\n<li>在 <code>A</code> 网站发起请求.</li>\n<li>步骤1跳转到 <code>B</code> 站, 确认授权, 再跳转回 <code>A</code> 网站.</li>\n<li>此时 <code>A</code> 网站拿到 <code>tooken(令牌)</code> 就能访问用户在 <code>B</code> 网站的资源了.</li>\n</ol>\n<p>有木有很像? </p>\n<p><code>CORS</code> 的第一步对应 <code>AUTH</code> 的第二步. <code>AUTH</code> 的第二步相当于 <code>CORS</code> 的第一步的可以认为是在 <code>B</code> 网站的服务端加上了 <code>Access-Control-Allow-Credentials</code>, 这样就代表完成授权.</p>\n<p>可以认为 <code>CORS</code> 携带 <code>cookie</code> 是简化版的 <code>AUTH</code>.</p>\n<p>以下摘自 <code>RFC 6749</code></p>\n<p><img src="http://img.xheldon.com/img/AUTH.png" alt="AUTH" title="AUTH"></p>\n<h2 id="-">后记</h2>\n<p>为什么说, 第三方广告 <code>cookie</code> 会泄露隐私呢? 这是因为广告放在一个 <code>A</code> 网站上, 广告主就知道这个广告投放到了 <code>A</code> 网站(通过广告投放的 <code>id/key</code> 之类的 <code>identity</code> 来标识 和付费), 于是广告主在这个广告上设置一个 <code>cookie</code>, 这个广告来自广告 <code>B</code> 的域名, 因此设置的 <code>cookie</code> 当然是来自 <code>B</code> 的 <code>cookie</code>, 每次 <code>A</code> 网站加载这个广告的时候, 肯定是要执行一段 <code>js</code> 的, 在这个 <code>js</code> 中, 设置了允许 <code>A</code> 站发送 <code>cookie</code>, 而同时 <code>B</code> 站也允许来自 <code>A</code> 站的 <code>cookie</code> 携带 <code>B</code> 站的 <code>cookie</code> 发送过来, 因此就什么都知道了.</p>\n<p>`Google AD Impl:</p>\n<p><img src="http://img.xheldon.com/img/googleWithCredentials.png" alt="googleWithCredientials" title="googleWithCredientials"></p>\n<p><img src="http://img.xheldon.com/img/googleWithCredentials2.png" alt="googleWithCredientials2" title="googleWithCredientials2"></p>\n<h2 id="-">注意</h2>\n<ol>\n<li><p>上述修改涉及到服务端的修改, 均需要重启服务. 因为在 <code>VPS</code> 上重启服务不太方便, 而且时间久了连接会断开, 因此最好的办法是在 <code>VPS</code> 上放置文章中的 <code>a.com</code> (主要用来修改 <code>index.html</code> 的), 而在本地放置文章中的 <code>b.com</code> 的内容(主要用来修改 <code>index.js</code> 的).</p>\n</li>\n<li><p>远程链接保持不断开, 最简单的办法是将其后台(前提是保持链接, 不然断开链接之后, 请求过来进行 <code>I/O</code> 操作, 仍然会被断开). 可以运行 <code>node index.js &amp;</code>, 或者在已经运行 <code>node index.js</code> 的时候按 <code>ctrl+z</code>, 将其冻结在后台, 然后执行 <code>bg</code> 命令将最近一个后台的任务激活. <code>jobs</code> 命令可以查看在当前任务列表. 如果退出了当前 <code>session</code>, 之后重新连接的话, 任务仍然在运行, 但是 <code>jobs</code> 已经看不到该任务了, 因此需要 <code>ps -A</code> 列出所有进程, 然后 <code>kill ID</code> 终止 <code>node</code> 所在的那个进程, 重新运行即可.</p>\n</li>\n<li><p>完成小目标期间出错的时候我怀疑是没有把自定义字段设置为以 <code>X-</code> 开头才报错的, 看了下标准发现并没有以 <code>X-</code> 的规定, 维基和SO 上只是推荐自定义 <code>Header</code> 以 <code>X-</code> 开头而已.</p>\n</li>\n<li><p>设置了 <code>withCredentials = true</code> 之后, 服务端的 <code>Access-Control-Allow-Origin</code> 就不能再设置为 <code>wildcard</code> <code>*</code> 了</p>\n</li>\n</ol>\n'}});
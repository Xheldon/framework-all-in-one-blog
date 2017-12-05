webpackJsonp([11],{77:function(s,n){s.exports='<h1 id="-promise-">[译]Promise反面模式</h1>\n<h3 id="-translation-">分类: [Translation]</h3>\n<hr>\n<p>最近在看<code>Promise</code>相关的东西，看到了这篇文章，觉得很不错，遂记录下来。</p>\n<p><code>Promises</code>本身是很简单的，前提是你得找得到头绪，下面是几个关于Promise的容易困惑的知识点来验证你是否真的掌握了<code>Promise</code>。其中的几个真的曾经让我抓狂过。</p>\n<h2 id="-promises-"><code>嵌套Promises</code></h2>\n<p>你有一捆的Promises互相嵌套着：</p>\n<pre><code class="hljs javascript">loadSomething().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(something)</span></span> {\n    loadAnotherthing().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(another)</span></span> {\n        DoSomethingOnThem(something, another);\n        });\n    });\n</code></pre>\n<p>你这么做的原因是你需要处理这两个Promises的结果，所以你不能链式调用他们因为<code>then()</code>方法只接受上一个<code>then()</code>返回的结果。（意思是这两个<code>Promise</code>是需要同时处理没有先后关系的，但是<code>then</code>却有个先后关系，如果前者<code>throw</code> <code>error</code>直接进入<code>catch</code>处理环节）</p>\n<p>呵呵，其实你这么写的真正原因是你不知道<code>all()</code>方法：</p>\n<p>解决这种丑陋写法的方案：</p>\n<pre><code class="hljs javascript">q.<span class="hljs-built_in">all</span>([loadSomething(), loadAnotherThing()])\n    .<span class="hljs-built_in">spread</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(something, another)</span></span> {\n        DoSomethingOnThem(something, another);\n});\n</code></pre>\n<p>更简洁了。<code>q.all()</code>返回一个<code>promise</code>对象，并将这个结果结合成一个数组并传递给<code>resolve</code>方法供之后的<code>then</code>方法调用，<code>spread()</code>方法将会分割这个数组为几个数组长度的参数传递给其中的<code>DoSomethingOnThem</code>函数。</p>\n<p>（注：<code>Promise.all()</code>接受一个数组作为参数,数组元素为<code>promise</code>,元素之前没有先后顺序,同时执行,最后传递给<code>then</code>方法的值为各个<code>promise</code>方法<code>return</code>值的数组。这里作者使用的是<code>node</code>中的一个模块<code>q</code>作为示例)</p>\n<h2 id="-"><code>中断的链式调用</code></h2>\n<p>假设你有这样一段代码：</p>\n<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anAsyncCall</span><span class="hljs-params">()</span> </span>{\n    <span class="hljs-keyword">var</span> promise = doSomethingAsync();\n    promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{\n        somethingComplicated();\n    });\n    <span class="hljs-keyword">return</span> promise;\n}\n</code></pre>\n<p>这段代码的问题是，出现在<code>somethingComplicated()</code>函数的<code>error</code>都不会被捕获。<code>Promises</code>意味着能够链式调用（不然还叫什么<code>then</code>，直接<code>done</code>就行了）每一个被调用的<code>then()</code>方法返回一个新的<code>promise</code>，这个新的<code>promise</code>是会被下一个<code>then()</code>方法继续调用的。正常来说，最后一个调用应该是<code>catch()</code>方法，出现在链式调用任何地方的任何<code>error</code>都会被它捕获并处理。</p>\n<p>在上面的的代码中，链式调用在你返回第一个<code>promise</code>而不是返回一个<code>then</code>处理后的新的的<code>promise</code>给最后一个<code>then</code>调用的时候中断了（即<code>then</code>不改变原有的<code>promise</code>，它只处理它，然后返回一个新的<code>promise</code>）。\n解决这个问题的方案：</p>\n<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">anAsyncCall</span><span class="hljs-params">()</span> </span>{\n    <span class="hljs-keyword">var</span> promise = doSomethingAsync();\n    <span class="hljs-keyword">return</span> promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{\n        somethingComplicated()\n    });\n}\n</code></pre>\n<p>记住，总是返回最后一个<code>then()</code>的结果（以能够使用链式调用）。</p>\n<h2 id="-"><code>混乱的集合</code></h2>\n<p>你有一组元素的数组，你想对这个数组的每个元素之执行一些异步操作。所以你发现你需要做一些涉及到递归调用的事情。</p>\n<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">workMyCollection</span><span class="hljs-params">(arr)</span> {</span>\n    var resultArr = [];\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_recursive</span><span class="hljs-params">(idx)</span> {</span>\n        <span class="hljs-keyword">if</span> (idx &gt;= resultArr.<span class="hljs-built_in">length</span>) <span class="hljs-keyword">return</span> resultArr;\n        <span class="hljs-keyword">return</span> doSomethingAsync(arr[idx]).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span> {</span>\n            resultArr.push(res);\n            <span class="hljs-keyword">return</span> _recursive(idx + <span class="hljs-number">1</span>);\n        });\n    }\n    <span class="hljs-keyword">return</span> _recursive(<span class="hljs-number">0</span>);\n}\n</code></pre>\n<p>额。。这段代码不是很直观，问题的关键在与，当你不知道有多长的链式调用的时候，链式调用就变成一个意见痛苦的事情。除非你知道(<code>JavaScript ES5+</code>原生的数组方法)<code>map()</code>和<code>reduce()</code></p>\n<p>解决方案：\n记住，<code>q.all</code>参数是一个由<code>promise</code>构成的数组，同时它会把结果放到一个数组中并传给<code>resolve</code>方法。我们可以简单的使用数组元素的map方法来对每个数组中的元素执行这个异步调用方法，像下面这样：</p>\n<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">workMyCollection</span><span class="hljs-params">(arr)</span> </span>{\n    <span class="hljs-keyword">return</span> q.all(arr.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span> </span>{\n        <span class="hljs-keyword">return</span> doSomethingAsync(item);\n    }));\n}\n</code></pre>\n<p>不像开始那个并不是什么解决方案的递归调用，这段代码将同步调用数组中的每个元素传递给一个异步调用函数。明显在时间上更有效率一些。\n如果你需要按顺序返回<code>promises</code>，你可以使用<code>reduce</code>：</p>\n<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">workMyCollection</span><span class="hljs-params">(arr)</span></span> {\n    <span class="hljs-keyword">return</span> arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(promise, item)</span></span> {\n        <span class="hljs-keyword">return</span> promise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(result)</span></span> {\n            <span class="hljs-keyword">return</span> doSomethingAsyncWithResult(item, result);\n        });\n    }, q());\n}\n</code></pre>\n<p>看起来不是很简单明了，但是确实比最开始的那个简洁多了。（Not quite as tidy, but certainly tidier.）</p>\n<h2 id="-promise-"><code>幽灵Promise</code></h2>\n<p>有一个确定的方法（意思是已经在开始执行Promise时就给出此方法，而不是在执行中由结果来确定的方法---译者注），有时候需要异步调用，有时候又不需要。因此你为了应对这两种情况只创建了一个promise仅仅是为了保持异步和非异步的情况下代码一致（以便于抽象和解耦---译者注），即使这种情况实际只可能出现其中一种。</p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> promise;\n<span class="hljs-keyword">if</span> (asyncCallNeeded)\n    promise = doSomethingAsync();\n<span class="hljs-keyword">else</span>\n    promise = Q.resolve(<span class="hljs-number">42</span>);\npromise.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{\n    doSomethingCool();\n}</span>);</span>\n</code></pre>\n<p>以上这段代码在反面模式中并不算最糟糕的地方，但是却应该写的更清晰一些---用<code>Q()</code>来包裹<code>value</code>或<code>promise</code>。Q()方法即接受一个值也接受一个<code>promise</code>作为参数：</p>\n<pre><code class="hljs javascript">Q(asyncCallNeeded ? doSomethingAsync() : <span class="hljs-number">42</span>)\n    .<span class="hljs-keyword">then</span>(\n    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(value)</span>{</span>\n        doSomethingGood();\n    })\n    .<span class="hljs-keyword">catch</span>(\n        <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span> {</span>\n            handleTheError();\n        });\n</code></pre>\n<p>备注：开始的时候我在这个情况下建议使用<code>Q.when()</code>，多亏了Kris Kowal同学在评论中的建议把我从错误中拯救出来。不要使用<code>Q.when()</code>，只使用<code>Q()</code>就够了，后者更清晰一些。</p>\n<h2 id="-"><code>饥渴的错误处理函数</code></h2>\n<p>（小节标题意思是在<code>then</code>中同时设置<code>fulfilled</code>和<code>rejected</code>，以期能够使用<code>rejected</code>函数处理同样作为<code>then</code>函数参数的<code>fulfilled</code>中的错误，但是这是不可能的，<code>fulfilled</code>中的<code>error</code>只能传递给下一个<code>then()</code>而不能在当前被<code>rejected</code>函数处理，所以这小节的标题为『过度渴望』---它虽然渴望处理错误，但是错误永远不会传递给它让他处理---译者注）</p>\n<p><code>then()</code>方法接受两个参数，对<code>fulfilled</code>状态的操作函数和对<code>rejected</code>状态操作函数。你可能写过下面这种代码：</p>\n<pre><code class="hljs javascript">somethingAsync.<span class="hljs-keyword">then</span>(\n    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {\n        <span class="hljs-keyword">return</span> somethingElseAsync();\n    },\n    <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span> {\n        handleMyError(err);\n});\n</code></pre>\n<p>这么写的问题是，发生在<code>fulfilled</code>状态的的<code>error</code>不会传递给错误处理函数。\n解决这个问的的方法是，确保错误处理函数在一个独立的then方法中：</p>\n<pre><code class="hljs javascript">somethingAsync\n    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span> {\n        <span class="hljs-keyword">return</span> somethingElseAsync();\n    })\n    .<span class="hljs-keyword">then</span>(null,\n        <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span> {\n            handleMyError(err);\n        });\n</code></pre>\n<p>或者使用<code>catch()</code>：</p>\n<pre><code class="hljs javascript">somethingAsync\n    .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>\n        <span class="hljs-keyword">return</span> somethingElseAsync();\n    })\n    .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span> {</span>\n        handleMyError(err);\n    });\n</code></pre>\n<p>这样可以确保任何发生在链式调用中的<code>error</code>都能得到处理。</p>\n<h2 id="-promise-"><code>被遗忘的Promise</code></h2>\n<p>你调用一个方法，返回一个<code>promise</code>，然而你忘记了这个<code>promise</code>，然后又创建了一个<code>promise</code>：</p>\n<pre><code class="hljs javascript">var <span class="hljs-keyword">deferred</span> = Q.defer();\ndoSomethingAsync().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span></span> {\n    res = manipulateMeInSomeWay(res);\n    <span class="hljs-keyword">deferred</span>.resolve(res);\n}, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span></span> {\n    <span class="hljs-keyword">deferred</span>.reject(err);\n});\n\n<span class="hljs-keyword">return</span> <span class="hljs-keyword">deferred</span>.promise;\n</code></pre>\n<p>这段代码真的是把<code>promsie</code>的简洁特性抛弃的一干二净---有太多无用的代码了。\n解决方案是，仅仅返回<code>promise</code>即可：</p>\n<pre><code class="hljs javascript"><span class="hljs-keyword">return</span> doSomethingAsync().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(res)</span></span> {\n    <span class="hljs-keyword">return</span> manipulateMeInSomeWay(res);\n});\n</code></pre>\n'}});
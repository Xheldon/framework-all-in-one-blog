webpackJsonp([2],{86:function(e,n){e.exports='<h1 id="-">环境配置/常用软件汇总</h1>\n<p>date:   2016-07-08 20:33:34 +0800</p>\n<h3 id="-think-">分类: [Think]</h3>\n<hr>\n<p>每次拿到一个新电脑, 总是手忙脚乱的安装一堆的工具, 有时候还总是忘记装一些软件, 等到用到的时候才想起来下载, 而刚进入工作的时候上司交代的第一件事往往就是&quot;刚来先熟悉一下环境, 配置一下自己的电脑&quot;. 因此这篇文章记录下我常用的软件, 以备不时之需.</p>\n<p><code>QQ/OneNote微信/网易云音乐</code>可以直接在 <code>Mac App</code> 的热门免费软件中下载.</p>\n<p>1.<code>Shadowsocks</code> 放在百度网盘, 为了下一步下载 <code>Chrome</code> </p>\n<p>2.迅雷 使用 <code>Safari</code> 自带的下载工具下载后面的软件, 巨慢.</p>\n<p>3.<code>Chrome</code></p>\n<p>4.<code>Webstrom</code>  激活服务器: <code>http://idea.iteblog.com/key.php</code></p>\n<p>5.<code>Sublime3</code></p>\n<ol>\n<li><p>激活 <code>key</code>:</p>\n<p> —– BEGIN LICENSE —–\nNicolas Hennion\nSingle User License\nEA7E-866075\n8A01AA83 1D668D24 4484AEBC 3B04512C\n827B0DE5 69E9B07A A39ACCC0 F95F5410\n729D5639 4C37CECB B2522FB3 8D37FDC1\n72899363 BBA441AC A5F47F08 6CD3B3FE\nCEFB3783 B2E1BA96 71AAF7B4 AFB61B1D\n0CC513E7 52FF2333 9F726D2C CDE53B4A\n810C0D4F E1F419A3 CDA0832B 8440565A\n35BF00F6 4CA9F869 ED10E245 469C233E\n—— END LICENSE ——</p>\n</li>\n<li><p>安装边栏增强工具 <code>SideBarEnhancements</code></p>\n<p> command+shift+p 输入 install 回车, 之后重复按 command+shift+p 输入 SideBarEn 回车</p>\n</li>\n<li><p>安装 <code>Sublime</code> 插件 <code>Terminal</code>(在 <code>Sublime</code> 中打开 <code>Terminal</code>)</p>\n<p> command+shift+p 输入 Terminal 回车.</p>\n<blockquote>\n<p>设置 &quot;terminal&quot;: &quot;iTerm2-v3.sh&quot; 使用 iTerm2 打开当前文件</p>\n</blockquote>\n</li>\n</ol>\n<p>6.<code>iTerm2</code></p>\n<pre><code><span class="hljs-attribute">ssh</span> -p 端口 用户名<span class="hljs-variable">@ip</span>\n</code></pre><p>7.<code>Node</code></p>\n<p>8.<code>Oh My Zsh</code></p>\n<pre><code>sh -c <span class="hljs-string">"<span class="hljs-variable">$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)</span>"</span>\n</code></pre><p>9.<code>git</code></p>\n<pre><code>公钥配置: ssh-keygen -t rsa -b 4096 -C <span class="hljs-string">"your_email@example.com"</span>\n配置用户: git<span class="hljs-built_in"> config </span>--global user.name <span class="hljs-string">"Xheldon"</span>\n配置邮箱: git<span class="hljs-built_in"> config </span>--global user.email <span class="hljs-string">"c1006044256@gmail.com"</span>\n</code></pre><p>10.<code>sougou</code> 输入法</p>\n<p>11.<code>charles</code> 抓包工具, 下载补丁替换 charles.jar 即可破解.</p>\n<p>12.<code>XCode</code> 一些东西依赖其 <code>cli</code></p>\n<p>13.安装 <code>homebrew</code></p>\n<pre><code><span class="hljs-regexp">/usr/</span>bin<span class="hljs-regexp">/ruby -e "$(curl -fsSL https:/</span><span class="hljs-regexp">/raw.githubusercontent.com/</span>Homebrew<span class="hljs-regexp">/install/m</span>aster<span class="hljs-regexp">/install)"</span>\n</code></pre><p>14.本地配置 <code>Jeklly</code> 环境</p>\n<blockquote>\n<p><code>ruby</code> 需要2.1或更高版本.</p>\n</blockquote>\n<ol>\n<li><p>安装 <code>rvm</code>(稍久, 机器会发热)</p>\n<p> \\curl -sSL <a href="https://get.rvm.io">https://get.rvm.io</a> | bash -s stable --ruby</p>\n<blockquote>\n<p>之后关闭所有 <code>shell</code> 继续下面的步骤, 或者运行 <code>source /Users/Xheldon/.rvm/scripts/rvm</code> 之后再继续下面的步骤.</p>\n</blockquote>\n</li>\n<li><p>查看已知 <code>ruby</code> 版本</p>\n<p> rvm list known</p>\n</li>\n<li><p>安装 <code>ruby2.2.0</code></p>\n<p> rvm install 2.2.0</p>\n<blockquote>\n<p>期间需要 mkdir -p /tec/openssl 的权限, 因此需要输入密码.</p>\n</blockquote>\n</li>\n<li><p>更换 <code>gem source</code>:</p>\n<p> gem sources -l //查看当前源\n gem source --remote <a href="https://rubygems.org/">https://rubygems.org/</a> //移除当前源\n gem source -a <a href="https://gems.ruby-china.org">https://gems.ruby-china.org</a>  //新增源</p>\n</li>\n<li><p>安装 <code>bundler</code></p>\n<p> gem install bundler</p>\n</li>\n<li><p>安装 <code>jekyll</code> 和其他依赖.</p>\n<blockquote>\n<p>cd 到项目根目录(假设你已经 <code>clone</code> 了 <code>jekyll</code> 博客)执行:</p>\n</blockquote>\n<p> bundle install</p>\n<blockquote>\n<p>完成后即可执行 <code>bundle exec jekyll serve</code> 查看本地起的 <code>jekyll</code>(如果提示找不到 bundle 命令, 重新执行第五六步即可)</p>\n</blockquote>\n</li>\n</ol>\n<h2 id="-">其他</h2>\n<p>可能需要的操作:</p>\n<p>1.允许任何安装来源:</p>\n<pre><code>sudo spctl <span class="hljs-comment">--master-disable</span>\n</code></pre>'}});
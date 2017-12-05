webpackJsonp([15],{38:function(e,s){e.exports='<h1 id="mac-os-x-sz-rz-">Mac OS X 使用 sz/rz 命令下载/上传文件配置</h1>\n<h3 id="-others-">分类: [Others]</h3>\n<hr>\n<p><code>OS X</code> 自带的终端可以直接连接 <code>Linux</code> （相比之下, <code>Win</code> 的 <code>cmd</code> 就比较渣了）, 但是有个问题就是, 终端无法直接通过 <code>Zmodem</code> 来上传和下载文件, 这里就需要一款更强大的远程服务器连接工具: <code>iTerm</code> 的帮助了. </p>\n<p>网上很多的教程, 但是有的是为了提高访问量随便粘贴的, 完全不负责任, 讲的也不仔细, 我也是连蒙带猜费了半天的劲儿才搞好的, 坑爹. 下面我尽量使用比较浅显的话来给大家讲解. </p>\n<p>好了废话不多说, 咱们进入正题: 如何在 <code>Mac OS X</code> 下使用 <code>Zmodem</code> 中的 <code>rz/sz</code> 来上传和下载文件. </p>\n<h3 id="-iterm2-">第一步: 下载 <code>iTerm2</code></h3>\n<p>首先明确, 使用自带的终端是不行的, 我们需要下载一款比终端更强大的 <code>shell</code> 工具: <a href="http://www.iterm2.cn/download" target="_blank"><code>iTerm2</code> </a></p>\n<p>下载下来是个 <code>zip</code> 的压缩包, 直接解压就得到了以 <code>.app</code> 为后缀名的可执行文件, 双击打开就是 <code>iTerm2</code> 的窗口了, 过程中有警告窗口的话同意即可（就相当于是 <code>Win</code> 下的绿色软件一样无需安装）</p>\n<h3 id="-iterm2-brew-">第二步: 使用 <code>iTerm2</code> 安装 <code>brew</code></h3>\n<p><code>brew</code> 是一个包管理程序, 使用它可以方便的安装各种软件, 而无需输入地址, 作用相当于 <code>AppStore</code> 一样, 具体介绍请参看官网. 安装 <code>brew</code> 很简单, 使用刚刚下载后解压打开的 <code>iTerm2</code>, 输入</p>\n<pre><code>ruby -e "$(curl -fsSLhttps://raw.githubusercontent.com/Homebrew/<span class="hljs-keyword">install</span>/<span class="hljs-keyword">master</span>/<span class="hljs-keyword">install</span>)<span class="hljs-string">"</span>\n</code></pre><p>即可. 如图:</p>\n<p><img src="http://img.xheldon.com/img/brew_install.png" alt="brew install" title="brew install"></p>\n<p>回车: </p>\n<p><img src="http://img.xheldon.com/img/brew_install2.png" alt="brew install" title="brew install"></p>\n<p>注意看安装过程中的提示, 我在文字停止显示时就以为是安装好了, 于是开心的 <code>ls</code> 起来, 结果发现停止时是需要按下 <code>return</code> 来确认的, 按其他键就会退出安装, 过程需要按下两次 <code>return</code>, 最后显示:</p>\n<pre><code><span class="hljs-function"><span class="hljs-title">Downloading</span></span> <span class="hljs-keyword">and</span> installing Homebrew...\n</code></pre><p>才开始下载和安装 <code>brew</code> 这点要记住. </p>\n<p>再来一次: </p>\n<p><img src="http://img.xheldon.com/img/brew_install3.png" alt="brew install" title="brew install"></p>\n<p>成功会提示这个: </p>\n<p><img src="http://img.xheldon.com/img/brew_install4.png" alt="brew install" title="brew install"></p>\n<p>注意, 如果通过 <code>iTerm2</code> 的 <code>brew</code> 安装不上 <code>lrzsz</code>（包括各种情况的报错 ）, 请<a href="https://ohse.de/uwe/releases/lrzsz-0.12.20.tar.gz" target="_blank">手动下载 <code>lrzsz</code> </a>, 这里是<a href="https://ohse.de/uwe/software/lrzsz.html" target="_blank"> <code>lrzsz</code> 的官网</a></p>\n<p>需要将下载的 <code>zip</code> 压缩之后放到 <code>brew</code> 的缓存目录下: <code>/Library/Caches/Homebrew/</code></p>\n<h3 id="-brew-lrzsz-">第三步: 使用 <code>brew</code> 安装 <code>lrzsz</code></h3>\n<p>在 <code>iTerm2</code> 中输入: </p>\n<pre><code><span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>lrzsz\n</code></pre><p>无需操作, 看到成功提示即可, 如图: </p>\n<p><img src="http://img.xheldon.com/img/rzsz.png" alt="rz sz" title="rz sz"></p>\n<h3 id="-iterm2-">第四步: 配置 <code>iTerm2</code></h3>\n<p>首先需要下载两个脚本文件, 放到 <code>/usr/local/bin</code> 目录下, 这里是<a href="https://github.com/mmastrac/iterm2-zmodem" target="_blank">下载地址</a>, 点击 <code>Github</code> 页面的右下角的 <code>Download ZIP</code> 即可. \n如图: </p>\n<p><img src="http://img.xheldon.com/img/githubdownload.png" alt="githubdownload" title="githubdownload"></p>\n<p>下载之后解压文件, <code>cd</code> 到这个解压的文件夹（名字是 <code>iterm2-zmodem-master</code>,要用 <code>root</code> 权限: <code>sudo -i</code> ）, 通过终端或者 <code>iTerm2</code> <code>copy</code> 文件到 <code>/usr/local/bin</code> 目录即可\n命令为（假设当前已经 <code>cd</code> 到 <code>iterm2-zmodem-master</code> 文件夹）: </p>\n<pre><code>cp iterm2-<span class="hljs-keyword">recv</span>-zmodem.sh /usr/<span class="hljs-keyword">local</span>/bin/iterm2-<span class="hljs-keyword">send</span>-zmodem.sh（回车） \ncp iterm2-<span class="hljs-keyword">send</span>-zmodem.sh /usr/<span class="hljs-keyword">local</span>/bin/iterm2-<span class="hljs-keyword">send</span>-zmodem.sh（回车）\n</code></pre><p>之后在 <code>iTerm2</code> 的设置界面 <code>iTerm</code> <code>偏好设置-&gt; Profiles -&gt; Default -&gt; Advanced -&gt; Triggers</code> 的 <code>Edit</code>按钮\n点击 <code>+</code> 号, 加上以下 <code>trigger</code> 信息: </p>\n<pre><code>Regular <span class="hljs-string">expression:</span> \\*\\*B0100\n<span class="hljs-string">Action:</span> Run Silent Coprocess\n<span class="hljs-string">Parameters:</span> <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/</span>iterm2-send-zmodem.sh \nRegular <span class="hljs-string">expression:</span> \\*\\*B00000000000000\n<span class="hljs-string">Action:</span> Run Silent Coprocess\n<span class="hljs-string">Parameters:</span> <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/</span>iterm2-recv-zmodem.sh\n</code></pre><p>如图: </p>\n<p><img src="http://img.xheldon.com/img/triger.png" alt="trigger" title="trigger"></p>\n<h3 id="-rz-sz-">第五步: 尽情 <code>rz/sz</code> 吧！</h3>\n<p>之后连接服务器</p>\n<p><img src="http://img.xheldon.com/img/connect.png" alt="connect" title="connect"></p>\n<p>连接之后试试输入 rz 就会弹出一个对话框让选择需要上传的文件, 大功告成！</p>\n<p><img src="http://img.xheldon.com/img/success.png" alt="success" title="success"></p>\n'}});
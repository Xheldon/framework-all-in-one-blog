webpackJsonp([13],{75:function(p,n){p.exports='<h1 id="-">代码优化/工作经验重要性的一次切身体会</h1>\n<p>date:   2015-10-30 23:04:22 +0800</p>\n<h3 id="-think-">分类: [Think]</h3>\n<hr>\n<p>因为没有项目经验，经常在前端和后端之间的职能上面出错。</p>\n<p>比如我需要实现一个点击按钮用后台给的接口查询数据再用handlebar显示到前端的功能，但是每次查询的数据（返回数组，每项为map类型）都是比较长的，全部一次性加载显示在页面不合适，于是我就排序设计为「每次点击按钮都从后台查询数据」，然后对每次获得的数据做slice处理，每次都截取相同的长度，即第一次截取0到x，第二次截取x到2x，以此类推。</p>\n<p>但是这里有个问题，即我不确定后台SQL查询出来的数据是否order by过，如果没有的话，那我每次点击按钮查询的数据都是无序的，如果不能保证数组的顺序，那就不能保证每次按照顺序截取的数据是自己想要的，因为有可能这次截取的0到x个数组项中包含h项，下一次查询这个h项跑到了x+h项里，再次被查询出来丢到handlebar里面了，这是不对的。</p>\n<p>我当然要再自己力所能及的范围内解决这个问题，于是我打算在前端按照数组中的项中的某个属性如uid来sort一下，这时前端的leader问我在做什么，我说我要sort一下后台查出来的这个无序数组，他就跟我说：</p>\n<p>『这个是后台做的，你前端去做的话会影响性能』</p>\n<p>于是开始跟我解释起来：</p>\n<p>『一般情况下，前端是拿后台给的接口用的，而无需再次对接口查询到的数据做二次处理，不过如果在类似handlebar这种的模板里面，有时候还是需要对查出来的数据中的属性进行拼装处理，再输出到页面，不过你这个情况我可以明确告诉你这个是后台干的事情，他们在给你接口的时候就要保证满足需求』</p>\n<p>『你现在的情况是，你是需要实现翻页功能，但是后端的接口只能每次将所有内容全部查询出来，无法做到需要多少就差多少，也就是说，现有接口无法满足需求，怎么办？两个方案：时间紧的话前端牺牲下性能，直接处理了，时间不紧的话，找后台要接口去，也就是增加一个start，offset的事情，这个接口并不难写。』</p>\n<p>另外还有一个最佳实践：<strong>查询操作越少越好，能从页面获取信息就不要从数据库获取信息</strong>。\n比如后台增加接口之后我仍然需要进行四次查询操作，分别为：初始化、点击加载更多、选项卡切换。每次都有性能损耗，为什么呢？我的逻辑是这样的：</p>\n<p>第一次：页面初始化时候，查询数据并截取固定长度的数组）并将数据放到页面（查询一次），我需要获取每次点击「更多」按钮多少次，由此来判断最大点击次数，而查询到的总数据长度除以每次需要的数据长度，取整+1就得到需要点击的次数，点击这么多次才能把数据都加载出来，然后显示『没有更多啦』按钮（查询一次）这个毫无疑问吧？</p>\n<p>第二次：点击「加载更多」需要查询数据，将需要的长度放到页面上，然后点击次数count+1（查询一次）</p>\n<p>第三次：因为有个我的社区、和我的动态两个选项卡，所以点击这两个按钮的时候都需要查询（查询一次）</p>\n<p>最让人崩溃的是，我居然把我的社区和我的动态这两个选项卡的内容重叠！也即每次点击按钮之后原来的内容是被强行用jQuery的$(container).html()方法替换掉，因为中只有一个容器的缘故（我的设计），所以切换之间只能用html，点击『加载更多』才能用append！\n真是令人羞耻。</p>\n<p>后来我遵循了最佳实践（前面有说过），此外，尽可能的将功能分开和集中来，怎么理解这句话呢？意思就是说，选项卡切换的话，那这个选项卡就负责切换，不管数据查询的事情（功能分开），而『加载更多』按钮就负责查询数据，不干其他的事情，甚至页面初始化的时候也用trigger来触发这个按钮查询数据，而不是在页面加载之初先查询，点击按钮之后再次查询（功能集中）。</p>\n'}});
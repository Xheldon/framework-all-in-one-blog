[![Build Status](https://travis-ci.org/Xheldon/framework-all-in-one-blog.svg?branch=master)](https://travis-ci.org/Xheldon/framework-all-in-one-blog)

## 项目目的

使用最新最流行的框架来重构当前基于 Jekyll 的博客系统, 便于自己更加熟悉框架的使用和 CI 集成的流程和原理

"流行的框架" 包括 Vue/Angular/React

## 实现方案
主要使用 travis CI.
master 分支更新文件之后, GitHub 通知 travis, 执行 .travis.yml 中配置的任务
将 npm run build 生成的代码发布到仓库的 gh-pages 分支, 同时 godaddy 配置 CNAME 域名 blog.xheldon.com 指向 该 GitHub Pages.
即可实现本地 push markdown 文件, 博客即更新.

## 本博客地址

* 主页(规划中): [http://blog.xheldon.com](http://blog.xheldon.com)
* Vue: [http://blog.xheldon.com/vue#/](http://blog.xheldon.com/vue#/)
* React: 待更新
* Angular: 待更新



## 已经实现的功能

1. master 发布代码, blog.xheldon.com 更新.
2. vue 静态博客
3. 不同框架使用相同的 markdown 文件构建

## 计划实现的功能

1. 与 [https://github.com/Xheldon/xheldon.com](https://github.com/Xheldon/xheldon.com) 的
 www.xheldon.com 主博客项目结合, 实现更新该项目的 markdown 之后, 本项目即可更新.
2. Jekyll 的 markdown 有自己的 code 高亮格式, 需要自己写个 loader 转化.
3. React 框架的实现

## License

MIT
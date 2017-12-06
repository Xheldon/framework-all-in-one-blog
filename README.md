[![Build Status](https://travis-ci.org/Xheldon/framework-all-in-one-blog.svg?branch=master)](https://travis-ci.org/Xheldon/framework-all-in-one-blog)

# framework-all-in-one-blog
use popular framework to reconsitution my little blog.


The 'popular framework' contain three framework for now: Vue/React/Angular. And I will use those to build my blog, the content is use same .md file.

note: this is a SPA. Multi-Page is under considering to build for future but not now.

## 项目目的

使用最新最流行的框架来重构当前基于 Jekyll 的博客系统
"流行的框架" 包括 Vue/Angular/React

## 实现方案
使用 travis 持续集成, master 分支更新文件之后, GitHub 通知 travis, 执行 .travis.yml 中配置的任务
将 npm run build 生成的代码发布到仓库的 gh-pages 分支, 同时 godaddy 配置 CNAME 域名 blog.xheldon.com 指向 该 GitHub Pages.
即可实现本地 push markdown 文件, 博客即更新.

## 本博客地址

* 主页(规划中): [http://blog.xheldon.com](http://blog.xheldon.com)
* Vue 框架: [http://blog.xheldon.com/vue#/](http://blog.xheldon.com/vue#/)
* React 框架: 待更新
* Angular 框架: 待更新



## 已经实现的功能

1. master 发布代码, blog.xheldon.com 更新.
2. vue 静态博客
3. 不同框架使用相同的 markdown 文件构建
4. Vue 已经实现

## 计划实现的功能

1. 与 [https://github.com/Xheldon/xheldon.com](https://github.com/Xheldon/xheldon.com) 的
 www.xheldon.com 主博客项目结合, 实现更新该项目的 markdown 之后, 本项目即可更新.
2. Jekyll 的 markdown 有自己的 code 高亮格式, 需要自己写个 loader 转化.
3. React 框架的实现
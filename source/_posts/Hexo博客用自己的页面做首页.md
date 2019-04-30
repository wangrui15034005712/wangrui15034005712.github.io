---
title: Hexo博客用自己的页面做首页
date: 2018-11-07 10:37:51
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Html
	 - Github
---
- Hexo博客用自己的页面做首页。个人网站 [去年夏天](https://lastsummer.top) 欢迎大家的访问！

<!-- more -->
![效果展示](/index1.png)
- Demo地址：https://lastsummer.top
Demo仓库：https://github.com/wangrui15034005712/wangrui15034005712.github.io
那么接下来是教程，本教程的前提已经用hexo将博客搭建在 xxxxxx.github.io的repository上
那么现在你要做的有以下几步

## 新建一个仓库
- 名字随便起 我起了 **blog**
那么现在你有了一个空的仓库**repository**
然后本地clone下按照提示初始化一个主**master**分支
访问xxxxxx.github.io/blog成功即可

## 修改博客站点_config.yml
```
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://xxxxxx.github.io/blog(改这里)
root: /blog(改这里)
permalink: :year/:month/:day/:title/
permalink_defaults:

deploy:
  type: git
  repository: https://github.com/xxxxxx/blog.git(改这里)
  branch: master
```
## 重新部署你的博客
- 在对应的文件下在gitbash上输入hexo clean 、hexo g再hexo d
这样你的博客就被部署到`https://xxxxxx.github.io/blog/`上了

## 清空原来的仓库
- 现在原来那个xxxxxx.github.io的repository你就可以清空
或者直接删除重新新建xxxxxx.github.io的repository（进入想要删除的仓库，点击setting 占到delete this repository 在弹窗里输入仓库名，确认即可）
然后新建一个index.html，把你自定义页面的代码复制到里面就好了，
然后可以通过`<a href="blog/"></a>`跳转到你的博客界面了
可以使用Demo进行配置，已在参考博客Demo代码中进行了优化

大功告成！

个人博客：[去年夏天](https://lastsummer.top)
参考博客：[Hexo-用自己的页面做首页](http://blog.lightina.cn/2016/10/27/HexoOverview/)

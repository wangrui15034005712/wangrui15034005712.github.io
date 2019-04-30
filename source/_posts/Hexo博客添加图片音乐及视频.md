---
title: Hexo博客添加图片音乐及视频
date: 2018-10-23 18:31:46
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Html
---
Hexo博客添加图片音乐及视频。
<!-- more -->
##### 插入外部链接图片
``` bash
![“图片描述”](“图片地址”)
```
##### 添加本地图片
在\hexo\source目录下新建文件夹，命名为images或者其他你喜欢的名字，然后编辑你的md博文，插入下面的代码样式：
``` bash
![“图片描述”](/images/你的图片名字.JPG)
```
##### 插入音乐
``` bash
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=660 height=86 src="//music.163.com/outchain/player?type=2&id=1306515028&auto=0&height=66"></iframe>
```
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=660 height=86 src="//music.163.com/outchain/player?type=2&id=1306515028&auto=0&height=66"></iframe>
##### 插入视频
``` bash
<iframe height=498 width=660 src='//player.youku.com/embed/XMzgyNTI5NTY1Mg==' frameborder=0 'allowfullscreen'></iframe>
```
<iframe height=498 width=660 src='//player.youku.com/embed/XMzgyNTI5NTY1Mg==' frameborder=0 'allowfullscreen'></iframe>
个人博客：[去年夏天](https://lastsummer.top)
相关链接: [去年夏天](https://lastsummer.top/blog/生活)
参考博客：[hexo博客添加图片，音乐，视频](https://blog.csdn.net/qq_26891045/article/details/51693571)
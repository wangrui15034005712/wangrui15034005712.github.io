---
title: Hexo博客用Leancloud统计文章阅读量
date: 2018-10-26 10:06:06
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Leancloud
---
Hexo博客用Leancloud统计文章阅读量，以 hexo-theme-shana-master 主题为例。
<!-- more -->
### 第一步：注册[LeanCloud](https://leancloud.cn/dashboard/login.html#/signin)账号(GitHub)
### 第二步：LeanCloud应用配置
![创建应用](/leancloud1.png)
![新应用名称-开发版-创建](/leancloud2.png)
![点击存储](/leancloud3.png)
![存储-创建Class-Class名称-无限制-创建Class（等待2分钟初始化）](/leancloud4.png)
![设置-得到App ID及App Key](/leancloud5.png)
### 第三步：Hexo主题配置
打开博客根目录/themes/next/下的_config.yml，查找leancloud，填写复制来的App ID和App Key，重新生成、步署博客即可正常统计文章阅读量。 
``` bash
# leadcloud访问次数统计
leancloud_visitors:
  enable: true
  app_id: Your AppId
  app_key: Your AppKey
```
### 第四步：域名附赠说明
因为AppID以及AppKey是暴露在外的，为了确保只用于我们自己的博客，建议设置Web安全域名，填入自己的博客域名。 
![设置-安全中心-Web安全域名-保存](/leancloud6.png)
1.记录文章访问量的唯一标识符是文章的发布日期和文章的标题，因此请确保这两个数值组合的唯一性，如果更改了这两个数值，会造成文章阅读数值的清零重计。

2.初始的文章统计量显示为0。在配置好阅读量统计服务之后，第一次打开博文时，会自动向服务器发送数据，该数据会被记录在对应的应用的Counter表中。

3.修改Counter表中的time字段的数值，可以修改文章的访问量。双击具体的数值，修改之后回车即可保存。

大功告成！
个人博客：[去年夏天](https://lastsummer.top)
推荐博客：[NexT主题用Leancloud统计文章阅读量](http://lastsummer.top/blog/2018/10/26/Hexo博客用Leancloud统计文章阅读量)
参考博客：[NexT主题下，用Leancloud统计文章阅读量](https://blog.csdn.net/weixin_39345384/article/details/80787998)
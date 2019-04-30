---
title: Hexo添加评论功能
date: 2018-11-05 13:48:42
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Html
---
目前博客站点使用的评论功能，多说，网易云跟贴都已经下线。Disqus也被挡在墙外，友言貌似也不行。
<!-- more -->
## 可用的评论系统大概有
- 来必力：https://livere.com （来自韩国，使用邮箱注册）
- 畅言： http://changyan.kuaizhan.com （安装需要备案号）
- Valine: https://github.com/xCss/Valine (用了下没效果，应该是我的主题没有集成Valine，支持Next）

综上，最终采用了来必力及畅言。
## 来必力
### 注册官网 
- 打开来必力官网 https://livere.com
![体验-现在安装（免费）](/comment1.png)
![data-uid记录下来-点击copy](/comment2.png)

### 安装及配置
`themes\hexo-theme-shana-master\layout\_partial\comments` 下新建 `livere.ejs`(如不存在目录就新建即可) 把复制的内容粘贴进来；
```
<!-- 来必力City版安装代码 -->
<div id="lv-container" data-id="city" data-uid="<%= theme.livere_uid %>">
<script type="text/javascript">
var refer = "{Permalink}".replace("http://","");
   (function(d, s) {
       var j, e = d.getElementsByTagName(s)[0];

       if (typeof LivereTower === 'function') { return; }

       j = d.createElement(s);
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
   })(document, 'script');
</script>
<noscript>为正常使用来必力评论功能请激活JavaScript</noscript>
</div>
<!-- City版安装代码已完成 -->
```
在 `themes\hexo-theme-shana-master\layout\_partial\article.ejs` 中的内容底部添加如下内容：
```
<% if (!index && post.comments && theme.livere.on){ %>
  <%- partial('comments/livere') %>
<% } %>
```
在主题`themes\hexo-theme-shana-master\_config.yml`添加内容如下(livere_uid就是data-uid)
```
#来必力
livere:
   on: true
   livere_uid: ###############
```
![来必力效果展示](/comment3.png)
来必力就已经集成到自己的博客中啦！
## 畅言
### 注册官网 
- 打开畅言官网 http://changyan.kuaizhan.com/
![点击后台总览-获取畅言密匙](/comment4.png)
![点击安装畅言-通用代码安装-点击复制代码](/comment5.png)

### 安装及配置
`themes\hexo-theme-shana-master\layout\_partial\comments` 下新建 `changyan.ejs`(如不存在目录就新建即可) 把复制的内容粘贴进来；
```
<!--PC和WAP自适应版 sid="请将此处替换为配置SourceID的语句"-->
<div id="SOHUCS"></div> 
<script type="text/javascript"> 
(function(){ 
var appid = '修改成自己的畅言APP ID'; 
var conf = '修改成自己的畅言APP KEY'; 
var width = window.innerWidth || document.documentElement.clientWidth; 
if (width < 960) {
  window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>'); 
} else { 
  var loadJs=function(d,a){
  var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;
  var b=document.createElement("script");
  b.setAttribute("type","text/javascript");
  b.setAttribute("charset","UTF-8");
  b.setAttribute("src",d);
  if(typeof a==="function"){
  if(window.attachEvent){
  b.onreadystatechange=function(){
  var e=b.readyState;if(e==="loaded"||e==="complete"){
  b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};
  loadJs("https://changyan.sohu.com/upload/changyan.js",
  function(){window.changyan.api.config({appid:appid,conf:conf})}); } 
  })(); 
</script>
```
在 `themes\hexo-theme-shana-master\layout\_partial\article.ejs` 中的内容底部添加如下内容：
```
<% if (!index && post.comments && theme.changyan.on){ %>
	<%- partial('comments/changyan') %>
<% } %>
```
在主题`themes\hexo-theme-shana-master\_config.yml`添加内容如下
```
#畅言
changyan:
   on: true
```
![畅言效果展示](/comment6.png)
畅言就已经集成到自己的博客中啦！
- 如果要修改来必力及畅言评论的样式，可以在官网进行相关配置：
1、评论管理
2、评论审核
3、评论数据统计
4、系统配置
	
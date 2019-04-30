---
title: Hexo博客添加打赏功能
date: 2018-10-25 09:31:51
categories: hexo
tags: #文章標籤 可以省略
	 - Html
comments: true
donate: true
toc: true
---
基本思路是将微信和支付宝的收款二维码放到每篇文章的最后，打赏的时候扫下二维码就可以了。
<!-- more -->
以 hexo-theme-shana-master 主题为例：
### 第一步：编写打赏模块的代码
`themes\hexo-theme-shana-master\layout\_partial` 下新建 `donate.ejs` 输入如下内容：
``` bash
<! -- 添加捐赠图标 -->
	<div align='center' style='margin-top:80px;'>
		<div id='donate_board' class="donate_bar">
			<a id="btn_donate" class="btn_donate" href="javascript:;" title="打赏"></a>
			<span class="donate_txt">
			   &uarr;<br>
			   <%=theme.donate_message%>
			</span>
		</div>
		<div id="donate_guide" class="donate_bar hidden" >
			<!-- 支付宝打赏图案 -->
			<img src="/photos/donate/zhifubao.jpg" alt="支付宝打赏"> 
			<!-- 微信打赏图案 -->
			<img src="/photos/donate/weixin.png" alt="微信打赏">  
		</div>
		<script>
		document.getElementById('btn_donate').onclick = function(){
			$('#donate_board').addClass('hidden');
			$('#donate_guide').removeClass('hidden');
		}
		document.getElementById('donate_guide').onclick = function(){
			$('#donate_guide').addClass('hidden');
			$('#donate_board').removeClass('hidden');
		}
		</script>
	 </div>
<! -- 添加捐赠图标 -->
```
### 第二步： 编写打赏模块的样式
`themes\hexo-theme-shana-master\source\css\_partial` 下新建 `donate.styl` 输入如下内容：
``` bash
.donate_bar {
	text-align: center;
	margin-top: 5%
}

.donate_bar a.btn_donate {
	display: inline-block;
	width: 82px;
	height: 82px;
	margin-left: auto;
	margin-right: auto;
	background: url(http://img.t.sinajs.cn/t5/style/images/apps_PRF/e_media/btn_reward.gif)no-repeat;
	-webkit-transition: background 0s;
	-moz-transition: background 0s;
	-o-transition: background 0s;
	-ms-transition: background 0s;
	transition: background 0s
}

.donate_bar a.btn_donate:hover {
	background-position: 0 -82px
}

.donate_bar .donate_txt {
	display: block;
	color: #9d9d9d;
	font: 14px/2 "Microsoft Yahei"
}

.donate_bar.hidden{
	display: none
}

.post-donate{
	margin-top: 80px;
}

#donate_guide{
	height: 210px;
	width: 420px;
	margin: 0 auto;
}

#donate_guide img{
	height: 200px;
	height: 200px;
}
```
最后，记得在 `style.styl` 中添加 @import `_partial/donate` 
### 第三步： 讲打赏模块整合到文章中
在 `themes\hexo-theme-shana-master\layout\_partial\article.ejs` 中的 `<article> </article>` 标签内添加如下内容：
```
<% if (!index && theme.donate && post.donate){ %>
	<%- partial('donate/donate') %>
<% } %>
```
### 第四步： 编写配置文件
我们在`\themes\hexo-theme-shana-master\_config.yml`主题文件中关闭和打开打赏功能，还可以自定义设置打赏文案。
```
#是否开启打赏功能
donate: true
#打赏文案
donate_message: 欣赏此文？求鼓励，求支持！
```
如果我们要针对某一篇文章关闭打赏功能的话，只需要在该篇文章上添加 donate: false 代码即可。

大功告成！
个人博客：[去年夏天](https://lastsummer.top)
推荐博客：[Hexo博客添加打赏功能](http://lastsummer.top/blog/2018/10/25/Hexo博客添加打赏功能/)
参考博客：[Hexo 博客添加打赏功能](http://cighao.com/2016/02/23/add-donate-to-hexo/)
---
title: Hexo博客添加返回顶部按钮
date: 2018-11-06 17:49:51
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Html
---
Hexo博客添加返回顶部按钮。
<!-- more -->
![效果展示](/top1.png)
### 返回顶部模块代码
```
<div class="top gongyong">
    <a href="javascript:void(0);">顶部</a>
</div>
<div class="bottom gongyong">
    <a href="javascript:void(0);">底部</a>
</div>
<style>
body {
	position:relative;
}
.gongyong a {
	width:50px;
	height:50px;
	background:#fff;
	color:#000;
	position:fixed;
	text-align:center;
	line-height:50px;
	right:2%;
	text-decoration:none;
	transition:all 0.5s;
	display:none;
}
.top a {
	top:70%;
}
.bottom a {
	top:80%;
}
.gongyong a.hover {
	background:#e14da0;
}
</style>
<script>
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 300) {
            $('.gongyong a').fadeIn(600);
        } else {
            $('.gongyong a').fadeOut(600);
        }
    });
    $('.gongyong a').hover(function() {
        $(this).addClass('hover');
    }, function() {
        $(this).removeClass('hover');
    });
    $('.top a').click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    });
    $('.bottom a').click(function() {
        $("html,body").animate({
            scrollTop: $(document).height()
        }, 500);
    });
});
</script>
```
大功告成！
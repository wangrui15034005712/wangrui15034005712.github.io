---
title: Hexo博客实现站内搜索
date: 2018-10-29 14:32:32
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Nodejs
	 - Html
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当博文慢慢变多的时候，标签和分类已经不能提供太大的作用，无法准确的定位到自己想要看的博客上去，所以添加一个本站内搜索功能是很有必要的，以 hexo-theme-shana-master 主题为例。Hexo提供的Local Search,原理是通过hexo-generator-search插件在本地生成一个search.xml文件，搜索的时候从这个文件中根据关键字检索出相应的链接。
<!-- more -->
![效果展示](/search.png)
## 基本思路
```
利用插件hexo-generator-search生成xml文件
利用jQuery.ajax解析xml
寻找所用主题对应文件修改
```
## 主要步骤
### 安装插件
直接在自己的博客文件夹下（我的是Hexo）点击鼠标右键选择Git Bash Here
```
cnpm install hexo-generator-search --save
cnpm install hexo-generator-searchdb --save
```
### 修改站点配置文件
博客Hexo下的_config.yml文件，进行编辑。
```
#搜索
search:
  path: search.xml	#生成的路径
  field: post
  format: html
  limit: 10000
```
### 编写站内搜索模块的代码(index.ejs)
```
<div id="site_search" align='center' style="margin:15px 0 0 0;">
  <input type="text" id="local-search-input" name="q" results="0" placeholder="本站搜索" style='width:180px;height:25px;'/>
  <div id="local-search-result"></div>
</div>
<script src="//apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
<script>
var searchFunc = function(path, search_id, content_id) {'use strict';
$.ajax({
	url : path,
	dataType : "xml",
	success : function(xmlResponse) {
		// get the contents from search data
		var datas = $("entry", xmlResponse).map(function() {
			return {
				title : $("title", this).text(),
				content : $("content", this).text(),
				url : $("url", this).text()
			};
		}).get();
		var $input = document.getElementById(search_id);
		var $resultContent = document.getElementById(content_id);
		$input.addEventListener('input',
		function() {
		var str = '<ul class=\"search-result-list\">';
		var keywords = this.value.trim().toLowerCase().split(
				/[\s\-]+/);
		$resultContent.innerHTML = "";
		if (this.value.trim().length <= 0) {
			return;
		}
		// perform local searching
		datas.forEach(function(data) {
			var isMatch = true;
			var content_index = [];
			var data_title = data.title.trim().toLowerCase();
			var data_content = data.content.trim().replace(
					/<[^>]+>/g, "").toLowerCase();
			var data_url = data.url;
			var index_title = -1;
			var index_content = -1;
			var first_occur = -1;
			// only match artiles with not empty titles and contents
			if (data_title != '' && data_content != '') {
				keywords.forEach(function(keyword, i) {
					index_title = data_title.indexOf(keyword);
					index_content = data_content.indexOf(keyword);
					if (index_title < 0 && index_content < 0) {
						isMatch = false;
					} else {
						if (index_content < 0) {
							index_content = 0;
						}
						if (i == 0) {
							first_occur = index_content;
						}
					}
				});
			}
			// show search results
			if (isMatch) {
				str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
				var content = data.content.trim().replace(
						/<[^>]+>/g, "");
				if (first_occur >= 0) {
					// cut out 100 characters
					var start = first_occur - 20;
					var end = first_occur + 80;
					if (start < 0) {
						start = 0;
					}
					if (start == 0) {
						end = 100;
					}
					if (end > content.length) {
						end = content.length;
					}
					var match_content = content.substr(start,
							end);
					// highlight all keywords
					keywords.forEach(function(keyword) {
						var regS = new RegExp(keyword, "gi");
						match_content = match_content.replace(
								regS,
								"<em class=\"search-keyword\">"
										+ keyword + "</em>");
					});

					str += "<p class=\"search-result\">"
							+ match_content + "...</p>"
				}
				str += "</li>";
			}
		});
		str += "</ul>";
		$resultContent.innerHTML = str;
	});
	}
});
}

var search_path = "<%= config.search.searchpath %>";
if (search_path.length == 0) {
	search_path = "search.xml";
}
var path = "/" + search_path;
searchFunc(path, 'local-search-input', 'local-search-result');
</script>
```

大功告成！
个人博客：[去年夏天](https://lastsummer.top)
推荐博客：[Hexo博客添加文章目录](http://lastsummer.top/blog/2018/10/29/Hexo博客实现站内搜索/)
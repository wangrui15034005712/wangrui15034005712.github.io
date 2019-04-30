---
title: Hexo+Github实现相册功能
date: 2019-04-26 09:22:12
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Github
	 - Hexo
	 - Python
---
### Hexo+Github+Python实现相册功能
最终效果请看这里	https://lastsummer.top/blog/photos/
我使用的主题是`hexo-theme-shana-master`,该主题没有集成相册功能，自己上网查了些资料,摸索摸索,终于搭建好了。<!-- more -->
### 实现方案
在github上新建一个仓库，主要用于存储图片，可以通过url访问到，也方便管理（后期可以在七牛云上进行图片储存）
将要放到相册的图片处理成json格式的数据，然后进行访问，这里json的格式需要配合要使用的样式，所以需要处理成特定格式的json数据，下面会给出图片裁剪，因为相册显示的样式最好是正方形的的图片，这里使用脚本处理一下图片压缩，相册显示的图片是压缩后的图片，提高加载的速度，打开后的图片是原图。
#### 新建一个仓库存储图片
源码下载地址`https://github.com/wangrui15034005712/Blog-Back-Up`
建立一个用于存储相册的仓库，我这里建立了名为Blog-Back-Up的仓库（和博客地址同一目录）
<b>重点</b> 修改Blog-Back-Up中blog_photos_copy的ins.js文件，主要是里面的render函数，修改成自己的Github图片路径,这个链接很多人输入错了，不是直接的图片url，是github需要点“download”才能看到的url。
![download文件](/photo.png)
```
var minSrc = 'https://raw.githubusercontent.com/wangrui15034005712/Blog-Back-Up/master/min_photos/' + data.link[i];
var src = 'https://raw.githubusercontent.com/wangrui15034005712/Blog-Back-Up/master/photos/' + data.link[i];
```
![修改ins.js文件](/photo1.png)
<b>重点</b> 修改Blog-Back-Up中tool.py文件
```
# 把json文件发布到自己的博客中
with open("../Hexo/source/photos/data.json","w") as fp:
        json.dump(final_dict, fp)
# 我设置的是本地博客路径如 D:\User\Hexo\source\photos\data.json
# 把下载的博客Blog-Back-Up上传至自己新创建的仓库
# 把自己的相册图片放入到Blog-Back-Up的photos中
# DOS命令执行 Python tool.py 命令压缩图片到min_photos及json并且发布到Github
# 如果报错自行百度python等问题（缺少模块、版本不对）
```
#### 修改Hexo博客
在Hexo目录中打开DOS命令创建新的相册菜单`hexo new page "photos"`
```
hexo new page "photos"
```
之后，去下载“empty.png” [点击这里，右键保存下载](https://raw.githubusercontent.com/wangrui15034005712/blog/master/assets/img/empty.png)
在Hexo本地仓库source下新建一个文件夹命名为assets,再在assets下新建一个文件夹命名为img。最后把empty.png放到img里面。
把之前clone下来的Blog-Back-Up下blog_photos_copy的所有文件copy到Hexo本地仓库source中的photo文件夹下
如无法显示，可能是图片路径，网络传输较慢，js、css样式待优化，小编自己的样式是经过调整的。
有问题可以在下方评论区评论。
个人博客：[去年夏天](https://lastsummer.top)
参考博客：[hexo+yilia完美实现相册功能](https://blog.csdn.net/wardseptember/article/details/82780684)
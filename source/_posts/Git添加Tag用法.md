---
title: Git添加Tag用法
date: 2018-11-14 14:40:20
comments: true
donate: true
toc: true
categories: Git
tags: #文章標籤 可以省略
	 - Git
---
作为版本管理工具，Git可以对某个版本打上标签(tag)，表示本版本为发行版。这样一个不可修改的历史代码版本就像被我们封存起来一样,不论是运维发布拉取,或者以后的代码版本管理,都是十分方便的。
<!-- more -->
Git标签分为两类：
1、轻量级的：它其实是一个独立的分支,或者说是一个不可变的分支.指向特定提交对象的引用
2、带附注的：实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证,电子邮件地址和日期，一般我们都建议使用含附注型的标签，以便保留相关信息
## 查看标签
### 打印所有标签
```
git tag
```
### 打印符合检索条件的标签
```
git tag -l <版本号>
```
如 `git tag -l 1.*.*` 为搜索一级版本为1的版本
### 查看对应标签状态
```
git checkout <版本号>
```
## 创建本地标签
### 创建轻量标签
轻量标签指向一个发行版的分支，其只是一个像某commit的引用，不存储名称时间戳及标签说明等信息。定义方法如下
```
git tag <版本号>-light
```
### 创建带附注标签
相对于轻量标签，附注标签是一个独立的标签对象，包含了名称时间戳以及标签备注等信息，同时指向对应的commit。定义方法如下
```
git tag -a <版本号> -m "<备注信息>"
```
同时我们也可以像特定的commit添加标签，使用该commit对应的SHA值即可
```
git tag -a <版本号> <SHA值> -m "<备注信息>"
```
比如 `git tag -a 1.0.0 0c3b62d -m "Release Edition v1.0.0"` 就是为SHA为0c3b62d的这次提交打了1.0发行版的tag
## 删除标签
### 删除本地标签
```
git tag -d <版本号>
```
### 删除远程仓库的标签
```
git push origin --delete <版本号> 	#新版本Git (> v1.7.0)
```

## 推送标签
### 推送所有标签
```
git push origin --tags
```
### 推送指定版本的标签
```
git push origin <版本号>
```
## 总结
最后总结一下常用命令，方便查阅。
```
// 创建标签(本地)
// 创建轻量标签
git tag 1.0.0-light
// 创建带备注标签(推荐)
git tag -a 1.0.0 -m "这是备注信息"
// 针对特定commit版本SHA创建标签
git tag -a 1.0.0 0c3b62d -m "这是备注信息"

// 查看标签
// 打印所有标签
git tag
// 打印符合检索条件的标签
git tag -l 1.*.*
// 查看对应标签状态
git checkout 1.0.0

// 将本地标签发布到远程仓库
// 发送所有
git push origin --tags
// 指定版本发送
git push origin 1.0.0

// 删除标签(本地)
git tag -d 1.0.0

// 删除远程仓库对应标签
// Git版本 > V1.7.0
git push origin --delete 1.0.0
// 旧版本Git
git push origin :refs/tags/1.0.0
```

参考博客：[使用Git添加Tag的方法](https://www.jianshu.com/p/8956a9cfa9da)
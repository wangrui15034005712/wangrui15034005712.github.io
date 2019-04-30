---
title: Git基本命令
date: 2019-03-04 14:02:46
comments: true
donate: true
toc: true
categories: Git
tags: #文章標籤 可以省略
	 - Git
---
Git命令行基本操作！
<!-- more -->
### git config可以配置git的参数
```
git config --list 查看已经配置的git参数
git config --system user.name "Tocy"	所有用户（本系统）
git config --system user.email zyvj@qq.com	所有用户（本系统）
git config --global user.name "Tocy"	当前用户（全局）
git config --global user.email zyvj@qq.com	当前用户（全局）
git config --local user.name "Tocy"		本地配置（当前目录）
git config --local user.email zyvj@qq.com  本地配置（当前目录）
```
### 创建Git仓库
```
git init	初始化当前目录
```
### 克隆Git仓库
```
git clone https://git.oschina.net/Tocy/SampleCode.git
```
### 基本命令
```
git status	# 检查下修改了什么内容
git log --stat      # 仅显示摘要选项
git log --pretty=oneline        # 定制记录格式
git log --graph     # 图像化分支和版本更新
git add . # 提交所有文件到暂存区
git add Readme.md
git add *.png
git add /home/code/
git diff # 查看当前目录的所有修改
git commit -m "注释备注" # 提交代码到本地仓库
git push # 提交代码到远程仓库
git branch # 显示本地当前所有分支
git branch -d test # 删除分支
git branch -D test # 强制删除分支
git checkout -b testing # 直接切换并创建分支
git checkout master # 切换主分支
git merge test # 合并分支的代码
git branch -a # 查看远程仓库所有分支
git push origin test # 推送本地分支到远程仓库
git push  origin --delete test # 删除远程分支
git checkout "git status项目文件路径" # 还原某个文件
git reset --hard 'git log中的commit id'	还原所有文件到一个版本
git pull # 更新远程仓库最新代码
git reset HEAD "文件路径"     # 撤回暂存区的某个文件
git reset HEAD~     # 撤回本地仓库中的代码到暂存区
git reset	# 撤回所有本地仓库中的代码到暂存区
git rm --cached you_file_name # 撤回暂存区中的代码（暂未使用）
git merge dev	--合并分支dev的代码（Fast-forward表示快进模式，合并速度快，会直接将Master分支指向Develop分支）
git merge --no-ff dev # 正常工作 master生成新节点，保证版本演变的清晰，建议此方法
```
---
title: Hexo实现github+coding双线部署
date: 2018-11-08 15:15:48
comments: true
donate: true
toc: true
categories: hexo
tags: #文章標籤 可以省略
	 - Github
	 - Coding
---
Hexo是一个开源的静态博客框架，支持markdown文档，应用起来很方便而且有丰富的主题模板可供选择，是建立个性化的个人博客的不二之选，因为GitHub在国内访问速度较慢，因此选择Coding.从网上搜索的结果来看，很多人都认为github博客在国内的seo情况不太好，不被百度爬虫所青睐。一个比较好的方案是，同时将hexo博客部署到github和Coding上。 
<!-- more -->
### 第一步：注册[Coding](https://coding.net/)账号
### 第二步：Coding应用配置
![项目-项目名称-创建项目](/coding1.png)
### 第三步：配置SSH公钥
我们要想生成SSH key，首先就得先安装 SSH，对于 Linux 和 Mac 系统，其默认是安装 SSH 的，而对于 Windows 系统，其默认是不安装 SSH 的，不过由于我们安装了 Git Bash，其也应该自带了 SSH. 可以通过在 Git Bash 中输入ssh命令，查看本机是否安装 SSH：
 ![查看是否安装ssh](/ssh0.png)
初次使用git的用户要使用git协议大概需要三个步骤：
一、生成密钥对
二、设置远程仓库（本文以github为例）上的公钥
三、把git的 remote url 修改为git协议（以上两个步骤初次设置过以后，以后使用都不需要再次设置，此步骤视以后项目的remote url而定，如果以后其他项目的协议为https则需要此步骤）
打开Hexo安装目录，右键git bash here点击
![输入cd ~/.ssh回车-看你是否有了ssh key 密钥，有了就备份](/ssh1.png)
![生成密钥](/ssh2.png)
打开你的id_rsa.pub文件，复制下里面的内容，然后登录进去你的coding；
![密钥位置C:\Users\用户名\.ssh](/coding3.png)
![个人设置-SSH公钥-新增公钥](/coding2.png)
![把id_rsa.pub内容复制到公式内容-添加即可](/coding4.png)
### 第四步：初始化部署仓库
![三种基本初始化方法](/coding5.png)
![复制](/coding6.png)
- 修改博客站点_config.yml

```
# Deployment
## Docs: https://hexo.io/docs/deployment.html
#（修改coding的路径，实现coding及github同时部署）
deploy:
- type: git
  repository: 
    github: git@github.com:wangrui15034005712/blog.git,master
    coding: https://git.dev.tencent.com/wangrui15034005712/demo.git,master
```
- 在gitbash上输入hexo clean 、hexo g再hexo d
这样你的博客就被部署到Coding上了
![pages服务-一键开启pages服务](/coding7.png)
![](/coding8.png)
### 第五步：域名配置
进入域名控制台，如有不理解之处可查看[Hexo-Github搭建个人博客二](https://lastsummer.top/blog/2018/10/19/Hexo-Github搭建个人博客二)
![按图片配置成功即可，先配置Coding再配置Gihub，否则域名未连通](/coding10.png)
![点击设置-绑定新域名-确定](/coding9.png)

大功告成！

个人博客：[去年夏天](https://lastsummer.top)
参考博客：[hexo+github打造个人博客系列之Coding托管（实现github+coding双线部署）](https://blog.csdn.net/weixin_41196185/article/details/79234078)

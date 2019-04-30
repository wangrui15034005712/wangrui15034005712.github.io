---
title: Window10安装RabbitMq中间件
date: 2019-04-17 15:21:40
comments: true
donate: true
toc: true
categories: RabbitMq
tags: #文章標籤 可以省略
	 - RabbitMq
	 - Queue
---
### 简介
Rabbit MQ是一个在AMQP协议标准基础上完整的，可服用的企业消息系统；
它遵循Mozilla Public License开源协议，采用 Erlang 实现的工业级的消息队列(MQ)服务器，Rabbit MQ 是建立在Erlang OTP平台上；
Erlang语言阻止了大量的 Java 工程师去深入研究和掌控它，对公司而言，几乎处于不可控的状态，但是是开源的，比较稳定的社区支持，活跃度也高;
AMQP（高级消息队列协议）是一个异步消息传递所使用应用层协议规范，为面向消息中间件设计，基于此协议的客户端与消息中间件可以无视消息来源传递消息，不受客户端、消息中间件、不同的开发语言环境等条件的限制；
支持主流操作系统：Linux、Windows，MacOX等；
支持多种客户端开发语言：Java、Python、Ruby、.NET，PHP、C/C++、Node.js等。
<!-- more -->
### 安装 Erlang 及 Rabbit MQ<font color=red>（安装路径不允许出现空格）</font>
Erlang 小编使用的是 `otp_win64_21.3` ，需要其他版本或者32位系统的，可以去 [Erlang官网下载](http://www.erlang.org/downloads)。
全部点击“下一步”就行。（安装完成）
进入CMD窗口，
安装成功后，确认一下是否有系统环境变量。
打开Dos窗口,输入 `erl` 查看Erlang版本（如果可以查看版本，则掠过下方环境配置）
变量名：`ERLANG_HOME`，变量值：`Erlang安装路径`。
![配置ERLANG_HOME环境变量](/rabbitmq1.png)
![配置PATH环境变量](/rabbitmq2.png)
Rabbit MQ 小编使用的是 `rabbitmq-server-3.7.14`，需要其他版本或者32位系统的，可以去[Rabbit MQ官网下载](http://www.erlang.org/downloads)。
![Rabbit MQ官网下载按需下载](/rabbitmq3.png)
全部点击“下一步”就行。（安装完成）
激活 `RabbitMQ's Management Plugin` 管理界面
打开Dos窗口,输入命令：
`"D:\Program Files\RabbitMQ Server\rabbitmq_server-3.7.14\sbin\rabbitmq-plugins.bat" enable rabbitmq_management`
![RabbitMQ's Management Plugin启动成功（启动6个插件）](/rabbitmq4.png)
rabbitmq必须用管理员用户启动（也可配置普通用户启动、暂未使用此方法）
![普通管理员启动错误](/rabbitmq5.png)
可以在Windows10系统的开始菜单上，单击鼠标右键，这时候出现的菜单中，我们选择命令提示符（管理员）点击打开这样即可。
![管理员打开Dos窗口](/rabbitmq6.png)
![Rabbit MQ启动关闭命令](/rabbitmq7.png)
```
erl #查看Erlang版本
rabbitmqctl status #查看了啊RabbitMQ版本
net start rabbitmq #启动RabbitMQ命令
net stop rabbitmq #关闭RabbitMQ命令
127.0.0.1:15672 #访问RabbitMQ管理界面 默认用户名 guest 密码 guest
默认监听端口：15672（在3.0版本之前是55672端口）
rabbitmq-plugins enable rabbitmq_web_stomp rabbitmq_web_stomp_examples
rabbitmq-plugins enable rabbitmq_management rabbitmq_web_stomp rabbitmq_stomp rabbitmq_web_stomp_examples
"/d/Program Files/RabbitMQ Server/rabbitmq_server-3.7.14/sbin/rabbitmq-plugins.bat" enable rabbitmq_web_stomp rabbitmq_web_stomp_examples
"/d/Program Files/RabbitMQ Server/rabbitmq_server-3.7.14/sbin/rabbitmqctl.bat" startus
"/d/Program Files/RabbitMQ Server/rabbitmq_server-3.7.14/sbin/rabbitmqctl.bat" list_queues
```
![Rabbit MQ管理员界面](/rabbitmq8.png)
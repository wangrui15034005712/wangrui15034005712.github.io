---
title: Nginx+Tomcat+Redis（负载均衡+session共享+动静分离）案例
date: 2019-04-29 14:30:08
comments: true
donate: true
toc: true
categories: java
tags: #文章標籤 可以省略
	 - Nginx
	 - Tomcat
	 - Redis
---
今天整合了一些资源，做了一个Nginx+Tomcat+Redis（负载均衡+session共享+动静分离）完整案例，使部署的web项目能够承载较大的访问压力，Nginx实现负载均衡及动静分离，并使用Redis实现session共享。
<!-- more -->
![各版本如图所示](/nginx1.png)
#### 警告注意
redis实现session共享，需要三个jar包（如果报错就是版本不符合，放入tomcat文件夹下的lib中）
tomcat-redis-session-manager1.2.jar
commons-pool2-2.4.1.jar
jedis-2.6.2.jar
#### 完整步骤
##### Tomcat集群
复制多个tomcat文件，修改server.xml，修改其中的8005、8080、8009端口号（nginx和tomcat解压路径最好再同一目录D:/User/nginxTest）
在多个tomcat的webapps下新建nginx文件夹，在nginx下新建index.jsp(多个jsp修改`<h2>Nginx动静分离2</h2>`)，代码如下
```
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<head>
	<link href="/nginx/css/index.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/nginx/js/index.js"></script>
</head>
<body>
<h2>Nginx动静分离</h2>
<% 
  out.println("["+request.getLocalAddr()+":" +request.getLocalPort()+"]" + "<br/>session id:" + session.getId());  
%>
<!--当前的css、js、图片均来自nginx的静态文件-->
<br/>
<img alt="图片" src="/nginx/img/1.png" style="width:300px;height:300px">
<br>
<%
  HttpSession mySession = request.getSession(false);
  if(mySession.getAttribute("appname") == null){
	  mySession = request.getSession(true);
	  mySession.setAttribute("appname", "AAA111");
	  out.println("new session:"+mySession.getAttribute("appname"));
  }else{
  	  out.println("old session:"+mySession.getAttribute("appname"));
  }
%>
</body>
</html>
```
##### 动静分离的 Nginx 配置
安装Nginx：
我使用的Nginx为绿色版本，双击即可开启（安装路径 D:/User/nginxTest/nginx）
![nginx目录结构](/nginx2.png)
修改 conf nginx.conf 配置文件，多个Tomcat服务器都是在这里配置：
```
upstream test {
	server 127.0.0.1:8080 weight=2;
	server 127.0.0.1:8081 weight=1;
	#配置多个tomcat，负载均衡
}
server {
  listen       80;
	server_name	localhost;

  #charset koi8-r;

  #access_log  logs/host.access.log  main;
	
	location / {
    index  index.html index.htm;
  }
	
	# 所有动态请求都转发给tomcat处理 
	location ~ \.(jsp|do)$ { 
		proxy_next_upstream http_502 http_504 error timeout invalid_header;
		proxy_pass http://test;
	} 
	 
	#静态文件交给nginx处理
	location ~ .*\.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$
	{
		# 绝对路径
		root  D:/User/nginxTest/nginx/webapps;
	}
	#静态文件交给nginx处理
	location ~ .*\.(js|css)?$
	{
		# 绝对路径
		root D:/User/nginxTest/nginx/webapps;
	}
}
```
由于静态文件都在`D:/User/nginxTest/nginx/webapps`中，在nginx文件夹下新建webapps，继续新建jsp中的路径`/nginx/img/1.png`、`/nginx/css/index.css`、`/nginx/js/index.js`
现在动静分离和负载均衡就配置成功了，下面开始redis共享session
把前文提到的三个包加入到所有tomcat的lib中。
修改tomcat的conf中的context.xml，添加代码如下:
```
	<Valve className="com.orangefunction.tomcat.redissessions.RedisSessionHandlerValve" />  
    <Manager className="com.orangefunction.tomcat.redissessions.RedisSessionManager"  
         host="localhost"   
         port="6379"
         password="admin"	<!--redis密码，需要修改redis.window.conf文件--》
         database="0"
         maxInactiveInterval="60" />
```
##### redis共享session
安装redis：
我使用的redis为绿色版本，双击即可开启（安装路径 D:/User/nginxTest/redis）
![redis目录结构](/redis1.png)
修改redis.windows.conf文件
```
# requirepass foobared redis密码
requirepass admin
```
启动redis，`redis-server.exe redis.windows.conf`
大功告成！
session默认时间是30秒，可修改tomcat下的web.xml，根据实际情况调整
```
<session-config>
  <session-timeout>60</session-timeout><!--默认是30秒-->
</session-config>
```
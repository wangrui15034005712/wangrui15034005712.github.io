---
title: zookeeper安装和使用 windows环境
date: 2018-10-30 17:37:43
comments: true
donate: true
toc: true
categories: RPC
tags: #文章標籤 可以省略
	 - Zookeeper
---
## 简介
1、ZooKeeper是一个分布式的，开放源码的分布式应用程序协调服务，是Google的Chubby一个开源的实现，是Hadoop和Hbase的重要组件。它是一个为分布式应用提供一致性服务的软件，提供的功能包括：配置维护、域名服务、分布式同步、组服务等。<!-- more -->
2、ZooKeeper的目标就是封装好复杂易出错的关键服务，将简单易用的接口和性能高效、功能稳定的系统提供给用户。
3、ZooKeeper包含一个简单的原语集，提供Java和C的接口。
4、ZooKeeper代码版本中，提供了分布式独享锁、选举、队列的接口，代码在zookeeper-3.4.12\src\recipes。其中分布锁和队列有Java和C两个版本，选举只有Java版本。
## 下载
Apache官方最新版本为：3.4.12
下载地址：http://mirror.bit.edu.cn/apache/zookeeper/stable/zookeeper-3.4.12.tar.gz
## 安装
解压到指定目录下    D:\dubbo\zookeeper-3.4.12
修改zoo_sample.cfg 文件名(D:\dubbo\zookeeper-3.4.12\conf) 为 zoo.cfg
主要修改一下日志位置，具体配置文件如下：
```
# The number of milliseconds of each tick
#tickTime：这个时间是作为 Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳。  
#默认情况下最小的会话超时时间为两倍的tickTime  
tickTime=2000
# The number of ticks that the initial   
# synchronization phase can take  
#zookeeper集群中的包含多台server, 其中一台为leader, 集群中其余的server为follower. initLimit参数配置初始化连接时,   
#follower和leader之间的最长心跳时间. 此时该参数设置为5, 说明时间限制为5倍tickTime, 即5*2000=10000ms=10s.  
initLimit=10
# The number of ticks that can pass between 
# sending a request and getting an acknowledgement
#该参数配置leader和follower之间发送消息, 请求和应答的最大时间长度. 此时该参数设置为2, 说明时间限制为2倍tickTime, 即4000ms.  
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just 
# example sakes.
#dataDir：顾名思义就是 Zookeeper 保存数据的目录，默认情况下，Zookeeper 将写数据的日志文件也保存在这个目录里。  
dataDir=D:\\dubbo\\zookeeper-3.4.12-1\\data
#dataLogDir：顾名思义就是 Zookeeper 保存日志文件的目录  
dataLogDir=D:\\dubbo\\zookeeper-3.4.12-1\\log
# the port at which the clients will connect
#clientPort：这个端口就是客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。  
clientPort=2181
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns：限制连接到 ZooKeeper 的客户端的数量  
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the 
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1
```
配置文件简单解析
1、tickTime：这个时间是作为 Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳。
2、dataDir：顾名思义就是 Zookeeper 保存数据的目录，默认情况下，Zookeeper 将写数据的日志文件也保存在这个目录里。
3、dataLogDir：顾名思义就是 Zookeeper 保存日志文件的目录
4、clientPort：这个端口就是客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。
## 启动
进入到bin目录，并且启动zkServer.cmd，这个脚本中会启动一个java进程(不可关闭，造成客户端无法访问)
![](/zookeeper1.png)
启动后jps可以看到QuorumPeerMain的进程
![](/zookeeper2.png)
也可以启动客户端连接一下
![](/zookeeper3.png)
OK，安装成功，很简单。

个人博客：[去年夏天](https://lastsummer.top)
参考博客：[zookeeper安装和使用 windows环境](https://blog.csdn.net/tlk20071/article/details/52028945)

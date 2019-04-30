---
title: RabbitMq入门及六种模式讲解
date: 2019-04-23 16:25:52
comments: true
donate: true
toc: true
categories: RabbitMq
tags: #文章標籤 可以省略
	 - 简单模式 Hello World
	 - 工作模式 Work Queue
	 - 发布/订阅模式 Publish/Subscribe
	 - 路由模式 Routing
	 - 通配符模式 Topic
	 - 分布式 RPC
---
### RabbitMQ 术语说明：
Server(Broker):接收客户端连接，实现AMQP协议的消息队列和路由功能的进程；
Virtual Host：虚拟主机的概念，类似权限控制组，一个Virtual Host里可以有多个Exchange和Queue,权限控制的最小丽都是Virtual Host；
Exchange:交换机，接收生产者发送的消息，并根据Routing Key将消息路由到服务器中的队列Queue。
ExchangeType:交换机类型决定了路由消息行为，RabbitMQ中有三种类型Exchange，分别是fanout、direct、topic；
Message Queue：消息队列，用于存储还未被消费者消费的消息；
Message：由Header和body组成，Header是由生产者添加的各种属性的集合，包括Message是否被持久化、优先级是多少、由哪个Message Queue接收等；body是真正需要发送的数据内容；
BindingKey：绑定关键字，将一个特定的Exchange和一个特定的Queue绑定起来。
<!-- more -->
### RabbitMQ 五种队列模式与(SpringBoot)实例
##### 在pom.xml中添加相关依赖
```
<!--消息队列模块-->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```
##### 修改application.properties
在application.properties添加rabbitmq的相关信息（默认账号密码guest）：
```
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```
#### 简单模式 Hello World + 工作模式
简单模式：一个生产者P发送消息到队列hello,一个消费者C接收
##### 一对一的使用配置
一对一，一个发送者发送消息，一个接受者接受消息。
````
package com.example.springboot.test1;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author: wangrui
 * @Description: 队列配置，队列的名称，发送者和接受者的名称必须一致，否则接收不到消息
 * @Date: 2019/4/26 16：54
 */
@Configuration
public class RabbitMqConfig {

  public Queue Queue1() {
    return new Queue("lyhTest1");
  }

}
````
<p></p>

`````
package com.example.springboot.test1;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

/**
 * @Author: wangrui
 * @Description: 发送者通过Controller类发送消息：
 * @Date: 2019/4/26 16：54
 */
@RestController
public class SendController {

  @Autowired
  private AmqpTemplate amqpTemplate;

  //一对一
  @RequestMapping("/send")
  public String send(){
    String content="Date:"+new Date();
    amqpTemplate.convertAndSend("lyhTest1",content);
    return content;
  }

}
`````
<p></p>

``````
package com.example.springboot.test1;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @Author: wangrui
 * @Description: 接收者Receiver1类接收信息
 * @Date: 2019/4/26 16：54
 */
@Component
@RabbitListener(queues = "lyhTest1")
public class Receiver1 {

  @RabbitHandler
  public void receiver(String msg){
    System.out.println("Test1 receiver1:"+msg);
  }

}
``````
测试：浏览器访问地址：http://localhost:8080/send
终端输出Receiver1接收的内容
查看RabbitMQ的Web客户端http://localhost:15672 可以在列表里看到之前创建的队列。
##### 一对多的使用配置
一对多，一个发送者发送消息，多个接受者接受同一个消息，添加新的接收者Receiver2。
```
package com.example.springboot.test1;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "lyhTest1")
//这里的lyhTest2是多对多，如果要测试一对多改成lyhTest1
public class Receiver2 {

    @RabbitHandler
    public void receiver(String msg){
        System.out.println("Test1 receiver2:"+msg);
    }
    
}
```
在SendController添加一对多发送方法
```
//可以看到发送者发送一个消息被多个接收者接收，注意这里的消息只能被消费一次（一对多）
@RequestMapping("/multiSend")
public String multiSend(){
  StringBuilder times=new StringBuilder();
  for(int i=0;i<10;i++){
    long time=System.nanoTime();
    amqpTemplate.convertAndSend("lyhTest1","第"+i+"次发送的时间："+time);
    times.append(time+"<br>");
  }
  return times.toString();
}
```
测试，浏览器访问http://localhost:8080/multiSend
##### 多对多的使用配置
在配置类RabbbitMqConfig添加新的队列名lyhTest2
```
@Configuration
public class RabbitMqConfig {

	@Bean
	public Queue Queue1() {
	  return new Queue("lyhTest1");
	}

	@Bean
	public Queue Queue2() {
	  return new Queue("lyhTest2");
	}

}
```
修改Receiver2接收队列名为lyhTest2
```
@Component
@RabbitListener(queues = "lyhTest2")
//这里的lyhTest2是多对多，如果要测试一对多改成lyhTest1
public class Receiver2 {

	@RabbitHandler
	public void receiver(String msg){
	  System.out.println("Test1 receiver2:"+msg);
	}

}
```
在SendController添加多对多发送消息的方法
```
@RequestMapping("/multi2MultiSend")
public String mutil2MutilSend(){
	StringBuilder times=new StringBuilder();
	for(int i=0;i<10;i++){
	  long time=System.nanoTime();
	  amqpTemplate.convertAndSend("lyhTest1","第"+i+"次发送的时间："+time);
	  amqpTemplate.convertAndSend("lyhTest2","第"+i+"次发送的时间："+time);
	  times.append(time+"<br>");
	}
	return times.toString();
}
```
测试，浏览器访问：http://localhost:8080/multi2MultiSend
#### Topic Exchange（自定义程度较高 通配符）
```
package com.example.springboot.test2;

  import org.springframework.amqp.core.Binding;
  import org.springframework.amqp.core.BindingBuilder;
  import org.springframework.amqp.core.Queue;
  import org.springframework.amqp.core.TopicExchange;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;

/**
 * @Author:wangrui
 * @Description:Topic Exchange配置类
 * @Date:2019/4/18 9:32
 */
@Configuration
public class RabbitMqTopicConfig {

  //只接一个topic
  final static String message = "topic.message";
  //接收多个topic
  final static String messages = "topic.messages";

  @Bean
  public Queue queueMessage() {
    return new Queue(RabbitMqTopicConfig.message);
  }

  @Bean
  public Queue queueMessages() {
    return new Queue(RabbitMqTopicConfig.messages);
  }

  @Bean
  TopicExchange exchange() {
    return new TopicExchange("exchange");
  }

  @Bean
  Binding bindingExchangeMessage(Queue queueMessage, TopicExchange exchange) {
    return BindingBuilder.bind(queueMessage).to(exchange).with("topic.message");
  }

  @Bean
  Binding bindingExchangeMessages(Queue queueMessages, TopicExchange exchange) {
    //这里的#表示零个或多个词。
    return BindingBuilder.bind(queueMessages).to(exchange).with("topic.#");
  }

}

```
<p></p>

```
package com.example.springboot.test2;


import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "topic.message")
public class TopicReceiver1 {

  @RabbitHandler
  public void process(String msg) {
    System.out.println("TopicReceiver1:" + msg);
  }

}
```
<p></p>

```
package com.example.springboot.test2;


import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "topic.messages")
public class TopicReceiver2 {

  @RabbitHandler
  public void process(String msg) {
    System.out.println("TopicReceiver2 :" + msg);
  }

}

```
<p></p>

```
package com.example.springboot.test2;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SendController1 {

  @Autowired
  private AmqpTemplate amqpTemplate;

  @RequestMapping("/topicSend1")
  public String  topicSend1() {
    String context = "my topic 1";
    System.out.println("发送者说 : " + context);
    this.amqpTemplate.convertAndSend("exchange", "topic.message", context);
    return context;
  }
  @RequestMapping("/topicSend2")
  public String topicSend2() {
    String context = "my topic 2";
    System.out.println("发送者说 : " + context);
    this.amqpTemplate.convertAndSend("exchange", "topic.messages", context);
    return  context;
  }

}

```
测试，浏览器访问：http://localhost:8080/topicSend1 输出两个消费者
测试，浏览器访问：http://localhost:8080/topicSend2 输出一个消费者
#### Fanout 广播模式，发布订阅
```
package com.example.springboot.test3;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author:wangrui
 * @Description:队列配置，队列的名称，发送者和接受者的名称必须一致，否则接收不到消息
 * @Date:2019/4/28 9:36
 */
@Configuration
public class RabbitMqFanoutConfig {
    private static String EXCHANGE_NAME = "hello111";

  //声明两个队列
  @Bean
  public Queue queue() {
    return new Queue("hello");
  }

  @Bean
  public Queue queue1() {
    return new Queue("hello1");
  }

  //声明一个fanout的交换机
  @Bean
  public FanoutExchange fanoutExchange() {
    return new FanoutExchange(EXCHANGE_NAME);
  }

  //将队列和交互机进行绑定
  @Bean
  public Binding bindfanout(Queue queue, FanoutExchange fanoutExchange) {
    return BindingBuilder.bind(queue).to(fanoutExchange);
  }

  @Bean
  public Binding bindfanout1(Queue queue1, FanoutExchange fanoutExchange) {
    return BindingBuilder.bind(queue1).to(fanoutExchange);
  }
}
```
<p></p>

```
package com.example.springboot.test3;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = "hello") //这个队列就是我们之前定义的队列名称，监听hello队列的消息
public class FanoutReceiver1 {

  @RabbitHandler
  public void receive(String message) throws InterruptedException {
    System.err.println("1:收到消息" + message);
  }

}
```
<p></p>

```
package com.example.springboot.test3;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues="hello1") //这个队列就是我们之前定义的队列名称，监听hello队列的消息
public class FanoutReceiver2 {

  @RabbitHandler
  public void receive(String message) throws InterruptedException{
    System.err.println("2收到消息:"+message);
  }

}
```
<p></p>

```
package com.example.springboot.test3;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SendController2 {

  private static String EXCHANGE_NAME = "hello111";

  @Autowired
  private AmqpTemplate amqpTemplate;

  @RequestMapping(value = "testFanout")
  public void test() throws InterruptedException {
    for (int i = 0; i < 10; i++) {
        Thread.sleep(i * 20);
        amqpTemplate.convertAndSend(EXCHANGE_NAME, "fanout", "hello word" + i);
    }
    System.err.println("消息发送成功");
  }

}

```
测试，浏览器访问：http://localhost:8080/testFanout
#### Direct 路由模式
```
package com.example.springboot.test4;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Routing 模式.配置类
 *
 * @author Administrator
 */
@Configuration
public class DirectRabbitConfig {

  @Bean
  public Queue AMessage() {
    return new Queue("direct.A");
  }

  @Bean
  public Queue BMessage() {
    return new Queue("direct.B");
  }

  @Bean
  DirectExchange directExchange() {
    return new DirectExchange("directExchange");
  }

  @Bean
  Binding bindingExchangeMessage(Queue AMessage, DirectExchange exchange) {
    return BindingBuilder.bind(AMessage).to(exchange).with("orange");
  }

  @Bean
  Binding bindingExchangeMessageBOfBlack(Queue BMessage, DirectExchange exchange) {
    return BindingBuilder.bind(BMessage).to(exchange).with("black");
  }

  @Bean
  Binding bindingExchangeMessageBOfGreen(Queue BMessage, DirectExchange exchange) {
    return BindingBuilder.bind(BMessage).to(exchange).with("green");
  }

}
```
<P></P>

```
package com.example.springboot.test4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DirectSender {


  protected static Logger logger= LoggerFactory.getLogger(DirectSender.class);

  @Autowired
  private AmqpTemplate rabbitTemplate;
  public void sendOrange() {
    String context = "hi, i am message orange";
    logger.debug("Sender : " + context);
    this.rabbitTemplate.convertAndSend("directExchange", "orange", context);
  }

  public void sendBlack() {
    String context = "hi, i am messages black";
    logger.debug("Sender : " + context);
    this.rabbitTemplate.convertAndSend("directExchange", "black", context);
  }

  public void sendGreen() {
    String context = "hi, i am messages green";
    logger.debug("Sender : " + context);
    this.rabbitTemplate.convertAndSend("directExchange", "green", context);
  }
}
```

<P></P>

```
package com.example.springboot.test4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "direct.A")
public class DirectReceiverA {

  protected static Logger logger= LoggerFactory.getLogger(DirectReceiverA.class);

  @RabbitHandler
  public void process(String message) {
    logger.debug("direct.A Receiver  : " + message);
    System.out.println("direct.A Receiver  : " + message);
  }

}
```
<P></P>

```
package com.example.springboot.test4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RabbitListener(queues = "direct.B")
public class DirectReceiverB {

  protected static Logger logger = LoggerFactory.getLogger(DirectReceiverB.class);

  @RabbitHandler
  public void process(String message) {
    logger.debug("direct.B Receiver   : " + message);
    System.out.println("direct.B Receiver  : " + message);
  }

}
```

<p></p>

```
package com.example.springboot.test4;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/routing")
public class DirectController {

    @Autowired
    private DirectSender directSender;

    @RequestMapping("/send1")
    public String send1() {
        directSender.sendOrange();
        return "send1 orange ok";
    }

    @RequestMapping("/send2")
    public String send2() {
        directSender.sendBlack();
        return "send2  black ok";
    }

    @RequestMapping("/send3")
    public String send3() {
        directSender.sendGreen();
        return "send3 green ok";
    }

}
```
测试，浏览器访问：
http://localhost:8080/routing/send1 输出： direct.A Receiver  : hi, i am message orange
http://localhost:8080/routing/send2 输出： direct.B Receiver  : hi, i am messages black
http://localhost:8080/routing/send3 输出： direct.B Receiver  : hi, i am messages green
#### RPC Request/reply（暂未使用）
RPC比较适合- 客户端调用哪个服务器比较明确 
- 调用需要立即得到返回结果 
- 架构简单 
  在一个由多个微服务构成的大系统中，某些关键服务间的调用应当在较短的时间内返回，而且各个微服务的专业化程度较高，同一个请求的关注者只有一个。这个时候就应该用RPC。   比如在一个ERP系统中，有一个管理仓储的微服务，以及一个负责订单的微服务。新建订单时需要查知当前的存货是否充足，如果不充足就通知用户；提交订单时预订指定数量的货物，如果此时货物不错，也要终止订单的提交，并通知用户。显然在这种场景下是不允许较大的延迟，否则会影响用户体验。所以应该使用RPC，及时返回仓储情况。 

MQ比较适合 
- 消息的发送者和消费者需要解耦的情况 
- 发送者并不明确谁是消费者 
- 发送者并不关心谁来消费消息 
- 各个消费者可以从不同的角度入手处理消息 
- 消费者的处理结果也不返回给发送者 
- 消息的发送和处理是异步的 
- 消息的关注者不止一个 
  在一个由多个微服务构成的大系统中，会有一些非关键服务，用来执行一些不需要立刻得到结果的计算。而且它们的计算结果并不会返回给消息的发送者。这个时候就应该使用MQ。   比如在一个ERP系统中有一些日志服务、业务监控服务等。这些服务会发布一些系统事件，针对这些事件可能有多个应用关注。对于日志服务，当系统出现某些异常情况时需要浏览日志，查找问题的根源；也可以在分析系统运行的瓶颈时提供关键数据。对于业务监控系统，例如货物入仓出仓的消息，可以被报表系统关注，生成报表；也可以被配货系统关注，及时补足所需库存。
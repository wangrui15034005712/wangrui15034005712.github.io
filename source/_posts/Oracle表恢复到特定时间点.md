---
title: Oracle表恢复到特定时间点
date: 2018-12-13 10:36:35
comments: true
donate: true
categories: ORACLE
tags: #文章標籤 可以省略
	 - SQL
---
Oracle数据库表恢复到特定时间点。<!-- more -->
```
-- Create table
create table TEST
(
  id    NUMBER(4),
  name  VARCHAR2(20),
  class VARCHAR2(20),
  score NUMBER
);
-- Insert table
insert into test values (11,'测试10','一年三班',80);
insert into test values (12,'测试11','一年二班',90);
insert into test values (13,'测试12','一年一班',100);
-- 数据库表恢复到特定时间点。
select * from test as of timestamp 
  to_timestamp('2018-12-13 10:18:00', 'yyyy-mm-dd hh24:mi:ss');
-- 临时表恢复之前的数据
create table 临时表 as
  select * from 你的那个数据被删除的表 as of 
  timestamp to_timestamp('2013-08-13 14:00:00',  'yyyy-mm-dd hh24:mi:ss');
```
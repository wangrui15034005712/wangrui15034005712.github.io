---
title: Oracle查询各班前三名学生信息
date: 2018-11-30 14:46:11
comments: true
donate: true
categories: ORACLE
tags: #文章標籤 可以省略
	 - SQL
---
Oracle查询各班前三名学生的信息。
row_number函数排序最好用它，每一行记录生成一个序号，依次排序且不会重复。
rank函数返回结果集的分区内每行排名，行的排名是相关行之前的排名数加一，重复排序会重复。
dense_rank函数的功能与rank函数类似，dense_rank函数在生成序号时是连续的，依次排序会重复。
<!-- more -->
```
select * from 
  (select rank() over(partition by class order by score desc nulls last)rank,
  s.*from test s) t
  where rank <= 3
  order by class asc, score desc;  
```
![rank效果展示](/sql1.png)
```
select * from 
  (select row_number()over(partition by class order by score desc nulls last)
  rank,s.*from test s) t
  where rank <= 3
  order by class asc, score desc
```
![row_number效果展示](/sql2.png)
```
select * from 
  (select dense_rank()over(partition by class order by score desc nulls last)
  rank,s.*from test s) t
  where rank <= 3
  order by class asc, score desc
```
![dense_rank效果展示](/sql3.png)
## 关于Parttion by：

- Parttion by关键字是Oracle中分析性函数的一部分，用于给结果集进行分区。它和聚合函数Group by不同的地方在于它只是将原始数据进行名次排列，能够返回一个分组中的多条记录（记录数不变），而Group by是对原始数据进行聚合统计，一般只有一条反映统计值的结果（每组返回一条）。
TIPS：
使用rank over()的时候，空值是最大的，如果排序字段为null, 可能造成null字段排在最前面，影响排序结果。
可以这样： rank over(partition by course order by score desc nulls last)

## 总结：
- 在使用排名函数的时候需要注意以下三点：
1、排名函数必须有 OVER 子句。
2、排名函数必须有包含 ORDER BY 的 OVER 子句。
3、分组内从1开始排序。
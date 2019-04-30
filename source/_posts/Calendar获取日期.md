---
title: Calendar获取日期
date: 2019-01-09 13:30:48
comments: true
donate: true
categories: JAVA
tags: #文章標籤 可以省略
	 - java
---
Calendar获取月初月末日期。<!-- more -->
```
SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
SimpleDateFormat startSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
SimpleDateFormat EndDateFormat = new SimpleDateFormat("yyyy-MM-dd 23:59:59");
//上月第一天
Calendar calendar = Calendar.getInstance();
System.out.println("当前时间："+simpleDateFormat.format(calendar.getTime()));
calendar.add(Calendar.MONTH, -1);
calendar.set(Calendar.DAY_OF_MONTH, 1);
System.out.println(calendar.getTime());
System.out.println("上月第一天时间："+startSimpleDateFormat.format(calendar.getTime()));
//上月最后一天
Calendar calendar1 = Calendar.getInstance();
calendar1.set(Calendar.DAY_OF_MONTH, 1);
calendar1.add(Calendar.DATE, -1);
System.out.println(calendar1.getTime());
System.out.println("上月最后一天："+EndDateFormat.format(calendar1.getTime()));
//本月第一天
Calendar calendar2 = Calendar.getInstance();
calendar2.set(Calendar.DAY_OF_MONTH, calendar2.getActualMinimum(Calendar.DAY_OF_MONTH));
System.out.println(calendar2.getTime());
System.out.println("本月第一天："+startSimpleDateFormat.format(calendar2.getTime()));
//本月最后一天
Calendar calendar3 = Calendar.getInstance();
calendar3.set(Calendar.DAY_OF_MONTH, calendar3.getActualMaximum(Calendar.DAY_OF_MONTH));
System.out.println(calendar3.getTime());
System.out.println("本月最后一天："+EndDateFormat.format(calendar3.getTime()));
```
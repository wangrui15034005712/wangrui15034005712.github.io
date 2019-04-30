---
title: BigDecimal算法
date: 2018-12-24 10:02:29
comments: true
donate: true
categories: JAVA
tags: #文章標籤 可以省略
	 - java
---
BigDecimal算法。<!-- more -->
```
BigDecimal bignum1 = new BigDecimal("10");  
BigDecimal bignum2 = new BigDecimal("5");  
BigDecimal bignum3 = null;  
  
//加法  
bignum3 =  bignum1.add(bignum2);       
System.out.println("和 是：" + bignum3);  
  
//减法  
bignum3 = bignum1.subtract(bignum2);  
System.out.println("差  是：" + bignum3);  
  
//乘法  
bignum3 = bignum1.multiply(bignum2);  
System.out.println("积  是：" + bignum3);  
  
//除法  
bignum3 = bignum1.divide(bignum2);  
System.out.println("商  是：" + bignum3);  

//比较
int bignum = bignum1.compareTo(bignum2);
返回的结果是int类型，-1表示小于，0是等于，1是大于。

BigDecimal decimal = new BigDecimal("1.12345");

//保留四位小数，默认四舍五入
BigDecimal setScale = decimal.setScale(4);
System.out.println(setScale);

//保留四位小数，直接删除多余的小数
BigDecimal setScale = decimal.setScale(4,BigDecimal.ROUND_DOWN);
System.out.println(setScale);

//保留四位小数，进位处理
BigDecimal setScale = decimal.setScale(4,BigDecimal.ROUND_UP);
System.out.println(setScale);

//保留四位小数，四舍五入（2.35变成2.4）
BigDecimal setScale1= decimal.setScale(4,BigDecimal.ROUND_HALF_UP);
System.out.println(setScale);

//保留四位小数，四舍五入（2.35变成2.3）
BigDecimal setScale = decimal.setScale(4,BigDecimal.ROUND_HALF_DOWN);
System.out.println(setScale);

```
---
title: Java获得日期间的所有月份
date: 2018-11-28 14:53:09
comments: true
donate: true
categories: JAVA
tags: #文章標籤 可以省略
	 - JAVA
---
java获得两个日期之间的所有月份及日期之间的间隔。<!-- more -->
```
private static List<String> getMonthBetween(String minDate, String maxDate) 
	 throws ParseException {
  ArrayList<String> result = new ArrayList<String>();
  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");//格式化为年月

  Calendar min = Calendar.getInstance();
  Calendar max = Calendar.getInstance();

  min.setTime(sdf.parse(minDate));
  min.set(min.get(Calendar.YEAR), min.get(Calendar.MONTH), 1);
	
  max.setTime(sdf.parse(maxDate));
  max.set(max.get(Calendar.YEAR), max.get(Calendar.MONTH), 2);
	
  Calendar curr = max;
  while (min.before(curr)) {
	result.add(sdf.format(curr.getTime()));
	curr.add(Calendar.MONTH, -1);
  }
  
  //得到日期之间的间隔totalMonth
  Calendar calendarStart = Calendar.getInstance();
  int startYear = calendarStart.get(Calendar.YEAR);
  int startMonth = calendarStart.get(Calendar.MONTH);
  Calendar calendarEnd = Calendar.getInstance();
  calendarEnd.setTime(sdf.parse(maxDate));
  int endYear = calendarEnd.get(Calendar.YEAR);
  int endMonth = calendarEnd.get(Calendar.MONTH);
  int totalMonth = 0;
  if (endYear > startYear) {
	totalMonth = (endYear-startYear)*12 +(endMonth - startMonth)+1;
  }else if (endYear == startYear) {
	totalMonth = endMonth - startMonth+1;
  }else {
	throw new ParameterException("结束时间不能小于开始时间");
  }
 
  return result;
}

public static void main(String[] args) throws ParseException {
  List<String> list= getMonthBetween("2018-10","2019-10");
  for(String date : list) {
    System.out.println(date);
  }
}
```
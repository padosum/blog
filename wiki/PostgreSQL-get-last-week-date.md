---
title   : PostgreSQL - 지난주 날짜 구하기 
date    : 2023-11-15 23:10:24 +0900
updated : 2023-11-15 23:29:18 +0900
aliases : ["PostgreSQL - 지난주 날짜 구하기"] 
tags    : ["PostgreSQL"]
---

## Goal

PostgreSQL에서 지난주 일요일 날짜를 구해보자.


## extract() 함수  

- `extract` 함수를 사용하면 날짜를 추출할 수 있다.
  - 날짜 데이터를 불러와서 그 날짜의 년도, 월, 일 부분만 추출할 수 있는 것
- 문법은 `EXTRACT(field FROM source)`
  - `field`에 추출할 필드를 지정한다.
	- `source`에는 날짜를 전달한다. 
- field 값엔 여러 가지가 있다. 
	- [참고](https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-extract/)

## DOW field

- field 중 `DOW`를 사용하면 지난주 일요일 날짜를 추출할 수 있다. 
- `DOW`는 요일을 나타내는데 0(일요일) 부터 6(토요일)이다. 
	
- 따라서 지난주 일요일은 다음과 같이 얻을 수 있다.
```sql
SELECT current_date - extract(dow from current_date)
```
- `extract(dow from current_date)`가 현재 날짜의 요일이니 현재날짜에서 빼면 지난주 일요일로 이동하는 것이다.
  - 예를 들어 오늘이 월요일이면 1이 빠지니 어제인 일요일
  - 오늘이 수요일이면 3이 빠지니 지난주 일요일이 되는 것 
- 다른 날짜들도 `extract` 함수를 잘 사용하면 구할 수 있겠다.

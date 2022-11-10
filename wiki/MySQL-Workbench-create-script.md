---
title   : MySQL Workbench에서 테이블 생성 및 데이터 insert script 얻기
date    : 2022-11-10 23:40:39 +0900
updated : 2022-11-11 00:11:28 +0900
aliases : ["MySQL Workbench에서 테이블 생성 및 데이터 insert script 얻기"]
tags: ["MySQL", "How to"]
draft : false
---

## Goal
MySQL Workbench에서 테이블을 생성하고 데이터를 넣는 script를 얻어보자.


한 서버에서 다른 서버로 DB 데이터를 옮기려고 했다.

Schemas 부분을 마우스 우측 클릭하면 **Table Data Import Wizard**라는 기능이 있었는데 간편해보였지만 한글문제인지, 데이터가 Import가 제대로 동작하지 않았다. 여러 시행착오를 해보고, 검색도 해봤지만 원하는 답이 나오지 않았다. 

그래서 제공하는 csv나 json 파일 대신 INSERT 문만 다 작성이되면 데이터를 넣을 수 있겠다는 생각이 들었고, 그 기능도 있었다.

먼저 테이블을 똑같이 생성하기 위해선 CREATE 문도 필요하다.
쿼리창에 다음과 같이 입력하면 된다. 그럼 조회 결과에 Create Table이란 컬럼에 `CREATE TABLE...` 내용을 볼 수 있다.
```sql
show create table 테이블명;
```

그래서 `show insert table`이나 `show insert data` 같은게 있나 했는데 없는 것 같았고...

`INSERT` 문의 경우에는 우선 `SELECT`로 원하는 데이터를 조회한다. 
그리고 Result Grid 상단에 Export 버튼을 클릭한다.
![[workbench-export.png]]

원하는 경로에, Format은 'SQL INSERT statements'로 저장하면 된다.
![[workbench-export-format.png]]


---
title   : 📖 Servlet 데이터베이스 연동
excerpt : 
date    : 2020-05-19 20:57:27 +0900
updated : 2020-05-19 20:58:39 +0900
tags    : [Java]
---

## Servlet 데이터베이스 연동 
  
### DAO와 DTO 
- 데이터베이스와 통신시 모듈화, 세분화를 위해 만들어진 객체
- 브라우저 <->(response, request) <-> 웹서버(Servlet, DAO) <-> DTO <-> DB
- DAO: Data Access Object, 데이터 접근 객체
- DTO: Data Transfer Object, DB의 데이터를 Java 자료형에 맞게 가공해서 전달. VO라고 부르기도 한다. 
  - VO는 읽기 전용이다.

이렇게 보면 무슨 말인지 어려우니 예시를 통해 실펴보자.. 

### Servlet으로 회원 정보 테이블의 회원 정보 조회하기 

1. 웹 브라우저가 서블릿에게 회원 정보 요청
2. MemberServlet은 요청을 받고 MemberDAO 객체 생성 후 `listMembers()` 호출 
3. `listMembers()`에서 다시 `connDB()` 메서드를 호출해 DB와 연결한 후 SQL문을 실행해서 조회 
4. 조회된 정보를 MemberVO 속성에 설정한 후 다시 ArrayList에 저장
5. ArrayList를 처음에 호출했던 MemberServlet으로 반환해 ArrayList의 MemberVO를 차례대로 가져온다. 
6. HTML 태그를 웹 브라우저로 전송해 회원 정보 출력 
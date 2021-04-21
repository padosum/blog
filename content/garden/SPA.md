---
title   : SPA
date    : 2021-04-21 12:25:36 +0900
updated : 2021-04-21 12:25:46 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
**SPA (Single Page Application)**

- 고전적인 프로그램 [[아키텍처]] -> 모놀리식 아키텍처(Monolithic Architecture), 일체형 아키텍처  
	- UI와 데이터 계층, 통신 계층이 모두 일체형으로 작성도니 구조  
- SPA는 [[REST API]]와 대응되는 JavaScript로 작성된 웹 프로그램 

## 고전적인 웹과의 차이점  
- 페이지의 이동이 없음, 모든 로직은 최초의 html 문서에서 시작
- URL이 페이지의 상태를 표현하지 않는다. 
- 유저 이벤트 등에 따라 DOM이 동적으로 생성, 삭제, 수정되는 일이 빈번하다. 
- 데이터를 제어하기 위해 REST API 서버에 ajax를 통해 소통한다.  

## 참고
- [https://okky.kr/article/400839](https://okky.kr/article/400839)

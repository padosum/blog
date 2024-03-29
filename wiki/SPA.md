---
title   : SPA
date    : 2021-04-21 12:25:36 +0900
updated : 2021-08-21 23:14:43 +0900
aliases : 
tags: ["Programming"]
---
**SPA (Single Page Application)**

- 고전적인 프로그램 [[Architecture|아키텍처]] -> 모놀리식 아키텍처(Monolithic Architecture), 일체형 아키텍처  
	- [[User-Interface|UI]]와 데이터 계층, 통신 계층이 모두 일체형으로 작성된 구조  
- SPA는 [[REST-API|REST API]]와 대응되는 JavaScript로 작성된 웹 프로그램 
  - 페이지의 이동이 아닌, 자바스크립트가 해당 뷰에 필요한 컴포넌트들을 불러와 보여준다.  
		
## 고전적인 웹과의 차이점  
- 페이지의 이동이 없음, 모든 로직은 최초의 html 문서에서 시작
- URL이 페이지의 상태를 표현하지 않는다. 
- 유저 이벤트 등에 따라 DOM이 동적으로 생성, 삭제, 수정되는 일이 빈번하다. 
- 데이터를 제어하기 위해 REST API 서버에 ajax를 통해 소통한다.  

## SPA와 서버의 통신 
- SPA는 웹 브라우저 환경에서 **GUI 프로그램을 흉내내는  JavaScript 프로그램**
- 최초의 요청에서 JavaScript, CSS, HTML을 전송 → 전송된 웹 페이지는 하나의 독립적인 GUI 프로그램처럼 동작 
	- 이후 서버와 통신이 필요한 경우 Ajax로 비동기 통신을 한다. 

## SPA 프레임워크
- Angular.js, React.js, Vue.js 등 수 많은 SPA 프레임워크들이 하는 일은 무엇인가?
	- 이미 브라우저에서 [[DOM]]과 이벤트 시스템 등 GUI를 위한 API를 제공하지 않나?  
	- 웹 브라우저 플랫폼이, JavaScript가 GUI 프레임워크를 제공한다고 보긴 어렵다. → Native API만으로는 GUI 프로그램을 밑바닥부터 만드는 것 
- 애초에 웹이라는 것은 정적인 문서를 네트워크를 통해 주고 받는 것이 목적 → GUI 아키텍처는 웹 브라우저 플랫폼의 관심사가 아니었다.  

### Server-Side Rendering 

## SPA가 필요한가? 
-  일반적인 웹 페이지와 다르게 반응성 있는 GUI 프로그램 
-  REST 서버에 대응되는 클라이언트 프로그램
-  URL을 통해서 앱의 상태를 포착하고 공유할 수 있는 GUI 프로그램 (접속하는 URL에 따라서 앱의 상태를 복원하도록 구현한다면)
-  웹 브라우저만 있다면 어떤 플랫폼에도 제한되지 않는 프로그램 
-  접속만으로 배포하고 바로 실행할 수 있는 프로그램

## 라우터  
- 여러 화면을 구분하기 위해 각각의 접속 주소가 있을 것이다. 주소에 따라 다른 뷰를 보여주게 처리하는 것을 라우팅이라고 한다.   
	- Vue나 React 등의 프레임워크에는 라우팅을 도와주는 라우터를 제공한다.   

## reference
- [https://okky.kr/article/400839](https://okky.kr/article/400839)

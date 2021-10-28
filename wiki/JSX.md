---
title   : JSX
date    : 2021-10-04 22:08:44 +0900
updated : 2021-10-04 22:11:15 +0900
aliases : 
tags    : 
---
- [[User-Interface|UI]]가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용하는 JavaScript를 확장한 문법   
- JSX는 React element를 생성한다. 
- JSX에 삽입된 사용자 입력은 모든 값을 렌더링 하기 전에 이스케이프한다. 그리고 모든 항목은 렌더링 되기 전에 문자열로 변환되기 때문에 크로스 사이트 스크립팅 공격을 방지할 수 있다.  
	- [[DOM]]의 `innerHtml`이 XSS에 취약한 것과 반대되는 점이다.  
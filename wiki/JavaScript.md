---
title   : JavaScript 
date    : 2021-09-12 21:49:58 +0900
updated : 2022-05-23 22:28:01 +0900
aliases : 
tags: ["JavaScript"]
---
**자바스크립트 (JavaScript)**
- 웹 브라우저에서 동작하는 프로그래밍 언어
- 컴파일 작업을 수행하지 않는 인터프리터 언어이다.
- [[Functional-Programming|함수형 프로그래밍]], 프로토타입 기반 프로그래밍을 지원한다.

## 자바스크립트는 어떻게 탄생했나
- 넷스케이프 커뮤니케이션즈에서 웹페이지에 추가적인 기능을 수행하기 위해 브라우저 위에서 동작하는 프로그래밍 언어를 개발한다. 그것이 바로 자바스크립트.
- 처음엔 이름이 모카(Mocha)였다. 그러다가 LiveScript로 바뀌고, 최종적으로 JavaScript가 되었다.


## 자바스크립트의 표준화
- 1996년에 MS에서 파생 버전인 JScript를 IE에 탑재했다.
	- JScript는 예전 회사에서 사용하던 프레임워크에 있었다. 처음엔 자바스크립트와 비슷하길래 괜찮다고 생각했는데,, 시간이 많이 지난지라 호환되지 않은 답답한 문제들이 넘쳐났다. 검색해도 엄청 과거 자료였다... 한참동안 업데이트 되지 않는 프레임워크를 사용한 것이 문제다.  
- JScript와 자바스크립트는 표준화되지 못하고 서로 적당히만 호환되었다.
	- 그리고 넷스케이프 커뮤니케이션즈와 마이크로소프트가 자사 브라우저를 위한 기능들을 각각 추가해나갔다. 이로인해 브라우저에 따라 웹페이지가 제대로 동작하지 않는 **크로스 브라우징 이슈**가 발생하기 시작했다.
- 1997년에 ECMA-262라는 자바스크립트 표준이 등장했다. 
	- ECMAScript라는 이름을 가지고 있다.
- ES6에는 큰 변화가 있었고 그 이후로 매년 기능이 추가되고 있다.

### ECMAScript, 자바스크립트
- ECMAScript는 프로그래밍 언어, 값, 타입, 객체, 함수 등 핵심 문법을 규정하고, 자바스크립트는 ECMAScript와 함께 브라우저가 지원하는 [[DOM]], BOM, XMLHttpRequest, Web Storage 등을 포함하는 개념이다.  

## Ajax
- [[Ajax]]
- [[JSON]]
- [[XMLHttpRequest]]

## 자바스크립트 엔진
[[JavaScript-Engine]]

## NPM
[[NPM]]

---

## 자바스크립트 기본 문법
- [[JavaScript-Variables|변수]]
- [[JavaScript-Expression|자바스크립트 표현식]]
- [[JavaScript-Data-Type|데이터 타입]] 
- [[JavaScript-Type-Casting|타입 캐스팅]]
- [[JavaScript-Short-Circuit-Evaluation|단축 평가]]
- [[JavaScript-Regular-Expression|정규 표현식]]
- [[JavaScript-Destructuring-assignment|구조분해문법]]
- [[JavaScript-Spread-Syntax|전개 구문]]


## 자바스크립트 객체
- [[JavaScript-Object|객체]]
- [[JavaScript-Object-Literal|객체 리터럴]]
- [[JavaScript-Array|배열]]
- [[JavaScript-Array-Like-Object|유사 배열 객체]]
- [[JavaScript-First-Class-Object|일급 객체]]
- [[JavaScript-Class|클래스]]
- [[JavaScript-this|this]]
- [[JavaScript-Iterator]]

## 자바스크립트 함수 
- [[JavaScript-Function|함수]]
- [[JavaScript-Constructor-Function|생성자 함수]]
- [[JavaScript-Arrow-Function|화살표 함수]]
- [[JavaScript-First-Class-Object|일급 객체]]
- [[JavaScript-Generator]]

## 자바스크립트 스코프 
- [[JavaScript-Scope]]
- [[JavaScript-Scope-Chain]]
- [[JavaScript-Block-Level-Scope]]

## 자바스크립트 프로토타입
- [[JavaScript-Property-Attributes]]
- [[JavaScript-Prototype]]
  - [[JavaScript-Prototype-Chain]] 
  - [[JavaScript-Property-Shadowing]]

## 자바스크립트 클로저
- [[JavaScript-Closure]]

## ETC
- [[JavaScript-strict-mode|strict mode]]
- [[JavaScript-Module|모듈]]
- [[JavaScript-Built-in-Objects]]
- [[JavaScript-Execution-Context]]
- [[JavaScript-Timer|타이머]]
  - [[JavaScript-Debounce-Throttle|디바운스와 스로틀]]
- [[JavaScript-Asynchronous-Programming|비동기 프로그래밍]]

## ES6  
- [[JavaScript-Rest-Parameter]]
- [[JavaScript-Default-Parameter]]

## Snippets 
- [[JavaScript-객체로-된-배열-정렬하기|JavaScript 객체로 된 배열 정렬하기]]
- [[JavaScript-숫자-반올림-올림-내림|JavaScript 숫자 반올림, 올림, 내림]]
- [[JavaScript-날짜-포맷-변경하기|JavaScript 날짜 포맷 변경하기]]
- [[JavaScript-Regular-Expression|JavaScript 정규 표현식]]
- [[JavaScript-문자열-검색|JavaScript 문자열 검색]]
- [[JavaScript-Get-Map-Values-As-Array|JavaScript Map의 value를 배열로 가져오기]]
- [[JavaScript-toLocaleString]]
- [[Passing-parameters-to-a-callback-function|JavaScript에서 콜백 함수로 파라미터를 넘기는 방법]]
- [[Useful-Regex-Snippets-in-JavaScript|유용한 자바스크립트 정규표현식 코드 조각모음]]

## DOM
- [[DOM]]
- [[Get-Element|JavaScript 요소 찾기]]
- [[Find-element|JavaScript 자식, 부모, 형제 노드 찾기]]
- [[JavaScript-InnerHTML]]
- [[JavaScript-Create-Node-and-Append-Node|JavaScript 노드 생성, 추가, 삽입, 이동, 복사, 삭제하기]]
- [[JavaScript-Data-Attribute|JavaScript data 어트리뷰트 사용하기]]
- [[JavaScript-Get-Set-Attribute|JavaScript 어트리뷰트 값 가져오기, 어트리뷰트 값 변경, 삭제하기]]
- [[JavaScript-Change-Class-Attribute|JavaScript class 속성 변경하기]]
- [[Node-Geometry]]


## Event 
- [[Event|이벤트]]
- [[JavaScript-Add-An-Event-Handler|JavaScript 이벤트 핸들러 등록하는 방법]]
- [[Event-Propagation-And-Delegation|이벤트 전파와 위임]]
- [[How-To-Handle-Child-Elements-Of-A-Target-Element-When-Delegating-And-Event|이벤트 위임을 사용할 때 타겟 엘리먼트의 자식 엘리먼트를 다루는 방법]]

## Errors 
- [[Uncaught-in-promise-SyntaxError-Unexpected-token-in-JSON-at-position-0]]

## 같이 보기
- [자바스크립트는 무엇으로 구성되어 있을까?](https://ui.toast.com/weekly-pick/ko_20200219)

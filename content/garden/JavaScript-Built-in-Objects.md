---
title   : JavaScript 빌트인 객체
date    : 2021-05-16 23:17:44 +0900
updated : 2021-05-16 23:17:50 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 표준 빌트인 객체
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects

### 래퍼 객체 
- 문자열이나 숫자, 불리언 등의 원시값이 있는데 왜 `String`, `Number`, `Boolean` 등 표준 빌트인 생성자 함수가 존재할까? 
- 원시값은 객체가 아니므로, 프로퍼티나 메서드를 가질 수 없지만, 문자열 등은 객체 처럼 동작한다.
	- 자바스크립트 엔진이 일시적으로 원시값을 연관된 객체로 변환해준다. 
	- 임시로 생성되는 임시 객체를 **래퍼 객체(wrapper object)**라고 한다.  

### 전역 객체 
전역 객체(Global Object)
코드가 실행되기 전에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이다.  
- 브라우저에서는 `window`
- Node.js에서는 `global`
- 전역 객체의 프로퍼티를 참조할 때 `window` 나 `global`을 생략할 수 있다. 
- 선언하지 않은 변수는 암묵적으로 전역 객체의 프로퍼티가 된다. 전역 함수도 전역 객체의 프로퍼티가 된다. 

#### 전역 프로퍼티 
- `Infinity`
- `NaN`
- `undefined`

#### 전역 함수 
- `eval`
	- 자바스크립트 코드를 나타내는 문자열을 인수로 받는다. 
	```javascript
	eval('1+2;'); // 3 
	```
	- 보안에 취약하고 최적화가 수행되지 않으므로 **사용하면 안된다.**
- `isFinite`
	- 유한수인지 검사 
- `isNaN`
	- `NaN`인지 검사 
- `parseFloat`, `parseInt`
- `encodeURI`, `decodeURI`
	- 인코딩: URI의 문자들을 이스케이프[^1] 처리 
- `encodeURIComponent`, `decodeURIComponent
	- URI 구성 요소를 인수로 전달받아 인코딩 
	- 쿼리스트링 구분자까지 인코딩 


## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)


---
[^1] 네트워크를 통해 정보를 공유할 때 어떠한 시스템도 읽을 수 있는 아스키 문자 셋으로 변환하는 것 
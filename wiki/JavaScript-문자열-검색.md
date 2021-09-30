---
title   : JavaScript 문자열 검색
date    : 2021-09-30 23:39:44 +0900
updated : 2021-09-30 23:40:18 +0900
aliases : ["JavaScript 문자열 검색"]
tags    : ["JavaScript", "How to"]
---
자바스크립트에서 문자열에 원하는 문자열이 있는지 찾으려면 [[JavaScript-Regular-Expression|정규 표현식]]을 사용할 수 있다. 정규 표현식은 복잡한 패턴의 문자열을 검색하기에 용이하다.  
간단하게 검색하려면 `String` 객체의 메서드를 사용하는 것이 좋다.  

## `String.prototype.indexOf()`
대상 문자열에서 인수로 전달받은 문자열을 검색해 첫 인덱스를 반환한다. 찾는 문자열이 없으면 `-1`을 반환한다.  
```javascript
const str = 'Today is gonna be the day';

str.indexOf('day'); 		// 2 
str.indexOf('yesterday');   // -1
str.indexOf('today');       // -1
```  
대소문자를 구분해서 검색한다. 대소문자 구분없이 검색하려면 정규 표현식에 `i` 플래그를 사용하거나, 검색하기 전에 문자열을 `toUpperCase()` 또는 `toLowerCase()` 로 변환 후 경우에 맞게 사용해야 한다.  

## `String.prototype.includes()`
ES6에 추가되었다. `indexOf`를 사용하는 것보다 가독성이 좋다.   
```javascript
if (str.includes('Error')) {
 // str에 `Error`이 포함되어 있을 경우 처리할 로직 
}
```
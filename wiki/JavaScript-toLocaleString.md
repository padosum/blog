---
title   : 자바스크립트 숫자 3자리씩 콤마 찍기 
date    : 2022-01-12 15:20:34 +0900
updated : 2022-01-12 15:22:03 +0900
aliases : 
tags    : ["JavaScript"]
---
## Goal
자바스크립트 문자열 3자리씩(천 원단위씩) 콤마 찍기

보통 숫자를 포맷팅할 때 3자리씩(천 원단위씩) 콤마를 찍어서 보여준다.  
함수를 가져와서 이런저런 작업을 한 기억이 있는데 `Object.prototype.toLocaleString()`을 사용하면 간편하게 콤마를 추가할 수 있다는 걸 알게되었다.

## toLocaleString()
```javascript
const price = 99999999;
console.log(price.toLocaleString('ko-KR')); // 99,999,999
```
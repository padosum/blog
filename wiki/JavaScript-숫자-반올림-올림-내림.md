---
title   : JavaScript 숫자 반올림, 올림, 내림 
date    : 2021-09-30 21:36:26 +0900
updated : 2021-09-30 21:39:35 +0900
aliases : ["JavaScript 숫자 반올림, 올림, 내림"]
tags    : ["JavaScript", "How to"]
---
JavaScript에서 숫자 소수점을 반올림, 올림, 내림등을 처리하려면 표준 빌트인 객체인 `Number`와 `Math`의 메서드를 사용하면 된다.  

## 숫자 반올림
### `Number.toFixed()`
인수로 반올림하는 소수점 이하 자릿수를 나타내는 정수값을 전달할 수 있다. 생략하면 기본값 0이 되어 소수점 이하 값은 반올림된다.  

```javascript
const num = 123.4567;
console.log(num.toFixed());  // "123"
console.log(num.toFixed(1)); // "123.5"
console.log(num.toFixed(2)); // "123.46"
```

### `Number.toPrecision()`
`toFixed` 메서드처럼 반올림 하는 메서드 중 `toPrecision`이 있다. `toPrecision`은 인수로 전달받은 수가 전체 자릿수가 되도록 반올림한다.  표현할 수 없는 경우 지수 표기법으로 반환된다
```javascript
const num 123.4567;
console.log(num.toPrecision(4));  // 123.5 
console.log(num.toPrecision(1));  // 1e+2
```

### `Math.round()`
인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환한다.  
```javascript
Math.round(1.23); // 1
Math.round(1.5);  // 2
Math.round(-2.9); // -3
```

## 숫자 올림
### `Math.ceil()`
인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환한다. 전달된 숫자보다 더 큰 정수 중 가장 작은 정수가 반환되는 것이다.
```javascript
Math.ceil(1.2323); // 2
Math.ceil(-3.1);   // -3
```

## 숫자 내림(버림)
### `Math.floor()`
인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환한다. 
```javascript
Math.floor(1.5); // 1 
Math.floor(-2.4); // -3
```
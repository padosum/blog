---
title   : 자바스크립트 타입 변환(JavaScript Type Casting) 
date    : 2021-09-14 12:48:17 +0900
updated : 2021-09-15 17:28:09 +0900
aliases : ["타입 캐스팅"]
tags: ["JavaScript"]
---

서로다른 타입 간 연산이 일어날 때는 **타입 캐스팅(Type Casting)** 또는 **형 변환**이라고 하는 연산이 내부적으로 일어난다. 
```javascript
var x = 13;
var str = x.toString(); // 숫자를 문자로 타입 캐스팅
console.log(typeof str, str); // string 13
```

---
개발자의 의도와 상관없이 암묵적으로 타입이 변경되기도 한다. 이것을 **암묵적 타입 변환** 또는 **타입 강제 변환(Type Coercion)** 이라고 한다.  
```javascript
var x = 13;
var str = x + ''
console.log(typeof str, str); // string 13
```
---
개발자가 의도하여 명시적으로 타입을 변환하는 것이나 암묵적으로 변환되는 것 모두 기존의 원시 값의 타입을 변경하는 것은 아니다.  
원시 값은 변경할 수 없다. 변경 불가능한 immutable value 이기 때문이다. 타입 변환은 기존 원시 값을 이용해서 다른 타입의 새로운 원시 값을 생성하는 것이다.
코드는 예측 가능해야 한다. 명시적 타입 변환이든, 암묵적 타입 변환이든 다른 개발자가 봤을 때 정확히 이해가 가능하고 간결해야 한다.  

## 암묵적 타입 변환 
### 문자열
```javascript
1 + '3' // 13
0 + '' // "0"
NaN + '' // "NaN"
Infinity + '' // "Infinity"
true + '' // "true"
null + '' // "null"
undefined + '' // "undefined"
({}) + '' // "[object Object]"
```
- 문자열 타입이 아닌 피연산자는 문자열로 암묵적 타입 변환이 된다.

### 숫자
산술 연산자의 피연산자들은 모두 숫자 타입이어야 하기 때문에 숫자 타입이 아닌 피연산자는 암묵적으로 타입 변환이 된다.
비교 연산자도 마찬가지이다.
```javascript
1 - '1' // 0
'1' < 0 // false 
```
단항 연산자는 피연산자가 숫자 타입이 아니면 숫자 타입의 값으로 암묵적 타입 변환을 한다. 
```javascript
+ '' // 0
+ '1' // 1 

+true // 1 
+false // 0

+null // 0
```

### 불리언
- 암묵적 타입 변환 시 `false`로 평가되는 값들, 나머지 값들은 `true`로 평가된다.
	- `false`
	- `undefined`
	- `null`
	- `0`, `-0`
	- `NaN`
	- `''`
	

## 명시적 타입 변환
### 문자열
- `String` 생성자 함수 호출
- `Object.prototype.toString` 메서드 사용
- 문자열 연결 연산자 이용 

### 숫자
- `Number` 생성자 함수 호출 
- `parseInt`, `parseFloat` 함수  사용 
- `+`, `*` 사용

### 불리언
- `Boolean` 생성자 함수 호출
- `!`를 두 번 사용하기
	```javascript
	!!'x'; // true
	!!''; // false
	!!'false'; // true 
	!!0; // false
	!!1; // true
	```
---
title   : 블록 레벨 스코프
date    : 2021-05-15 17:05:36 +0900
updated : 2022-12-16 22:30:03 +0900
aliases : ["블록 레벨 스코프"]
tags: ["JavaScript"]
---

## var 키워드로 선언한 변수에 문제가 있다. 

자바스크립트는 기본적으로 [[JavaScript-Scope|함수 레벨 스코프]]다. 따라서 함수 안에서 선언된 변수만이 지역 변수라, `var` 키워드로 선언한 변수는 코드 블록(`{}`) 내에서 선언한다고 해도 모두 전역 변수가 된다. -> [[JavaScript-Scope|전역변수는 문제점이 있다]]

그리고 `var` 키워드로 변수를 선언하면 변수의 중복 선언이 허용되므로, 변수가 예기치 못하게 변경되는 일이 생길 수 있다. 따라서 유지 보수하기 어려워진다. 

## let 키워드 
ES6에 `let` 키워드로 변수를 서언하는 것이 도입되었는데, 이를 사용하면 **블록 레벨 스코프**를 사용할 수 있다. 또, 변수 중복 선언이 불가능해 의도치 않게 재할당 되는 것을 방지할 수 있다.

```javascript
let lscope = 0;
{
  let lscope = 1;
  console.log(lscope); // 1
}
console.log(lscope); // 0
```

```js
let lscope = 0;
let lscope = 1;  // Uncaught SyntaxError: Identifier 'lscope' has already been declared
```


### 호이스팅
`var` 키워드로 선언한 변수와 달리 `let` 키워드로 선언한 변수는 **[[JavaScript-Variables|변수 호이스팅]]이 발생하지 않는 것처럼 동작**한다. 에러가 발생.
```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

`var` 키워드로 선언한 변수는 런타임 이전에 [[JavaScript-Engine|자바스크립트 엔진]]에 의해 암묵적으로 "선언 단계"와 "초기화 단계"가 한꺼번에 진행된다. 

하지만 **`let` 키워드로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다.** 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화는 변수 선언문에 도달했을 때 실행되는 것.

스코프 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각지대(Temporal Dead Zone; TDZ)**라고 부른다.


그렇다면, 호이스팅이 발생하지 않는 것일까?
```javascript
let foo = 1; 
{
	console.log(foo); // ReferenceError
	let foo = 2;
}
```

위 코드를 살펴보자. 만약 호이스팅이 발생하지 않는다면 전역 변수 `foo`의 값을 출력해야 한다. 호이스팅은 발생하니까 참조 에러가 발생하는 것이다. (아직 초기화가 되지 않았다는 것) 

## const 키워드 
- **상수**를 선언하기 위해 사용한다. 
	- 수학에서 상수는 변하지 않는 값이다. 변수와 달리 선언된 값은 고정된다.

### 선언과 초기화 
- `const`로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다. 변경할 수 없기 때문이다. (변경하려 하면 오류가 발생됨)
- `let`처럼 블록 레벨 스코프를 가지고 변수 호이스팅이 발생하지 않는 것처럼 동작한다. 

### 재할당 금지 
- `const`로 선언한 변수는 `let`과 다르게 [[JavaScript-Data-Type|원시 값]]을 할당한 경우 값을 변경할 수 없다. 
- 일반적으로 상수의 이름은 대문자로 선언해 상수임을 명확히 나타낸다.  
  - 보통 여러 단어인 경우 언더스코어(`_`)로 구분하여 스네이크 케이스로 표현한다.

### const와 객체  
```js
const arr = [];
arr.push(1);
arr;  [1]

const obj = {};
obj.name = 'yj';
obj; // {name: 'yj'}
```

`const` 키워드로 선언된 상수로 원시 값을 할당한 경우 값을 바꿀 수 없다. 하지만 위 코드처럼 **객체를 할당한 경우 변경이 가능하다.** 재할당이 금지된 것이지 **불변**을 의미한 것은 아니기 때문이다.

```js
const obj = {} 
obj = { name : 'hello' } // Uncaught TypeError: Assignment to constant variable.
```
따라서 위 코드의 실행 결과 처럼 재할당 해버리면 오류가 난다. 상수에 할당된 참조 값은 변경하지 못하는 것이다.


## 전역 객체

`var`로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다.

```js
var x = 1

console.log(window.x); // 1
console.log(x); // 1
```

하지만 `let`으로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다. 
`window.foo`로 접근할 수 없다. 이건 `const`도 마찬가지다!
  ```javascript
  let x = 1;

  console.log(window.x); // undefined
  console.log(x); // 1
  ```

## 무엇을 사용하는게 좋을까?  
- 의외로 객체를 재할당하는 경우는 드물다고 한다. 일단 `const` 키워드를 사용하고 재할당이 필요한지 생각해본 뒤 `let`으로 바꿔도 결코 늦지 않다. 
- `let` 키워드를 사용할 때 변수의 스코프는 최대한 좁게 만든다. 

## reference 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [생활코딩](https://opentutorials.org/course/743/6544)
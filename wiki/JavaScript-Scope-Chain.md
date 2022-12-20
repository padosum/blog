---
title   : JavaScript 스코프 체인
date    : 2021-05-15 16:13:22 +0900
updated : 2022-12-20 23:24:17 +0900
aliases : ["스코프 체인"]
tags: ["JavaScript"]
---

자바스크립트에서 함수는 중첩될 수 있으니 함수의 지역 [[JavaScript-Scope|스코프]]도 중첩될 수가 있다. 스코프가 함수의 중첩에 의해 계층적 구조를 갖는다. 
```javascript
var a = 1;
function outer() {
    console.log(a);

    function inner() {
        console.log(a);
        var a = 3;
    }

    inner();

    console.log(a);
}
outer();
console.log(a);
```
- `outer` 함수와 `inner` 함수의 지역이 있으며, `inner` 함수는 `outer` 함수의 중첩 함수이다. 
  - `outer` 함수가 만든 지역 스코프는 `inner` 함수가 만든 지역 스코프의 상위 스코프이며, `outer` 함수의 지역 스코프의 상위 스코프는 전역 스코프이다. 이렇게 스코프가 계층적으로 연결된 것을 **스코프 체인(scope chain)**이라고 한다.    
- 변수를 참조할 때 [[JavaScript-Engine|자바스크립트 엔진]]은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작해서 없으면 상위 스코프 방향으로 이동해서 계속 찾아나간다. (identifier resolution)

## 스코프 체인에 의한 변수 검색  
1. `outer` 함수가 호출되면 `outer`의 지역 스코프에서 `a`를 탐색한다. 
   1. 선언된 `a`가 `outer` 지역 스코프에 없으므로 상위 스코프(전역 스코프)에서 `a`를 찾는다. → 값 `1`을 출력한다. 
2. `inner` 함수가 호출되면 변수 `a`가 먼저 선언된다.([[JavaScript-Block-Level-Scope|호이스팅]])
   1. `inner`의 지역 스코프에서 `a`를 탐색한다. 
   2. `a`가 할당되기 전이므로 `undefined`가 출력된다. 
   3. `a`에 값 `3`을 할당한다.
3. `outer`의 지역 스코프에서 `a`를 탐색한다. 
   1. 선언된 `a`가 `outer` 지역 스코프에 없으므로 상위 스코프(전역 스코프)에서 `a`를 찾는다. → 값 `1`을 출력한다.
4. 마지막 `a`는 전역 스코프에서 탐색하고 값 `1`을 출력한다.   


## 스코프 체인에 의한 함수 검색 
```javascript
// 전역 함수
function foo() {
    console.log(`global function foo`);
}

function bar() {
    // 중첩 함수 
    function foo() {
        console.log(`local function foo`);
    }

    foo(); // 1
}

bar();
```
- 1번에서 `foo` 함수를 호출하면 자바스크립트 엔진은 함수를 호출하기 위해 먼저 함수를 가리키는 식별자 `foo`(함수 선언문으로 정의하여 암묵적으로 함수 이름과 동일한 식별자가 선언된다.)를 검색한다. 
- 함수도 식별자에 할당되기 때문에 스코프를 갖는다. `bar` 내부 중첩 함수 `foo`가 실행되어 `local function foo`가 출력된다.


## shadowing
```js
function foo() {
  let a = 1
  function bar(b) {
    let a = 2
    console.log(a, b) // 2, 1
  }
  bar(a)
}
```

`bar` 함수 내부에 변수 `a`가 있으므로 `bar` 외부에 있는 `a`를 검색하러 가지 않는다. 내부에 이미 `a`가 있으므로 찾는 즉시 검색을 중단한다. 이를 shadowing이라고 한다. 더 안쪽의 식별자가 더 바깥쪽의 식별자를 가리는 것.

gatsby에서도 비슷한 느낌으로 shadowing이란 표현을 사용하는데... 다른 곳에서도 많이 나올 것 같다. 이 느낌을 기억해두자.

## reference 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [코어 자바스크립트](https://search.kyobobook.co.kr/web/search?vPstrKeyWord=%25EC%25BD%2594%25EC%2596%25B4%2520%25EC%259E%2590%25EB%25B0%2594%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25BD%25ED%258A%25B8&orderClick=LAG)
---
title   : 비구조화 할당
excerpt : Destructuring assignment 구조 분해 할당
date    : 2020-02-25 21:09:48 +0900
updated : 2020-02-25 21:10:32 +0900
tags    : [Javascript]
---

## 비구조화 할당

배열이나 객체의 속성을 해체해 그 값을 개별 변수에 담을 수 있게 하는 표현식.

리액트를 배우려니까 정리해본다.

``` javascript
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

// 나머지를 배열에 넣기
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

// 객체
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20


// Stage 4(finished) proposal
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}

// 기본값 넣어주기
const [lion, tiger, human = "girl"] = ["LION", "TIGER"];
console.log(lion);  // LION
console.log(tiger); // TIGER
console.log(human); // girl
```

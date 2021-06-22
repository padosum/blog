---
title   : 비구조화 할당
excerpt : Destructuring assignment 구조 분해 할당
date    : 2020-02-25 21:09:48 +0900
updated : 2021-06-22 23:04:51 +0900
tags    : [Javascript]
parent  : 
layout  :
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

## 다른 사용 예  

### Vuex  
- `actions` 속성에서 `context` 인자 사용시
- `commit`을 여러번 호출해야 하는 경우 코드 단순화를 위해 사용한다.  
```javascript
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

## reference 
- [https://vuex.vuejs.org/kr/guide/actions.html](https://vuex.vuejs.org/kr/guide/actions.html)

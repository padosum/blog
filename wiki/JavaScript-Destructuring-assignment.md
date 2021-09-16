---
title   : 비구조화 할당
excerpt : Destructuring assignment 구조 분해 할당
date    : 2020-02-25 21:09:48 +0900
updated : 2021-08-19 22:44:00 +0900
tags: ["JavaScript"]
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

**구조 분해는 선언적이다. 코드를 작성하는 사람의 의도가 더 잘 설명이 되는 코드이다. 구조분해로 사용하려는 것만 가져와 그것만 사용한다는 것을 선언한다.**   

-> [[선언적 프로그래밍]]

## object literal enhancement  
- 구조 분해의 반대라 할 수 있다.  
```javascript 
const name = "yj"
const age = 28  

let developer = {name, age}
console.log(developer) // {name: "yj", age: 28}
```
- 메서드를 만드는 것도 가능하다.  
```javascript
const name = "yj"
const age = 28  
const log = function() {
  console.log(`${this.name}의 나이는 ${this.age}세 입니다.`) 
}

const sayInfo = {name, age, log} 
sayInfo.print() // yj의 나이는 28세 입니다. 
```
- 객체 메서드 정의시 `function` 키워드를 사용하지 않아도 된다.  
```javascript
const yj = {
  name, 
	age,
	sayHi() {
	  console.log(`Hi ${this.name})
	}
```

## reference 
- [https://vuex.vuejs.org/kr/guide/actions.html](https://vuex.vuejs.org/kr/guide/actions.html)

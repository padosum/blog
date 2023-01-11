---
title   : 구조 분해 할당
date    : 2020-02-25 21:09:48 +0900
updated : 2022-11-08 23:48:03 +0900
aliases : ["Destructuring"]
tags: ["JavaScript"]
---

## 구조 분해 할당
배열이나 객체의 속성을 해체해 그 값을 개별 변수에 담을 수 있게 하는 표현식.
리액트를 배우려니까 정리해본다.

```javascript
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

기본값을 넣어줄 때 기억해야 할 중요한 사실은, **기본값은 값이 정의되지 않은 경우에만 할당된다는 것**이다. [참고](https://wesbos.com/destructuring-default-values)
```js
const { name = 'padosum' } = { name: undefined }
console.log(name) // padosum

const { name = 'padosum' } = { name: null }
console.log(name) // null

const { name = 'padosum' } = { name: false }
console.log(name) // false

const { name = 'padosum' } = { name: 0 }
console.log(name) // 0
```

## 새로운 변수 이름으로 할당하기
```javascriptasda
const { a: foo } = { a: 10 };
console.log(foo); // 10
console.log(a); // ReferenceError: a is not defined
```

## 중첩된 구조의 객체에서 Destructuring 사용하기

다음과 같이 객체가 중첩되어 있는 경우에도 사용이 가능하다.
```javascript
const user = {
  id: 513,
  name: 'padosum',
  age: 100,
  address: {
    city: 'Busan',
    country: 'Republic of Korea'
  }
}
const { name, age, address: { city } } = user
console.log(name, age, city) // padosum 100 Busan
```


## 다른 사용 예  

### rest parameter와 함께

[[JavaScript-Rest-Parameter|Rest parameter]]와 함께 사용하면 특정 키 값 제거를 쉽게할 수 있다.

다음과 같은 배열이 주어졌을 때, b만 제거된 값을 얻고 싶다면
```js
const data = { a: 1, b: 2, c: 3 };
```

보통 특정 값을 가져올 때 사용하지만 다음과 같이 객체에서 그 값을 제거한 경우도 가져올 수 있다.
```js
const data = { a: 1, b: 2, c: 3 };

const { b, ...rest } = data;
console.log(rest); // { a: 1, c: 3 }
```

만약 키값을 동적으로 적용하고 싶다면 따로 변수에 넣어두면 된다.
```js
const data = { 'some-key': 1, a: 1, b: 2 };
const someKey = 'some-key';

const { [someKey]: removeKey, ...rest } = data;
console.log(removeKey); // 1
console.log(rest); // { a: 1, b: 2 }
```

### 배열에서 
다음과 같이 새로운 이름으로 할당해서 값을 가져올 수 있다. 배열의 index를 객체의 `key` 처럼 얻을 수 있기 때문이다. ( ex, `arr[1]`)
```js
const arr = [1, 2, 3, 4];
const { 0: first, 1: second, [arr.length - 1]: last } = arr;
console.log(first, second, last); // 1, 2, 4
```

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
-> [[Declarative-Programming|선언적 프로그래밍]]

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
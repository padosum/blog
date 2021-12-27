---
title   : 자바스크립트 이터레이터 
date    : 2021-12-27 13:31:29 +0900
updated : 2021-12-27 13:32:18 +0900
aliases : ["이터레이터"]
tags    : ["JavaScript"] 
---

## 이터레이션 프로토콜 
이터레이션 프로토콜은 순회 가능한(iterable) 데이터 컬렉션(자료구조)을 만들기 위해서 ECMAScript 사양에 정의하여 미리 약속한 규칙을 말한다.

ES6 이전에 순회 가능한 자료구조([[JavaScript-Array|배열]],[[JavaScript-Array-Like-Object|유사 배열 객체]], [[DOM]] 컬렉션 등)은 통일된 규약없이 각자의 구조를 가지고 `for`, `for...in`, `forEach` 메서드 등으로 순회를 할 수 있었는데 ES6에서 순회 가능한 자료구조를 이터레이션 프로토콜을 준수하는 "이터러블"로 통일했다.  

이터레이션 프로토콜에서는 이터러블 프로토콜, 이터레이터 프로토콜이 있다.
### 이터러블 프로토콜
- [[JavaScript-Symbol#Well-known Symbols|Well-known Symbol]]인 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 [[JavaScript-Prototype-Chain|프로토타입 체인]]을 통해 삭속받은 `Symbol.iterator`를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 
- 위와 같은 규약을 이터러블 프로토콜이라고 하며 이를 준수한 객체를 이터러블이라고 한다.  

### 이터레이터 프로토콜 
- 이터러블의 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 
- 이터레이터는 `next()` 메서드를 소유하고 호출하면 이터러블을 순회한다. 
- 위와 같은 규약을 이터레이터 프로토콜이라고 하며 이를 준수한 객체를 이터레이터라고 한다. 이터레이터는 이터러블 요소를 탐색하기 위한 포인터 역할을 한다. 

---
프로토콜을 준수해 이터레이터를 직접 만드는 것은 다소 복잡하다. 다행히 ES6에서는 [[JavaScript-Generator|제너레이터]]를 제공해 훨씬 간단하게 이터레이터 객체를 만들 수 있게 해준다.

### 이터러블
이터러블 프로토콜을 준수한 객체다. 이터러블은 `for...of` 문으로 순회할 수 있으며, [[JavaScript-Spread-Syntax|스프레드 연산자]]와 [[JavaScript-Destructuring-assignment|Destructuring]] 할당의 대상으로 사용할 수 있다.

### 이터레이터 
이터러블의 `Symbol.iterator`를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 반복을 위해 설계된 특별한 인터페이스를 가진 객체로 `next()` 메서드를 갖는다. 

`next()` 메서드를 호출하면 이터러블을 순회하며 객체를 반환한다. 반환된 객체(이터레이터 리절트 객체)는 다음과 같은 두 개의 프로퍼티를 갖는다.
- 다음 값을 의미하는 `value`
- 더 반환할 값이 없을 때 `true`가 되는 Boolean 값 `done`

```javascript
const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();

// 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

## 제너레이터 
제너레이터는 이터레이터를 반환하는 함수다. 제너레이터 함수는 `function` 뒤에 별표(`*`)를 사용해서 표현하고, `yield`라는 키워드를 사용한다.  
[[JavaScript-Generator|제너레이터]] 참고

## for...of 문
ES6의 모든 컬렉션 객체(`Array`, `Set`, `Map`)와 문자열은 이터러블이므로 이터레이터를 가진다. 
이터러블은 ECMAScript에 새로 추가된 `for...of`문과 함께 사용되도록 설계되었다.  

`for...of`문은 이터러블을 순회해서 이터러블의 요소를 변수에 할당한다.
```javascript
for (변수선언문 of 이터러블) {
  ...
}
```
반복문이 실행될 때마다 이터러블의 `next()`를 호출하고 반환된 객체의 `value`를 변수에 저장한다. 이 반복문은 반환된 객체의 `done` 프로퍼티가 `true`일 때까지 과정을 반복한다. 

단순히 배열이나 컬렉션 내의 값을 순회하고 싶다면 `for`문 대신 `for...of`를 사용하는 것이 좋다. 상대적으로 추적해야 할 상태 값이 적기 때문에 에러 발생 확률을 감소시킨다. 만약 더 복잡한 상태를 제어해야 한다면 `for`문을 사용하는 것이 좋다.  

## 빌트인 이터러블 
- `Array`
- `String`
- `Map`
- `Set`
- `TypedArray`
- `arguments`
- `DOM` 컬렉션 

## 유사 배열 객체와 이터러블 
[[JavaScript-Array-Like-Object|유사 배열 객체]]도 배열처럼 인덱스로 프로퍼티 값에 접근 가능하고, `length` 프로퍼티를 갖는다. 하지만 이터러블이 아닌 일반 객체다. 그래서 `Symbol.iterator` 메서드가 없기 때문에 `for...of`문으로 순회할 순 없다.   
`arguments`, `NodeList`, `HTMLCollection`은 유사 배열 객체이면서 이터러블이다.  
모든 유사 배열 객체가 이터러블인 것은 아니지만 ES6에서 도입된 `Array.from` 메서드를 사용해서 배열로 변환할 수 있다.
  
```javascript
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

const arr = Array.from(arrayLike);
console.log(arr); // [1, 2, 3]
```

## 스프레드 연산자와 이터러블 
`Set`을 배열로 변환하기 위해 [[JavaScript-Spread-Syntax|스프레드 연산자]]을 사용할 수 있다.
  
```javascript
let set = new Set([1, 2, 3, 3, 4, 5]);
let array = [...set];

console.log(array); // [1, 2, 3, 4, 5]
```

스프레드 연산자는 모든 이터러블과 잘 작동한다. 그래서 이터러블을 배열로 바꾸는 가장 쉬운 방법이다.  

## 빌트인 이터레이터
다양한 내장 타입을 위한 이터레이터가 언어에 기본적으로 내장되어 있기 때문에 직접 만들 필요는 없다. 사용 목적에 빌트인 이터레이터가 알맞지 않은 경우에 만들면 된다. 

### 컬렉션 이터레이터 
- `entries()`: 값으로 키 값 쌍을 갖는 이터레이터 반환
- `values()`: 값으로 컬렉션의 값을 갖는 이터레이터 반환
- `keys()`: 값으로 컬렉션 내의 키를 갖는 이터레이터 반환

각 컬렉션 타입에는 이터레이터가 명시적으로 지정되지 않았을 때 `for...of`문에 사용되는 기본 이터레이터가 있다.  
- 배열과 `Set`: `values()`
- `Map`: `entries()`

```javascript
let user = new Map();

user.set("name", "padosum");
user.set("language", "JavaScript");

for (let [key, value] of user) {
  console.log(`${key}, ${value}`);
}
```

### 문자열 이터레이터
문자열은 ES5 이후 서서히 배열과 유사해졌다.
```javascript
var message = "안녕하세요";

for (let c of message) {
  console.log(c);
}
// 안
// 녕
// 하
// 세
// 요
```

### NodeList 이터레이터
[[DOM]]에는 문서 엘리먼트의 컬렉션을 나타내는 `NodeList` 타입이 있다. 
ES6 기본 이터레이터 추가와 함께 `NodeList`에 배열 기본 이터레이터와 똑같이 동작하는 기본 이터레이터가 포함된다.  
```javascript
var divs = document.getElementsByTagName("div");

for (let div of divs) {
  console.log(div.className);
}
```

## reference
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년

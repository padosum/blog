---
title   : 자바스크립트 이터레이터 
date    : 2021-12-27 13:31:29 +0900
updated : 2023-08-24 18:51:24 +0900
aliases : ["이터레이터"]
tags    : ["JavaScript"] 
---

## 이터레이션 프로토콜 
이터레이션 프로토콜은 순회 가능한(iterable) 데이터 컬렉션(자료구조)을 만들기 위해서 ECMAScript 사양에 정의하여 미리 약속한 규칙을 말한다.

ES6 이전에 순회 가능한 자료구조([[JavaScript-Array|배열]],[[JavaScript-Array-Like-Object|유사 배열 객체]], [[DOM]] 컬렉션 등)은 통일된 규약없이 각자의 구조를 가지고 `for`, `for...in`, `forEach` 메서드 등으로 순회를 할 수 있었는데 ES6에서 순회 가능한 자료구조를 이터레이션 프로토콜을 준수하는 "이터러블"로 통일했다.  

이터레이션 프로토콜에서는 이터러블 프로토콜, 이터레이터 프로토콜이 있다.

### 이터러블 프로토콜
- [[JavaScript-Symbol#Well-known Symbols|Well-known Symbol]]인 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 [[JavaScript-Prototype-Chain|프로토타입 체인]]을 통해 상속받은 `Symbol.iterator`를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 
- 위와 같은 규약을 이터러블 프로토콜이라고 하며 이를 준수한 객체를 이터러블이라고 한다.  

```js
const arr = [1, 2, 3, 4] // Array는 빌트인 이터러블이다.
const iter = arr[Symbol.iterator]() // 프로토타입체인을 통해 상속받았음.
```


### 이터러블
**이터러블 프로토콜을 준수한 객체**다. 이터러블은 `for...of` 문으로 순회할 수 있으며, [[JavaScript-Spread-Syntax|스프레드 연산자]]와 [[JavaScript-Destructuring-assignment|Destructuring]] 할당의 대상으로 사용할 수 있다.

### 이터레이터 프로토콜 
- 이터러블의 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 **이터레이터**를 반환한다. 
- 이터레이터는 `next()` 메서드를 소유하고 호출하면 이터러블을 순회한다. 
- 위와 같은 규약을 이터레이터 프로토콜이라고 하며 이를 준수한 객체를 이터레이터라고 한다. 이터레이터는 이터러블 요소를 탐색하기 위한 포인터 역할을 한다. 

```js
const arr = [1, 2, 3, 4] // Array는 빌트인 이터러블이다.
const iter = arr[Symbol.iterator]() // 이터레이터 반환
iter.next(); // {value: 1, done: false}
```

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



## for...of 문 
이터러블은 ECMAScript에 새로 추가된 `for...of`문과 함께 사용되도록 설계되었다.  

`for...of`문은 이터러블을 순회해서 이터러블의 요소를 변수에 할당한다.
```javascript
for (변수선언문 of 이터러블) {
  ...
}
```
반복문이 실행될 때마다 이터러블의 `next()`를 호출하고 반환된 객체의 `value`를 변수에 저장한다. 이 반복문은 반환된 객체의 `done` 프로퍼티가 `true`일 때까지 과정을 반복한다. 

단순히 배열이나 컬렉션 내의 값을 순회하고 싶다면 `for`문 대신 `for...of`를 사용하는 것이 좋다. 상대적으로 추적해야 할 상태 값이 적기 때문에 에러 발생 확률을 감소시킨다.

## 이터러블 만들기  

이터러블이 무엇인지 알았으니 직접 만들 수 있겠다.  
이터러블은 `Symbol.iterator` 호출했을 때 이터레이터 프로토콜을 준수한 이터레이터를 반환하면 된다. 

```js
const myIterable = {
	[Symbol.iterator]() {
	  let i = 0;
	  return { // 이터레이터를 반환한다. 
	    next() {
	      i++;
	      return i < 5 ? { value: i, done: false } : { done: true }
	    }
	  }
	}
}

const iter = myIterable[Symbol.iterator]()
iter.next(); // {value: 1, done: false}
iter.next(); // {value: 2, done: false}
iter.next(); // {value: 3, done: false}
iter.next(); // {value: 4, done: false}
iter.next(); // {done: true}
iter.next(); // {done: true}

const [a] = myIterable
console.log(a) // 1

for (const a of myIterable) {
  console.log(a) /// 1, 2, 3, 4
}

[...myIterable]
// [1, 2, 3, 4]
```

### well-formed iterator?

이터러블 프로토콜에 대해 검색하면 well-formed iterator라는 설명을 심심찮게 발견할 수 있다. 

MDN에서는 해당 용어를 사용하는 모습을 보지 못했는데  ["Non-well-formed iterables"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator#non-well-formed_iterables) 라는 내용은 있었다. 
well-formed iterable이란 이게 의미하는 것과 반대라고 이해하면 될 것 같았다. 

> 이터러블의 `@@iterator` 메서드가 이터레이터 객체를 반환하지 않는다면, 이터러블은 제대로 형성되지 않은 이터러블입니다. 이터러블을 그대로 사용하면 런타임 예외나 버그가 발생할 수 있습니다

`@@iterator`는 `[Symbol.iterator]()`를 말한다. 즉 이 메서드가 이터레이터 객체를 반환하지 않으면 "Non-well-formed" iterable인 것이고 반대로 메서드가 이터레이터 객체를 반환하면 "well-formed" iterable이라고 보면 되겠다.  

### iterable iterator

또 "iterable iterator(이하 이터러블 이터레이터)"라는 용어도 심심찮게 발견할 수 있었다.  

말 그대로 이터러블인 이터레이터를 말한다. 어떻게 만드냐면 이터레이터가 이터러블을 반환하면 된다.  
이터러블이 이터레이터를 반환하는 것이기 때문에 자기 자신을 가리키는 `this`를 반환하면 되서 매우 간단하다.  
```js
const myIterator = {
  next() {
    // ...
  },
  [Symbol.iterator]() {
    return this
  }
}
```

이렇게 이터러블 이터레이터를 만들면 좋은 점은 "이터러블" 을 사용하는 곳에서 이 "이터레이터"를 사용할 수 있다는 것이다. (많은 문법과 API는 이터러블을 사용하기 때문이다.)
그래서 꼭 사용해주는 것이 좋겠다.

앞서 작성했던 이터러블의 이터레이터를 이터러블 이터레이터로 만들어보겠다.  
```js
const myIterable = {
	[Symbol.iterator]() {
	  let i = 0
	  return { // 이터레이터를 반환한다. 
	    next() {
	      i++
	      return i < 5 ? { value: i, done: false } : { done: true }
	    },
	    [Symbol.iterator]() {
	      return this
	    }
	  }
	}
}
```

```js
const it = myIterable[Symbol.iterator]() // 이터러블 이터레이터
it.next(); // {value: 1, done: false}

// 이터러블이기 때문에 for...of가 가능하다.
for (const a of it) {
  console.log(a) // 2, 3, 4
  // 이터러블을 한 번 순회했기 때문에 남은 것들을 순회한다. 
}
```

프로토콜을 준수하면서 이터레이터를 직접 만드는 것은 다소 복잡하다! 다행히 ES6에서는 [[JavaScript-Generator|제너레이터]]를 제공해 훨씬 간단하게 이터레이터 객체를 만들 수 있게 해준다.


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

**예시**
- `Array`
- `String`
- `Map`
- `Set`
- `TypedArray`
- `arguments`
- `DOM` 컬렉션 

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
- [MDN docs - Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- 
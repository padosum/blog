---
title   : JavaScript Generator 
date    : 2021-12-08 22:45:14 +0900
updated : 2021-12-27 14:14:43 +0900
aliases : ["제너레이터"]
tags    : ["JavaScript"] 
---

자바스크립트에서는 일단 함수가 실행되기 시작하면 완료될 때까지 계속 실행된다. 그래서 도중에 다른 코드가 끼어들어 실행될 수 없다. 그런데 ES6부터 이런 법칙을 따르지 않는 **제너레이터**라는 새로운 종류의 함수가 등장했다.

제너레이터(generator)는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수이다.  

## 제너레이터 정의하기
제너레이터는 `function` 뒤에 별표(`*`)를 사용해 표현한다. 그리고 키워드 `yield`를 사용한다. 별표는 `function` 바로 다음이나 공백을 두고 사용해도 된다.
```javascript
function* createIterator(x, y) {
  yield 1;
  yield 2;
  yield 3;
}

let it = createIterator();

console.log(it.next().value); // 1
console.log(it.next().value); // 2
console.log(it.next().value); // 3
```
제너레이터는 제너레이터 객체([[JavaScript-Iterator|이터레이터]])를 생성해 반환한다.  
`yield` 키워드는 `next()`가 호출될 때 이터레이터가 반환해야 하는 값과 그 순서를 명시한다. 
`yield`문 이후 실행이 멈춘다. 함수는 이터레이터의 `next()`  메서드가 호출될 때까지 멈춰있는 것이다. 위 코드에서는 `yield 1` 실행 이후 `next()` 메서드 호출 전까지 멈춰있다가 `next()`가 호출되면 그 지점에서 `yield 2`를 실행한다. **이처럼 함수의 중간에서 실행을 멈추는 기능을 이용해 다양한 방식으로 사용할 수 있다.**

### 제너레이터 함수 표현식
제너레이터는 함수 표현식을 사용할 수도 있다.
```javascript
const createIterator = function* () {
  yield 1;
  yield 2;
  yield 3;
};
```
하지만 제너레이터인 [[JavaScript-Arrow-Function|화살표 함수]]를 만드는 것은 불가능하다. 

### 제너레이터 객체 메서드
제너레이터도 함수이기 때문에 객체에 메서드로 추가할 수 있다.
```javascript
const o = {
  createIterator: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}

// 메서드 축약 
const o = {
  * createIterator() {
    yield 1;
    yield 2;
    yield 3;
  }
}
```

## 제너레이터 활용하기 

### 인자 전달하기
`next()` 메서드를 통해 이터레이터에 인자를 전달할 수 있다. 인자를 전달하면 그 인자가 제너레이터 `yield`문의 값이 된다. 
```javascript
function* createIterator() {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
}

let it = createIterator();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next(4)); // { value: 6, done: false }
console.log(iterator.next(5)); // { value: 8, done: false }
```
- `next()` 메서드는 이터레이터 리절트 객체(`{value, done}`)를 반환한다. 
- 첫 `next()` 호출은 첫 번째 `yield` 표현식까지 실행되고 일시 중지된다.
	- 첫 `next()` 호출은 어떤 인자를 전달해도 손실된다.
	- `value` 프로퍼티에는 첫 번째 `yield` 표현식에서 `yield`된 값 1이 할당된다. 
- 두 번째 `next()` 호출에 인자로 `4`를 전달했다. `4`는 변수 `first`에 할당된다. 할당문을 포함하는 `yield`문에서 표현식의 오른쪽은 첫 `next()` 호출에서 평가되고 왼쪽은 함수 실행을 멈추고 있다가 두 번째 `next()` 호출에서 평가된다. 
- 두 번째 `yield`는 처음 `yield`의 결과에 `2`를 더해 `6`을 반환한다. 
- 세 번째 `next()` 호출은 `5`를 인자로 전달한다. 그 값은 `second` 변수에 할당되고, 세 번째 `yield`문은 `second`를 사용하므로 `8`을 반환한다.  


### 에러 발생시키기 
이터레이터에 에러 조건을 전달하는 것도 가능하다. 다시 수행될 때 에러를 발생시키도록 지시하는 `throw()` 메서드를 실행할 수 있다. 

```javascript
function* createIterator() {
  let first = yield 1;
  let second = yield first + 2;
  yield second + 3;
}

let it = createIterator();

console.log(it.next());  // { value: 1, done: false }
console.log(it.next(4)); // { value: 6, done: false }
console.log(it.throw(new Error("Error")));
```
`throw()`가 호출되면 `let second`가 평가되기 전에 에러가 발생한다. 코드 실행을 멈춘다. 

```javascript
function* createIterator() {
  let first = yield 1;
  let second;

  try {
    second = yield first + 2; // yield 4 + 2를 수행한 후 에러 발생
  } catch (ex) {
    second = 6; // 에러 발생 시 다른 값 할당
  }
  yield second + 3;
}

let iterator = createIterator();

console.log(iterator.next());   // { value: 1, done: false }
console.log(iterator.next(4));  // { value: 6, done: false }
console.log(iterator.throw(new Error("Boom"))); // { value: 9, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```
`throw()` 메서드도 객체를 반환한다. 

### 제너레이터 return 문
제너레이터도 함수이기 때문에 실행 종료를 위해 `return`문을 사용할 수 있다.   
```javascript
function* createIterator() {
  yield 1;
  return;
  yield 2;
}

let it = createIterator();

console.log(it.next()); // { value: 1, done: false}
console.log(it.next()); // { value: undefined, done: true }
```

### 제너레이터 위임하기
두 제너레이터의 값을 하나로 합치는 게 유용할 때도 있다.
```javascript
function* createNumberIterator() {
  yield 1;
  yield 2;
}

function* createColorIterator() {
  yield "green";
  yield "blue";
}

function* createCombinedIterator() {
  yield* createNumberIterator();
  yield* createColorIterator();
  yield true;
}

const it = createCombinedIterator();

console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 'green', done: false }
console.log(it.next()); // { value: 'blue', done: false }
console.log(it.next()); // { value: true, done: false }
console.log(it.next()); // { value: undefined, done: true }
```

### 비동기 작업 수행하기
**제너레이터는 `next()` 메서드, `yield` 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다. 이런 특성을 이용해 프로미스를 사용한 비동기 처리를 동기 처럼 구현할 수 있다.**
```javascript
// 제너레이터 실행기
const async = generatorFunc => {
  const generator = generatorFunc();

  const onResolved = arg => {
    const result = generator.next(arg);

    return result.done
      ? result.value
      : result.value.then(res => onResolved(res));
  };
  return onResolved;
};

(async(function* fetchTodo() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const response = yield fetch(url);
  const todo = yield response.json(); 
  console.log(todo);
})()); 
```

## async/await 
제너레이터를 이용해 비동기 처리를 동기 처리처럼 구현할 수 있지만, 코드가 길어지고 가독성이 나쁘다. [[JavaScript-Async-Await|ES8에서는 제너레이터보다 간단하게 비동기 코드를 동기 코드처럼 동작하도록 구현할 수 있는 `async/await`이 추가되었다.]] 

## reference
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년

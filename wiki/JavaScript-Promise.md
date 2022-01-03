---
title   : JavaScript Promise
date    : 2021-12-08 22:44:36 +0900
updated : 2022-01-03 14:05:27 +0900
aliases : ["프로미스"]
tags    : ["JavaScript"] 
---
## 콜백 패턴의 단점
### 콜백 지옥
`GET` 요청을 위한 함수 작성하기
```javascript
const get = url => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.response));
	} else {
	  console.error(`${xhr.status} ${xhr.statusText}`);
	}
  };
};

get('https://jsonplaceholder.typicode.com/posts/1');
```
`get` 함수는 서버의 응답 결과를 콘솔에 출력한다. 응답 결과를 콘솔에 출력하는 대신 함수가 응답 결과를 반환하게 하려면 어떻게 해야할까?  

`get`은 비동기 함수. 비동기 함수는 함수 내부에 비동기로 동작하는 코드를 포함한 함수를 의미한다. 
비동기 함수를 호출하면 함수 내부의 비동기로 동작하는 코드가 완료되지 않았다 해도 기다리지 않고 즉시 종료된다. 즉 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 이후에 완료된다. 따라서 **내부 비동기 코드의 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하는 것은 기대한 대로 동작하지 않는다.**  따라서 비동기 함수의 처리 결과에 대한 후속 처리는 비동기 함수 내부에서 수행해야 한다. 보통 콜백 함수를 전달하는 것이 일반적이다. 필요에 따라 비동기 처리가 성공하면 호출할 콜백 함수, 실패하면 호출될 콜백 함수를 전달할 수 있다.
```javascript
const get = (url, success, failure) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
	  success(JSON.parse(xhr.response));
	} else {
	  failure(xhr.status);
	}
  };  
};

get('https://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
```

그런데 여기서 만약 비동기 처리 결과를 통해 또 다른 비동기 함수를 호출해야 한다면 ? 이 콜백이 중첩될 것이다. 이를 콜백 지옥(Callback hell)이라고 부른다. 
```javascript
get('/posts/1', ({ userId }) => {
  get(`/users/${userId}`, userInfo => {
    console.log(userInfo.name);
    get(`/albums/${userId}`, albumInfo => {
      console.log(albumInfo);
	});
  });
});
```
그나마 위의 코드는 따라가기 쉬운 단순한 코드이다. 실무에서 맞닥뜨리는 비동기 코드를 추론하려고 할 때 코드들이 터무니없게 뒤죽박죽 섞여 있다면 생각만해도 끔찍하다.  

이처럼 콜백 지옥은 코드의 가독성을 나쁘게 하고 이로 인해 에러가 발생할 확률이 높아지고, 관리 측면에서도 좋지 않다.  

### 믿음성 문제
[[JavaScript-Asynchronous-Programming|콜백 함수의 개념을 프로그램의 연속이란 관점에서 보기]]
```javascript
// A
ajax("...", function() {
  // C
});
// B
```
- `A`와 `B`는 '지금' 실행되지만 `C`는 다른 프로그램(`ajax()`라는 라이브러리에서 불러온 함수)의 제어하에 나중에 실행된다.  
- 제어권 교환이야 말로 콜백 중심적 설계의 가장 큰 문제점
- 위 코드의 `ajax()`는 개발자가 작성하거나 또는 서드 파티가 제공한 유틸리티인 경우가 많다.  
- 자신이 작성한 코드인데도 실행 흐름은 서드 파티에 의존해야 하는 상황을 제어의 역전(Inversion of Control)이라고 한다.  
	- (꼭 서드 파티 유틸리티를 쓰지 않더라도) 제어의 역전으로 빚어진 믿지 못할 코드를 완화할 장치가 없는 상황에서 콜백을 사용한다면, 나중에 버그가 발견되어 난감해질 수 있다. 
---
- 콜백이 제대로 구현되지 않은 라이브러리를 사요하는 프로그램은 아주 디버깅이 힘들다.
	- 오늘날 아주 많은 프로그래머가 프로그래밍이 단순히 함수와 라이브러리를 서로 조합하는 과정인 것처럼 배우기 때문에 이런 경우가 더 문제가 된다.
- 자바스크립트는 "프로미스"라는 구성요소를 추가해 이 문제를 처리하기 시작했다.
	- 프로그래머가 원하는 것은 코드를 더 간단히 작성하는 것이기 때문이다.
## 프로미스
### 프로미스 생성하기
프로미스 객체는 `Promise`  생성자 함수를 호출해서 생성한다.
```javascript
const promise = new Promise(function(resolve, reject) {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.

  if (비동기 처리 성공)
    resolve(성공시 돌려줘야 할 값);
  else // 비동기 처리 실패 
    reject(실패 시 돌려줘야 할 값);
});
```
1. 프로미스에 비동기 연산을 수행하는 함수를 넘긴다. 함수는 두 함수를 인자로 받는데 첫 번째 함수는 비동기 연산이 성공적으로 종료하면 호출해야 하는 함수, 두 번째 함수는 비동기 연산이 실패하면 호출해야 하는 함수
2. 프로미스에 넘기는 함수는 비동기 연산을 수행하고, 수행 성공이나 실패에 따라 `resolve`나 `reject` 를 호출하면 자바스크립트가 이를 이벤트 큐에 넣어준다.

프로미스 내부 `[[PromiseState]]` 프로퍼티는 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태를 반영하여 설정된다. 
- `pending`: 비동기 처리가 아직 수행되지 않은 상태 
- `fulfilled`: 비동기 처리가 수행된 상태(성공)
- `rejected`: 비동기 처리가 수행된 상태(실패) 
생성된 직후의 프로미스는 기본적으로 `pending` 상태이고 이후에 비동기 처리가 수행되면 처리 결과에 따라 프로미스의 상태가 변한다.
- 비동기 처리 성공시 `resolve` 함수를 호출해서 프로미스를 `fulfilled` 상태로 변경
- 비동기 처리 실패시 `reject` 함수를 호출해서 프로미스를 `rejected` 상태로 변경 

프로미스에는 위 비동기 처리 상태와 더불어 **처리 결과**도 갖는다. 

### 프로미스 후속 처리 메서드
프로미스의 비동기 처리 상태가 변화하면 처리 결과에 따른 후속 처리도 필요하다. 이를 위해서 후속 메서드인 `then`, `catch`, `finally`를 제공한다.  

**프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다.** 이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달된다.  
모든 후속 처리 메서드는 프로미스를 반환하고, 비동기로 동작한다. 

#### Promise.prototype.then
`then` 메서드는 두 개의 콜백 함수를 인수로 전달받는다.
- 첫 번째 콜백 함수: 프로미스가 `fulfilled` 상태가 되면 호출. 프로미스의 비동기 처리 결과를 인수로 전달받음
- 두 번째 콜백 함수: 프로미스가 `rejected` 상태가 되면 호출. 프로미스의 에러를 인수로 전달받음 

```javascript
new Promise(resolve => resolve('fulfilled'))
  .then(v => console.log(v), e => console.error(e)); // fulfilled

new Promise((_, reject) => reject(new Error('rejected')))
  .then(v => console.log(v), e => console.error(e)); // Error: rejected
```
**`then` 프로미스는 언제나 프로미스를 반환한다.** 만약 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 `resolve`나 `reject`하여 프로미스를 생성한 뒤 반환한다.  

💡 `then` 메서드를 구현한 객체를 대너블(thenable)이라 부른다. 모든 프로미스는 대너블이지만 모든 대너블이 프로미스는 아니다.  

#### Promise.prototype.catch
`catch` 메서드는 하나의 콜백 함수를 인수로 전달받는다. 콜백 함수는 프로미스가 `rejected` 상태인 경우만 호출된다. 
```javascript
new Promise((_, reject) => reject(new Error('rejected')))
  .catch(e => console.log(e)); // Error: rejected
```
`catch`는 `then(undefined, onRejected)`와 동일하므로 `then` 메서드처럼 언제나 프로미스를 반환한다.

### Promise.prototype.finally
`finally` 메서드는 하나의 콜백 함수를 인수로 전달받고, 콜백 함수는 프로미스의 성공과 실패에 상관없이 무조건 한 번 호출된다. 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있는 경우에 유용하다. 언제나 프로미스를 반환한다.
```javascript
new Promise(() => {})
  .finally(() => console.log('finally')); // finally
```

#### Get 요청 함수를 프로미스를 이용해 구현하기
```javascript
const get = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
	  } else {
	    reject(new Error(xhr.status));
	  }
    };
  });
};

get('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => console.log(res))
  .catch(err => console.error(err))
  .finally(() => console.log('Bye!'));
```

## 프로미스 에러 처리하기
비동기 처리에서 발생한 에러는 `then` 메서드의 두 번째 콜백 함수나 `catch` 메서드를 사용해서 처리할 수 있다.
```javascript
get('https://jsonplaceholder.typicode.com/wrong')
  .then(res => console.log(res),
		err => console.error(err)
); // Error: 404

get('https://jsonplaceholder.typicode.com/wrong')
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

`then` 메서드의 두 번째 콜백 함수는 첫 번째 콜백 함수에서 발생한 에러를 캐치하지는 못한다. 반면에 `catch` 메서드를 사용하면 `then` 메서드 내부에서 발생한 에러와 비동기 처리에서 발생한 에러 모두 캐치가 가능하다. 그래서 `catch` 메서드를 사용하는 것이 가독성도 좋고 명확하다. 
```javascript
get('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => console.wrong(res),
		err => console.error(err)
);

get('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => console.wrong(res))
  .catch(err => console.error(err));
```

## 프로미스 체이닝
프로미스는 `then`, `catch`, `finally` 메서드를 이용해 콜백 패턴의 콜백 지옥 문제를 해결한다. 
`then`, `catch`, `finally` 메서드는 언제나 프로미스를 반환하기 때문에 연속적으로 호출할 수 있다. 이를 **프로미스 체이닝**이라고 한다. 프로미스 체이닝을 통해 후속 처리를 하니 콜백 지옥이 발생하진 않지만 프로미스도 콜백 패턴을 사용하니 콜백 함수를 사용하지 않는 것은 아니다.   
콜백 패턴은 가독성이 좋지 않다. ES8에 도입된 `async/await`을 통해 이 문제를 해결할 수 있다. (후속 처리 메서드 없이 동기 처리 처럼 프로미스 처리 결과를 반환하도록 구현이 가능해졌다.) [[JavaScript-Generator|제너레이터]] 참고

## 프로미스의 정적 메서드
`Promise`는 5가지 정적 메서드를 제공한다.

### Promise.resolve / Promise.reject
`Promise.resolve`와 `Promise.reject`는 이미 존재하는 값을 래핑해서 프로미스를 생성하기 위해 사용한다.  

`Promise.resolve`는 인수로 전달받은 값을 `resolve`하는 프로미스를 생성한다.
```javascript
const resolved = Promise.resolve('Hello');
resolved.then(console.log); // Hello
```

`Promise.reject`는 인수로 전달받은 값을 `reject`하는 프로미스를 생성한다.
```javascript
const rejected = Promise.reject(new Error('Error'));
rejected.catch(console.log); // Error: Error
``` 

### Promise.all
`Promise.all`은 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다.
```javascript

```
`Promise.all`은 프로미스를 요소로 갖는 배열 등의 [[JavaScript-Iterator|이터러블]]을 인수로 전달받고, 전달받은 모든 프로미스가 전부 `fulfilled` 상태가 되면 모든 처리 결과를 배열에 저장해서 새로운 프로미스를 반환한다.  
인수로 입력된 순서대로 처리 결과를 배열에 저장해서 그 배열을 `resolve`하는 새로운 프로미스를 반환한다.  

만약 인수로 전달받은 배열의 프로미스가 하나라도 `rejected` 상태가 되면 나머지 프로미스가 `fulfilled` 상태가 되는 것을 기다리지 않고 즉시 종료한다.  

### Promise.race
`Promise.race`는 `Promise.all`처럼 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 받는다. 하지만 모든 프로미스가 `fulfilled` 상태가 되는 것을 기다리진 않고 가장 먼저 `fulfilled` 상태가 된 프로미스의 처리 결괄를 `resolve`하는 새로운 프로미스를 반환한다.  

전달받은 프로미스 중 하나라도 `rejected`가 되면 `Promise.all` 처럼 에러를 `reject`하는 새로운 프로미스를 즉시 반환한다. 

### Promise.allSettled
`Promise.allSettled` 는 전달받은 프로미스가 모두 비동기 처리가 수행된 상태, `fulfilled` 또는 `rejected`가 되면 처리 결과를 배열로 반환한다.  


## 마이크로태스크 큐
```javascript
setTimeout(() => console.log(1), 0);

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```
프로미스의 후속 처리 메서드도 비동기로 동작하니 1->2->3 순서로 출력될 것처럼 보이지만, 2->3->1의 순서로 출력된다. 그 이유는 프로미스의 후속 처리 메서드의 콜백 함수는 태스크 큐가 아닌 마이크로태스크 큐에 저장되기 때문이다.   
마이크로태스크 큐에는 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장된다. 그리고 태스크 큐보다 우선순위가 높아서 이벤트 루프는 콜 스택이 비면 마이크로태스크 큐에 대기한 함수를 먼저 실행한 뒤, 마이크로태스크 큐가 비면 태스크 큐에서 대기하고 있는 함수를 가져와서 실행한다. 

## fetch
`fetch`함수는 [[XMLHttpRequest]] 객체처럼 [[HTTP]] 요청 전송 기능을 제공하는 Web API다.  

`fetch`함수는 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점으로부터 자유롭다.  

전송할 URL과, HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정할 수 있다. 
```javascript
const promise = fetch(url [, options]);
```

`fetch` 함수는 HTTP 응답을 나타내는 `Response` 객체를 래핑한 `Promise` 객체를 반환한다.
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => console.log(response));
```

`Response.prototype`에는 다양한 메서드를 제공한다. `json` 메서드는 `Response` 객체에서 HTTP 응답 몸체를 얻어서 [[JSON|역직렬화]]한다. 
```javascript
const url = 'https://jsonplaceholder.typicode.com/todos';
const payload = {
  userId: 1,
  title: 'JavaScript',
  complete: false
};

fetch(url, {
  method: 'POST',
  headers: { 'content-Type': 'application/json' },
  body: JSON.stringify(payload)
}).then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
```

## 프로미스를 사용하는 이유
- 프로미스는 체이닝(연쇄 호출)이 가능하다. 
- 콜백 지옥과 비교해서 유지보수 편의성이 뛰어나다.
	- **제품의 전체적인 생명주기에서 유지보수 편의성이 코드를 누군가가 좋아하는 스타일로 작성하는 것보다 더 중요하다.**
	- 프로미스를 사용하면 내포의 깊이를 줄일 수 있지만 조금 더 읽기 편한 코드를 원한다면 `async/await`을 사용하는 것이 좋다. [[JavaScript-Async-Await|JavaScript async/await]] 참고

## 같이 보기
- [JavaScript Visualized: Promises & Async/Await](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)

## reference
- [[한-권으로-읽는-컴퓨터-구조와-프로그래밍|한 권으로 읽는 컴퓨터 구조와 프로그래밍]]
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년

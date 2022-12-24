---
title   : JavaScript async/await 
date    : 2021-12-08 22:45:53 +0900
updated : 2022-12-24 13:20:40 +0900
aliases : ["JavaScript async/await"] 
tags    : ["JavaScript"]
---
[[JavaScript-Asynchronous-Programming|비동기]] 코드를 [[Synchronous|동기]]적인 코드처럼 작성하기 위해 ES8부터 `async/await`가 도입되었다.

```javascript
(async function() {
  let contents = await readFile("config.json");
  doSomethingWith(contents);
  console.log("DONE");
});
```
## async 함수
- `async` 함수는 `async` 키워드를 사용해 정의한다.
- `async` 함수는 언제나 [[JavaScript-Promise|프로미스]]를 반환한다. (명시적으로 반환하지 않으면 암묵적으로 반환값을 `resolve` 하는 프로미스를 반환한다.)
- `await` 키워드는 `async` 함수 내부에서 사용해야 한다. 

## await 키워드
- `await` 키워드는 프로미스가 비동기 처리가 수행된 상태(`settled`)가 될 때까지 기다리다가 수행된 상태가 되면 프로미스가 `resolve` 한 처리 결과를 반환한다. 
- `await` 키워드는 반드시 프로미스 앞에 사용해야 한다.
- 비동기 처리가 서로 연관된 것이 아니면 모든 프로미스에 `await`을 사용하는 것은 주의해야 한다. 대신 `Promise.all`을 사용하는 것이 좋다. 

## 에러 처리
```javascript
const getData = async() => {
  try {
    const url = 'https://something.wrong';

    const response = await fetch(url);
    const data = await resonse.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

getData();
```

- `async/await` 에서 에러 처리는 `try...catch`문을 사용할 수 있다. 
	- `async` 함수 내에 `catch`문을 사용해 에러처리를 하지 않는 경우엔 `async` 함수는 발생한 에러를 `reject`하는 프로미스를 반환한다. 함수 호출 후에 `catch` 메서드를 사용해 에러를 캐치할 수 있다. 


## async/await가 메인 스레드를 차단하는 것일까?

나와 비슷한 생각을 하는 사람이 있었는지 [글](https://medium.com/geekculture/does-async-await-block-javascript-main-thread-c07db9c48c3e) 을 하나 발견할 수 있었다.

[[JavaScript-Asynchronous-Programming|비동기 프로그래밍]]에 대해 학습하고 나니 이상하게 헷갈렸다.
바로 "`async/await`을 사용하면 "동기"처럼 작동하니, 메인 스레드를 블로킹하고 있지 않을까?" 하는 점이다.

왜냐하면 다음 코드의 결과를 생각했을 때, 첫 번째 응답을 받을 때까지 두 번째 요청의 실행을 막는 것처럼 느꼈기 때문이다.
```js
async function getUserData(){
	let response1 = await fetch('https://jsonplaceholder.typicode.com/users');
	let response2 = await fetch('https://jsonplaceholder.typicode.com/users');
	let response3 = await fetch('https://jsonplaceholder.typicode.com/users');
}
getUserData();
```

그런데 다음 코드를 보고 나니 바로 의문이 풀렸다.
```js
async function getUserData(){
	let response1 = await fetch('https://jsonplaceholder.typicode.com/users');
	let response2 = await fetch('https://jsonplaceholder.typicode.com/users');
	let response3 = await fetch('https://jsonplaceholder.typicode.com/users');
	
	console.log("모든 promise 실행 후");
}
getUserData();
console.log("Hello World");
```
`getUserData`에 적힌 `모든 promise 실행 후`가 출력되기 전에 `Hello World`가 출력된다.

`async/await`은 비동기 처리를 동기처럼 보이게 하는 "문법적 설탕"일 뿐이었다. 혼동하지 말자!!
``



## reference
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
---
title   : JavaScript async/await 
date    : 2021-12-08 22:45:53 +0900
updated : 2022-01-03 14:07:08 +0900
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


## reference
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
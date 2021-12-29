---
title   : JavaScript Promise
date    : 2021-12-08 22:44:36 +0900
updated : 2021-12-08 22:45:12 +0900
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

promise.then(function(value) {
  // resolve에 전달된 값을 value로 받아서 비동기 연산 성공 시 해야 할 일을 처리
  },
  function(value) {
  // reject에 전달된 값을 value로 받아서 비동기 연산 실패 시 해야 할 일을 처리
  }
})
```
1. 프로미스에 비동기 연산을 수행하는 함수를 넘긴다. 함수는 두 함수를 인자로 받는데 첫 번째 함수는 비동기 연산이 성공적으로 종료하면 호출해야 하는 함수, 두 번째 함수는 비동기 연산이 실패하면 호출해야 하는 함수
2. 프로미스에 넘기는 함수는 비동기 연산을 수행하고, 수행 성공이나 실패에 따라 `resolve`나 `reject` 를 호출하면 자바스크립트가 이를 이벤트 큐에 넣어준다.


## 프로미스를 사용하는 이유
- 프로미스는 체이닝(연쇄 호출)이 가능하다. 
- 콜백 지옥과 비교해서 유지보수 편의성이 뛰어나다.
	- **제품의 전체적인 생명주기에서 유지보수 편의성이 코드를 누군가가 좋아하는 스타일로 작성하는 것보다 더 중요하다.**
	- 프로미스를 사용하면 내포의 깊이를 줄일 수 있지만 조금 더 읽기 편한 코드를 원한다면 `async/await`을 사용하는 것이 좋다. 


## reference
- [[한-권으로-읽는-컴퓨터-구조와-프로그래밍|한 권으로 읽는 컴퓨터 구조와 프로그래밍]]
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년
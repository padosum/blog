---
title   : XMLHttpRequest 
date    : 2021-12-28 20:17:16 +0900
updated : 2021-12-28 20:17:24 +0900
aliases : 
tags    : 
---
[[HTTP]] 요청을 하는 방법은 다음과 같은 것들이 있다. 

![[address bar.png]]
- 브라우저의 주소창에 URL을 입력하거나 새로고침을 누르면 웹 브라우저는 해당 URL로 `GET` 요청을 보낸다.  

![[a.png]]
- 웹 페이지에서 `<a>` 태그로 구현된 링크를 클릭하면 `href` 속성에 명시한 URL로 `GET` 요청을 보낸다.

![[form.png]]
- 웹 페이지의 `<form>` 태그로 구현된 양식에 데이터를 입력하고 전송하면 `<form>` 태그의 `method` 속성에 명시된 [[HTTP-Method|HTTP 메서드]]와 `action` 속성에 명시된 URL로 요청을 보낸다. 
- **자바스크립트를 사용해서 HTTP 요청을 전송하려면 `XMLHttpRequest` 객체를 사용한다.**  

## XMLHttpRequest 객체 생성하기
생성자 함수를 호출해서 생성한다. 브라우저에서 제공하는 Web API이므로 브라우저 환경에서만 실행된다.
```javascript
const xhr = new XMLHttpRequest();
```

## XMLHTtpRequest 객체의 프로퍼티, 메서드
### XMLHttpRequest 객체의 프로토타입 프로퍼티
- `readyState`
	- HTTP 요청의 현재 상태를 나타내는 정수, 다음과 같은 정적 프로퍼티를 값으로 갖는다.
		- `UNSET: 0`
		- `OPEND: 1`
		- `HEADERS_RECEIVED: 2`
		- `LOADING: 3`
		- `DONE: 4`
- `status`
	- HTTP 요청에 대한 응답 상태([[HTTP-Status-Codes|HTTP 상태 코드]])를 나타내는 정수 
- `statusText`
	- HTTP 요청에 대한 응답 메시지를 나타내는 문자열
- `responseType`
	- HTTP 응답 타입 
	- `document`, `json`, `text`, `blob`, `arraybuffer`
- `response`
	- HTTP 요청에 대한 응답 몸체(response body)
- `responseText`
	- 서버가 전송한 HTTP 요청에 대한 응답 문자열

### XMLHttpRequest 객체의 이벤트 핸들러 프로퍼티
- `onreadystatschange`
	- `readyState` 프로퍼티 값이 변경된 경우
- `onloadstart`
	- HTTP 요청에 대한 응답을 받기 시작한 경우
- `onprogress`
	- HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생
- `onerror`
	- HTTP 요청에 에러가 발생한 경우
- `onload`
	- HTTP 요청을 성공적으로 완료한 겨우
- `ontimeout`
	- HTTP 요청 시간이 초과된 경우
- `onloadend`
	- HTTP 요청이 완료된 경우, HTTP 요청이 성공 또는 실패하면 발생

### XMLHttpRequest 객체의 메서드
- `open`
	- HTTP 요청 초기화
- `send`
	- HTTP 요청 전송
- `abort`
	- 이미 전송된 HTTP 요청 중단
- `setRequestHeader`
	- 특정 HTTP 요청 헤더의 값을 설정
- `getResponseHeader`
	- 특정 HTTP 요청 헤더의 값을 문자열로 반환

### XMLHttpRequest 객체의 정적 프로퍼티
- `UNSENT`: 값 `0`, `open` 메서드 호출 이전
- `OPENED`: 값 `1`, `open` 메서드 호출 이후
- `HEADERS_RECEIVED`: 값 `2`, `send` 메서드 호출 이후
- `LOADING`: 값 `3`, 서버 응답 중(응답 데이터 미완성 상태)
- **`DONE`**: 값 `4`, 서버 응답 완료

## HTTP 요청 전송하기
1. `XMLHttpRequest.prototype.open` 메서드로 HTTP 요청을 초기화한다.
2. 필요에 따라 `XMLHttpRequest.prototype.setRequestHeader` 메서드로 특정 HTTP 요청의 헤더 값을 설정한다.
3. `XMLHttpRequest.prototype.send` 메서드로 HTTP 요청을 전송한다.

```javascript
const xhr = new XMLHttpRequest();

xhr.open('GET', '/members');

xhr.setRequestHeader('content-type', 'application/json');

xhr.send();
```

### XMLHttpRequest.prototype.open
- `open` 메서드는 서버에 전송할 HTTP 요청을 초기화한다.

```javascript
XMLHttpRequest.open(method, url[, async[, user[, password]]])
```
- `method`: [[HTTP-Method|HTTP 메서드]]
- `url`: HTTP 요청을 전송할 URL
- `async`: [[Asynchronous|비동기]] 요청 여부, 옵션으로 기본값은 `true`
- `user`, `password`: 옵션으로 인증 목적에 사용

### XMLHttpRequest.prototype.send
- `send` 메서드는 `open` 메서드로 초기화된 HTTP 요청을 서버에 전송한다.
- 요청 메시지에 담아 전송할 데이터(payload)를 인수로 전달할 수 있다. 페이로드가 객체인 경우 반드시 `JSON.stringify` 메서드를 사용해서 직렬화한 다음 전송해야 한다. ([[JSON]] 참고)

### XMLHttpRequest.prototype.setRequestHeader
- 특정 HTTP 요청의 헤더 값을 설정한다. 


## HTTP 응답 처리하기
- 서버가 전송한 응답을 처리하기 위해서는 `XMLHttpRequest` 객체가 발생시키는 이벤트를 캐치해야 한다.
- `readyState` 프로퍼티 값이 변경된 경우 발생하는 `readystatechange` 이벤트를 캐치하여 응답을 처리할 수 있다.
	- `load` 이벤트를 사용할 수도 있다. 

```javascript
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');

xhr.send();

xhr.onreadystatechange = () => {
  if (xhr.readyState !== XMLHttpRequest.DONE) return;
	
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
}

xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.response));
  } else {
    console.error('Error', xhr.status, xhr.statusText);
  }
}
```
- https://jsonplaceholder.typicode.com은 Fake [[REST-API|REST API]]를 제공하는 서비스이다.

## reference
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
- [MDN Web Docs - XMLHttpRequest.open()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)
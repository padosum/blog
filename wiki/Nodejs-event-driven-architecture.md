---
title : Node.js event-driven architecture
date : 2024-02-24 15:35:43 +0900
updated : 2024-03-03 22:18:07 +0900
aliases :
tags : [“How to”, “글또”, “Node.js”]
description :
draft : false
---

Node.js를 가지고 백엔드 개발을 하고 있지만 그동안 필요한 부분만 아주 조금씩 찾아 공부했다. 그래서 2009년에 나온 Node.js와 내 지식의 간극을 메꾸는 노력이 필요해 보인다.  
Node.js 공식 문서나 관련 글들을 보면 “event-driven [[architecture]]”라는 용어가 등장하는데 이번 기회에 무엇을 의미하는 말인지 학습하기로 했다.

## Node.js 코드가 실행되는 곳에서 무슨 일이 일어날까

먼저 Node.js는 무엇으로 구성되어 있는지 조금 알아볼 필요가 있었다.  
Node.js 내부적으로 코드를 실행할 때 필요한 dependency가 존재한다. 그중 가장 중요한 것이 V8과 libuv다.

### V8

Node.js는 구글 크롬의 [[Javascript-Engine|JavaScript 엔진]]인 V8 덕분에 자바스크립트 코드를 브라우저 밖에서 실행할 수 있다. 그래서 다음과 같이 터미널에서 node.js를 실행할 수 있는 것이다.

```js
node hello-world.js
```

V8은 일부 코드는 [[JavaScript]], 일부는 C++로 작성되어 있다.

### libuv

Node.js의 모든 기능은 V8 엔진만으로 충분하지 않다. libuv 덕분에 운영체제, 네트워크, 파일에 접근할 수 있다. libuv는 C++로 작성되어 있다.

Node.js의 매력은 웹 프로그래밍에서 백엔드, 프론트엔드 모두 JavaScript라는 하나의 언어로 코드를 작성할 수 있다는 것이다. C++로 작성된 핵심적인 기능들을 개발자가 JavaScript 코드를 작성하기만 해도 잘 연결해 주는 역할을 한다.

JavaScript 코드를 C++ 코드와 어떻게 “연결”해주는지 궁금해져서 [node repository](https://github.com/nodejs/node)를 살펴봤다. 다른 많은 글에서 repository에 대한 부연 설명도 찾아볼 수 있었다.  
크게 다음 두 가지 디렉터리를 설명하고 있었다.

- `lib` 디렉터리는 node의 함수와 모듈들이 정의된 곳이다. JavaScript로 작성되어 있다.
- `src` 디렉터리는 모든 함수의 C++ 구현이 들어가 있는 곳이다.

그럼 `lib` 내부 함수, 모듈을 개발자가 사용하고 그 기능은 `src` 내부에 작성되어 있을 것이라 유추할 수 있다.  
`lib/timers.js` 파일을 열어보면 `setTimeout`, `setInterval`, `setImmediate` 함수가 정의되어 있는 것을 확인할 수 있다.

```js
function setTimeout(callback, after, arg1, arg2, arg3) {
  // …
  const timeout = new Timeout(callback, after, args, false, true)
}
```

`Timeout` 클래스를 따라 들어가 보면 `const binding = internalBinding(‘timers’);`라는 코드가 존재한다.  
이 `internalBinding` 함수가 실제로 C++ 함수를 호출하는 함수이다. 예전에는 `process.binding` 함수를 사용했다고 한다.

C++ 코드로 넘어가니 정신이 혼미해졌다. 다음에 기회가 된다면 이해할 수 있게 공부하고 싶다.

### 스레드

> JavaScript는 단일 스레드다.

JavaScript의 비동기 처리를 배울 때쯤 등장하는 문구다. Node.js도 단일 스레드인데, 그럼 이 스레드는 무엇을 의미하는 것일까?

프로그램 코드가 실행되는 것을 프로세스라 한다. 다음과 같이 Node.js 코드를 실행하면 node process가 실행되는 것이다.

```js
node index.js
```

스레드는 컴퓨터의 CPU가 실행해야 하는 명령어의 목록이다. 프로세스 안에 여러 스레드가 존재할 수 있다.  
하지만 Node.js는 단일 스레드라고 했다. 프로세스 내에 코드를 실행할 수 있는 상자가 여러 개가 아닌 하나가 있는 것이다.

파일 시스템에 접근하는 것, 네트워크 요청, 데이터베이스 접근 등 I/O 작업은 시간이 오래 걸린다.
그래서 I/O 작업을 수행하는 코드가 있으면 다음 코드 실행이 지연될 수 있다. 이를 블로킹(Blocking)이라고 한다.
[[JavaScript-Asynchronous-Programming|브라우저에서 "이벤트 루프"라는 것을 사용해 이 블로킹 문제를 해결]]했는데, Node.js에도 이벤트 루프를 사용한다.

이벤트는 시스템 또는 앱의 상태에서 중요한 변경이나 발생으로 정의되는 것들이다. 사용자가 앱을 조작하거나 외부 시스템, 내부 시스템 등 다양한 소스에 의해 트리거 될 수 있는 것들을 말한다. **“event-driven(이벤트 기반)” architecture**는 이 이벤트에 응답하고 이벤트에 대한 정보를 적절한 곳으로 전파하기 위해 설계된다.

예를 들어, HTTP 요청이 들어오거나 파일 입출력이 완료되거나 타이머가 만료되는 등의 이벤트가 발생하면, Node.js의 이벤트 루프가 해당 이벤트 핸들러(콜백 함수)를 트리거 한다.
Node.js 프로그램이 실행되면 단일 스레드가 생성된다. 그리고 작성된 모든 코드가 실행되고 이벤트 루프도 동작하기 시작한다. 그리고 콜백 함수들이 등록된다.  

Node.js 공식 문서에서 이벤트 루프의 작동 순서를 다음과 같이 표현해 놨다.

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

위에서 그려진 각 박스는 “단계”를 의미한다. 각 단계에 이벤트 큐라는 것이 존재한다. 이벤트 루프가 특정 단계에 들어가면 해당 단계에 있는 모든 작업을 수행한 다음 큐에 콜백이 모두 소진되거나 최대 콜백 수가 실행될 때까지 해당 단계에서 콜백의 큐를 실행하게 된다. 그러고 나서 다음 단계로 이동하는 것이다.

- `timers`: `setTimeout` 과 `setInterval` 에 전달된 콜백 실행
- `pending callbacks`: 다음 루프 반복으로 연기된 I/O 콜백 실행
- `idle`, `prepare`: 내부적으로만 사용
- poll: 새로운 I/O 이벤트를 가져오고, I/O 관련 콜백을 실행
- check: `setImmediate()` 콜백 실행
- close callbacks: `socket.on(‘close’, …)` 같은 close 콜백 실행

이벤트 루프가 매번 실행될 때마다, Node.js는 비동기 I/O 또는 타이머가 대기 중인지 확인하고 **더 이상 대기 중인 것이 존재하지 않는 경우 프로그램이 종료된다.** 루프가 끝이 나는 것이다.

tick이라는 용어도 자주 등장하는데, tick은 이벤트 루프 내의 한 단계에서 다음 단계로 이동을 의미한다.
`process.nextTick()` 메서드는 이벤트 루프의 일부는 아니고 루프의 현재 단계에 상관없이 현재 작업이 완료된 후 바로 실행되는 메서드다. 따라서 특정 단계에서 `process.nextTick` 을 호출하면 이벤트 루프가 계속되기 전에 `process.nextTick()`에 전달된 콜백이 먼저 해결되는 것이다.

일부 작업은 실제로 너무 무거워서 이벤트 루프도 버거울 수 있다. 그때 libuv에서 스레드 풀이라는 것을 제공한다. 스레드 풀은 4개 이상의 스레드를 제공한다. 개발자가 “이 작업은 무거우니까.. 스레드 풀로 옮겨야지”라고 직접 옮기는 것이 아니라 이벤트 루프가 알아서 무거운 작업을 스레드 풀로 옮긴다.

## EventEmiiter 클래스

지금까지 단일 스레드에서 비동기 처리를 위해 콜백 패턴을 사용하는 것을 살펴봤는데 Node.js에서는 콜백 패턴 말고도 다른 디자인 패턴이 존재한다. 바로 옵저버 패턴이다.

### 옵저버 패턴

옵저버 패턴은 상태 변화가 일어날 때 관찰자(listener)에게 통지할 수 있는 객체를 정의하는 것이다.
콜백 패턴과 가장 큰 차이점은 콜백은 보통 하나의 listener에게 결과를 전달하지만 옵저버 패턴은 주체가 여러 listener에게 결과를 전달할 수 있다는 것이다.

옵저버 패턴을 직접 구현하려면 클래스 정의부터 메서드를 선언하는 등 아주 복잡할 것이다. Node.js는 옵저버 패턴을 쉽게 구현하기 위해 EventEmitter라는 모듈이 존재한다.

`EventEmitter`는 특정 이벤트에 listener를 등록해두고 발생하면 이를 캐치할 수 있게 해준다.

`EventEmitter` 사용법은 다음과 같다.

```js
import { EventEmitter } from ‘events’

const myEmitter = new EventEmitter()

myEmitter.on(‘hello’, (name) => {
  console.log(‘hello!’, name);
})

myEmitter.on(‘hello’, () => {
  console.log(‘another listener’);
})

myEmitter.emit(‘hello’, ‘padosum’)
```

- `on(event, listener)`: 주어진 이벤트 타입(문자열)에 대해 새로운 listener(함수) 등록
- `once(event, listener)`: 첫 이벤트 전달 후 제거되는 listener 등록
- `emit(event, [arg1], […])`: 새 이벤트를 생성, listener에게 전달할 인자 제공
- `removeListener(event, listener)`: 주어진 이벤트 타입에 대한 listener 제거

[[JavaScript-Add-An-Event-Handler|JavaScript DOM API의 이벤트 listener 등록]]과 비슷해보이는데 차이점은 DOM API의 `addEventListener`는 동일한 listener를 등록하면 중복 인스턴스가 삭제되지만 EventEmitter는 여러 listener가 존재할 수 있다는 것이다.

그래서 이 `EventEmiiter`는 어디서 사용하는 걸까?
여러 문서를 찾아보면 HTTP, 파일 시스템, 타이머 등 **많은 Node.js 모듈이 이벤트 기반(event-driven)**이라고 되어 있다.  
이 말을 확인하기 위해 `http` 모듈을 살펴보기로 했다. web server를 실행하기 위해 다음과 같이 코드를 작성할 수 있다.

```js
const http = require(‘node:http’);
const hostname = ‘127.0.0.1’;
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader(‘Content-Type’, ‘text/plain’);
  res.end(‘Hello World\n’);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

다시 [node.js repository](https://github.com/nodejs/node) 살펴보자.  
`http` 모듈을 살펴볼 것이니 `lib` 디렉터리 내부에 있는 `http.js` 파일을 열어본다.

```js
function createServer(opts, requestListener) {
  return new Server(opts, requestListener)
}
```

`createServer` 함수는 `Server`라는 생성자 함수로 생성된 인스턴스를 반환한다.

```js
function Server(options, requestListener) {
  if (!(this instanceof Server)) return new Server(options, requestListener);
  // …
  this.on(‘connection’, connectionListener);
  this.on(‘listening’, setupConnectionsTracking);
```

코드를 따라가면 `Server`는 `const net = require(‘net’);` 모듈을 사용하고 있음을 확인할 수 있다.  
그리고 함수는 `this`를 `EventEmiiter`에 바인딩 했다.

```js
// lib/net.js
function Server(options, connectionListener) {
  if (!(this instanceof Server))
    return new Server(options, connectionListener);

  EventEmitter.call(this);
```

앞서 이벤트 루프에 대한 이야기를 했을 때 비동기 I/O 또는 타이머가 대기 중인지 확인하고 더 이상 대기 중인 것이 존재하지 않는다면 프로그램이 종료된다고 했는데,  
server를 실행해두면 프로그램은 종료되지 않는다. 무슨 일일까?

`listen` 메서드는 `setupListenHandle` 함수를 실행한다. 해당 함수 내부에는 다음 코드가 작성되어 있다.

```js
defaultTriggerAsyncIdScope(
  this[async_id_symbol],
  process.nextTick,
  emitListeningNT,
  this
)
```

`defaultTriggerAsyncIdScope` 함수는 `process.nextTick`의 콜백으로 `emitListeningNT`를 전달한다.
`listening` 이벤트를 `emit`한다! 그래서 프로그램이 종료되지 않고 이벤트 루프가 돌아가는 것이다.

```js
function emitListeningNT(self) {
  // Ensure handle hasn’t closed
  if (self._handle)
    self.emit(‘listening’);
}
```

## 글을 마치며

이번에 학습하면서 처음으로 Node.js 관련 책을 읽었다. "Node.js 디자인 패턴 바이블"이라는 책인데, 꼭 다 읽어봐야겠다.  
JavaScript를 아니까 Node.js의 코어들은 잘 모르고 넘어갔는데 공부하면서 재밌었다. 한편으로는 “이런 걸 모르더라도 이렇게 저렇게 얼렁뚱땅 개발은 할 수 있긴 하구나..”라는 생각도 들었다. 기초를 다지는 것과 실제로 그 기술을 사용하는 것. 양쪽의 균형을 잘 유지해야겠다.  
마지막으로 어떤 라이브러리에 대해 알고 싶을 때 오픈소스라면, github에서 코드를 보고 싶을 때 바로 볼 수 있다는 사실에 감사한 마음이 들었다. 이 사실을 잘 활용하는 개발자가 되어야겠다!

## references

- [Node.js 디자인 패턴 바이블](https://m.yes24.com/Goods/Detail/101686866)
- [Internals of Node - Advance node](~https://medium.com/front-end-weekly/internals-of-node-advance-node-%EF%B8%8F-8612f6a957d7~)
- [What exactly is a Node.js event loop tick?](~https://stackoverflow.com/questions/19822668/what-exactly-is-a-node-js-event-loop-tick~)
- [https://stackoverflow.com/questions/41137902/how-does-server-listen-keep-the-node-program-running](~https://stackoverflow.com/questions/41137902/how-does-server-listen-keep-the-node-program-running~)
- [What is event-driven programming followed in Node.js](https://www.quora.com/What-is-event-driven-programming-followed-in-Node-js)
- [What exactl is a Node.js event loop tick](https://stackoverflow.com/questions/19822668/what-exactly-is-a-node-js-event-loop-tick)
- [Node.js.org](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

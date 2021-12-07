---
title   : JavaScript 타이머 
date    : 2021-12-07 12:38:13 +0900
updated : 2021-12-07 13:24:56 +0900
aliases : ["타이머"] 
tags    : ["JavaScript"]
---

함수를 일정 시간이 경과된 후에 호출하고 싶다면 **타이머 함수**를 이용해야 한다. 자바스크립트는 타이머를 생성할 수 있는 타이머 함수 `setTimeout`과 `setInterval`을 제공한다. 

`setTimeout` 함수가 생성한 타이머는 단 한 번 동작, `setInterval` 함수가 생성한 타이머는 반복 동작한다. 두 함수가 생성한 타이머가 만료되면 지정된 콜백 함수가 호출된다.  

`setTimeout`, `setInterval`은 [[Asynchronous|비동기]] 처리 방식으로 동작한다.

## 타이머 함수  
### setTimeout, clearTimeout
```javascript
const timeoutID = setTimeout(function[, delay, arg1, arg2, ...]);
const timeoutID = setTimeout(function[, delay]);
const timeoutID = setTimeout(code[, delay]);
```
두 번째 인수로 전달받은 시간(ms)으로 1번 동작하는 타이머를 생성한다. 타이머가 만료된 후 첫 번째 인수로 전달한 코드나 콜백 함수가 호출된다. 

- `function`: 타이머가 만료된 후 호출될 콜백 함수
- `delay`: 타이머 만료 시간, 생략하거나 0을 지정할 경우 "즉시", 더 정확히는 다음 이벤트 사이클에 실행한다. `delay` 시간이 설정된 타이머 만료시 즉시 콜백 함수가 호출되는 것은 보장되지 않는다. (태스크 큐에 콜백 함수를 등록하는 시간을 지연할 뿐)
- `arg1, arg2, ...`: 호출 스케줄링된 콜백 함수에 전달할 추가 매개변수 (Optional)

```javascript
setTimeout(() => console.log('Hi'), 1000); // 1000ms 이후 콜백 함수 호출
setTimeout(name => console.log(`👋 ${name}.`), 1000, 'padosum');
```

`setTimeout` 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 `id`를 반환한다. 이 타이머 `id`를 `clearTimeout` 함수의 인자로 전달하면 타이머를 취소할 수 있다.  
```javascript
const timeoutID = setTimeout(() => console.log('hello'), 10000);
clearTimeout(timeoutID);
```

### setInterval, clearInterval
```javascript
const intervalID = setInterval(function[, delay, arg1, arg2, ...]);
const intervalID = setInterval(function[, delay]);
const intervalID = setInterval(code, [delay]);
```
두 번째 인수로 전달받은 시간(ms)으로 반복 동작하는 타이머를 생성한다. 타이머가 만료된 후 첫 번째 인수로 전달한 코드나 콜백 함수가 호출된다. **타이머가 취소될 때까지 반복된다.**   

- `function`: 타이머가 만료된 후 호출될 콜백 함수 
- `delay`: 타이머 만료 시간, 생략하거나 0을 지정할 경우 "즉시", 더 정확히는 다음 이벤트 사이클에 실행한다. `delay` 시간이 설정된 타이머 만료시 즉시 콜백 함수가 호출되는 것은 보장되지 않는다. (태스크 큐에 콜백 함수를 등록하는 시간을 지연할 뿐)
- `arg1, arg2, ...`: 호출 스케줄링된 콜백 함수에 전달할 추가 매개변수 (Optional)

`setTimeout` 함수와 마찬가지로 생성된 타이머를 식별할 수 있는 고유한 타이머 `id`를 반환한다. 이 타이머 `id`를 `clearInterval` 함수의 인자로 전달하면 타이머를 취소할 수 있다.  

```javascript
let count = 1;
const intervalID = setInterval(() => {
  console.log(count);
  if (count++ === 5) clearInterval(intervalID);
}, 1000);
```

## 같이 보기
- [[JavaScript-Debounce-Throttle|디바운스와 스로틀]]

## reference
- [MDN Web Docs - setTimeout](https://developer.mozilla.org/ko/docs/Web/API/setTimeout)
- [MDN Web Docs - setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
ㄷ---
title   : 이벤트
date    : 2021-10-04 09:26:33 +0900
updated : 2021-10-05 21:48:11 +0900
aliases : ["이벤트"] 
tags    : ["JavaScript"]
---
## 이벤트 Event 
- 어떤 것으로 인해 일어나는 사건,, 웹에선 클릭 같은 것 
- **이벤트로 인해 실행되는 함수를 이벤트 핸들러(이벤트 리스너)라고 한다. 그래서 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라고 한다.** 
```javascript
element.addEventListener('click', 함수);
```

## 이벤트 타입
[표준 이벤트 타입](https://developer.mozilla.org/ko/docs/Web/Events#%EA%B0%80%EC%9E%A5_%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC)  

## 이벤트 핸들러 등록하기  
- [[JavaScript-Add-An-Event-Handler|JavaScript 이벤트 핸들러 등록하는 방법]]

## 이벤트 객체와 위임 
이벤트 핸들러에 자동으로 들어오는 매개변수가 있다. 그것이 바로 이벤트 객체다. 이벤트 객체에는 많은 정보가 들어있다. 만약 이벤트 핸들러를 어트리뷰트 방식으로 등록했다면 `event`라는 이름의 매개변수로 전달발 수 있다. 
### 이벤트 객체의 공통 프로퍼티
`type`: 이벤트 타입
`target`: 실제 이벤트를 발생시킨 DOM 요소
`currentTarget`: 이벤트 핸들러가 바인딩된 DOM 요소
`eventPhase`: 이벤트 전파 단계 
`bubbles`: 이벤트 버블링으로 전파하는지 여부
`cancelable`: `preventDefault` 메서드를 호출해 이벤트 기본 동작을 취소할 수 있는지 여부 
 `defaultPrevented`: `preventDefault` 메서드를 호출하여 이벤트를 취소했는지 여부
 `isTrusted`: 사용자의 행위에 의해 발생한 이벤트인지 여부 
  `timeStamp`: 이벤트가 발생한 시각 
	
### 이벤트 전파와 위임 
- [[Event-Propagation-And-Delegation|이벤트 전파와 위임]]


### 이벤트 핸들러 내부의 this에 대하여 
- 이벤트 핸들러 내부에 `this`는 `addEventListener`를 호출한 객체다. 
- `this` == `이벤트객체.currentTarget`  


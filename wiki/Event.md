---
title   : 이벤트
date    : 2021-10-04 09:26:33 +0900
updated : 2022-05-24 23:20:06 +0900
aliases : ["이벤트"] 
tags    : ["JavaScript"]
---
## 이벤트 Event 
- 어떤 것으로 인해 일어나는 사건,, 웹에선 클릭 같은 것 
- **이벤트로 인해 실행되는 함수를 이벤트 핸들러(이벤트 리스너)라고 한다. 그래서 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라고 한다.** 

```javascript
element.addEventListener('click', 함수);
```

이벤트는 '옵저버'라는 디자인 패턴의 일종인데 이 패턴은 코드를 느슨하게 연결하는 테크닉이다. 이 패턴의 주안점은 객체가 자신에게 어떤 의미가 있는 일이 일어났음을 나타내는 이벤트를 생성한다는 것이다. 다른 객체는 이 객체를 관찰(observe)하고 있다가 이벤트에 응답해 코드를 실행한다.
옵저버 패턴은 두 가지 타입의 객체로 구성된다. '주체(subject)'와 '옵저버'. 주체는 이벤트가 일어났음을 알리고, 옵저버는 이벤트를 주시하며 주체를 관찰하기만 한다. 주체는 옵저버에 대해 전혀 모른다. 주체는 옵저버가 존재하든 존재하지 않든 관계없이 존재하며 자신의 역할을 수행하는 것이다. 반면 옵저버는 주체를 알고 있으며 주체의 이벤트에 콜백(이벤트 핸들러)을 등록한다. [[DOM]]을 조작할 땐 DOM 요소가 주체, 이벤트를 처리하는 코드가 옵저버다.[^1]

## 이벤트 타입
[표준 이벤트 타입](https://developer.mozilla.org/ko/docs/Web/Events#%EA%B0%80%EC%9E%A5_%EC%9D%BC%EB%B0%98%EC%A0%81%EC%9D%B8_%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC)  

## 이벤트 핸들러 등록하기  
- [[JavaScript-Add-An-Event-Handler|JavaScript 이벤트 핸들러 등록하는 방법]]

## 이벤트 객체와 위임 
이벤트 핸들러에 자동으로 들어오는 매개변수가 있다. 바로 이벤트 객체인데 이벤트와 관련된 많은 정보가 들어있다. **이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달되고,** 만약 이벤트 핸들러를 어트리뷰트 방식으로 등록했다면 `event`라는 이름의 매개변수로 전달받아야 한다.

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

## 기본 브라우저 이벤트 취소하기
브라우저는 HTML 페이지를 사용자에게 보여줄 때 사전에 구성된 여러 이벤트를 제공한다. 링크를 클릭하면 클릭 이벤트가 호출되거나 체크박스를 클릭하면 박스가 체크되고, 텍스트 필드에 텍스트 입력을하면 텍스트가 입력되어 화면에 표시되는 것 등이 있다. 이러한 브라우저의 기본 이벤트를 호출되지 않도록 막을 수 있다. `preventDefault()` 메서드를 호출하면 된다.

```javascript
document.querySelector('a').addEventListener("click", (e) => {
  e.preventDefault() // 링크를 클릭하는 이벤트가 취소된다.
})
```

`preventDefault()`는 [[Event-Propagation-And-Delegation|이벤트가 전파되는 것]]을 중지시키지는 않는다.  

이벤트 핸들러의 끝에서 `false`를 반환하면 `preventDefault()`를 호출한 것과 동일한 결과를 갖는다.
```html
<a href="/" onclick="return false">이동되지 않는다!</a>
```

## 커스텀 이벤트
사전에 정의된 이벤트 형식말고도 사용자가 이벤트를 정의해서 사용할 수도 있다. 이런 이벤트를 "커스텀 이벤트(사용자 정의 이벤트)"라고 한다. 커스텀 이벤트의 기본 아이디어는 이벤트를 관리하는 객체를 만들고 다른 객체가 그 이벤트를 주시(listen)하게 하는 것이다.

### 커스텀 이벤트 만들기
다음과 같이 `Event` 생성자로 이벤트를 만들 수 있다.
```javascript
const event = new Event('build')
```

이벤트 객체를 생성한 다음엔 `dispatchEvent(event)`를 호출해서 이벤트를 실행시켜줘야 한다. 그래야 일반 브라우저 이벤트처럼 이벤트 핸들러가 이벤트에 반응할 수 있다.
```javascript
elem.dispatchEvent(event)
```

이벤트 객체에 정보를 전달하기 위해서는 `new CustomEvent`를 사용해서 이벤트를 만들어야 한다. `detail`이라는 속성을 추가해서 커스텀 데이터를 전달할 수 있다.
`bubbles: true`이면 이벤트는 버블링되고, `cancelable: true` 이면 `event.preventDefault()`가 동작한다.
```html
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <form>
      <textarea></textarea>
    </form>

    <script>
      const textarea = document.querySelector("textarea");
      const form = document.querySelector("form");

	  // 이벤트 버블링이 발생해서 
	  // textarea의 input 이벤트 -> form의 logEvent
      const logEvent = new CustomEvent("logEvent", {
        bubbles: true, // 이벤트 버블링
        detail: { name: () => textarea.value },
      });

	  // logEvent가 발생하면
	  // console.log에 logEvent 이벤트 객체의 detail.name 함수를 실행해 전달한다.
      form.addEventListener("logEvent", (e) => console.log(e.detail.name()));

	  // textarea의 input 이벤트가 발생하면
	  // `logEvent`를 실행시킨다.
      textarea.addEventListener("input", (e) => {
        e.target.dispatchEvent(logEvent);
      });
    </script>
  </body>
</html>
```

## reference
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년
- [MDN Web Docs - Creating and triggering events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)

[^1]: 한선용 역, 니콜라스 자카스 저, 《프론트엔드 개발자를 위한 자바스크립트 프로그래밍》, 인사이트, 2013년
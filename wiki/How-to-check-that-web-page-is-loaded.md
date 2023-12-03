---
title: 웹 페이지가 완전히 로드된 것을 확인하는 방법
date: 2021-10-23 19:48:58 +0900
updated: 2022-05-23 22:28:14 +0900
aliases: ['HTML 문서 로딩 관련 이벤트', DOMContentLoaded"]
tags: ['How to', 'Web', 'JavaScript']
---

## Goal

웹 페이지에서 문서가 완전히 로드되었을 때 문서를 조작 가능한지 확인할 수 있어야 하는 경우가 있을 것이다. 이 시점에 접근하기 위해 사용되는 이벤트에 대해 알아보기

💡 자바스크립트를 이용해 [[DOM]]을 조작하려는 경우, DOM 생성이 완료한 이후에 스크립트를 실행해야 에러가 발생할 우려가 없을 것이다. 일반적으로 `</body>` 태그 전에 자바스크립트를 삽입하면 렌더링 엔진이 HTML 요소를 파싱해 DOM 생성을 완료한 이후에 자바스크립트가 실행되기 때문에 후술할 이벤트를 이용할 필요는 없을 것이다. (이벤트에 의존성이 있으면 코드 베이스를 어지럽힐 수 있다.[^1])  
하지만 문서의 `<head>` 영역이나 외부에서 파일이 정의된 경우 이벤트를 이용해 문서 완료 시점을 감지한 후 자바스크립트를 실행해야 한다.  
또는 [[Script-element-async-defer-attribute|script 요소의 async, defer 어트리뷰트]]를 이용하는 방법이 있다.

## onload 이벤트

문서의 모든 리소스(HTML, image, CSS, font, JavaScript 파일 등)의 로딩이 완료되었을 때 발생하는 이벤트이다.

- 모든 리소스가 완전히 불러와졌을 때 발생하므로 리소스가 많은 페이지에선 시간이 걸릴 수 있다.
- **동일한 문서인 경우 하나의 onload만 존재해야 한다.**
- 중복된 경우 마지막 선언이 실행된다.

`onload` 이벤트를 사용하는 방법에는 3가지가 있다. 예시 코드의 `script` 부분은 문서의 모든 리소스의 로드가 완료된 시점에 실행할 스크립트를 의미한다.

### HTML 요소의 속성 방식으로 사용하기

```html
<element onload="script"> <body onload="script"></body></element>
```

### JavaScript 속성 방식

```javascript
object.onload = function () {
  // 문서의 모든 콘텐츠의 로드가 완료된 시점에 실행할 스크립트 내용
}

window.onload = function () {
  // 문서의 모든 콘텐츠의 로드가 완료된 시점에 실행할 스크립트 내용
}
```

### JavaScript `addEventListener` 메서드 방식

```javascript
object.addEventListener('load', script)

window.addEventListener('load', script)
```

### onerror

`onload` 이벤트와 반대로 에러가 발생하면 `onerror` 이벤트가 발생한다.
`onerror` 이벤트를 사용하면 "error 404"와 같이 서버가 다운되어 스크립트를 불러올 수 없는 경우에 확인이 가능할 것이다.

```javascript
let script = document.createElement('script')
script.src = 'https://example.com/404.js'
document.head.append(script)

script.onerror = function () {
  alert('Error loading ' + this.src) // Error loading https://example.com/404.js
}
```

## DOMContentLoaded 이벤트

HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료된 직후에 발생한다. **`onload` 이벤트보다 먼저 발생한다.**

```javascript
window.addEventListener('DOMContentLoaded', function () {})
```

## readystatechange 이벤트

`readystatechange` 이벤트를 지원하는 대상에는 `Document`, `XMLHttpRequest`가 있다.  
`document.readyState` 속성은 문서 로드 상태에 따라 변하는데 이 속성 값이 변경될 때마다 `readystatechange` 이벤트가 발생한다.

이벤트를 지원하는 각 객체에는 `readyState` 프로퍼티가 있으며 값은 다음 중 하나이다.

- `uninitialized`, 객체가 존재하지만 초기화되지 않았다.
- `loading`, 객체에서 데이터를 불러오는 중이다.
- `loaded`, 객체에서 데이터를 완전히 불러왔다.
- `interactive`, 객체를 완전히 불러오지는 못했지만 상호작용은 가능하다.
- `complete`, 객체를 완전히 불러왔다.

`readystatechange` 이벤트는 `load` 이벤트 바로 직전에 발생한다. 따라서 `load` 대신 `readystatechange`를 사용해서 얻는 이점이 별로 없다. [^2]

## 같이 보기

- [[브라우저의-렌더링-과정|브라우저의 렌더링 과정]]
- [[Script-element-async-defer-attribute|script 요소의 async, defer 어트리뷰트]]
- [[XMLHttpRequest]]

## reference

- [문서의 로드시점 - onload, DOMContentLoaded](https://webdir.tistory.com/515)
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년
- 한선용 역, 니콜라스 자카스 저, 《프론트엔드 개발자를 위한 자바스크립트 프로그래밍》, 인사이트, 2013년
- 구경택·박경욱·변치훈·이의호 역, 데이비드 플래너건 저, 《자바스크립트 완벽 가이드》, 인사이트, 2013년
- [JAVASCRIPT.INFO - Resource loading: onload and onerror](https://ko.javascript.info/onload-onerror)

[^1]: 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년, 146쪽
[^2]: 구경택·박경욱·변치훈·이의호 역, 데이비드 플래너건 저, 《자바스크립트 완벽 가이드》, 인사이트, 2013년, 567쪽

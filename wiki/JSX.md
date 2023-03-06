---
title   : JSX
date    : 2021-10-04 22:08:44 +0900
updated : 2023-03-06 22:41:47 +0900
aliases : 
tags    : 
---
- [[User-Interface|UI]]가 어떻게 생겨야 하는지 설명하기 위해 React와 함께 사용하는 JavaScript를 확장한 문법   
- JSX는 React element를 생성한다. 
- JSX에 삽입된 사용자 입력은 모든 값을 렌더링 하기 전에 이스케이프한다. 그리고 모든 항목은 렌더링 되기 전에 문자열로 변환되기 때문에 크로스 사이트 스크립팅 공격을 방지할 수 있다.  
	- [[DOM]]의 `innerHtml`이 XSS에 취약한 것과 반대되는 점이다.  

- JSX를 그냥 코드에 입력하면 오류가 발생한다. -> 자바스크립트 코드가 아니기 때문이다.
	- [[Babel]]을 사용해 브라우저가 이해할 수 있는 형태로 컴파일해야 한다.

```html
<body>
	<script src="https://unpkg.com/@babel/standalone@7.8.3/babel.js"></script>
  <script type="text/babel">
	  
  </script>
</body>
```

스크립트 태그에 `type="text/babel"`이 있는 모든 태그가 컴파일된다. 그런 다음 컴파일된 코드가 `type="text/javascript"` 인 새 스크립트 태그를 생성해 브라우저가 이를 평가할 수 있도록 한다.
- 일반적으로 위와 같이 babel standalone을 사용하진 않는다. 다른 도구를 사용한다.


## [[JavaScript-Spread-syntax|스프레드 연산자]] 사용하기

```js
const rootElement = document.getElementById('root')
const children = 'Hello'
const className = 'container'
const props = {children, className}
const element = <div {...props} />

ReactDOM.render(element, rootElement)
```


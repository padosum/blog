---
title   : Virtual DOM 
date    : 2021-09-24 22:57:36 +0900
updated : 2021-09-24 23:31:15 +0900
aliases : ["가상 DOM"] 
tags    : ["React"] 
---
가상 돔, Virtual [[DOM]]

**가상 DOM은 실제로 렌더링되지는 않았지만 실제 DOM 구조를 반영한 상태로 메모리에 있는 가상의 DOM, 즉 실제로 화면에다 그리지 않기 때문에 연산 비용이 실제 DOM 보다 적다. 거기에 변경 사항들을 한 번에 묶어 실제 DOM에 반영을 한다. **(연산 횟수 최소화)

## 렌더링 방식에 대하여  
- [[HTML]]은 브라우저가 문서 객체 모델([[DOM]])을 구성하기 위해 따라야 하는 절차라고 말할 수 있다. HTML 문서를 이루는 엘리먼트는 브라우저가 HTML 문서를 읽어 들이면 DOM 엘리먼트가 되고, 이 DOM이 화면에 [[User-Interface|UI]]를 표시한다.  
- 전통적으로 웹사이트는 독립적인 HTML 페이지들로 만들어졌다. 사용자가 페이지 사이 사이를 내비게이션하면 브라우저는 매번 다른 HTML 문서를 요청해 로딩한다.  
- [[Ajax]]의 등장 이후로 [[SPA]]가 생겼다.  
	- 브라우저가 Ajax를 이용해 데이터를 요청하고 가져올 수 있게되어서 전체 웹 애플리케이션이 하나의 페이지로 실행되며 UI를 갱신할 수 있게 되었다.  
  - SPA에서는 처음에 브라우저가 HTML 문서 하나를 적재하고, 사용자가 페이지를 내비게이션 하지만, 실제로는 한 페이지에 머문다.  
	  - [[JavaScript]]가 사용자와 애플리케이션이 상호작용하는 것에 맞춰 표시중이던 화면을 갱신한다.
  - 자바스크립트를 이용해 DOM 변경을 효율적으로 처리하는 일은 아주 복잡하고 오래 걸리는 일 -> "React"를 사용하는 것이 좋은 방법이다.  

## React
- React는 브라우저 DOM을 갱신하기 위해 만든 라이브러리이다.  
  - **DOM API**는 브라우저의 DOM을 변경하기 위해 자바스크립트가 사용할 수 있는 객체의 모음이다.  
    - 예) `document.createElement`, `document.appendChild` 등...
  - DOM API를 직접 조작하지 않고 **가상 DOM**을 다루거나 리액트 명령을 다룬다.  
  - 가상 DOM은 리액트 엘리먼트로 이루어진다. HTML 엘리먼트와 비슷하지만 자바스크립트 객체이다.  

### 리액트 엘리먼트  
리액트 엘리먼트는 그에 대응하는 실제 DOM 엘리먼트가 어떻게 생겨야 하는지 기술한다.  다음 코드처럼 `React.createElement`를 사용해 리액트 엘리먼트를 만들 수 있다.  
```javascript
React.createElement("h1", null, "Padosum");
```
렌더링 과정에서 리액트는 다음 엘리먼트를 실제 DOM 엘리먼트로 변환한다.   
```html
<h1>Padosum</h1>
```

### `ReactDOM`
`ReactDOM`에는 리액트 엘리먼트를 브라우저에 렌더링하기 위해 필요한 모든 도구가 들어가있다. 리액트 엘리먼트, 그리고 모든 자식 엘리먼트를 함께 렌더링하기 위해 `ReactDOM.render`를 사용한다.   
다음 코드는 `app`이란 id를 가진 노드에 `name`에 할당해놓은 리액트 엘리먼트를 렌더링한다.  
```javascript
var name = React.createElement("h1", null, "Padosum");
ReactDOM.render(name, document.getElementById('app')); 
```

### 컴포넌트
모든 UI는 여러 부분으로 이루어지는데, 리액트에서는 이런 여러 부분들을 **컴포넌트**라고 부른다. 리액트 사용의 가장 큰 장점은 UI 엘리먼트와 데이터가 분리되는 것이다. 데이터를 컴포넌트에 프로퍼티로 넘길 수 있어 UI를 만들 때 사용하는 로직과 데이터 분리가 가능하다.   

#### 컴포넌트를 만드는 방법  
##### React.Component
```javascript
class IngredientsList extends React.Component {
  renderListItem(ingredient, i) {
    return React.createElement("li", { key: i }, ingredient)
  }
  
  render() {
    return React.createElement("ul", { className: "ingredients "},
	this.props.items.map(this.renderListItem)
	)
  }
}
```

##### 상태가 없는 함수형 컴포넌트  
- 객체가 아니라 함수라 함수형 컴포넌트의 영역에는 `this`가 없다. 
- 상태가 없는 함수형 컴포넌트가 충분히 튼튼하지 못하다면 `class`로 돌아가야할 것이다. 
  - 일반적으로 상태가 없는 함수형 컴포넌트를 더 많이 사용할수록 더 좋다. 
- 상태가 없는 함수형 컴포넌트는 함수형 프로그래밍의 원칙을 연습하기 좋은 방법이다.  
  - 프로퍼티를 인자로 받아서 부수 효과 없이 결과 DOM 엘리먼트를 만드므로 코드가 더 단순해지고 코드 베이스를 훨씬 더 잘 테스트할 수 있다.  
  - 하지만 기능을 캡슐화해야 하거나 `this`가 필요하다면 사용할 수 없다. 
  
```javascript
const IngredientsList = props => 
  React.createElement("ul", { className: "ingredients" },
    props.items.map((ingredient, i) => 
	  React.createElement("li", { key: i }, ingredient)
	)
  )
```
`props`에 다음 코드와 같이 [[JavaScript-Destructuring-assignment|Destructuring]] 을 사용할 수 있다.
```javascript
const IngredientsList = ({items}) =>
  React.createElement("ul", { className: "ingredients" },
    items.map((ingredient, i) => 
	  React.createElement("li", { key: i }, ingredient)
	)
  )
```
- 상태가 없는 함수형 컴포넌트를 선언할 때는 `const`를 사용한다. 나중에 같은 이름의 값이나 상수를 다시 정의하는 실수를 방지할 수 있다.  
- 페이스북이 createClass나 ES6 Class 구문보다 상태가 없는 함수형 컴포넌트 쪽이 더 빨라질 수 있다고 말한다고 했다.  

## DOM 렌더링 
- 애플리케이션에 있는 모든 데이터를 한 자바스크립트 객체에 저장했다고 상상해보면, 이 객체를 변경할 때마다 그 객체를 컴포넌트에 프로퍼티로 전달하고 UI를 갱신해야 한다. 이것은 `ReactDOM.render`가 대부분의 힘든 작업을 처리해야 한다는 것이다.   
- 엘리먼트를 DOM에 삽입하는 것은 DOM API 연산 중 비싼 연산이다.  
  - UI를 갱신하고자 할 때, 모든 DOM을 지우고 다시 만드는 것보다 이미 제 위치에 있는 DOM을 갱신하는 것이 빠르다.  
  - `ReactDOM.render`는 현재 DOM을 그대로 두고 애플리케이션의 상태가 변할 때, 필요한 DOM 엘리먼트만 변경한다. 


## reference
- [Learning React](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791162240373&orderClick=LAG&Kc=)
- [프론트엔드 개발자라면 알고 있어야 할 브라우저의 동작 과정](https://wormwlrm.github.io/2021/03/27/How-browsers-work.html)

---
title   : DOM
date    : 2021-04-26 11:11:28 +0900
updated : 2022-05-23 22:27:32 +0900
aliases : 
tags: ["Web", "JavaScript"]
---
**문서 객체 모델(DOM; Document Object Model)**  

![[DOM Tree.png]]
## 개요 
- 웹 브라우저가 HTML이나 XML 같은 구조화된 문서를 JavaScript로 제어할 수 있도록 추상화한 객체의 집합을 말한다. ([JavaScript가 아니더라도 제어할 수 있다!](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction#dom_and_javascript))
- HTML 문서는 브라우저에 의해 해석되어 실제 문서를 나타내는 **노드 개체들의 트리구조**로 변환되는데 이 트리구조가 DOM이다.
- DOM은 **HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 API(프로퍼티, 메서드)를 제공하는 트리 자료구조**이다.
- **DOM의 목적은 JavaScript를 이용해 HTML 문서에 대한 스크립트 작성(CRUD, 이벤트 처리)을 위한 프로그래밍 인터페이스를 제공하는 것**이다.

---
DOM에 대한 표준은 W3C와 WHATWG라는 두 단체가 공통된 표준을 만들어 오다가 2018년 4월부터 WHATWG이 단일 표준을 내놓기로 합의했다.  

## HTML 요소, 노드 객체
HTML 요소는 HTML 문서를 구성하는 개별적인 요소를 말한다. HTML 요소는 [[브라우저의-렌더링-과정|브라우저의 렌더링 과정]]을 통해 렌더링 엔진에 의해 파싱되어 **DOM을 구성하는 요소 노드 객체로 변환**된다.   
HTML 요소들은 중첩 관계를 갖는다. 계층적인 부모-자식 관계가 형성되기 때문에 렌더링 엔진은 이러한 요소의 부모-자식 관계를 반영해서 객체화한 모든 노드 객체들을 [[Tree|트리 구조]]로 구성한다. 이렇게 구성된 **[[Tree|트리 구조]]를 DOM**이라고 한다. (DOM 트리라고 부르기도 함)

### 노드 객체의 종류 
노드 객체는 종류(타입)이 있고 상속 구조를 갖는다. 총 12개의 종류 중 중요한 4가지는 다음과 같다.  
#### 문서 노드 
document node
- DOM 최상위에 존재하는 루트 노드로 `document` 객체를 가리킨다. `window`의 `document` 프로퍼티에 바인딩 되어 있어서 `window.document`로도 참조가 가능하다.  

#### 요소 노드
element node
- HTML 요소를 가리키는 노드이다.
- 요소 간 중첩에 의해 부모-자식 관계를 가지고 이를 통해 정보를 구조화 한다. → 문서의 구조를 표현한다. 
- `<body>`, `<a>`, `<p>`, `<script>`, `<style>`, `<html>`...

#### 어트리뷰트 노드
attribute node 
- HTML 요소의 어트리뷰트를 가리키는 객체이다.
- 어트리뷰트가 지정된 HTML 요소의 요소 노드와 연결되어 있다. 
	- 하지만 부모 노드에는 연결되어있지 않으므로 요소 노드의 형제 노드는 아니다! 
- `class="line"`

#### 텍스트 노드
text node 
- HTML 요소의 텍스트를 가리키는 객체이다.
- 요소 노드의 자식 노드이며, 자식 노드는 갖지 못하는 리프 노드이다.
- **줄바꿈과 공백을 포함**한다.
	- 공백도 결국 문자이기 때문이다.
	- 따라서 HTML 문서를 최소화하거나 압축하지 않는 한 일반적으로 상당한 수의 공백과 줄 바꿈 text 노드를 가지게 된다.
- `document.createTextNode()`를 사용해 프로그래밍적으로 텍스트 노드를 생성할 수 있다.
- `data`나 `nodeValue` 속성을 사용해서 요소에 포함된 텍스트 노드를 추출할 수 있다. 

#### DOCUMENT_FRAGMENT_NODE
- `document.createDocumentFragment()`

#### DOCUMENT_TYPE_NODE
- `<!DOCTYPE html>`

위 노드 객체의 종류들은 JavaScript 브라우저 환경에서 `Node` 객체의 속성으로 기록되는 상수 값의 속성과 동일하다.
```html
<!DOCTYPE html>
<html>
  <body>
    <script>console.log(Node.ELEMENT_NODE) // 1</script>
  </body>
</html
```

### 노드 객체의 상속 구조 
DOM을 구성하는 노드(`Node`) 객체는 ECMAScript 사양에 정의된 것은 아니고, 브라우저 환경에서 따로 제공하는 호스트 객체이다. 하지만 자바스크립트 객체이므로 **프로토타입에 의한 상속 구조를 갖는다.**  (`Object.prototype`)
**중요한 것은 이런 상속 구조들을 다 알고 외우는 것이 아니라 DOM API를 이용해 노드에 접근하고 HTML 구조, 내용, 스타일 등을 동적으로 변경하는 방법을 익히는 것**이다.  

모든 노드 개체는 속성과 메서드를 1차적으로 `Node` 객체로부터 상속받는다. 이 속성 및 메서드는 DOM을 조작, 조사, 탐색하는 기준이 되는 값과 함수다.
[Node 속성, 메서드](https://developer.mozilla.org/ko/docs/Web/API/Node)

## 노드의 유형과 이름 식별하기
모든 노드는 `Node`로부터 상속받는 `nodeType`, `nodeName` 속성을 가진다.
- [Node.nodeType](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
	- `Node.ELEMENT_NODE`: `1`
	- `Node.ATTRIBUTE_NODE`: `2`
	- `Node.TEXT_NODE`: `3`
	- `Node.CDATA_SECTION_NODE`: `4`
	- `Node.PROCESSING_INSTRUCTION_NODE`: `7`
	- `Node.COMMENT_NODE`: `8`
	- `Node.DOCUMENT_NODE`: `9`
	- `Node.DOCUMENT_TYPE_NODE`: `10`
	- `Node.DOCUMENT_FRAGMENT_NODE`: `11`
- [Node.nodeName](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)

**노드의 유형을 판별하는 것은 해당 노드에서 사용 가능한 속성과 메서드를 알 수 있게 해주므로, 스크립트를 작성할 때 매우 유용하다!**

## 요소 노드 얻기 
HTML 구조, 내용, 스타일을 동적으로 조작하기 위해선 HTML 요소 노드를 얻어야 한다.  
- [[Get-Element|JavaScript 요소 찾기]]

## 요소 노드 탐색하기
- [[Find-element|JavaScript 자식, 부모, 형제 노드 찾기]]

## 요소 노드 텍스트 조작하기  
- [[Change-Text-Value-Using-JavaScript|JavaScript 텍스트 변경하기]]

## 요소 위치 확인하기
- [[Node-Geometry]]

## DOM 스크립트 
DOM 스크립트는 HTML 요소를 자바스크립트로 조작하는 것을 의미한다.  DOM 스크립트에 의해 DOM에 새로운 노드가 추가되거나 삭제될 경우 리플로우와 리페인트가 발생해서 성능에 영향을 줄 수 있기 때문에 주의해서 다룰 필요가 있다.  
- [[JavaScript-InnerHTML]]
- [[JavaScript-Create-Node-and-Append-Node|JavaScript 노드 생성, 추가, 삽입, 이동, 복사, 삭제하기]]

## 어트리뷰트
HTML 요소의 동작을 제어하기 위해 어트리뷰트를 통해  추가적으로 정보를 제공할 수 있다.  
HTML 문서가 파싱될 때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로 변환되고, 요소 노드와 연결된다. 이때, 모든 어트리뷰트 노드의 참조는 요소 노드의 `attribute` 프로퍼티에 저장된다.  
![[Attributes.png]]
```html
<body>
  <input id="name" type="text" value="john" />
  <script>
    const { attributes } = document.querySelector('#name');
	console.log(attributes); // NamedNodeMap(3) [ id="name", type="text", value="john" ]
  </script>
<body>
```

요소 노드 객체는 HTML 어트리뷰트에 대응하는 프로퍼티가 존재한다. 이 프로퍼티는 HTMl 어트리뷰트 값을 초기값으로 가지고 있다.  
왜 굳이 `attribute` 프로퍼티와 요소 노드 객체의 프로퍼티, 두 가지 방식으로 관리를 하는 것일까?  
`attributes` 프로퍼티에서 관리하는 어트리뷰트는 초기 값을 유지한다. 그리고 요소 노드 객체의 프로퍼티는 해당 프로퍼티의 값을 최신 상태로 유지한다. 초기 상태를 관리하지 않으면 웹 페이지를 처음 표시하거나, 새로고침 시 초기 상태를 표시할 수 없기 때문이다.  
```html 
<body>
  <input id="name" type="text" value="john" />
  <script>
    const { attributes } = document.querySelector('#name');
	console.log(attributes); // NamedNodeMap(3) [ id="name", type="text", value="john" ]
	
	el.value = "test"; // value 어트리뷰트 변경 
    console.log(el.value); // test, 최신 상태 관리
    console.log(attributes.value.value); // john, 초기 상태 관리 
  </script>
<body>
```

### 어트리뷰트 조작하기 
- [[JavaScript-Get-Set-Attribute|JavaScript 어트리뷰트 값 가져오기, 어트리뷰트 값 변경, 삭제하기]]
- [[JavaScript-Data-Attribute|JavaScript data 어트리뷰트 사용하기]]
- [[JavaScript-Change-Class-Attribute|JavaScript class 속성 변경하기]] 

## 스타일 
### 요소의 계산된 스타일 가져오기
DOM 노드 객체는 `style`이라는 어트리뷰트를 가지고 있다. 해당 어트리뷰트를 사용해 설정된 스타일값들을 가져올 수 있다.
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        width: 100px;
        height: 100px;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <div style="background-color: red"></div>
    <script>
      console.log(rect.style);
    </script>
  </body>
</html>

```
하지만 인라인 스타일만 가져온다. 인라인 스타일시트 외에 외부 스타일시트 등 모두를 가져오려면 어떻게 해야할까?
`getComputedStyle`을 사용하면 요소의 계산된 스타일을 가져올 수 있다.
위 코드에서 `getComputedStyle`를 사용하면 요소를 그리기 위해 설정된 스타일들을 읽을 수 있다.
```javascript
console.log(window.getComputedStyle(rect))
```

### DOM 내의 스타일시트에 접근하기
`document.styleSheets`는 문서 내 명시적으로 연결(`<link>`)되거나 내장(`<style>`)된 모든 스타일시트 개체 리스트에 접근할 수 있게 해준다. `styleSheets`는 라이브 상태다. 포함된 스타일시트가 변경되면 `document.styleSheets`의 값도 변경된다.

`.sheet` 속성을 사용해 DOM 내 요소의 스타일시트에 접근할 수도 있다.
```html
<head>
  <link id="link" href="http://stylesheet-example.com/" rel="stylesheet" type="text/css">
</head>
<body>
  <script>
    console.log(document.querySelector('#link').sheet)
  </script>
</body>
```

### .style 속성을 사용해 값 편집하기
요소 노드의 인라인 스타일을 조작할 수 있는 `.style` 속성이 있다.
```javascript
const el = document.querySelector('div')
el.style.backgroundColor = 'red'
```

stylesheet에도 적용 가능하다.
```javascript
const styleSheet = document.querySelector('#styleEl').sheet
styleSheet.cssRules[0].style.color = 'purple'
```

### 외부 스타일시트를 프로그래밍적으로 추가하기
`<link>` 노드를 생성해서 DOM에 추가한다.
```javascript
const linkEl = document.createElement("link");
linkEl.setAttribute("rel", "stylesheet");
linkEl.setAttribute("type", "text/css");
linkEl.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
);

document.head.appendChild(linkEl);
```

## 같이 보기 
- [[Event|이벤트]]

## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년

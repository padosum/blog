---
title   : JavaScript 요소 찾기 
date    : 2021-10-04 11:01:22 +0900
updated : 2021-10-04 11:02:19 +0900
aliases : ["JavaScript 요소 찾기"]
tags    : ["JavaScript"]
---
## id로 요소 찾기
`Document.getElementById()` 메서드를 이용한다. 
```javascript
const el = document.getElementById(id);
```
인수로 전달한 `id` 어트리뷰트 값을 갖는 하나의 요소 노드를 찾아서 반환한다. 
- 중복된 `id` 값을 갖는 요소가 여러 개인 경우에는 첫 번째 요소 노드만 반환
- 해당 `id` 값을 갖는 요소가 없는 경우 `null`을 반환  

## 태그 이름으로 요소 찾기  
`Document.getElementsByTagName()`  또는 `Element.getElementsByTagName()` 메서드를 이용한다. 
인수로 전달한 태그 이름을 가진 모든 요소 노드들을 탐색해서 반환한다.   

```javascript
const el = document.getElementsByTagName(name);

const el = element.getElementsByTagName(name);
```
`Document.getElementsByTagName()` 메서드는 전체 문서에서 탐색해서 반환한다.  
`Element.getElementsByTagName()` 메서드는 해당 노드의 자손 노드 중에서 탐색해서 반환한다.  
- 반환되는 값은 `HTMLCollection` 객체 
	- `HTMLCollection`은 살아있는 객체이다. "살아 있는 객체"라 함은 해당 노드 객체가 변경되었을 때 `document.getElementsByTagName()`을 다시 호출하지 않아도 그 노드의 상태를 자동으로 업데이트 된다는 것이다.   
- 탐색 결과가 없다면, 빈 `HTMLCollection` 객체를 반환    

## class로 요소 찾기 
`Document.getElementsByClassName()` 또는 `Element.getElementsByClassName()` 메서드를 사용한다.  
```javascript
const el = document.getElementsByClassName(name);
const el = element.getElementsByClassName(name);
```
인수로 전달한 `class` 어트리뷰트 값을 갖는 모든 요소 노들들을 탐색해서 반환한다.  
`Document.getElementsByClassName()` 은 DOM 전체에서 요소 노드를 탐색해서 반환한다.  
`Element.getElementsByClassName`은 특정 요소 노드를 통해 호출해 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색해 반환한다.  
- 반환되는 값은 `HTMLCollection` 객체
- 탐색 결과가 없다면 빈 `HTMLCollection` 객체를 반환

## CSS 선택자로 요소 찾기
`Document.querySelector()`,  `Element.querySelector()`,  `Document.querySelectorAll()`, `Element.querySelectorAll()`를 사용한다.
```javascript
const el = document.querySelector(selectors);

const el = baseElement.querySelector(selectors);
```
`Document.querySelector()`,  `Element.querySelector()`는 인수로 전달한 CSS 선택자(`selectors`)를 만족시키는 하나의 요소 노드를 탐색해서 반환한다.  
- 여러 개인 경우 첫 번째 요소 노드만 반환
- 만족하는 요소 노드가 없는 경우 `null` 반환    
---
```javascript
const el = parentNode.querySelectorAll(selectors);

const el = parentNode.querySelectorAll(selectors);
```
`Document.querySelectorAll()`, `Element.querySelectorAll()` 는 인수로 전달한 CSS 선택자(`selectors`)를 만족시키는 모든 요소 노드들을 탐색해서 반환한다. 
- `NodeList` 객체를 반환
- 탐색 결과가 없다면 빈 `NodeList` 객체를 반환 

---
> **어떤 방식이 좋은가?**   
> CSS 선택자를 이용하는 메서드는 `getElementById`와 `getElementsByClass`, `getElementsByTagName` 메서드들보다 다소 느린 것으로 알려져 있으나 구체적 조건으로 요소를 찾을 수 있고 일관된 방식을 사용할 수 있기 때문에 `id` 값으로 찾는 경우를 제외하고 CSS 선택자를 이용하는 메서드를 사용하는 것을 권장한다.  


## 특정 요소를 얻을 수 있는지 확인하기
```javascript
const result = element.matches(selectorString);
```
`Element.matches()`는 `Element`(`element`)가 인수로 전달한 CSS 선택자(`selectorString`)를 통해 취득할 수 있는지 확인할 수 있다.  
💡 [[Event-Propagation-And-Delegation|이벤트 위임]]을 사용할 때 유용하다.  

## 🚨 주의할 점 (HTMLCollection과 NodeList)
`HTMLCollection`과 `NodeList`는 [[JavaScript-Array-Like-Object|유사 배열 객체]]이면서 이터러블이기 때문에 `for...of`로 순환도 가능하고, [[JavaScript-Spread-Syntax|스프레드 연산자]]를 사용해 배열로 가져올 수 있다.  

그런데 문제는 `HTMLCollection`이 노드 객체의 상태를 실시간으로 반영한다는 것이다.  그래서 예상과 다르게 동작할 수 있어서 배열로 변환해 [[Higher-Order-Function]]을 사용하는 것이 좋다.  
노드 객체 실시간 변경 예 
```html
<body>
  <ul>
    <li>HTML</li>
	<li>CSS</li>
	<li id="active">JavaScript</li>
  </ul>
  <script>
    console.group('before');
    const lis = document.getElementsByTagName('li');
	for (let i = 0; i < lis.length; i++) {
	  console.log(lis[i]);
	}
	console.groupEnd();
	
	console.group('after');
	lis[2].removeAttribute('id'); // id 어트리뷰트 삭제 
	for (let i = 0; i < lis.length; i++) {
	  console.log(lis[i]);
	}
	console.groupEnd();
  </script>  
</body>
```
결과 
![[HTMLCollection.png]]

`NodeList` 객체도 `childNodes` 프로퍼티가 반환하는 경우 `HTMLCollection` 객체처럼 실시간으로 노드 객체의 상태를 반영하기 때문에 사용 시 주의해야 할 필요가 있다.  

## reference
- [https://developer.mozilla.org/ko/docs/Web/API/Document/getElementsByTagName](https://developer.mozilla.org/ko/docs/Web/API/Document/getElementsByTagName)
- [https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
- [생활코딩](https://opentutorials.org/course/1375/6666)
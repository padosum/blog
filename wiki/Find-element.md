---
title   : JavaScript 자식, 부모, 형제 노드 찾기 
date    : 2021-10-04 12:21:27 +0900
updated : 2022-05-18 23:51:53 +0900
aliases : ["JavaScript 자식, 부모, 형제 노드 찾기"]
tags    : ["JavaScript"]
---
## 자식 노드 찾기
### Node.childNodes
- 주어진 요소의 자식 노드들을 `NodeList`에 담아서 반환한다. (직계 자식 노드만을 가진다.)
- 요소 노드와 텍스트 노드가 포함될 수 있다. 

### Element.children
- 주어진 요소의 자식 노드들 중 **요소 노드만** `HTMLCollection`에 담아서 반환한다.
- 텍스트 노드는 포함되지 않는다. 

### NodeList나 HTMLCollection을 JavaScript 배열로 변환하기
[[JavaScript-Spread-syntax|스프레드 연산자]] 또는 [[JavaScript-Array|Array.from 메서드]]를 사용하면 `NodeList`와 `HTMLCollection`을 [[JavaScript-Array|JavaScript 배열]]로 변환할 수 있다. ([[2022-01-13]] 학습)
배열로 변환하는 것은 이점이 있다. `NodeList`나 `HTMLCollection`이 라이브 리스트이지만 배열로 변환해 스냅샷을 만들 수 있다. 그리고 배열 메서드를 사용할 수 있게 된다. [[Get-Element]] 참고
```javascript
const paragraphs = document.querySelectorAll('p')
const paragraphsArr = [...paragraphs]
```

```javascript
const documentScripts = document.scripts
const documentScriptsArr = [...documentScripts]
```

```javascript
const paragraphs = document.querySelectorAll('p')
const paragraphsArr = Array.from(paragraphs)
```

```javascript
const documentScripts = document.scripts
const documentScriptsArr = Array.from(documentScripts)
```

### Node.firstChild
- 첫 번째 자식 노드를 반환한다. 
- 텍스트 노드, 요소 노드 

### Node.lastChild
- 마지막 자식 노드를 반환한다.
- 텍스트 노드, 요소 노드 

### Element.firstElementChild
- 첫 번째 자식 **요소 노드**를 반환한다. 

### Element.lastElementChild
- 마지막 자식 **요소 노드**를 반환한다. 

## 자식 노드가 있는지 확인하기  
`Node.hasChildNodes()`를 사용한다. 자식 노드가 있다면 `true`, 없다면 `false`
```javascript
const el = document.getElementById('txt');
el.hasChildNodes();
```

## 자식 노드 개수 얻기
`childElementCount`를 사용해 노드가 가지고 잇는 자식 요소의 개수를 얻을 수 있다.
```javascript
let count = node.childElementCount;
```

## 노드가 특정 노드 내에 포함되었는지 확인하기
인자로 주어진 노드가 `node`의 자손인지 아닌지에 대한 `Boolean` 값을 리턴한다.
```javascript
node.contains(otherNode)
```
선택된 노드와 주어진 노드가 동일한 경우 `true`를 반환한다. 

### Node.compareDocumentPosition()
주변 노드 위치에 대해 보다 더 상세한 정보를 얻고 싶을 때 사용한다. 반환값에 따라 의미가 다르다.
- `0`: 동일한 요소를 의미
- `1`: 선택된 노드와 전달된 노드가 동일한 문서에 존재하지 않는다.
- `2`: 전달된 노드가 선택된 노드 앞에 있다.
- `4`: 전달된 노드가 선택된 노드 뒤에 있다.
- `8`: 전달된 노드가 선택된 노드의 조상(ancestor)이다.
- `16`, `10`: 전달된 노드가 선택된 노드의 자손(descendant)다.

## 텍스트 노드 찾기 
텍스트 노드도 요소 노드의 자식이기 때문에 `firstChild`로 접근이 가능하다. 

## 부모 노드 찾기
`Node.parentNode`로 찾을 수 있다. 읽기 전용 속성이다.  

## 형제 노드 찾기  
### Node.previousSibling
부모 노드가 같은 형제 노드들 중 자신의 **이전 형제 노드**를 탐색해 반환한다. 요소 노드, 텍스트 노드

### Node.nextSibling
부모 노드가 같은 형제 노드들 중 자신의 **다음 형제 노드**를 탐색해 반환한다. 요소 노드, 텍스트 노드

### Element.previousElementSibling
부모 노드가 같은 형제 노드들 중에서 자신의 **이전 형제 요소 노드**를 탐색해서 반환한다. 요소 노드만

### Element.nextElementSibling
부모 노드가 같은 형제 노드들 중에서 자신의 **다음 형제 요소 노드**를 탐색해서 반환한다. 요소 노드만 

## 노드 정보 얻기  
[[DOM]] 참고
노드 객체의 종류는 `Node.nodeType`을 사용하면 된다.  
- `Node.ELEMENT_NODE`: 요소 노드 타입, 상수 1 반환
- `Node.TEXT_NODE`: 텍스트 노드 타입, 상수 3 반환
- `Node.DOCUMENT_NODE`: 문서 노드 타입, 상수 9 반환

노드 이름은 `Node.nodeName`를 사용한다.


## 노드가 동일한지 확인하기
노드의 `isEqualNode` 메서드를 호출하면 매개변수로 전달하는 노드와 동일한지 확인한다. 
```javascript
const textarea = document.querySelectorAll('textarea')
console.log(textarea[0].isEqualNode[textarea[1]])
```
## reference
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년
- [MDN Web Docs](https://developer.mozilla.org/en-US/)

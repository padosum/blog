---
title   : JavaScript 자식, 부모, 형제 노드 찾기 
date    : 2021-10-04 12:21:27 +0900
updated : 2021-10-14 00:11:13 +0900
aliases : ["JavaScript 자식, 부모, 형제 노드 찾기"]
tags    : ["JavaScript"]
---
## 자식 노드 찾기
### Node.childNodes
- 주어진 요소의 자식 노드들을 `NodeList`에 담아서 반환한다. 
- 요소 노드와 텍스트 노드가 포함될 수 있다. 

### Element.children
- 주어진 요소의 자식 노드들 중 **요소 노드만** `HTMLCollection`에 담아서 반환한다.
- 텍스트 노드는 포함되지 않는다. 

### Node.firstChild
- 첫 번째 자식 노드를 반환한다. 
- 텍스트 노드, 요소 노드 

### Node.lastChild
- 마지막 자식 노드를 반환한다.
- 텍스트 노드, 요소 노드 


### Element.firstelementChild
- 첫 번째 자식 **요소 노드**를 반환한다. 

### Element.lastElementChild
- 마지막 자식 **요소 노드**를 반환한다. 

## 자식 노드가 있는지 확인하기  
`Node.hasChildNodes()`를 사용한다. 자식 노드가 있다면 `true`, 없다면 `false`
```javascript
const el = document.getElementById('txt');
el.hasChildNodes();
```

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
노드 객체의 종류는 `Node.nodeType`을 사용하면 된다.  
- `Node.ELEMENT_NODE`: 요소 노드 타입, 상수 1 반환
- `Node.TEXT_NODE`: 텍스트 노드 타입, 상수 3 반환
- `Node.DOCUMENT_NODE`: 문서 노드 타입, 상수 9 반환

노드 이름은 `Node.nodeName`를 사용한다.

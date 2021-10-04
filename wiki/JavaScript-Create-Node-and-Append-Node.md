---
title   : JavaScript 노드 생성, 추가, 삽입, 이동, 복사, 삭제하기 
date    : 2021-10-04 12:50:15 +0900
updated : 2021-10-04 12:50:48 +0900
aliases : ["JavaScript 노드 생성, 추가, 삽입, 이동, 복사, 삭제하기"]
tags    : ["JavaScript"]
---
## 노드 생성과 추가 과정  
노드를 생성하고 DOM에 추가하는 과정은 다음과 같다.  
```javascript
const $li = document.createElement('li'); // 요소 노드 생성하기

const textNode = document.createTextNode('Padosum'); // 텍스트 노드 생성하기

// 텍스트 노드를 요소 노드의 자식 노드로 추가하기
$li.appendChild(textNode);

// 요소 노드를 DOM에 추가하기 (기존에 DOM에 존재하는 요소 노드에 추가한다.)
el.appendChild($li);
```
[[브라우저의-렌더링-과정|리플로우와 리페인트]]가 실행된다. 

### 여러 개의 노드 생성하고 추가하기
**여러 개의 노드를 생성 시마다 요소 노드에 추가하면 비용이 많이 든다.** 그래서 추가해야 할 요소들을 컨테이너 요소의 자식 노드로 추가한 다음, 컨테이너 요소를 추가할 요소 노드의 자식으로 추가하면 DOM은 한 번만 변경된다.  
하지만 이런식으로 추가를 하면 불필요한 **컨테이너 요소도 함께 추가된다는 단점이 있다.**  
컨테이너 요소를 추가되지 않게 하려면 `DocumentFragment` 노드를 사용하면 된다.  `DocumentFragment`는 DOM의 일부가 아니기 때문에 변경해도 문서에 영향을 미치지 않는다. 그래서 성능에 영향이 없다.  
[MDN Web Docs - DocumentFragment](https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment) 참고 

## 노드 삽입하기 
### 마지막 노드로 추가하기 
`Node.appendChild()` 를 사용한다.  
```javascript
element.appendChild(aChild);
```

### 지정한 위치에 노드 삽입하기 
`Node.insertBefore()`를 사용한다. 
```javascript
const insertedNode = parentNode.insertBefore(newNode, referenceNode);
```
`newNode` 를 `referenceNode` 앞에 삽입한다. `referenceNode` 인자가 `null`이면 `appendChild`와 같이 마지막에 추가된다.  

## 노드 이동하기
DOM에 이미 있는 노드를 `appendChild()`와 `insertBefore()`를 사용해 다시 추가하면 현재 위치에서 제거되고 새 위치에 추가된다.  

## 노드 복사하기
`Node.cloneNode()`를 사용한다.  
```javascript
const dupNode = node.cloneNode(deep);
```
노드의 사본을 생성해 반환하는데, 매개변수 `deep`을 `true`로 전달하면 모든 자손 노드가 포함해서 복제하고, `false`는 해당 노드만 복제된다.  

## 노드 교체하기 
`Node.replaceChild()`를 사용한다.  
```javascript
const replacedNode = parentNode.replaceChild(newChild, oldChild);
```
호출한 노드(`parentNode`)의 자식 노드(`oldChild`)를 다른 노드(`newChild`)로 교체한다. 

## 노드 삭제하기 
`Node.removeChild()`를 사용한다.
```javascript
const old = node.removeChild(child);
```
매개변수로 전달된 노드(`child`)를 제거하고 반환한다. 

## reference
- [https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment](https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment)

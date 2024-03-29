---
title   : JavaScript 노드 생성, 추가, 삽입, 이동, 복사, 삭제하기 
date    : 2021-10-04 12:50:15 +0900
updated : 2022-05-23 22:28:14 +0900
aliases : ["JavaScript 노드 생성, 추가, 삽입, 이동, 복사, 삭제하기"]
tags    : ["JavaScript"]
---
## 노드 생성과 추가 과정  
노드를 생성하고 [[DOM]]에 추가하는 과정은 다음과 같다.  
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
컨테이너 요소를 추가되지 않게 하려면 `DocumentFragment` 노드를 사용하면 된다. `DocumentFragment`는 메모리상에서만 존재하는 빈 문서 템플릿이라고 생각하면 된다. 따라서 DOM의 일부가 아니기 때문에 변경해도 문서에 영향을 미치지 않는다. 그래서 성능에 영향이 없다.  
```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <script>
      const docFrag = document.createDocumentFragment();
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("p");
        p.textContent = i;
        docFrag.appendChild(p);
      }

      console.log(docFrag.textContent); // 0123456789
    </script>
  </body>
</html>
```
`DocumentFragment`를 DOM에 추가할 때 생성한 메모리상의 위치에 더 이상 존재하지 않게 된다. 만약 이후에도 `DocumentFragment`의 내용을 메모리상에서 유지하려면 `cloneNode`를 사용해서 추가할 `DocumentFragment`를 복제하면 된다.
```javascript
el.appendChild(docFrag.cloneNode(true))
```

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

### 마지막 자식 뒤에 추가하기
`Element.append()`
`appendChild()`와 추가된 `Node`를 반환하지 않는다. 한 번에 여러 노드를 추가할 수 있다.
```javascript
const div = document.createElement("div")
const p = document.createElement("p")
div.append("Text", p)
```

### 첫 번째 자식 앞에 추가하기
`Element.prepend()`
```javascript
const div = document.createElement("div")
const p = document.createElement("p")
div.prepend(p)
```

### 앞에 추가하기
`Element.before()`
요소의 앞에 요소를 추가한다.
```javascript
const container = document.createElement("div")
const p = document.createElement("p")
container.appendChild(p)
const span = document.createElement("span")
p.before(span)
console.log(container.outerHTML)
// <div><span></span><p></p></div>
```

## 뒤에 추가하기
`Element.after()`
요소의 뒤에 요소를 추가한다.
```javascript
const container = document.createElement("div")
const p = document.createElement("p")
container.appendChild(p)
const span = document.createElement("span")
p.after(span)
console.log(container.outerHTML)
// <div><p></p><span></span></div>
```

## 노드 이동하기
DOM에 이미 있는 노드를 `appendChild()`와 `insertBefore()`를 사용해 다시 추가하면 현재 위치에서 제거되고 새 위치에 추가된다.  

## 노드 복사하기
`Node.cloneNode()`를 사용한다.  
```javascript
const dupNode = node.cloneNode(deep);
```
노드의 사본을 생성해 반환하는데, 매개변수 `deep`을 `true`로 전달하면 모든 자손 노드가 포함해서 복제하고, `false`는 해당 노드만 복제된다.  
Element 노드를 복제할 때, 모든 특성 및 값(인라인 이벤트)도 복제된다. `addEventListener()`나  `node.onclick`으로 추가된 것은 복제되지 않는다.

## 노드 교체하기 
`Node.replaceChild()`를 사용한다.  
```javascript
const replacedNode = parentNode.replaceChild(newChild, oldChild);
```
호출한 노드(`parentNode`)의 자식 노드(`oldChild`)를 다른 노드(`newChild`)로 교체한다. 

## 노드 삭제하기 
`Node.removeChild()`를 사용해 자식 노드를 제거할 수 있다.
```javascript
const old = node.removeChild(child);
```
매개변수로 전달된 노드(`child`)를 제거하고 반환한다. 해당 노드가 사라지지는 않는다. 따라서 해당 노드에 대한 메모리상 참조는 여전히 가지게 된다.  제거하는 대상이 무엇이냐에 따라 [[JavaScript-InnerHTML|innerHTML]], `outerHTML`, `textContent` 속성에 빈 문자열을 전달하는 것이 더 쉽고 빠를 수도 있다.

`Element.remove()`를 사용해 해당 요소를 DOM에서 제거시킬 수 있다.
```javascript
const el = document.querySelector('.tags')
el.remove() // 제거된다.
```

## reference
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년
- [https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment](https://developer.mozilla.org/ko/docs/Web/API/DocumentFragment)

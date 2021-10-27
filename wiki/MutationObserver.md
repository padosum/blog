---
title   : DOM 변경을 감시하기, MutationObserver 
date    : 2021-10-27 18:51:23 +0900
updated : 2021-10-27 18:52:17 +0900
aliases : ["DOM 변경을 감시하기, MutationObserver"]
tags    : ["Web"]
draft   : true
---
사이드 프로젝트를 진행하면서 웹 페이지의 DOM이 변경되었음을 감지하는 방법이 필요했다. DOM이 변경되었을 때 발생하는 이벤트가 없을까하고 찾아보다가 **MutationObserver** API를 이용해 DOM이 변경되는 것을 감시할 수 있는 것을 확인했다.   

## Goal
MutationObserver API를 이용해 DOM 변경을 관찰할 수 있는 방법을 알아보기

## MutationObserver  기본 문법 
```javascript
// DOM 변경을 관찰할 대상 node 
const target = document.queryString("selector");

// DOM이 변경되는 경우 실행되는 콜백 함수 
const callback = function(mutations) {
}

// DOM 변경 감시를 위한 인스턴스 생성 (observer)
const observer = new MutationObserver(callback);

// 감시자(observer)의 옵션
const config = { attributes: true, childList: true };

// 대상 node의 DOM 변화 감시를 시작하기
observer.observe(target, config);

// 감시 중단하기
observer.disconnect();
```

## Options 
`observe()` 메서드에 전달하는 두 번째 인수에 `MutationObserver`가 어떻게 동작할지 설명하는 option이 전달되어야 한다. 옵션은 다음 코드와 같이 속성-값의 쌍으로 정의될 수 있다. 
```javascript
const config = {
  childList: true,
  attributes: false,
  characterData: false,
  subtree: false, 
  attributeOldValue: false,
  characterDataOldValue: false 
  attributeFilter: ["attr1". "attr2"]
}
```
- `childList`: 값이 `true`이면, 대상 노드의 자식 요소(텍스트 노드 포함)의 변경이 관찰된다. 
- `attributes`: 값이 `true` 이면, 대상 노드의 속성의 변경이 관찰된다.  
- `characterData`: 값이 `true` 이면, 대상의 characterData (텍스트 노드)의 변경이 관찰된다.
- `subtree`: 값이 `true` 이면, 대상 노드의 자손 요소의 변경이 관찰된다.
- `attributeOldValue`: 값이 `true`이면, `attribute` 값이 `true` 인 경우 변화되기 전 속성 값이 기록된다.
- `characterDataOldValue`: 값이 `true`이면, `characterData` 값이 `true`인 경우 변화되기 전 characterData(텍스트 노드) 값이 기록된다. 
- `attributeFilter`: 모든 속성 값이 감지될 필요가 없다면 감지되어야 할 속성값만 배열로 정해서 변경을 감지할 수 있다. 

## 예시 코드  
### 자식 요소 변경 감지하기  
아래 예시 코드에 있는 버튼을 클릭하면 `ul.animals` 요소의 마지막 자식 요소를 삭제하거나 추가한다. 이때 `MutationObserver` 옵션에 `childList: true`를 설정하면 자식 요소의 변경 감지가 가능하다.  
```html
<ul class="animals">
  <li>Cheeta</li>
  <li>Lion</li>
  <li>Tiger</li>
  <li>Dog</li>
  <li>Cat</li>
</ul>
<button class="btn">Add/Remove Cat</button>
```

```javascript
const target = document.querySelector(".animals"),
	  btn = document.querySelector(".btn");

const callback = function (mutations) {
  for (let mutation of mutations) {
    if (mutation.type === "childList") {
      console.log(`🎣 Change childList.`);
    }
  }
}

const observer = new MutationObserver(callback);

const config = { childList: true };
observer.observe(target, config);

// 버튼을 클릭하면 ul.animals의 자식 요소로 li 요소가 추가되거나 삭제된다. 
btn.addEventListener("click", function () {
  if (target.lastElementChild.textContent === "Cat") {
    target.removeChild(target.lastElementChild);
  } else {
    target.insertAdjacentHTML("beforeend", `\n<li>Cat</li>`);
  }
 });
```

### 속성 변경 감지하기
아래 예시 코드는 버튼을 클릭하면 `div.box`의 class 어트리뷰트를 변경한다. 이 또한 `MutationObserver` 옵션에 `attribute:true` 를 넣어주면 변경을 감지할 수 있다. 
```html
<div class="box red">
  📦
</div>
```

```javascript
const target = document.querySelector(".box");
      btn = document.querySelector(".btn");

const callback = function (mutations) {
  for (let mutation of mutations) {
    if (mutation.type === "attributes") {
      console.log(`🎣 change attributes`);  
	}
  }
}

const observer = new MutationObserver(callback);

const config = { attributes: true };
observer.observe(target, config);

btn.addEventListener("click", function() {
  target.classList.toggle("red", !target.classList.contains("red"));
  target.classList.toggle("blue", !target.classList.contains("blue"));
});
```

### characterData 변경 감지하기  

### 변경 기록하기  

## 결론 

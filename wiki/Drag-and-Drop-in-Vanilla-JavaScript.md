---
title   : Vanilla JavaScript로 Drag and Drop 구현하기 
date    : 2022-09-15 11:58:22 +0900
updated : 2022-09-16 19:42:52 +0900
aliases : ["Vanilla JavaScript로 Drag and Drop 구현하기"]
tags    : ["JavaScript", "Web", "DnD", "accessibility"]
---
## Goal 
- Vanilla JavaScript로 Drag and Drop 기능을 구현하기
- 모바일에서도 사용가능하도록 구현하기
- DnD와 웹 접근성

## Drag and Drop
> **드래그 앤드 드롭**(Drag-and-drop, 끌어서 놓기)은 [컴퓨터](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0 "컴퓨터") [그래픽 사용자 인터페이스](https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%9E%98%ED%94%BD_%EC%82%AC%EC%9A%A9%EC%9E%90_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4 "그래픽 사용자 인터페이스") 환경에서 시각적인 객체를 [클릭](https://ko.wikipedia.org/wiki/%EB%A7%88%EC%9A%B0%EC%8A%A4_%ED%81%B4%EB%A6%AD "마우스 클릭")하면서 다른 위치나 다른 가상 객체로 [드래그](https://ko.wikipedia.org/wiki/%EB%A7%88%EC%9A%B0%EC%8A%A4_%EC%A0%9C%EC%8A%A4%EC%B2%98 "마우스 제스처")하는 행위이다.[^1]

많은 소프트웨어에서 Drag and drop 을 사용하는 모습을 볼 수 있다. 줄여서 "DnD"라고 부르는 경우도 많이 보였다.

7월에 우테캠에서 칸반보드 형식의 TodoList를 구현하는 프로젝트가 있었는데 그때 기억을 되살리면서 Vanilla JavaScript로 칸반보드 형식의 Drag and drop을 구현해보려한다.

## Drag and Drop API로 구현하기
처음에 [HTML Drag and Drop API](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)가 있다는 사실을 알게되었다.
당시 조금 입맛에 맞게 작동되지 않는다는 소문(?)이 있기도 했고, 직접 구현해보고 싶은 마음에 ~~재끼고~~ 다른 이벤트로 처리했는데 직접 해보지 않고 넘긴 것 같아서 궁금해졌다. 
> 어떤 점이 좋을까?


그래서 캠프가 끝나고 조금은 여유로워진 시점에 해당 API를 사용해보려고 한다.

### HTML Drag and Drop API?
브라우저에서 Drag and Drop(이하 DnD) 기능을 사용하게 해준다.

사용자는 `draggable` 요소를 마우스로 선택해서 `droppable` 요소로 드래그하고, 마우스 버튼에 손을 떼면 `draggable` 요소가 `droppable` 요소에 드롭된다.
해당 API를 사용하면 드래그하는 동안 `droppable` 요소는 반투명으로 변해서 마우스 포인터를 따라다닌다!

### Drag Event
사용자가 `draggable` 요소를 마우스로 선택해 `droppable` 요소로 가져가서 드롭하는 중 많은 이벤트가 발생한다. 바로 Drag Event다. 

| 이벤트 | 설명 |
| --- | --- |
| drag  | 요소나 텍스트 블록을 드래그할 때 발생
| dragend | 드래그가 끝났을 때 발생 (마우스 버튼에 손을 떼거나 <kbd>ESC</kbd> 키를 누를 때)
| dragenter | 드래그한 요소나 텍스트 블록이 드롭 대상 위에 올라갓을 때 발생 |
| dragexit | 요소가 더 이상 드래그의 직접적인 대상이 아닐 때 발생 발생 |
| dragleave | 드래그하는 요소나 텍스트 블록이 적합한 드롭 대상에서 벗어났을 때 발생 |
| dragover | 요소나 텍스트 블록이 적합한 드롭 대상 위로 지나갈 때 발생 |
| dragstart | 사용자가 요소나 텍스트 블록을 드래그하기 시작했을 때 발생 |
| drop | 요소나 텍스트 블록을 적합한 드롭 대상에 드롭했을 때 발생 |

위 이벤트들을 잘 조합하면 DnD를 구현할 수 있을 것 같다.

### DataTransfer
API에 `DataTransfer` 라는 것이 있다. 
이름에서 알 수 있듯이 DnD 중에 데이터를 전달한다.
객체인데, Drag 형태나 Drag 데이터, 그리고 각 Drag 아이템의 종류와 같은 Drag event의 상태를 담고 있다.

그리고 Drag 데이터에 아이템을 추가하거나 제거하는 메서드도 가지고 있다. 

### 사용해보자
어떤 요소를 드래그할 수 있게, 즉 `draggable`로 만들기 위해서는 요소에 `draggable="true"` 속성을 추가하면 된다.
```html
<div id="dragEl" draggable="true">Draggable Element</div>
```

다음 코드는 `draggable` 요소에 `dragstart` 이벤트를 등록한 예시다.
```js
const handleDragStart = e => {
  console.log('dragStart');
}
window.addEventListener("DOMContentLoaded", () => {
  const dragEl = document.querySelector("#dragEl");
  dragEl.addEventListener("dragstart", handleDragStart);
});
```

### Drag 데이터 전달하기
`DataTransfer`를 사용해 DnD 중에 데이터를 전달할 수 있다고 했다.
각 drag event는 `dataTransfer`(`DataTransfer` 객체)를 가지고 있고 이걸 사용해 drag 데이터를 관리할 수 있다. 

여러 메서드가 있는데 `setData` 메서드를 사용하면 다음과 같이 drag 데이터에 아이템을 추가 할 수 있다. 
```js
const handleDragStart = e => {
  console.log('dragStart');
  e.dataTransfer.setData("text/plain", e.target.id);
}
```
`setData`에 전달할 수 있는 아이템 타입은 [여기](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types)서 사용할 수 있다. (텍스트, HTML, 링크, 파일 등)

### Drag 이미지 정의하기
DnD를 사용하는 동안 마우스 포인터 옆에 나타나는 이미지는 기본적으로 제공이 된다. 보통 ghost 이미지라고 하는 것 같다. (여담이지만 나는 ghost란 단어를 보면 귀엽게 느껴진다. 아마도 어릴 때 했던 [보드게임](https://www.google.com/search?q=Geister+board+game&newwindow=1&client=firefox-b-d&hl=ko&sxsrf=ALiCzsY5D-2Q5XqUq5x-Y_aHIf5IdtrRnQ:1663213983622&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjapbf18pX6AhVbwIsBHfZ_BxsQ_AUoAXoECAEQAw&biw=960&bih=981&dpr=1)이 생각나서 그런 것 같다.)
기본적인 이미지도 `setDragImage`라는 메서드를 사용해 커스텀할 수 있다.

```js
const handleDragStart = e => {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 100;
  
  const ctx = canvas.getContext("2d");
  ctx.font = '100px monospace';
  ctx.fillText('🐯', 0, canvas.height);
  const img = new Image()
  const dataURL = canvas.toDataURL();
  img.src = dataURL;
  
  const dt = e.dataTransfer;
  dt.setDragImage(img, 50, 50);
}

window.addEventListener("DOMContentLoaded", () => {
  const dragEl = document.querySelector("#dragEl");
  dragEl.addEventListener("dragstart", handleDragStart);
});
```

이미지는 위 코드와 같이 `canvas`도 가능하다.

![[drag-test.gif]]

### 드롭할 지역 정의하기
기본적으로 브라우저는 HTML 요소에 뭔가를 drop 한 경우 아무 일도 일어나지 않는다. **그래서 특정 요소를 드롭 지역, `droppable` 로 만들기 위해서는 해당 요소가 `ondragover`, `ondrop` 이벤트 핸들러를 가져야한다.**
<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/padosum/embed/MWGJWed?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/MWGJWed">
  Untitled</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

`drag`, `dragOver` 이벤트에서 `e.preventDefault()`를 호출하는 이유는, 링크와 같은 것들을 드래그할 경우에 해당 링크로 이동하는 브라우저 기본동작을 방지하기 위해서다.

### Drag 효과
`dataTransfer.dropEffect` 를 이용해 DnD 중에 **마우스 포인터를 어떤 걸 보여줄 지** 정할 수 있다. 사용자에게 시각적인 피드백을 주기 위해 사용한다.
- `copy`: 현재 위치에서 드롭하는 위치로 데이터가 복사될 것을 암시
- `move`: 현재 위치에서 드롭하는 위치로 데이터가 이동될 것을 암시
- `link`: 드래그하는 위치와 드롭하는 위치 간 일종의 관계나 연결이 맺어진다는 것을 암시


사용해보니 droppable 위치에 텍스트 블록이 있어서 원래는 커서가 `text` 모양이었는데 `copy`의 경우 `+` 모양이 나타나고 `move` 는 일반 마우스 커서, `link`는 화살표 모양이 나타났다. 물론 브라우저마다 다를 수 있을 것 같다.

`effectAllowed` 는 사용자가 수행할 수 있는 드래그 유형을 제한한다. `dragover` 이벤트에서 설정한 `dropEffect` 를 초기화한다.  
예를 들어 `dragover` 이벤트에서 `dropEffect`를 `copy`로 설정하고 `drop` 이벤트에서 `effectAllowed`를 `move`로 하면 drop이 불가능하다.

### 칸반보드 만들기
Drag and Drop API에 대해 알아봤으니 이제 간단하게 칸반보드 형식으로 카드가 컬럼에 DnD 되도록 구현해보자.

구현 후 최종 모습은 다음과 같다.
<iframe height="300" style="width: 100%;" scrolling="no" title="Kanban board Drag and Drop API" src="https://codepen.io/padosum/embed/JjvEgKJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/JjvEgKJ">
  Kanban board Drag and Drop API</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

HTML 구조는 이렇다.
```html
<div class="list-wrapper">
  <div class="column">
    <div class="column-header">To Do</div>
    <div class="card-wrapper">
      <div class="card">
        <div class="header">
          <div class="title">
            <span>🏃‍♂️ 운동하기</span>
          </div>
        </div>
        <div class="body">
          <p>아침에 일어나 운동을 한다.</p>
        </div>
        <div class="caption">padosum</div>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="column-header">Doing</div>
    <div class="card-wrapper">
      <!-- card들의 위치 -->
    </div>
  </div>
  <div class="column">
    <div class="column-header">Done</div>
    <div class="card-wrapper">
      <!-- card들의 위치 -->
    </div>
  </div>
</div>
```

`.card` 요소를 드래그 해서 다른 컬럼으로 drop하고 싶다.
우선 `.card` 요소가 드래그 가능하다는 것을 알려주기 위해 `cursor: move` 속성을 추가하자. [^2]
![[move-cursor.png]]

```css
.card {
  cursor: move;
}
```

그리고 배운대로 `.card`를 `draggable` 요소로 만들어야 한다. `draggable=true` 속성을 추가해주자!
```html
<div class="card" draggable="true">
  <!-- ... -->
</div>
```

![[draggable.gif]]

`draggable`한 `.card`를 만들었다.


이제 옮기고 싶은 컬럼으로 `.card`를 이동시켜보자.  
앞서 드롭할 지역(`droppable`)을 만들기 위해서는 `dropover`와 `drop` 이벤트를 등록해야 한다고 했다.  
우린 `.column` 내에 드롭을 할 것이니 거기에 추가해주자.  
컬럼의 개수는 3개로 고정해둔 상태지만, 바뀔 수 있으므로 [[Event-Propagation-And-Delegation|이벤트 위임]]을 사용하려고 한다.
```js
list.addEventListener('dragover', e => {
  e.preventDefault()
  const column = e.target.closest('.column')
  if (!column) return
  console.log('dragover!')
})

list.addEventListener('drop', e => {
  e.preventDefault()
  const column = e.target.closest('.column')
  if (!column) return
  console.log('drop!')
})
```

현재 드래그 하고 있는 아이템을 특정하기 위해 드래그를 시작할 때 해당 요소에 class를 추가하자. `.dragging`이라고 추가했다.
```js
list.addEventListener('dragstart', e => {
  const card = e.target.closest('.card')
  if (!card) return

  card.classList.add('dragging')
})
```

그리고 `dragover` 이벤트에서 `.dragging` 요소를 해당 컬럼에 추가해주도록 하자.
```js
list.addEventListener('dragover', e => {
  e.preventDefault()
  const column = e.target.closest('.column')
  if (!column) return
  const dragging = document.querySelector('.dragging')
  column.appendChild(dragging)
})
```

카드를 드롭한 후 해당 요소의 `.dragging` class를 지워줘야 한다. `.dragging` 을 찾아서 해당 컬럼에 추가하기 때문이다.  
처음엔 `drop` 이벤트 발생시 `.dragging`  요소의 class를 지웠는데 그렇게 하면 `drop` 하지 않은 경우, 즉 그냥 드래그했다가 원래 자리로 돌려보낸 경우에 `.dragging`이 그대로 남아있게 된다!   
따라서 `dropend` 이벤트, 즉 드래그가 끝난 경우 발생하는 이벤트에서 class를 지워준다.
```js
list.addEventListener('dragend', e => {
  const card = e.target.closest('.card')
  if (!card) return

  e.target.classList.remove('dragging')
})
```

드래그 중임을 나타내기 위해 해당 class에 스타일을 추가해줘도 좋을 것이다.
```css
.card.dragging {
  opacity: 0.8;
  box-shadow: 0px 0px 4px rgba(204, 204, 204, 0.5),
    0px 2px 4px rgba(0, 0, 0, 0.25);
}
```

![[kanban_dnd.gif]]괜찮아보인다? 하지만 문제가 있다. 바로 `appendChild`를 사용했기 때문에 컬럼의 가장 마지막에 요소가 들어가게 된다. 이걸 해결해보자.

원하는 위치에 넣으려면 어떻게 해야할까? 맨 마지막 요소가 아닌 A요소와 B요소 사이에 `.card`를 넣고 싶은 것이다.   
[[JavaScript-Create-Node-and-Append-Node|DOM API를 잘 활용]]하면 어떤 요소와 요소 사이에 요소를 추가하는 것이 가능할 것 같다.  
**`dragover` 이벤트가 발생할 때 마우스 포인터의 위치가 어떤 카드 이전에 위치한다면 그곳에 카드를 이동**시키면 좋겠다.

**현재 마우스 포인터의 위치**를 어떻게 알 수 있을까?  
공식문서를 읽어보니 `dragover` 이벤트는 [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)의 속성을 상속받는다. `MouseEvent` 속성 중 `clientY`가 있는데 브라우저가 표시하는 화면 내에서 Y좌표를 가져올 수 있다!

그렇다면 **현재 마우스 포인터에 위치한 카드는 어떻게 찾을 수 있을까?**    
또 하나의 유용한 [[DOM]] API가 있었다.  `Document.elementFromPoint()` 는 사용하면 지정된 좌표에서 최상위 element를 반환한다.
```js
let pointedEl = document.elementFromPoint(clientX, clientY);
```

필요한 API를 알게되었으니 작업을 해보도록한다.
```js
const dragging = document.querySelector('.dragging')

// 좌표 최상위 element를 가져온다.
const pointedEl = document.elementFromPoint(e.clientX, e.clientY)

// 해당 element와 가장 가까운 `.card`
const closestCard = pointedEl.closest('.card')

// 가까운 .card가 존재한다면 이전에 끼워넣기
if (closestCard) {
  closestCard.before(dragging)
} else {
// 없다면 가장 마지막 카드로 추가
  column.appendChild(dragging)
}
```

### 문제점
Drag and Drop API를 사용하면 정말 간편하게 DnD를 구현할 수 있다.
하지만 **모바일에서 작동을 하지 않았다.** 
![[dnd-api-with-mobile.png]]
내 폰에서도 DnD가 제대로 작동하질 않는 것을 확인할 수 있었다.   
그리고 [poliyfill](https://bernardo-castilho.github.io/DragDropTouch/)도 찾았는데 해당 스크립트를 한 줄 추가하니 잘 작동되었다.  
해당 Poliyfill은 `touch` DnD 이벤트를 구현하기 위해 touch 이벤트를 사용한다.  

이렇게 한 줄 넣고 끝내긴 아쉽다. 직접 구현해보자.

## Pointer Events 사용하기
사실 todolist 프로젝트를 시작할 때 팀원분이 pointer events를 사용하면 모바일에서도 가능하니 해보자는 의견을 내주셨다.  
근데 개발 과정에서 모바일에서는 전혀 테스트를 하지 않고 진행을 하는 바람에 코드 프리징 시점에 모바일에서 약간의 오류가 나오는 것을 확인했다..  
**지속적인 배포, 그리고 그 배포를 통한 테스팅의 중요성을 많이 느꼈다.** 

### Pointer Events란?
앞서 touch 이벤트를 사용한 poliyfill을 알게되었다.

DnD에 대해 검색하면 아래 이벤트를 사용하는 경우들이 있었다.
- Mouse Events
- Pointer Events
- Touch Events

이름을 보면 느낌이 오긴 하지만 정확히 어떤 차이가 있을까?

대부분 웹 애플리케이션은 마우스 입력용으로 설계가 되었었다. 해당 이벤트는  Mouse Events를 통해 입력을 처리했다.  

모바일 장치를 처리하는 웹 애플리케이션은 Touch Events를 사용한다. 그런데 꼭 애플리케이션을 모바일로만 사용하는 경우가 더 많을까? 아마 터치를 처리하는 것 외에 마우스도 함께 처리해야 하는 경우가 많을 것이다. 그래서 같은 내용의 코드를 Mouse Events에도, Touch Events에도 추가하는 문제가 생겼다. (분기 처리를 해야했을 수도 있다.)

따라서 이런 비효율적인 문제를 해결하기 위해 Pointer Events가 생겼다. **Pointer Events만 사용하면 한 번에 마우스와 터치를 다 처리가능하게 된 것**이다!

### 칸반 보드 구현하기

Pointer Events로 DnD를 구현하려면 어떻게 해야할까?
DnD API로 구현했을 때를 떠올려보자.
1. 드래그하려는 `.card`를 잡으면 잔상이 남는다.
2. 그리고 DnD API 처럼 해당 `.card`의 ghost 이미지가 마우스 포인터 주위에 나타나야한다.
4. `.card`를 드래그하는 중 컬럼에 옮기면 투명한 `.card`가 컬럼에 위치된다.
5. drop하면 쥐고있던 `.card`는 사라지고 컬럼에 있던 투명한 `.card`가 원래 불투명한 상태로 돌아온다.

#### 드래그 준비하기
1번을 위해서 `pointerdown` 이벤트를 사용하면 가능할 것 같다.  
코드를 작성하고 테스트해보자.
`.afterimage`라는 클래스를 추가해서 스타일을 추가했다. (영어로 잔상이 'afterimage'란다.)
```js
list.addEventListener('pointerdown', e => {
  const card = e.target.closest('.card')
  if (!card) return

  card.classList.add('afterimage')
})
```
```css
.card.afterimage {
  opacity: 0.4;
  border: 1px solid #0075de;
}
```

이제 마우스 포인터를 따라다니는 ghost 이미지를 만드려고 한다. 선택된 `.card` 내용을 복사하고 마우스 포인터 위치에 그려주자.
우선 ghost 이미지로 사용할 요소를 추가하자.
```html
<div class="ghost"></div>
```

```css
.ghost {
  top: 0;
  left: 0;
  position: absolute;
  width: 350px;
}
```

그리고 현재 선택한 `.card`를 복사한다. (`cloneNode(true)`를 사용해 하위 요소 전체 복사)
복사한 요소는 `ghost`에 붙인다.
```js
window.addEventListener(
  'pointerdown',
  ({ clientX, clientY, pageX, pageY, target }) => {

    // ...
    
    // 현재 카드를 복사한다.
    const cloneCard = card.cloneNode(true)
    cloneCard.classList.add('dragging') // 스타일 추가를 위한 class

    // 복사한 카드를 ghost에 추가한다.
    const ghost = document.querySelector('.grab-card')
    ghost.appendChild(cloneCard)
  }
)
```

그리고 나서 ghost 이미지의 위치를 잡아줘야 한다!

저번에 작업할 땐 단순히 현재 카드의 중앙 좌표값으로 이동시켰었다.
```js
this.grabbedCard.style.transform = `translateX(${
      pageX - this.grabbedCard.offsetWidth / 2
    }px) translateY(${pageY - this.grabbedCard.offsetHeight / 2}px)`;
```

그래서 다음과 같이 카드의 어느 부분을 선택하든 ~~띠용~~ 하는 느낌으로 카드의 위치가 변경되었다. 현재 마우스 커서가 카드의 중심이 되기 때문이다.  
![[pointer.gif]]

물론 당시에는 이상함을 못 느껴서 그냥 넘어갔다. 저것도 나름대로 괜찮았는데 수정하고 싶었다.

[JavaScript.INFO](https://ko.javascript.info/mouse-drag-and-drop)에 드래그 이벤트에 관한 설명을 참고할 수 있었다.  
아래 그림처럼 `pointerdown` 이벤트가 발생하는 `clientX`와 `clientY`를 가져와서 카드의 좌표를 구하면 그 차이를 구할 수 있다. 여기선 `shiftX`와 `shiftY`라는 값으로 저장해뒀다.
![[ghost.png]]
```js
shiftX = clientX - card.getBoundingClientRect().left
shiftY = clientY - card.getBoundingClientRect().top

ghost.style.cssText = `width: ${card.offsetWidth}px; transform: translateX(${pageX - shiftX}px) translateY(${pageY - shiftY}px)`

pointerDown = true
card.classList.add('afterimage')
```

**`ghost`의 위치는 현재 마우스 포인터의 위치에서 항상 `shift`라는 이름으로 저장한 값을 뺀 만큼의 좌표로 이동시키면 된다.**   
`ghost`의 위치를 이동시킬 때 `left`와 `top`을 사용하지 않고 `transform`의 `translateX`, `translateY`를 사용했다. 그 이유는 `left`, `top`은 포지셔닝을 한다. 즉, 다른 요소와의 관계에 영향을 끼친다. 그래서 **[[브라우저의-렌더링-과정|렌더링, 페인팅]]과정이 발생하니 성능에 좋지 않다.** (팀원 분이 알려주셨다. [참고](https://mygumi.tistory.com/238))

그리고 `pointerDown`이라는 변수를 `true`로 변경했다. 이건 추후에 작업할 `pointermove` 이벤트에서 `.card`를 드래그 여부를 체크하기 위해서다. 

#### 드래그하기 

드래그는 `.card`를 선택한 상태에서 설정한 ghost 이미지가 마우스 포인터를 따라다니게 하자.
그래서 아까 `pointerdown` 이벤트에서 설정한 `pointerDown` 변수가 `true`인지 확인한다. 
DnD API에서 `dragstart`를 했는지 확인하는 것과 비슷(?)하다고 생각한다.
```js
window.addEventListener(
  'pointermove',
  ({ clientX, clientY, pageX, pageY, target }) => {
    if (!pointerDown) {
      return
    }
  }
)
```

그리고 DnD API를 사용했을 때처럼 현재 마우스포인터 밑에 존재하는 요소를 찾고, 가장 가까운 `.card`를 찾는다. 
`ghost.hidden`을 잠깐 `true`로 하는 이유는 `ghost` 가 마우스 포인터 바로 하단에 있기 때문에 그 밑에 있는 다른 요소들을 다 가려버리기 때문이다.
```js
const ghost = document.querySelector('.ghost')
ghost.hidden = true
const pointedEl = document.elementFromPoint(clientX, clientY)
const closestCard = pointedEl.closest('.card')
const column = pointedEl.closest('.column')
ghost.hidden = false
```

그리고 `pointerdown`과 마찬가지로 `ghost`의 위치를 현재 마우스 포인터 위치에 따라 이동하도록 처리한다.
```js
ghost.style.cssText = `width: ${ghost.offsetWidth}px; transform: translateX(${pageX - shiftX}px) translateY(${pageY - shiftY}px)`
```

이제 `.card`를 이동시킬 차례다. 현재 마우스 커서의 위치 가까이에  `.column`이 없는 경우는 무시한다.

그리고 현재 드래그 중인 카드를 복사하고, DnD  API에서 한 작업을 그대로 처리하면 된다. 가까운 위치에 카드가 있다면 그 전에 (`before`)에 드래그 중인 카드를 붙이고, 없다면 column 마지막에 붙인다.

여기서 가장 가까운 카드가 `.afterimage` class를 가지고 있는 경우는 다른 컬럼으로 이동하지 않은 경우이므로 무시한다. 마지막으로 카드를 이동시켰다면 기존 자리에 있던 카드의 잔상은 제거한다. (`fromCard.remove()`) 
```js
if (!column) {
  return
}

// 쥐고 있는 카드 복사
const placeCard = ghost.firstChild.cloneNode(true)
placeCard.classList.replace('dragging', 'afterimage')
const fromCard = document.querySelector('.afterimage')

// 근처에 카드가 있으면
if (closestCard) {  
  // 근처 카드가 잔상이라면 무시
  if (closestCard.classList.contains('afterimage')) {
	return
  }
  
  closestCard.before(placeCard)
} else {
  // 근처에 카드가 없으면 제일 밑으로 이동
  const cardWrapper = column.querySelector('.card-wrapper')
  cardWrapper.appendChild(placeCard)
}

fromCard.remove() // 카드 잔상 제거
```

#### 드롭하기
드롭은 간단하다. `pointerup` 이벤트가 발생했을 때 `pointerDown` 변수를 `false`로 변경한다. 그리고 ghost 이미지 내부 요소를 지운다.
드래그 하던 카드의 class도 변경해서 원래 상태로 되돌리자.
```js
window.addEventListener('pointerup', e => {
  if (!pointerDown) {
    return
  }

  pointerDown = false

  const ghost = document.querySelector('.ghost')
  ghost.innerHTML = ''

  const activeCard = document.querySelector('.afterimage')
  activeCard.classList.remove('afterimage')
})
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Kanban board Drag and Drop Pointer Events" src="https://codepen.io/padosum/embed/bGMgXwy?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/padosum/pen/bGMgXwy">
  Kanban board Drag and Drop Pointer Events</a> by Yeonjeong Choi (<a href="https://codepen.io/padosum">@padosum</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## DnD와 웹 접근성
저번에 [[Customize-Accessible-Checkbox-and-Radio|웹 접근성을 준수해 Checkbox와 Radio 커스텀]]하고 난 뒤 이 DnD에 대해 생각해봤다.
모두가 사용할 수 있을까? 우선 현재 키보드로는 Drag and Drop을 사용할 수 없다. 모두가 사용할 수 없다.  
감이 오지 않았다. 그래서 DnD accessibility에 대해 검색하니 한 [저장소](https://github.com/salesforce-ux/dnd-a11y-patterns)가 나왔다.

키보드로 list의 위치를 변경하는 것도 있었고, 칸반보드 형식의 경우에는 카드에 위치를 변경하는 버튼이 따로 존재하는 걸 볼 수 있었다. 거기서 컬럼을 선택해서 이동할 수 있도록...  
이 저장소를 알기 전에는 드래그에만 집중해서 어떤식으로 해야하는지 모르겠다는 생각 뿐이었다. 하지만 Demo를 보고 생각하니 DnD를 사용하는 목적은 결국 아이템의 컬럼(위치)를 이동하기 위한 것이니 저 방법이 좋아보였다.  

그러면서 문득 든 생각은, **웹 접근성을 고려하려면 다 만들고 하는 것이 아니라, 애초에 설계부터 고려해야한다는 점**이다. 당연한 거지만 왜 이런 생각이 들었냐면, 난 다 만들고 나서 '어떻게 웹 접근성을 준수할 수 있을까?'라는 생각이 생각을 했기 때문이다. 순서가 반대다.  

## 생각
아주 간단하게 DnD를 구현했다. 구현하고 나니 프로젝트때 너무 어렵게 생각했다는 생각도 들고... 하지만 그때는 그게 최선이었을 것이다. 왜냐하면 훨씬 많은 기능들이 있기 때문이다. 

한 가지 더 느낀 점은 **무작정 누군가 만들어놓은 것을 따라하지말고 생각을 하면서 구현해보는 게 중요하다는 생각이 들었다. 그렇게 하면 거기에 갇히지 않고 더 좋은 방법이 생길 수도 있으니까!**

## 참고
- [mdn web docs - HTML Drag and Drop API](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)
- [web.dev - drag and drop](https://web.dev/drag-and-drop/)

[^1]: https://ko.wikipedia.org/wiki/%EB%93%9C%EB%9E%98%EA%B7%B8_%EC%95%A4%EB%93%9C_%EB%93%9C%EB%A1%AD
[^2]: [mdn web docs - cursor](https://developer.mozilla.org/ko/docs/Web/CSS/cursor)
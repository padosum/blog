---
title   : Node-Geometry
date    : 2022-05-23 14:05:04 +0900
updated : 2022-05-23 22:28:08 +0900
tags    : ["JavaScript", "DOM"]
---

HTML 문서를 웹 브라우저에서 보면 [[DOM]] 노드가 해석되서 시각적인 모양으로 그려지게 된다. 노드의 시각적인 형태와 [[기하학|geometry]]를 프로그래밍을 통해 살펴보고 조작하기 위한 API들이 존재한다.

## 요소의 offsetTop과 offsetLeft 값 가져오기
`offsetTop`과 `offsetLeft`로 `offsetParent`로부터 요소의 픽셀 값을 얻어올 수 있다.
요소의 바깥쪽 좌상단 경계로부터 `offsetParent`의 안쪽 좌상단 경계까지의 거리를 픽셀로 제공한다.
`offsetParent`의 값은 가장 가까운 부모 요소 중 CSS position이 `static`이 아닌 요소를 탐색해서 결정한다. 아무 요소도 발견되지 않는다면 `offsetParent`의 값은 `<body>` 요소가 사용된다. 

설명만 하면 이해가 어려우니 예시를 보자.
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
      }
      
      .parent {
        width: 100px;
        height: 100px;
        padding: 10px;
        border: 1px solid #000;
      }

      .child {
        width: 50px;
        height: 50px;
        border: 1px solid red;
      }
    </style>
  </head>

  <body>
    <div class="parent">
      <div class="child"></div>
    </div>
    <script>
      const div = document.querySelector(".child");
      console.log(div.offsetLeft);   // 11
      console.log(div.offsetTop);    // 11
      console.log(div.offsetParent); // <body>
    </script>
  </body>
</html>
```

![[offsetLeft-offsetTop-offsetParent.png]]
`.child`는 `offsetParent`인 `<body>` 요소를 기준으로 부모 요소인 `.parent`의 `padding`값 `10px`과 `border` `1px`를 더해 `offsetLeft`값과 `offsetTop`값이 `11px`인 것을 확인할 수 있다.

여기서 `.parent`의 `position`이 `absolute`로 설정되면, 앞서 설명했듯이 `static`이 아닌 요소를 검색하기 때문에 `offsetParent`는 `.parent`가 된다. 그리고 `offsetLeft`와 `offsetTop`은 `10px`이 된다.
```css
.parent {
	width: 100px;
	height: 100px;
	padding: 10px;
	border: 1px solid #000;
	position: absolute;
}
```

## 요소의 위쪽, 오른쪽, 아래쪽 왼쪽 테두리 가장자리 가져오기
`getBoundingClientRect()` 메서드를 사용하면 [[Viewport|뷰포트]]의 좌측 상단 가장자리를 기준으로 요소의 외부 테두리 가장자리의 위치를 가져올 수 있다.

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
    <div></div>
    <script>
      const rect = document.querySelector("div").getBoundingClientRect();
      console.log(rect);
      // DOMRect { x: 8, y: 8, width: 102, height: 102, top: 8, right: 110, bottom: 110, left: 8 }
      // bottom: 110
      // height: 102
      // left: 8
      // right: 110
      // top: 8
      // width: 102
      // x: 8
      // y: 8
    </script>
  </body>
</html>
```
`getBoundingClientRect()` 메서드는 `top`, `left`, `right`, `bottom`, `height`, `width`를 반환한다.
- `height`와 `width`는 `padding`과 `border`를 포함한 전체 높이와 너비를 가지고 있다.
- `height`와 `width`는 `offsetHeight`와 `offsetWidth` 속성을 사용해도 동일한 크기의 값을 얻을 수 있다.

## 뷰포트에서 테두리를 제외한 요소 크기 가져오기
`clientHeight`와 `clientWidth`는 테두리를 제외한 요소의 크기를 가진다.
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
    <div></div>
    <script>
      const rect = document.querySelector("div")
      console.log(rect.height, rect.width) // 102 102
      console.log(rect.clientHeight, rect.clientWidth) // 100 100
    </script>
  </body>
</html>

```

## 뷰포트의 특정 지점에서 최상위 요소 가져오기
`elementFromPoint()` 를 사용하면 문서의 특정 지점에서 최상위 요소에 대한 참조를 얻을 수 있다. 최상단 요소 (또는 `z-index` 설정이 없는 경우 문서 순서상 마지막인 것)가 선택되어 반환된다.
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
    <div></div>
    <script>
      console.log(document.elementFromPoint(10, 10)); // <div>
      console.log(document.elementFromPoint(1, 1));  // <html>
    </script>
  </body>
</html>
```

## scrollHeight, scrollWidth를 사용해 스크롤되는 요소의 크기 가져오기
`scrollHeight`, `scrollWidth` 속성은 스크롤될 요소의 높이와 너비를 제공한다.
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p {
        height: 1000px;
        width: 1000px;
      }
    </style>
  </head>
  <body>
    <p></p>
    <script>
      const p = document.querySelector("p");
      console.log(p.scrollHeight, p.scrollWidth); // 1000 1000
    </script>
  </body>
</html>
```


## scrollTop과 scrollLeft를 사용해 스크롤될 픽셀을 가져오거나 설정하기
`scrollTop`, `scrollLeft` 속성으로 현재 스크롤 때문에 뷰포트에서 볼 수 없는 `left`나 `top` 까지의 픽셀을 반환한다. 스크롤이 해댕 값으로 이동된다. 
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      div {
        height: 100px;
        width: 100px;
        overflow: auto;
      }

      p {
        height: 1000px;
        width: 1000px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div>
      <p></p>
    </div>
    <script>
      const div = document.querySelector("div");
      div.scrollTop = 650;
      div.scrollLeft = 650;
      console.log(div.scrollTop, div.scrollLeft); // 650 650
    </script>
  </body>
</html>

```

## 요소를 View로 스크롤하기
`scrollIntoView()` 메서드를 사용해 노드가 view로 스크롤되게 할 수 있다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style></style>
  </head>
  <body>
    <script>
      for (let i = 0; i < 100; i++) {
        const p = document.createElement("p");
        p.innerText = i;
        document.body.appendChild(p);
      }

      document.querySelectorAll("p")[50].scrollIntoView(true);
    </script>
  </body>
</html>
```
`for`문을 이용해 `p` 요소 100개를 화면에 그린 코드다. 각 요소 내부엔 번호가 0부터 99까지 매겨져 있다.
인덱스 값이 `50`인 요소의 `scrollIntoView` 메서드에 `true`를 전달하면 해당 요소의 `top`으로 스크롤하라는 의미가 된다. `true`는 기본값이므로 굳이 넣어주지 않아도 된다. 만약 요소의 `bottom`으로 스크롤시키고 싶다면 `false`를 전달하면 된다.


## reference
- 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년
- [CSSOM View Module](https://www.w3.org/TR/cssom-view/)
- [DOM Manipulation - Node Geometry and Styles](https://levelup.gitconnected.com/dom-manipulation-node-geometry-and-styles-a41199036072)
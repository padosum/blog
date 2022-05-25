---
title   : 이벤트 전파와 위임
date    : 2021-10-05 21:45:52 +0900
updated : 2022-05-25 18:11:09 +0900
aliases : ["이벤트 전파와 위임"]
tags    : ["DOM", "Web", "JavaScript"]
---
## 이벤트 전파
[[DOM]] 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파되면서 다른 노드에서 동일한 이벤트를 발생시킨다. 이를 이벤트 전파(event propagation)라고 한다. 
```html
<!DOCTYPE html>
<html>
<body>
  <ul class="fruits">
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="rage">Orage</li>
  </ul>
</body>
</html>
```
예를 들어, `ul`의 두 번째 자식 요소인 `li`를 클릭하면 클릭 이벤트가 발생하는데, 이때 생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃을 중심으로 아래 그림과 같이 DOM 트리를 통해 전파된다.  
![[event propagation.png]]  
이벤트 전파는 다음 3단계로 구분할 수 있다.
- 캡처링 단계(Capturing phase): 이벤트가 상위 요소에서 하위 요소로 전파되는 단계
- 타깃 단계(Target phase): 이벤트가 실제 타깃 요소에 전달되는 단계
- 버블링 단계(Bubbling Phase): 이벤트가 하위 요소에서 상위 요소로 전파되는 단계 

```html
<!DOCTYPE html>
<html>
  <head> </head>
  <body>
    <div>Click Me</div>
    <script>
      window.addEventListener("click", () => {
          console.log("1 캡처링 단계 - window의 click 이벤트 호출");
        }, true);

      document.addEventListener(
        "click", () => {
          console.log("2 캡처링 단계 - document의 click 이벤트 호출");
        }, true
      );

      document.documentElement.addEventListener(
        "click", () => {
          console.log("3 캡처링 단계 - <html> element의 click 이벤트 호출");
        }, true
      );

      document.body.addEventListener(
        "click", () => {
          console.log("4 캡처링 단계 - <body> element의 click 이벤트 호출");
        }, true
      );

      document.querySelector("div").addEventListener(
        "click", () => {
          console.log("5 캡처링 단계 - <div> element의 click 이벤트 호출");
        }, true
      );

      document.querySelector("div").addEventListener(
        "click", () => {
          console.log("6 타깃 단계 - <div> element의 click 이벤트 호출");
        }, false
      );

      document.body.addEventListener(
        "click", () => {
          console.log("7 버블링 단계 - <body> element의 click 이벤트 호출");
        }, false
      );

      document.documentElement.addEventListener(
        "click", () => {
          console.log("8 버블링 단계 - <html> element의 click 이벤트 호출");
        }, false
      );

      document.addEventListener(
        "click", () => {
          console.log("9 버블링 단계 - document의 click 이벤트 호출");
        }, false
      );

      window.addEventListener(
        "click", () => {
          console.log("10 버블링 단계 - window의 click 이벤트 호출");
        }, false
      );
    </script>
  </body>
</html>
```
위 코드에서 "Click Me"라는 텍스트가 있는 `<div>`를 클릭하면 다음과 같이 로그가 찍힐 것이다. 이벤트가 전파되는 흐름을 로그로 확인할 수 있다.
```
1 캡처링 단계 - window의 click 이벤트 호출
2 캡처링 단계 - document의 click 이벤트 호출
3 캡처링 단계 - <html> element의 click 이벤트 호출
4 캡처링 단계 - <body> element의 click 이벤트 호출
5 캡처링 단계 - <div> element의 click 이벤트 호출
6 타깃 단계 - <div> element의 click 이벤트 호출
7 버블링 단계 - <body> element의 click 이벤트 호출
8 버블링 단계 - <html> element의 click 이벤트 호출
9 버블링 단계 - document의 click 이벤트 호출
10 버블링 단계 - window의 click 이벤트 호출
```

캡처링 단계는 거의 쓰이지 않는다고 한다. 그렇게 된 이유는 현실의 사고 흐름과 비슷하게 만들어진 논리적 배경이 있다고 한다[^1] . 통상적으로 이벤트는 버블링 단계 도중에 호출되는 것으로 가정된다[^2].

**이벤트는, 이벤트를 발생시킨 이벤트 타깃과 이벤트 전파를 통해 상위 DOM 요소에서도 캐치가 가능하다.**  

### 이벤트 버블링을 통해 전파되지 않는 이벤트 
이벤트 버블링을 통해 전파되지 않는 이벤트는 다음과 같다.  
- `focus/blur`
- `load/unload/abort/error`
- `mouseenter/mouseleave`

위 이벤트들은 버블링되지 않으니 이벤트 타깃의 상위 요소에서 이벤트를 캐치하려면 캡처링 단계의 이벤트를 캐치하거나 다음 이벤트로 대체하는 것이 좋다. 
- `focusin/focusout`
- `mouseover/mouseout`

## 이벤트 전파를 중지시키기
이벤트 핸들러내에 `stopPropagation()`을 호출하면 캡처링 버블링을 막을 수 있다. 하지만 노드나 개체에 직접 연결된 이벤트는 호출된다. 또한 브라우저의 기본 이벤트를 막진 않는다.
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div>Click ME</div>
    <script>
      document.querySelector("div").addEventListener("click", () => {
        console.log("<div>를 클릭!");
      });

      document.querySelector("div").addEventListener("click", (e) => {
        console.log("<div>의 클릭 이벤트 호출, 버블링과 캡처링은 막는다.");
        e.stopPropagation();
      });

      document.querySelector("div").addEventListener("click", () => {
        console.log("<div>를 클릭!");
      });

      document.body.addEventListener("click", () => {
        console.log(
          "stopPropagation()으로 캡처링 및 버블링을 중지시켰기 때문에 <div>를 클릭하면 호출되지 않는다."
        );
      });
    </script>
  </body>
</html>
```
위 코드에서 두 번째 `addEventListener` 메소드 내부에 `stopPropagation()`을 호출했기 때문에 `<div>`를 클릭하면 `<div>`에 연결된 이벤트는 호출되지만 `<body>` 클릭 이벤트는 호출되지 않는 것을 확인할 수 있다.

`stopImmediatePropataion()`을 사용하면 이벤트 전파를 중지(`stopPropagation()`을 사용한 것과 같이)시킬 뿐만 아니라 `stopImmediatePropagation()` 메서드를 호출한 `addEventListener()` 이후에 등록된 이벤트도 중지시킨다.
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div>Click ME</div>
    <script>
      document.querySelector("div").addEventListener("click", () => {
        console.log("<div>를 클릭!");
      });

      document.querySelector("div").addEventListener("click", (e) => {
        console.log("<div>의 클릭 이벤트 호출, 버블링과 캡처링은 막는다.");
        e.stopImmediatePropagation();
      });

	  // 호출되지 않는다!
      document.querySelector("div").addEventListener("click", () => {
        console.log("<div>를 클릭!");
      });

      document.body.addEventListener("click", () => {
        console.log(
          "stopImmediatePropagation()으로 캡처링 및 버블링을 중지시켰기 때문에 <div>를 클릭하면 호출되지 않는다."
        );
      });
    </script>
  </body>
</html>
```

`stopImmediatePropagation()`도 `stopPropatation()` 처럼 브라우저의 기본 이벤트는 막지 못한다.


## 이벤트 전파의 활용, 이벤트 위임
이벤트 위임이란, 이벤트 전파를 활용해 하위 요소들에 이벤트 핸들러를 각각 등록할 필요 없이, 하나의 상위 요소에 이벤트 핸들러를 등록하는 방법이다. 
또한 동적으로 하위 DOM 요소가 추가되어도 추가될 때마다 이벤트 핸들러를 등록하지 않아도 되는 장점이 있다.  무슨 말인지 예시를 통해 알아보자.

다음과 같이 `<table>` 요소가 있을 때, 테이블 헤더를 마우스로 클릭하면 해당 컬럼 값을 기준으로 정렬이 되는 기능을 추가하고 싶다고 가정해보자.
```html
<table>
  <thead>
	<tr>
	  <th>name</th>
	  <th>email</th>
	  <th>phone</th>
	  <th>country</th>
	  <th>list</th>
	</tr>
  </thead>
  <tbody>
	<tr>
	  <td>Eve Mcknight</td>
	  <td>erat.eget@hotmail.couk</td>
	  <td>1-266-224-3024</td>
	  <td>France</td>
	  <td>15</td>
	</tr>
	<tr>
	  <td>Rina Bridges</td>
	  <td>turpis.egestas@outlook.net</td>
	  <td>(973) 752-0201</td>
	  <td>France</td>
	  <td>17</td>
	</tr>
	<tr>
	  <td>Aidan Morrow</td>
	  <td>nec.ante@yahoo.net</td>
	  <td>(812) 171-2537</td>
	  <td>Chile</td>
	  <td>5</td>
	</tr>
  </tbody>
</table>
```

`<table>`요소의 `<thead>` 내부 `<th>`에 이벤트 리스너를 등록하고 해당 작업을 수행하게 하면 될 것이다. 각각의 `<th>` 요소에 이벤트 리스너를 등록할 수도 있지만 보통 간편하게 하기 위해 아래와 같이 `<th>` 요소를 배열로 가져와 이벤트를 등록해줄 것이다.
```javascript
const head = document.querySelectorAll("th");

const sortEvent = (el) => {
  console.log(`${el.innerText} 컬럼을 기준으로 정렬 작업을 수행한다.`);
};

h.addEventListener("click", () => {
  sortEvent(h);
});
```

하지만 여기서 한 가지 문제가 있다. 만약 여기서 `<th>`요소가 새로 추가가된다면 그 요소에는 이벤트가 등록되어있지 않을 것이다. `<th>` 요소가 추가될 때마다 매번 이벤트를 등록해줘야 하는 번거로운 문제가 생긴다.

이벤트 위임을 사용하면 이벤트를 등록할 때 이벤트 대상이 DOM 내에 있을 필요가 없다. 어떻게 하면 될까?
이벤트 위임은 **이벤트 전파를 활용**한다고 했다. `<th>` 요소를 클릭하면 버블링 단계에서 상위 요소인 `<table>`에서 캐치가 가능할 것이다.
다음과 같이 `e.target`으로 현재 이벤트가 발생한 요소를 확인해서 처리할 수 있다.
```javascript
const table = document.querySelector("table");
table.addEventListener("click", (e) => {
	if (e.target.tagName === "TH") {
	  sortEvent(e.target);
	}
});
```

하지만 여기서 하나 더 발생할 수 있는 문제가 있다...
바로 다음과 같이 클릭 이벤트를 등록한 요소가 다른 요소에 감싸져 있는 경우가 있을 수 있다.
```html
<thead>
  <tr>
    <th><em>name<em></th>
```
그럼 아주 세심하게 `<th>`내부이면서 `<em>`이 아닌 부분을 클릭해야 원하는 작업을 진행시킬 수 있다. 왜냐하면 코드 `e.target.tagName === "TH"`라는 조건이 있기 때문이다.
이럴 때는 `element.closest(selector)` 메서드를 사용해서 요소의 상위 요소 중 매개변수로 전달한 `selector`와 일치하는 가장 근접한 조상 요소를 반환하는 방법을 사용하면 된다.[^3]
```javascript
const table = document.querySelector("table");
table.addEventListener("click", (e) => {
  const th = e.target.closest("th");
  if (!th) return; // 근접한 상위 요소에 th가 없으면 리턴
  sortEvent(th);
});
```


[^1]: 안재우 역, 코디 린들리 저, 《DOM을 깨우치다》, O'Reilly, 2013년, 160쪽
[^2]: https://ko.javascript.info/bubbling-and-capturing#ref-65
[^3]: https://ko.javascript.info/event-delegation
---
title   : 이벤트 전파와 위임
date    : 2021-10-05 21:45:52 +0900
updated : 2021-10-05 21:48:10 +0900
aliases : ["이벤트 전파와 위임"]
tags    : ["DOM", "Web", "JavaScript"]
---
## 이벤트 전파
[[DOM]] 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. 이를 이벤트 전파(event propagation)라고 한다. 
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

**이벤트는, 이벤트를 발생시킨 이벤트 타깃과 이벤트 전파를 통해 상위 DOM 요소에서도 캐치가 가능하다.**  

### 이벤트 버블링을 통해 전파되지 않는 이벤트 
이벤트 버블링을 통해 전파되지 않는 이벤트는 다음과 같다.  
- `focus/blur`
- `load/unload/abort/error`
- `mouseenter/mouseleave`

위 이벤트들은 버블링되지 않으니 이벤트 타깃의 상위 요소에서 이벤트를 캐치하려면 캡처링 단계의 이벤트를 캐치하거나 다음 이벤트로 대체하는 것이 좋다. 
- `focusin/focusout`
- `mouseover/mouseout`

## 이벤트 전파의 활용, 이벤트 위임
이벤트 위임이란, 이벤트 전파를 활용해 하위 요소들에 이벤트 핸들러를 각각 등록할 필요 없이, 하나의 상위 요소에 이벤트 핸들러를 등록하는 방법이다. 
또한 동적으로 하위 DOM 요소가 추가되어도 추가될 때마다 이벤트 핸들러를 등록하지 않아도 되는 장점이 있다.  


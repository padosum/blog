---
title   : React와 최적화 
date    : 2023-03-27 23:19:27 +0900
updated : 2023-03-27 23:26:55 +0900
aliases : ["React와 최적화"] 
draft : false
---

## Goal

React에서 최적화를 위한 방법 알아보기


## 컴포넌트 업데이트

- 부모 컴포넌트의 state가 변경될 때 자식 컴포넌트도 재실행된다. 
	- 불필요한 경우가 있을 수 있다.
- 특정 상황일 때만 자식 컴포넌트를 업데이트하도록 React에게 지시할 수 있다. 여기서 특정 상황이란 전달된 props 값이 변경된 경우


## React.memo

컴포넌트를 `React.memo`로 감싸주면 기존 props와 새 props를 비교해 props가 변경된 경우에만 해당 컴포넌트를 재실행해서 재평가한다.
-> 부모 컴포넌트가 바뀌어도 props가 변경되지 않았다면 컴포넌트가 재실행되지 않는 것!

```jsx
export default React.memo(Button)
```

**최적화가 가능하다면 왜 모든 컴포넌트에 `React.memo`를 적용하지 않나?**

최적화도 비용이 들기 때문이다. `React.memo`로 컴포넌트를 감싸면 항상 기존 props와 새 props를 비교하게 된다. 따라서 무조건 모든 컴포넌트에서 사용하는 것이 아니라 필요한 곳에 적절히 사용하는 것이 효과적이다. 


## useCallback()

`React.memo` 로 컴포넌트를 감싸도 다시 렌더링되는 경우를 볼 수 있다. 이는 props가 함수인 경우에 발생하는 일이다. 

예를 들어, 부모 -> 자식 컴포넌트로 함수가 전달되는 상황에 부모 컴포넌트가 다시 렌더링될 때 함수와 상수는 매번 재생성 된다. 재생성된 후 `props`로 전달되면 함수는 [[JavaScript-Object|원시값]]이 아니라서 `React.memo`로 props를 비교하는 과정에서 기존 props와 다른 값으로 평가되기 때문이다.

이럴때는 어떻게 해야 하나? **바로 `useCallback`을 사용하면 된다.**

`useCallback`으로 함수를 감싸면 함수를 저장해서 매번 실행시마다 함수를 재생성할 필요 없다고 알려준다. 
```js
const toggleHandler = useCallback(() => {
	setShow((prevShow) => !prevShow)
}, [])
```

두 번째 인자로 의존성 배열을 전달한다. 빈 배열이라면 컴포넌트가 재렌더링되도 해당 함수가 재생성되지 않는다.


**빈 의존성 배열을 사용해 함수를 그대로 사용할 수 있는데 왜 의존성 배열이 필요할까? 다음과 같은 경우를 생각해보자.**

`toggleMenuHandler`라는 함수에 `useCallback()`을 사용해서 해당 함수를 사용하는 컴포넌트가 재렌더링되지 않도록 한다. 그리고 `toggleMemuHandler`는 다른 `enableButton` 상태가 `true`인 경우에만 `showMenu` 상태를 변경할 수 있다. 아래와 같이 코드를 작성하면 제대로 작동하지 않는다. 
```javascript
function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [enableButton, setEnableButton] = useState(false)

  const toggleMenuHandler = useCallback(() => {
    if (enableButton) {
	    setShowMenu((prevShowMenu) => !prevShowMenu)
    }
  }, [])

  const enableButtonHandler = () => {
    setEnableButton(true)  
  }
}
```

`toggleMenuHandler` 함수에 [[JavaScript-Closure|클로저]]가 만들어졌기 때문에 해당 함수 내부의 `enableButton`은 처음 함수가 만들어졌을 때 저장된 그대로의 값이다. 그래서 변경이 되지 않는다. 

이처럼 함수가 재생성되야 할 필요가 있는 경우가 있다. 이때 의존성 배열에 `enableButton`을 넣는다. `enableButton`이 변경되지 않는다면 함수는 재생성되지 않는다.



## `useMemo`

[[2022-04-27]]
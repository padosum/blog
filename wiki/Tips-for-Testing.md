---
title   : Test를 위한 팁 
date    : 2023-07-19 22:58:24 +0900
updated : 2023-07-19 23:19:53 +0900
aliases : ["Test를 위한 팁"]
draft : false
tags: ["Test"]
---

## Vitest, Jest

스크립트를 이용해 테스트를 실행한 후 원하는 파일만 테스트하려면,  
`<kbd>p</kbd>` 키를 누른 뒤 파일명을 입력하면 된다.


### 디버깅

`test.only` 또는 `describe.only`를 사용해 실행되는 테스트 수를 제한할 수 있다.  
```js
describe.only("when user is signed in", () => {
	// ...
})
```

`only`를 사용하면 해당 테스트만 실행된다. 어디서 문제가 발생했는지 원인을 좁히기 좋다.


## testing-library

### get, query, find

요소를 찾는 query 함수는  `get`, `query`, `find`로 시작한다. 무슨 차이일까? 처음 테스트 코드를 작성 하려고 할 때 매우 궁금했다. 

- `get`는 요소가 없는 경우 오류가 발생
- `query`는 없어도 오류가 발생하지 않고 `null`을 반환한다.
- `find`는 [[JavaScript-Promise|promise]]를 반환한다. 그래서 찾지 못하면 `reject`를 반환한다.

따라서 요소가 존재한다는 것을 증명하려면 `getBy` 를 사용한다. 왜냐하면 존재하지 않는 경우에 `getBy`를 사용하면 오류가 나기 때문이다. 존재하지 않는다는 것을 증명하려면 `query`를 사용하고 요소가 나중에 존재한다면 `find`를 사용한다. 여기서 나중이란 말은 data를 fetch한 뒤에 요소를 표시하는 경우를 말한다.


### `screen` 사용하기

`render` 함수의 반환값으로 쿼리를 사용하면 최신 상태로 유지하기 위해 `render` 호출을 또 해야할 수 있다.  
```js
const { getByRole } = render(<Component />)
```

대신 `screen`을 사용하면 현재 화면에서 쿼리를 사용할 수 있다.
```js
render(<Component />)
const input = getByRole('textbox')
```

디버깅도 가능하다. 화면에 표시된 요소를 보여준다.
```js
screen.debug
```

### logTestingPlaygroundURL
요소를 찾으려고 모든 query 함수와 `role` 등을 외우고 있기는 어렵다. 이를 도와주는 기능이 있다!
바로 `screen.logTestingPlaygroundURL` 이다. 사용하면 `URL`이 표시되며 클릭하면 브라우저가 실행된다. 왼쪽엔 HTML 코드가 오른쪽엔 렌더링된 화면이 표시된다. 쿼리를 얻고 싶은 요소를 클릭하면 된다. 클릭이 어렵다면 왼쪽 코드에 `style`을 넣어주자.

![[logTestingPlaygroundURL.png]]


## mocking

- msw
- [[Testing-Redux-Toolkit-Query-with-MSW|MSW로 Redux Toolkit Query 테스트하기]]

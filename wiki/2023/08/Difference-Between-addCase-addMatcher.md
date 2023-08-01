---
title   : Redux toolkit에서 addCase()와 addMatcher()의 차이 
date    : 2023-08-01 22:13:36 +0900
updated : 2023-08-01 22:33:29 +0900
aliases : 
tags    : ["RTK"]
---

## Goal
`addCase`와 `addMatcher`의 차이를 알고 사용한다.


## extraReducer
이름에서 알 수 있듯이 추가적으로 리듀서를 실행할 수 있는 것이다.  
`extraReducer`를 사용해 다른 slice에서 action이 dispatch된 경우 해당 slice의 state를 수정할 수 있다.  

그때 action을 일치하는지 확인하기 위해 `addCase`를 쓰는데, `addMatcher`도 있다. 둘의 차이점이 궁금했는데 대충 훑어보고 넘어갔었다.

우선 `addCase`는 `action.type`이 전달한 문자열과 정확하게 일치하는 경우 reducer를 실행한다.  
다음 코드를 예로 들면 `setAuth` action이 dispatch된 경우 콜백함수로 작성된 리듀서가 실행되는 것이다. 
```js
builder.addCase(setAuth, (state, { payload }) => {
  state.currentProjectId = payload.user.current;
});
```
`addMatcher`는 "특정 조건"에 따라 action을 처리할 수 있다. 조건은 콜백 함수에 의해 결정되는데 `true`, `false`를 반환한다.  

RTK Query로 만든 fetch query action이 fulfilled되었을 때 추가적인 작업을 하기 위해 `addMatcher`를 사용할 수 있었다.  
```ts
  extraReducers(builder) {
    builder.addMatcher(
      usersApi.endpoints.updateCurrent.mat,
      (state, { payload }) => {
        state.data.user.current = payload;
      }
    );
  },
```

fetch query는 `Promise`를 반환하기 때문에 action이 dispatch되면 `fufilled` 또는 `pending` 또는 `reject`가 될 수 있어서 `addMatcher`로 정확한 action을 처리할 수 있는 것이다.  


## addCase에 여러 개의 action을 전달하는 방법

`extraReducer`를 설정할 때 여러 action이 실행된 후 추가적으로 실행하는 reducer가 모두 동일하다면 어떻게 해야할까?

아래 [코드](https://github.com/reduxjs/redux-toolkit/issues/429)와 정확하게 같은 경우 말이다!
```ts
builder
  .addCase(createTodoSuccess, (state, { payload: todo }) => ({
    ...state,
    [todo.id]: todo
  }))
	.addCase(updateTodoSuccess, (state, { payload: todo }) => ({
    ...state,
    [todo.id]: todo
}))
```

나는 4가지 정도가 같은 동작을 하고 있어서 중복 코드가되서 상당히 거슬렸다.  
함수로 분리하고 싶었는데 코드를 작성하진 않았지만 저기 있는 저 `state`가 과연 함수의 파라미터로 전달되면 온전히 작동할지도 의문이었다.  

[redux-toolkit issue](https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810031743)에 방법이 나와있었다.  

`addMatcher`를 사용할 때 `redux-toolkit` API의 Matching Utility 중 `isAnyOf`를 함께 사용할 수 있다!

`isAnyOf`는 `addMatcher`에 전달하는 조건 중 하나 이상이 충족되면 `true`를 반환한다.  
```ts
builder
    .addMatcher(isAnyOf (createTodoSuccess, updateTodoSuccess), (state, { payload: todo }) => ({
      ...state,
      [todo.id]: todo
    }))
```

코드가 깔끔해져서 정말 좋았다.  

## reference
- [https://redux-toolkit.js.org/api/matching-utilities#isanyof](https://redux-toolkit.js.org/api/matching-utilities#isanyof)
- [https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810031743](https://github.com/reduxjs/redux-toolkit/issues/429#issuecomment-810031743)

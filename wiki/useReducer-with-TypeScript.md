---
title   : useReducer를 TypeScript와 사용하기 
date    : 2023-06-21 22:19:15 +0900
updated : 2023-06-21 22:57:13 +0900
aliases : ["useReducer를 TypeScript와 사용하기"]
draft : false
tags : ["TypeScript"]
---

## Goal
`useReducer`에 타입을 설정하는 방법 알아보기


## State Type
```ts
interface GridState {
  grid: string[];
  columns: number;
  rows: number;
}
```
## Action Type

```ts
enum GridSizeActionKind {
  INCREASE_COLUMN = "INCREASE_COLUMN",
  DECREASE_COLUMN = "DECREASE_COLUMN",
  INCREASE_ROW = "INCREASE_ROW",
  DECREASE_ROW = "DECREASE_ROW",
}
```

```ts
type GridSizeAction = {
  type: GridSizeActionKind;
};
```

## reducer

```ts
const gridReducer = (state: GridState, action: GridSizeAction) => {
  switch (action.type) {
    case GridSizeActionKind.INCREASE_COLUMN:
      // ...
    case GridSizeActionKind.DECREASE_COLUMN:
      // ...
    case GridSizeActionKind.INCREASE_ROW:
      // ...
    case GridSizeActionKind.DECREASE_ROW:
      // ...
    default:
      return state;
  }
};
```

여기까진 아무런 문제 없이 괜찮았다. 문제는 `payload`가 있는 action의 경우는 어떻게 구분해야 하는 것이었다.

## Payload가 있는 Action 

찾아보니 Payload가 있는 action과 없는 action을 따로 type을 설정하는 방법이 있었다.
```ts
type GridAction = {
  type: "UPDATE_GRID";
  payload: string[];
};

type GridSizeAction = {
  type: GridSizeActionKind;
};


```

그리고 최종 action type을 union type으로 만들어 전달한다.

```ts
type Actions = GridAction | GridSizeAction;

const gridReducer = (state: GridState, action: Actions) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return {
        ...state,
        grid: action.payload,
      };
    case GridSizeActionKind.INCREASE_COLUMN:
    // ...
  }
}
```


## dispatch
`dispatch`는 만든 Action Type을 `export` 하고 `import` 해서 사용하면 된다. 
```ts
dispatch({
	type: GridSizeActionKind.INCREASE_COLUMN,
})
```


## reference

- [https://www.fabiobiondi.dev/blog/2023-01/how-to-safely-type-usereducer-in-react-and-typescript/](https://www.fabiobiondi.dev/blog/2023-01/how-to-safely-type-usereducer-in-react-and-typescript/)
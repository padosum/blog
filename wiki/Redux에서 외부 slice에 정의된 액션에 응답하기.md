---
title   : Redux에서 외부 slice에 정의된 액션에 응답하기 
date    : 2023-06-21 22:29:36 +0900
updated : 2023-06-21 22:56:52 +0900
aliases : ["Redux에서 외부 slice에 정의된 액션에 응답하기"] 
draft : false
tags : ["Redux", "RTK"]
---

## Goal

RTK를 사용하면서 여러 slice를 사용할 때 특정 slice에서 외부 action에 응답하는 방법 알아보기


---

RTK는 "slice"라는 걸 사용한다. slice는 redux reducer logic과 action을 정의해놓은 것이다. 
그래서 reducer logic에서 해당 slice의 상태 객체에 접근할 수 있다.

Redux 공식 문서에 다음 내용이 있다.
> there are times when a slice reducer needs to respond to _other_ actions that weren't defined as part of this slice's `reducers` field. We can do that using the slice `extraReducers` field instead.


slice reducer가 이 slice의 reducer 필드에 정의되지 않은 다른 동작에 응답해야 하는 경우가 있다고 한다. 처음에 문서를 읽었을 때 무슨 경우인지 감이 잡히지 않았고 그냥 읽어내리기만 했다.

예를 들면 이런 경우다.  
`foodsSlice`와 `sportsSlice`가 있다면 코드는 간략하게 다음과 같을 것이다. 각 slice에서 관리하는 상태 객체는 배열로 되어있다. 
```js
const foodsSlice = createSlice({
  name: "food",
  initialState: [],
  reducers: {
    addFood(state, action) {
      // ...
    },
    removeFood(state, action) {
      // ...
    },
    reset: {
	    return []
    }
  },
});

const sportsSlice = createSlice({
  name: "sports",
  initialState: [],
  reducers: {
    addSports(state, action) {
      // ...
    },
    removeSports(state, action) {
      // ...
    }, 
    reset: {
	    return []
    }
  },
});

export const { addFood, removeFood } = foodsSlice.actions;
export const { addSports, removeSports } = sportsSlice.actions;
```

여기서 어떤 액션을 `dispatch` 해서 두 상태 객체를 모두 빈 배열로 만들고 싶으면 어떻게 해야할까?

내가 바로 떠올린 것은 각 action을 모두 `dispatch` 하는 것이었다.
```js
dispatch(resetFood());
dispatch(resetSports());
```

하나의 로직에서 `dispatch`를 두 번 하다니. 지금은 별로 상관 없지만 냄새가 나는 코드가 될 것 같다는 직감이 들었다. 

이때 공식문서에 나오는 `extraReducers`를 활용할 수 있다.

## extraReducers

`extraReducers` 옵션은 `builder`라는 매개변수를 받는 함수다. 

다음과 같이 `builder.addCase`의 첫 번째 매개변수로 action creator를 전달하면 해당 액션이 `dispatch` 되었을 때 두 번째 매개변수의 reducer도 적용할 수 있다.

따라서 다음 코드를 작성하면 `food/reset` 액션이 `dispatch` 되었을 때 두 번째 매개변수 reducer도 작동한다.
```js
const sportsSlice = createSlice({
  name: "sports",
  initialState: [],
  reducers: {
    addSports(state, action) {
      // ...
    },
    removeSports(state, action) {
      // ...
    }, 
    reset: {
	    return []
    }
  },
  extraReducers(builder) {
	  builder.addCase('food/reset', (state, action) => {
	    return []
	  })
  }
});

```

오타가 있을 수 있기 때문에 다음과 같이 작성하는 것이 좋다.
```js
extraReducers(builder) {
  builder.addCase(foodsSlice.actions.reset, (state, action) => {  
    return []
  })
}
```

하지만 위 방법은 의존성이 생긴다. `foodsSlice` reducer의 이름이 변경되거나 제거되면 `sportsSlice.extraReducers` 옵션에도 에러가 발생할 것이다.

외부에 action을 새로 생성해 개별로 작동하게 하면 된다.
```js
const reset = createAction("app/reset");

// ...
extraReducers(builder) {
    builder.addCase(reset, (state, action) => []);
}
```


## reference

- [https://www.udemy.com/share/101WcY/](https://www.udemy.com/share/101WcY/)
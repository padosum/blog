---
title   : Redux 
date    : 2021-09-24 21:51:02 +0900
updated : 2021-09-24 22:11:25 +0900
aliases : 
tags    : ["React"] 
---
Redux is a predictable state container for JavaScript apps.  
상태 관리 라이브러리 

## Props
- properties의 줄임말 
- 데이터 전달을 위한 임의의 입력이다.
- 위에서 아래로 전달된다. (부모 컴포넌트에서 자식 컴포넌트로)
- 불변 데이터이다. (immutable) 바꾸려면 부모 컴포넌트에서 새로 보내줘야 한다.
```html
<ChatMessage
  messages={messages}
/>
```
## State  
- 컴포넌트 안에서 데이터 전달 (부모에서 자식이 아니라)
- mutable
- State가 변하면 새로 렌더링된다.
- Redux는 이 State를 관리한다.
```javascript
state = {
  message: '',
};
```

## redux  데이터 flow
- strict unidirectional data flow 한 방향으로 흐른다.

### Action
- 무엇이 일어났는지 설명하는 Object

### Reducer
- 이전 State와 Action Object를 받은 후 Next State를 반환한다.

### Store
- 변경된 State가 담긴다. 


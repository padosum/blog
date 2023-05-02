---
title   : React와 Effect 
date    : 2023-05-02 23:16:13 +0900
updated : 2023-05-02 23:34:02 +0900
aliases : ["React와 Effect"]
draft : false
---

## Goal
React에서 Effect가 무엇이고 언제 사용하는지 이해한다.

## React에서 동기화

- React는 정의한 props와 state에 따라 화면에 보여줄 UI를 생성하고, 이를 DOM과 실시간으로 동기화한다. 
- Effect도 같은 방식으로 생각하자. Effect를 사용하면 외부 요인과 컴포넌트의 상태(props & state)를 동기화한다.

## Effect
- Effect를 사용하면  side effect를 지정할 수 있다.
	- side effect?
		- 채팅 서버 연결
		- 타이머 설정
		- 네트워크 요청

### Effect 작성하기
- [`useEffect` hook](https://react.dev/reference/react/useEffect)을 사용한다.
- `useEffect` 콜백 함수 내부에서 사용하는 값은 반드시 의존성 배열에 추가하자! 억지로 린트를 어기지 말자. 


## Effect 특징

- 컴포넌트의 모든 렌더링은 그 고유의 Effect를 가진다.
- Effect 함수 자체가 매 렌더링마다 별도로 존재하는 것.
	- 이벤트 핸들러처럼 특정 렌더링에 속하는 함수라 생각하자.
- 따라서 이펙트는 해당 렌더링 시점의 props와 state를 가지고 있다!
- [React는 브라우저가 페인트하고 난 뒤에 Effect를 실행한다.](https://medium.com/@dan_abramov/this-benchmark-is-indeed-flawed-c3d6b5b6f97f) Effect가 화면 업데이트를 차단하지 않기 때문에 앱 속도가 빨라진다.

## reference
- [react.dev](https://react.dev/learn/synchronizing-with-effects)
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
---
title   : React 프로그래밍 모델 이해하기 
date    : 2023-05-03 22:35:12 +0900
updated : 2023-05-03 23:15:20 +0900
aliases : ["React 프로그래밍 모델 이해하기"]
draft : false
description : false
---

## Goal
[React as a UI Runtime](https://overreacted.io/react-as-a-ui-runtime/)을 읽고 이해한 내용 정리하기


글의 서두에는 "많은 사람들은 이 글에서 다루는 주제들을 알지 못해도 React를 잘 써왔다."고 나와있다. 나 또한 잘은 아니지만 이번에 이 글을 읽으면서 알게된 사실들을 몰라도 사용할 수 있었다. 하지만 누구나 React를 사용하면서 동작 방식에 대해 궁금했을 것이다. 나도 그래서 이 글을 흥미롭게 읽을 수 있었다. 여러 가지 주제에 대한 설명이 나와있다. 또한 더 심도 깊게 공부해볼 수 있는 키워들이 가득했다! 2019년 글이기 때문에 변경된 부분도 많을 것이다. 차차 공부해야겠다.

글 말미에는 "React의 성공은 위 주제들을 몰라도 많은 것을 할 수 있기 때문"이라는 내용이 있었다. 올해 봤던 [React.js: The Documentary](https://www.youtube.com/watch?v=8pDqJVdNa44)가 생각났다. 다큐에서도 React의 성공 요인은 잘 작성된 에러 메시지와 공식문서라고 했다.


## Host Tree
- React는 UI 라이브러리다.
- React 프로그램은 일반적으로 시간이 지남에 따라 변경될 수 있는 트리를 출력한다.
- 이 트리를 '호스트 트리'라고 하는데 React의 일부가 아니라 '호스트 환경'의 일부이기 때문이다.
	- 호스트 환경은 프로그램이 실행되는 환경을 말한다.
	- 호스트 트리에는 자체 API가 있다. (ex, [[DOM]]에서 `appendChild`)


## Host Instances
- 호스트 트리는 노드로 구성된다. 이를 '호스트 인스턴스'라 한다.
	- 호스트 인스턴스
		- 웹 브라우저에서 `window`, `document` 등
		- Node에서 `global`, `process`, `require` 등
- React 앱을 만들 때 호스트 인스턴스를 조작하는 API(`appendChild`, `createElement`) 를 직접 호출하지 않는다. React가 처리한다.

## Renderers
- 렌더러는 React가 특정 호스트 환경과 대화하고 호스트 인스턴스를 관리하도록 가르친다. 

## React Elements
- React elements는 호스트 객체를 그릴 수 있는 [[JavaScript-Object|자바스크립트 객체]]

## Reconciliation
- React에서 [[Virtual-DOM|가상 DOM]]을 사용해 UI를 구성하고 이를 기반으로 변경 사항을 비교해 업데이트 하는 과정을 "Reconciliation"이라고 부른다.
	- React Elements 트리와 호스트 트리를 일치시키기 위해 어떤 작업을 해야하는지 파악하는 프로세스가 "Reconciliation"
- 트리에서 같은 위치에 있는 element type이 이전 렌더링과 다음 렌더링 사이에 "일치"하면 React는 기존 호스트 인스턴스를 사용한다.

## Conditions

앞서 element type이 '일치'할 때만 호스트 인스턴스를 다시 사용한다고 했다. 그러면 조건부 컨텐츠는 어떻게 렌더링할 수 있는걸까? 조건에 따라 컨텐츠가 달라지는데...

JSX 대신 객체로 살펴보는 것이 이해하기 쉽다.
```js
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = {
      type: 'p',
      props: { children: 'I was just added here!' }
    };
  }
  return {
    type: 'dialog',
    props: {
      children: [
        message,
        { type: 'input', props: {} }
      ]
    }
  };
}
```

`showMessage`값에 상관없이 `<input>`은 항상 두 번째 child다. 그래서 위치가 변하지 않는다.

## Lists

element list에서 element의 순서가 변경되면 ? 
```jsx
function ShoppingList({ list }) {
  return (
    <form>
      {list.map(item => (
        <p>
          You bought {item.name}
          <br />
          Enter how many do you want: <input />
        </p>
      ))}
    </form>
  )
}
```
React 입장에서는 순서가 변경되었는지 알 수 없다.
첫 번째 element `<input>`에 값을 입력해 둔 뒤 다른 순서로 정렬이 되면 첫 번째 `<input>`에 해당 값이 그대로 남아 있을 것이다. 
-> React가 list를 구성하는 element에 `key` prop을 요구하는 이유다.

## Inversion of Control

컴포넌트는 함수다.
하지만 개발자가 컴포넌트 함수를 직접 호출하는 대신 React에게 컴포넌트를 알려주면 React가 컴포넌트를 관리하며 ui를 렌더링하고 상호작용에 잘 응답할 수 있게 한다. 이를 'Inversion of Control(제어의 역전)'이라고 한다. 

React가 컴포넌트 호출 제어권을 가지면서 React가 컴포넌트의 상태 및 구조 정보를 제어하고 처리한다 -> 변경사항을 효율적으로 갱신할 수 있다. 직접 하려면 어려울 것.


## Lazy Evaluation

컴포넌트를 함수로 직접 호출한다면 조건부 렌더링을 할 때 불필요한 렌더링이 발생할 수 있다. 

## Consistency

Reconciliation 프로세스는 대규모 컴포넌트 트리를 다시 그리는 작업이므로, 하나의 블로킹 작업으로 수행하면 브라우저 메인 스레드가 차단되서 사용자 인터랙션 등 다른 작업이 지연될 수 있다.

그래서 블로킹 작업을 분할해 논-블록킹 작업으로 처리하고 싶어도 분할 처리가 너무 과도하면 업데이트가 부분적으로 된 화면을 볼 수도 있고, 불필요한 레이아웃 계산이 발생할 수도 있다. 그래서 React는 모든 작업을 "렌더링 단계"와 "커밋 단계"로 나눈다.
[참고](https://react.dev/learn/render-and-commit)


## Call Tree

보통 자바스크립트 함수 호출은 [[스택]]에 쌓여서 함수가 리턴되면 해당 함수의 호출 프레임이 스택에서 제거된다.

그러나 React 컴포넌트는 다르다. 한 컴포넌트가 렌더링될 때 그 컴포넌트 내부에 있는 다른 컴포넌트도 렌더링된다. 이렇게 중첩된 구조가 호출 트리로 비유된다.


## Context

Context는 컴포넌트에 대한 [[JavaScript-Scope|동적 스코프]]라 할 수 있다.


## reference
- [React as a UI Runtime](https://overreacted.io/react-as-a-ui-runtime/)



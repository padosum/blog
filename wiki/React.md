---
title   : React  
date    : 2021-10-04 22:08:12 +0900
updated : 2022-03-02 23:25:12 +0900
aliases : ["리액트"] 
tags    : ["React"]
---
[[User-Interface|UI]]를 만들기 위한 JavaScript 라이브러리  

## 프로젝트 만들기
### create-react-app 
리액트 개발 팀은 자동으로 리액트 프로젝트를 생성해주는 `create-react-app`이라는 [[CLI]]를 만들었다. 개발자가 직접 [[Webpack]], [[Babel]], [[ESLint]] 등 여러 도구를 직접 설정하지 않아도 빠르게 리액트 프로젝트를 시작할 수 있게 만들어준다.  
```bash
$ npx create-react-app my-app
```

### 개발 서버 실행 
```bash
$ npm start
```
### 프로젝트 구조 
- `index.js`은 가장 먼저 실행되는 파일이다.
- `index.html`라는 하나의 html 파일이 사용된다. 
	
## 엘리먼트
엘리먼트는 React 앱의 가장 작은 단위이다. 화면에 표시할 내용을 기술한다.   
브라우저의 [[DOM]] 엘리먼트와 달리 React 엘리먼트는 일반 객체이다. React DOM이 React 엘리먼트와 일치하도록 DOM을 업데이트 한다.   
React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트한다.  

> __경험에 비추어 볼 때 특정 시점에 UI가 어떻게 보일지 고민하는 이런 접근법은 시간의 변화에 따라 UI가 어떻게 변화할지 고민하는 것보다 더 많은 수의 버그를 없앨 수 있습니다.__
💡 문서에 위 내용이 나와있었는데 아직 이해가 잘 되지 않는다. 나중에 다시 읽어봐야겠다.  
- 다시 읽어보니 예전에 내 머릿속엔 어떤 생각이 들었는지 기억 안나지만 지금은 이해가 좀 된다. 
	
## Component
> __모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.__

## JSX
- [[JSX]]

## reference
- [React](https://ko.reactjs.org/docs/getting-started.html)

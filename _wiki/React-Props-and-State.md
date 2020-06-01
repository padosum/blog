---
layout  : wiki
title   : ☄️ Props와 State
summary : 
date    : 2020-05-28 20:28:46 +0900
updated : 2020-05-28 20:29:02 +0900
tag     : React
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}
{: .menu-list .is-marginless}

리액트에서 데이터를 다루기 위해 Props, State, Context를 사용한다.  

# Props(Properties)
- 컴포넌트의 속성(Properties)
- 어떠한 값을 컴포넌트에게 전달해줘야할 때 사용한다.
- 부모 컴포넌트로부터 자식 컴포넌트로 전달되는 데이터 
- 자식 컴포넌트에서는 변경이 불가능하다. 
- JSX 내부에 `{this.props.propsName}`



# State
- 컴포넌트의 상태(State)  
- 한 컴포넌트 안에서 유동적인 데이터를 다룰 때 사용 
- 컴포넌트 안에서 데이터 변경이 가능 
		- state에 값을 직접 넣지 않고  `setState` 사용 
		- 가상 돔을 사용해 변경된 부분만 화면을 갱신하기 위해서 
- JSX 내부에 `{this.state.stateName}`
- 초기값 설정이 필수, 생성자(constructor)에서 `this.state={}`으로 설정


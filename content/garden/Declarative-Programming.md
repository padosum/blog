---
title   : 선언적 프로그래밍
date    : 2021-08-19 23:12:47 +0900
updated : 2021-08-19 23:14:23 +0900
aliases : ["선언적 프로그래밍"]
private : false
hidden  : false
showReferences : true
---
- [[Functional-Programming|함수형 프로그래밍]]은 선언적 프로그래밍이라는 더 넓은 프로그래밍 패러다임의 한 가지  
- 선언적 프로그래밍은 필요한 것을 달성하는 과정 하나하나를 기술하는 것보다 필요한 것이 어떤 것인지 기술하는 데 방점을 두고 애플리케이션의 구조를 세워나가는 프로그래밍 스타일이다.  

## 명령형 프로그래밍과의 비교로 알아보는 선언적 프로그래밍  
- 명령형 프로그래밍으로 어떤 문자열의 공백을 하이픈( `-`)으로 바꾸는 작업을 한다고 하면, (URL로 사용하기 위해) 다음과 같이 코드를 작성할 수 있다.  
```javascript
var string = "This is the midday show with Cheryl Waters"
var urlFriendly = "";

for (var i=0; i<string.length; i++) {
  if (string[i] === " ") {
    urlFriendly += "-";
  } else {
    urlFriendly += string[i]
  }
}

console.log(urlFriendly) 
```
- `for`, `if` 등을 사용하여 코드를 간단히 살펴보면 이 코드가 무얼 위해 동작하는지 알기 쉽지 않다. 주석이 필요하다. 
- 선언적 프로그래밍으로 작성하면 다음과 같다. 
```javascript
const string = "This is the midday show with Cheryl Waters"
const urlFriendly = string.replace(/ /g, "-")

console.log(urlFriendly)
```
- 정규식을 통해 문자열을 변경한다. 모든 공백을 하이픈으로 바꾸는 작업은 `replace` 함수 안에 들어간다. 
- **선언적 프로그래밍의 코드 구문은 어떤 일이 발생해야 하는지 기술을 하고, 실제 작업을 처리하는 내용은 추상화로 아랫단에 감춰진다.** (여기서 아랫단은 `replace` 함수)
- 코드 자체가 어떤 일이 벌어질지 추론하기 더 쉽다.  
- 선언적 프로그래밍은 각각 작은 함수에 그 함수가 하는 일을 잘 설명하는 이름이 붙여져 있고, 함수가 어떻게 구현되었는지는 함수라는 추상화 안에 감춰지는 것  
	- **선언적 프로그래밍은 추론하기 쉬운 애플리케이션이 만들어지며 -> 애플리케이션 규모를 확장하기 용이하다.**  


## 리액트로 알아보는 선언적 프로그래밍  
```javascript
import Home from "../components/Home"

...
...

reunder() {
  return (
	  <Home/>
	)
}
```  
- 리액트는 선언적이다. `Home` 컴포넌트는 렌더링할 DOM을 보여주고, `render()`는 컴포넌트 안 내용 물에 따라 DOM을 렌더링한다. 실제로 DOM이 어떻게 렌더링될지는 추상화로 감춰져있다.  
	- `Home` 컴포넌트를 렌더링하고 싶어하는 명확한 의도를 보여주는 것이다. 
 

## reference 
- Learning React  


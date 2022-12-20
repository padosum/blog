---
title   : JavaScript 클로저 
excerpt : 
date    : 2020-06-03 00:18:47 +0900
updated : 2022-12-20 23:24:06 +0900
tags    : ["JavaScript"]
aliases : ["클로저"]
---


클로저란 도대체 무엇인가...!

> 클로저는 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미한다.[^1]

음... 이해하기 어렵다. 예시를 보면 좋을 것 같다. 그리고 어떻게 외부 변수를 기억하는지 알면 좋겠다.

## 함수가 외부 변수를 기억하다

[[JavaScript-Scope|자바스크립트 엔진은 함수를 어디서 호출했느냐가 아닌 함수를 어디에 정의했는지에 따라 상위 스코프를 결정]] 한다. 이를 렉시컬 스코프라고 한다. 

```javascript
function outter() {
  var text = 'hello world';
  function inner() {	
    console.log(text);
  }
  inner(); 
}
outter();
```

위 코드의 `inner` 함수의 상위 스코프는 `outter` 함수이다. `outter` 함수의 상위 스코프는 전역 이다. 함수의 상위 스코프는 함수를 어디서 호출했는지가 아닌 함수가 정의한 위치에 의해 정적으로 결정되어 변하지 않는다. 

**함수가 정의된 위치와 호출된 위치가 다를 수 있기 때문에 렉시컬 스코프가 가능하려면 상위 스코프를 기억해야 한다. 이것을 위해 함수는 자신의 내부 슬롯 `[[Environment]]`에 자신이 정의된 환경인 상위 스코프의 참조를 저장한다.**

그래서 위 코드의 `inner` 함수는 상위 스코프인 `outter` 함수의 렉시컬 환경을 내부 슬롯 `[[Environment]]`에 저장해서 기억해둔다!


## 클로저 
```javascript
function outter() {
	var text = 'hello world';
	function inner() {
		alert(text);
	}
	return inner;
}
var inner = outter(); // outter() 내부에 return되는 함수가 들어간다. 
inner(); // 외부함수(outter())의 지역변수인 text가 그대로 접근이 가능함 
```

위 코드의 결과에 대해 생각해보자. `outter()` 함수의 실행이 끝났으니 `outter()` 내부의 `text` 변수도 사용할 수 없겠다는 생각이 든다. [[JavaScript-Engine|자바스크립트 엔진]]이 가비지 콜렉터를 사용해서 더는 사용하지 않는 메모리를 해제시키기 때문이다.  

하지만 코드를 실행해보면 `outter()`의 내부 변수인 `text`를 가져와 사용할 수 있다. 
`outter()`의 내부는 여전히 '사용 중'이므로 가비지 콜렉션의 대상이 아니기 때문이다. 그럼 누가 사용하는걸까? 바로 리턴된 `inner` 함수다. **선언된 위치 때문에** `inner` 함수는 계속 `ouuter` 스코프를 참조하고 있다. 그리고 전역 변수인 `inner`에 의해 `inner` 함수가 참조되고 있다. 이 참조를 클로저라 부른다.

### 클로저라는 이름에 대해

클로저를 이해하기 위해 여러 책을 읽고 자료를 찾아봤다. 제일 궁금했던 것은 "그래서 왜 이름이 클로저일까"였다. 
영어가 모국어도 아니니 답답했던 것 같다. 어쩌면 그냥 내 이름이 연정인 것처럼 그냥 클로저도 "클로저"니까 그냥 그렇게 부르면 된다고 쉽게 넘어가면 될 것을 말이다. 어쨌든 사전에 검색해보니 "폐쇄"라는 뜻이었다.

그리고 좀 더 [검색](https://www.reddit.com/r/javascript/comments/9jgcfd/why_is_it_called_a_closure_anyway/) 을 해봤다.  
Peter Landin이라는 컴퓨터 과학자가 만든 용어라고 한다. 
```javascript
function outter() {
	var text = 'hello world';
	function inner() {
		alert(text);
	}
	return inner;
}
var inner = outter();
inner();
```
아까 예시 코드를 다시 가져왔다. 전역 변수 `inner`에 담긴 것은 무엇인가? 함수 자체에 대한 참조와 그 렉시컬 환경(위 코드의 경우에는 `text`라는 변수)이다. 
Landin의 입장에서 함수와 환경이 결합된 용어가 필요했다. 그래서 "폐쇄"라는 용어를 선택한 것이다. 함수와 환경을 함께 포장하고 묶기 때문에. 그리고 클로저가 변수들(여기선 `text`)을 "닫는다"고 말한다.

음... 알랑말랑하다. 아래 private 변수를 만드는 것도 같은 맥락일까? 외부에서 접근할 수 없는 **폐쇄된 변수**이기 때문이다. 이 부분은 시간이 지난 뒤에 다시 읽고 정리해야겠다.

## 클로저 활용 private 변수 만들기  
```javascript
function Account() {
  let money = 0
  return {
    deposit: function(amount) {
      money += amount 
    },
    withdraw: function(amount) {
      money -= amount
    },
    getMoney: function() {
      return money;
    }
  }
}

const fund = Account();
fund.deposit(100); // 100
fund.deposit(100); // 100
console.log(fund.getMoney()); // 200
fund.money = 100000;          // private 변수로 접근할 수 없다. 
fund.money = 4000000;
console.log(fund.getMoney()); // 200
```
`Account` 함수 내부의 `money`라는 변수는 `deposit`, `withdraw`, `getMoney`를 제외하고 직접 접근할 수 있는 방법이 없다. 이처럼 클로저를 활용하여 변수에 직접 접근하지 못하도록 제어할 수 있다. (private 변수로 활용됨)  

외부 상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 [[Functional-Programming|함수형 프로그래밍]]에서 부수 효과를 최대한 억제해 오류를 피하면서 프로그램 안전성을 높이기 위해 클로저는 적극 활용된다.

## 클로저 활용 부분 적용 함수
> 정리 필요...

### 디바운스
[[JavaScript-Debounce-Throttle|디바운스와 스로틀]]


## 클로저 활용 커링 함수 
커링 함수(currying function)는 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 구성한 것이다. 커링은 부분 적용 함수와 비슷하지만 한 번에 하나의 인자만 전달하는 것을 원칙으로 한다. 마지막 인자가 전달되기 전까지 원본 함수가 실행되지 않는다.  

```javascript
var curry3 = function (func) {
  return function (a) {
    return function (b) {
	  return func(a, b);
	};
  };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8)); // 10
console.log(getMaxWith10(25)); // 25
```
인자가 많아질 수록 가독성이 떨어지는 단점이 있다. ES6에서는 [[JavaScript-Arrow-Function|화살표 함수]]를 써서 다음과 같이 한 줄에 표기할 수 있다.  
`var curry 3 = func => a => b => func(a, b);`  
커링 함수는 당장 필요한 정보만 받고 전달하고 또 받고 전달하는 식으로 마지막 인자가 넘어갈 때까지 함수 실행을 미룬다. 이를 [[Functional-Programming|함수형 프로그래밍]]에서는 지연실행이라고 칭한다.   
- [[REST-API|REST API]]에서 `baseUrl`이 고정되고 `path`나 `id`값만 많을 수 있다. 이 상황에서 서버에 요청을 할 때마다 매번 `baseUrl`부터 기입하기 보다는 공통적인 요소는 먼저 기억시켜둔 뒤 `id`만으로 서버 요청을 수행하는 함수를 만들어두면 편하다.  
	- `var getInformation = baseUrl => path => id => fetch(baseUrl + path + '/' + id);`
- 여러 프레임워크나 라이브러리 등에서 커링을 광범위하게 사용하고 있다.
	- ex) Redux의 미들웨어 

## reference
- [생활코딩](https://opentutorials.org/course/743/6544)
- [⟪코어 자바스크립트⟫](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158391720&orderClick=LAG&Kc=)
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)


[^1]: [https://ko.javascript.info/closure](https://ko.javascript.info/closure)
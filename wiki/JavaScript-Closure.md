---
title   : JavaScript 클로저 
excerpt : 
date    : 2020-06-03 00:18:47 +0900
updated : 2021-12-07 13:44:40 +0900
tags    : ["JavaScript"]
aliases : ["클로저"]
---

> 클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상을 말한다.  
> 
> **클로저**는 함수와 함수가 선언된 어휘적 환경의 조합이다. 클로저를 이해하려면 자바스크립트가 어떻게 변수의 유효범위를 지정하는지(Lexical scoping)를 먼저 이해해야 한다.
- 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것 
- 자바스크립트 고유의 개념이 아닌, 함수를 [[JavaScript-First-Class-Object|일급 객체]]로 하는 [[Functional-Programming|함수형 프로그래밍]] 언어에서 사용되는 중요한 특성  

## 함수가 선언된 어휘적 환경 (Lexical Environment)
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
위 코드의 `inner` 함수의 상위 스코프는 `outter` 함수이다. `outter` 함수의 상위 스코프는 전역 이다.  함수의 상위 스코프는 함수를 어디서 호출했는지가 아닌 함수가 정의한 위치에 의해 정적으로 결정되어 변하지 않는다. 

스코프는 [[JavaScript-Execution-Context|실행 컨텍스트]]의 렉시컬 환경이다. [[JavaScript-Scope-Chain|이 렉시컬 환경은 자신의 Outer Lexical Environment Reference를 통해 상위의 렉시컬 환경과 연결된다.]]

**함수가 정의된 위치와 호출된 위치가 다를 수 있기 때문에 렉시컬 스코프가 가능하려면 상위 스코프를 기억해야 한다. 이것을 위해 함수는 자신의 내부 슬롯 `[[Environment]]`에 자신이 정의된 환경인 상위 스코프의 참조를 저장한다.** 즉 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조를 저장한다.  

그래서 위 코드의 `inner` 함수는 상위 스코프인 `outter` 함수의 렉시컬 환경을 내부 슬롯 `[[Environment]]`에 저장해서 기억한다. 


## 클로저 
내부함수는 외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 외부함수의 변수에 접근이 가능하다. 이런 중첩된 함수를 클로저라고 부른다. 
```javascript
function outter() {
	var text = 'hello world';
	return function() {
		alert(text);
	}
}
var inner = outter(); // outter() 내부에 return되는 함수가 들어간다. 
inner(); // 외부함수(outter())의 지역변수인 text가 그대로 접근이 가능함 
```
`outter` 함수의 실행이 종료되면 `outter` 함수의 실행 컨텍스트가 콜 스택에서 제거되지만 렉시컬 환경은 `inner` 함수의 `[[Environment]]` 내부 슬롯에 의해 참조되고 있고, `inner` 함수는 전역 변수인 `inner`에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문이다. 가비지 컬렉터는 누군가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다.  

클로저에 의해 참조되는 상위 스코프의 변수를 **자유 변수(free variable)**라고 부른다. 클로저는 함수가 자유 변수에 대해 닫혀있다.(closed)라는 의미이다. 
## 예제1
```javascript
function factory_movie(title) {
	return {
		get_title : function () {
			return title;
		},
		set_title : function(_title) {
			title = _title;
		}
	}
}
var ghost = factory_movie('Ghost in the shell');
var matrix = factory_movie('Matrix');

console.log(ghost.get_title());	    // 'Ghost in the shell
console.log(matrix.get_title());	// 'Matrix'
ghost.set_title('공각기동대')
console.log(ghost.get_title());	    //	'공각기동대'
```
- 똑같은 외부함수로 만들어진 ghost, matrix의 get_title의 결과가 다른 것은 외부함수가 실행될 때마다 새로운 지역변수를 포함하는 클로저가 생성되기 때문이다.
- 자바스크립트는 기본적으로 private 속성을 지원하지 않는데 클로저의 이러한 특성을 이용해 private 속성을 사용할 수 있게 된다.  

## 예제2
```javascript
var arr = []
for (var i = 0; i < 5; i++) {
	arr[i] = function() {
		return i;
	}
}
for(var index in arr) {
	console.log(arr[index]()); // 5만 다섯번 
}
```
`for` 문의 `var i`는 함수 레벨 스코프를 갖는 전역 변수라 함수를 호출하면 함수의 상위 스코프인 전역 스코프의 전역 변수 `i`를 호출한다. `i`는 `for`로 반복되어 `5`가 출력이 된다.  
```javascript
var arr = []
for (var i = 0; i < 5; i++) {
	arr[i] = function(id) {
		return function() {
			return id;
		}
	}(i);
}
for(var index in arr) {
	console.log(arr[index]());
}
```
즉시 실행 함수를 사용하면 전역 변수 `i`에 현재 할당된 값을 인수로 받아 매개변수(`id`)에 할당하고 중첩 함수를 반환한다.  
```javascript
// let 사용하기
const arr = [];
for (let i = 0; i < 5; i++) {
  arr[i] = function () { return i; };
}

for(let index in arr) {
  console.log(arr[index]());
}

```

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
부분 적용 함수(partially applied function), n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨서 기억시킨 뒤에 나중에 (n-m)개의 인자를 넘기면 원래 함수의 실행 결과를 얻을 수 있는 함수이다.
`this`를 바인딩해야 하는 점을 제외하면 [[JavaScript-this|bind 메서드]]와 실행 결과가 같다. 하지만 `this`의 값에 상관없이 사용하는 부분 적용 함수를 클로저를 통해 구현이 가능하다.  

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

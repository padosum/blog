---
title   : JavaScript 스코프 
excerpt : 자바스크립트의 유효범위
date    : 2020-02-01 23:59:39 +0900
updated : 2022-12-15 22:26:45 +0900
tags: ["JavaScript"]
aliases: ["스코프"]
---
## 스코프란? 
스코프(scope), 유효범위  
- 예) 함수의 매개변수는 함수 몸체 내부에서만 참조할 수 있다. → 함수의 매개변수를 참조할 수 있는 유효범위가 함수 몸체 내부다.    

### 스코프가 왜 필요한가...

프로그래밍을할 때 변수를 저장하거나 저장된 변수의 값을 가져다 쓴다. 그런데 이 변수는 어디에 저장되어 있는지, 또 어떻게 찾아 사용할 수 있는지? 이런 것들을 정해놓은 규칙이 스코프다. 규칙을 잘 정해놔야 규칙대로 사용할 수 있기 때문이다.

모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)는 선언된 위치에 의해 자신이 유효한 범위, 스코프가 결정이 된다. 

```javascript
var vscope = 'global';
function fscope() {
	var vscope = 'local'
	console.log(vscope); // local 
}
fscope(); 

console.log(vscope); // global 
```
- 자바스크립트 엔진은 이름이 같은 두 변수 중 어떤 변수를 참조해야할지 결정한다. → 식별자 결정 
  - 위 코드에서 `vscope` 는 이름은 동일하지만 스코프가 다른 별개의 변수다.
  - 스코프 개념이 없다면 같은 이름을 가진 변수를 여러개 사용할 수 없다. 
    - 예) 컴퓨터에 있는 파일 이름이 중복된다면 식별하는 방법은 그 파일의 위치(디렉터리)이다. 
    - 스코프는 [네임스페이스](https://ko.wikipedia.org/wiki/%EC%9D%B4%EB%A6%84%EA%B3%B5%EA%B0%84)
- 자바스크립트 엔진은 코드를 실행할 때 코드의 문맥(context)를 고려한다. 
  - "코드가 어디서 실행되며 주변에 어떤 코드가 있는지"를 렉시컬 환경(lexical environment)라고 부르며 코드의 문맥(context)은 렉시컬 환경으로 이루어진다. 이를 구현한 것이 **[[JavaScript-Execution-Context|실행 컨텍스트]]**이다. 

### 스코프의 종류 
#### 전역(global)
코드의 가장 바깥 영역 
```javascript
var vscope = 'global';
function fscope() {
	console.log(vscope); // global
}
fscope(); 
```
**전역 변수는 어디서든 참조** 가능하다. 

#### 지역(local)
함수 몸체 내부 
```javascript
var vscope = 'global';
function fscope() {
	var vscope = 'local'
	console.log(vscope); // local 
}
fscope(); 
		```
지역이란 함수 몸체 내부를 의미한다. 지역 변수는 자신의 지역 스코프와 하위 지역 스코프(중첩 함수)에서 유효하다. 

#### 전역변수는 문제점이 있다.
- 전역변수는 어디서든 참조하고 할당할 수 있어서 코드의 가독성을 해친다.  
의도치 않게 값이 변경될 수 있는 위험성이 높아진다.  
- 전역변수는 지역변수보다 생명 주기가 길다. **상태를 변경할 수 있는 시간과 기회가 많아**져 **의도치 않게 값이 변경되는 문제**가 생길 수 있고, **메모리 리소스도 긴 기간을 소비**하게 된다. 
- 일반적으로 함수가 종료하면 함수가 생성한 스코프도 소멸하게 되는데 [[JavaScript-Closure|누군가 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존하게 된다.]]  
- 전역 변수는 [[JavaScript-Scope-Chain|스코프 체인]]상 종점에 존재해서 변수 검색 속도가 가장 느리다. 파일이 분리되어있다고 해도 마찬가지다. 하나의 전역 스코프를 공유하게 되니 동일한 이름으로 명명된 전역변수 또는 함수가 있을 경우 문제가 생길 가능성이 높다.  

💡 결론적으로 **지역변수를 우선으로 사용하고 전역변수는 사용해야 하는 이유가 분명하지 않은 경우 사용하지 않는 것이 좋다.** 

사용해 본 적이 없다. 사용했다면 실수지 않을까...앞으로도 사용할 일은 없지 않을까? 그래도 혹시 모른다!! 전역변수를 사용해야 할 경우에 어떻게 할지 알아보자.

#### 전역변수를 꼭 사용해야한다면
##### 객체 하나를 전역변수로 만들고 객체의 속성으로 변수를 관리하는 방법
```javascript
MYAPP = {}
MYAPP.calculator = {
	'left' : null,
	'right' : null
}
MYAPP.coordinate = {
	'left' : null,
	'right' : null
}

MYAPP.calculator.left = 10;
MYAPP.calculator.right = 20;
function sum() {
	return MYAPP.calculator.left + MYAPP.calculator.right;
}

document.write(sum());
```

전역변수 사용 없이 하려면 익명함수를 호출하면 된다.   
```javascript
(function() {
	MYAPP = {}
	MYAPP.calculator = {
		'left' : null,
		'right' : null
	}
	MYAPP.coordinate = {
		'left' : null,
		'right' : null
	}

	MYAPP.calculator.left = 10;
	MYAPP.calculator.right = 20;
	function sum() {
		return MYAPP.calculator.left + MYAPP.calculator.right;
	}

	document.write(sum());
}())
```

##### 클로저를 이용한 모듈 패턴 
[[JavaScript-Closure|클로저]]

###### ES6 모듈
[[JavaScript-Module|JavaScript Module]]
- ES6 모듈을 사용하면 전역 변수를 사용할 수 없다. 파일 자체의 독자적인 모듈 스코프를 제공한다. `var` 키워드로 선언한 변수는 전역 변수가 아니며 `window` 객체의 프로퍼티도 아니다. 
- 구형 브라우저에서는 동작하지 않기에 아직까지는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적 

## 스코프 체인
[[JavaScript-Scope-Chain|스코프 체인]]

## 유효범위의 대상
### 함수 레벨 스코프 
- **자바스크립트에서 유효범위는 함수에 대해서만 제공**된다.  
  - 함수안에서 선언된 변수만이 지역변수다.
  - 다른 언어들과의 차이점이다. 다른 언어들은 블록(`{}`) 안에서 유효범위가 제공된다.  

```javascript
for(var i = 0; i < 10; i++) {
	var test = 'Test!!!';
}
alert(test); // test는 지역변수가 아니다.
```

- ES6에서 도입된 `let`과 `const` 키워드는 [[JavaScript-Block-Level-Scope|블록 레벨 스코프]]를 지원한다. 

### 렉시컬 스코프
스코프는 두 가지 방식으로 작동을 한다. 
- **Lexical Scope(정적 스코프)**
- **Dynamic Scope(동적 스코프)**


렉시컬 스코프가 일반적이고 다수의 프로그래밍 언어가 사용하는 방식이다.
(lexical scope, lexical scoping, static scope, static scoping, 정적 유효범위...)


렉시컬 스코프의 이름의 의미는 [책](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788968488528&orderClick=LAG&Kc=) 을 통해 알 수 있게 되었다!  

언어의 컴파일러는 첫 단계를 전통적으로 [[브라우저의-렌더링-과정|토크나이징/렉싱]]이라 불리는 작업으로 시작한다. 렉싱 처리 과정에서 소스 코드의 문자열을 분석해 결과로 생성된 토큰에 의미를 부여한다.[^1]

렉시컬 스코프는 코드가 실행될 때가 아닌, 프로그래머가 코드를 짤 때 변수와 스코프 블록을 어디서 작성하는가에 기초해서 렉서가 코드를 처리할 때 확정된다.

```javascript
var i = 5;

function a() {
  var i = 10;
  b();
}

function b() {
  document.write(i);  // 5다. 10이 아니다!
}
```
렉시컬 스코프로 작동하기 때문에 함수는 선언된 시점에서 유효범위를 갖는다.

**함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다. 함수의 상위 스코프는 언제나 자신이 정의된 스코프이다.** 

함수 객체는 상위 스코프를 기억한다. 
- 함수 객체와 함수의 변수가 해석되는 유효범위(변수 바인딩의 집합)를 아울러 컴퓨터 과학 문헌에서는 [[JavaScript-Closure|클로저]]라고 일컫는다. 
	- 함수의 변수가 [[JavaScript-Scope-Chain|스코프 체인]]에 바인딩되어 있고, 따라서 그 함수는 함수의 변수에 "따라 닫힌다."는 뜻에서 유래한 용어 

### 블록 레벨 스코프
[[JavaScript-Block-Level-Scope|블록 레벨 스코프]]

## reference 
- [⟪모던 자바스크립트 Deep Dive⟫](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [⟪코어 자바스크립트⟫](https://search.kyobobook.co.kr/web/search?vPstrKeyWord=%25EC%25BD%2594%25EC%2596%25B4%2520%25EC%259E%2590%25EB%25B0%2594%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25BD%25ED%258A%25B8&orderClick=LAG)
- [생활코딩](https://opentutorials.org/course/743/6544)
- [⟪JavaScript: The Definitive Guide⟫](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788966261796)
- [⟪You Don't Know JS: 타입과 문법, 스코프와 클로저⟫](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788968488528&orderClick=LAG&Kc=)


[^1]: 이일웅, 최병현 역, 카일 심슨 저, 《You Don't Know JS: 타입과 문법, 스코프와 클로저》, 한빛미디어, 2017년, 206 ~ 207쪽
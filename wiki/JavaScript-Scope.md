---
title   : JavaScript 스코프 
excerpt : 자바스크립트의 유효범위
date    : 2020-02-01 23:59:39 +0900
updated : 2021-09-15 20:27:46 +0900
tags: ["JavaScript"]
aliases: ["스코프"]
---
## 스코프란? 
스코프(scope), 유효범위  
- 예) 함수의 매개변수는 함수 몸체 내부에서만 참조할 수 있다. → 함수의 매개변수를 참조할 수 있는 유효범위가 함수 몸체 내부다.    


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
  - "코드가 어디서 실행되며 주변에 어떤 코드가 있는지"를 렉시컬 환경(lexical environment)라고 부르며 코드의 문맥(context)는 렉시컬 환경으로 이루어진다. 이를 구현한 것이 **실행 컨텍스트(execution context)**이다. 

### 스코프의 종류 
- 전역(global)
  - 코드의 가장 바깥 영역 
		```javascript
		// 전역변수 
		var vscope = 'global';
		function fscope() {
			console.log(vscope); // global
		}
		fscope(); 
		```
	- **전역 변수는 어디서든 참조** 가능하다. 
- 지역(local)
  - 함수 몸체 내부 
		```javascript
		// 지역변수 
		var vscope = 'global';
		function fscope() {
			var vscope = 'local'
			console.log(vscope); // local 
		}
		fscope(); 
		```
	- 지역이란 함수 몸체 내부를 의미한다. 지역 변수는 자신의 지역 스코프와 하위 지역 스코프(중첩 함수)에서 유효하다. 

#### 전역변수의 문제점 
지역변수의 생명 주기는 함수의 생명 주기와 일치한다. 함수가 호출되어 실행되는 동안에만 유효하다. → 자신이 등록된 스코프가 소멸(메모리 해제)될 때까지 유효한 것 
- 일반적으로 함수가 종료하면 함수가 생성한 스코프도 소멸하게 되는데 [[JavaScript-Closure|누군가 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존하게 된다.]]

전역변수는 함수와 달리 명시적 호출 없이 코드가 로드되자마자 곧바로 해석되고 실행된다. 
- `var` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다.  
	- [[JavaScript-Built-in-Objects#전역 객체]] 참고 
- **전역 객체는 웹페이지를 닫기 전까지 유효하다.** 

**지역변수를 우선으로 사용하고 전역변수는 사용해야 하는 이유가 분명하지 않은 경우 사용하지 않는 것이 좋다.** 

#### 전역변수를 불가피하게 사용해야 한다면?
1. 객체 하나를 전역변수로 만들고 객체의 속성으로 변수를 관리하는 방법을 사용한다.  
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
2. 전역변수 사용 없이 하려면 익명함수를 호출하면 된다.   
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
3. [[JavaScript-Closure|클로저]]를 이용한 모듈 패턴 
4. ES6 모듈
- ES6 모듈을 사용하면 전역 변수를 사용할 수 없다. 파일 자체의 독자적인 모듈 스코프를 제공한다. `var` 키워드로 선언한 변수는 전역 변수가 아니며 `window` 객체의 프로퍼티도 아니다. 
	- 구형 브라우저에서는 동작하지 않기에 아직까지는 Webpack 등의 모듈 번들러를 사용하는 것이 일반적 

## 스코프 체인
[[JavaScript-Scope-Chain|스코프 체인]]

## 유효범위의 대상
### 함수 레벨 스코프 
- **자바스크립트에서 유효범위는 함수에 대해서만 제공**된다.  
  - 다른 언어들과의 차이점이다. 다른 언어들은 블록(`{}`) 안에서 유효범위가 제공된다.  
  - 함수안에서 선언된 변수만이 지역변수가 되는 것  
    ```javascript
    for(var i = 0; i < 10; i++) {
        var test = 'Test!!!';
    }
    alert(test);
    ```
    - **여기서 `test`는 지역변수가 아니다.**   
- ES6에서 도입된 `let`과 `const` 키워드는 [[JavaScript-Block-Level-Scope|블록 레벨 스코프]]를 지원한다. 

### 렉시컬 스코프
lexical scope, lexical scoping, static scope, static scoping, 정적 유효범위... 
```javascript
var i = 5;

function a() {
    var i = 10;
    b();
}

function b() {
    document.write(i);  // 5 
}
```
- 함수가 선언된 시점에서 유효범위를 갖는데 이것을 정적 유효범위(static scoping)라고 부른다.  
- **함수가 호출된 위치는 상위 스코프 결정에 어떠한 영향도 주지 않는다. 함수의 상위 스코프는 언제나 자신이 정의된 스코프이다.** 
- 함수 정의가 실행되어 생성된 함수 객체는 결정된 상위 스코프를 기억한다. 
  - 함수 객체와 함수의 변수가 해석되는 유효범위(변수 바인딩의 집합)를 아울러 컴퓨터 과학 문헌에서는 [[JavaScript-Closure|클로저]]라고 일컫는다. 
	- 함수의 변수가 [[JavaScript-Scope-Chain|스코프 체인]]에 바인딩되어 있고, 따라서 그 함수는 함수의 변수에 "따라 닫힌다."는 뜻에서 유래한 용어 

## reference 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [코어 자바스크립트](https://search.kyobobook.co.kr/web/search?vPstrKeyWord=%25EC%25BD%2594%25EC%2596%25B4%2520%25EC%259E%2590%25EB%25B0%2594%25EC%258A%25A4%25ED%2581%25AC%25EB%25A6%25BD%25ED%258A%25B8&orderClick=LAG)
- [생활코딩](https://opentutorials.org/course/743/6544)
- [JavaScript: The Definitive Guide](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788966261796)

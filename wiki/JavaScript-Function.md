---
title   : JavaScript 함수
date    : 2021-05-14 16:40:07 +0900
updated : 2021-09-15 15:34:33 +0900
aliases : ["JavaScript 함수"]
tags: ["JavaScript"]
---
## 함수란 무엇인가?  
- 수학에서의 함수 
  - 입력을 받아 출력을 내보내는 일련의 과정을 정의한 것 
  - `f(x,y) = x + y`라는 함수에서 2개의 입력(2, 5)을 전달하면 7을 출력
- 프로그래밍 언어에서 함수 
	```javascript
	// 함수 정의하기 
	function add(x, y) { // x와 y는 매개변수(parameter)
			return x + y; // x + y는 반환값 
	}

	// 함수 호출하기 
	add(2, 5); // 2와 5는 인수(argument)
	```
	- 일련의 과정을 문(statement)로 구현하고 코드 블록으로 감싸 하나의 실행 단위로 정의한 것  
	- 수학의 함수처럼 입력을 받아 출력을 내보낸다. 
	- **코드의 재사용성**을 높여줌 
	- 함수는 값이며, **함수 정의**를 통해 생성한다. 

### 번외
- 서양권에선 function 기능, 작용
- 동양권에서 상자 함 函  
	- 중국어 음역, 펑션 → 함수라는 주장도 있음 
	- 본질적인 의미를 반영했다고 보는 의견이 있다. 상자에 넣은 값에 따라 다른 결과가 출력되는 것 


## 함수는 왜 사용하나?  
- 필요할 때 여러 번 호출이 가능하다. 
- 함수가 없다면 코드가 길어지고 수정해야할 때 힘들어진다. 
- 반복적으로 실행되어야 할 로직이 여러 맥락 속에서 사용 가능해진다.
- 유지보수가 용이, 가독성이 좋아진다. 
	- 함수는 객체 타입의 값이라 이름을 붙일 수 있다. 함수의 역할을 잘 설명하는 이름을 붙여야 코드의 가독성을 높일 수 있다. 가독성이 좋은 코드가 좋은 코드다.  

## 함수 리터럴 
- 함수는 객체 타입이기 때문에 객체를 [[JavaScript-Object-Literal|객체 리터럴]]로 생성하듯이 함수도 함수 리터럴로 생성할 수 있다.  
- 리터럴은 값을 생성하기 위한 표기법이기에 함수 리터럴도 평가되어 값을 생성한다. 그 값은 객체이다.  
- **일반 객체는 호출할 수 없지만 함수는 호출이 가능하다.**  

```javascript
let f = function add(x, y) {
    return x + y; 
}
```

## 함수 정의하기  

### 함수 선언문
- 함수 선언문은 함수 리터럴과 형태가 동일하다. 하지만 **함수 선언문은 함수 이름을 생략할 수 없다.** 
- 표현식이 아닌 문이다. 함수 선언문을 실행하면 `undefined`가 출력된다. 표현식이라면 표현식이 평가되어 생성된 함수가 출력되어야 한다.   
	- 표현식이 아니어서 변수에 할당할 수 없지만 할당되는 것처럼 보인다.
	- [[JavaScript-Engine|자바스크립트 엔진]]이 코드의 문맥에 따라 동일한 함수 리터럴을 표현식이 아닌 문인 함수 선언문으로 해석하는 경우와 표현식인 문인 함수 리터럴 표현식으로 해석하는 경우가 있기 때문이다.  
  ```javascript
  function foo() {
    console.log('foo');
  }
	foo(); // foo 
	```
- `foo`는 함수 몸체 내부에서만 유효한 식별자인 함수 이름이지만, 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고 거기에 함수 객체를 할당한다. 
- **함수는 함수 이름으로 호출하는 것이 아닌, 함수 객체를 가리키는 식별자로 호출하는 것이다.**  	
	- 선언문으로 생성한 함수를 호출한 것은 함수 이름 `foo`가 아닌 자바스크립트 엔진이 암묵적으로 생성한 식별자 `foo`인 것이다.  → 함수 표현식으로 변환해서 함수 객체를 생상하는 것 
- 함수 이름은 단순히 함수를 가리키는 포인터일 뿐이다. 
	- 오버로딩이 없다. 덮어쓰기 때문에 
		```javascript
		var addSomeNumber = function (num) {
				return num + 100;
		};

		addSomeNumber = function (num) {
				return num + 200; 
		}

		console.log(addSomeNumber(100)); // 300 
		```

### 함수 표현식
**[[JavaScript-First-Class-Object|일급 객체]]**: 값의 성질을 갖는 객체. 값처럼 변수에 할당할 수 있고 프로퍼티 값이 될 수 있으며 배열의 요소가 될 수도 있다.  
- **함수는 일급객체**이므로 변수에 할당할 수 있다. 이러한 정의 방식을 **함수 표현식**이라고 한다.
```javascript
// 익명 함수 
let add = function(x, y) {
    return x + y;
}

console.log(add(2, 5)); // 7

// 기명 함수 표현식
let add = function foo(x, y) {
    return x + y;
}
console.log(add(2, 5)); // 7

console.log(foo(2, 5)); // ReferenceError
// 함수 이름은 함수 몸체 내에서만 유효한 식별자. 
```  
- 앞서 나온 내용처럼 자바스크립트 엔진이 함수 선언문의 함수 이름으로 식별자를 암묵적으로 생성한다. 함수 표현식과 유사하게 동작하는 것처럼 보이지만, 동일하게 동작하는 것은 아니다. 함수 선언문은 표현식이 아닌 문이고, 함수 표현식은 표현식인 문이다. 

### 호이스팅  
```javascript
// 함수 참조 
console.dir(add); // f add(x, y)
console.dir(sub); // undefined

// 함수 호출 
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function 

// 함수 선언문 
function add(x, y) {
    return x + y;
}

// 함수 표현식
var sub = function(x, y) {
    return x - y; 
}
```
- 함수 선언문으로 정의한 함수는 선언문 이전에 호출이 가능하다. 
    - **함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점이 다르다!**
- 자바스크립트 엔진이 소스코드를 한 줄씩 실행하기에 앞서 소스코드 평가 과정을 거칠 때 **모든 선언문(변수, 함수 등)을 소스코드에서 찾아서 먼저 실행**한다. 그 평가 과정을 거친 후 변수 선언을 포함한 모든 선언문을 제외하고 소스코드를 한 줄씩 실행한다. 
- 변수 호이스팅과의 차이 
    -  변수는 `undefined`로 초기화되고 함수 선언문을 통해 생성된 식별자는 함수 객체로 초기화된다.  
- 변수 할당문의 값은 할당문이 실행되는 시점, 런타임에 평가되므로 함수 표현식의 함수 리터럴도 할당문이 실행되는 시점에 평가되어 함수 객체가 된다.  
    - 함수 표현식은 함수 호이스팅이 아닌, 변수 호이스팅이 발생하는 것! 
- 더글라스 크락포드는 함수 호이스팅은 함수를 호출하기 전 반드시 함수를 선언해야한다는 당연한 규칙을 무시하기에 함수 표현식 사용을 권장한다.  

### Function 생성자 함수
- 자바스크립트가 기본 제공하는 빌트인 함수 `Function` [[JavaScript-Constructor-Function|생성자 함수]]에 매개변수 목록과 함수 몸체를 문자열로 전달   
	```javascript
	var add = new Function('x', 'y', 'return x + y');
	console.log(add(2, 5)); // 7
	```
- Function 생성자 함수로 함수를 생성하는 방식은 일반적이지 않고 바람직 하지 않다. 일반적인 함수 생성 방법으로 생성한 함수와 다르게 동작하기 때문이다. ([[JavaScript-Closure|클로저]]를 생성하지 않는다.)

### [[JavaScript-Arrow-Function|화살표 함수]]
- ES6에서 도입된 방식이다. 
- function 키워드 대신 화살표 `=>`를 사용해 간략한 방식으로 함수를 생성한다. 
- 항상 익명 함수로 정의한다.  
	```javascript
	const add = (x, y) => x + y;
	console.log(add(2, 5)); // 7
	```
- 함수 선언문, 함수 표현식을 완전하게 대체하기 위해 디자인된 것은 아니고 동작 또한 간략화되어 있다.  

## 함수 호출하기 
### 매개변수와 인수  

```javascript
function add(x, y) {
    console.log(arguments); // Arguments(3) [2, 5, 10, ....]
	
	return x + y;
}

add(2, 5, 10);
```
- 값 자체는 인자(`2, 5, 10`), `x`와 `y`는 매개변수 
- 매개변수는 함수 몸체 내부에서만 참조 가능하고 함수 몸체 외부에서는 참조할 수 없다. 매개변수의 [[JavaScript-Scope|스코프]](유효 범위)는 함수 내부인 것  
- 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않는다. 에러가 발생하지 않는 것.
	- 인수가 할당되지 않은 매개변수의 값은 `undefined`
	- 만약 인수가 초과로 전달되면 초과된 인수는 무시 → arguments 프로퍼티에 보관된다. 
- [[JavaScript-First-Class-Object]]] 참고 

### 인수 확인하기 
- 적절한 인수가 전달되었는지 확인할 필요가 있을 때,
	- `if`문을 사용해 `typeof`로 확인하기 
	- [[TypeScript]]를 도입하거나 
	- `arguments` 객체를 통해 인수 개수 확인하기 
	- ES6에 도입된 매개변수 기본값으로 인수를 전달하지 않았을 경우와 `undefined`를 전달한 경우 처리하기
		```javascript
		function add(a = 0, b = 0, c = 0) {
				return a + b + c;
		}

		console.log(add(1, 2, 3)); // 6
		console.log(add(1, 2)); // 3 
		console.log(add()); // 0
		```

### 매개변수의 최대 개수 ?? 
- ECMAScript에서 매개변수의 최대 개수에 대해선 명시적으로 제한하고 있지 않지만 물리적 한계는 있다. 
- **매개변수가 많아지면 함수 호출시 전달해야 할 인수의 순서를 고려해야 한다.** 
	- 유지보수를 위해 
- 이상적인 매개변수 개수는 0개. 적을 수록 좋다. 
	- **이상적인 함수는 한 가지 일만 해야 하고 가급적 작게 만들어야 한다.** 
		- 📖  [[Clean Code]]
- 매개변수가 3개 이상 넘지 않는 것을 권장. 그 이상이 필요하다면 객체를 인수로 전달하는 것이 유리하다.  

### 객체 인수 전달시 부수 효과  
함수를 호출하며 매개변수에 값을 전달하는 방식은 값에 의한 전달, 참조에 의한 전달 방식을 그대로 따른다. 
[[JavaScript-Object]] 참고  
```javascript
function addTen(num) {
    num += 10;
	return num; 
}

var count = 20;
var result = addTen(count);
console.log(count); // 20, 변화 없음
console.log(result); // 30 


function setName(obj) {
    obj.name = "Nicolas";
	obj = new Object(); // 이 객체는 함수 실행 종료 후 파괴된다. 
	obj.name = "Greg";
}

var person = new Object();
setName(person);
console.log(person.name); // "Nicolas"
```
- **매개변수는 결국 값으로만 전달되는 것**. 
- 객체 타입 인수는 참조 값이 복사되어 원본 객체가 변경되는 **부수 효과**가 발생된다.  
- **외부 상태를 변경하면 상태 변화를 추적하기 어려워지기에 가독성을 해친다.**
- 객체의 변경을 추적하려면 [옵저버 패턴](https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4)을 통한 대응이나, 문제 해결 방법으로 객체를 불변 객체로 만든다. 객체의 복사본을 새롭게 생성하는 비용은 드나 원시 값처럼 변경 불가능한 값으로 동작하게 만드는 것이다.   
	- 깊은 복사를 통해 새로운 객체를 생성하고 재할당을 통해 교체 → 부수효과를 없앨 수 있다. 
- 외부 상태를 변경치 않고 의존도 하지 않는 함수를 순수 함수라고 한다. 순수 함수를 통해 부수 효과를 억제하며 오류를 피하고 프로그래밍 안전성을 높이는 프로그래밍 [[Paradigm|패러다임]]을 [[Functional-Programming|함수형 프로그래밍]]이라고 한다.

### 반환문 
- `return` 키워드와 표현식으로 이뤄진 반환문으로 실행 결과를 함수 외부로 내보낼 수 있다.  
- `return` 뒤에 반환값으로 사용할 표현식을 명시적으로 지정하지 않으면 `undefined`를 반환


## 다양한 형태의 함수  

### 즉시 실행 함수 
함수 정의와 동시에 호출되는 함수, 다시 호출할 수 없다.
```javascript
(function() {
    let a = 3;
	let b = 4;
	
	return a + b; 
}());
```  
- 이름 없는 익명 함수를 사용하는 것이 일반적이다. 기명으로 해도 연산자 `(...)` 내의 기명 함수는 선언문이 아닌 함수 리터럴로 평가되어 함수 객체가 생성되고, 함수 이름은 함수 몸체에서만 접근가능하므로 다시 호출할 수 없다. 
- 일반적인 함수처럼 값을 반환할 수도 있고 인수 전달도 가능하다.

### 재귀 함수  
함수가 자기 자신을 호출하는 것.  반복되는 처리를 위해 사용한다. 무한 재귀 호출을 하기에 **탈출 조건**을 잘 작성하는 것이 중요하다.  

### 중첩 함수 
함수 내부에 정의된 함수, 일반적으로 자신을 포함하는 외부 함수를 돕는 헬퍼 함수 역할을 한다.  
```javascript
function outer() {
  var x = 1;
	// 중첩 함수
	function inner() {
	  var y = 2;
		// 외부 함수의 변수를 참조
		console.log(x + y); // 3 
	}
	inner();
}
outer(); 
```
[[JavaScript-Closure|클로저]]와 깊은 관련이 있다.

### 콜백 함수  
함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수를 콜백 함수(callback function)라고 한다. 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수를 고차 함수(Higher-Order Function)라고 한다.  
콜백 함수는 [[Functional-Programming|함수형 프로그래밍]], 비동기 처리에 활용되는 중요한 패턴이다.   
[[Higher-Order-Function]] 참고  

### 순수 함수와 비순수 함수
- [[Functional-Programming|함수형 프로그래밍]]

## reference
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [생활코딩](https://opentutorials.org/course/3085/18851)



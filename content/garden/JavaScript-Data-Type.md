---
title   : JavaScript Data Type 
date    : 2021-05-02 12:19:19 +0900
updated : 2021-09-15 17:15:14 +0900
aliases : ["데이터 타입"]
tags: ["JavaScript"]
---
데이터 타입(Data type)은 값의 종류이다. 자바스크립트의 모든 값은 데이터 타입을 갖는다. 자바스크립트 코드는 의도적이든, 의도적이지 않든 [[JavaScript-Type-Casting|타입 캐스팅]]이 일어나는 일이 많으므로 타입에 대해 확실하게 인지하고 사용하는 것이 중요하다.
- **원시타입** 
	- 숫자
	- 문자열 
	- 불리언 
	- undefined
	- null
	- [[JavaScript-Symbol|Symbol]] (ES6부터 추가되었음)
- **객체타입**  
---
값의 타입은 `typeof`연산자를 통해 알 수 있다. 

## 숫자 타입
- 정수 값과 실수 값을 구분하지 않는다. 정수로 표시된다해도 사실은 실수 → 모든 숫자를 실수로 표현 

### 숫자의 범위  
- 메모리 제한 때문에 자연계에 존재하는 모든 숫자를 표현할 수는 없다. 표현할 수 있는 최솟값은 `Number.MIN_VALUE`, 최댓값은 `Number.MAX_VALUE`
- 계산 결과가 자바스크립트의 숫자형 범위에서 나타낼 수 없는 숫자면 `Infinity`로 변환된다.  
- `Infinity`: 양의 무한대
- `-Infinity`: 음의 무한대
- `NaN`: 산술 연산 불가(Not a Number)
	- `NaN`은 어떠한 값과도 일치하지 않으며 심지어 `NaN`끼리도 일치하지 않는다. 
		- 때문에 `isNaN()`함수가 제공된다.  
			- ES6부터 `Number.isNaN()`이 추가되었다.

```javascript
console.log(10 / 0); // Infinity
console.log(10 / -0); // -Infinity
console.log(1 * "Hello"); // NaN
```


## 문자열 타입 
- 문자열은 큰따옴표(`""`)나 작은따옴표(`''`) 또는 백틱(``)로 감싸서 표현한다.  

```javascript
let string;
string = '문자열'; // 작은따옴표
string = "문자열"; // 큰따옴표
string=  `문자열`; // 백틱(ES6)
```

### 템플릿 리터럴
- ES6 부터 도입  
```javascript
let template = `Template Literal` ;
console.log(template);  // Template Literal 
```

#### 멀티라인 문자열 
- 일반 문자열 내에서 줄바꿈 등의 공백을 표현하려면 이스케이프 시퀀스를 사용해야 한다.  
- [이스케이프 시퀀스](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#using_special_characters_in_strings)  

- 템플릿 리터럴은 이스케이프 시퀀스를 사용하지 않고도 줄바꿈이 허용된다. 공백도 있는 그대로 적용된다. 
```javascript
let template = `<ul>`
 <li><a href="#">Home</a></li>
</ul>`;

console.log(template); 
```

#### 표현식 삽입하기  
```javascript
let first = 'yj';
let last = 'Choi';

// ES5 
console.log('My name is ' + first + ' ' + last + '.');

// ES6 템플릿 리터럴
console.log(`My name is ${first} ${last}.`);
```

## 불리언 타입  
- `true`와 `false`

## undefined 타입 
- 초기화되지 않은 변수나 존재하지 않는 객체 프로퍼티나 배열의 원소 값에 접근하려고 할 때 얻는 값
- 반환값이 없는 함수의 반환값 
- 실제 인자가 전달되지 않은 형식인자의 값

## null 타입 
- 변수에 값이 없다는 것을 의도적으로 명시할 때 사용  
- 이전에 참조하던 값을 더 이상 참조하지 않겠다는 의미  
	- 이전에 할당된 값에 대한 참조를 명시적으로 제거하는 것 
	- [[JavaScript-Engine|자바스크립트 엔진]]은 가비지 콜렉션을 수행할 것이다.  
- `typeof null`의 결과는 `"object"`이다.

## [[JavaScript-Symbol|Symbol]] 
- ES6 에서 추가된 타입 
- 변경 불가능한 원시 타입의 값 , 다른 값과 중복되지 않는 유일무이한 값이다. 
- 주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.  

## 객체 타입 
- [[JavaScript-Object]]

## 데이터 타입이 왜 필요한가? 
- 자바스크립트 엔진은 변수에 할당되는 값의 데이터 타입에 따라 정해진 크기의 메모리 공간을 확보한다.  
- 값을 참조할 때도 해당 데이터 타입에 정해진 단위(메모리 공간의 크기)를 읽어 들인다.  
- 메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정할 때 필요하다.  
	- `0100 0001`은  `A` 인지 `65`인지? 

## 동적 타이핑 

### 동적 타입 언어, 정적 타입 언어  
- 정적 타입 언어: C, C++, Java, Go, Rust,...
	- 변수를 선언할 때 변수에 할당할 수 있는 데이터 타입을 사전에 선언해야 한다.  
	- 변수의 타입을 변경할 수 없고 선언한 타입에 맞는 값만 할당 가능하다. 
		- 컴파일 시점에 타입 체크(선언한 데이터 타입에 맞는 값을 할당했는지 검사)를 수행 
		- 타입 체크를 통과하지 못하면 에러 발생 → 프로그램이 실행되지 않는다. 
	- 안정적인 코드 구현이 가능하다.  
- 자바스크립트는 동적 타입 언어 
	- 변수에 값을 할당할 때 어떤 데이터 타입이라도 자유롭게 할당할 수 있다.  

동적타이핑이란 변수의 타입이 값을 할당하는 시점에 결정되고 언제든지 자유롭게 변경할 수 있는 것이다. 자바스크립트의 변수는 선언이 아닌 할당에 의해 타입이 결정되고 재할당에 의해 변수 타입은 언제든지 동적으로 변할 수 있다.  
동적 타입 언어는 편리하지만 단점도 가지고 있다.  동적 타입 언어의 변수는 값을 확인하기 전에 타입을 확신할 수 없다.  유연성은 높지만 신뢰성은 떨어진다. 변수보다는 상수를 이용해 값의 변경을 억제하는 것이 좋고 변수명은 변수의 목적이나 의미를 파악할 수 있도록 네이밍해야 한다.  

## 연산자
### typeof

- 값(변수)에 `typeof` 연산자를 적용하면 다음 문자열 중 하나를 반환한다. 
	- 정의되지 않은 변수: `"undefined"`
	- 불리언: `"boolean"`
	- 문자열: `"string"`
	- 숫자: `"number"`
	- 함수를 제외한 객체 또는 null: `"object"`
	- 함수: `"function"`
		- `function`은 `object`의 하위 타입이다. 함수는 [[JavaScript-First-Class-Object|일급 객체]]이기 때문이다.
- 초기화하지 않은 변수도, 정의하지 않은 변수도 `"undefined"`를 반환, 정의하지 않은 변수에 실행할 수 있는 유의미한 조작은 `typeof` 뿐이다.  
- `undefined`를 직접 할당하는 것은 권장하지 않는다. 
	- 변수가 **비어있거나** **알 수 없는 상태**라는 걸 나타내려면 `null`을 사용한다. `undefined`는 값이 할당되지 않은 변수의 초기값을 위한 예약어로 남겨두기  
- 배열도 `typeof`연산자를 사용하면 `object`이다. `length` 프로퍼티가 자동으로 관리되는 등의 추가 특성을 지닌 객체의 '하위 타입'이라 할 수 있다.


### 지수 연산자
- 좌항의 피연산자를 밑으로, 우항의 피연산자를 지수로 거듭 제곱하는 연산자.
- 원래는 `Math.pow`를 많이 사용했었다. 지수 연산자가 생기면서 가독성이 좋아졌다.
- 음수를 거듭 제곱하려면 괄호로 묶어야 한다.
```javascript
3 ** 3; // 9
(-5) ** 2; // 25
2 * 5 ** 2; // 50
```

## 네이티브
자바스크립트 안에 내장 타입인 네이티브가 있다. ECMAScript 명세의 내장 객체를 말한다. 특정환경에 종속되지 않은 것을 말한다.  
- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`
- 
## reference 
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)

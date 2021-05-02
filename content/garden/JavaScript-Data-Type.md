---
title   : JavaScript Data Type 
date    : 2021-05-02 12:19:19 +0900
updated : 2021-05-02 12:19:38 +0900
aliases : ["데이터 타입"]
private : false
hidden  : false
showReferences : true
---
- 데이터 타입(Data type)은 값의 종류이다. 자바스크립트의 모든 값은 데이터 타입을 갖는다.  
- 원시타입 
	- 숫자
	- 문자열
	- 불리언
	- undefined
	- null
	- 심벌(symbol) 
- 객체타입  

## typeof 연산자
- 값(변수)에 `typeof` 연산자를 적용하면 다음 문자열 중 하나를 반환한다. 
	- 정의되지 않은 변수: `"undefined"`
	- 불리언: `"boolean"`
	- 문자열: `"string"`
	- 숫자: `"number"`
	- 함수를 제외한 객체 또는 null: `"object"`
	- 함수: `"function"`
- 초기화하지 않은 변수도, 정의하지 않은 변수도 `"undefined"`를 반환, 정의하지 않은 변수에 실행할 수 있는 유의미한 조작은 `typeof` 뿐이다.  
- `undefined`를 직접 할당하는 것은 권장하지 않는다. 
	- 변수가 **비어있거나** **알 수 없는 상태**라는 걸 나타내려면 `null`을 사용한다. `undefined`는 값이 할당되지 않은 변수의 초기값을 위한 예약어로 남겨두기  


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
	- 자바스크립트 엔진은 가비지 콜렉션을 수행할 것이다.  

## 심벌 타입 
- ES6 에서 추가된 타입 
- 변경 불가능한 원시 타입의 값 , 다른 값과 중복되지 않는 유일무이한 값이다. 
- 주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용한다.  
- [[JavaScript-Symbol]]

## 객체 타입 

## [[타입 변환]]

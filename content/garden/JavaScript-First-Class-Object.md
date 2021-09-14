---
title   : JavaScript 일급 객체
date    : 2021-05-15 22:40:57 +0900
updated : 2021-05-15 22:41:10 +0900
aliases : ["일급 객체"]
tags: ["JavaScript"]
---
## 일급 객체
- 일급 객체의 조건 
	- 무명의 리터럴로 생성할 수 있다. 런타임 생성이 가능한 것 
	- 변수나 자료구조(객체, 배열 등)에 저장이 가능하다.
	- 함수의 매개변수에 전달할 수 있다.
	- 함수의 반환값으로 사용할 수도 있다. 
---
→ 자바스크립트의 함수는 위 조건을 모두 만족하므로 **일급 객체**다.  
- 함수가 일급 객체라는 것의 의미는 함수를 객체와 동일하게 사용할 수 있다는 것이고, 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다. 
	- [[Functional-Programming]]을 가능하게 한다. 
- 객체와의 차이점은 일반 객체는 호출할 수 없지만 함수는 호출을 할 수 있다. 또한 일반 객체에는 없는 고유의 프로퍼티를 소유한다.  


## 함수 객체의 프로퍼티  
- 함수 객체는 `arguments`, `caller`, `length`, `name`, `prototype` 프로퍼티를 가지고 있다.
- `__proto__`는 접근자 프로퍼티인데 함수 객체 고유의 프로퍼티가 아닌 `Object.prototype` 객체의 프로퍼티를 상속받은 것이다. 
	- [[JavaScript-Prototype]] 참고  

### arguments 프로퍼티 
- `arguments` 프로퍼티 값은 `arguments` 객체다. 
- 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한 [[유사 배열 객체]]다.  
- 함수 내부의 지역 변수이며 외부에서 참조할 수 없다. 
- 만약 인수가 초과로 전달되면 초과된 인수는 무시 → arguments 프로퍼티에 보관된다. 
- [[유사 배열 객체]]는 배열이 아니므로 배열 메서드를 사용할 경우 에러가 발생한다. 
	- [[JavaScript-Array]] 참고 
	- [[ES6]]에서의 사용...

### caller 프로퍼티
- 비표준 프로퍼티, 표준화될 예정도 없는 프로퍼티이다. 
- 함수 자신을 호출한 함수를 가리킨다. 


### length 프로퍼티
- 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.  
- `arguments` 객체의 `length`는 인자의 개수, 함수 객체의 `length`는 매개변수의 개수 

### name 프로퍼티
- ES6에서 정식 표준이 되었다. 
- 함수 이름을 나타낸다. 
```javascript
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

var anonymousFunc = function() {};
console.log(anonymousFunc.name); // ES5: 빈 문자열, ES6: anonymousFunc

function bar() {}
console.log(bar.name); // bar 
```

### __proto__ 접근자 프로퍼티 
- 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 갖는다. [["프로토타입"]] 객체를 가리킨다. 
- `__proto__` 프로퍼티는 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티이다.  

### prototype 프로퍼티
- `constructor`만이 소유하는 프로퍼티 
	- 함수가 객체를 생성하는 생성자 함수로 호출될 때 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.  

## reference  
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)




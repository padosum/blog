---
title   : JavaScript 프로토타입
date    : 2021-05-15 23:02:57 +0900
updated : 2021-05-15 23:03:17 +0900
aliases : ["프로토타입"]
tags: ["JavaScript"]
---
- 자바스크립트는 프로토타입 기반 객체지향 프로그래밍 언어다.

## 객체지향 프로그래밍 
- 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍의 절차지향적 관점에서 벗어나 **객체(object)**의 집합으로 프로그램을 표현하는 프로그래밍 [[패러다임]]이다.  
- 실세계의 실체(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다.
	- <iframe src="//www.slideshare.net/slideshow/embed_code/key/7qDX3Hb96yPbGZ" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/sunnykwak90/5-44213056" title="객체지향 철학 그리고 5대 개념" target="_blank">객체지향 철학 그리고 5대 개념</a> </strong> from <strong><a href="https://www.slideshare.net/sunnykwak90" target="_blank">중선 곽</a></strong> </div> 
- 실체는 특징이나 성질을 나타내는 속성(attribute/property)을 갖고 있고, 이를 통해서 실체를 인식하거나 구별할 수 있다.  
- 다양한 속성 중 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 **추상화**라 한다. 
- **속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체**라고 한다. 
- 객체지향 프로그래밍은 객체의 상태(state)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작(behavior)을 하나의 논리적 단위로 묶어서 생각한다. 
	- 객체의 상태 데이터를 프로퍼티, 동작을 메서드라고 부른다.  

## 상속과 프로토타입  
- 상속: 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것 
- 자바스크립트는 프로토타입을 기반으로 상속을 구현해 중복을 제거한다. 코드를 재사용하는 것. 
```javascript
function Circle(radius) {
    this.radius = radius;
	this.getArea = function () {
	    return Math.PI * this.radius ** 2; 
	};
}  

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle.getArea === circle2.getArea); // false  
```
- `circle1`과 `circle2`는 `getArea`라는 메서드를 각각 갖고있다. 동일한 내용의 메서드라면 하나만 생성해서 모든 인스턴스가 공유하는 것이 바람직하다. 
```javascript
function Circle(radius) {
    this.radius = radius;
}  

Circle.prototype.getArea = function () {
	return Math.PI * this.radius ** 2; 
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle.getArea === circle2.getArea); // true  
```
- 상속을 통해 불필요한 중복을 제거할 수 있다. 
- `Circle` 생성자 함수가 생성한 모든 인스턴스는 자신의 프로토타입, 상위(부모) 객체 역할을 하는 `Circle.prototype`의 모든 프로퍼티와 메서드를 상속받는다.  

## 프로토타입 객체
- 프로토타입 객체(또는 프로토타입)란 객체 간 상속을 구현하기 위해 사용된다. 
- 프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로 다른 객체에 공유 프로퍼티(메서드를 포함)를 제공한다. 
- 모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다. 
	- `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다. 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고  `[[Prototype]]`에 저장되는 것 
- 모든 객체는 하나의 프로토타입을 갖고(`[[Prototype]]` 값이 `null`인 객체는 프로토타입이 없다.) 모든 프로토타입은 생성자 함수와 연결되어 있다. 

### `__proto__` 접근자 프로퍼티
- **모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, `[[Prototype]]` 내부 슬롯에 간접적으로 접근이 가능하다.**
- 접근자 프로퍼티는 자체적으로 값(`[[Value]]` 프로퍼티 어트리뷰트)를 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 `[[Get]]`, `[[Set]]` 프로퍼티 어트리뷰트로 구성된 프로퍼티이다.  ([[JavaScript-Property-Attributes]] 참고)  
- `__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 것이 아닌 `Object.prototype`의 프로퍼티
- 사용하는 이유는? 
	- 상호 참조를 막기 위해 ([[프로토타입 체인]]은 단방향 링크드 리스트로 구현되어야 함) 
	- `__proto__` 접근자 프로퍼티가 상호 참조시 에러를 발생시킴 
	- [[프로토타입 체인]]이 상호 참조하여 순환이 되어버리면 프로퍼티 검색시 무한 루프에 빠져버림 
- 코드 내 직접 사용은 권장 x
	- 모든 객체가 사용할 수 있는게 아니기 때문 
	- 대신 사용할 수 있는 메서드 
		- `Object.getPrototypeOf`: 프로토타입 참조 취득
		- `Object.setPrototypeOf`: 프로토타입 교체

### 함수 객체의 `prototype` 프로퍼티
```javascript
// 함수 객체는 prototype 프로퍼티를 소유함
(function () {}).hasOwnProperty('prototype'); // true

// 일반 객체는 소유하지 않는다.
({}).hasOwnProperty('prototype'); // false
```
- `constructor` 만이 소유한다. 
	- 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다.  
- 모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만 갖고 있는 `prototype` 프로퍼티는 결국 동일한 프로퍼티를 가리키는데 사용하는 주체가 다르다.  

```javascript
function Person(name) {
    this.name = name;
}

const me = new Person('Lee');

console.log(me.constructor === Person); // true 
```
- 모든 프로토타입은 `constructor` 프로퍼티를 갖는다. 자신을 참조하고 있는 생성자 함수를 가리킨다. 
- `me` 객체에는 `constructor` 프로퍼티가 없지만 프로토타입인 `Person.prototype`에 `constructor` 프로퍼티를 상속받아 사용할 수 있는 것 

## 프로토타입의 생성 시점 
- 프로토타입은 생성자 함수가 생성되는 시점에 함께 생성된다. 
```javascript
// 함수 정의가 평가되어 함수 객체 생성 시점에 프로토타입도 함께 생성된다. 
console.log(Person.prototype); // {constructor: f}

function Person(name) {
    this.name = name; 
}
```
- 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. → 전역 객체가 생성되는 시점인 것 

## 객체 생성방식에 따른 프로토타입 결정 
- 객체 생성방식이 다양한데 프로토타입은 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다. 
- [[JavaScript-Object-Literal|객체 리터럴]]
	- `Object.prototype`
- [[JavaScript-Constructor-Function|Object 생성자 함수]] 
	- `Object.prototype`
- 생성자 함수 (`new` 연산자)
	- 생성자 함수의 `prototype` 프로퍼티에 바인딩 되어 있는 객체 
	```javascript
	function Person(name) {
	    this.name = name;
	}
	
	Person.prototype.sayHello = function() {
	    console.log(`Hello, My Name is ${this.name}`);
	}
	
	const me = new Person('Lee');
	const you = new Person('Choi');
	
	me.sayHello();
	you.sayHello(); 
	```
---
## [[JavaScript-Prototype-Chain]]

---

## [[JavaScript-Property-Shadowing]]

---

## `instanceof` 연산자 
`객체 instanceof 생성자 함수`
- 우변의 생성자 함수의 `prototype`에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 `ture` 아니면 `false`

## 정적 프로퍼티와 메서드 
- `static` 프로퍼티와 메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메서드 이다.  
```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = funciton () {
    console.log('hello');
}

Person.staticProp = 'static prop';

Person.staticMethod = function () {
    console.log('staticMethod');
}

const me = new Person('me');

Person.staticMethod(); // staticMethod

me.staticMethod(); // Error 
```
- 생성자 함수가 생성한 인스턴스가 정적 프로퍼티/메서드를 호출할 수 없는 이유는 프로토타입 체인에 속하지 않았기 때문이다. 

## 프로퍼티 확인하기 
### `in` 연산자 
객체 내 특정 프로퍼티가 존재하는지 여부를 확인하는 연산자 
`key in object`
- 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다. 
- ES6에서는 `Reflect.has` 메서드가 도입되었다. 동일하게 동작 

### `Object.prototype.hasOwnProperty` 메서드 
- 고유의 프로퍼티인 경우에만 `ture`, 상속받은 것이면 `false`

## 프로퍼티 열거하기 
### `for ... in` 문 
`for (변수선언문) in 객체) { ... }`  
- 대상 객체 프로퍼티와 상속받은 프로퍼티까지 열거하지만 프로퍼티의 `[[Enumerable]]` 값이 `false`이면 열거되지 않는다.  

### Object.keys, values, entries 메서드 
열거 가능한 프로퍼티 값을 배열로 반환한다.






## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)







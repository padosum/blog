---
title   : JavaScript this
date    : 2021-09-14 15:29:46 +0900
updated : 2021-09-16 17:59:35 +0900
aliases: ["this"]
tags: ["JavaScript"]
---

## `this`
[[Object-Oriented-Programming|객체]]의 메서드는 자신이 속한 객체의 상태(프로퍼티)를 참조하고 변경할 수 있어야 한다. 자신이 속한 객체를 가리키는 식별자를 참조할 수 없다면 메서드의 활용도는 낮아질 것이다.  

```javascript
function Circle(radius) {
   this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  return 2 * this.radius;
};

const circle = new Circle(5);
```
생성자 함수를 정의하는 시점에는 아직 인스턴스가 생성되기 전이므로 인스턴스를 가리킬 식별자를 알 수가 없다.  그래서 자바스크립트는 **`this`라는 특수한 식별자를 제공**한다.
`this`는 자신이 속한 객체 or 자신이 생성할 인스턴스를 가리키는 변수로 [[JavaScript-Engine|자바스크립트 엔진]]에 의해 암묵적으로 생성된다. 
함수를 호출하면 `arguments` 객체와 `this`가 함수 내부에 전달되는데 `this`가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정된다.

## this 바인딩
`this`와 `this`가 가리키는 값을 연결하는 과정을 `this` 바인딩이라고 한다. 자바스크립트에서는 `this` 바인딩이 함수 호출 방식에 따라 결정이된다.

### 일반 함수 호출
기본적으로 `this`에는 전역 객체가 바인딩된다. 전역 함수, 중첩 함수, 콜백 함수 등 **일반 함수**로 함수를 호출하면 함수 내부의 `this`에는 전역 객체가 바인딩된다.  
중첩 함수나 콜백 함수는 외부 함수를 돕는 헬퍼 함수의 역할을 하는데 외부 함수인 메서드와 `this`가 일치하지 않는 다는 것은 헬퍼 함수로 동작하기 어려운 문제점이 있다. 그래서 다음과 같이 `this` 바인딩을 일치시키는 방법이 있다.  
```javascript
var value = 1;

const obj = {
  value: 100,
	foo() {
	  const that = this;
		
		setTimeout(function () {
		  console.log(that.value); // 100
		}, 100);
  }
};

obj.foo();
```
이 방법 외에도 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind` 메서드 또는 [[JavaScript-Arrow-Function|화살표 함수]]를 사용해서 `this` 바인딩을 일치시킬 수도 있다.
```javascript
var value = 1;

const obj = {
  value: 100,
	foo() {
	  setTimeout(() => console.log(this.value), 100); // 100 
	}
};
obj.foo();
```
- 화살표 함수 내부의 `this`는 상위 스코프의 `this`를 가리킨다.

### 메서드 호출 
메서드 내부의 `this`는 메서드를 호출한 객체를 가리킨다. 메서드를 소유한 객체가 아닌, 호출한 객체라는 것에 주의해야 한다.  

### 생성자 함수 호출
생성자 함수 내부의 `this`에는 생성자 함수가 생성할 인스턴스가 바인딩된다.  
```javascript
function Person(name) {
  this.name = name;
	this.sayHello = function () {
	  return `Hello, ${this.name}`; 
  };
}

const p1 = new Person('padosum');
const p2 = new Person('yj');

console.log(p1.sayHello); // Hello, padosum
console.log(p2.sayHello); // Hello, yj
```
- 생성자 함수를 호출할 때 `new` 연산자 없이 호출하면 일반 함수로 동작한다. 그렇게 되면 생성자 함수 내부의 `this`는 전역 객체를 가리키게 된다. 
	
### `Function.prototype.apply/call/bind` 메서드에 의한 간접 호출
- `apply`, `call`, `bind` 메서드는 `Function.prototype`의 메서드이다. 모든 함수가 상속받아서 사용 가능하다.  
- `call`과 `bind` 는 어떤 함수든지 특정 객체의 메서드로 호출할 수 있다는 의미이다. (함수가 실제로 그 객체에 속하지 않더라도)

```javascript
function sum(num1, num2) {
  return num1 + num2;
}

function callSum(num1, num2) {
  return sum.call(this, num1, num2); // 각각 넘겨야한다.
}

function callSum1(num1, num2) {
  return sum.apply(this, [num1, num2]); // 배열을 넘김
}
```
- `appy`, `call` 메서드의 기능은 함수를 호출하는 것. 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 `this`에 바인딩한다.  
	- 전달 방식만 다르고 동작은 동일하다.
```javascript
window.color = "yellow";
let o = { color: "green" };

function sayColor() {
  console.log(this.color);
}

sayColor(); // yellow

sayColor.call(this); // yellow
sayColor.call(window); // yellow
sayColor.call(o); // green

let objSayColor = sayColor.bind(o);
objSayColor(); // green
```
- `bind` 메서드는 함수를 호출하지 않아서 명시적으로 호출해야 한다.

## reference
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)

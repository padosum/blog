---
title   : JavaScript 프로토타입 체인
date    : 2021-05-16 22:04:56 +0900
updated : 2022-12-20 23:24:03 +0900
aliases : ["프로토타입 체인"]
tags: ["JavaScript"]
---

아래 코드를 살펴보면 `me` 객체가 `Object.prototype`의 메서드인 `hasOwnProperty`를 호출할 수 있다. 
```javascript
function Person(name) {
	this.name = name;
}

Person.prototype.sayHello = function() {
	console.log(`Hello, My Name is ${this.name}`);
}

const me = new Person('Lee');
console.log(me.hasOwnProperty('name')) // true 

Object.prototype.hasOwnProperty.call(me, 'name');
```  

`Person.prototype`뿐 아니라 `Object.prototype`의 프로퍼티에도 접근 가능하다는 것인데, 어떻게 가능한 것일까?

---
```javascript
Object.getPrototypeOf(me) === Person.prototype; // true 
Object.getPrototypeOf(Person.prototype) === Object.prototype; // true 
```

프로토타입 체인 때문이다.  
프로토타입 체인이란, 자바스크립트가 객체의 프로퍼티(+메서드)에 접근하려 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색하는 것을 의미한다. 
- 프로토타입 체인의 최상위에 있는 객체는 언제나 `Object.prototype`이다. → 프로토타입 체인의 종점(end of prototype chain)이라 부른다. 
	- `Object.prototype`의 프로토타입은 `null`이다.  
	- 종점에서도 프로퍼티를 검색할 수 없는 경우  `undefined`를 반환 
- 프로퍼티가 아닌 식별자는 [[JavaScript-Scope-Chain|스코프 체인]]에서 검색 



## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)



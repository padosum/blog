---
title   : JavaScript 프로토타입
date    : 2021-05-15 23:02:57 +0900
updated : 2021-05-15 23:03:17 +0900
aliases : ["프로토타입"]
private : false
hidden  : false
showReferences : true
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

### __proto__ 접근자 프로퍼티
- **모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, `[[Prototype]]` 내부 슬롯에 간접적으로 접근이 가능하다.**
- 접근자 프로퍼티는 자체적으로 값(`[[Value]]` 프로퍼티 어트리뷰트)를 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 `[[Get]]`, `[[Set]]` 프로퍼티 어트리뷰트로 구성된 프로퍼티이다.  ([[JavaScript-Property-Attributes]] 참고)  


## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)







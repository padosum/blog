---
title   : JavaScript 프로퍼티 섀도잉
date    : 2021-05-16 22:17:16 +0900
updated : 2021-05-16 22:17:26 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---

```javascript
const Person = (function () {
    function Person(name) {
	    this.name = name; 
	}
	
	Person.prototype.sayHello = function () {
	    console.log(`Hello, My Name is ${this.name}`);
	};
	
	return Person; 
}());

const me = new Person('Lee');

me.sayHello = function () {
	console.log(`🤙 Hello, My Name is ${this.name}`)
};

me.sayHello(); // 🤙 Hello, My Name is Lee
```

- 생성자 함수로 객체를 생성하고 프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면, 프로토타입 프로퍼티에 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가된다.  
	- 여기서 인스턴스의 `sayHello`는 프로토타입 메서드 `sayHello`를 오버라이딩[^1]했다. 
	- 이렇게 상속관계에 의해 가려지는 현상을 **프로토타입 섀도잉**이라고 한다.  
- 오버라이딩[^1]은 하지만 하위 객체를 통해 상위 프로퍼티를 `set`할 수는 없다. 프로토타입 체인으로 접근하는게 아니라 프로토타입에 직접 접근해야 한다. 

## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)

---
[^1] 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의해서 사용하는 방식




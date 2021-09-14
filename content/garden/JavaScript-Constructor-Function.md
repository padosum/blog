---
title   : JavaScript 생성자 함수
date    : 2021-05-15 22:07:39 +0900
updated : 2021-05-15 22:08:00 +0900
aliases : ["Object 생성자 함수"] 
tags: ["JavaScript"]
---

## Object 생성자 함수  
- 생성자 함수(constructor)는 `new` 연산자와 함께 호출해 객체(인스턴스)를 생성하는 함수를 말한다. 생성자 함수에 의해 생성된 객체를 인스턴스(instance)라고 한다.  
- `new` 연산자와 함께 `Object` 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 이 빈 객체에 프로퍼티 또는 메서드를 추가하면 객체를 완성할 수 있다.  
```javascript
// 빈 객체 생성하기
const person = new Object();

// 프로퍼티 추가하기 
person.name = 'Lee';
person.sayHello = function() {
    console.log(`Hello, My Name is ${this.name}`);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hello, My Name is Lee 
```
- 자바스크립트는 `Object` 생성자 함수 외에도 `String`, `Number`, `Function`, `Array`, `Date`, `RegExp`, `Promise` 등의 빌트인 생성자 함수를 제공한다.  
- 객체 생성은 [[객체 리터럴]]을 사용하는 것이 더 간편하다. 

## 생성자 함수  

### [[JavaScript-Object-Literal|객체 리터럴]] 방식의 문제점 
[[객체 리터럴]]에 의한 생성 방식은 직관적이고 간편하지만 단 하나의 객체만 생성할 수 있다. 여러 개의 객체를 생성해야 하는 경우 비효율적이다.  

### 생성자 함수 방식의 장점 
마치 객체(인스턴스)를 생성하기 위핸 템플릿(클래스) 처럼 생성자 함수를 사용해 프로퍼티 구조가 동일한 여러 개의 객체를 간편하게 생성할 수 있다.  

```javascript
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2); 
```
- `new` 연산자와 함께 호출하지 않으면 일반 함수로서 호출된다.  

### 생성자 함수의 인스턴스 생성 과정  
인스턴스를 생성하는 과정을 생각해보면, 인스턴스를 생성하고 생성된 인스턴스를 초기화해야 한다. 하지만 생성자 함수의 내부 코드를 보면 인스턴스를 생성하고 반환하는 코드는 보이지 않는다. 자바스크립트 엔진이 암묵적인 처리를 통해 인스턴스를 생성하고 반환하기 때문이다. 

1. 인스턴스 생성과 this 바인딩 
   - 암묵적으로 빈 객체가 생성되고 
   - 빈 객체(인스턴스)는 `this`에 바인딩(식별자와 값을 연결)된다. 
   - 런타임 이전에 실행된다.  

2. 인스턴스 초기화 
   - 생성자 함수 내부의 코드가 한 줄씩 실행되며 `this`에 바인딩되어 있는 인스턴스를 초기화한다. 

3. 인스턴스 반환 
   - 생성자 함수 내부의 모든 처리가 끝이 나면 완성된 인스턴스가 바인딩된 `this`가 암묵적으로 반환된다. 

### 내부 메서드 `[[Call]]`과 `[[Construct]]`  
- 함수 선언문, 함수 표현식으로 정의한 함수는 (`new` 연산자와 함께 사용하여) 생성자 함수로서 호출이 가능하다. 
- **함수는 객체이지만 일반 객체와 다르게 호출을 할 수 있다.**  
  - 일반 객체가 가진 내부 슬롯, 내부 메서드와 함수로서 동작하기 위한 `[[Environment]]`, `[[FormalParameters]] 등의 내부 슬롯, `[[Call]]`, `[[Construct]]` 같은 내부 메서드도 가지고 있다. 
- 일반 함수로서 호출되면 `[[Call]]`이, 생성자 함수로 호출되면 `[[Construct]]`가 호출된다.  
- 내부 메서드 `[[Call]]`을 갖는 함수 객체를 `callable`이라 하며, `[[Construct]]`를 갖는 함수 객체를 `constructor`, 갖지 않는 함수 객체는 `non-constructor`라고 부른다.  
- 함수 객체는 `callable` 이고, `constructor` 또는 `non-constructor`다.  
  - `constructor`: 함수 선언문, 함수 표현식, 클래스 
  - `non-constructor`: 메서드(ES6 메서드 축약 표현), 화살표 함수 


### new 연산자  
- 일반 함수와 생성자 함수의 형식적 차이는 없고 `new` 연산자와 함께 호출하면 생성자 함수로 동작하게 되는 것이다. (`[[Call]]`이 아닌 `[[Construct]]`가 호출됨)

### `new.target`
- 생성자 함수가 `new` 연산자 없이 호출되는 것을 방지하기 위해 ES6에서는 `new.target`을 지원한다.  
```javascript
function Circle(radius) {
    // 이 함수가 new 연산자와 함께 호출된 것이 아니라면 undefined다. 
    if(!new.target) {
        return new Circle(radius); 
    }
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius; 
    };
}

const circle = Circle(5);
console.log(circle.getDiameter()); 
```

- 대부분의 빌트인 생성자 함수는 `new` 연산자와 함께 호출되지 않아도 `new` 연산자와 함께 호출했을 때와 동일하게 동작 

## reference  
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
---
title   : 객체 리터럴
date    : 2021-05-08 12:36:43 +0900
updated : 2021-05-08 12:36:51 +0900
aliases : ["객체 리터럴"]
tags: ["JavaScript"]
---
## 객체 리터럴을 이용해 객체 만들기 
변수에 [[JavaScript-Object|객체]] 리터럴이 할당되는 시점에 [[JavaScript-Engine|자바스크립트 엔진]]은 객체 리터럴을 해석해서 객체를 생성한다.
```javascript
let person = {
    name: 'Lee jung-Seob 🐮',
    sayHello: function() {
        console.log(`Hello! My Name is ${this.name}.`);
    }
};

console.log(typeof person); // object 
console.log(person); // {name: "Lee jung-Seob 🐮", sayHello: f}

let empty = {}; // 빈 객체 생성하기 
```

## 프로퍼티  
객체는 프로퍼티의 집합, 프로퍼티는 키와 값으로 구성된다.  프로퍼티를 나열할 때는 쉼표(`,`)로 구분한다.  
- 프로퍼티 키: 빈 문자열을 포함하는 모든 문자열 또는 심벌 값
- 프로퍼티 값: 자바스크립트에서 사용할 수 있는 모든 값  

프로퍼티 키로는 자바스크립트에서 사용 가능한 유효한 이름인 경우 **따옴표를 생략**할 수 있다. 식별자 네이밍 규칙을 준수하지 않는 키를 사용하면 따옴표로 감싸야 하는데 번거로운 일일 발생할 수 있어 가급적 식별자 네이밍 규칙을 준수하는 키를 사용할 것을 권장한다.  

프로퍼티 키를 동적으로 생성할 수도 있는데 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다. 
```javascript
let obj = {};
let key = 'hello';

obj[key] = 'world';

console.log(obj); // {hello: "world"}
```

## 메서드  
함수는 객체([[JavaScript-First-Class-Object|일급 객체]])이므로 값으로 취급할 수 있어서 프로퍼티 값으로 사용 가능하다. **프로퍼티 값이 함수일 경우 일반 함수와 구분을 위해 메서드(method)라고 부른다.** 메서드란 객체에 묶여 있는 함수이다.  
```javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // 'this'는 현재 객체(user)를 나타낸다.
    alert(this.name);
  }

};

user.sayHi(); // John
```
메서드 내부에서 사용하는 [[JavaScript-this|this]] 키워드는 객체 자신을 가리키는 참조변수다. 

## 프로퍼티 접근하기  
프로퍼티에 접근하는 방법은 2가지  
- 마침표 표기법: 마침표 프로퍼티 접근 연산자(`.`)를 사용
- 대괄호 표기법: 대괄호 프로퍼티 접근 연산자(`[ ... ]`)를 사용  
  - **연산자 내부에 지정하는 프로퍼티 키는 반드시 따옴표로 감싸야 한다.** 

```javascript
let person = {
    name: 'Lee',
    age: 39 
}

// 마침표 표기법
console.log(person.name); // Lee

// 대괄호 표기법
console.log(person['age']); // 39 
console.log(person.height); // undefined

// 프로퍼티 값 갱신
person.age = 50; // 새로운 값으로 갱신된다. 

// 프로퍼티 동적 생성
person.height = 180; // 존재하지 않는 프로퍼티에 값을 할당하면 동적으로 생성된다.  

// 프로퍼티 삭제  
delete person.age; 
```

## ES6에서 추가된 기능  

### 프로퍼티 축약 표현 
ES6에서 프로퍼티 값으로 변수를 사용하는 경우 변수명과 프로퍼티 키의 이름이 동일하다면 프로퍼티 키를 생략이 가능하다.  
```javascript
let x = 1, y = 2;

let obj = {x, y};

console.log(obj); // {x: 1, y: 2}
```

### 계산된 프로퍼티 이름 
```javascript
const prefix = 'prop';
let i = 0;

const obj = {
    [`${prefix}-${++1}`]: i 
    // prop-1: 1 
}
```

### 메서드 축약 표현  
```javascript
// ES5
var obj = {
    name: 'Lee',
    sayHello: function() {
        console.log(`hello ${this.name}`);
    }
};

// ES6
let obj = {
    name: 'Lee',
    sayHello() {
        console.log(`hello ${this.name}`);
    }
};
```

## reference
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [모던 JavaScript 튜토리얼](https://ko.javascript.info/)
---
title   : JavaScript 객체
date    : 2021-05-08 12:23:41 +0900
updated : 2021-05-08 12:23:50 +0900
aliases : ["객체"]
private : false
hidden  : false
showReferences : true
---
## 객체란?  
자바스크립트에서 원시 값을 제외한 나머지 값은 모두 객체다.  
원시 타입은 하나의 값만을 나타내지만 **객체 타입은 다양한 타입의 값(원시 값 또는 다른 객체)을 하나의 단위로 구성한 복합적인 자료구조**다.   

```javascript
let user = {     // 객체
  name: "John",  // 프로퍼티, 키: "name",  값: "John" 
  age: 30        // 프로퍼티, 키: "age", 값: 30
};
```
객체는 0개 이상의 프로퍼티로 구성된 집합, 프로퍼티는 키(key)와 값(value)으로 구성된다.    
자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있고 함수도 [[일급 객체]]이므로 값으로 취급할 수 있다. **프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드(method)라고 부른다.**

```javascript
let user = {
  name: "John",
  age: 30
};

user.sayHi = function() {
  alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```
- 프로퍼티: 객체의 상태를 나타내는 값 (data)
- 메서드: 프로퍼티(상태 데이터)를 참조하고 조작할 수 있는 동작(behavior)  

객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 [[객체지향 프로그래밍]]이라고 한다. 

## 객체 생성하기 
자바스크립트는 다양한 객체 생성 방법을 지원한다. 
- [[객체 리터럴]]
- Object 생성자 함수
- 생성자 함수
- Object.create 메서드
- 클래스(ES6)

객체 리터럴 외의 방법들은 모두 [[JavaScript-Function|함수]]를 이용해 객체를 생성한다.  


## 참고자료
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- [모던 JavaScript 튜토리얼](https://ko.javascript.info/)
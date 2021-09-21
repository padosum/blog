---
title   : JavaScript 클래스
date    : 2021-09-21 19:34:20 +0900
updated : 2021-09-21 22:00:14 +0900
tags    : ["JavaScript"]
---
자바스크립트는 [[JavaScript-Prototype|프로토타입]] 기반 객체지향 언어이다. 프로토타입 기반의 객체지향 언어는 다음 코드와 같이 클래스 없이도 생성자 함수와 프로토타입을 통해 상속을 구현할 수 있다.  
```javascript
var Animal = (function () {

  function Animal(name) {
    this.name = name;
  }
	
  Animal.prototype.sayName = function () {
    console.log(`This is ${this.name}`)
  };
	
  return Animal;
}());

var tiger = new Animal('tiger');
tiger.sayName(); // This is is tiger
```

ES6부터 클래스가 도입되어 기존의 프로토타입 객체지향 프로그래밍보다 클래스 기반 객체지향 프로그래밍(Java, C# 등...)에 익숙한 프로그래머가 보다 빠르게 학습할 수 있게되었다.

## 클래스 정의하기
`class` 키워드를 사용해 정의한다. 파스칼 케이스를 사용하는 것이 일반적이다.
```javascript
class Animal {}
```
클래스는 함수이기 때문에 [[JavaScript-First-Class-Object|일급 객체]]이다. 클래스에는 `constructor`, 프로토타입 메서드, 정적 메서드를 정의할 수 있다.  
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
	
  sayHello() {
    console.log(`Hello, ${this.name}`);
  }
	
  static sayHi() {
    console.log('👋 Hi ');
  }
}

const tiger = new Animal('tiger');

console.log(tiger.name); // tiger
tiger.sayHello(); // Hello, tiger
Animal.sayHi(); // 👋 Hi 
```
클래스 선언문은 호이스팅이 발생하지 않는 것처럼 보이지만 클래스는 함수이기 때문에 호이스팅된다.  `let`, `const` 키워드로 선언한 변수처럼 TDZ에 빠져서 발생하지 않는 것처럼 동작한다.
```javascript
const Animal = '';
{
  // 호이스팅이 발생하지 않는다면 const로 선언한 ''이 출력되어야 한다.
  console.log(Animal); // Uncaught ReferenceError: Cannot access 'Animal' before initialization
	
  class Animal {}
}
```

## 클래스 인스턴스 생성하기  
```javascript
class Animal {}

const tiger = new Animal();
console.log(tiger); // Animal {}
```

## 메서드  
### `constructor`
`constructor`는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}
```

프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 `constructor` 내부에서 `this`에 인스턴스 프로퍼티를 추가하면 된다.
```javascript
class Tiger {
  constructor() {
    this.isMammal = true;
	this.color = 'Gold';
  }
}

const tiger = new Tiger();
console.log(tiger);  // Tiger {isMammal: true, color: "Gold"}
```

인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 `constructor`에 매개변수를 선언하고 인스턴스 생성시 전달하면 된다.  
```javascript
class Lion {
  constructor(name, weight) {
    this.name = name;
	this.weight = weight;
  }
}

const simba = new Lion('Simba', 190);
console.log(simba); // Lion {name: "Simba", weight: 190}
```

### 프로토타입 메서드 
```javascript
class Lion {
  constructor(name) {
    this.name = name;
  }
	
  sayHello = function () {
    console.log(`Hello, ${this.name}`);
  }
}

const simba = new Lion('Simba');
simba.sayHello(); // Hello, Simba

simba instanceof Object; // true 
```

### 정적 메서드
[[JavaScript-Prototype|정적 메서드]]는 인스턴스를 생성하지 않아도 호출할 수 있는 메서드를 말한다.  클래스에서 메서드에 `static` 키워드를 붙이면 정적 메서드가 된다.  
```javascript
class Lion {
  constructor(name) {
    this.name = name;
  }
	
  static sayHi() {
    console.log('Roar');
  }
}

// 정적 메서드는 인스턴스 생성없이 호출이 가능하다.
Lion.sayHi(); // Roar
```
정적 메서드는 인스턴스로는 호출할 수 없다. 인스턴스의 [[JavaScript-Prototype-Chain|프로토타입 체인]] 상에 클래스가 존재하지 않기 때문에 인스턴스로 클래스의 메서드를 상속받을 수 없다.

메서드 내부에서 인스턴스의 프로퍼티를 참조할 필요가 있다면 `this`를 사용해야 한다. 그렇다면 정적 메서드가 아닌 프로토타입 메서드로 정의해야 한다. 정적 메서드의 `this`는 클래스를 가리키기 때문이다. `Math`, `Number`, `JSON`, `Object`, `Reflect` 등은 다양한 정적 메서드를 가지고 있다. 

### 클래스 메서드의 특징
1. `function` 키워드를 생략한다.
2. 객체 리터럴과는 다르게 콤마(`,`)가 필요없다.
3. 암묵적으로 strict mode로 실행된다.
4. `for ... in`이나 `Object.keys` 로 열거할 수 없다.
5. `new` 연산자와 함께 호출할 수 없다. 


## 클래스의 인스턴스 생성 과정
#### 1. 인스턴스 생성과 this 바인딩
`new`와 함께 클래스를 호출하면 `constructor` 내부 코드가 실행되기 전에 빈 객체가 생성된다. 이 빈 객체가 인스턴스이고, 인스턴스의 프로토타입으로 클래스의 `prototype` 프로퍼티가 가리키는 객체가 설정된다. 빈 객체는 `this`에 바인딩된다. 인스턴스가 `this`에 바인딩되는 것이다.
#### 2. 인스턴스 초기화
`this`에 바인딩된 인스턴스에 프로퍼티를 추가하고 `constructor`가 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.
#### 3. 인스턴스 반환 
클래스의 모든 처리가 끝나면 인스턴스가 바인딩된 `this`가 반환된다.


## 프로퍼티  
### 인스턴스 프로퍼티
```javascript
class Lion {
  constructor(name) {
    this.name = name; // 인스턴스 프로퍼티
  }
}

const simba = new Lion('Simba');
console.log(simba);
```
- 인스턴스 프로퍼티는 언제나 `public`하다. ES6의 클래스는 `private`, `public`, `protected` 같은 접근 제한자를 지원하지 않는데, `private` 프로퍼티를 정의할 수 있는 사양이 제안 중에 있다.  

### 접근자 프로퍼티
접근자 프로퍼티(accessor property)는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.  
```javascript
class Book {
  constructor(year, edition) {
    this.year = year;
	this.edition = edition;
  }
	
  get info() {
    return `${this.year} - ${this.edition}`;
  }
	
  set info(year) {
    this.year = year; 
	this.edition += year - 2010;
  }
} 

const learnJavascript = new Book(2010, 1);
console.log(learnJavascript); // Book {year: 2010, edition: 1}

learnJavascript.info = 2021; // 접근자 프로퍼티로 프로퍼티 값 저장 
console.log(learnJavascript); // Book {year: 2021, edition: 12}
console.log(learnJavascript.info); // 접근자 프로퍼티로 값 읽기 
```
접근자 프로퍼티는 `getter` 함수와 `setter` 함수로 구성되어 있다.  
`getter`는 이름 앞에 `get` 키워드를 사용해 정의하고 다른 데이터 프로퍼티의 값을 읽거나 별도의 행위가 필요할 때 사용한다.  
`setter`는 이름 앞에 `set` 키워드를 사용해 정의하고 프로퍼티에 값을 할당할 때마다 프로터피 값을 변경하거나 별도의 행위가 필요하면 사용한다.  
접근자 프로퍼티는 프로퍼티의 값을 바꿨을 때 해당 프로퍼티만 바꾸는 것이 아니라 부수적인 절차가 필요한 경우 사용한다.   
접근자 프로퍼티는 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티이다.    

### 클래스 필드
클래스 필드란, 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어이다. 인스턴스의 프로퍼티를 클래스 내부의 변수인 것처럼 클래스 몸체에서 `this` 없이 선언해 `this`를 생략하고 참조할 수 있다.  
최신 브라우저에서는 다음과 같이 클래스 필드를 클래스 몸체에 정의할 수 있다.  
클래스 필드를 참조하려는 경우 반드시 `this`를 사용해야 하고, 정의하는 경우에는 `this`에 바인딩해서는 안된다. `this`는 `constructor` 메서드 내에서만 유효하다.  
```javascript
class Lion {
  name = 'Simba';
  this.name = ''; // Error

  constructor() {
	// 클래스 필드를 초기화하려면 constructor 내부에서 해야한다. 밖에 클래스 필드를 정의할 필요가 없다.  
	  
    console.log(name); // Error, this를 붙여야 함
  }
}

const simba = new Lion();
console.log(simba); // Lion {name: "Simba"}
```

### private 필드
[최신 브라우저(chrome 74 이상), Node.js(버전 12 이상) 부터 private 필드를 정의할 수 있다.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)   
`private` 필드에는 `#` 접두사를 붙여준다. 참조하는 경우에도 `#`을 붙여줘야 한다.  그리고 클래스 몸체에 정의해야 한다. `constructor`에 정의하면 에러가 발생한다.
```javascript
class Lion {
  #name = '';
	
  constructor(name) {
    this.#name = name; 
  }
}

const simba = new Lion('Simba');

console.log(simba.#name); // private 필드는 외부에서는 참조할 수 없다.
```

클래스 외부에서 `private` 필드를 직접 접근할 수 없지만, 접근자 프로퍼티를 사용해서 간접적으로 접근할 수는 있다.  
```javascript
class Lion {
  #name = '';
	
  constructor(name) {
    this.#name = name;
  }
	
  get name() {
    return this.#name.trim();
  }
}

const simba = new Lion('   Simba');
console.log(simba.name); // Simba
```

### static 필드 정의
[최신 브라우저(chrome 74 이상), Node.js(버전 12 이상) 부터 static public, static private 필드, static private 메서드를 정의할 수 있다.](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Public_class_fields)
```javascript
class Bank {
	
  // static public field
  static name = 'KB';
	
  // static private field
  static #money = 100000000;

  // static 메서드
  static getMoney() {
    return this.#money;
  }
}

console.log(Bank.name); // KB
console.log(Bank.getMoney()); // 100000000
```

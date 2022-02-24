---
title   : JavaScript 클래스
date    : 2021-09-21 19:34:20 +0900
updated : 2022-02-24 20:25:04 +0900
aliases : ["JavaScript 클래스"]
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
클래스 필드를 참조하려는 경우 반드시 `this`를 사용해야 하고, 정의하는 경우에는 `this`에 바인딩해서는 안된다. `this`는 `constructor`와 메서드 내에서만 유효하다.  
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

## 클래스 상속
"상속"은 "물려받다"의 의미를 가지고 있다. 따라서 클래스 상속이란, 어떠한 클래스를 만들 때, 다른 클래스의 기능을 물려받는 것을 의미한다.  

예를 들어, 다음과 같은 `Bird` 클래스가 있다고 가정하자.
```javascript
class Bird {
  constructor(name) {
	  this.name = name;
		this.hasWing = true; 
	}
	
	eat() { return 'eat'; } 
}
```
다음과 같이 `Eagle` 클래스를 만들 때, 상속을 통해 `Bird` 클래스의 속성은 그대로 사용하고 자신만의 고유 속성을 추가해 확장이 가능하다.  `extends` 키워드가 제공되어 사용하면 상속을 통해 다른 클래스를 확장할 수 있다.
```javascript
class Eagle extends Bird {
  fly() { return 'fly'; } 
}

let apollo = new Eagle('Apollo');
console.log(apollo.eat()); // 'eat'
console.log(apollo.fly()); // 'fly'
console.log(apollo instanceof Bird); // true
console.log(apollo instanceof Eagle); // true
```

### `extends`
상속을 통해 확장된 클래스를 서브클래스/자식 클래스(subclass/child class), 서브클래스에게 상속된 클래스를 수퍼클래스/부모 클래스(superclass/parent class)라고 부른다. 
인스턴스의 프로토타입 체인 뿐 아닌, 클래스 간의 프로토타입 체인도 생성된다. 따라서 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.  
```javascript
class Bird {} // superclass 

class Eagle extends Bird {} // subclass 
```

클래스가 아닌 생성자 함수를 상속받아 클래스를 확장할 수도 있다. 
```javascript
function Animal (name) {
  this.name = name;
}

class Dog extends Animal {
  bark() {
    console.log(`🐶🐶🐶`);
  }
}

let d = new Dog('hank');
d.bark(); // 🐶🐶🐶
```

### `super`
수퍼클래스와 서브클래스에서 `constructor`를 생략하면 빈 객체가 생성된다. (암묵적으로 생성) 프로퍼티를 소유하는 인스턴스를 생성하려면 `constructor` 내부에서 인스턴스에 프로퍼티를 추가해야 한다.  
- `super`를 호출하면 는 수퍼클래스의 `constructor`를 호출해 인스턴스를 생성한다. 
- `super`를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.  

#### `super` 호출하기
다음 코드와 같이 수퍼클래스 `constructor` 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성하고 싶다면 서브클래스의 `constructor`를 생략하면 된다.  
```javascript
class Animal {
  constructor(name) {
    this.name = name; 
  }
}

class Cat extends Animal {
}

let garfield = new Cat('Garfield');
console.log(garfield); // Cat {name: 'Garfield'}
```

만약 수퍼클래스에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티 모두를 갖는 인스턴스를 생성하려면 서브클래스의 `constructor`에서 `super`를 호출해 수퍼클래스의 `constructor`에 전달할 인수를 전달할 수 있다. 
```javascript
class Bird {
  constructor(name, weight) {
    this.name = name;
	this.weight = weight;
  }
}

class Penguin extends Bird {
  constructor(name, weight, species) {
    super(name, weight); 
	this.species = species;
  }
}

let pingu = new Penguin('pingu', 5, 'adelie');
console.log(pingu); // Penguin {name: 'pingu', weight: 5, species: 'adelie'}
```

##### `super` 호출 시 주의점 
- 서브클래스에서 `constructor`를 생략하지 않는 경우 반드시 `super`를 호출해야 한다.  
- 서브클래스의 `constructor`에서 `super`를 호출하기 전에는 `this`를 참조할 수 없다. 
- 서브클래스가 아닌 클래스의 `constructor`나 함수에 `super`를 호출할 수 없다.  


#### `super` 참조하기  
메서드 내에서 `super`를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.  
```javascript
class Cat {
  constructor(name) {
    this.name = name;
  }
	
  speak() {
    console.log(`I love boxes.`);
  }
}

class Tiger extends Cat {
  speak() {
    super.speak();
	console.log(`I love Pooh.`);
  }
}

let t = new Tiger('tigger');
t.speak(); // I love boxes.
           // I love Pooh.
```

## reference
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#extends%EB%A5%BC_%ED%86%B5%ED%95%9C_%ED%81%B4%EB%9E%98%EC%8A%A4_%EC%83%81%EC%86%8Dsub_classing)
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)

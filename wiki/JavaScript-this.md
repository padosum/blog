---
title   : JavaScript this
date    : 2021-09-14 15:29:46 +0900
updated : 2022-12-15 22:26:48 +0900
aliases: ["this"]
tags: ["JavaScript"]
---

## `this`를 왜 사용하는가?  
`this`를 어떻게 사용하는지 알기 전에 왜 사용하는지부터 생각해보자.

함수를 정의하는 시점에는 나중에 함수를 사용할 객체를 가리킬 식별자를 미리 지정하기 어렵다. 그래서 자바스크립트는 **`this`라는 특수한 식별자를 제공**한다.  
아래 코드는 `this`를 사용한 예시이다. `getDiameter`라는 함수는 `this`를 사용하여 객체 별로 따로 함수를 작성할 필요 없이 [[Object-Oriented-Programming|객체]] `circle1`과 `circle2` 모두에서 재사용이 가능하다. 
```javascript
function getDiameter() {
  return 2 * this.radius;
}

var circle1 = {
  radius: 2
};

var circle2 = {
  radius: 3
};

getDiameter.call(circle1); // 4
getDiameter.call(circle2); // 6
```

`this`를 사용하지 않고 다음 코드처럼 함수의 매개변수에 객체를 전달할 수도 있다. 하지만 `this`를 사용하는 것이 코드가 더 깔끔하고 명확하며 재사용하기 쉬워진다. 코드가 복잡해질 수록 `this`를 사용하지 않으면 코드가 더 복잡해질 것이다. 
```javascript
function getDiameter(c) {
  return 2 * c.radius;
}

var circle1 = {
  radius: 2
};

var circle2 = {
  radius: 3
};

getDiameter(circle1); // 4
getDiameter(circle2); // 6
```

## `this`에 대한 오해
`this`라는 이름 때문에 보통 두 가지 의미로 해석을 하게 된다.  
1. `this`가 함수 그 자체를 가리킨다.
2. `this`가 함수의 스코프를 가리킨다.  

먼저 `this`가 함수 그 자체를 가리키는지 다음 코드로 살펴보자.
```javascript
function foo(num) {
    console.log("foo: " + num);

    // 'foo'가 몇 번 호출됐는지 추적한다.
    this.count++;
}

foo.count = 0;
var i;
for (i=0; i<10; i++) {
    if (i > 5) {
        foo(i);
    }
}

console.log(foo.count); // 0
```
위 코드는 `foo` 함수 내부의 `this`가 함수 `foo`를 가리킨다고 가정해서 작성했다. `foo.count = 0`이라는 코드는 `foo` 함수 객체에 `count`라는 프로퍼티를 추가한다. 그 후, `for` 반복문으로 `foo` 함수를 호출하면 해당 프로퍼티의 값이 증가할 것이라는 예상을 할 수 있다. 하지만 결괏값은 `0`이다. 여기서 `this.count`는 전역 객체 `count`를 가리킨다.    

다음은 `this`가 함수의 스코프를 가리키는지 살펴보자.  
```javascript
function foo() {
    var a = 2;
    bar();
}

function bar() {
    console.log(this.a);
}

foo();// undefined
```
이 코드는 `foo()` 함수 내부에서 `bar()` 함수를 실행한다면 `foo()` 함수 내부 스코프에 있는 변수 `a`에 접근할 수 있다는 전제하에 작성한 것이다. 하지만 결과를 보면 알 수 있듯이 불가능하다. 

이처럼 `this`라는 이름으로 인해 대충 감으로 코드를 작성하다가 예상치 못한 결과를 얻을 수 있다. 그래서 이런 오해와 추측을 버리고 이어서 서술할 `this` 바인딩에 대해 정확히 인지할 필요가 있다.  

우선 `this`는 [[JavaScript-Engine|자바스크립트 엔진]]에 의해 암묵적으로 생성된다. 
함수를 호출하면 `arguments` 객체와 `this`가 함수 내부에 전달되는데 **`this`가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정**된다.

## this 바인딩
`this`와 `this`가 가리키는 값을 연결하는 과정을 `this` 바인딩이라고 한다. **자바스크립트에서는 `this` 바인딩이 함수 호출 방식에 따라 결정이된다.**
함수가 호출되는 호출부를 찾으려면 함수 호출의 연쇄를 순서대로 잘 따라가면 그려볼 수 있다. 하지만 그 과정이 복잡하다면 브라우저의 디버거 툴을 사용하면 좋다.  

```javascript
function baz() {
  // 호출 스택: 'baz'
  // 따라서 호출부는 전역 스코프 내부다.

  console.log("baz");
  bar(); // 'bar'의 호출부
}

function bar() {
  // 호출 스택: 'baz' -> 'bar'
  // 따라서 호출부는 'baz' 내부다.

  console.log("bar");
  foo(); // 'foo'의 호출부
}

function foo() {
  // 호출 스택: 'baz' -> 'bar' -> 'foo'
  // 따라서 호출부는 'bar' 내부다.

  console.log("foo");
}

baz(); // 'baz'의 호출부
```
위 코드를 Chrome 개발자 도구에서 살펴본 함수 호출 스택  
![[Call Stack.png]]

### 일반 함수 호출
기본적으로 `this`에는 전역 객체가 바인딩된다. 전역 함수, 중첩 함수, 콜백 함수 등 **일반 함수**로 함수를 호출하면 함수 내부의 `this`에는 전역 객체가 바인딩된다.  
중첩 함수나 콜백 함수는 외부 함수를 돕는 헬퍼 함수의 역할을 하는데 외부 함수인 메서드와 `this`가 일치하지 않는 다는 것은 헬퍼 함수로 동작하기 어려운 문제점이 있다. 나중에 살펴볼 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind` 메서드를 통해 `this` 바인딩을 일치시킬 수 있다.    

그 외에도 다음과 같이 `this` 바인딩을 일치시키거나,  
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
또는 [[JavaScript-Arrow-Function|화살표 함수]]를 사용해서 `this` 바인딩을 일치시킬 수도 있다. 화살표 함수 내부의 `this`는 상위 스코프의 `this`를 가리킨다.  
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

위와 같은 방법은 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind` 메서드 대신 사용 가능한 좋은 해결책이지만 `this`를 제대로 이해하고 수용하기보다는 골치 아픈 `this`에서 도망치려는 꼼수라할 수 있다.   

여러 책을 읽으면서 이런 꼼수를 사용하기에 앞서 `this`에 대해 우선 잘 이해해보자는 생각이 들었다. 

### 메서드 호출 
💡 여타 언어에서 객체(클래스)에 부속된 함수를 주로 '메서드'라 칭한다.  
메서드 내부의 `this`는 메서드를 호출한 객체를 가리킨다. **메서드를 소유한 객체가 아닌, 호출한 객체**라는 것에 주의해야 한다.  
```javascript
function greeting() {
  console.log(`👋 Hello, ${this.name}`);
}

const p1 = {
  name: "yj",
  greeting: greeting
}

p1.greeting(); // 👋 Hello, yj
```

### 생성자 함수 호출
전통적인 클래스 지향 언어의 생성자는 클래스에 붙은 특별한 메서드를 의미한다. 다음과 같이 클래스 인스턴스 생성 시 `new` 연산자로 호출된다.
```javascript
var person1 = new Person();
```

자바스크립트에서 생성자는 `new` 연산자가 있을 때 호출되는 일반 함수이다. `new` 연산자를 붙이면 다음과 같은 일들이 일어난다.  
1. 새 객체가 만들어진다.
2. 새로 생성된 객체의 [[JavaScript-Prototype|프로토타입]]이 연결된다.
3. **새로 생성된 객체는 생성자 함수 내부의 `this`로 바인딩** 된다.  
4. 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 `new`와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환한다. 

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

생성자 함수를 호출할 때 `new` 연산자 없이 호출하면 일반 함수로 동작한다. 그렇게 되면 생성자 함수 내부의 `this`는 전역 객체를 가리키게 된다. 
	
### `Function.prototype.apply/call/bind` 메서드에 의한 간접 호출
함수 레퍼런스를 객체의 프로퍼티에 추가(메서드)하지 않고 어떤 객체를 `this` 바인딩하려면 `apply`, `call`, `bind` 메서드를 이용한다. 
`apply`, `call`, `bind` 메서드는 `Function.prototype`의 메서드이다. [[JavaScript-Prototype-Chain|프로토타입 체인]]을 통해 모든 함수가 상속받아서 사용 가능하다!

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
`apply`, `call` 메서드의 기능은 함수를 호출하는 것. 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 `this`에 바인딩한다. 두 메서드는 전달 방식만 다르고 동작은 동일하다.

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
`bind` 메서드는 함수를 호출하지 않아서 명시적으로 호출해야 한다.

### this 바인딩의 우선순위  
위 4가지의 `this` 바인딩 규칙이 중복으로 해당될 때는 어떻게 바인딩될 것인지 확인해 볼 필요가 있다.  

```javascript
function foo() {
  console.log(this.a);
}

var obj1 = {
  a: 2,
  foo: foo
};

var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```
위 코드의 결과를 보면 `call` 메서드를 사용하는 것이 메서드로 호출한 것보다 우선순위가 높은 것을 알 수 있다.  

생성자 함수 호출은 어떨까? 아래 코드를 보면 생성자 함수 호출이 메서드로 호출한 것보다 우선순위가 높음을 알 수 있다.  
```javascript
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);

console.log(obj1.a);  // 2
console.log(bar.a);  // 4
```

마지막으로 `bind()`와 생성자 함수 호출을 비교해보자.  
```javascript
function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);  // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```
`new bar(3)`이 실행되어도 `obj1.a`의 값은 3으로 바뀌지 않고 그 대신 `obj1`에 바인딩 된 `bar()` 호출은 `new`로 오버라이드할 수 있다. 또한 `new`를 사용했으므로 새로 만들어진 객체가 `baz`에 할당되고 `baz.a`의 값은 3이 된다.  

`new`로 오버라이딩 하는 것은 어떤 경우일까? 기본적으로 `this` 바인딩을 무시하는 함수를 생성해서 함수 인자를 전부 또는 일부만 미리 세팅해야 할 때 유용하다. `bind()` 메서드는 최초 `this` 바인딩 이후 전달된 인자를 원래 함수의 기본 인자로 고정한다. 이런 기술을 부분 적용이라고 하는데 [[Functional-Programming|커링]]의 일종이다.  
```javascript
function foo(p1, p2) {
  this.val = p1 + p2;
}

// 'null'을 입력한 건 여기서 'this' 바인딩은
// 어차피 'new' 호출 시 오버라이드되므로 신경 쓰지 않겠다는 의미
var bar = foo.bind(null, "p1");
var baz = new bar("p2"); 
baz.val; // p1p2
```

`apply`, `call`, `bind` 메서드의 첫 번째 인자로 `null` 또는 `undefined`를 넘기면 `this` 바인딩이 무시되고 일반 함수 호출이 된다. 
```javascript
function foo() {
  console.log(this.a);
}

var a = 2;
foo.call(null); //2
```

`null`과 같은 값을 전달하는 이유로는 `apply()` 호출시 다수의 인자를 배열 값으로 펼쳐서 보내는 용도로 자주 쓰이고, `bind()`는 인자들을 커링하는 메서드로 많이 사용한다.  
ES6부터 [[JavaScript-Spread-Syntax|스프레드 연산자]]가 생겨서 `this` 바인딩이 필요없으면 `apply()` 없이 인자를 배열 형태로 전달할 수 있다.
```javascript
function foo(a, b) {
  console.log(`a: ${a}, b: ${b}`);
}

// 인자들을 배열 형태로 죽 펼친다.
foo.apply(null, [2, 3]); // a:2, b:3

// 'bind()'로 커링한다.
var bar = foo.bind(null, 2);
bar(3); // a:2, b:3
```

## reference
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- 이일웅 역, 카일 심슨 저, 《YOU DON'T KNOW JS: this와 객체 프로토타입, 비동기와 성능》, PART 1 - Chapter 1, 2

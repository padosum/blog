---
title   : JavaScript this
date    : 2021-09-14 15:29:46 +0900
updated : 2022-12-19 18:41:32 +0900
aliases: ["this"]
tags: ["JavaScript"]
---

## Goal
자바스크립트의 `this`에 대해 알아보자.

## 왜 알아보는건가?

우선 나는 자바스크립트를 배우기 전에 Java를 배웠다. 그래서 내 머릿속에 담긴 `this`는 [[JavaScript-Class|클래스]]에서 생성된 객체를 지칭하는 것으로 담겨있다.
Java에 대한 기억이 흐려져 갈 즈음에 자바스크립트 공부를 시작했다. 자연스럽게 다른 사람들의 코드도 보게 되었고 거기선 클래스를 사용하지 않는데 `this`가 쓰이는 것을 종종 보게 되었다. 그럼 이 `this`는 무엇을 가리키는 것일까? 코드를 이해하기 위해, 또 사용할 나를 위해 공부해야 한다.

## `this`를 왜 사용하는가?  
우선 `this`를 어떻게 사용하는지 알기 전에 왜 사용하는지부터 생각해보자.

책을 읽었다. 이런 내용이 담겨져 있었다.
> **`this`는 모든 함수 스코프 내에 자동으로 설정되는 특수한 식별자**로 경험 많은 자바스크립트 개발자도 정확히 무엇을 가리키는지 짚어내기가 만만치 않다.[^1]

그렇다. `this`는 내가 설정하지 않아도 모든 함수 스코프 내에서 알아서 설정되는 **특수한** 식별자다. 이렇게 자동으로 설정하는 이유는 유용함에 있을 것이다. 어떤 유용함이 있는지 알아보자.

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

## `this`, 이름 때문에 얻는 오해
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

음... 알쏭달쏭하다. `this`에 대해 내 마음대로 예상하지 않고, 잘 알고 파악하는 것이 중요하다는 것을 깨달았다!

앞서 책에서 **`this`는 모든 함수 스코프 내에 자동으로 설정되는 특수한 식별자** 라고 설명했다.  
`this`는 [[JavaScript-Engine|자바스크립트 엔진]]에 의해 암묵적으로 생성된다. 
함수를 호출하면 `arguments` 객체와 `this`가 함수 내부에 전달되는데 **`this`가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정**된다.

## this 바인딩
`this`와 `this`가 가리키는 값을 연결하는 과정을 `this` 바인딩이라고 한다. 즉, `this` 바인딩이 어떻게 되는지 알면 `this`가 무엇을 가리키는지 알게될 것이다. 

결론은 **`this` 바인딩은 함수 호출 방식에 따라 결정이된다.**

책《YOU DON'T KNOW JS: this와 객체 프로토타입, 비동기와 성능》에서 번역하신 분이 다음 시를 추가하셨다

> 꽃 - 김춘수
> 내가 그의 이름을 불러주기 전에는
> 그는 다만
> 하나의 몸짓에 지나지 않았다.
> 
> 내가 그의 이름을 불러 주었을 때
> 그는 나에게로 와서
> 꽃이 됐다.

> 내가 this를 호출하기 전에는
> 그는 다만 
> 코드 조각에 지나지 않았다.
> 
> 내가 그를 불러다 쓰려고 할 때
> 그는 나에게로 와서
> 바인딩 됐다.

이해하기에 매우 재밌는 비유라는 생각이 들었다!

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

> 💡 단, strict mode에서 전역 객체는 바인딩 대상에서 제외되서 undefined다.

중첩 함수나 콜백 함수는 외부 함수를 돕는 헬퍼 함수의 역할을 하는데 외부 함수인 메서드와 `this`가 일치하지 않는 다는 것은 헬퍼 함수로 동작하기 어려운 문제점이 있다. 나중에 살펴볼 `Function.prototype.apply`, `Function.prototype.call`, `Function.prototype.bind` 메서드를 통해 `this` 바인딩을 일치시킬 수 있다.    

그 외에도 다음과 같이 `this` 바인딩을 일치시키거나:
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

또는 [[JavaScript-Arrow-Function|화살표 함수]]를 사용해서 `this` 바인딩을 일치시킬 수도 있다. 화살표 함수 내부의 `this`는 상위 스코프의 `this`를 가리킨다:  
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

> 💡 프로그래밍 언어에서 객체(클래스)에 부속된 함수를 주로 '메서드'라 칭한다.  

메서드 내부의 `this`는 메서드를 호출한 객체를 가리킨다. 
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

`apply`, `call` 메서드의 기능은 함수를 호출하는 것. 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 `this`에 바인딩한다. 두 메서드는 전달 방식만 다르고 동작은 동일하다:
```javascript
function sum(num1, num2) {
  console.log(this);
  return num1 + num2;
}

function callSum(num1, num2) {
  const obj = {
    name: "call",
  };
  return sum.call(obj, num1, num2); // 각각 넘겨야한다.
}

function callSum1(num1, num2) {
  const obj = {
    name: "apply",
  };
  return sum.apply(obj, [num1, num2]); // 배열을 넘김
}

sum(1, 2); // 전역 객체
callSum(2, 3); // obj { name: "call" }
callSum1(1, 2); // obj { name: "apply" }
```

`bind` 메서드는 함수를 호출하지 않아서 명시적으로 호출해야 한다.
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

### apply, call, bind에 this 바인딩을 하지 않으면

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


## 생각

`this`를 공부하며 든 생각은. 여전히 헷갈린다! 무엇보다 이름의 영향이 큰 듯 싶다. 아마 `this`를 만나면 이 문서를 다시 열어볼 것이다. 공부하면서 읽은 책 중에 《자바스크립트는 왜 그 모양일까》라는 책이 있었다. 저자는 `this`를 ~~극혐~~ 아주 싫어하고 있었다. 문제도 많고 필요도 없다고 한다. 그래서 `this`를 완전히 금지해야 한다고 주장한다. 

나도 사용한다면, 다른 방법이 없을지 생각해보고 사용해야겠다. 왜냐하면 내가 이해하고 작성한다고 해도 읽는 입장에서 `this`가 뜻하는 바를 알기 위해 한번 더 생각을 거쳐야 한다면,,, 상당히 곤란하기 때문이다.

## reference
- [프론트엔드 개발자를 위한 자바스크립트 프로그래밍](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9788966260768&orderClick=LAG&Kc=) 
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
- 이일웅 역, 카일 심슨 저, 《YOU DON'T KNOW JS: this와 객체 프로토타입, 비동기와 성능》, PART 1 - Chapter 1, 2


[^1]: 이일웅 역, 카일 심슨 저, 《YOU DON'T KNOW JS: this와 객체 프로토타입, 비동기와 성능》, 29쪽
---
title: JavaScript Decorator Pattern
date: 2024-03-17 11:43:48 +0900
updated: 2024-03-31 09:50:07 +0900
aliases:
tags: ['Design Pattern', 'JavaScript']
description:
draft: false
---

앞으로 자바스크립트로 객체지향프로그래밍을 할 일이 생길 예정이다. 그래서 조금씩 공부해 보고 있는데 그중 "Decorator Pattern"이라는 것이 눈에 들어왔다.

Decorator Pattern은 디자인 패턴 중 하나이다.

영어에서 "Decorate"는"장식하다", "꾸미다"라는 의미인데 여기서 `or`을 붙여 "장식하는 도구"라고 해석할 수 있다. JavaScript Decorator Pattern에서 Decorator는 무엇을 장식하는 도구일까?

## Decorator를 사용하게 된 이유

**객체지향 프로그래밍**에서 객체를 정의하기 위해 클래스(Class)를 설계한다.  
어떤 클래스를 설계한 후에 해당 클래스에 추가적인 기능을 넣고 싶을 수 있다. 이를 위해선 간단히 해당 클래스를 수정하면 된다. 하지만 객체 지향 프로그래밍의 핵심 원칙인 OCP(개방-폐쇄 원칙)에 위배될 수 있다.

> **개방-폐쇄 원칙**(OCP, Open-Closed Principle)은 '소프트웨어 개체(클래스, 모듈, 함수 등등)는 확장에 대해 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다'는 프로그래밍 원칙이다. (위키백과)

여기서 Decorator Pattern이 등장한다. 클래스에 추가적인 기능을 넣기 위해 Decorator를 만든다. Decorator는 Decorate하려는 객체를 참조하는 클래스다.

설명만 보면 이해가 어려울 수 있으니 코드를 통해 살펴보자.

## Decorator Pattern

여기 `Coffee`라는 클래스와 이를 상속받은 `Americano` 클래스가 존재한다.

```js
class Coffee {}

class Americano extends Coffee {
  constructor(cost = 0) {
    super()
    this.cost = cost
  }

  multiply(factor) {
    this.cost *= factor
  }

  toString() {
    return `아메리카노는 ${this.cost}원이다.`
  }
}
```

아메리카노는 쓴맛에 마신다고 하지만 설탕을 추가해 마시고 싶을 수 있다. (이를테면 나처럼 커피를 못 마시는 사람인 경우)  
첫 번째로 떠오르는 방법은 `Coffee` 클래스의 `constructor`를 수정하는 것이다.

```js
class Coffee {
  constructor(sugar) {
    this.sugar = sugar
  }
}
```

이렇게 하면 간단할까? 문제는 불행히도 `Americano` 클래스도 수정해야 한다는 점이다... 결국 상속 계층 구조를 수정하게 되어 앞서 말한 OCP 원칙을 위배하게 된다. 그래서 기본 클래스(`Coffee`)를 수정하는 것이 최선의 방법이 아닐 수 있다.

여기에 Decorator Pattern을 적용해 보자. Decorator를 사용해 원래 클래스를 래핑 해 추가 정보를 넣을 수 있다.(클래스를 장식하는 것)

```js
class Coffee {}

class Americano extends Coffee {
  constructor(cost = 0) {
    super()
    this.cost = cost
  }

  multiply(factor) {
    this.cost *= factor
  }

  toString() {
    return `아메리카노는 ${this.cost}원이다.`
  }
}

class SugarDecorator extends Coffee {
  constructor(coffee, teaspoon) {
    super()
    this.coffee = coffee
    this.teaspoon = teaspoon
  }

  toString() {
    return `${this.coffee.toString()} 설탕이 ${this.teaspoon} 티스푼 들어갔다.`
  }
}

const americano = new Americano(100)
console.log(americano.toString()) // 아메리카노는 100원이다.

const americanoWithSugar = new SugarDecorator(americano, 1)
console.log(americanoWithSugar.toString()) // 아메리카노는 100원이다. 설탕이 1 티스푼 들어갔다.
```

### 주의사항

`SugarDecorator`를 사용한 것처럼 Decorator를 사용할 때 주의할 점이 있다. 코드에서 `americanoWithSugar`는 `Coffee`이기 때문에 아래와 같이 `multiply(factor)` 메서드를 호출하면 오류가 발생한다.

```js
americanoWithSugar.multiply(2)
```

다음과 같이 `coffee`를 참조해야 한다.

```js
americanoWithSugar.coffee.multiply(2)
console.log(americanoWithSugar.toString()) // 아메리카노는 200원이다. 설탕이 1 티스푼 들어갔다.
```

그리고 코드 베이스에서 동료와 함께 작업할 때 관리가 잘 이루어지지 않는다면, 어떤 객체에 동일한 decorator를 두 번 이상 적용하는 것을 막을 수 있는 방법이 없다.  
그래서 동료가 이미 설탕을 1 티스푼 넣어놨지만, 다른 사람이 3 스푼 넣어버릴 수도 있는 것이다.

```js
const americanoWithSugar = new SugarDecorator(americano, 1)
const coffeeWithSugar = new SugarDecorator(americano, 3)
```

## ES7 Decorator

JavaScript와 Decorator를 함께 검색하면 design pattern 말고도 ES7(ECMAScript 2016)에 추가된 Decorator 문법에 대한 설명도 나온다.
Decorator 문법 또한 이름에서 알 수 있듯이 클래스나 클래스 멤버 선언 시 특별한 구문을 사용해 장식하는 기능을 제공하는 것이다.  
클래스, 메서드, 프로퍼티 등에 부가적인 기능을 추가할 수 있다. Decorator 문법을 사용해 Decorator Pattern을 구현하는 데 사용될 수 있으나 그 자체로 Decorator Pattern인 것은 아니다. 코드의 가독성 및 유지 보수성을 향상시키는 것을 목표로 사용한다.

### Decorator 문법 사용하기

Decorator 문법에서 Decorator는 함수다. 함수를 생성하고 `@`를 사용해 장식해주면 된다.  
Class에 적용하는 Decorator를 만들기 위해 함수를 정의하면 해당 함수는 target이 되는 클래스의 생성자를 인자로 받는다.

```js
function withSugar(teaspoon) {
  return function (target) {
    const originalToString = target.prototype.toString

    target.prototype.toString = function () {
      return `${originalToString.call(
        this
      )} 설탕이 ${teaspoon} 티스푼 들어갔다.`
    }
  }
}
```

위와 같이 Decorator를 만들었다면 장식할 클래스 위에 적용해 주면 된다.

```js
@withSugar(1)
class AmericanoWithSugar extends Americano {}

const americanoWithSugar = new AmericanoWithSugar()
console.log(americanoWithSugar.toString()) // 아메리카노는 0원이다. 설탕이 1 티스푼 들어갔다.
```

## 글을 마치며

Decorator Pattern 외 다른 Design Pattern 도 차차 공부해야겠다. 그리고 어쩌다가 이런 패턴이 만들어졌을까 생각을 해봤는데 역시 어려움을 직접 경험해야 해결을 위한 해결책을 고민하게 된다는 것이었다. 지금 나에게 필요한 것은 "어려움을 많이 경험하기"다.

최근에 코드를 읽을 때 `@`를 발견하고 지레 겁을 먹었는데 이번에 공부를 하고 나니 마음이 조금 편해졌다. 이번에 배운 것은 문법의 아주 기본적인 부분이라서 더 공부가 필요하다. NestJs 코드를 살펴보고 문법의 심화적인 부분을 익혀야겠다.

## reference

- [Design Patterns in JavaScript](https://www.udemy.com/course/design-patterns-javascript)
- [데코레이터 만들기](https://dojang.io/mod/page/view.php?id=2427)
- [개방-폐쇄 원칙](https://ko.wikipedia.org/wiki/%EA%B0%9C%EB%B0%A9-%ED%8F%90%EC%87%84_%EC%9B%90%EC%B9%99)
- [Javascript - Decorator 문법](https://godsenal.com/posts/javascript-decorator-%/EB%AC%B8%EB%B2%95/)

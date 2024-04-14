---
title: TypeScript Interface와 객체지향 프로그래밍
date: 2024-04-14 19:41:56 +0900
updated: 2024-04-14 21:05:46 +0900
aliases: ['TypeScript Interface와 객체지향 프로그래밍']
tags: ['OOP', 'Interfaces', 'TypeScript']
---

JavaScript 객체지향 프로그래밍으로 작성된 코드를 살펴보다 `abstract` 키워드가 눈에 들어왔다. 바로 학교 때 배운 Java가 생각났고 주먹구구식으로 외운 추상 클래스, 추상 메서드 등의 단어도 생각났다. 외우기 위한 공부가 아닌 이해가 필요하다. Java나 JavaScript나 언어는 세부적으로 더 공부하면 되는 것이라 생각해서 당시 공부했던 [점프 투 자바 - 05장 객체 지향 프로그래밍](https://wikidocs.net/217) 을 열었다. 사이트는 아주 오래되었지만 그대로였다. 심지어 최종 편집일이 2023년이었다. 인터넷의 존재에 감사했다!

"Abstract Class"에 대해 알아보기 전에 객체지향 프로그래밍에서 Interface의 역할에 대해 이해하는 것이 우선이라 생각해서 먼저 공부했다.

## Interface를 클래스와 함께 사용하기

Interface가 우선이라 생각한 이유는 여러 글이나 책에서 둘은 항상 따라다녔기 때문이고 점프 투 자바의 목차에선 Interface가 먼저 나왔기 때문이다.

Interface... 하니 TypeScript가 자연스럽게 떠올랐다.
처음 TypeScript를 공부할 때 Interface를 `Type` 과 비교했었다. 예전에 면접 준비할 때도 "Type과 Interface의 차이가 무엇인가요?"라는 질문을 받았기 때문에 "Type을 선언할 때 사용한다. 그리고 [여러 차이점](https://levelup.gitconnected.com/typescript-what-is-the-difference-between-type-and-interface-9085b88ee531)이 있더라..."는 생각만 가지고 있었다.

여기에 추가로 Class는 주어진 Interface를 "구현"해서 함수와 함께 작동할 수 있다.  
코드와 함께 살펴보자.

카페를 운영하려고 한다. 다양한 메뉴가 있을 텐데, "커피"와 "스무디"를 만들어서 팔 것이다.  
그래서 다음과 같이 `Coffee` 클래스와 `Smoothie` 클래스를 만들었다. `name`, `price` 속성과 `makeInformation` 이라는 메서드를 공통으로 가지고 있다.

```ts
export class Coffee {
  name: string
  price: number

  constructor(name: string, price: number) {
    this.name = name
    this.price = price
  }

  makeInformation(): string {
    return `${this.name}은(는) ${this.price}원이다.`
  }
}

export class Smoothie {
  name: string
  price: number
  flavor: string

  constructor(name: string, price: number) {
    this.name = name
    this.price = price
  }

  makeInformation(): string {
    return `
    ${this.name}은(는) ${this.price}원이다.<br/>
    ${this.flavor} 맛이다.
    `
  }
}
```

그리고 나서 `Cafe` 클래스를 만들었다. 커피, 스무디를 판매하는 메서드가 있다. 각 메서드는 `console.log`를 실행한다.

```ts
import { Coffee } from './Coffee'
import { Smoothie } from './Smoothie'

export class Cafe {
  sellCoffee(coffe: Coffee): void {
    console.log(`${coffe.name}을(를) 판매했습니다.`)
  }

  sellSmoothie(smoothie: Smoothie): void {
    console.log(`${smoothie.name}을(를) 판매했습니다.`)
  }
}
```

```ts
// index.ts
import { Cafe } from './Cafe'
import { Coffee } from './Coffee'
import { Smoothie } from './Smoothie'

const padosumCafe = new Cafe()

const americano = new Coffee('아메리카노', 1000)
padosumCafe.sellCoffee(americano)
const smoothie = new Smoothie('딸기 스무디', 3000)
padosumCafe.sellSmoothie(smoothie)
```

위 코드를 작성하면서 중복을 제거하고 싶은 욕구를 강하게 느꼈을 것이다!
우선 두 메서드를 `sell` 이란 메서드로 합치고, 파라미터의 타입은 [Union Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) 으로 설정했다.

```ts
sell(drinkable: Coffee | Smoothie): void {
  console.log(`${drinkable.name}을(를) 판매했습니다.`)
}
```

하지만 위와 같이 Union Type을 사용하면 카페가 잘 돼서 메뉴가 늘어날 때마다 타입에 추가해야 한다. `Cafe` 클래스의 `sell` 메서드가 해당 클래스들에 종속되게 되는 것이다.
이런 경우에 Interface를 추가해서 중복을 제거할 수 있다.

```ts
export interface Drinkable {
  name: string
  price: number

  makeInformation(): string
}

export class Cafe {
  sell(drinkable: Drinkable): void {
    console.log(`${drinkable.name}을(를) 판매했습니다.`)
  }
}
```

이제 `sell` 메서드에 전달되는 파라미터는 `Drinkable` interface에 적힌 대로 구현되어야 한다.  
만약 여기서 `sizes` 라는 속성을 interface에 추가하면 어떻게 될까?

```ts
export interface Drinkable {
  name: string
  price: number
  sizes: string[]

  makeInformation(): string
}

export class Cafe {
  sell(drinkable: Drinkable): void {
    console.log(`${drinkable.name}을(를) 판매했습니다.`)
  }
}
```

`sell` 메서드를 사용하는 곳에서 오류가 나게 된다.

```ts
// index.ts
import { Cafe } from './Cafe'
import { Coffee } from './Coffee'
import { Smoothie } from './Smoothie'

const padosumCafe = new Cafe()

const americano = new Coffee('아메리카노', 1000)
padosumCafe.sell(americano) // error
const smoothie = new Smoothie('딸기 스무디', 3000)
padosumCafe.sell(smoothie) // error
```

```
Argument of type 'Coffee' is not assignable to parameter of type 'Drinkable'. Property 'sizes' is missing in type 'Coffee' but required in type 'Drinkable'
```

`sizes` 속성이 없다는 오류가 난다. 그럼 해당 오류를 해결하기 위해 `Coffee` 클래스와 `Smoothie` 클래스를 수정하러 코드 베이스를 탐색하게 된다.  
이런 경우에도 interface를 사용하기 때문에 사용하는 곳이 아닌 코드를 작성하면서 오류를 방지할 수 있다.
`implements` 키워드를 사용해 `Coffee` 클래스, `Smoothie` 클래스 등을 정의할 때 전달한 interface 대로 **구현을 강제**하면 된다.

```ts
import { Drinkable } from './Cafe'

export class Coffee implements Drinkable {
  name: string
  price: number
  sizes: string[]
  constructor(name: string, price: number, sizes: string[]) {
    this.name = name
    this.price = price
    this.sizes = sizes
  }

  makeInformation(): string {
    return `${this.name}은(는) ${this.price}원이다.`
  }
}
```

점프 투 자바의 많은 댓글 중 "상속만 사용해서 구현하도록 하면 되는 것을 왜 interface로 구현하나"라는 내용이 있었고 그에 대한 답변엔 "강제성의 유무 때문이다."라는 내용이 있었다.  
처음 읽었을 때 사실 잘 안 와닿았는데 TypeScript에서 `implements`를 사용해 클래스를 구현하면, interface 선언대로 구현하지 않는 경우 코드 작성 중 오류를 뿜기 때문에 이 강제성이 발현되는 걸 알게되었다.

## 글을 마치며

나중에 Abstract Class를 학습할 때 이번에 정리한 강제성의 유무 차이를 다시 떠올려야겠다.  
그리고 TypeScript는 타입 시스템을 통해 코드의 안전성을 향상시키는 것이라고 그 역할을 (얕은 지식으로) 단정 지었는데 객체지향 프로그래밍을 더 잘 설계할 수 있게 도와준다는 것을 알게 되었다. 다른 많은 기능들은 또 얼마나 많이 도와주게 될까? 다음 공부가 기대된다. 집중할 수 있을 때 꼭 집중해서 언어가 만들어진 철학을 잘 이해하자.

## reference

- https://wikidocs.net/217
- https://www.udemy.com/course/typescript-the-complete-developers-guide/

---
title   : 단일 접근 원칙 
date    : 2022-06-15 22:35:49 +0900
updated : 2022-06-15 23:26:43 +0900
aliases : ["단일 접근 원칙"]
tags    : ["Programming"]
---

> 한 모듈에서 제공하는 모든 서비스는 **저장된 값인지, 계산된 값인지 상관없이** 단일한 방식으로 접근이 가능해야 한다.  -Bertrand Meyer

다음과 같이 `Book` 클래스로 인스턴스 `book1`, `book2`를 생성했을 때, 가격을 알고 싶다면 `price`가 필드인지, 계산된 값(함수 호출)인지 구분할 수 없다. 같은 방식으로 접근하는 것이다. 인스턴스를 생성한 클라이언트가 가격이 저장된 가격인지 계싼된 것인지 신경쓰거나 알 필요가 없어야 한다는 것
```javascript
class Book {
  constructor(name, price, year) {
    this._name = name
    this._price = price
    this._year = year
  }

  get name() {
    return this._name
  }
  get price() {
    return this._year < 2010 ? this._price - this._price * 0.5 : this._price
  }
  get year() {
    return this._year
  }
}

const book1 = new Book('리팩터링 1판', 25000, 2002)
const book2 = new Book('리팩터링 2판', 35000, 2020)

console.log(book1.price)
console.log(book2.price)
```

단일 접근 원칙을 따르면 저장된 값을 사용하거나 계산을 하는 구현 방식을 쉽게 바꿀 수 있는 유연성을 얻게 된다. 클라이언트 입장에선 내부 구현에 신경 쓸 필요가 없게 된다.  -> **캡슐화**


## reference
- [https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=muchine98&logNo=220304656170](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=muchine98&logNo=220304656170)

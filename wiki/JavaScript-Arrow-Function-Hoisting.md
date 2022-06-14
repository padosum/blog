---
title   : 화살표 함수가 호이스팅된다는 착각 
date    : 2022-06-14 12:02:51 +0900
updated : 2022-06-14 23:36:24 +0900
aliases : ["화살표 함수가 호이스팅된다는 착각"]
tags    : ["JavaScript"]
---

다음과 같은 코드가 있었다.
```javascript
const A = () => {
  console.log("함수 A 호출")
  B()
}

const B = () => {
  console.log("함수 B 호출")
}

A()
```

[[JavaScript]]를 학습했을 때 [[JavaScript-Arrow-Function|화살표 함수]]는 [[JavaScript-Block-Level-Scope|호이스팅]]되지 않는다고 학습한 기억이 있었다. 지금에 와서는 저 코드를 아무렇지 않게 바라보지만 처음 작성했을 때 `B`함수를 선언하기 전에 `A` 함수에서 사용했고 아무런 오류가 나타나지 않으니 `B` 함수는 호이스팅되어 사용할 수 있는건가??라는 생각을 하게 되었다.

말도 안되는 착각이었다. `A` 함수를 호출한 시점에는 `B` 함수는 이미 선언된 후이기 때문이다! 단지 코드에 작성된 순서를 생각해 해서 호이스팅이 된 것이라고 착각한 것이다.

예를 들어 다음과 같이 코드가 작성된다면 오류가 뜰 것이다.
```javascript
A()

const A = () => {
  console.log("함수 A 호출")
  B()
}

const B = () => {
  console.log("함수 B 호출")
}
```
위 코드는 `A`를 선언하기 전에 `A`를 호출했다. `ReferenceError`가 발생한다.

```javascript
const A = () => {
  console.log("함수 A 호출")
  B()
}

A()

const B = () => {
  console.log("함수 B 호출")
}
```
위 코드는 `B`를 선언하기 전에 `A`를 호출했고 거기서 `B`를 호출하기 때문에 `ReferenceError`가 발생한다.

다음부터는 처음과 같은 상황이어도 당황하지 않도록 해야겠다.
## reference
[나와 같은 고민을 한 사람이 계셨다.](https://stackoverflow.com/questions/54933689/arrow-function-hoisting-in-node)

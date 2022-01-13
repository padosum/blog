---
title   : JavaScript-Symbol
date    : 2021-09-14 16:57:04 +0900
updated : 2022-01-13 22:18:00 +0900
aliases : ["Symbol"]
tags: ["JavaScript"]
---
ES6부터 새로운 원시 타입인 심벌(Symbol)이 도입되었다. 심벌은 다른 값과 중복되지 않는 유일무이한 값이다. 그래서 우연히 덮어쓰거나 변경하는게 어려워서 개발자로부터 보호가 필요할 때 사용한다. (충돌을 방지하기 위해)

## 심벌 생성하기
심벌은 `Boolean`처럼 `true`, 숫자 `13` 처럼 리터럴 표기법을 통해 값을 생성할 수 없다. 전역 함수 `Symbol`을 사용해서 만들어야 한다.
```javascript
let name = Symbol();
console.log(typeof name); // symbol
console.log(name); // Symbol()
```

`Symbol` 함수는 선택적인 인자로 서술 문자열을 받는다. 이 문자열은 프로퍼티에 접근하기 위한 용도로 사용할 순 없고 심벌을 쉽게 읽고 디버깅하는 용도로 사용한다. 값 생성이랑은 상관없다.
```javascript
let name = Symbol("user name");
let user = {};
user[name] = "padosum";

console.log("user name" in user); // false

let name2 = Symbol("user name");
console.log(name === name2); // false 
```
위 코드에서 서술 문자열은 값 생성과 상관없기 때문에 `name`과 `name2`는 서로 다른 값이다.

## 심벌 사용하기

### 심벌과 프로퍼티
객체의 프로퍼티 키도 심벌 값으로 만들 수 있다. 
`Object.defineProperty()`와 `Object.defineProperties()` 뿐 아니라 [[JavaScript-Object-Literal|계산된 객체 리터럴 프로퍼티 이름]]에도 심벌이 사용 가능하다.
```javascript
let name = Symbol();

// 계산된 객체 리터럴 프로퍼티에 사용 
let user = {
  [name]: "padosum"
};

console.log(user[name]); // padosum
```
위 코드처럼 프로퍼티를 할당할 때 심벌을 사용하면 같은 프로퍼티에 접근하려고 할 때마다 해당 심벌을 사용해야 한다. 그래서 심벌을 효율적으로 사용하기 위해서는 서로 다른 코드들 사이에 심벌을 공유하기 위한 시스템이 있어야만 한다. => [[#심벌 공유하기]]

#### 심벌 프로퍼티 탐색하기
`Object.keys()`와 `Object.getOwnPropertyNames()` 메서드를 사용해 객체의 프로퍼티 이름을 탐색할 수 있는데 두 메서드는 심벌 프로퍼티를 반환하지 않는다. 대신 심벌 값을 프로퍼티 키로 사용해 생성한 프로퍼티는 `Object.getOwnPropertySymbols()` 메서드가 ES6에 추가되었다. 
```javascript
let uid = Symbol('uid');
let obj = {
  [uid]: "123456"
};

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(uid)]

const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols[0]); // Symbol(uid)
console.log(obj[symbols[0]]); // 123456
```

`Reflect.onKeys()` 메서드를 사용하면 (Symbol 포함) 전체 키 값을 가져올 수 있다. 


## 심벌 공유하기
같은 심벌 프로퍼티를 사용해야 하는 여러 객체들이 존재하고 만약에 이 객체들이 여러 파일에 걸쳐 사용된다면, 이 심벌을 추적하고 관리하는 것이 어려울 것이다. 그래서 ES6에서 언제든지 심벌 값을 검색할 수 있는 전역 심벌 레지스트리를 제공한다.  

심벌이 공유되길 원한다면 `Symbol()` 메서드를 사용하는 대신에 `Symbol.for()` 메서드를 사용하면 된다.  
`Symbol.for` 메서드는 인수로 전달받은 문자열을 키로 사용해 키와 심벌 값이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 찾는다.  
- 검색에 성공하면 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환한다.
- 검색에 실패하면 새로운 심벌 값을 생성해서 인수로 전달된 키로 전역 심벌 레지스트리에 값을 저장한다. 그리고 생성된 심벌 값을 반환한다. 
`Symbol.for()` 메서드에 전달된 문자열은 심벌의 서술 문자열에도 사용된다.
```javascript
let symbol1 = Symbol.for("mySymbol");
let symbol2 = Symbol.for("mySymbol");

console.log(symbol1 === symbol2); // true
```

`Symbol.keyFor()` 메서드를 호출하면 전역 심벌 레지스트리에서 심벌과 관련된 키를 탐색할 수 있다.
```javascript
let uid = Symbol.for("uid");
console.log(Symbol.keyFor(uid)); // uid

let uid2 = Symbol("uid");
console.log(Symbol.keyFor(uid2)); // undefined
```
`uid2`는 `Symbol.for()` 메서드가 아닌 `Symbol()`로 생성했으므로 전역 레지스트리에 심벌이 존재하지 않는다. 그래서 `Symbol.keyFor()` 가 `undefined`를 반환한다.  

## 심벌의 타입 변환
심벌은 타입 변환에 대해 유연하지 않다. 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.
```javascript
const mySymbol = Symbol();

console.log(mySymbol + ''); // TypeError
console.log(+mySymbol); // TypeError
```

단, 불리언 타입으로는 암묵적으로 타입 변환된다. 모든 심벌은 `true`로 간주된다.
```javascript
const mySymbol = Symbol();

console.log(!!mySymbol); // true
```

## Well-known Symbols
ES6에서는 표준 객체 내부에서 전용으로 사용하던 기능들을 정의해서 전역에서 사용할 수 있도록 **"Well-know Symbols"**라는 이름으로 심벌 값을 제공한다. 
`Symbol.` 접두어를 사용한다.  
- `Symbol.hasInstance`
- `Symbol.isConcatSpreadabke`
- `Symbol.iterator`: 이터레이터를 반환한다. 
- `Symbol.match`
- `Symbol.replace`
- `Symbol.search`
- `Symbol.species`
- `Symbol.split`
- `Symbol.toPrimitive`
- `Symbol.toStringTag`
- `Symbol.unscopables`

개발자는 위의 심벌을 이용해 기존 표준 객체의 전용 기능을 다양하게 수정할 수 있다.

## reference
- 이웅모 저, 《모던 자바스크립트 Deep Dive》, 위키북스, 2020년
- 김두형·정재훈 역, 니콜라스 자카스 저, 《모던 자바스크립트》, 인사이트, 2017년

---
title   : 스프레드 연산자 
date    : 2021-04-24 09:41:56 +0900
updated : 2022-05-26 14:54:39 +0900
aliases : ["전개 구문", "스프레드 연산자"]
tags: ["JavaScript"]
---
배열이나 문자열과 같이 반복 가능한 문자를 0개 이상의 인수 또는 요소로 확장하여, 0개 이상의 키-값의 쌍의 객체로 확장시킬 수 있다. 
스프레드 연산자는 원본 배열을 변경하지 않고 복사본을 만든다.  

## 예시 
### 배열에서 사용하기 
```javascript
// 배열 조합하기  
let mammals = ["lion", "tiger", "cat"]  
let reptiles = ["turtle", "lizard"]  
let animals = [...mammals, ...reptiles]  
console.log(animals.join(', ')) // lion, tiger, cat, turtle, lizard 
```

### 함수에서 사용하기
```javascript
// 배열 최소값 구하기  
let arr = [4, 3, 5, 6, 11, 0, 9];
let min = Math.min(...arr);
// arr[0], arr[1], ... arr[6]
console.log(min) // 0 
```

[[JavaScript-Rest-Parameter|Rest 파라미터]]와 헷갈리니 유의하여 사용해야 한다.  `Rest` 파라미터는 매개변수 이름 앞에 `...`을 붙이는 것이다.
```javascript
// 함수의 인자를 배열로 가져오기  (Rest 파라미터)
function mountains(...args) {
   let [first, ...rest] = args;  // destructuring
}

mountains(
  "baekdu",
  "hala", 
  "jiri"
);
// 함수 인자의 갯수를 임의로 넘길 수 있다.  

mountains(...['baekdu', 'hala', 'jiri']); // 스프레드 연산자로 쓰임 
```

### 객체에서 사용하기 
```javascript
// 객체에서 사용하기  
const ballGame = {
  basketball: "농구",
	football: "축구",
}

const tennis = "테니스"

const favSports = {
  ...ballGame,
	tennis 
}
console.log(favSports) // {basketball: "농구", football: "축구", tennis: "테니스"}

```

### 중복 제거하기
배열을 `Set`으로 변경하면 중복이 제거된다. `Set`을 스프레드 연산자로 펼치면 배열로 사용할 수 있다.
```javascript
const arr = [1, 2, 3, 4, 1, 2, 3]
const newArr = [...new Set(arr)];
console.log(newArr) // [1, 2, 3, 4]
```

### 문자열을 배열로 변경하기
```javascript
const name = 'padosum'
console.log([...name]) // ["p", "a", "d", "o", "s", "u", "m"]
```
## reference 
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [7 ES6 Spread Operator Tricks Every Developer Should Know](https://javascript.plainenglish.io/7-es6-spread-operator-tricks-every-developer-should-know-f162d602c9d6)

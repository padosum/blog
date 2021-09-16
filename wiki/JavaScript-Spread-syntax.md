---
title   : 스프레드 연산자 
date    : 2021-04-24 09:41:56 +0900
updated : 2021-08-19 22:59:10 +0900
aliases : ["전개 구문"]
tags: ["JavaScript"]
---
- 배열이나 문자열과 같이 반복 가능한 문자를 0개 이상의 인수 또는 요소로 확장하여, 0개 이상의 키-값의 쌍의 객체로 확장시킬 수 있다. 
- 스프레드 연산자는 원본 배열을 변경하지 않고 복사본을 만든다.  

## 예시 
```javascript
// 배열 조합하기  
let mammals = ["lion", "tiger", "cat"]  
let reptiles = ["turtle", "lizard"]  
let animals = [...mammals, ...reptiles]  
console.log(animals.join(', ')) // lion, tiger, cat, turtle, lizard 

// 배열 최소값 구하기  
let arr = [4, 3, 5, 6, 11, 0, 9];
let min = Math.min(...arr);
// arr[0], arr[1], ... arr[6]

console.log(min) // 0 

// 나머지 원소 얻기  
let mammals = ["lion", "cat", "dog", "bear"] 
let [first, ...rest]  = mammals 

console.log(rest.join(", ")) // "cat, dog, bear"   

// 함수의 인자를 배열로 가져오기  
function mountains(...args) {
   let [first, ...rest] = args  
}

mountains(
  "baekdu",
	"hala",
	"jiri"
)
// 함수 인자의 갯수를 임의로 넘길 수 있다.  


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
  
  
## reference 
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

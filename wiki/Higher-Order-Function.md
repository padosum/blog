---
title   : Higher Order Function
date    : 2021-09-29 18:24:09 +0900
updated : 2021-09-29 18:24:09 +0900
tags    : ["JavaScript"]
---
**고차 함수(Higher-Order Function, HOF)**
- 함수를 인자로 전달받거나 함수를 반환하는 함수 
	- 자바스크립트 함수는 [[JavaScript-First-Class-Object|일급 객체]]이므로 함수를 함수의 인수로 전달할 수 있고 반환도 할 수 있다.  
- **외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향하는 [[Functional-Programming|함수형 프로그래밍]]에 기반을 두고 있다.**

## 배열 고차 함수  

### `Array.prototype.sort()`
배열의 요소를 정렬하고 정렬된 배열을 반환한다. 기본적으로 오름차순으로 정렬을 한다. 
배열 요소를 일시적으로 문자열로 변환해서 정렬을 하는데 '2'과 '10'을 비교하면 '10'이 앞서게 된다. ([유니코드 코드 포인트](https://d2.naver.com/helloworld/19187)의 순서를 따르기 때문)
```javascript
[2, 10].sort(); // [10, 2]
```
그래서 정렬 순서를 정의하는 비교 함수를 전달할 필요가 있다. 함수의 반환값이 0보다 작은 경우 함수의 첫 번째 인수를 우선 정렬, 0이면 정렬하지 않고, 0보다 크면 두 번째 인수를 우선 정렬한다.
```javascript
const arr = [2, 3, 1, 2, 9, 100, 33];
const sorted = arr.sort((a, b) => a - b); // [1, 2, 2, 3, 9, 33, 100]

const reverse = arr.sort((a, b) => b - a) // [100, 33, 9, 3, 2, 2, 1]
```

### `Array.prototype.forEach()`
조건문이나 반복문은 로직의 흐름을 이해하기 어렵게 하기 때문에 [[Functional-Programming|함수형 프로그래밍]]을 위해 제거하는 편이 좋다. 

**`forEach()` 는 원본 배열을 변경하지 않으며, `for` 문에 비해 성능은 좋지 않다. (내부에서는 `for`문을 통해 배열을 순회하기 때문에) 하지만 반복문이 메서드 내부로 은닉되어 로직이 이해하기 쉬워지고 코드의 가독성이 좋아진다. **
```javascript
const nums = [1200, 2300, 100];
const wons = [];

nums.forEach(item => wons.push(`${item}원`));
console.log(wons); // ['1200원', '2300원', '100원']
```

### `Array.prototype.map()`
`map()`을 호출한 배열의 모든 요소를 순회하면서 전달받은 콜백 함수를 반복 호출한다. **콜백 함수의 반환값으로 새 배열을 반환하는데, 원본 배열은 변경되지 않는다.**

```javascript
[■,■,■,■].map(■→●) ⇒ [●,●,●,●]
```

`forEach()`가 반복을 위한 함수라면, `map()`은 요소들을 다른 값으로 매핑한 새로운 배열을 생성하기 위한 고차 함수다.  

```javascript
const nums = [1, 2, 3, 4];
const pows = nums.map(item => item**2); // [1, 4, 9, 16]
```
### `Array.prototype.filter()`
`filter()`를 호출한 배열의 모든 요소를 순회하면서 전달받은 콜백 함수를 반복 호출한다. **콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환하는데, 원본 배열은 변경되지 않는다.**
```javascript
[■,●,■,▲].filter(■→true) ⇒ [■,■]
```
말 그대로 배열 요소를 필터링할 수 있는 함수이다.  
```javascript
const nums = [1, 20, 5, 30]; 
const underTen = nums.filter(item => item < 10); // [1, 5]
```

### `Array.prototype.reduce()`
`reduce()`를 호출한 배열의 모든 요소를 순회하면서 전달받은 콜백 함수를 반복 호출한다. **콜백 함수의 반환값을 다음 순회를 할 때 콜백 함수의 첫 인수로 전달하여 하나의 결과값을 만들어서 반환한다. 원본 배열은 변경되지 않는다.**  
```javascript
reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)
```
- `previousValue`: 초기값 또는 이전 콜백 함수의 반환값
- `currentValue` : 현재 요소 값
- `currentIndex` : 현재 인덱스
- `array` : `reduce` 메서드를 호출한 배열 자체 
- `initValue` : 초기값 

### `Array.prototype.some()`
`some()`을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출한다. 콜백 함수의 반환값이 단 한 번이라도 참이라면 `true`, 모두 거짓이면 `false`를 반환한다.
```javascript
[■,●,■,▲].some(●→true) ⇒ true
```
```javascript
['apple', 'banana', 'bananananana', 'orange', 'egg'].some(item => item === 'egg'); // true 
```
### `Array.prototype.every()`
`every()`를 호출한 배열의 모든 요소를 순회하면서 인수로 전달된 콜백 함수를 호출한다. 콜백 함수의 반환값이 모두 참이라면 `true`, 단 한 번이라도 거짓이면 `fase`를 반환한다.
```javascript
[■,●,■,▲].every(●→true) ⇒ false
```
```javascript
['■','●','■','▲'].every(item => item === '●') // false 
```

### `Array.prototype.find()`
`find()`를 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출해서 반환값이 `true`인 첫 요소를 반환한다. 만약 반환값이 `true`인 요소가 없다면 `undefined`를 반환한다. 
```javascript
[■,●,■,▲].find(●→true) ⇒ ●
```
```javascript
['■','●','■','▲'].find(item => item === '●') // '●'
```

### `Array.prototype.findIndex()`
`findIndex()`를 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출해서 반환값이 `true`인 첫 번째 요소의 인덱스를 반환한다. 반환값이 `true`인 요소가 없다면 `-1`을 반환한다.  

```javascript
[■,●,■,▲].findIndex(●→true) ⇒ 1
```
```javascript
['■','●','■','▲'].findIndex(item => item === '●') // 1
```
### `Array.prototype.flatMap()`
`flatMap()`은 `map()`과 `flat()` 을 순차적으로 실행한다. `flat()`은 배열을 평탄화 하는 것이다.
```javascript
let arr1 = ["it's Sunny in", "", "California"];

arr1.map(x=>x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in","California"]
```
평탄화 깊이를 지정해야 하면, `map()`과 `flat()`을 각각 호출해야 한다.  


## reference
- [https://www.reddit.com/r/learnjavascript/comments/nnlubt/really_helpful_illustration_of_js_array_methods/](https://www.reddit.com/r/learnjavascript/comments/nnlubt/really_helpful_illustration_of_js_array_methods/)
- [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
- [모던 자바스크립트 Deep Dive](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158392239&orderClick=LEa&Kc=)
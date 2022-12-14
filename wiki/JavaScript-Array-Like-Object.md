---
title   : 유사 배열 객체
date    : 2021-05-13 17:10:54 +0900
updated : 2022-12-14 20:56:59 +0900
aliases : ["유사 배열 객체"]
tags: ["JavaScript"]
---
**유사 배열 객체(array-like object)**
- 배열처럼 인덱스로 프로퍼티 값에 접근 가능하고 `length` 프로퍼티도 갖는 객체  
- ex) 문자열 타입

문자열은 유사 배열이기 때문에 `arr[1]`을 사용해서 값을 변경할 수 없다.
```js
const name = 'yj'
name[1] = 'k'
name // 'yj', 바뀌지 않는다.
```

## 진짜 배열로 바꾸기
DOM 쿼리 작업을 수행해 유사 배열 형태의 DOM 원소 리스트를 반환한 경우에 `Array.from()`을 사용해 진짜 배열로 바꿀 수 있다.
```javascript
const nodelist = document.querySelectorAll('a');
let elements = Array.from(nodelist);

Array.isArray(nodelist); // false
Array.isArray(elements); // true
```

[[JavaScript-Spread-syntax|스프레드 연산자]]를 사용해 `nodeList`를 배열로 가져올 수도 있다.
```js
const nodeList = document.querySelectorAll('p');
console.log(nodeList); // [p, p, p]const arr = [...nodeList];
console.log(Array.isArray(arr)) // true
```
[참고](https://javascript.plainenglish.io/6-use-cases-of-the-spread-operator-with-javascript-arrays-783e3da1ac1e)

## 문자열 순서 뒤집기
배열에는 `reverse()`라는 메서드가 있지만 문자열은 그렇지 않다. 그래서 문자열을 배열로 바꾼 뒤 `reverse()`를 사용하고 다시 문자열로 되돌리면 간단하게 뒤집힌 문자열을 만들 수 있다.
```javascript
let str = "hello";
console.log(str.split("").reverse().join("")); // "olleh"
```

## 같이 보기
- [[JavaScript-Built-in-Objects|래퍼 객체]]

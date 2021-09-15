---
title   : 유사 배열 객체
date    : 2021-05-13 17:10:54 +0900
updated : 2021-09-15 21:38:40 +0900
aliases : ["유사 배열 객체"]
tags: ["JavaScript"]
---
**유사 배열 객체(array-like object)**
- 배열처럼 인덱스로 프로퍼티 값에 접근 가능하고 `length` 프로퍼티도 갖는 객체  
- 문자열 타입

## 진짜 배열로 바꾸기
DOM 쿼리 작업을 수행해 유사 배열 형태의 DOM 원소 리스트를 반환한 경우에 `Array.from()`을 사용해 진짜 배열로 바꿀 수 있다.
```javascript
const nodelist = document.querySelectorAll('a');
let elements = Array.from(nodelist);

Array.isArray(nodelist); // false
Array.isArray(elements); // true
```

## 문자열 순서 뒤집기
배열에는 `reverse()`라는 메서드가 있지만 문자열은 그렇지 않다. 그래서 문자열을 배열로 바꾼 뒤 `reverse()`를 사용하고 다시 문자열로 되돌리면 간단하게 뒤집힌 문자열을 만들 수 있다.
```javascript
let str = "hello";
console.log(str.split("").reverse().join("")); // "olleh"
```

## 같이 보기
- [[JavaScript-Built-in-Objects|래퍼 객체]]

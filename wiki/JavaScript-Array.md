---
title   : JavaScript 배열
date    : 2021-09-15 16:42:55 +0900
updated : 2022-01-12 14:12:57 +0900
tags: ["JavaScript"]
---

자바스크립트에서 배열은 문자열, 숫자, 객체, 다른 배열이나 어떤 타입의 값이라도 담을 수 있다.  
배열의 크기는 미리 정하지 않고도 선언할 수 있다.

```javascript
var a = [];
a.length // 0;
a[0] = 1;
a[1] = '2';
a.length; // 2
```

## 배열 만들기
```javascript
// 배열 리터럴
const arr = []; 
const arr = [1, 2, 3];

// Array 생성자 함수
const arr = new Array(); // 빈 배열
const arr = new Array(10);
const arr = new Array(10).fill(0); // 0으로 채워진

// Array.of
Array.of(1); // [1]
Array.of(1, 2, 3); // [1, 2, 3]
Array.of('hello'); // ['hello']

// Array.from
Array.from({ length: 2 , 0: '1', 1: '2' }); // ['1', '2']
Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
Array.from({ length: 3 }, (v, i) => 0) // [0, 0, 0]

// repeat
const arr = '0'.repeat().split(''); // ['0', '0', '0']
```

## 같이 보기
- [[JavaScript-Array-Like-Object|유사 배열 객체]]


## reference
- [You Don't Know JS : 타입과 문법, 스코프와 클로저](https://m.hanbit.co.kr/store/books/book_view.html?p_code=B8227329776)

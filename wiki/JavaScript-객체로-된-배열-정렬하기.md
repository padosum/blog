---
title   : JavaScript 객체로 된 배열 정렬하기
date    : 2021-09-29 16:50:33 +0900
updated : 2021-09-29 17:55:26 +0900
aliases :
tags    : ["JavaScript", "How to"]
---
자바스크립트 객체로 구성된 배열을 알파벳 순으로 정렬하려고 한다. 보통 정렬을 할 때 `sort()`를 사용한다.
```javascript
var arr = [{'name': 'a'}, {'name': 'd'}, {'name': 'c'}, {'name': 'b'}, {'name': 'f'}, {'name' : 'k'}, {'name' :'g' }];
var sorted = arr.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
```

## `String.Prototype.localeCompare()`
`localeCompare()`를 사용하면 더 간단해진다.  
```javascript
var arr = [ {'name': '똘기'}, {'name': '떵이'}, {'name' : '호치'}, {'name': '새초미'}];
var sorted = arr.sort((a, b) => a.name.localeCompare(b.name));

// 0: {name: "떵이"}
// 1: {name: "똘기"}
// 2: {name: "새초미"}
// 3: {name: "호치"}
```

## reference
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

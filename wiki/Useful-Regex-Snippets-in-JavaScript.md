---
title   : 유용한 자바스크립트 정규표현식 코드 조각모음
date    : 2022-05-19 23:41:36 +0900
updated : 2022-05-24 17:35:18 +0900
aliases : ["유용한 자바스크립트 정규표현식 코드 조각모음"]
tags    : ["JavaScript", "How to"]
---

## 특정 문자열을 다른 문자열로 바꾸기
다음은 문자열에 포함된 콤마(`.`)를 대시(`-`)로 변경한다.
```javascript
const newString = myString.replace(/\./g, '-')
```

## 공백을 특정 문자열로 바꾸기
```javascript
let str = "Sonic Free Games";
str = str.replace(/\s+/g, '-').toLowerCase();
console.log(str); // "sonic-free-games"
```
[https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case](https://stackoverflow.com/questions/1983648/replace-spaces-with-dashes-and-make-all-letters-lower-case)

## 알파벳이 아닌 경우 공백으로 바꾸기
```javascript
string.replace(/[^A-Za-z]/g, ' ')
```

## 특정 문자열을 태그로 감싸기
```javascript
const str = '간장 공장 공장장은 강 공장장이고 된장 공장 공장장은 공 공장장이다.' 

const word = '공장'
str.replace(new RegExp(`(${word})`, 'ig'), "<em>$1</em>");
// "간장 <em>공장</em> <em>공장</em>장은 강 <em>공장</em>장이고 된장 <em>공장</em> <em>공장</em>장은 공 <em>공장</em>장이다."
```
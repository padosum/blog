---
title   : 유용한 자바스크립트 정규표현식 코드 조각모음
date    : 2022-05-19 23:41:36 +0900
updated : 2022-05-23 23:42:10 +0900
aliases : ["유용한 자바스크립트 정규표현식 코드 조각모음"]
tags    : ["JavaScript", "How to"]
---
## 특정 문자열을 다른 문자열로 바꾸기
다음은 문자열에 포함된 콤마(`.`)를 대시(`-`)로 변경한다.
```javascript
const newString = myString.replace(/\./g, '-')
```

## 알파벳이 아닌 경우 공백으로 바꾸기
```javascript
string.replace(/[^A-Za-z]/g, ' ')
```
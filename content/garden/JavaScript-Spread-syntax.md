---
title   : 전개 구문 
date    : 2021-04-24 09:41:56 +0900
updated : 2021-04-24 09:42:47 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
- 배열이나 문자열과 같이 반복 가능한 문자를 0개 이상의 인수 또는 요소로 확장하여, 0개 이상의 키-값의 쌍의 객체로 확장시킬 수 있다. 

## 예시 
```javascript
let arr = [4, 3, 5, 6, 11, 0, 9];
let min = Math.min(...arr);
// arr[0], arr[1], ... arr[6]

console.log(min) // 0 
```
  
  
## 참고 
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

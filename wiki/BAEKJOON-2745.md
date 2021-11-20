---
title   : 백준 2745 JavaScript 
date    : 2021-11-18 15:00:00 +0900
updated : 2021-11-19 08:02:46 +0900
aliases : 
tags    : 
---
## 문제
[백준 2745 - 진법 변환](https://www.acmicpc.net/problem/2745)

## 풀이
[[BAEKJOON-11005]]를 반대로 푼다고 생각하면 된다.    
예를 들어 2진법의 수를 다시 10진법으로 바꾸려면 다음과 같이 자릿수와 진법의 거듭제곱을 곱해서 다 더해주면 된다. 진법의 거듭제곱은 오른쪽부터 한자리가 높아질 수록 0부터 1씩 높아진다.  
![[boj_2745.png|진법 변환]]
자릿수는 숫자가 아닌 경우 [[BAEKJOON-11005]]와 반대로 `String.charCodeAt(0)`을 한 값에 55를 빼주면 된다.    
여기서 중요한 점은 처음 가져온 숫자를 `reverse`를 이용해 순서를 바꿔줘야 한다는 점이다. 
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split(' ');
let N = input[0].split('');
N = N.reverse();

let B = input[1];
let result = 0;

for (let i = 0; i < N.length; i++) {
  result += (B ** i) * getNumber(N[i]);
}
console.log(result);

function getNumber(code) {
  if (isNaN(parseInt(code))) {
    return code.charCodeAt(0) - 55;
  } else {
    return parseInt(code);
  }
}
```
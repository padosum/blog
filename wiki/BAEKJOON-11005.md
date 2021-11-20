---
title   : 백준 11005 JavaScript 
date    : 2021-11-18 14:01:17 +0900
updated : 2021-11-19 08:07:09 +0900
aliases : 
tags    : 
---
## 문제
[백준 11005 - 진법 변환 2](https://www.acmicpc.net/problem/11005)

## 풀이
보통 진법을 변환하는 방법으로 풀었다.  
예를 들어 10진법인 수를 2진법으로 변환하려면 다음과 같이 계산해야 한다.
![[boj_11005.png|진법 변환]]
변환하려는 숫자를 2로 계속 나누어 몫이 1이될 때까지 나누어준다. 그리고 나눠진 마지막 몫 1과 나머지들을 역순으로 가져오면 그 값이 2진수이다.  
자바스크립트로 `whie`문을 통해 숫자를 해당 진법으로 계속 나눠주고 그때마다 나머지 값을 배열에 넣는다. 여기서 진법의 수가 10이상인 경우에는 숫자에 `55`를 더하고 `String.fromCharCode`를 이용해 아스키 코드로 변경했다.  
숫자 `10`에 `55`를 더하면 `65`이고 그게 아스키 코드로하면 `A`이기 때문이다.
마지막으로 배열에 저장된 나머지들을 `reverse()` 메소드를 사용해 역순으로 가져온다.  
`whie` 문의 조건은 `N > 0` 으로 한 이유는 몫이 0이 될 때까지 계산하면 마지막 나머지가 마지막 몫에 해당되기 때문이다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split(' ');
input = input.map(v => Number(v));
let N = input[0];
let B = input[1];
let result = [];

while (N > 0) {
  result.push(getCode(N % B));
  N = parseInt(N / B);
}

console.log(result.reverse().join(''));

function getCode(number) {
  if (number >= 10) {
    return String.fromCharCode(number + 55);
  } else {
    return number;
  }
}
```


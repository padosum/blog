---
title   : 백준 17103 JavaScript 
date    : 2021-11-09 21:24:49 +0900
updated : 2021-11-09 21:27:19 +0900
aliases : 
tags    : 
---
## 문제
[백준 17103]((https://www.acmicpc.net/problem/17103))

## 풀이
다른 문제들 중 [[BAEKJOON-6588|소수를 구하는 문제]]를 응용하면 된다. 중요한 것은 값을 반복하면서 순서만 다른 경우는 제외하기 위해 구하려는 짝수의 값을 2로 나눠준다. 반 이후는 순서만 반대되는 값이 나올 것이기 때문이다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n");

const T = parseInt(input[0]);

let even = input.filter((v, i) => i !== 0).map(v => Number(v));

// 소수 구하기  
let getPrimes = (num) => {
  let sieve = new Array(num).fill(true);

  for (let i = 2; i <= num; i++) {
    if (sieve[i]) {
      for (let j = i + i; j <= num; j += i) {
        sieve[j] = false;
      }
    }
  }
  return sieve;
}

// 가장 큰 값 기준으로 소수 목록 가져옴 
const primes = getPrimes(Math.max(...even));
let result = '';
even.forEach(val => {
  let cnt = 0;
  // 순서만 다른 경우 제외하기 위해 나누기 2 
  for (let i = 2; i <= val / 2; i += 1) {
    if (primes[i] && primes[val - i]) {
      cnt++;
    }
  }
  result += `${cnt}\n`;
});

console.log(result);
```

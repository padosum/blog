---
title   : 백준 2309 JavaScript 
date    : 2022-02-14 08:46:52 +0900
updated : 2022-02-14 08:48:56 +0900
aliases : 
tags    : 
---
## 문제
[백준 2309](https://www.acmicpc.net/problem/2309)

## 풀이
[[Algorithms-7-dwarfs|예전에 풀었던 문제다.]] 문제는 문제만 기억나고 풀이가 기억나지 않았다.  기억을 되살려 문제와 코드를 찬찬히 읽어보았다.   
9명의 난쟁이가 "백설 공주와 일곱 난쟁이"의 주인공이라 주장한 것이니 **2명이 거짓말을 하고 있는 것**이다. **따라서 진짜 일곱 난쟁이의 키의 합은 100이라고 했으므로 9명 전체 키의 합을 구하고 100을 제외하면 거짓말을 하고 있는 2명의 난쟁이의 키의 합이 된다.**    
그 후에 전체 난쟁이 배열을 순회하면서 2명씩 키의 합을 구해본다. 거짓말 하고 있는 난쟁이의 키의 합과 일치하면 순회를 멈추고 그 두 값을 제외한 진짜 일곱 난쟁이들의 배열을 구하면 된다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt')
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split("\n")

const dwarfs = input.map(Number).sort((a, b) => a-b)

const sum = dwarfs.reduce((prev, curr) => prev + curr, 0)
const remain = sum - 100 // 전체 합에서 100을 빼고 남은 수
let answer 
//총 9명이므로 일곱 난쟁이가 되려면 2명이 일곱 난쟁이가 아닌 것 
// 따라서 배열을 순회하며 두 수의 합이 전체 합에서 100을 빼고 남은 수이면 
// 그 두 명이 일곱 난쟁이가 아닌 것 
for (let i = 0; i < dwarfs.length; i++) {
  for (let j = 1; j < dwarfs.length; j++) {
    if (i !== j) {
      if (dwarfs[i] + dwarfs[j] === remain) {
        answer = dwarfs.filter(val => val !== dwarfs[i] && val !== dwarfs[j])
        break;
      }
    }
  }
}
answer.forEach(v => console.log(v))
```

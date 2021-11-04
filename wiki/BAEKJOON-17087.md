---
title   : 백준 17087 JavaScript 
date    : 2021-11-04 22:17:20 +0900
updated : 2021-11-04 22:18:03 +0900
aliases : 
tags    : 
---
## 문제
[백준 17087](https://www.acmicpc.net/problem/17087)

## 풀이
우선 문제에서 수빈이가 X+D, X-D로 이동할 수 있다고 했으니 n초 후라면 X+Dⁿ 또는 X-Dⁿ으로 이동할 수가 있다.  
X+Dⁿ = Ai 일 수 있고, X-Dⁿ = Ai일 수 있다.   
그래서 예제 입력을 살펴보면,  
수빈이의 위치가 3일 때 3 - Dⁿ = 1, 3 + Dⁿ = 7, 3 + Dⁿ = 11 이므로 수빈이와 동생들의 절대적인 거리를 구하면  
Dⁿ이 될 수 있는 값은 2, 4, 8이 된다. 이렇게 구하고 나면 알고리즘을 풀 방법이 보인다. 구해야 하는 D의 값은 2, 4, 8의 최대공약수인 것이다.    
최대공약수는 [[BAEKJOON-2609]]와 마찬가지로 유클리드 호제법을 사용한다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split('\n');
let S = Number(input[0].split(" ")[1]);

let arr = input[1].split(" ");
arr = arr.map(v => {
  if (Number(v) > S) {
    return Number(v) - S;
  } else {
    return S - Number(v);
  }
});

let result = arr.reduce((prev, curr) => {
  return getGCD(prev, curr);
});

console.log(result);

// 최대공약수 구하기
function getGCD(a, b) {
  while (b > 0) {
    let tmp = a;
    a = b;
    b = tmp % b;
  }
  return a;
}
```

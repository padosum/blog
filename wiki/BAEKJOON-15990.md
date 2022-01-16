---
title   : 백준 15990 JavaScript 
date    : 2021-11-26 22:59:35 +0900
updated : 2022-01-16 11:57:29 +0900
aliases : 
tags    : 
---
## 문제
[백준 15990](https://www.acmicpc.net/problem/15990)


## 풀이
[[BAEKJOON-9095|백준 9095]]와 비슷한 문제이다.  
여기서 조건은 [[BAEKJOON-9095|백준 9095]]에서 1, 2, 3의 합으로 나타내는 방법 중에 **숫자를 연속해서 사용하면 안된다는 조건**이 있다.  

이것도 어떻게 하는지 감이 잡히지 않아 다른 사람의 코드를 참고했는데 2차원 배열을 사용하는 것을 확인할 수 있었다.  

이 문제에서는 숫자를 연속해서 사용하면 되지 않으니 합을 구성하는 마지막 숫자가 1이면 `DP[N][1]`, 2이면 `DP[N][2]`, 3이면 `DP[N][3]`으로 구분해서 저장한다. 

숫자 4까지의 합의 구성을 확인해보자.
```
1 // 1
2 // 2
3 // 2+1, 1+2, 3
4 // [1+3] 1+3
  // [3+1] 1+2+1, 3+1
```
위와 같이 연속된 숫자를 제외한 구성이 나오게 된다.  

여기서 끝자리 수를 구분해서 `DP` 변수에 저장하면
```javascript
1 // DP[1][1] = 1 

2 // DP[2][2] = 2 

3 // [2+1] -> DP[3][1] = 1
  // [1+2] -> DP[3][2] = 1
  // [3] -> DP[3][3] = 1

4 // [1+3] -> DP[4][3] = 1
  // [1+2+1] -> DP[4][1] = 1
  // [3+1] -> DP[4][1] = 2
```
위와 같이 2차원 배열이 구성되게 된다.  

정리를 하면 정수 `N`이 되도록 하는 숫자의 합 조합에서 `1`로 끝나는 경우는 그 전까지의 합이 `N-1`이 되어야 할 것이고, 마지막이 `1`로 끝나야 하므로 마지막 연산이 `1`인 경우는 제외해야 한다. (즉 `DP[N-1][1]`을 제외)  
그럼 식은 `DP[N][1] = DP[N-1][2] + DP[N-1][3]`이 된다.  
`DP[N][2]`와 `DP[N][3]`의 경우를 마찬가지로 정리하면 다음과 같이 표현할 수 있다.
```javascript
DP[N][1] = DP[N-1][2] + DP[N-1][3];
DP[N][2] = DP[N-2][1] + DP[N-2][3];
DP[N][3] = DP[N-3][1] + DP[N-3][2];
```

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().split("\n");
const T = Number(input[0]);
const num = [];
for (let i = 1; i <= T; i++) {
  num.push(Number(input[i]));
}

const MOD = 1000000009;
const MAX = 100000;
const DP = new Array(MAX + 1).fill(0).map(() => Array(4).fill(0));

DP[1] = [0, 1, 0, 0];
DP[2] = [0, 0, 1, 0];
DP[3] = [0, 1, 1, 1];

for (let i = 4; i <= MAX; i++) {
  DP[i][1] = (DP[i - 1][2] + DP[i - 1][3]) % MOD;
  DP[i][2] = (DP[i - 2][1] + DP[i - 2][3]) % MOD;
  DP[i][3] = (DP[i - 3][1] + DP[i - 3][2]) % MOD;
}

num.forEach(v => {
  console.log((DP[v][1] + DP[v][2] + DP[v][3]) % MOD);
});
```



---
title   : 백준 1309 JavaScript 
date    : 2022-01-31 10:11:38 +0900
updated : 2022-01-31 10:12:42 +0900
aliases : 
tags    : 
---
## 문제
[백준 1309]()

## 풀이
문제의 조건이 사자들이 가로, 세로 인접해서는 안되는 것이기 때문에  
만약 아래 그림에서 2번째 줄에 사자를 배치하려 한다고 가정해보면,  
1. 🔵 1번째 줄에 사자가 배치되지 않은 경우엔 좌측, 우측 모두 배치가 가능하다.
2. 🔴 1번째 줄에 좌측에만 사자가 배치된 경우, 배치를 하지 않거나 우측에만 배치가 가능하다.
3. 🟢 1번째 줄에 우측에만 사자가 배치된 경우, 배치를 하지 않거나 좌측에만 배치가 가능하다.  

![[boj_1309.jpg]]

1번째 줄은 배치를 하지 않거나(1) + 좌측에 배치(1) + 우측에 배치(1)로 총 3가지 경우가 나오게 되고 2번째 줄부터 위 세가지 조건에 따라 경우의 수를 따져보면 된다.  
```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const input = require('fs').readFileSync(readFileSyncPath).toString().trim().split('\n');
const N = Number(input[0]);
const DP = new Array(N + 1).fill(0).map(() => Array(3).fill(0));
const MOD = 9901;
// 첫 줄의 경우
DP[1][0] = 1; // 사자가 없는 경우 1
DP[1][1] = 1; // 사자가 왼쪽에 있는 경우 1
DP[1][2] = 1; // 사자가 오른쪽에 있는 경우 1

for (let i = 2; i <= N; i++) {
  // i번째 줄에 사자가 없는 경우엔, 
  // i-1번째 줄에는 없을 수도, 왼쪽에 있을 수도, 오른쪽에 있을 수도 있음
  DP[i][0] = (DP[i - 1][0] + DP[i - 1][1] + DP[i - 1][2]) % MOD;

  // 현재 줄에 사자가 왼쪽에 있는 경우엔, 
  // i-1번째 줄에는 없을 수도, 오른쪽에 있을 수도 있음
  DP[i][1] = (DP[i - 1][0] + DP[i - 1][2]) % MOD;

  // 현재 줄에 사자가 오른쪽에 있는 경우엔,
  // i-1번째 줄에는 없을 수도, 왼쪽에 있을 수도 있음
  DP[i][2] = (DP[i - 1][0] + DP[i - 1][1]) % MOD;
}

console.log((DP[N][0] + DP[N][1] + DP[N][2]) % MOD);
```


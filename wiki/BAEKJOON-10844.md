---
title   : 백준 10844 JavaScript 
date    : 2022-01-17 08:54:15 +0900
updated : 2022-01-17 08:54:27 +0900
aliases : 
tags    : 
---
## 문제
[백준 10844](https://www.acmicpc.net/problem/10844)

## 풀이
문제를 풀기 위해 `N`이 주어질 때 나오는 계단 수를 확인해보자.
```
N = 1,
1, 2, 3, 4, 5, 6, 7, 8, 9

N = 2,
10, 12, 21, 23, 32, 34, ...

N = 3,
101, 121, 123, 210, 212, 232, 234, ... 
```

`N=1`인 경우는 0으로 시작하는 수는 없다고 했으므로 0을 제외한 한 자리수들이 나오고,  
`N=2`인 경우에는 `N-1`일 때 수에서 1의 자리 수에 `+1`이나 `-1`을 한 수를 붙인 수가 나온다는 것을 확인할 수 있다. 그럼 다음과 같이 정리가 된다. 

- 1의 자리 숫자가 `0`인 경우 
	- `DP[N][0] = DP[N-1][1]`
	- `0`의 경우에 `-1`을 한 수는 없고 `+1` 한 수만 
- 1의 자리 숫자가 `1~8`인 경우
	- `DP[N][1의 자리수] = DP[N-1][1의 자리 수-1] + DP[N-1][1의 자리 수 +1]`
- 1의 자리 숫자가 `9`인 경우 
	- `DP[N][9] = DP[N-1][8]`

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const N = parseInt(require('fs').readFileSync(readFileSyncPath).toString().trim());

const MOD = 1000000000;
const DP = new Array(101).fill(0).map(() => Array(11).fill(0));

for (let i = 1; i <= 9; i++) {
  DP[1][i] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 0; j <= 9; j++) {
    if (j === 0) {
      DP[i][j] = DP[i-1][1];
    } else if (j === 9) {
      DP[i][j] = DP[i-1][8];
    } else {
      DP[i][j] = DP[i-1][j-1] + DP[i-1][j+1] % MOD;
    }
  }
}

let answer = 0;
for (let i = 0; i < 10; i++) {
  answer += DP[N][i];
}

console.log(answer % MOD);
```
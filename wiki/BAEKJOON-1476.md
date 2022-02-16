---
title   : 백준 1476 JavaScript 
date    : 2022-02-16 12:13:50 +0900
updated : 2022-02-16 13:03:56 +0900
aliases : 
tags    : 
---
## 문제
[백준 1476](https://www.acmicpc.net/problem/1476)

## 풀이 
이 문제의 풀이는 년도를 증가시키면서 해당 년도와 주어진 수가 일치하는지 확인해보면 된다.  
일치 여부는 나머지를 확인하는데 예를 들어 문제에 주어진 예시를 살펴보면  
```
1 16 16
```
여기서 `1`은 15까지 증가하다가 16년이 되면 다시 `1`이 된다. 그렇다면 답이되는 년도는 15로 나눴을 때 `1`이 남아야 한다. 결국 `년도 - 1`을 `15`로 나누면 나머지는 `0`이어야 하는 것이다. 이런식으로 3가지 수의 조건과 모두 일치하게 되는 년도를 구하면 된다.  

문제 자체는 어렵지 않다. 다만 백준에서 이 풀이가 메모리초과가 뜨는데 Node.js로 풀면 종종 그런적이 많았다. Java로 푼 다음 다른 사람의 제출을 봤는데 그대로 붙여넣어도 메모리초과가 떴다. 나중에 확인해봐야겠다.

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
const [E, S, M] = require('fs').readFileSync(readFileSyncPath).toString().trim().split(" ").map(Number);

let year = 1 
while (true) {
  if ((year - E) % 15 === 0 && (year - S) % 28 === 0 && (year - M) % 19 === 0) {
    console.log(year);
    break;
  }
  year++;
}
```

---
title   : BAEKJOON-1002
date    : 2021-09-15 14:13:06 +0900
updated : 2021-09-15 14:13:06 +0900
---
## 문제
- [백준 1002번](https://www.acmicpc.net/submit/1002)

## 풀이  
- 주어진 좌표를 그려보면 원이 두개 그려짐을 알 수 있다.
- 류재명이 있을 수 있는 좌표는 조규현의 원과 백승환의 원을 이루는 점이 겹치는 부분이다.
- 결과를 만들기 위해 따져봐야 하는 경우는 총 4가지이다.
	1. 두 점에서 만나는 경우 (두 원이 겹치는 경우)
	2. 한 점에서 만나는 경우 (내접, 외접)
	3. 원이 일치하는 경우 
	4. 동심원
		- 두 원의 중심이 같고 반지름이 다른 경우 
	5. 원이 만나지 않는 경우 

### 두 점에서 만나는 경우
두 점에서 원이 만나면 서로 겹친다는 이야기다. 두 원이 서로 겹치려면 작은 원의 반지름보다 가까운 거리에서 만나야 한다. 그래서 두 원의 반지름을 더한 값이 원 사이 중심거리보다 커야 하고, 큰 원의 반지름에서 작은 원의 반지름을 뺀 값이 중심거리보다 작야아 한다.

```
r + r' > d &&  r' - r < d
```

### 한 점에서 만나는 경우 
#### 외접
```
r + r' = d
```

#### 내접
```
r' - r = d
```

### 동심원 
두 원의 중심이 같은 경우, 중심거리가 0이다. 
```
d = 0
```

```javascript
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
for(let i=1; i < input.length; i++) {
  let [x1, y1, r1, x2, y2, r2] = input[i].split(' ');
  x1 = Number(x1);
  y1 = Number(y1);
  r1 = Number(r1);
  x2 = Number(x2);
  y2 = Number(y2);
  r2 = Number(r2);
  // 두 원의 중심거리
  let d = Math.sqrt((x2-x1)**2 + (y2-y1)**2); 

  if(d === 0) {
    if (r1 === r2) // 원이 일치하는 경우
      console.log(-1);
    else 
      console.log(0); // 동심원 
  } else {
    // 내접 or 외접 하는 경우
    if(Math.abs(r2-r1) === d || r2 + r1 === d) {
      console.log(1);
    } else if (d > Math.abs(r2-r1) && d < r1+r2) { // 두 점에서 만나는 경우 
      console.log(2);
    } else { // 만나지 않는 경우
      console.log(0);
    }
  }
}
```

## reference
- [수학방 - 원](https://mathbang.net/101)
- [수학방 - 좌표사이 거리](https://mathbang.net/138)
---
title   : 홀수
date    : 2021-04-25 10:01:16 +0900
updated : 2021-04-25 10:01:24 +0900
aliases : 
tags: ["Algorithm"]
---
## 문제
- 주어진 배열에서 홀수들의 합과 홀수 중 가장 작은 값 반환하기  

## 풀이 
```javascript
function solution(arr) {
    let answer = []; 
    let sum = 0; 
    let min = Number.MAX_SAFE_INTEGER; 

    for (let i of arr) {
        if (i % 2 !== 0) {
            sum += i; 
            if (i < min) min = i 
        }
    }
    answer.push(sum);
    answer.push(min);
    return answer; 
}

let arr = [12, 77, 38, 41, 53, 92, 85]
console.log(solution(arr));
```
- `Number.MAX_SAFE_INTEGER`는 JavaScript에서 안전한 최대 정수값 

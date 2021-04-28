---
title   : 알고리즘 문제 해결 전략 06 - 무식하게 풀기  
date    : 2021-04-28 10:08:09 +0900
updated : 2021-04-28 10:08:24 +0900
aliases : ["06 무식하게 풀기"]
private : false
hidden  : false
showReferences : true
---
[[Brute-Force-Search-Algorithm]]

## 재귀호출과 완전 탐색 
**재귀 함수(recursive function), 재귀 호출(recursion)**
- 재귀 함수는 자신이 수행할 작업을 유사한 형태의 여러 조각으로 쪼갠 뒤 그 중 한 조각을 수행, 나머지를 자기 자신을 호출해 실행하는 함수  

### 예시 
1부터 n까지의 합을 계산하는 반복 함수와 재귀 함수  

```javascript
// 반복 함수 이용 
function solution(num) {
    let answer = 0;

    for(let i = 1; i <= num; i++) {
        answer += i;
    }
    return answer;
}
console.log(solution(10));

// 재귀 함수 이용 
function solution(num) {
    if (num === 1) return 1;
    return num + solution(num-1); 
}
console.log(solution(10));
```
- n개의 숫자의 합을 구하는 작업을 n개의 조각으로 쪼개기, 더할 각 숫자가 하나의 조각이 되도록  
- '더이상 쪼개지지 않는' 최소한의 작업에 도달했을 때 답을 곧장 반환하는 조건문을 포함해야 한다.  
  - **쪼개 지지 않는** 가장 작은 작업 → 재귀 호출의 기저 사례(base case)라고 한다.  
- 기저 사례를 선택할 때는 존재하는 모든 입력이 항상 기저 사례의 답을 이용해 계산될 수 있도록 신경써야 한다.  
- 

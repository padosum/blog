---
title   : 1부터 n까지의 합 구하기
date    : 2021-04-25 09:00:54 +0900
updated : 2021-04-25 09:01:05 +0900
aliases : ["1부터 n까지의 합 구하기"]
---
## 문제
- 1부터 주어진 수(n)까지의 합 구하기

## 풀이 
```javascript
function solution(n){
    let answer=0;
    for(let i=1; i<=n; i++){
        answer += i;
    }
    
    return answer;
}

console.log(solution(10));
```  
- **변수를 초기화하는 것, 범위에 대해 주의하자!!**
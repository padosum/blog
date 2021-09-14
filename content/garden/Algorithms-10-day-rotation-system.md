---
title   : 차량 10부제
date    : 2021-04-25 10:02:37 +0900
updated : 2021-04-26 14:29:36 +0900
tags: ["Algorithm"]
---
## 문제 
- 차량 10부제, 자동차 번호의 일의 자리 숫자와 날짜의 일의 자리 숫자가 일치하면 해당 자동차의 운행을 금지하는 것  
- 날짜의 일의 자리수, 자동차의 번호 끝 두자리 수가 주어졌을 경우 위반 차량의 수를 출력 

## 풀이 

```javascript
function solution(day, arr) {
    let answer = 0;
    for(let num of arr) {
        if (day == num % 10) {
                answer++; 
        }
    }
    return answer;
}

arr = [12, 20, 54, 30, 87, 91, 30];
console.log(solution(0, arr));
```
- 처음 문제를 보고 `substring` 따위를 생각했었다. 하지만 풀이를 보고 나니 10으로 나누면 1의자리가 나온다는 간단한 사실을 뒤늦게 깨달았다. 
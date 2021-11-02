---
title   : 백준 6588 JavaScript 
date    : 2021-11-01 22:31:08 +0900
updated : 2021-11-02 21:54:52 +0900
aliases : 
tags    : 
---
## 문제
- [백준 6588](https://www.acmicpc.net/problem/6588)

## 풀이 
해당 숫자보다 작은 소수를 구하고 합이 해당 숫자가 되는 경우를 출력하면 되는데  
소수를 구할 때 [에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)를 이용한다.  
에라토스테네스의 체로 소수를 찾는 방법에 대한 코드는 우선  
1. 2부터 소수를 구하고자하는 숫자까지 모든 수를 나열하고 (`true`로 이뤄진 배열을 만든다.) 
2. 자기 자신을 제외한 2의 배수를 모두 지운다 (해당 인덱스 `false` 처리)
3. 남아있는 수 가운데 3은 소수이므로 (`true` 이므로) 모두 지운다. (해당 인덱스 `false` 처리)  
4. 위 과정을 계속 반복하면 구하고자하는 숫자까지의 소수만 남는다. (`true`인 값이 소수)

위와 같이 소수를 구한 다음에는 입력값을 순회하면서 구해놓은 소수 배열을 순회한다.  
`현재 값 - 소수`가 소수이면 해당되는 조합이므로 출력한다.  

```javascript
const readFileSyncPath = require('path').basename(__filename).replace(/js$/, 'txt');
// const readFileSyncPath = '/dev/stdin';
let input = require('fs').readFileSync(readFileSyncPath).toString().trim().split('\n');

// 소수 구하기
let primes = (num) => {
  let sieve = new Array(num).fill(true);

  for(let i=2; i<=num; i++) {
    if(sieve[i]) {
      for (let j=i+i; j<=num; j+=i) {
        sieve[j] = false;
      }
    }
  }
  return sieve;
}

// 마지막 0 제외 
input = input.filter(v => v !== "0");
// 숫자로 변환 
input = input.map(v => Number(v));

// 가장 큰 값 기준으로 소수 목록 가져옴 
const numbers = primes(Math.max(...input));

input.forEach(val => {
  for (let i=3; i < val; i+=2) {
    // (현재 값 - 소수)가 소수면 
    if (numbers[i] && numbers[val - i]) {
      console.log(`${val} = ${i} + ${val - i}`);
      break;
    }
  }
});
```

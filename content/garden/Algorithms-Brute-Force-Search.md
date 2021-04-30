---
title   : 완전 탐색 (Brute-Force Search) 문제 
date    : 2021-04-28 10:03:10 +0900
updated : 2021-04-29 21:09:57 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1 
- N개의 자연수 입력, 각 자연수 자릿수의 합을 구하고 그 합이 최대인 자연수를 출력
- 자릿수의 합이 같은 경우 원래 큰 숫자를 출력 

## 풀이 1 
```javascript
function solution(arr) {
    let answer;
    let max = Number.MIN_SAFE_INTEGER;

    for(let x of arr) {
        let sum = 0;
        let num = x.toString();
        for(let i = 0; i < num.length; i++) {
            sum += parseInt(num[i]); 
        }

        if(sum > max) {
             max = sum; 
             answer = num; 
        } else if (sum == max) {
            if (parseInt(answer) < parseInt(num)) {
                answer = num; 
            }
        }
    }
    return answer;
}
let numbers = [128, 460, 603, 40, 521, 137, 123]; // 137
console.log(solution(numbers));
```
## 문제 2 
- N개의 자연수 입력, 각 자연수를 뒤집어서 소수이면 소수를 출력 

## 풀이 2 
```javascript
function isPrime(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    if (num > 1)
        return true;
}
function solution(arr) {
    let answer = [];

    for (let x of arr) {
        let reverse = parseInt(x.toString().split('').reverse().join(''));

        if (isPrime(reverse))
            answer.push(reverse);

    }

    return answer;
}

let numbers = [32, 55, 62, 20, 250, 370, 200, 30, 100]; // [ 23, 2, 73, 2, 3 ]
console.log(solution(numbers));
```

## 문제 3
- 멘토링 짝 만들기 문제  
- N명의 학생이 총 M번의 수학 테스트를 했을 때 한 학생이 M번의 수학 테스트에서 모두 등수가 앞서야 멘토, 멘티가 성립  

## 풀이 3 
```javascript
function solution(test) {
    let answer = 0;
    let n = test.length; 
    let m = test[0].length;

    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= m; j++) {
            let cnt = 0;

            for(let k = 0; k < n; k++) {
                let pi = 0; 
                let pj = 0; 
                for(let s = 0; s < m; s++) {
                    if(test[k][s] === i) {
                        pi = s;
                    }
                    if(test[k][s] === j) {
                        pj = s;
                    }
                }
                if(pi < pj) {
                    cnt++; 
                }

                if(cnt === n) {
                    answer++;
                }
            }

        }
    }

    return answer;
}

let test = [
    [3, 4, 1, 2],
    [4, 3, 2, 1],
    [3, 1, 4, 2]
]
console.log(solution(test));
```
- 최대한 이해하려고 노력했다. 대충 이해는 되는데... 이틀 뒤에 다시봐야겠다.  

## 문제 4 
- 상품

## 풀이 4 
- 총 비용으로 정렬하기  
```javascript
function solution(order, budget) {
    let answer = 0;
    order.sort((a, b) => (a[0]+a[1]) - (b[0]+b[1]));

    for(let i = 0; i < order.length; i++) {
        let money = budget - (order[i][0]/2 + order[i][1]); 
        let cnt = 1;
        for(let j=0; j<order.length; j++) {
            if(j!== i && (order[j][0] + order[j][1]) > money) break;
            if(j !== i && (order[j][0] + order[j][1]))  {
                money -= (order[j][0] + order[j][1]);
                cnt++; 
            }
        }

        answer = Math.max(answer, cnt);
    }

    return answer;
}

let products = [
    [6, 6],
    [2, 2],
    [4, 3],
    [4, 5],
    [10, 3] 
]
console.log(solution(products, 28));
```

## 문제 5
- 1 부터 100 사이의 자연수가 적힌 N장의 카드, 그 중 3장을 뽑아 합한 값을 기록 -> k번째 큰 값은?

## 풀이 5 
```javascript
function solution(n, k, cards) {
    let answer = [];
    let sum = 0; 

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            for(let s = 0; s < n; s++) {
                if(i !== j && j !== s && i !== s) {
                    sum = cards[i] + cards[j] + cards[s]; 
                    answer.push(sum);
                }
            }
        }
    }
    answer = [...new Set(answer)];
    answer = answer.sort((a, b) => b-a);
    console.log(answer);
    return answer[k-1];
}

let arr = [13, 15, 34, 23, 45, 65, 33, 11, 26, 42];
console.log(solution(10, 3, arr));
```
- `Set`에 대해 저번에 공부했음에도 불구하고 바로 떠오르지 않았다.  
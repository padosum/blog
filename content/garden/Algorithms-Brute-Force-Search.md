---
title   : 완전 탐색 (Brute-Force Search) 문제 
date    : 2021-04-28 10:03:10 +0900
updated : 2021-04-28 17:15:13 +0900
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


## 풀이 3 

---
title   : 배열 탐색 문제
date    : 2021-04-27 13:45:05 +0900
updated : 2021-04-27 13:45:17 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1 
- 배열을 입력받고 바로 앞의 수보다 큰 수만 출력하기  
- 첫번째는 무조건 출력  

## 풀이 1 
```javascript
function solution(numbers) {
    let answer = [];
    answer.push(numbers[0]); 

    for(let x in numbers) {
        if(numbers[x-1] < numbers[x]) {
            answer.push(numbers[x]);
        }
    }

    return answer;
}

let array = [1, 9, 3, 7, 11, 2];
console.log(solution(array)); // [1, 9, 7, 11]
```

## 문제 2 
- 사람의 키 배열이 주어졌을 때, 앞 사람**들**보다 키가 큰 사람의 수를 출력  

## 풀이 2 
```javascript
function solution(arr){ 
    let answer = 1;
    let maxHeight = arr[0];
    for (let x in arr) {
        if(maxHeight < arr[x]) {
            answer++; 
            maxHeight = arr[x];
        }
    }
    return answer; 
}
let people = [120, 165, 165, 155, 182, 170, 155, 169];
console.log(solution(people)); // 3
```

## 문제 3 
- 가위바위보 대결을 한다. 가위바위보 대결 횟수 N과, A가 낸 가위바위보 정보 N개의 배열, B가 낸 가위바위보의 정보 N개의 배열이 주어진 뒤 승자(A or B)를 출력하고 비기면 D를 출력  
- 1은 가위, 2는 바위, 3은 보 

## 풀이 3  
```javascript
function solution(game, arr1, arr2) {
    let answer = [];

    for(let i = 0; i < game; i++) {
        let a = arr1[i];
        let b = arr2[i];
        if(a === b) {
            answer.push('D');
        } else {
            switch (a) {
                case 1:
                    if (b === 2) answer.push('B');
                    else answer.push('A');
                    break;
                case 2: 
                    if (b === 3) answer.push('B');
                    else answer.push('A');
                    break;
                case 3:
                    if (b === 1) answer.push('B');
                    else answer.push('A');
                    break;
            }
        }
    }
    
    return answer;
}

let person1 = [2, 3, 3, 1, 3];
let person2 = [1, 1, 2, 2, 3];
console.log(solution(5, person1, person2)); // ["A", "B", "A", "B", "D"]
```

## 문제 4 
- 입력 배열로 채점 결과가 주어진다. 배열 값의 0은 답이 틀린 것, 1은 답이 맞은 경우이다. 처음 맞은 문제는 1점 K번 연속으로 맞은 문제는 K점이다. 틀린 문제는 0점이다. 총점을 출력하라.  

## 풀이 4
```javascript
function solution() {
    let answer = 0;
    let add = 0; 
    for(let x of score) {
        if(x === 1) {
            add++;
            answer += add;
        } else {
            add = 0;
        }
    }
    return answer;
}
let score = [1, 0, 1, 1, 1, 0, 0, 1, 1, 0]; // 10
console.log(solution(score));
```
## 문제 5 
- 점수 배열이 입력되면 해당 점수의 등수를 배열로 출력한다.  
- 같은 점수가 입력되면 높은 등수로 동일 처리, 90점이 1등인 경우에 3명이 존재하면 그 다음 점수는 4등이 되는 것  

## 풀이 5
```javascript
function solution(arr) {
    let n = arr.length;
    let answer = Array.from({length:n}, () => 1);

    for(let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(arr[j] > arr[i]) answer[i]++; 
        }
    }
    return answer;
}

let scores = [87, 89, 92, 100, 76, 100];
console.log(solution(scores));
```
- 계속 풀어보려고 시도했는데 매우 간단한 문제였다. 최대값을 구할 필요 없이 각자 서로 비교해 적은 쪽에 1을 더해주면 되는 문제였다.  등수가 밀리니깐 

## 문제 6

## 풀이 6
```javascript
function solution(arr) {
    let answer = Number.MIN_SAFE_INTEGER;
    let n = arr.length; 
    let sumRow, sumCol = 0;

    for(let i = 0; i < n; i++) {
        sumRow = sumCol = 0; 
        for(let j = 0; j < n; j++) {
            sumRow += arr[i][j];
            sumCol += arr[j][i]; 
        }
        answer = Math.max(answer, sumRow, sumCol); 
    }
    sumRow = sumCol = 0; 
    for(let i = 0; i < n; i++) {
        sumRow += arr[i][i]; 
        sumCol += arr[i][n-i-1];
    }
    answer = Math.max(answer, sumRow, sumCol); 
    return answer;
}
let array = [
    [10, 13, 10, 12, 15],
    [12, 39, 30, 23, 11],
    [11, 25, 50, 53, 15],
    [19, 27, 29, 37, 27],
    [19, 13, 30, 13, 19]
]
console.log(solution(array)); // 155 
```
## 문제 7

## 풀이 7 
```javascript
function solution(arr) {
    let answer = 0;
    let n = arr.length; 

    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            let left = j-1 < 0 ? 0 : arr[i][j-1];
            let right = j + 1 >= n ? 0 : arr[i][j+1];
            let top = i-1 < 0 ? 0 : arr[i-1][j];
            let bottom = i + 1 >= n ? 0 : arr[i+1][j]; 

            if(arr[i][j] > Math.max(left, right, top, bottom)){
                answer++; 
            }
        }
    }
    
    return answer;
}
let array = [
    [5, 3, 7, 2, 3],
    [3, 7, 1, 6, 1],
    [7, 2, 5, 3, 4],
    [4, 3, 6, 4, 1],
    [8, 7, 3, 5, 2]
]
console.log(solution(array)); 
```

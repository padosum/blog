---
title   : 효율성 문제
date    : 2021-04-30 14:01:56 +0900
updated : 2021-04-30 14:02:06 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1 
- 정렬된 두 배열의 입력, 오름차순으로 합치기  
## 풀이 1 
```javascript
function solution(n, m) {
    let answer = [];
    let len = n.length > m.length ? m.length : n.length;

    for(let i = 0; i < len; i++) {
        console.log(n[i], m[i])
        if(n[i] > m[i]) {
            answer.push(m[i]);
            answer.push(n[i]);
        } else {
            answer.push(n[i]);
            answer.push(m[i]);
        }
    }

    for(let j = len; j < m.length; j++) {
        answer.push(m[j]);
    }
    for(let k = len; k < n.length; k++) {
        answer.push(n[k]);
    }
    return answer;
}

let arr1 = [1, 3, 5];
let arr2 = [2, 3, 6, 7, 9];

console.log(solution(arr1, arr2)); // [1, 2, 3, 3, 5, 6, 7, 9]
```

## 문제 2 
- 두 집합의 공통 원소를 추출해 출력하기  

## 풀이 2 
```javascript
function solution(set1, set2) {
    let answer = [];

    set1.forEach(function(val) {
        if(set2.has(val)) {
            answer.push(val);
        }
    });

    answer = answer.sort((a,b) => a-b);

    return answer;
}

let set1 = new Set([1, 3, 9, 5, 2]);
let set2 = new Set([3, 2, 5, 7, 8]);

console.log(solution(set1, set2));
```
- `Set`의 `has()`나 `Array`의 `includes`를 사용하면 간편하지만 for문안에서 O(n)이 들어가 O(n²)이 되어 시간복잡도가 커진다.  

- 시간 복잡도를 줄이기 위해선 다음과 같이 two pointers 알고리즘을 사용해야 한다.  
```javascript
function solution(arr1, arr2) {
    let answer = [];
    arr1.sort();
    arr2.sort();
    let p1 = 0;
    let p2 = 0;

    while(p1 < arr1.length && p2 < arr2.length) {
        if(arr1[p1] === arr2[p2]) {
            answer.push(arr1[p1++]);
            p2++; 
        }
        else if(arr1[p1] > arr2[p2]) p2++;
        else p1++;
    }

    return answer;
}


let a = [1, 3, 9, 5, 2];
let b = [3, 2, 5, 7, 8];

console.log(solution(a, b));
```

## 문제 3
- 수열 입력, 수열에서 연속 부분 수열의 합이 특정숫자가 되는 경우가 몇 번 있는지 출력 
## 풀이 3 
```javascript
function solution(arr, target) {
    let answer = 0;
    let sum = 0;

    let p1 = 0;
    let p2 = 1;

    while(p1 < arr.length && p2 < arr.length) {
        if(sum == 0) {
            sum += arr[p1] + arr[p2];
        } else {
            sum += arr[p2];
        }

        if (sum < target) {
            p2++; 
        } else {
            if(sum == target) answer++;
            sum = 0;
            p1++;
            p2 = p1 + 1;    
        }
    }

    return answer;
}


let arr = [1, 2, 1, 3, 1, 1, 1, 2];
console.log(solution(arr, 6));
```

## 문제 4
- 연속 부분 수열 합이 특정숫자 이하가 되는 경우의 수 구하기 
## 풀이 4 
```javascript
function solution(arr, target) {
    let answer = 0;
    let sum = 0;

    let p1 = 0;
    let p2 = 1;

    let temp = [];

    for(let x of arr) {
        if(x <= target) {
            answer++; 
        }
    }

    temp = [];
    while(p1 < arr.length && p2 < arr.length) {
        if(sum == 0) {
            sum += arr[p1] + arr[p2];
        } else {
            sum += arr[p2];
        }

        if(sum > target) {
            sum = 0;
            p1++;
            p2 = p1 + 1;
        } else {
            answer++;
            p2++;
        }
    }

    return answer;
}

let array = [1, 3, 1, 2, 3];
console.log(solution(array, 5));
```

## 문제 5
- 슬라이딩 윈도우 알고리즘  

## 풀이 5
```javascript
function solution(arr, k) {
    let answer = 0;
    let sum = 0;
    for(let i = 0; i < k; i++) {
        sum += arr[i]; 
    }
    answer = sum; 

    for(let i = k; i < arr.length; i++) {
        sum += (arr[i]-arr[i-k]);
        answer = Math.max(sum, answer); 
    }
    return answer;
}

let recored = [12, 15, 11, 20, 25, 10, 20, 19, 13, 15];
console.log(solution(recored, 3));

```
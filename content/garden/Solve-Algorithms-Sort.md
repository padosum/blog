---
title   : 정렬 알고리즘 문제
date    : 2021-05-05 16:55:41 +0900
updated : 2021-05-06 14:48:34 +0900
aliases : 
tags: ["Algorithm"]
---
## 문제 1 
- 선택정렬 오름차순 
## 풀이 1
```javascript
function solution(arr) {

    for(let i=0; i < arr.length-1; i++) {
        let min_idx = i; 
        for(let j=i+1; j < arr.length; j++) {
            if(arr[j] < arr[min_idx]) {
                min_idx = j; 
            }
        }
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]]
    }

    return arr;
}

let arr = [13, 5, 11, 7, 23, 15];
console.log(solution(arr));
```

## 문제 2
- 버블정렬 오름차순 
  
## 풀이 2 
```javascript
function solution(arr) {
    let answer = arr;

    for(let i=0; i < arr.length-1; i++) {
        for(let j=0; j < arr.length-1-i; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }

    return answer;
}

let arr = [13, 5, 11, 7, 23, 15];
console.log(solution(arr));
```

## 문제 3 
- 버블정렬 응용, 음수는 앞에 양수는 뒤로 양수와 음수끼리의 순서는 바뀌지 않도록  

## 풀이 3 
```javascript
function solution(arr) {
    let answer = arr;

    for(let i=0; i<arr.length-1; i++) {
        for(j=0; j<arr.length-1-i; j++) {
            if(arr[j] > 0 && arr[j+1] < 0) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }

    return answer;
}

let arr = [1, 2, 3, -3, -2, 5, 6, -6];
console.log(solution(arr));
``` 

## 문제 4
- 캐시 삽입정렬 LRU 
## 풀이 4 
```javascript
function solution(cacheSize, task) {
    let answer = Array.from({length: cacheSize}, () => 0);

    task.forEach(x => {
        let pos = answer.indexOf(x);

        if(pos === -1) {
            for(let i=cacheSize-1; i>=1; i--) {
                answer[i] = answer[i-1];
            }
        } else {
            for(let i=pos; i>=1; i--) {
                answer[i] = answer[i-1];
            }
        }

        answer[0] = x;
    });
    return answer;
}

let task = [1, 2, 3, 2, 6, 2, 3, 5, 7]
console.log(solution(5, task));
```

- 메소드 사용하기
```javascript
function solution(cacheSize, task) {
    let answer = Array.from({length: cacheSize}, () => 0);

    task.forEach(x => {
        let pos = answer.indexOf(x);

        if(pos === -1) {
            answer.unshift(x); 
            if(answer.length > cacheSize) answer.pop();
        } else {
            answer.splice(pos, 1);
            answer.unshift(x);
        }
    })


    return answer;
}


let task = [1, 2, 3, 2, 6, 2, 3, 5, 7] 
console.log(solution(5, task));
```

## 문제 5
- 뒤바뀐 두 부분 찾기  

## 풀이 5
```javascript
function solution(arr) {
    let answer = [];
    let sortArr = arr.slice(); 
    sortArr.sort((a, b) => a-b);

    for(let i=0; i<arr.length; i++) {
        if(arr[i] !== sortArr[i]) answer.push(i+1);
    }
    return answer;
}

let arr = [120, 125, 152, 130, 135, 135, 143, 127, 160];
console.log(solution(arr));
```

## 문제 6
- 좌표 정렬하기

## 풀이 6
```javascript
function solution(arr) {
    let answer = arr.slice();

    answer.sort((a, b) => {
        if(a[0] === b[0]) return a[1] - b[1];
        else return a[0]-b[0];
    })

    return answer;
}

let arr=[[2, 7], [1, 3], [1, 2], [2, 5], [3, 6]];
console.log(solution(arr));
```

## 문제 7
- 2차원 배열, 회의 시간 정하는 문제  

## 풀이 7 
```javascript
function solution(arr) {
    let answer = 0;

    arr.sort((a, b) => {
        if(a[1] === b[1]) return a[0] - b[0];
        else return a[1] - b[1];
    })

    let et = 0;
    for(x of arr) {
        if(x[0] >= et) {
            answer++;
            et = x[1];
        }
    }

    return answer;
}

let arr = [[1,4],[2,3],[3,5],[4,6],[5,7]];
console.log(solution(arr));
```
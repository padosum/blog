---
title   : 백준 1018 JavaScript 
date    : 2022-04-22 23:50:36 +0900
updated : 2022-04-22 23:51:46 +0900
aliases : ["백준 1018번 체스판 다시 칠하기"] 
tags    : 
---
## 문제
[백준 1018](https://www.acmicpc.net/problem/1018)

## 풀이
```javascript
const fs = require('fs');
const readFileSyncPath = '/dev/stdin';
//const readFileSyncPath = 'input_1018.txt';
const input = require('fs').readFileSync(readFileSyncPath).toString().split('\n');

let [n, m] = input[0].split(' ');
n = Number(n);
m = Number(m);
let arr = new Array(n);
for(let i=1; i<=n; i++) {
  arr[i-1] = input[i].split('');
}
let paintCnt = [];
//let str = ''

for(let i = 0; i <= n - 8; i++) {
  for(let j = 0; j <= m - 8; j++) {
    let before = '';

    // 2가지 경우, W으로 시작 or B로 시작 
    for(let z = 0; z < 2; z++) {

      let cnt = 0;
      before = z === 0 ? 'W' : 'B';

      for(let x = 0; x < 8; x++) {
        let isNewLine = true; // 새 줄 여부

        for(let y = 0; y < 8; y++) {

          const current = arr[x+i][y+j];
            
            // 이전 값과 비교
            if(isNewLine) { // 새 줄이면 이전 값과 다를 때 변경
              if (current !== before) {
                cnt++;
                before = current === 'W' ? 'B' : 'W'; 
              } else {
                before = current;
              }
            } else { // 새 줄이 아니면 이전 값과 같을 때 변경
              if (current === before) {
                cnt++; 
                before = current === 'W' ? 'B' : 'W'; 
              } else {
                before = current;
              }
            }
          
          // str += arr[x+i][y+j]; 
          isNewLine = false; 
        }
        //str += '\n';
      }
      paintCnt.push(cnt);
    }
    
    //str += '---------------\n';
  }
  //str += '================\n';
}
console.log(Math.min(...paintCnt));
```

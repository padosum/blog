---
title   : 2019 카카오 개발자 겨울 인턴십 문제
date    : 2021-04-27 21:58:38 +0900
updated : 2021-04-27 21:58:59 +0900
aliases : ["2019 카카오 개발자 겨울 인턴십 문제"]
---
## 크레인 인형뽑기 게임 
```javascript
function solution(board, moves) {
    let answer = 0;
    let n = board.length;
    let stack = [];

    for (let i = 0; i < moves.length; i++) {
        let pop = moves[i]-1;
        for (let j = 0; j < n; j++) {
            if (board[j][pop] !== 0) {
                console.log(`${board[j][pop]}을 꺼내다.`)
                if (stack.length > 0) {
                    console.log(`비교대상: ${board[j][pop]}, ${stack[stack.length - 1]}`)
                    if (board[j][pop] === stack[stack.length - 1]) {
                        console.log('사라지다.')
                        answer++;
                        stack.pop();
                    } else {
                        stack.push(board[j][pop]);
                    }
                } else {
                    stack.push(board[j][pop]);
                }
                console.log(`stack ${stack}`)
                board[j][pop] = 0;
                break;
            }
        }
    }
    return answer;
}

let board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3], 
    [0, 2, 5, 0, 1], 
    [4, 2, 4, 4, 2], 
    [3, 5, 1, 3, 1]];

let moves = [1, 5, 3, 5, 1, 2, 1, 4];
console.log(solution(board, moves));
```
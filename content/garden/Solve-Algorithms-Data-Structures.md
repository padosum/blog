---
title   : 자료구조 문제
date    : 2021-05-04 19:59:32 +0900
updated : 2021-05-04 22:53:33 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 문제 1 
- 올바른 괄호인지 확인  

## 풀이 1
```javascript
function solution(str) {
    let answer = "YES";
    let stack = [];

    for(let x of str) {
        if(x === '(') stack.push(x); 
        else {
            if(stack.length === 0) answer = "NO"; 
            stack.pop(); 
        }
    }

    if(stack.length !== 0) {
            answer = "NO";
    }

    return answer;
}

let q = '(((((((())))))';
console.log(solution(q));
```
- if문을 엄청 넣었었는데 stack에 `)`를 넣는 경우는 처음이라면 잘못된 것이고 빼내야 한다는 간단한 사실을 생각못한게 문제였다.  

## 문제 2 
- 괄호 사이의 문자 제거하기

## 풀이 2 
```javascript
function solution(str) {
    let answer = '';
    let stack = [];

    for(let x of str) {
        if(x === ')') {
            let temp = stack.pop();
            while(temp !== '(') {
                temp = stack.pop();
            }
        } else {
            stack.push(x);
        }
    }

    answer = stack.join('');

    return answer;
}

let str = '(A(BC)D)EF(G(H)(IJ)K)LM(N)';
console.log(solution(str));
```

## 문제 4
- 후위연산식 

## 풀이 4  
```javascript
function solution(postfix) {
    let answer;
    let stack = [];
    let op1, op2; 

    for(let x of postfix) {
        if(!isNaN(x)) stack.push(Number(x))
        else {
            op1 = stack.pop();
            op2 = stack.pop();

            switch(x) {
                case "+":
                    stack.push(op1 + op2);
                    break;
                case "-":
                    stack.push(op2 - op1);
                    break;
                case "*":
                    stack.push(op1 * op2);
                    break;
                case "/":
                    stack.push(op2 / op1);
                    break; 
            }
        }
    }
    answer = stack[0];
    return answer;
}


let postfix = "352+*9-";
console.log(solution(postfix));
```  
- 숫자가 아닌 값이 들어가면 `isNaN()`은 `true`를 반환  

## 문제 5
- 레이저로 막대 가르기 

## 풀이 5
```javascript
function solution(arrange) {
    let answer = 0;
    let stack = [];

    for(let i = 0; i < arrange.length; i++) {
        if(arrange[i] === '(') {
            stack.push(arrange[i]);
        } else {
            stack.pop();
            if(arrange[i-1] === '(') answer += stack.length;
            else answer++; 
        }
    }
    return answer;
}


let arrange = '(()()())(((())))'; // 10
console.log(solution(arrange)); 
```

## 문제 6
- 큐 문제   

## 풀이 6
```javascript
function solution(n, k) {
    let answer;
    let queue = Array.from({length:n}, (v, i) => i+ 1);

    while(queue.length > 0) {
        for(let i = 1; i < k; i++) queue.push(queue.shift());
        queue.shift();
        if(queue.length === 1) answer = queue.shift(); 
    }
    
    return answer;
}

console.log(solution(8, 3));
```
- `shift()`를 알면 간단히 풀 수 있다.  


## 문제 7
- 큐 문제 2 
## 풀이 7 
```javascript
function solution(essential, plan) {
    let answer = "YES";
    let queue = essential.split('');

    for(let x of plan) {
        if(queue.includes(x)) {
            if(x!== queue.shift()) answer = "NO"; 
        }
    }
    if(queue.length > 0) answer = "NO";
    return answer;
}

console.log(solution('CBA', 'CBDAGE'));
```
- 큐로 정해야 하는 것과 아닌 것을 구분 잘하는게 중요하다.  
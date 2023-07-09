---
title   : Node.js에서 디버깅하기 
date    : 2023-07-09 08:44:20 +0900
updated : 2023-07-09 08:49:24 +0900
aliases : ["Node.js에서 디버깅하기"]
draft : false
tags    : ["Node.js", "How to"]
---

## Goal
Node.js를 커맨드라인에서 실행했을 때 디버깅하는 방법을 안다.


## Debugger

앞으로 사용할 일이 많이 있을진 모르겠지만 사용할 일이 생겨서 알게되었다.  

JavaScript와 마찬가지로 디버깅하고 싶은 라인에 `debugger`를 추가한다.

```js
function steps(n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
      result += "#";
    }
    result += " ".repeat(n - i - 1);
    debugger; // ⬅️
  }
}
```

그리고 `inspect` 옵션과 함께 실행한다.  
```sh
node inspect steps/index.js
```

다음과 같이 디버깅할 수 있는 화면이 표시된다.
```
< Debugger listening on ws://127.0.0.1:9229/3cba0521-d0ed-4380-bf19-85ad75902db5
< For help, see: https://nodejs.org/en/docs/inspector
<
< Debugger attached.
<
 ok
Break on start in steps/index.js:32
 30 }
 31
>32 module.exports = steps;
 33
debug>
```
이 화면에서  
- 다음 단계로 이동하려면 `next`나 `n`을 입력하면 된다.  
- `repl` 명령으로 현재 breakpoint의 값을 읽어낼 수 있다.  
  - <kbd>Ctrl</kbd> + <kbd>C</kbd>로 빠져나올 수 있다.

## reference
- [Node.js documentation](https://nodejs.org/api/debugger.html#stepping)

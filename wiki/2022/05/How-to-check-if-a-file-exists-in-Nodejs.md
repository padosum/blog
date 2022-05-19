---
title   : Node.js에서 파일이 존재하는지 확인하는 방법 
date    : 2022-05-19 23:47:43 +0900
updated : 2022-05-19 23:51:30 +0900
aliases : ["Node.js에서 파일이 존재하는지 확인하는 방법"]
tags    : ["Node.js", "How to"]
---

## Goal
`fs` 모듈을 사용해 파일이 존재하는지 확인하는 방법 알아보기

## fs.existsSync()

`fs.existsSync()` 메서드를 사용해서 파일이 존재하는지 확인할 수 있다.
```javascript
const fs = require('fs')
const filePath = './text.md'

if (fs.existsSync(filePath)) {
  // 파일이 존재하는 경우 처리할 내용
}
```

## reference
- [https://flaviocopes.com/how-to-check-if-file-exists-node/](https://flaviocopes.com/how-to-check-if-file-exists-node/)

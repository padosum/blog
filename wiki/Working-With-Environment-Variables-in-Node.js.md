---
title   : Node.js에서 환경 변수 사용하기
date    : 2022-11-03 23:40:38 +0900
updated : 2022-11-04 00:10:33 +0900
aliases : ["Node.js에서 환경 변수 사용하기"]
tags: ["Node.js", "How to"]
draft : false
---

## Goal
Node.js에서 환경 변수를 사용하는 방법을 알아보자.



## 환경 변수
환경변수를 사용하면 프로그래밍시 필요한 값을 지정해뒀다가 사용할 수 있다.
Node.js에서는 프로젝트 디렉토리에 `.env`라는 이름의 파일이 존재하면 해당 변수를 소스코드로 가져와서 사용할 수 있다.
변수는 `key=value` 형태로 사용한다.
```
key=value 
PORT=8080
```

## Node.js에서 환경 변수 사용하기

`.env` 파일을 불러와서 사용하기 위해선 `dotenv` 패키지를 먼저 설치해야 한다.
```bash
npm install dotenv
```

설치를 했다면 다음과 같이 사용하면 된다.
```js
require('dotenv').config()
console.log(process.env.PORT) // 8080
```


## 같이 보기
- [https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html](https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html)

---
title   : Visual Studio 확장 프로그램 Code Runner로 TypeScript 실행하기   
date    : 2021-08-02 22:28:31 +0900
updated : 2021-08-02 22:39:46 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
자바스크립트를 Code Runner를 이용해 간단히 실행할 수 있었는데 아무 설정 없이 타입스크립트는 가능하지 않았다.  
검색을 해보니 `ts-node`를 우선 설치해줘야 했다.  
`npm i ts-node -g`  

그리고 Preperences > Settings > Extensions > Run Code configuration > Code-runner: Executor Map > Edit in settings.json 파일 내에서 설정이 되어있어야 한다. 기본적으로 `ts-node`로 이미 되어있는 것을 확인할 수 있었다. 
```json
"code-runner.executorMap": {
  "typescript": "ts-node"
}
```  

## reference 
- [https://devjang.github.io/2018/04/29/2018-04-29-run-simple-ts/](https://devjang.github.io/2018/04/29/2018-04-29-run-simple-ts/)

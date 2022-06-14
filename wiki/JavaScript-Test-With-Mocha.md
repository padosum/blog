---
title   : Mocha로 JavaScript 테스트 코드 작성하기 
date    : 2022-06-14 21:38:10 +0900
updated : 2022-06-14 23:36:48 +0900
aliases : ["Mocha로 JavaScript 테스트 코드 작성하기"]
tags    : ["JavaScript", "Test"]
---
## Goal
[[TDD]]를 위한 자바스크립트 테스트 코드 작성시 필요한 작업을 내가 나중에 확인할 수 있도록 정리하기

## Mocha 설치
```shell
$ npm install mocha
```

Mocha는 테스트 [[Framework|프레임워크]]이다. `describe`, `it`과 같은 테스팅 함수, 테스트 실행 관련 주요 함수를 제공한다.

## Chai 설치
```shell
$ npm install chai
```
Chai는 다양한 assertion(단언, 확언)을 제공해주는 라이브러리이다. 테스트를 검증할 수 있다.
`assert.equal` 또는 `expect`문을 사용할 수 있다.

## 테스트 코드 작성하기
```javascript
describe('pow', () => {
  it('n 제곱', () => {
    assert.equal(pow(2, 3), 8)
  })
})
```

## nodemon을 이용해 스크립트가 변경되었을 때마다 테스트하기

우선 `nodemon`을 설치한다.
```shell
$ npm install nodemon
```

`package.json` 파일의 `script` 항목에 다음과 같이 스크립트를 추가한다.
```json
  "scripts": {
    "test": "nodemon --exec 'mocha ${0}'",
    "test-all": "mocha ***/*.test.js",
    "test-watch": "nodemon --exec \"npm run test-all\""
  },
```
- `test 파일명`: 파라미터로 전달한 파일 테스트
- `test-all`: `.test.js`로 끝나는 파일 테스트
- `test-watch`: 스크립트가 변경되었을 때마다 (저장) 테스트

## reference
- [https://ko.javascript.info/testing-mocha](https://ko.javascript.info/testing-mocha)
- [https://stackoverflow.com/questions/67227294/how-to-run-test-with-nodemon-and-mocha](https://stackoverflow.com/questions/67227294/how-to-run-test-with-nodemon-and-mocha)
- [https://github.com/roy-jung/refactoring](https://github.com/roy-jung/refactoring)
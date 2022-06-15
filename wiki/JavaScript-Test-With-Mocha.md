---
title   : Mocha로 JavaScript 테스트 코드 작성하기 
date    : 2022-06-14 21:38:10 +0900
updated : 2022-06-15 14:53:01 +0900
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

일반적으로 `it` 구문 하나에 검증도 하나씩만 하는 것이 좋다. 앞 검증을 통과하지 못하면 나머지 검증은 해보지 못하고 테스트가 실패하기 때문이다.

### beforeEach
`beforeEach` 구문은 각각의 테스트 바로 전에 실행된다. 각 테스트 모두 공통된 객체를 사용하고 있을 때 최상단으로 변수를 끌어올려서 사용하면, 테스트 실행시마다 해당 객체가 변경될 수 있으므로, `beforeEach`를 이용해 매번 새로운 변수를 사용할 수 있도록 하는 것이 좋다.
```javascript
describe("province", () => {
  let v
  beforeEach(() => {
    v = new Rectangle(12)
  })
  // ...
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
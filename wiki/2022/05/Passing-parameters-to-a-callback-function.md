---
title   : JavaScript에서 콜백 함수로 파라미터를 넘기는 방법 
date    : 2022-05-13 23:33:13 +0900
updated : 2022-05-13 23:58:43 +0900
aliases : ["JavaScript에서 콜백 함수로 파라미터를 넘기는 방법"]
tags    : ["How to", "JavaScript"]
---
## Goal
JavaScript에서 callback 함수에 파라미터를 넘길 수 있는 방법 알아보기

[[JavaScript-Async-Await|JavaScript async/await]]을 사용해 비동기 처리를 하는 함수에 콜백 함수를 전달하고 `await`에 리턴 받는 값을 콜백 함수에 전달해 실행하고 싶었다. 어떻게 하면 좋을지 생각해보고 코드를 작성했는데 "이렇게 해도 되나?" 하는 고민이 생겼다. 구글링해서 검색을 해보니 [문서](https://www.geeksforgeeks.org/javascript-passing-parameters-to-a-callback-function/) 하나를 발견할 수 있었다. 

다음과 같이 `await` 키워드에 반환된 값을 콜백 함수의 파라미터로 넘겨줘서 실행시키면 된다.
```javascript
const request = async (url, callback) => {
  try {
	  const response = await fetch(param)
	  callback(response) // 콜백 함수에 파라미터 넘겨주기
  } catch (e) {
    console.log(e)
  } finally {
  }
}

request('https://something.com', (res) => {
    console.log(res)
})
```


## reference
- [https://www.geeksforgeeks.org/javascript-passing-parameters-to-a-callback-function/](https://www.geeksforgeeks.org/javascript-passing-parameters-to-a-callback-function/)

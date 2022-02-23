---
title   : fetch GET 요청시 파라미터 넘기기  
date    : 2022-02-23 14:32:11 +0900
updated : 2022-02-23 14:32:31 +0900
aliases : ["fetch GET 요청시 파라미터 넘기기"]
tags    : ["JavaScript"]
---
## Goal 
`fetch()`로 `GET` 요청을 할 때 쿼리 스트링(파라미터)을 넘기는 방법 알아보기  

여러 강의나 다른 사람의 코드를 보고 `Axios` 만 대충 사용하다가 [[JavaScript-Promise|fetch API]] 사용법에는 익숙하지 않은 나를 발견할 수 있었다. url에 `?어쩌구=저쩌구` 이런 식으로 파라미터를 넘겨야 하는데 손이 꼼짝도 하지 않았다. 이번 기회를 통해 사용하는 방법을 배웠다.  

```javascript
fetch('https://example.com?' + new URLSearchParams({
    foo: 'value',
    bar: 2,
}))
```
자바스크립트에서 객체를 문자열과 `+` 연산하면 해당 객체의 `toString()` 함수가 호출된다.  -> [[JavaScript-Type-Casting]]  
`URLSearchParam`의 `toString()` 함수는 query 파라미터를 string으로 바꿔주기 때문에 위와 같이 코드를 작성할 수 있다. 

## reference
- [https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request](https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request)
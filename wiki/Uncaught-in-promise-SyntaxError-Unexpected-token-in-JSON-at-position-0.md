---
title   : Uncaught (in promise) SyntaxError Unexpected token < in JSON at position 0 에러 원인 찾기 
date    : 2022-03-04 15:45:41 +0900
updated : 2022-03-04 15:52:34 +0900
aliases :
tags    : ["Error", "JavaScript", "How to"]
---

프로젝트를 배포하고 서버에서 실행하니 다음과 같은 오류가 나타났다.
```
Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
```
## 에러 구문 분석하기
- `in promise` : `fetch`를 사용했을 때 응답된 `promise` 쪽에서 에러가 발생했다.
- `Unexpected token < in JSON at position 0`: JSON으로 파싱 중에 `<`을 발견했다. 파싱하는 값이 JSON 형식이 아니라는 의미다.

## 오류 원인 찾아보기
`fetch`로 받은 데이터를 JSON으로 파싱하는 부분을 찾는다.  

1. Developer Tools > Network 탭에서 새로고침을 해본다.
2. 요청된 api 이름을 선택하고 Response된 값을 확인한다.  

![[check-response.png]]

나의 경우엔 proxy 설정을 잘못해서 json이 아닌 html 값이 응답되는 것이 문제였다.
상황에 맞게 해결하는 것이 중요할 듯 하다.

## reference
- [https://mchch.tistory.com/174](https://mchch.tistory.com/174)

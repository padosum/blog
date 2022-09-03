---
title   : React 빌드 후 API 통신 오류 문제 
date    : 2022-08-15 21:29:51 +0900
updated : 2022-08-15 21:39:59 +0900
aliases : 
tags    : ["react", "How to"]
---


## 문제

로컬에서 API 통신시 cors 문제가 발생해서 프록시 설정을 해줬었습니다.

```jsx
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3080',
      changeOrigin: true,
    })
  )
}
```

그 후에 배포를 하려고 `npm run build` 로 빌드를 했는데 오류가 나타났습니다.

```jsx
Uncaught SyntaxError: Unexpected token '<' in <!DOCTYPE html>
```

검색해보니 다양한 이유로 나타나는 오류였는데 저의 경우엔 첫 화면이 아닌 API 호출 시 나타나는 것을 확인할 수 있었습니다.

## 해결

알고보니 proxy 설정은 개발환경에서만 지원된다고 합니다! 

따라서 환경변수를 이용해 환경에 따라 api 호출을 다르게 해줘야 했습니다.

프로젝트 루트에 `.env.production` 과 `.env.development` 파일을 만들고 아래와 같이 환경변수를 설정해줍니다. 변수명은 꼭 `REACT_APP_` 으로 시작해야한다고 합니다.

### `.env.production`

```bash
REACT_APP_API_HOST=http://localhost:3080
```

### `.env.development`

```bash
REACT_APP_API_HOST=""
```

그러고 나서 api 호출 시 다음과 같이 환경변수를 사용하면 됩니다

```jsx
const BASE_URL = process.env.REACT_APP_API_HOST
API.get(`${BASE_URL}/api/menu`)
```

이렇게 해주면 로컬에서는 프록시 설정을 해준 루트로 api 호출이 되서 cors 에러가 나지 않고 빌드한 파일에서는 지정해준 경로로 api를 호출하게 됩니다.

## 참고 자료

[https://codingapple.com/forums/topic/리액트-build-시-setupproxy-js-파일/](https://codingapple.com/forums/topic/%EB%A6%AC%EC%95%A1%ED%8A%B8-build-%EC%8B%9C-setupproxy-js-%ED%8C%8C%EC%9D%BC/)

[https://velog.io/@ezae/React-build배포-후-api-response-문제](https://velog.io/@ezae/React-build%EB%B0%B0%ED%8F%AC-%ED%9B%84-api-response-%EB%AC%B8%EC%A0%9C)

## 문제

로컬에서 API 통신시 cors 문제가 발생해서 프록시 설정을 해줬었습니다.

```jsx
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3080',
      changeOrigin: true,
    })
  )
}
```

그 후에 배포를 하려고 `npm run build` 로 빌드를 했는데 오류가 나타났습니다.

```jsx
Uncaught SyntaxError: Unexpected token '<' in <!DOCTYPE html>
```

검색해보니 다양한 이유로 나타나는 오류였는데 저의 경우엔 첫 화면이 아닌 API 호출 시 나타나는 것을 확인할 수 있었습니다.

## 해결

알고보니 proxy 설정은 개발환경에서만 지원된다고 합니다! 

따라서 환경변수를 이용해 환경에 따라 api 호출을 다르게 해줘야 했습니다.

프로젝트 루트에 `.env.production` 과 `.env.development` 파일을 만들고 아래와 같이 환경변수를 설정해줍니다. 변수명은 꼭 `REACT_APP_` 으로 시작해야한다고 합니다.

### `.env.production`

```bash
REACT_APP_API_HOST=http://localhost:3080
```

### `.env.development`

```bash
REACT_APP_API_HOST=""
```

그러고 나서 api 호출 시 다음과 같이 환경변수를 사용하면 됩니다

```jsx
const BASE_URL = process.env.REACT_APP_API_HOST
API.get(`${BASE_URL}/api/menu`)
```

이렇게 해주면 로컬에서는 프록시 설정을 해준 루트로 api 호출이 되서 cors 에러가 나지 않고 빌드한 파일에서는 지정해준 경로로 api를 호출하게 됩니다.

## 참고 자료

[https://codingapple.com/forums/topic/리액트-build-시-setupproxy-js-파일/](https://codingapple.com/forums/topic/%EB%A6%AC%EC%95%A1%ED%8A%B8-build-%EC%8B%9C-setupproxy-js-%ED%8C%8C%EC%9D%BC/)

[https://velog.io/@ezae/React-build배포-후-api-response-문제](https://velog.io/@ezae/React-build%EB%B0%B0%ED%8F%AC-%ED%9B%84-api-response-%EB%AC%B8%EC%A0%9C)

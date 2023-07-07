---
title   : MSW로 Redux Toolkit Query 테스트하기
date    : 2023-07-07 21:29:25 +0900
updated : 2023-07-07 21:48:52 +0900
aliases : ["MSW로 Redux Toolkit Query 테스트하기"] 
draft : false
tags : ["Testing", "Vitest", "MSW", "RTKQ"]
---

## Goal

Vitest에서 MSW로 Redux Toolkit Query(이하 RTKQ)를 테스트할 때 오류가난다. 이를 해결해보자.


## 문제

기존에 `axios`로 데이터 fetching을 처리하고 있었다.  
MSW를 사용해 API 요청을 mocking하고 있었는데 이것도 잘 작동하고 있었다.  
하지만 API 요청을 RTKQ로 변경하고 나니 테스트에 오류가 실패했다.  

에러는 다음과 같았다.  
```
TypeError: Failed to parse URL from /api/someResource
```

바뀐 것이 API 요청 부분 밖에 없고 에러도 이와 관련되어 보이니 API 요청 문제가 확실해 보였다.  

생각해보니 당연한 것이었다. `axios`는 라이브러리를 `import` 해오는 것이었는데 RTKQ는 무엇을 이용해 데이터를 가져오는지 생각 못하고 있었다.  

RTKQ의 `fetchBaseQuery`는 `window.fetch` API의 [wrapper](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery)다. 따라서 데이터를 가져올 때 [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 사용하는 것인데 Test 환경은 브라우저가 아니다. 그래서 `fetch`를 사용하지 못한다.  

찾아보니 `fetch`를 사용할 수 있도록 다른 라이브러리를 사용하는 것을 확인할 수 있었다. 나는 그중에 `cross-fetch`를 사용했다.

## `fetch` polyfill

`cross-fetch`를 설치한다.
```sh
npm i cross-fetch
```


Vitest setup file에 `global.fetch`를 `cross-fetch`에서 가져온 것들로 교체한다.  

```ts
import { fetch, Headers, Request, Response } from 'cross-fetch'

global.fetch = fetch
global.Headers = Headers
global.Request = Request
global.Response = Response
```

`vitest.config.ts` 파일의 `setupFiles` 옵션에 앞서 작성한 setup file을 추가한다.
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // ...
    setupFiles: ['./tests/setup.ts'],
  },
})
```

## reference
- [https://markus.oberlehner.net/blog/using-mock-service-worker-with-vitest-and-fetch/](https://markus.oberlehner.net/blog/using-mock-service-worker-with-vitest-and-fetch/)
- [https://gustavocd.dev/posts/testing-rtk-query-with-msw/](https://gustavocd.dev/posts/testing-rtk-query-with-msw/)


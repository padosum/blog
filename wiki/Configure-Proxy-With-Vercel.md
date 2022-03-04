---
title   : Vercel에서 proxy 설정하기 
date    : 2022-03-04 15:35:56 +0900
updated : 2022-03-04 15:36:32 +0900
aliases : ["Vercel에서 Proxy 설정하기"]
tags    : 
---
## Goal
Vercel에서 Proxy 설정하는 방법 알아보기

## Vercel.json 
[[404-Not-Found-In-Vercel-With-Vite|Vercel에서 배포 후 404 Not Found가 나타나는 문제]]를 통해 특정 url에 사용자가 접근했을 때 다른 url로 보내는 `rewrites` 설정을 알게되었다. 결국 이게 프록시 역할을 하는 것인데 생각 처럼 작동이 되지 않았다. 아무리 다시 배포를 해도!  

SPA 프로젝트라 어떤 요청에도 `'/'`로 가도록 설정을 해두었는데 이것이 문제였다. 
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    },
    {
      "source": "/api/test",
      "destination": "http://myapi.com/api/test"
    }
  ]
}
```

다른 프레임워크를 공부할 때 라우팅하는 부분이 생각났다. 모든 요청이 `rewrites` 배열에서 첫 번째 인덱스값에 해당되기 때문에 다음 인덱스에 있는 `/api/test`는 무시되기 때문이다. 둘의 순서를 바꾸니 잘 되었다.  

```json
{
  "rewrites": [
    {
      "source": "/api/test",
      "destination": "http://myapi.com/api/test"
    },
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

## 같이 보기
- [[Webpack#CORS]]

## reference
- [https://stackoverflow.com/questions/65456701/how-can-i-setup-proxy-using-vercel](https://stackoverflow.com/questions/65456701/how-can-i-setup-proxy-using-vercel)
---
title   : Vercel에서 배포 후 404 Not Found가 나타나는 문제 해결하기 
date    : 2022-03-04 13:04:33 +0900
updated : 2022-03-04 13:37:16 +0900
aliases : ["Vercel에서 배포 후 404 Not Found가 나타나는 문제"]
tags    : ["Vite", "Vercel", "How to"] 
---
## Goal 
Vercel에 Vite로 작업한 프로젝트가 배포된 후에 특정 페이지에서 404 Not Found가 발생했다. 그 이유와 해결 방법 알아보기

## 발생 원인
우선 프로젝트는 Vite로 빌드했다. `index.html`하나만 가지고 자바스크립트를 이용해  `window.location.pathname`에 따라 화면에 그려지는 요소를 변경했다. 즉 [[SPA]]인 것이다. 

[[SPA]]인 경우 생성된 경로에 대한 html 파일이 따로 존재하지 않는다. 그래서 서버에서 **rewrite**를 해서 모든 요청이 `index.html`을 가리킨도록 해야한다. 

## 해결 방법
Vercel의 설정 파일에서 **Rewrites**를 이용해 사용자를 어떤 URL에서 다른 URL로 보낼 수 있다. URL 프록시라고도 한다.  
이 기능을 이용해 모든 경로(요청)를 `index.html` 또는 `'/'`로 보내면 되는 것이다.  
먼저 프로젝트 루트에 `vercel.json` 파일을 생성한다. 
```bash
$ touch vercel.json
```

그 다음 모든 경로를 `'/'`로 재작성해준다는 의미의 다음 코드를 추가한다.  
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## 생각
이번 내용을 정리하면서 불현듯 과거의 기억이 떠올랐다.  
[[2021-07-06]]. 작년이다. 나는 SPA 호스팅에 대해서 학습하면서 **특정 페이지의 정보를 서버에서 받아오는 것이 아닌 미리 갖고 있는 것을 필요시에 자바스크립트를 이용해 그 페이지로 전환하는 것**이라 배우고, **서버에서 페이지의 정보를 알지 못하기 때문에 서버가 먼저 페이지를 찾을 수 없다고 응답할 수 있다**면서.. **서버에 설정을 해줘야 한다는 것**까지! 다 읽었던 내용이었는데 처음부턴 바로 떠오르지 않았던 것이다.  
사용 환경만 다르고 같은 내용이었다. 이제는 쉽게 까먹지 않겠다.


## reference
- [https://stackoverflow.com/questions/70249976/vercel-vite-404-not-found](https://stackoverflow.com/questions/70249976/vercel-vite-404-not-found)

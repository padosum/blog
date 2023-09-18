---
title: crbug/1173575, non-JS module files deprecated
date: 2023-07-24 23:37:02 +0900
updated: 2023-07-24 23:42:12 +0900
aliases: ["crbug/1173575, non-JS module files deprecated"]
draft: false
tags: ["Vite", "Error"]
---

Vscode로 개발을 하던 중에 밥 먹고 자리에 돌아오니 크롬에서 다음 오류가 나타나더니 개발 서버가 동작하지 않았다.

```
crbug/1173575, non-JS module files deprecated
```

검색했을 때 인터넷 연결 문제, Vscode에서 디버깅 문제, 재부팅하라는 여러 가지 해결 방법이 있었는데 다 해봤지만 해결되지 않았다.

나는 Vite로 프로젝트를 빌드하고 있기 때문에 이게 뭔 문제일까 고민하다가 내가 작업한 내용을 거슬러 올라갔다.  
`git status`로 확인하니 `index.html` 파일을 실수로 이동한 것을 발견했다.

원래 vite에서는 `index.html`이 root directory에 존재한다. 다른 파일을 옮기려다 `index.html`을 `/src` 내부로 이동시킨 것이다. 원래대로 돌리니 잘 동작했다.

## reference

- [Vite - index.html and Project Root](https://vitejs.dev/guide/#index-html-and-project-root)

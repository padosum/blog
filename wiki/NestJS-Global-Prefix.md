---
title   : NestJS에서 모든 route에 prefix를 붙이는 방법
date    : 2022-11-09 21:20:13 +0900
updated : 2022-11-09 21:34:12 +0900
aliases : ["NestJS에서 모든 route에 prefix를 붙이는 방법"]
tags: ["NestJS"]
draft : false
---

모든 route에 `api` 나 `v1`같은 prefix를 붙이기 위해서는 [Global prefix](https://docs.nestjs.com/faq/global-prefix)를 사용한다.

  

```javascript

const app = await NestFactory.create(AppModule);

app.setGlobalPrefix('api');

```
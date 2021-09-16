---
title   : TypeScript Mapped Type   
date    : 2021-08-20 23:16:42 +0900
updated : 2021-08-20 23:17:03 +0900
aliases : 
tags: ["TypeScript"]
---
Mapped Type (맵드 타입)  
- 기존에 정의되어 있는 타입을 새로운 타입으로 변환해주는 문법
- [https://typescript-kr.github.io/pages/advanced-types.html](https://typescript-kr.github.io/pages/advanced-types.html) 에서는 매핑 타입이라고 번역이 되어있다.

```typescript
type Heroes = 'Hulk' | 'Capt' | 'Thor';
type HeroAges = { [K in Heroes]: number }; // 아래와 같이 새 타입이 된다. 

type HeroAges = {
  Hulk: number;
  Capt: number;
  Thor: number;
};

const ages: HeroAges = {
  Hulk: 100,
  Capt: 23,
  Thor: 123,
};

```

## reference 
- [https://inf.run/3yxr](https://inf.run/3yxr)

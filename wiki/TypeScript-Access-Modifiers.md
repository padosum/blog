---
title   : TypeScript Access Modifiers
date    : 2023-07-18 22:31:07 +0900
updated : 2023-07-18 22:39:58 +0900
aliases : 
draft : false
tags : ["TypeScript", "NestJS"]
---

NestJS 코드를 보면 [[JavaScript-Class|Class]]의 constructor에서 `private`, `public` 등 접근 제한자(Access Modifiers)를 사용하는 것을 볼 수 있다.  

원래라면 다음과 같이 인스턴스를 생성해야 하는데  
```ts
export class MessagesController {
  messagesService: MessagesService;
  constructor() {
    this.messagesService = new MessagesService();
  }
```

TypeScript를 사용하기 때문에 다음과 같이 사용할 수 있는 것이다.  

```ts
export class MessagesController {
  constructor(private messagesService: MessagesService)
}
```

위 코드에서 `private`는 접근 제한자 중 하나다. 접근 제한자가 선언된 `constructor` 파라미터는 클래스 프로퍼티로 선언되고 또 자동으로 초기화된다고 한다.


## reference

- [https://poiemaweb.com/typescript-class#3-생성자-파라미터에-접근-제한자-선언](https://poiemaweb.com/typescript-class#3-생성자-파라미터에-접근-제한자-선언)

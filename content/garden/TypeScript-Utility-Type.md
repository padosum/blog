---
title   : TypeScript Utility Type  
date    : 2021-08-20 23:13:47 +0900
updated : 2021-09-07 16:53:32 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
## 유틸리티 타입이란 
-   이미 정해놓은 타입을 변환해서 새로운 타입을 만들고 싶은 경우가 있다. 그때 인터페이스, [[TypeScript-Generics|제네릭]] 등을 사용할 수 있지만 유틸리티 타입을 쓰면 더 간단히 타입 정의가 가능해진다.
    -   ex) [쇼핑몰 페이지] 상품 목록을 받아오는 페이지에서 쓰는 타입과 상세정보를 조회할 때 사용하는 타입의 속성이 공통된 부분과 다른 부분이 있을 수 있기 때문에 타입을 변환해서 정의할 필요가 있다.

## 자주 사용하는 유틸리티 타입
### Partial

-   `Partial<T>`
-   특정 타입의 부분 집합을 만족한는 타입을 정의할 수 있음

### Pick

-   `Pick<T, K>`
    -   `T` 에서 `K` 집합을 선택해서 타입을 정의한다.

```tsx
interface Todo {
  title: string;
  desc: string;
  checked: boolean;
}

type TodoShort = Pick<Todo, 'title', 'checked'>;

const todo:TodoShort = {
  title: 'Learn TypeScript',
  checked: true,
}

```

### Omit

-   `Omit<T, K>`
-   `T`에서 `K`를 제거해 타입을 정의한다.

```tsx
interface Todo {
  title: string;
  desc: string;
  checked: boolean;
}

type TodoShort = Omit<Todo, 'desc'>;

const todo:TodoShort = {
  title: 'Learn TypeScript',
  checked: true,
}
```

## Partial 동작 방식 이해하기

```tsx
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}

interface UserProfileUpdate {
  username?: string;
  email?: string;
  profilePhotoUrl?: string;
}

// #1
type UserProfileUpdate = {
  username?: UserProfile['username'];
  email?: UserProfile['email'];
  profilePhotoUrl?: UserProfile['profilePhotoUrl'];
};

// #2
type UserProfileUpdate = {
  // 맵드 타입 (Mapped Type)
  [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p];
};

// #3
type UserProfileUpdate = {
  [p in keyof UserProfile]?: UserProfile[p];
};

// #4 (Partial)
type Subset<T> = {
  [p in keyof T]?: T[p];
}

type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

## reference

-   [유틸리티 타입 · GitBook](https://typescript-kr.github.io/pages/utility-types.html)
-   [https://inf.run/3yxr](https://inf.run/3yxr)

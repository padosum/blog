---
title   : GraphQL 
date    : 2023-11-01 23:05:59 +0900
updated : 2023-11-01 23:15:38 +0900
aliases : 
tags    : 
---

[How to graphql](https://www.howtographql.com/)을 읽고 정리한 내용 


- REST에 대안을 제공하는 새로운 API 표준
- Facebook에서 개발
- GraphQL 서버는 고정된 데이터 구조를 반환하는 여러 엔드포인트 대신 단일 엔드포인트만 노출한다.
  - > “Think in graphs, not endpoints.”



## 왜 REST 대신 GraphQL을 사용하나?
- REST API를 사용하면 서버에서 데이터를 노출하는 방식을 클라이언트의 특정한 요구 사항에 따라 수정해야 하는 경우가 많다.
- REST API는 overfetching 문제가 있다.
  - 실제로 필요한 정보보다 더 많은 정보를 fetching하는 것
- underfetchng 문제도 있다. 
  - 특정 엔드포인트가 필요한 정보를 충분히 제공하지 못하는 것. 모든 정보를 얻기 위해 추가 요청을 해야 할 수 있다.
    - 예를 들어, 블로그 게시물을 조회할 때 작성자 이름, 게시물명, 작성자의 팔로워를 다 조회하기 위한 3번의 fetching이 필요할 수 있음.
- GraphQL은 타입 시스템을 사용한다. 프론트엔드와 백엔드에서 네트워크 전송시 명확한 구조를 알고 있어 추가적인 커뮤니케이션 없이 작업을 수행할 수 있다.
  - 테스트에 좋다. (데이터 mocking)


## 핵심 개념

### The Schema Definition Language (SDL)

- 스키마를 정의하는 데 사용되는 자체 타입 시스템을 말한다.


SDL을 사용한 `Person` 이라는 타입의 예시
```graphql
type Person {
  name: String!
  age: Int!
}
```
- `!`는 필수를 의미한다.
  

```graphql
type Post {
  title: String!
  author: Person!
}
```

- TypeScript와 비슷해 보인다.


### Query를 사용해 데이터 불러오기

- GraphQL은 REST API와 달리 하나의 엔드포인트만 노출한다. 
  - 반환되는 데이터 구조가 고정된 것이 아니다! 
  - 클라이언트가 데이터 구조를 결정할 수 있다.
- 따라서 클라이언트는 데이터 요청을 위해 서버에 더 많은 정보를 보내야 한다. 이를 Query라 한다. 


**query의 예시**
```graphql
{
  allPersons {
    name
  }
}
```
- `allPersons`를 field라 한다.

위 query는 아래 데이터를 응답한다. 
```js
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" }
  ]
}
```

중첩도 가능하다.

```graphql
{
  allPersons {
    name
    age
    posts {
      title
    }
  }
}
```

### 인수를 가진 Query

- 각 field는 0개 이상의 인수를 가질 수 있다. 

```graphql
{
  allPersons(last: 2) {
    name
  }
}
```


### Mutation을 사용해 데이터 쓰기

- mutation을 사용해 데이터를 변경할 수 있다.
- Query와 구조가 같은데 `Mutation` 키워드로 시작하면 된다.

```graphql
mutation {
  createPerson(name: "Bob", age: 36) {
    name
    age
  }
}
```


mutation을 전송할 때 정보를 쿼리할 수 있다. 
예를 들어 다음과 같이 새 `Person`을 생성하고 그 `ID`를 반환할 수 있다. 
```graphql
mutation {
  createPerson(name: "Alice", age: 36) {
    id
  }
}
```


### Subscription으로 실시간 업데이트하기
- 특정 이벤트가 발생할 때 서버가 해당 데이터를 클라이언트에 푸시할 수 있다.

```graphql
subscription {
  newPerson {
    name
    age
  }
}
```

- 클라이언트가 위 subscription을 서버로 전송하면 연결이 되어 `newPerson` mutation이 수행될 때마다 서버는 `Person`에 대한 정보를 클라이언트로 보낸다!



### 스키마 정의하기

- 일반적으로 스키마는 단순 GraphQL 타입의 모음이다. 

```graphql
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```







---
title: Gatsby
date: 2023-11-02 23:01:22 +0900
updated: 2023-11-02 23:02:04 +0900
aliases:
tags:
---

## Goal

Gatsby를 잘 모르면서 Gatsby로 된 위키를 사용하고 있다. 그랬더니 커스텀도 주먹구구 식으로 했다. 공부하고 사용해보자.

## Plugins

- `gatsby`에는 plugin이라는 것이 있다. node.js의 모듈이라 생각하면 될 것 같다.
- 예시로 `gatsby-plugin-image` 가 있다. 이미지를 추가할 수 있다.
  - `StaticImage` 컴포넌트를 사용할 수 있음
  - 2가지 plugin이 더 필요하다.
    - `gatsby-plugin-sharp`: `gatsby-plugin-image`에서 사용하는 실제 이미지를 처리한다.
    - `gatsby-source-filesystem`: 컴퓨터의 파일 시스템에서 데이터를 가져올 수 있다.

**plugin 추가하는 방법**

- `gatsby-config.js` 파일에 추가한다.
  - gatsby가 자동으로 인식하는 특수한 파일이다.
  - 이 파일을 업데이트한 후에는 로컬 개발 서버를 다시 시작해야 변경 사항이 적용된다.

```js
module.exports = {
  siteMetadata: {
    title: 'My First Gatsby Site',
  },
  plugins: ['gatsby-plugin-image', 'gatsby-plugin-sharp'],
}
```

## 데이터 가져오기

- Gatsby는 **data layer** 라는 기능으로 여러 소스의 데이터를 결합해 사용할 수 있다.
- 이 data layer는 [[GraphQL]]이라는 기술로 구동된다.

### GraphQL과 data layer

- Gatsby에 사이트의 모든 데이터를 보관하는 GraphQL data layer가 존재한다. 내부적으로 어떻게 작동하는 걸까?
  - 데이터는 하나 이상의 소스에 저장된다.
    - 컴퓨터 파일 시스템의 폴더, CMS, 데이터베이스 등...
  - 이 여러 소스에서 data layer로 데이터를 가져오는 방법은?
    - **source plugin**을 추가하면 된다! 각 source plugin은 특정 소스와 통신하도록 설계되었다.
    - `gatsby-source-`라는 이름으로 시작한다. ex) `gatsby-source-filesystem`, `gatsby-source-contentful`
    - 사이트를 구축할 때 각 source plugin은 특정 소스에서 데이터를 가져와서 사이트의 GraphQL data layer에 추가한다.
- data layer에서 데이터를 가져오려면?
  - GraphQL query를 사용한다
  - 사이트를 빌드 -> gatsby가 컴포넌트에서 모든 GraphQL 쿼리를 찾아 실행하고 결과 데이터를 컴포넌트에 넣는 것.

### GraphiQL을 사용해 data layer를 탐색하고 GraphQL 쿼리 작성하기

- 사이트의 GraphQL data layer에 어떤 데이터가 있는지 어떻게 알 수 있나?

  - 사이트의 로컬 개발 서버를 시작하면 gatsby는 **GraphiQL** 이라는 브라우저 내 도구를 사용할 수 있는 특수 엔드포인트를 자동으로 생성한다.
  - GraphiQL을 사용하면 사이트의 데이터를 탐색하고 GraphQL 쿼리를 작성할 수 있다.

- 아래 단계에 따라 GraphiQL 인터페이스를 열기:

1. gatsby develop를 실행하여 로컬 개발 서버를 시작
2. 웹 브라우저에서 `http://localhost:8000/___graphql`로 이동

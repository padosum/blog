---
title: Testing Library
date: 2023-02-17 21:42:47 +0900
updated: 2023-02-17 21:48:25 +0900
aliases: ["Testing Library"]
draft: false
tags: ["testing", "tools"]
---

- 애플리케이션 테스트 도구
- UI 동작 테스트에 중점을 둔다
- 컴포넌트를 테스트할 때 테스트 중인 컴포넌트를 따로 마운트하고, 사용자 이벤트 트리거 등을 처리해야 한다. 이 작업을 간단하게 해주는 도구다.
- 다른 테스팅 도구와 함께 사용할 수 있다. (ex: Jest)
- Vue에서 `@vue/test-utils` 보다 `@testing-library/vue`를 사용하기를 추천한다.[^1]

[^1]: https://vuejs.org/guide/scaling-up/testing.html#component-testing

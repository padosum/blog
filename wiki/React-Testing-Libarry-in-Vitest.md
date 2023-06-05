---
title   : Vitest에서 React Testing Library 사용하기 
date    : 2023-06-05 22:04:26 +0900
updated : 2023-06-05 22:21:45 +0900
aliases : ["Vitest에서 React Testing Library 사용하기"]
draft : false
---

## Goal

Vitest에서 react testing library를 사용하는 방법을 알아보기


---

브라우저 실행 없이 테스트할 때도 [[DOM]]을 조작할 수 있도록 `jsdom`을 설치한다.

```sh
npm install -D jsdom 
```

`vitest.config.ts` 파일에 다음 내용을 추가한다.
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
});
```
테스트에 `jsdom`을 사용한다는 내용이다.  


testing-library 사용을 위한 패키지를 설치한다.
```sh
npm install -D @testing-library/react @testing-library/jest-dom
```

`/tests/setup.ts` 파일을 생성하고 다음 내용을 추가한다.

`setup.ts` 파일은 각 테스트 파일이 실행되기 전에 실행되는 파일이다.  
react-testing-library의 matcher를 확장한다. 
```ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

// react-testing-library의 matcher를 확장한다. 
// `@testing-library/jest-dom`의 matcher를 사용할 수 있게 된다.
expect.extend(matchers);

// test 간 DOM 상태를 초기화
afterEach(() => {
  cleanup();
});
```

추가한 `/tests/setup.ts` 파일이 동작하도록 `vitest.config.ts`의 `setupFiles` 옵션에 추가한다.
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
```


## reference

- [https://www.robinwieruch.de/vitest-react-testing-library/](https://www.robinwieruch.de/vitest-react-testing-library/)


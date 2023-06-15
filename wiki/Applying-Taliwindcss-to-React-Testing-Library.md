---
title   : React Testing Library에 Tailwindcss 적용하기 
date    : 2023-06-15 21:29:40 +0900
updated : 2023-06-15 21:40:30 +0900
aliases : ["React Testing Library에 TAilwindcss 적용하기"] 
draft : false
---

## Goal

React Testing Library에서 렌더링된 component에 Tailwindcss를 적용하기


## Custom Render

Tailwindcss로 진행중인 프로젝트에 `hidden` 클래스를 추가하고 `not.toBeVisible()`을 사용하니 테스트가 실패했다. 생각해보니 당연했다. 클래스가 있어도 `render` 함수가 클래스에 해당하는 스타일을 모르기 때문이다.  

물론 `hidden`이라는 클래스가 있고 그게 `display: none;`이라고 여기면 되지만 명확한 테스트가 아니다.  사용자 입장에서 테스트해야할 것은 `hidden`이란 클래스 여부가 아니라 실제로 화면에 보이느냐 보이지 않느냐이기 때문이다.

다행히 React Testing Library는 [Custom Render](https://testing-library.com/docs/react-testing-library/setup/)를 만들 수 있다. 

먼저 적용할 css 파일을 생성한다.
```sh
npx tailwindcss -i ./src/index.css -o ./tests/index.css
```

Custom Render 함수를 정의한다. `style` element를 만들어서 앞서 만든 `index.css`를 넣어준다.
```tsx
// test-utils.tsx
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import fs from "fs";

const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const view = render(ui, { wrapper, ...options });

  const style = document.createElement("style");
  style.innerHTML = fs.readFileSync("tests/index.css", "utf8");
  document.head.appendChild(style);

  return view;
};

export { customRender as render };
```


## 적용하기

앞서 작성한 Custom Render로 컴포넌트를 렌더링하면 된다.
```tsx
import { render } from "../utils/test-utils";

  it("should render hidden tooltip", () => {
      const { getByRole, queryByRole } = render(<Tooltip />);
      expect(queryByRole("tooltip")).toBeVisible();
    });
  });
```


## reference

- [https://stackoverflow.com/questions/71010317/react-testing-library-cant-read-styles-using-tailwind-css-classes](https://stackoverflow.com/questions/71010317/react-testing-library-cant-read-styles-using-tailwind-css-classes)

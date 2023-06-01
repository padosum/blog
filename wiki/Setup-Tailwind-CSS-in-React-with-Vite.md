---
title   : React + Vite 프로젝트에서 Tailwind CSS 설정하기 
date    : 2023-06-01 23:05:28 +0900
updated : 2023-06-01 23:21:44 +0900
aliases : ["React + Vite 프로젝트에서 Tailwind CSS 설정하기"] 
draft : false
---

## Goal

React, Vite 로 구성된 프로젝트에서 Tailwind CSS를 사용하는 방법을 알아본다.


Tailwind CSS는 이름은 많이 들어봤는데 무엇인지 몰랐다. 첫인상은 Bootstrap이 떠올랐는데 왜 인기가 많은 것일까? 궁금했다. 사용하다보면 알게될 것이다.


## React + Vite 프로젝트 만들기

```sh
npm create vite@latest
```

위 명령어를 입력한 후 출력된 메시지를 따라하면 프로젝트 생성이 완료된다.


## TailWind CSS와 Dependencies 설치하기

생성된 프로젝트 경로로 이동해 다음 패키지를 설치한다.

```sh
npm install -D tailwindcss postcss autoprefixer
```

- tailwindcss
- postcss: 바닐라 CSS의 prefix 같은 다양한 기능을 수행하는 플러그인을 제공
- autoprefixer: PostCSS의 플러그인. vendor prefix를 추가한다.


## 설정 파일 추가하기

```sh
npx tailwindcss init -p
```

`postcss.config.js` 파일과 `tailwind.config.js` 파일이 추가된다.

이 두 파일은 각각 PostCSS와 Tailwind CSS의 동작을 구성하는 데 사용된다. 

## template path 설정하기

Tailwind에서 template이란 사전에 디자인된 UI 컴포넌트나 레이아웃을 의미한다. 
template path는 template 파일이 위치한 경로를 설정하는 것이다. Tailwind CSS가 해당 template 파일에서 사용된 클래스를 분석하고 스타일링 적용을 할 수 있다. 여기에 프로젝트에서 사용하는 파일을 추가해줘야 하는 것.

`content` 배열에 추가해준다.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Tailwind directive 추가하기


`index.css` 파일을 열어 다음 directive를 추가한다. 
Tailwind CSS의 스타일을 사용할 수 있도록 해주는 directive다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 프로젝트에 Tailwind 사용하기

```tsx
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```


## reference

- [https://tailwindcss.com/docs/guides/vite](https://tailwindcss.com/docs/guides/vite)
- [https://www.freecodecamp.org/news/how-to-install-tailwindcss-in-react/amp/](https://www.freecodecamp.org/news/how-to-install-tailwindcss-in-react/amp/)

---
title   : Visual Studio Code에서 Sass 컴파일하기 
date    : 2022-01-30 21:03:17 +0900
updated : 2022-01-30 21:03:32 +0900
aliases : ["Visual Studio Code에서 Sass 컴파일하기"]
tags    : ["Sass", "SCSS"]
---

## Goal
Visual Studio Code에서 `.sass`, `.scss` 파일을 `.css`로 컴파일하는 방법을 알아보기  

## Extension 설치
CSS 공부하면서 간단한 코드 조각들의 실행이 필요해졌다.   

1. 파일을 수정할 때마다 파일을 리로드하기 위해서 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 익스텐션을 설치한다.  
2. [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) 익스텐션을 설치한다. 
3. `.scss` 파일을 불러오고 있는 `.html` 파일에서 <kbd>ctrl</kbd> +<kbd>shift</kbd>+ <kbd>P</kbd> 키를 누르고 Command Pallete를 연다.  `Live Server: Open With Live Server`로 라이브 서버를 켠다.  
4. 다시 Command Pallete를 켜서 `Live Sass: Watch Sass`를 입력해 익스텐션을 실행시킨다. 

위 과정을 거치면 컴파일된 `.css` 파일이 생성되고 불러와서 사용하면 된다.  `.scss` 파일이 수정될 때마다 다시 컴파일된다.

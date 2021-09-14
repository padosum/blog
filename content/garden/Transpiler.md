---
title   : 트랜스파일러 
date    : 2021-04-23 17:14:08 +0900
updated : 2021-04-23 17:14:31 +0900
aliases : ["트랜스파일러"]
tags: ["Programming"]
---

## 정의

**트랜스파일러(Transpiler)**
특정 언어로 작성된 소스코드를 다른 언어의 소스코드로 번역해주는 프로그램  

## CSS Transpiler 
- CSS가 변수나 함수, nesting 등의 기능을 제공하지 않기 때문에 CSS 작성의 생산성을 높이기 위해 [LESS](https://lesscss.org), [SASS](https://sass-lang.com), [PostCSS](https://postcss.org)등의 CSS Transpiler가 등장했다.    
-  웹 프론트엔드의 생태계는 워낙 거미줄처럼 서로 엮여 있어서, 배보다 배꼽이 커지는 경우가 많습니다. 위의 PostCSS, LESS, SASS, SCSS, .. 무엇이 되었든 CSS3에 충분히 통달 한 후, 생산성 향상이 절실 할 때 시작해보는 것이 좋다.  

## JavaScript Transpiler 
- JavaScript의 가장 큰 골칫거리는 호환성 문제
- Chrome이나 Firefox, Safari 같은 에버그린 웹 브라우저는 ECMAScript 표준을 바로 적용시키면서 다른 브라우저보다 앞서서 최신 문법들을 지원하기도 한다.  
- 브라우저의 호환성 문제를 해결하기 위해 Babel이 등장했다.  

### Babel
- [https://babeljs.io](https://babeljs.io)
- 최신 문법의 JavaScript를 구형 브라우저에서 실행가능하도록 번역해주는 트랜스파일러

### [[TypeScript]]
- [https://www.typescriptlang.org](https://www.typescriptlang.org)  
- JavaScript의 최신 문법 및 정적 타입을 지원    


## 참고
- [https://okky.kr/article/400839](https://okky.kr/article/400839)

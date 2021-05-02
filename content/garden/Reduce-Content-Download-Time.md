---
title   : Network 탭 Content Download 속도 단축하기
date    : 2021-05-02 09:41:10 +0900
updated : 2021-05-02 09:42:17 +0900
aliases : ["Network 탭 Content Download 속도 단축하기"]
private : false
hidden  : false
showReferences : true
---
## 문제 발견 
 현재 웹사이트에 이상하게도 **첫 페이지 로드 속도가 너무너무 느렸다.** gatsby theme을 변경하고 생긴 일이었는데 원래 theme을 받은 사이트는 속도가 빠르기에 내가 추가한 설정이 문제라는 생각이 들었다.  
 
## 문제 원인 
 Chrome의 Developer Tools에 Network 탭을 확인하면 속도 문제를 확인할 수 있다는 얘기를 들어 열어보았는데 처음 로드되는 부분에서 Waiting TTFB 시간도 길지만 **Content Download** 부분이 그에 비해 상당히 긴 것을 확인할 수 있었다.  
 
**Content Download**는 content가 다운로드가 되는데 까지 기다린 시간을 의미했다.  같은 theme을 사용하는데 왜 내 사이트만 이렇게 content가 많을까?라는 생각을 하고 확인을 거듭해보니 해당 항목의 **Preview** 탭을 비교해볼 수 있었다.  
![[Pasted image 20210502094928.png]]  
원래 위 스크린샷처럼 웹사이트의 모습이 미리보기가 되어야 하는데 나오지 않고 있었다.   
**Response** 탭을 복사해서 긁어오니 엄청난 양의 css 코드가 추가되어 있었다.  
이걸 지워야만 했다.    

## 해결  
엄청난 양의 css는 Tailwind CSS 프레임워크에서 가져온 것이었다. 어떤 분의 코드를 보다가 마음에 들어서 가져왔던 것이었는데 잘 모르고 사용하다보니 내 코드는 엉망이된 것이다.  

그래서 Tailwind CSS의 document를 자세히 읽어보니 **Removing unused CSS** 내용이 있었다! 사용하지 않는 경우에 해당 CSS를 없애는 것이었다.  

설정은 간단했다. `tailwind.config.js` 설정에서 `purge` 옵션에 파일경로를 추가하면 된다.  
```javascript
module.exports = {
  purge: [
    './src/**/*.js',
    './content/garden/*.md',
  ],
  theme: {
    extend: {
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
- 마음에 드는 코드를 무턱대고 가져다쓰기 보다는 잘 알아보는 것이 중요하다는걸 다시 느꼈다.  
- 그리고 Network 탭을 열어봐도 도대체 뭐가 문젠지 몰라서 시간을 많이 보냈는데 차근차근히 확인해보고 알아보니 해결할 수 있어서 다행이란 생각이 들었다.  

## 참고  
- [https://tailwindcss.com/docs/optimizing-for-production](https://tailwindcss.com/docs/optimizing-for-production)
- [https://kamang-it.tistory.com/entry/WebPerformanceChrome-%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%9D%98-%EC%84%B1%EB%8A%A5%EC%9D%84-%EB%B3%B4%EC%9E%901-%ED%81%AC%EB%A1%AC-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%8F%84%EA%B5%AC%EC%99%80-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C-%EB%B3%B4%EA%B8%B0](https://kamang-it.tistory.com/entry/WebPerformanceChrome-%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%9D%98-%EC%84%B1%EB%8A%A5%EC%9D%84-%EB%B3%B4%EC%9E%901-%ED%81%AC%EB%A1%AC-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%8F%84%EA%B5%AC%EC%99%80-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C-%EB%B3%B4%EA%B8%B0)
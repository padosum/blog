---
title   : Gatsby에 Google Custom Search 적용하기   
date    : 2021-02-07 17:04:55 +0900
updated : 2021-02-07 17:29:27 +0900
tags    : [React]
excerpt : Gatsby에 Google Custom Search를 이용해 검색기능 추가하기  
parent : 
layout : 
---

 원래 블로그가 [JohnGrib](https://johngrib.github.io/)님의 도움을 받아 Jekyll로 만들어져있었는데 Gatsby로 옮기면서 검색기능 또한 그대로 필요했다.  
   
   
## 검색엔진 만들기  
[https://programmablesearchengine.google.com/cse/create/new](https://programmablesearchengine.google.com/cse/create/new)    
![gcse1](https://user-images.githubusercontent.com/6129764/107140745-8d69c800-6967-11eb-8c23-64f415033547.png)
 
 - 링크에 접속해 새 검색엔진 > 검색할 사이트, 언어, 검색 엔진 이름을 입력 후 [만들기]  
     
     
## Gatsby에 검색엔진 붙이기  

```js   
  componentDidMount() {
  // highlight-start
    const cx = 'ec8c77d15f537286d';
  // highlight-end  
    let gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }
  
  ... 
  
  render() {
    return (
        <div className="gcse-searchresults-only" data-queryparametername="searchString"></div>
    )
  }
```  

- `cx`는 검색엔진 수정 > 설정 > 기본사항에서 확인할 수 있다.   
![gcse2](https://user-images.githubusercontent.com/6129764/107141353-89d84000-696b-11eb-94ba-6dc46b0bea91.png)  
  
  
  
## 발생한 문제  

### 검색결과가 팝업으로 뜨는 문제  
- Jekyll에서는 다른 분이 만든걸 그대로 갔다 써서 몰랐는데 Gatsby에 붙이니 검색결과가 계속 작은 팝업창으로 떴다.  
  - Gatsby라서 그런건가? 했는데 검색을 계속 해보니 검색엔진 설정에 옵션을 줄 수 있음을 알게되어 해결했다.  
  - 검색엔진 수정 > 디자인 > 레이아웃  
    
### 검색결과 링크가 새 탭으로 뜨는 문제  
- 현재 탭에서 링크이동을 하고싶은데 `linkTarget` 속성이 DOM에서 사용할 수 없다는 오류가 나왔다.  
  - gcse를 불러오기 전에 element에 해당 속성을 넣어봤지만 해결되지 않았고 생각을 바꿔서 또 옵션에 있는건 아닐까 했는데 아니나 다를까 검색엔진 수정 > 검색 기능 > 고급 > 웹검색 설정 > 링크 대상에 `_parent`로 설정이 따로 가능했다.  

## 참고  
- [https://developers.google.com/custom-search/docs/element](https://developers.google.com/custom-search/docs/element)  
  
## 배운점   
- 오래 걸렸는데 내가 React에 대해 기본이 탄탄하면 더 쉽게 끝났을 것 같다고 느꼈다.    
- 공식문서를 잘~ 읽는 것이 개발에 매우 도움이 된다.  

---
title   : Pug Mixin을 사용해 SVG 불러오기
date    : 2022-11-07 23:50:16 +0900
updated : 2022-11-08 00:14:53 +0900
aliases : ["Pug Mixin을 사용해 SVG 불러오기"]
tags: ["pug", "svg"]
draft : false
---

## Goal
pug에서 svg 파일을 inline으로 불러오자.


pug 코드에서 svg를 사용하려면 pug 형식에 맞게 넣으면 된다.
```pug
svg(width='29', height='30', viewBox='0 0 29 30', fill='none', xmlns='http://www.w3.org/2000/svg')
  title='apple 로고'
  path(fill-rule='evenodd', clip-rule='evenodd', d='M17.6734 6.53179C17.0545 7.30483 16.0153 7.88462 15.1863 7.88462C15.0929 7.88462 14.9995 7.87254 14.9411 7.86046C14.9294 7.81214 14.9061 7.6672 14.9061 7.52225C14.9061 6.53179 15.3848 5.56548 15.9102 4.94946C16.5758 4.14018 17.685 3.53624 18.6074 3.5C18.6308 3.60871 18.6425 3.74158 18.6425 3.87444C18.6425 4.85283 18.2338 5.83121 17.6734 6.53179ZM13.6127 22.1399C13.1966 22.3248 12.8023 22.5 12.2673 22.5C11.123 22.5 10.329 21.4129 9.41827 20.0842C8.35574 18.514 7.4917 16.0861 7.4917 13.7912C7.4917 10.095 9.81526 8.13827 12.1038 8.13827C12.7718 8.13827 13.3821 8.39164 13.9248 8.61693C14.3592 8.79728 14.7503 8.95963 15.0929 8.95963C15.3901 8.95963 15.7604 8.80823 16.1921 8.63177C16.795 8.38531 17.5175 8.08996 18.3272 8.08996C18.841 8.08996 20.7208 8.13827 21.9585 9.97425C21.9514 9.97996 21.9363 9.99029 21.9142 10.0053C21.6097 10.2133 19.9852 11.3227 19.9852 13.5979C19.9852 16.4123 22.3555 17.4148 22.4372 17.439C22.4351 17.4444 22.4303 17.4599 22.4226 17.4845C22.3447 17.7339 21.9733 18.9232 21.1762 20.1325C20.3939 21.2921 19.5649 22.4758 18.3272 22.4758C17.7172 22.4758 17.3285 22.2978 16.9272 22.1139C16.4989 21.9177 16.0562 21.7149 15.3148 21.7149C14.5693 21.7149 14.0774 21.9334 13.6127 22.1399Z', fill='black')
```

**하지만 요렇게 하면 불러오고 있는 pug 코드가 상당히 지저분해질 것**이다. 그래서 분리하도록 한다.

적당한 곳에 svg만 존재하는 pug 파일을 생성한다.  
예를 들어 `/views/mixins/svg/apple.pug`

그리고 svg icon을 불러오는 mixin을 추가한다.  
```pug
//- views/mixins/svg/svg-icon.png
mixin svg-icon(icon)
  case icon 
    when 'banana'
      include banana.pug
    when 'apple'
      include apple.png
```

사용하는 곳에서 `icon` 값만 잘 전달해주면 된다!
```pug
include mixins/svg/svg-icon

//- ....
div
	+svg-icon('banana')
	+svg-icon('apple')
```


## reference
- [Inline SVG pug mixin](https://codepen.io/ds55/project/editor/AbVLPJ)

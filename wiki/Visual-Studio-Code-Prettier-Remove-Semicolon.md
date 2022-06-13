---
title   : VSCode Prettier Extension에서 세미콜론 없애기 
date    : 2022-06-13 21:46:12 +0900
updated : 2022-06-13 23:00:42 +0900
aliases : ["VSCode Prettier Extension에서 세미콜론 없애기"]
tags    : ["How to", "Tools"]
---

VScode에서 간단히 코드를 작성할 때 [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)를 이용해 코드를 포맷팅하고 있다.
나는 개인적으로 세미콜론이 없는 게 더 깔끔해보여서 없애고 싶은데 기본값은 넣는 것인듯 하다. 저장할 때마다 세미콜론을 지워도 새로 생기기 때문이다. 저장시 세미콜론을 지우려면 설정을 변경하면 된다.

Preferences > Settings에 들어가 `prettier.semi`를 검색하고 해당 항목에 체크를 해제해주면 된다.

![[prettier-semi.png]]
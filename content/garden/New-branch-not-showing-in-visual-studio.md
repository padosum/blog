---
title   : Visual Studio에서 새 브랜치가 안보일 때
excerpt : 
date    : 2020-03-02 21:44:28 +0900
updated : 2020-03-03 22:12:57 +0900
tags    : ["How to", Tools]
---

웹 상의 DevOps에서 새 브랜치를 만들고 visual studio에서는 아무리 새로고침을 해도 새로 만든 브랜치가 보이질 않았다.  
방법이 2가지가 있었다.

1. Team Explorer의 동기화 메뉴에서 `Fetch` 버튼 클릭
2. 해당프로젝트 경로에서 `get fetch`  
   
내가 [[Fetch]]에 대해 몰라서 생긴 문제였다.  
그리고 웹사이트에서 새 브랜치를 만들면, 로컬 저장소를 pull 또는 동기화하여야 한다.  

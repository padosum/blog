---
title   : Netlify에서 Vercel로 도메인 설정하기
date    : 2021-09-17 22:36:59 +0900
updated : 2021-09-17 22:46:03 +0900
aliases : ["Netlify에서 Vercel로 도메인 설정하기"]
tags    : ["How to"]
---

Netlify에 대해 검색하면 항상 Vercel이 따라나왔다. 거기엔 항상 한국에 서버가 있어서 속도가 빠르다는 댓글들이 달려있었다. 그래서 내 블로그를 Netlify에서 Vercel로 옮기고 도메인을 설정하는 작업을 진행했다.

## Vercel에서 Domain 설정하기  
vercel에 로그인 후 도메인을 설정할 프로젝트 선택 > Settings > Domains에 들어간다.  
에
![[vercel domain 1.png]]

설정할 도메인 주소를 입력하고 "Add" 버튼을 클릭한다.  
![[vercel domain 2.png]]  

"or Nameservers" 탭을 클릭하면 기존 Netlify 설정으로 인해 "Invalid Configuration"이 뜬다. 하단의 "Intended Nameservers"를 복사해둔다.  
![[vercel domain 3.png]]


## 내 도메인의 네임서버 변경하기
나는 도메인을 [GoDaddy](https://dashboard.godaddy.com/venture?ventureId=cc83cb51-7164-46ea-a959-54de76e82480)에서 관리한다.    
GoDaddy에서 로그인을 하고 대시보드에서 "내 제품으로 이동"을 클릭한다.
![[GoDaddy domain 1.png]]

도메인 우측 상단 버튼을 클릭해 [[DNS]] 관리로 이동한다.  
![[GoDaddy domain 2.png]]

네임서버에 기존 Netlify의 네임서버가 등록되어있다. 변경 버튼을 클릭한다.  
![[GoDaddy domain 3.png]]

입력항목에 앞서 vercel에서 저장해두었던 네임서버를 등록하고 저장한다.  
![[GoDaddy domain 4.png]]

얼마지나지 않아 메일을 통해 네임서버가 정상적으로 변경되었음을 확인할 수 있었다.  
![[GoDaddy domain 5.png]]


## reference
- [https://kr.godaddy.com/help/change-nameservers-for-my-domains-664](https://kr.godaddy.com/help/change-nameservers-for-my-domains-664)
---
title   : Vercel에서 서브도메인 추가하기
date    : 2022-03-04 15:03:40 +0900
updated : 2022-06-06 22:51:38 +0900
aliases : ["Vercel에서 서브도메인 추가하기"]
tags    : ["Vercel", "How to"]
---
## Goal
Vercel에서 서브도메인을 추가하는 방법 알아보기 

현재 도메인이 Vercel 네임서버를 사용하고 있다. `blog.padosum.dev` 처럼 서브도메인을 만들고 싶었다.   

## 1. 도메인 선택하기
[dashboard](https://vercel.com/dashboard) > **Domains** 탭
![[vercel-domains.png]]
서브도메인을 추가하고 싶은 도메인을 선택한다.

## 2. DNS 레코드 추가하기
![[vercel-dns-records.png]]
- NAME: 원하는 서브도메인에 대한 호스트명 또는 접두사를 입력한다. 예를 들어 `blog.padosum.dev`라면 `blog`를 입력한다.
- TYPE:  `A`
- VALUE: 서브도메인의 IP 주소. 일반적으로 호스팅 계정의 IP 주소가 세팅되어 있다.
- 모두 입력 후에 `Add` 버튼을 클릭하면 하단 테이블에 항목이 추가된다.

## 3. 프로젝트의 도메인으로 설정하기
서브도메인을 설정할 프로젝트 대시보드 > Settings > Domains에서 설정이 가능하다.

나같은 경우에는 서브도메인을 추가하고 프로젝트 관리에서 설정하면 바로 적용이 되었는데 시간이 좀 걸릴지도 모르겠다.
 
## 같이 보기
- [[Add-Custom-Domain-to-Vercel|Netlify에서 Vercel로 도메인 설정하기]]

## reference
- [https://kr.godaddy.com/help/add-a-subdomain-4080](https://kr.godaddy.com/help/add-a-subdomain-4080)
- [https://vercel.com/docs/concepts/projects/custom-domains](https://vercel.com/docs/concepts/projects/custom-domains)

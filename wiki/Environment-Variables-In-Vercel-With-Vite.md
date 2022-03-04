---
title   : Vercel에서 환경 변수 설정하기 
date    : 2022-03-04 15:25:36 +0900
updated : 2022-03-04 15:29:55 +0900
aliases : ["Vercel에서 환경 변수 설정하기"] 
tags    : ["Vercel"]
---
## Goal
프로젝트 환경 변수를 Vercel에 배포 후 사용할 수 있도록 설정하기

프로젝트의 환경 변수를 로컬 파일인 `.env`에 지정했었다. 배포 후에는 당연히 파일이 로컬에만 있으므로 작동하지 않았다. 따로 설정이 필요했다.  

## 1. Environment Variable 페이지
[Vercel Dashboard](https://vercel.com/dashboard)에서 환경 변수를 설정할 프로젝트로 이동한다. 
**Settings** 메뉴에서 **Environment Variable** 페이지로 이동한다.

## 2. 환경 변수 추가하기
![[vercel-environment-variables.png]]
프로젝트에서 사용하는 환경 변수의 이름과 값을 똑같이 입력해서 `Add` 버튼으로 추가하면 된다. 정말 간단하다. 하지만 중요한 것은 **❗ 추가한 뒤에 
 꼭 다시 Deploy 해야 한다는 것**이다. 
추가해도 적용이 안되길래 지웠다 추가했다를 반복했는데 다시 배포하니 적용이 되었다...


## reference
- [https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables)
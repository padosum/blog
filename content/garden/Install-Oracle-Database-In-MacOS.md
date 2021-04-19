---
title   : Mac OS 오라클 db 설치하기 
excerpt : 
date    : 2020-06-10 21:47:50 +0900
updated : 2020-06-10 21:58:35 +0900
tags    : [Env]
parent  : 
layout  :
---

## Docker 설치 
[https://hub.docker.com/editions/community/docker-ce-desktop-mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
- 위 주소에 접속해 회원가입을 하고 설치 파일을 다운로드 한다.  
- 설치 


## Docker에 오라클 컨테이너 생성

```
docker search oracle-xe-11g
```
- 이미지를 검색한다. 

```
docker pull jaspeen/oracle-xe-11g
```
- 이미지 목록 중 원하는 이미지를 다운로드한다.

```
docker run --name oracle11g-study -d -p 8080:8080 -p 1521:1521 jaspeen/oracle-xe-11g
```
- 컨테이너 생성 & 실행 
- `oracle11g-study`에는 원하는 이름 
- `docker ps`: 실행중인 컨테이너 목록 보기

```
docker exec -it oracle11g-study sqlplus
```
- sqlplus 실행
- user-name, password 입력하면 새 계정이 등록된다.  
- `exit`: sqlplus 종료 


## sql developer 설치 

[https://www.oracle.com/kr/tools/downloads/sqldev-v192-downloads.html](https://www.oracle.com/kr/tools/downloads/sqldev-v192-downloads.html)
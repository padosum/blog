---
title   : URI 
date    : 2021-05-11 21:08:39 +0900
updated : 2021-05-11 21:09:28 +0900
aliases : 
tags: ["Web"]
---
## URI
**URI(Uniform Resource Identifier)**  
- Uniform: 리소스를 식별하는 통일된 방식
- Resource: 자원, URI로 식별할 수 있는 모든 것 
- Identifier: 다른 항목과 구분하는데 필요한 정보 

### URL
- Locator
- 리소스가 있는 위치를 지정 

### URN 
- Name
- 리소스에 이름을 부여  
- **URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화되지 않음** 

### URL 전체 문법 
- scheme://[userinfo@]host[:port][/path][?query][#fragment] 
- https://www.google.com:443/search?q=hello&hl=ko

- **scheme**
  - 주로 프로토콜(https) 
  - 클라이언트와 서버간의 규칙, 어떤 방식으로 자원에 접근할 것인가에 대해 
- **userinfo**
  - 거의 사용하지 않는다. URL에 사용자 정보를 포함해서 인증 
- **host** 
  - 호스트명(www.google.com) 
  - 도메인명 또는 IP 주소를 직접 사용가능 
- **port**
  - 포트 번호(443)
  - 일반적으로 생략한다.  
  - http는 80 포트, https는 443 포트를 주로 사용
- **path**
  - 패스(/search)
  - 리소스의 경로, 계층적 구조로 되어있다. 
- **query**
  - 쿼리 파라미터(q=hello&hl=ko)
  - `key=value` 형태  
  - `?`로 시작, `&`로 추가 가능 
  - query parameter, query string 등으로 불린다.  
- **fragment**
  - html 내부 북마크 등에 사용하고, 서버에 전송하는 정보는 아니다. 

## 웹 브라우저 요청 흐름 
1. 웹 브라우저에서 `https://www.google.com/search?q=hello&hl=ko`를 요청 
2. DNS 조회, IP: 200.200.200.2, 포트 생략 - 443
3. HTTP 요청 메시지 생성 
   - `GET /search?q=hello&hl=ko HTTP/1.1 Host: www.google.com`
4. HTTP 메시지 전송 
   1. 웹 브라우저가 HTTP 메시지 생성
   2. SOCKET 라이브러리를 통해 전달
      1. TCP/IP 연결 (IP, PORT)
      2. 데이터 전달
   3. TCP/IP 패킷 생성, HTTP 메시지 포함 
5. 수많은 노드를 거쳐 200.200.200.2(구글 서버)로 전달이 됨 
6. 구글 서버에선 요청 패킷을 받아서 HTTP 메시지를 해석한다.  
7. 구글 서버에서 응답 패킷을 전달한다. 
8. 웹 브라우저는 HTML을 렌더링한다.  

## reference 
- [inflearn-모든 개발자를 위한 HTTP 웹 기본 지식](https://inf.run/q4wV)
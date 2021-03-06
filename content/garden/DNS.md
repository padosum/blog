---
title   : DNS 
date    : 2021-04-23 20:23:54 +0900
updated : 2021-05-11 21:33:21 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
도메인(Domain)과 아이피에 대한 정보를 매칭해둔 전세계에 공개된 DB

TCP/IP를 기반으로 하는 통신은 모두 IP 주소를 기반으로 하고 있다.  
복잡한 IP 주소를 공개적으로 사용하기는 쉽지 않고, IP가 변경될 수 있다. 이 문제를 해결하기 위해 **DNS(Domain Name System)**라는 데이터베이스 시스템이 구성되었다. 
## DNS 사용 
1. 도메인 명 google.com 요청 
2. DNS 서버에서 응답, 도메인명이 `google.com`이면 IP가 `200.200.200.2`
3. `200.200.200.2`로 접속 

## 누가 관리하는지?  
- IP 주소를 관리하는 국제기관, ICANN에서 DNS를 관리한다.  
	- 분산 데이터베이스로 구성  
	- ICANN에서는 국가 및 기업에 .kr, .jp, .com, .net, .org 같은 최상위 도메인의 관리를 위임하고 DB가 거미줄처럼 분산되어 있다.  

## DB에 도메인을 추가하려면 ? 
- 여러 도메인 등록 대행 업체를 통해 인터넷으로 도메인 구입이 가능하다. 

## DB는 어떻게 조회하는가? 
- 53번 포트를 사용하는 TCP, UDP 기반의 DNS 프로토콜을 이용해 전세계에 공개된 DB 서버와 서버-클라이언트 통신으로 조회  
- 트리 구조의 분산 DB를 헤멜 필요가 있어서 많은 비용이 소모된다.
	- 정보 관리를 위한 Authoritative DNS 서버
	- 캐싱을 통해 질의 응답의 비용을 줄이기 위한 Recursive DNS 서버 
- 머신이 LAN에 연결되면서 IP를 할당받을 때, 자신의 IP와 함께 ISP에서 운영하는 Recursive DNS 서버의 주소를 같이 전달 받는다. 


## DNS 레코드
- DNS 서버(네임 서버)들은 DNS 프로토콜에 응대하는 서버 프로그램을 운영하고 있다. 
- 도메인 구입 후, 도메인 구매 대행 업체의 네임 서버에 도메인 정보를 등록할 수 있다. 
	- 다른 DNS 서버로 그 정보 관리를 위임하도록 설정 가능 

## reference 
- [https://okky.kr/article/400839](https://okky.kr/article/400839)
- [inflearn-모든 개발자를 위한 HTTP 웹 기본 지식](https://inf.run/q4wV)

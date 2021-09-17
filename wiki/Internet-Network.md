---
title   : 인터넷 네트워크
date    : 2021-05-10 21:51:28 +0900
updated : 2021-05-10 21:51:35 +0900
aliases : 
tags: ["Web"]
---
## 인터넷에서 컴퓨터 둘은 어떻게 통신하나?  
- 클라이언트와 서버 
	- 인터넷에 있는 수많은 중간 노드들을 거쳐서 메시지가 전송이 된다. 

## IP (인터넷 프로토콜)
### 역할
- 지정한 IP 주소(IP Address)에 데이터 전달
- 패킷(Packet)이라는 통신 단위로 데이터 전달
	- IP 패킷에는 출발지 IP, 목적지 IP, 전송할 데이터, 기타 ...의 정보가 담겨있다. 
- 인터넷으로 던진 패킷은 수많은 노드들을 거치고 목적지로 도달한다.  
- 목적지에서도 잘 받았다고 패킷을 전달한다. 
- 요청/응답시 무조건 같은 노드를 거치는 것은 아니다.  

### 한계  
- 비연결성
	- 패킷을 받을 대상이 없거나 서비스가 불가한 상태에도 패킷을 전송한다. 
- 비신뢰성
	- 패킷이 사라질 수 있다.
	- 패킷이 순서대로 오지 않을 수 있다. 
- 프로그램 구분
	- 같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 2개 이상이라면 어쩌나? 

## TCP,  UDP
IP의 한계를 해결하기 위해 등장했다. 

### 인터넷 프로토콜 스택의 4계층 
- 애플리케이션 계층 - HTTP, FTP
- 전송 계층 - TCP, UDP
- 인터넷 계층 - IP
- 네트워크 인터페이스 계층  

### TCP/IP  
전송 제어 프로토콜(Transmission Control Protocol)  
- TCP 세그먼트에는 출발지 PORT, 목적지 PORT,  전송제어, 순서, 검증과 관련된 정보들이 추가로 들어간다.  
	- IP만으로 해결이 안되는 문제들을 해결하기 위해  

#### 특징
- 연결지향 - TCP 3 way handshake 
	- TCP 프로토콜로 연결하는 과정 
		1. 클라이언트 → SYN → 서버, SYN: 접속 요청
		2. 서버 → ACK → 클라이언트, ACK: 요청 수락
		3. 클라이언트 → ACK → 서버, ACK와 함께 데이터도 전송 가능  
	- 클라이언트와 서버가 서로 신뢰가 가능하다. 
	- **진짜 물리적으로 연결이 된 것이 아니라 개념적으로 연결이 된 것이다.**
- 데이터 전달 보증
	- 데이터를 전송하면 서버에서 데이터를 잘 받았다고 응답을 해준다. 메시지가 전달이 잘 되었는지 확인이 가능한 것  
- 순서 보장
- 신뢰할 수 있는 프로토콜 


### UDP 
사용자 데이터그램 프로토콜(User Datagram Protocol)  
- 기능이 거의 없다. 
- 데이터 전달 및 순서가 보장되지 않지만, **단순하고 빠르다.** 
- IP와 거의 같고 PORT와 체크섬(검증) 정도만 추가되었다.  
- TCP 프로토콜이 대부분을 차지하는데 최근에는 UDP도 많이 사용되어지고 있다. 

## PORT 
- 같은 IP내에서 프로세스를 구분 
	- 하나의 IP에서 애플리케이션마다 패킷을 구분하기 위해 사용하는 것 
	- 컴퓨터가 아파트라면, 포트는 아파트의 호수라고 비유할 수 있다.  
- 0 ~ 65535 할당 가능  
- 0 ~ 1023: 잘 알려진 포트, 사용하지 않는 것이 좋음
	- FTP - 20, 21
	- TELNET - 23 
	- HTTP - 80 
	- HTTPS - 443

## [[DNS]]

## 생각 
- 대학교 시절 때 공부했던 내용들이 다시 머릿속에 조금씩 떠올랐다.  
	- 그때는 마냥 시험공부고 외워야지 하는데 지금 다시 배우니 큰 그림을 그리는 것에 도움이 되겠다는 생각이 들었다.  


## reference 
- [inflearn-모든 개발자를 위한 HTTP 웹 기본 지식](https://inf.run/q4wV)
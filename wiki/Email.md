---
title   : 이메일 
date    : 2021-04-23 20:34:21 +0900
updated : 2021-04-23 20:34:27 +0900
aliases : 
tags: ["Computer Science"]
---

## SMTP  
- 이메일을 주고받을 때, 
	- 송신자는 SMTP(Simple Mail Transfer Protocol)라는 프로토콜을 통해 메일서버에 메일의 발신을 요청 
	- 대부분의 이메일 서비스 제공자(구글, 네이버 등)들은 웹이나 다른 GUI 프로그램을 통해 메일을 보낼 수 있도록 SMTP에 쓰이는 포트(25번)를 외부에 공개한다. 
	- 발신 메일 서버의 프로세스는 [[DNS]] 조회를 통해 수신 메일 서버를 파악, 작성된 이메일을 전달한다. 
	- 수신 메일 서버에서는 스팸 여부를 다양한 기준으로 판단해서 메일을 필터링해 서버에 보관하게 된다. 

## POP3, IMAP 
- 이메일을 주고받을 때,
	- 수신자는 이메일 서비스 제공자가 제공하는 POP3(Post Office Protocol) 또는 IMAP(Internet Message Access Protocol) 를 통해 웹, GUI 프로그램 등 여러 클라이언트에서 이메일을 읽을 수 있다.  
- POP3는 수신자가 클라이언트에서 이메일을 다운로드하면 서버에서 이메일을 바로 삭제한다. 반면 IMAP은 사용자가 삭제하기 전까지 이메일을 서버에 보관한다. 

## reference
- [https://okky.kr/article/400839](https://okky.kr/article/400839)
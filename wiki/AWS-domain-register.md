---
title   : AWS EC2 도메인 연결하기 
date    : 2023-07-03 21:49:47 +0900
updated : 2023-07-03 22:25:21 +0900
aliases : ["AWS EC2 도메인 연결하기"] 
tags: ["web", "How to"]
draft : false
---

## Goal
EC2 인스턴스에 도메인을 연결하자.


## 도메인 구입

도메인을 구입할 수 있는 사이트에서 도메인을 구입한다. 이번엔 [gabia](https://www.gabia.com/)를 사용해봤다.  


## 도메인 연결하기

AWS console 콘솔에 로그인한 후에 검색창에 `Route 53`을 입력한다.  
![[AWS-route-53.png]]

[서비스 이름에 왜 53번이 들어가나 했더니 well known port로 DNS 서버가 port 53으로 지정되어 있어서 였다.](https://aws.amazon.com/ko/route53/features/)


왼쪽 메뉴에서 '호스팅 영역'을 클릭하고, `호스팅 영역 생성` 버튼을 클릭한다.

![[AWS-route-53-hosted-zones.png]]

도메인 이름에 구입한 도메인을 일력하고 `호스팅 영역 생성` 버튼을 클릭한다.


호스팅 영역 목록에서 `레코드 생성` 버튼을 클릭하면 다음 화면이 나온다.
![[AWS-route-53-create-record.png]]

**레코드 유형은 `A`로 그대로 선택하고 값 부분에 EC2 인스턴스의 퍼블릭 IP를 입력한다.** 그리고 `레코드 생성` 버튼을 클릭한다.

목록으로 돌아오면 4가지 주소를 확인할 수 있다.
![[AWS-Route-53-list.png]]

## DNS 설정하기

gabia 로그인 후 My가비아에서 도메인을 클릭한다.
![[mygabia-domain.png]]

도메인 목록에서 `관리` 버튼을 클릭하면 네임서버를 확인할 수 있다. `설정` 버튼을 클릭하고 1차, 2차, 3차, 4차에 앞서 AWS console에서 레코드 생성할 때 얻은 주소들을 각각 넣어주면 된다.


---

1~2일이 걸릴 수 있다고 했는데 당일에 연결이 되었다. 


## reference

설정 과정에서 이해가 안되는 부분이 많았는데 [이 글](https://inpa.tistory.com/entry/WEB-%F0%9F%8C%90-DNS-%EB%A0%88%EC%BD%94%EB%93%9C-%EC%A2%85%EB%A5%98-%E2%98%85-%EC%95%8C%EA%B8%B0-%EC%89%BD%EA%B2%8C-%EC%A0%95%EB%A6%AC#ns_name_server)이 도움되었다. 


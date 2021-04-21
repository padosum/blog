---
title   : REST API
date    : 2021-04-20 00:18:49 +0900
updated : 2021-04-20 00:19:16 +0900
private : false
hidden  : false
showReferences : true
---

REST(Representational State Transfer)  

- 클라이언트-서버 구조의 서비스에서 HTTP (일반적으로) 프로토콜을 기반으로 하는 서버를 구현할 수 있는 [[아키텍처]] 의 한 종류  
- 범용성 
  - 웹 브라우저를 포함해 HTTP 통신이 가능한 모든 클라이언트 플랫폼을 타겟으로 하기 때문  
  - REST API의 HTTP Response Body는 HTML 보다는 JSON, XML 등 여러 플랫폼에서 사용하기 적절한 포맷을 사용한다.  
- 서버의 유용하는 자원들에 대해 CRUD(Create, Read, Update, Delete) 기능을 갖출 수 있도록 API를 설계  
  - 다중 플랫폼을 타겟으로 하여 데이터 제어, 조회를 제공하는 서버에 REST [[아키텍처]]를 도입하면 적절한 것! 
- REST API의 각 엔드포인트는 **자원의 명사형(보통 복수형)에 자원의 고유 번호(PK)를 결합, HTTP Method를 동사로 결합**해 API 엔드포인트 자체가 자기서술적인 성격을 띄고 있다.   
- REST API의 응답은 HTTP의 **Response Status Code를 활용, HTTP Response 헤더 자체가 그 결과를 서술할 수 있도록**한다.  


## Stateless 
- REST의 특성 
- 상태가 없다 -> 하나의 요청이 그 자체로 고립되고 완전, 로그인 등과 같은 이전의 요청에 영향을 받지 않고 항상 같은 결과를 낸다는 의미  
	- 서버에서 클라이언트의 상태를 관리하지 않아야 한다.  
- 전통적인 웹 -> 클라이언트의 상태를 관리하기 위해 쿠키-세션을 기반으로 클라이언트의 상태를 추적, 관리  
- REST -> Stateless 구조, 세션을 기반으로 클라이언트를 추적하는 것은 서버 쪽에 지속적인 비용을 초래 -> 대규모 서비스로의 확장에 걸림돌, 범용성을 위해 (웹브라우저를 위한) Cookie 기반의 세션을 이용하지 않도록

### 그렇다면 서버 측에선 어떻게 클라이언트의 신원을 확인할까? 
#### REST API KEY 
- 서버측에 미리 **API KEY(추측하기 힘든 무작위 문자열)**생성
	- 클라이언트가 API를 호출할 때마다 HTTP헤더의 특정 필드 또는 쿼리스트링을 통해 전달한다.  
	- 서버측은 KEY를 통해 클라이언트의 신원과 권한을 확인 
- API가 노출되면 메시지 위조 등의 공격을 받기 쉽다. 
	- 메세지 전문을 암호화(HTTPS 등)할 필요가 있음 

#### OAuth 프로토콜 
- 서비스 제공자(API 제공자)가 서비스 이용 증대를 위해 일부 API를 공개한다해도 서비스 소비자에게 아무런 제한 없이 API KEY 만으로 고객의 개인정보 등에 대한 접근 권한을 허가할 수는 없다.  
- **고객, 서비스 제공자, 서비스 소비자, 3자가 얽힌 관계**에서 API 제공을 위해 **OAuth(Open Authentication)**이 생김 

1. 서비스 소비자(Consumer)는 서비스 제공자(Provider)가 제공하는 고객의 특정 정보에 대한 API를 이용하기 위해 **Provider에게 User의 위임장(Request Token)을 생성해주길 요청**
2. Provider가 Consumer에게 위임장을 생성해주면, **Consumer는 다시 User에게 제공받은 위임장을 확인해주길 요청**
3. User가 위임장을 확인 및 수락하면 **Provider는 Consumer에게 위임에 대한 확인서(Access Token)를 발급**
4. 이후 Consumer는 그 확인서가 유효한 동안, **위임  받은 권한을 이용해 Provider의 API를 호출**

- OAuth 프로토콜은 자사의 API를 공개하는 것 외에, 같은 방식으로 자사의 인증 로직을 어플리케이션 서버에서 분리하여, 별도의 인증 서버를 구축하거나, SSO(Single Sign On)과 같은 통합 인증 서비스를 구축하는 데 이용되기도 한다. 

#### JWT (JSON Web Token)  
- API KEY 방식, OAuth의 Access Token 구현방식은 서버가 API 호출 요청에 대해 API KEY나 Access Token이 유효한지 확인을 거침 -> 호출할 때마다 토큰이 해당 유저의 상태를 열람하는 비용을 초래한다.   
	- 근본적인 이유 -> **토큰 자체가 무의미한 문자열**  
- 무의미한 토큰을 -> 의미(유저의 상태를 포함한)있는 토큰으로 구성한다면? -> 서버측 비용을 절감하며 Stateless한 아키텍처 구성이 가능해진다. 
- JWT는 유저의 상태(고유번호, 권한, 토큰 만료일자 등)를 JSON 포맷으로 구성, 이 텍스트를 특정 알고리즘(Base 64)에 따라 일련의 문자열로 인코딩한 토큰 
- 토큰 위변조 문제
	- 방지를 위해 토큰의 뒷 부분의 토큰의 내용과 특정 암호를 기반으로 Signature 문자열을 붙여 토큰을 생성 

## 참고 
- [https://okky.kr/article/400839](https://okky.kr/article/400839)
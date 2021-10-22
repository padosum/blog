---
title   : CI/CD 
date    : 2021-10-22 22:37:53 +0900
updated : 2021-10-22 22:38:26 +0900
aliases : ["CI/CD"] 
tags    : ["Development"]
---

프로젝트를 배포하고 문제가 생겼을 때, 문제를 수정하고 컴파일/빌드/테스트/배포 과정을 거쳐야 한다. 이 과정은 시간도 많이 걸리고 실수하기 쉽다. 그리고 또 문제가 생기면 반복해야 한다. 그래서 이 과정을 자동화할 수 있는 방법인 **CI/CD**가 생겼다.    
CI/CD 방법의 대표적인 툴은 **Travis**와 **Jenkins**가 있다. 

## CI (Continuous Integration)
**지속적 통합**  
개발자가 코드 변경 사항을 중앙 리포지토리에 정기적으로 병합하면 자동으로 빌드와 테스트가 진행된다. 그래서 배포해야 버그를 수정할 수 있는 기존 문제를 빠르게 찾고 수정할 수 있다.  
- 개발자가 수동 작업에 대한 부담을 덜고 오류, 버그를 줄이는데 도움이 되며 생산성이 향상된다.
- 테스트를 수행하면서 버그를 조기에 발견하고 해결할 수 있다.
- 자주 프로젝트 결과물을 업데이트할 수 있다.  

## CD (Continuous Delivery/Deployment)
**지속적 제공/배포**  
지속적 제공이란 개발자들이 적용한 변경 사항이 테스트를 거쳐 리포지토리에 자동으로 업로드되는 것을 뜻한다.  
지속적 배포는 CI를 통해 리포지토리에 통합된 코드를 사용자가 사용할 수 있는 배포환경까지 릴리즈하는 것을 의미한다.
	

## reference
- [https://tecoble.techcourse.co.kr/post/2021-08-14-ci-cd/](https://tecoble.techcourse.co.kr/post/2021-08-14-ci-cd/)
- [https://aws.amazon.com/ko/devops/continuous-integration/](https://aws.amazon.com/ko/devops/continuous-integration/)
- [https://www.redhat.com/ko/topics/devops/what-is-ci-cd](https://www.redhat.com/ko/topics/devops/what-is-ci-cd)
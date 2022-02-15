---
title   : 다른 기기(컴퓨터/모바일)에서 localhost에 접근하는 방법 
date    : 2022-02-15 13:13:09 +0900
updated : 2022-02-15 13:52:53 +0900
aliases : ["다른 기기에서 localhost에 접근하는 방법"]
tags    : ["How to", "Web"]
---
## Goal
내 컴퓨터에 실행 중인 웹페이지를 모바일에 실행시키는 방법 알아보기  

토이 프로젝트 작업을 하다가 내 폰으로 실행시켰을 때의 화면을 보고 싶었다. 예전에 윈도우에서는 방화벽 설정에 접속해서 포트를 열면 같은 네트워크에 있는 다른 사람의 컴퓨터나 모바일에서 접속이 가능했는데 mac에서 할 수 있는 방법이 필요하다.  

## Visual Studio Code Live Server Extension 사용하기  
[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 확장 프로그램을 사용하면 손쉽게 페이지의 로컬 개발 서버를 실행시킬 수 있다. 그렇다고 해서 모바일 기기의 웹 브라우저에서 `localhost:포트번호`에 접속하면 접속이 되지 않는다.  
**현재 웹 서버가 실행 중인 데스크탑과 모바일 기기가 같은 WiFi가 연결되었다는 전제하에** 데스크탑의 IP 주소로 접속을 해야 한다.     
live server로 실행된 주소가 `http://127.0.0.1:5501/`라면 `http://ip주소:5501/`로 접속해야 하는 것이다.  

### ip 주소 확인하는 방법
1. command line에 `ifconfig | grep "inet " | grep -v 127.0.0.1`을 입력한다.
2. IP 주소가 여러 개가 나올 수 있는데 하나씩 포트번호까지 붙여서 모바일에서 실행해본다. 

## Vite 
vite의 개발 서버를 모바일에서 실행하려면 확장 프로그램을 사용한 것과 마찬가지로 같은 네트워크에 있다는 전제하에 두 가지 방법으로 설정할 수 있다.  
`host` 옵션은 서버가 수신할 IP 주소를 지정한다. 로컬 네트워크에서 서버를 사용할 수 있도록 지정하면 된다.    

### CLI 에서 
`vite` 명령어에 `--host`나 `--host 0.0.0.0`을 붙여서 실행한다.  
```bash
$ vite --host 
$ vite --host 0.0.0.0
```

### vite.config.js 파일에서 
모든 주소를 수신하려면 값을 `0.0.0.0` 또는 `true`로 설정하면 된다.  
```
// vite.config.js
export default defineConfig({
  server: {
    host: true // 또는 0.0.0.0
  }
})
```


## 생각 
-  "port" 여는 방법에 대해 검색하니 firewall...하면서 여러 설정을 해야 하는 것들이 나왔는데 너무 복잡하고 제대로 되지도 않았다.  
- 더 찾아보니 `ng serve`를 사용하는 사람의 [글](https://stackoverflow.com/questions/47493325/how-do-i-use-a-mobile-phone-to-open-localhost4200)이 나왔는데 angular cli를 사용하는 사람인 것 같으니 vite도 비슷한 옵션이 있지 않을까 하는 생각으로 이어졌고, 개발 서버 실행시 터미널에 나오는 내용에 같은 옵션에 대한 설명이 나와있었다. 그리고 공식 문서에도 내용을 찾아볼 수 있었다. 
- 다음부터 어떤 툴을 쓰더라도 이 부분에 대해 기억할 수 있겠다는 생각이 들었다.  

## reference
- [https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device](https://stackoverflow.com/questions/4779963/how-can-i-access-my-localhost-from-my-android-device)

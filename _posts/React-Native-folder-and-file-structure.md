---
title   : 🐝 리액트 네이티브 폴더와 파일 구조
excerpt : 
date    : 2020-05-23 13:56:01 +0900
updated : 2020-05-23 13:57:42 +0900
tags    : [React]
---

![react-native-folder](/images/react-native-folder.png)

- index.js  
리액트 네이티브 프로젝트의 시작 파일. 이 파일을 시작으로 리액트 네이티브의 자바스크립트 코드가 번들링(Bundling)[^1]된다. 
- App.js  
표시되는 화면에 내용이 들어가 있는 파일
- android  
안드로이드 프로젝트가 담겨 있는 폴더
- android/app/build.gradle  
안드로이드 앱을 빌드, 배포할 때 사용하는 파일
- android/app/src/main/java/com/프로젝트명/MainActivity.java, MainApplication.java  
안드로이드 앱의 메인 파일
- android/app/src/res  
안드로이드 앱 아이콘 또는 시작 화면 등의 리소스를 관리하는 폴더
- ios  
iOS 프로젝트가 담겨 있는 폴더
- ios/프로젝트명/AppDelegate.h, AppDeletegate.m  
iOS 앱의 메인 파일
- ios/프로젝트명/Info.plist  
iOS 프로젝트의 설정 파일
- ios/프로젝트명.xcworkspace  
iOS 프로젝트를 Xcode로 시작하기 위한 파일 
- ios/프로젝트명/Podfile  
iOS에서 코코아포드라는 의존성 관리자(Dependency Manager)를 사용하여 라이브러리를 관리, 오브젝티브-C, Switft에서 npm과 같은 역할을 한다.  
npm -> package.json으로 의존성을 관리하듯, 코코아포드에서는 Podfile을 사용해 의존성을 관리 

[^1]: 여러 가지 파일을 모아서 하나로 만드는 것 


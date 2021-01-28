---
title   : ⚛️  리액트 네이티브 시작하기 - 1  
excerpt : 개발 환경 설정
date    : 2020-05-17 19:33:15 +0900
updated : 2020-05-23 23:35:26 +0900
tags    : [React]
parent  : 
layout  :
---

## 맥 개발 환경 설정

### 홈브루 설치 
> **홈브루(Homebrew)**   
맥에서 패키지를 설치하고 관리할 수 있는 맥용 패키지 관리자 

- 홈브루 설치 확인
    ``` zsh
    brew --version 
    ```
    ``` zsh
    Homebrew 2.2.16
    Homebrew/homebrew-core (git revision b267a; last commit 2020-05-17)
    Homebrew/homebrew-cask (git revision 44ef20; last commit 2020-05-16)
    ```
- 설치가 되어 있지 않으면 다음 링크로 이동해 설치한다.
    - [https://brew.sh/](https://brew.sh/)


### Node 설치
- 명령어를 실행해 설치
    ``` zsh
    brew install node
    ```
- 설치가 완료되면 다음 명령어로 확인 
    ``` zsh
    node --version
    ```
    ``` zsh
    v13.7.0
    ```
- 노드의 패키지를 관리하는 노드 패키지 매니저(npm) 설치 확인
    ``` zsh
    npm --version
    ```
    ``` zsh
    6.13.6
    ```

### watchman 설치
> **watchman**  
특정 디렉토리나 파일을 감시하다가 변경이 발생하면 특정 동작을 실행하도록 하는 역할. 리액트 네이티브에서는 소스코드의 변경이 발생하면 자동적으로 빌드하고 디바이스 또는 시뮬레이터에 업로드하기 위해 사용한다. 

- 다음 명령어로 설치
    ``` zsh
    brew install watchman
    ```
- 설치 확인
    ``` zsh
    watchman -v
    ```
    ``` zsh
    4.9.0
    ```

### 리액트 네이티브 CLI 설치 
- 다음 명령어로 설치 
    ``` zsh
    npm install -g react-native-cli
    ```
- 설치 확인
    ``` zsh
    react-native --version
    ```
    ``` zsh
    react-native-cli: 2.0.1
    react-native: n/a - not inside a React Native project directory
    ```

### Xcode 설치 
1. App Store를 실행해 Xcode를 검색 후 설치 
2. Xcode 실행 후 왼쪽 상단 Xcode 메뉴 > Preferences...
3. Locations > Command Line Tools 설정 (최신 버전으로)

### Cocoapods 설치

> **Cocoapods**  
iOS 개발에 사용되는 의존성 관리자. 노드와 노드 패키지 관리자 관계와 비슷한 관계 

- 다음 명령어를 사용해 설치 
    ``` zsh 
    sudo gem install cocoapods 
    ``` 
- 설치 확인 
    ``` zsh
    pod --version
    ```
    ``` zsh
    1.9.1
    ```

### Java 개발 킷 설치 
- 안드로이드 개발을 위한 설치 
- 다음 명령어를 사용해 설치 
    ``` zsh
    brew tap AdoptOpenJDK/openjdk 
    ```
    ``` zsh
    brew cask install doptopenjdk8
    ```
- 설치 확인 
    ``` zsh 
    java -version
    ```
    ``` zsh
    java version "13.0.1" 2019-10-15
    Java(TM) SE Runtime Environment (build 13.0.1+9)
    Java HotSpot(TM) 64-Bit Server VM (build 13.0.1+9, mixed mode, sharing)
    ```
- 자바 컴파일러 설치 확인 
    ``` zsh 
    javac -version
    ```
    ```
    javac 13.0.1
    ```

### 안드로이드 스튜디오 설치
- [https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html) 접속 후 다운로드 버튼을 클릭해 다운로드 후 설치 
- 설치 마법사에서 SDK Components Setup에 "Android Virtual Device" 항목을 선택해야 한다. 
- 설치가 완료된 후 우측 하단 Configure를 선택 > SDK Manager 선택 
    - 오른쪽 하단 Show Package Details 체크 
    - Android 9.0(Pie) 하위에서 다음 리스트 선택 후 OK 
        - Android SDK Platform 28
        - Intel x86 Atom System Image 
        - Google APIs Intel x86 Atom System Image
        - Google APIs Intel x86 Atom_64 System Image (내가 설치할 땐 이 항목이 없었음...😞)  
    
#### 환경 변수 설정 
```
vim ~/.zshrc
```
- 아래 내용 추가 후 저장 
    ``` zsh
    export ANDROID_HOME=안드로이드SDK 설치 위치/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```

- 환경 변수가 잘 설정되었으면 터미널에 `adb` 입력 후 다음과 같은 결과를 확인할 수 있다.
    ```
    Android Debug Bridge version 1.0.41
    Version 30.0.1-6435776
    Installed as /Users/aalto/Library/Android/sdk/platform-tools/adb
    ```


### 리액트 네이티브 앱 실행하기

#### 프로젝트 생성 
리액트 네이티브는 버전이 업데이트될 때 문제가 생길 수 있으므로 버전을 고정하고 사용하기를 권장한다. 
- 다음 명령어 실행
    ``` zsh
    npm config set save-exact=true
    ```
- 프로젝트 생성 명령어
    ``` zsh
    react-native init 프로젝트명 
    ```
    - 특정 버전으로 프로젝트 생성하기 
    ``` zsh
    react-native init -version 0.59.10 프로젝트명 
    ```

- iOS 시뮬레이터로 실행하기 
```zsh
cd 프로젝트명
react-native run-ios 
```  

![ios-simulator](https://user-images.githubusercontent.com/6129764/106074130-a9db5880-614e-11eb-9118-036b0d348c78.png)
- 안드로이드로 실행하기 
``` zsh
react-native run-android 
```  

![android-simulator](https://user-images.githubusercontent.com/6129764/106074139-ab0c8580-614e-11eb-82be-2efa03803dbb.png)


오랜만에 학교에서 방학때 특강들으면서 안드로이드 앱 만들었던 추억이 새록새록 떠올랐다. 지금 맥북에서 비행기 이륙소리가 들리긴 하지만...열심히 해서 원하는 것을 만들어 보겠다!! 😈

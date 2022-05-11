---
title   : Python으로 Telegram Bot 만들기 
date    : 2022-05-11 11:31:16 +0900
updated : 2022-05-11 16:53:30 +0900
aliases : ["Python으로 Telegram Bot 만들기"]
tags    : ["Python", "How to"]
---
## Goal
Python으로 무언가 필요한 알림을 보내주는 Telegram Bot 만들기

Bot(이하 봇)은 인터넷에서 작동하며 반복적인 작업을 수행하는 소프트웨어 프로그램을 말한다.[^1] 최근에 쇼핑몰의 재고 확인 등 내가 직접 들어가서 체크하기 번거로운 일들을 Telegram Bot에게 맡겨보았다. 거기서 겪은 시행착오들을 여기에 기술해놓으려고 한다.

## Telegram 봇 만들기
우선 나는 알림을 보내는 기능이 필요했기 때문에 Telegram(이하 텔레그램)을 선택했다. 라인에서도 [LINE Messaging API](https://developers.line.biz/en/docs/messaging-api/) 를 제공하고 있었는데 텔레그램을 선택한 이유는 별다른 건 없고 처음 본 게시물이 텔레그램을 이용했기 때문이었다. 다음에 기회가 된다면 LINE으로도 만들어봐야겠다!

우선 나는 가입이 되어 있지 않았기 때문에 새로 가입을 했다.
[텔레그램 어플리케이션](https://telegram.org/apps) 을 원하는 플랫폼으로 내려받은 뒤 가입을 진행한다. 텔레그램은 봇을 만들기 위한 "BotFather"라는 계정이 있다. 모든 것을 지배하는 하나의 봇이라고 한다. 이름을 재치있게 잘 지었다는 생각이 들었다. 

검색창에 "botfather"를 검색해 파란딱지가 붙은 "BotFather"를 클릭한다.
![[botfather.png]]

채팅에 `/start`를 입력해서 보내면 명령어들을 확인할 수 있다. 설명에 나와있는 것처럼 `/newbot` 메시지를 보내서 새 봇을 만든다. 이제 봇을 만들기 위한 대화가 진행된다. 


다음과 같이 봇의 이름을 무엇으로 할지 채팅을 통해 이름을 보낸 뒤 username을 보내야 한다. **해당 username은 반드시 `bot`으로 끝나야한다.** 
나는 봇의 이름은 padosum, username은 padosum_bot으로 했다.
![[botfather_newbot.png]]

username을 입력하고 나면 BotFather가 새 봇이 생성되었다고 알려주면서 token을 전달해준다. **해당 토큰을 안전하게 보관해두자.**
![[botfather_token.png]]
BotFather가 전달해준 링크(`t.me/bot의 username`)을 클릭하면 봇과 채팅을 시작할 수 있다. 아래 start 버튼을 누르면 된다.
![[botfather_start.png]]
봇에게 반가운 마음을 담아 인사를 보내도록 하자.
![[botfather_hello.png]]


## Python 스크립트로 메시지 보내기

### 프로젝트 생성
우선 프로젝트를 진행하기 위한 디렉토리를 생성 후 이동하자.
```shell
$ mkdir 디렉토리명
$ cd 디렉토리명
```

디렉토리 안에 python 파일을 추가한다. 나는 `bot.py`라는 이름으로 추가했다.
```shell
$ touch bot.py
```

이제 `bot.py` 내부에 텔레그램 봇을 위한 스크립트를 작성하면 된다. 
먼저 텔레그램 봇과 연동을 위해 텔레그램 모듈을 설치한다.
```shell
$ pip3\ install python-telegram-bot --upgrade
```


### 봇을 통해 나에게 메시지 보내기

**나**에게 채팅을 보내기 위해 **내 chat_id** 값이 필요하다. 브라우저 주소창에 `https://api.telegram.org/botXXX:YYYY/getUpdates`을 입력해 접속한다.
`XXX:YYYY`에 들어가는 값은 봇을 만든 후 전달받은 **토큰**을 넣어주면 된다.

그러고 나서 봇에게 아무 메시지나 보낸 뒤 새로고침을 한다. (아무 메시지나 보내면 되지 않는 다는 의견도 있다.[^2] `/my_id`를 보내보자.)
새로고침 후 나타나는 값들 중 `"chat": {"id": id값}` 에 있는 id값이 내 chat_id이다.
![[botfather_chatid.png]]

다음과 같이 코드를 입력하고 실행해보자.
```python
# bot.py
import telegram

token = 'bot 토큰'
bot = telegram.Bot(token=token)

chat_id = 아까 확인한 내 chat_id
bot.sendMessage(chat_id=chat_id, text="👋 Hello")
```

다음 명령어로 스크립트를 실행한다.
```shell
$ python3 bot.py
```

잘 작동되는 것을 확인할 수 있다. 여기까지 작동한다면 반은한 것이다. 이제 남은 것은 내 입맛대로 봇이 작동하게 하는 것이다. 
![[botfather_message.png]]


### 사이트 크롤링하기

내가 만들 봇의 기능을 정리하면,
```
웹 사이트를 크롤링해서 -> 상품의 재고 여부를 확인하고 -> 현재 재고여부를 텔레그램 메시지로 알림을 보낸다.
```

텔레그램 메시지를 보내는 방법을 알게되었으니, 이제 남은 것은 웹 사이트를 크롤링해서 상품의 재고 여부를 확인하는 것이다.

Python으로 웹 페이지를 크롤링을 할 때 [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/)라는 라이브러리를 많이 사용하고 있었다. 
### Beautiful Soup
Beaultiful Soup를 간단하게 사용하는 방법은 다음과 같다.
먼저 라이브러리를 설치한다.
```shell
$ pip3 install bs4 
```

GET 요청을 하고 받아온 내용을 `BeautifulSoup`에 넘긴다. 
```python
with requests.Session() as s:
    # 재고를 확인할 사이트 주소
    url = 'https://sdfsdfsfsf.com'
    
    res = s.get(url)
    if res.status_code == requests.codes.ok:
        html = res.text
        soup = BeautifulSoup(html, 'html.parser')
```

soup에 웹 페이지의 내용을 긁어온(크롤링) 것을 확인할 수 있다. 
자, 이제 가져온 웹 페이지 내용을 통해 재고 여부를 확인만 하면 된다!
어떻게 할 수 있을까? 이건 웹 페이지마다 다르다. 그래서 직접 확인이 필요하다.

내가 확인할 웹 페이지는 재고가 없는 상품은 다음과 같이 "SOLDOUT"이라 적힌 버튼이 나타나 있다. (~~자주 사용하는 사람은 알겠지만 네이버 쇼핑이다.~~)
![[botfather_soldout.png]]
그렇다면 웹 페이지를 긁어와서 SOLDOUT 버튼이 있는지 없는지만 확인하면 되겠다!
[Beautiful Soup 문서](https://www.crummy.com/software/BeautifulSoup/bs4/doc/) 를 살펴보면 다양한 기능을 확인할 수 있다. 나는 여기서 [CSS 선택자](https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors)를 사용하는 것이 익숙했기 때문에 사용해봤다.

아래 코드는 상품 리스트를 선택한 내용이다. 웹 페이지의 `#content` 요소 안에 `ul`이 총 3개가 들어 있었다. 거기서 마지막 `ul`을 `search_result`에 담았다.
그리고 나서 그 내부의 `li`를 `products` 변수에 담았다.
```python
soup = BeautifulSoup(html, 'html.parser')
search_result = soup.select('#content ul')[2]
products = search_result.select('li')
```

이제 `for in` 반복문을 사용해서 각 상품들의 재고 등 웹 페이지에 나타나있는 정보들을 얻어낼 수 있다. 마찬가지로 [CSS 선택자](https://poiemaweb.com/css3-selector) 를 이용해서 내가 원하는 정보를 골라낸다.
`find`를 사용하면 선택한 요소에서 어떤 요소를 찾아낼 수도 있다. 나는 상품안에 있는 `a` 태그를 `find`를 이용해 찾고 `get`으로 `href` 어트리뷰트를 얻어냈다.
```python
for p in products:
  name = p.select('strong')[0].text
  price = p.select('strong span')[0].text
  url = f"{base_url}{p.find('a').get('href')}"
```

상품의 재고 여부는 해당 웹 페이지의 SOLDOUT 버튼이 `span` 태그에 `text.blind` 클래스를 가지고 있어서 다음과 같이 확인할 수 있었다.
```python
inStock = True if len(
                    p.select('span.text.blind')) == 0 else False
```

재고여부에 따라 봇이 텔레그램 메시지를 전송한다.
```python
if inStock:
	bot.sendMessage(chat_id=chat_id, text="재고 있음")
else:
    bot.sendMessage(chat_id, text="품절")
```

이 방법은 해당 웹페이지가 해당 HTML 구조를 사용할 때 가능하다. 만약 변경이 되면 변경될 때마다 스크립트에서 `select`나 `find` 등을 사용한 부분에 수정이 필요할 수 있다. 클래스 명이나 아이디값 등이 변경될 수 있기 때문이다.

### 스케줄러 등록
#### schedule
이 작업을 내가 필요할 때만 실행한다면 상관없지만 재고 확인 같은 경우에는 매일 특정 시간 간격으로 확인해서 나에게 알려준다면 고마울 것이다. 이럴땐 정해진 시간에 스크립트를 실행해주는 예약 라이브러리인 [schedule](https://pypi.org/project/schedule/)이 있다.

다음과 같이 명령어를 입력해 설치한다.
```shell
$ pip3 install schedule
```

라이브러리를 추가해주고, 지금까지 작성한 스크립트를 함수에 집어넣자. 다음과 같이 코드를 작성하면 매일 1시간 마다 `job`이라는 함수가 실행이 된다.
```python
import schedule

def job():
	# 작성한 스크립트 내용...

# 1시간 마다 실행
schedule.every(60).minutes.do(job)

print("Start App")

while True:
	schedule.run_pending()
	time.sleep(1)
```

시간에 대해서는 원하는 대로 지정할 수 있다. 특정 시간도 가능하고, 특정 요일도 가능하다. [문서](https://schedule.readthedocs.io/en/stable/) 를 참고하자.
```python
schedule.every(10).minutes.do(job)
schedule.every().hour.do(job)
schedule.every().day.at("10:30").do(job)
schedule.every().monday.do(job)
schedule.every().wednesday.at("13:15").do(job)
```

#### APScheduler

특정 날짜, 특정 시간에 스케줄러 등록하기
`schedule`을 이용해 매일 정해진 시간에 job을 등록할 수 있었는데, 특정 날짜에 어떤 시간에 등록을 하고 싶어졌다. 검색을 해보니 [Advanced Python Scheduler](https://apscheduler.readthedocs.io/en/3.x/)라는 것이 있었다.

다음과 같이 설치를 하고
```shell
$ pip3 install apscheduler
```

다음과 같이 특정 날짜와 시간에 스케줄을 등록할 수 있다. 파라미터 함수에 파라미터 또한 넘길 수 있다.
```python
from apscheduler.schedulers.blocking import BlockingScheduler

sched = BlockingScheduler(timezone='Asia/Seoul') # 한국 시간으로 설정하기

def job(text):
    print(text)

sched.add_job(job, 'date', run_date='2022-05-11 14:32:09', args=['text'])

```

## 환경변수 설정하기
현재까지 만든 스크립트가 로컬에 있다면 상관없지만 외부에 공개되어 있다면 다른 사람이 봇을 제어하지 못하도록 봇 토큰을 숨겨야 할 것이다.
이때 환경변수를 사용하면 된다. Python에는 환경변수 설정을 위한 dotenv라는 라이브러리가 있다.
```shell
$ pip3 install python-dotenv
```

스크립트와 같은 디렉토리에 `.env`라는 파일을 생성해서 사용하고자 하는 변수를 정의한다.
```
TELEGRAM_TOKEN=1111111111:AAAaaBBcd11ZEEFFhjkLMNOPQrsTuV1wwXY
CHAT_ID=123123123
SEARCH_URL=https://url.com
```

스크립트에서 설정한 변수는 다음과 같이 사용한다.
```python
token = os.getenv('TELEGRAM_TOKEN')
bot = telegram.Bot(token=token)
chat_id = os.getenv('CHAT_ID')
url = os.getenv('SEARCH_URL')
```

git으로 프로젝트가 외부에 공개되는 경우 **.env 파일은 반드시 .gitignore에 추가되어야 한다.** 추가하지 않으면 공유되기 때문이다.

여기까지 진행해서 간단한 봇을 만들 수 있었다. 하지만 웹 페이지 중 [[SPA]]로 만들어진 것이 있을 수 있다. 그래서 GET 요청을 하고 페이지를 불러와도 바로 내가 원하는 데이터가 있는 것이 아니라 [[Ajax]]를 통해 데이터를 전달받아 화면에 데이터가 그려지는 것이다. 이건 [Selenium](https://www.selenium.dev/)을 이용해서 해결할 수 있다. 

### Selenium 모듈 사용하기
Selenium 라이브러리를 통해 자바스크립트가 동적으로 만든 데이터를 크롤링할 수 있다. 

### selenium 모듈 설치하기
```shell
$ pip3 install selenium
```

#### 크롬 브라우저창 열기
Selenium은 Web driver라는 가상의 브라우저 프로그램과 연동해서 기능을 구현한다. 따라서 크롬 브라우저 제어를 위한 드라이버를 설치해줘야 한다.
```shell
$ pip3 install webdriver-manager
```

```python
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
```

여러 옵션도 지정해줄 수 있다. 
```python
chrome_options = webdriver.ChromeOptions()

chrome_options.add_argument('headless') # 브라우저 창 없이 실행
chrome_options.add_argument('--log-level=3') # 크롬 관련 로그 끄기

```

`headless` 옵션이 없으면 크롬 브라우저가 실행되게 된다. 처음에 확인만 하고 해당 옵션을 추가해서 창을 띄우지 않는 것이 편했다.

```python
browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
```

#### 웹 페이지 로드를 기다리기
대부분의 웹 페이지가 [[Ajax]]를 사용하고 있기에 페이지를 로드할 때 요소들이 다른 시간 간격으로 로드될 수 있다. 따라서 크롤링을 위해 페이지의 요소가 다 로드될 때까지 "기다리는 것"이 필요한데 Selenium은 [Waits](https://selenium-python.readthedocs.io/waits.html) 를 제공한다.
두 가지 종류의 "기다림(waits)"를 제공하는데, 바로 `implicit` 과 `explicit`
이다. 

### Explicit Waits
```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from webdriver_manager.chrome import ChromeDriverManager

from selenium.common.exceptions import TimeoutException


chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('headless')
chrome_options.add_argument('--log-level=3')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

driver.get("http://sample.com")

try:
	element = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "span[class^='page_date']")))

except TimeoutException:
	element = 'element not found'
	print(element)
```

위 코드를 살펴보면 Selenium은 최대 10초동안 파라미터로 넘긴 값과 매칭되는 요소가 있는지 찾게된다. 만약 찾지 못하면 `TimeoutException`이 발생하기 때문에 예외처리를 해주는 것이 좋다. 
위 코드에서는 CSS 선택자를 통해 요소가 존재하는지 확인하는데, [공식 문서](https://selenium-python.readthedocs.io/waits.html)에 다른 다양한 확인방법이 나와있다.

### Implicit Waits

`driver.implicitly_wait(10)`으로 설정하면 페이지가 로딩될 때까지 10초를 기다리는 것이다. 만약 로딩이 1초만에 된다면 1초만에 다음 코드로 넘어간다. 정해진 10초까지 기다리지 않는다.
```python
driver.implicitly_wait(10)
```

```python
element = WebDriverWait(browser_live, 10).until(EC.text_to_be_present_in_element((By.CSS_SELECTOR, "time[class^='BridgePage_date']"), "일"))
```

#### 웹 페이지 스크롤 하기
웹 페이지가 전체 데이터를 다 불러오지 않고 스크롤을 해서 화면을 내릴 때마다 새로운 데이터를 불러올 수도 있다. (ex. 무한 스크롤 등...)
이럴 때도 Selenium을 활용할 수 있다.
```python
import time

driver.maximize_window() # 전체 화면으로
driver.get(URL) 
driver.implicitly_wait(10) # 화면이 로드되도록 10초 기다림

# 스크롤 내리기
prev_height = browser.execute_script('return document.body.scrollHeight')

while True:
	browser.execute_script('window.scrollTo(0, document.body.scrollHeight)')
	time.sleep(3)

	current_height = browser.execute_script('return document.body.scrollHeight')

	if prev_height == current_height:
		break

	prev_height = current_height

time.sleep(3)
```

## Heroku에 배포하기

간단한 스크립트면 괜찮지만, 간단하더라도 내 컴퓨터에 항상 실행시켜두고 싶지 않을 수 있다. Heroku에 스크립트를 배포해두면 Heroku에서 스크립트를 실행시켜줘서 알림을 받을 수가 있다.

배포 전에 추가해야 할 2가지 파일이 있다. **Procfile, requirements.txt, runtime.txt**이다.

### Procfile 준비하기
Procfile은 Heroku를 통해 실행할 수 있는 Python 스크립트를 지정해주는 파일이다. 
다음과 같이 명령어를 입력하거나 에디터를 열어 "Procfile" 파일 생성 후 `worker: python 실행할파일명.py`를 입력하자. 여기서 주의할 점은 **P**rocfile의 **P**는 대문자여야 한다. 그리고 확장자가 따로 없다.
```shell
$ echo 'worker: python 실행할파일명.py' > Procfile
```

### requirements.txt 준비하기
requirements.txt 파일은 Heroku가 Python 코드를 실행하는 데 필요한 Python 라이브러리의 올바른 버전을 더 쉽게 설치할 수 있게 도와준다.
다음 명령어를 입력하면 자동으로 앱에 필요한 라이브러리(또는 패키지) 리스트가 저장된 requirements.txt 파일을 생성해준다.

```shell
$ pip3 freeze > requirements.txt
```

### runtime.txt
사용하고 있는 Python 버전을 명시해주는 파일이다.
```shell
$ echo 'python-3.10.3' > runtime.txt
```

3가지 파일이 준비되었다면 [Heroku](https://signup.heroku.com/)에 접속해 가입을 한다.
[대시보드](https://dashboard.heroku.com/apps)에서 New > Create new app 을 클릭한다.
![[heroku_create_new_app.png]]

![[heroku_create_new_app_form.png]]
적당한 앱 이름을 입력하고 "Create app" 버튼을 클릭해 앱을 생성한다.

그러고 나면 해당 앱의 Deploy 페이지로 이동하는데 나와 있는 설명을 따라하면 된다!

### Heroku CLI를 통해 배포하는 방법
[문서](https://devcenter.heroku.com/articles/heroku-cli) 를 참고해 Heroku CLI를 설치한다.
```shell
$ brew tap heroku/brew && brew install heroku
```

설치가 끝난 후 다음 명령어를 입력하고 나서 아무 키나 누르면 브라우저 창이 열리고 로그인을 한다.
```shell
heroku login
```

배포할 프로젝트의 디렉토리로 이동 후 다음 명령어를 입력한다.
```shell
$ cd alert-bot/
$ git init
$ heroku git:remote -a padosum-alert-bot
```

매번 스크립트 수정시마다 commit 후 push를 하면 배포가 된다.
```shell
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

다음 명령어를 통해 배포된 스크립트의 로그를 확인할 수 있다.
```bash
$ heroku logs
```

Heroku에 배포된 앱이 실행되지 않는다면? 다음 명령어로 리셋해주자.
```shell
$ heroku ps:scale worker=0
$ heroku ps:scale worker=1
```

### 한국 시간으로 설정하기
만약 스케줄러를 한국 시간에 맞춰 등록했다면 heroku에 배포된 스크립트의 시간을 한국 시간으로 설정할 필요가 있다. 다음 명령어를 입력한다.
```shell
$ heroku config:add TZ="Asia/Seoul" 
```

### Chrome driver 설치
만약 selenium을 사용해서 webdriver를 설치해줬을 때 [webdriver-manager](https://pypi.org/project/webdriver-manager/) 로 설치를 했다면 heroku에도 설치를 해줘야 한다.

`https://dashboard.heroku.com/apps/{App이름}/settings`로 접속해서 "Buildpacks" 항목에 다음 2가지를 추가해줘야 한다.
![[heroku_buildpacks.png]]
- https://github.com/heroku/heroku-buildpack-chromedriver
- https://github.com/heroku/heroku-buildpack-google-chrome


### 환경변수 설정하기
Heroku에서 `.env`에 설정해 놓은 변수를 사용하려면 따로 설정을 해줘야 한다.
`https://dashboard.heroku.com/apps/{App이름}/settings`로 접속해서 "Config Vars" 항목에서 추가 가능하다. "Reveal Config Vars" 버튼을 클릭해 입력 폼을 활성화하고 KEY와 VALUE를 입력한다. Add버튼을 클릭하면 추가가 완료된다.
![[heroku_add_config_vars.png]]


## 후기
재고 알림을 철저히 해주는 쇼핑몰도 있지만 그렇지 않은 쇼핑몰에 알림이 필요해서 만들었다. 결론적으로 오히려 알림이 알아서 와주니 직접 들어가 보지 않게되고 상품에 대한 흥미가 식었다. 나에겐 쓸데없는 소비를 하지 않는 좋은 일이었다. 
현재는 사용을 하지 않게 되었지만 또 언젠가는 재고 알림이 필요하다면 사용하게 될 수도 있다. 
해당 봇을 만든 경험으로 또 다른 알림을 하는 봇도 만들어봤다. 그런데 처음 만들었을 때 정리를 해두지 않아서 찾는데 시간이 조금 걸렸다. 그래도 기억엔 아직 남아 있어서 조금 덜 헤맸다. 하지만 휘발성 기억일 것이다. 그래서 언젠가 또 만들 날을 대비해서 기록을 해둔다. 역시 미리 정리해둬야 한다.


[^1]: https://www.cloudflare.com/ko-kr/learning/bots/what-is-a-bot/
[^2]: https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id


## reference
- [How to Deploy a Python Script or Bot to Heroku in 5 Minutes](https://medium.com/tech-insights/how-to-deploy-a-python-script-or-bot-to-heroku-in-5-minutes-a82de2d3ed40)
- [telegram-bot-heroku-deploy](https://github.com/AnshumanFauzdar/telegram-bot-heroku-deploy)
- [동적 페이지 스크롤](https://ggondae.tistory.com/32)
- [Runnig ChromeDriver with Python selenium on Heroku](https://stackoverflow.com/questions/41059144/running-chromedriver-with-python-selenium-on-heroku)
- [Heroku를 이용한 스케줄러](https://velog.io/@swhan9404/Heroku%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%9F%AC)
- [Python 코드를 Heroku에 올리고 특정 시간에 실행하도록 하기](https://cjh5414.github.io/heroku-python/)
- [텔레그램 재고 알림 봇 만들기](https://tech.lonpeach.com/2021/02/13/python-telegram-restock-bot/)
- [환경변수 사용하기](https://one-step-a-day.tistory.com/152)

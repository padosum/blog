---
title   : 기수 정렬(radix sort)
date    : 2021-08-09 19:19:12 +0900
updated : 2021-08-09 19:53:02 +0900
aliases : 
private : false
hidden  : false
showReferences : true
---
기수 별로 비교 없이 수행하는 정렬 알고리즘. 기수란 집합의 크기를 나타내는 데 쓰는 수이다.   
기수에 따라 원소를 버킷에 집어 넣는 것이라 비교 연산을 하지 않는다.  

## 복잡도  
- `O(dn)`, `d`는 가장 큰 데이터의 자리수

## 예시  
```
170 45 75 90 2 24 802 66
```  
- 위와 같은 수열을 1의 자리만 보고 정렬하기  
```
170 90 2 802 24 45 75 66 
```
- 위 수열을 다시 10의 자리에 대해 정렬하기, 10의 자리가 없으면 제일 첫번째로 간다.   
```
2 802 24 45 66 170 75 90
```
- 마지막으로 100의 자리에 대해 정렬하기  
```
2 24 45 66 75 90 170 802
```

### JavaScript 
```javascript

```
## reference
- [https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%88%98_%EC%A0%95%EB%A0%AC](https://ko.wikipedia.org/wiki/%EA%B8%B0%EC%88%98_%EC%A0%95%EB%A0%AC)
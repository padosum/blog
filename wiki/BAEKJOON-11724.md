---
title   : 백준 11724 JavaScript 
date    : 2022-05-01 12:36:26 +0900
updated : 2022-05-01 13:58:48 +0900
aliases : ["백준 11724번 연결 요소의 개수"]
tags    : 
---
## 문제
[백준 11724](https://www.acmicpc.net/problem/11724)

## 풀이
[[Graph|그래프]] 정보가 주어졌을 때 연결 요소의 개수를 구하는 문제이다. 예시를 살펴보자.
```
6 5
1 2
2 5
5 1
3 4
4 6
```
6개의 정점, 그리고 5개의 간선이 있고 간선의 양 끝점을 통해 다음과 같은 그래프가 그려짐을 알 수 있다.
![[boj_11724.png]]
연결 요소가 무엇인지 몰랐는데 그림을 그려보니 알 수 있었다. 여기선 2개의 연결 요소가 만들어진다. 연결 요소는 [컴포넌트](https://blog.naver.com/kks227/220785731077)라고 부른다고 한다.

자 그렇다면 이 연결 요소의 개수는 어떻게 구할까? [[DFS]]를 활용하면 된다. 
정점에 번호가 있는 것은 아니지만 생각하기 편하기 위해서 번호를 붙여보자.

정점을 하나씩 방문하면서 간선이 연결된 정점을 또 하나씩 방문한다. 만약 방문할 때 이미 방문했다는 표시를 해둔다면, 1번 정점과 연결된 모든 정점을 방문하고 나서, 즉 2, 5번을 방문하고 나서 그 후에 2번 정점을 방문한다면 이미 방문했다는 표시가 있을 것이고, 5번도 마찬가지일 것이다. 
그러나 방문한 표시가 없는 정점의 경우(3, 4, 5)에는 지금까지 방문한 정점들과 다른 연결 요소라는 것을 알 수 있다. 이때 숫자를 카운트 하는 것이다.

그렇다면 정점 방문 여부를 확인할 배열을 선언하는 것이 좋겠다.
```javascript
const visited = Array.from({length: N + 1}, () => false)
// 방문 여부는 false로 초기화해준다.
```

그리고 주어진 간선을 담아두는 배열도 선언해서 입력된 간선을 담아두자.
```javascript
const edges = Array.from({length: N + 1}, () => [])

for (let i = 1; i <= M; i++) {
  const [from, to] = input[i].split(" ").map(Number)
  edges[from].push(to)
  edges[to].push(from)
}
```
해당 배열 `edges[from]`에 `from`번째 정점과 연결된 정점이 담기게 된다.

이제 정점을 방문할 때 할 작업을 실행한다. 우선 해당 정점을 방문했다는 표시를 하고, 해당 정점과 간선으로 연결된 다음 정점을 순회한다. 여기서 다음 정점을 아직 방문한 적이 없다면 그 정점을 기준으로 다시 순회한다. 재귀 호출이다.
```javascript
const dfs = idx => {
  visited[idx] = true

  for (let i = 0; edges[idx].length; i++) {
    const next = edges[idx][i] // 다음에 방문할 정점

	// 아직 방문하지 않았다면 방문하기
    if (!visited[next]) {
      dfs(next)
    }
  }
}
```

이 방문 순회를 모든 정점에서 실행하고, 그동안 방문하지 않은 정점이 나온다면, 그동안 방문한 정점과 다른 연결 요소이므로(왜냐하면 정점과 연결된 정점들을 모두 순회하는데 아직까지 방문하지 않았으니 연결되지 않았다는 의미이므로) 카운트를 증가시킨다.
```javascript
for (let i = 1; i <= N; i++) {

  // 방문하지 않은 경우
  if (!visited[i]) {
    dfs(i) // 
    count++
  }
}
```

전체 코드는 다음과 같다.
```javascript
const readFileSyncPath = require('path')
  .basename(__filename)
  .replace(/js$/, 'txt')

// const readFileSyncPath = '/dev/stdin';

const input = require('fs')
  .readFileSync(readFileSyncPath)
  .toString()
  .trim()
  .split('\n')

  const [N, M] = input[0].split(" ").map(Number)
  const visited = Array.from({length: N + 1}, () => false)

  const edges = Array.from({length: N + 1}, () => [])
  for (let i = 1; i <= M; i++) {
    const [u, v] = input[i].split(" ").map(Number)
    edges[u].push(v)
    edges[v].push(u)
  }
  
  const dfs = idx => {
    visited[idx] = true

    for(let i = 0; i < edges[idx].length; i++) {
      const next = edges[idx][i]
      if (!visited[next]) {
        dfs(next)
      }
    }
  }

  let cnt = 0
  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      dfs(i)
      cnt++
    }
  }

  console.log(cnt)
```
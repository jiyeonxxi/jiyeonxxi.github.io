---
title: "3탄 : 자바스크립트 async와 await"
date: 2021-10-21
categories: javascript
toc: true
toc_sticky: true


---

자바스크립트의 비동기 처리 시리즈의 마지막 게시물 async & await 문법이다. 이 글을 읽기 전 [비동기 처리 및 콜백 함수](https://jenniexxi.github.io/javascript/asynchronous-processing-callback/)와 [Promise](https://jenniexxi.github.io/javascript/promise/)에 대해 이해하는 것을 추천한다.

# Async Await

- async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다. 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와준다.
- then, catch 는 구식이다.

- async/await 은 promise 밖에서 값을 가져올 수 있는 방법이다. 많은 then 이나, catch 를 사용하지 않고 말이다.

## async function

> **`async function`** 선언은 [`AsyncFunction`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)객체를 반환하는 하나의 비동기 함수를 정의한다. 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 [`Promise`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 사용하여 결과를 반환한다. 그러나 비동기 함수를 사용하는 코드의 구문과 구조는, 표준 동기 함수를 사용하는것과 많이 비슷하다.

**`async` 함수는 항상 promise를 반환**한다. 만약 `async` 함수의 반환값이 명시적으로 promise가 아니라면 암묵적으로 promise로 감싸진다.

아래 코드는 async 와 promise 이며, 같은 코드를 표현한 것이다.

```javascript
async function foo() {
    return 1
}
```

```javascript
function foo() {
    return Promise.resolve(1)
}
```

## await

> `await`연산자는 [`Promise`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 기다리기 위해 사용된다. 연산자는 [`async function`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function) 내부에서만 사용할 수 있다.

promise를 끝내기 위해 수많은 then들을 사용하는 것 대신에 await을 사용하면 된다. **await은 promise가** resolve 가 되든, reject 가 되든 상관없이 **끝나길 기다린다.**

```javascript

//아래 코드는 async 사용의 예이다.
const getMovies = async() => {
}

async function getMovies() {
}
```

아래 코드는 then-catch 와 async-await 사용 예제를 비교한 것이다.

```javascript
//then-catch 사용 예제
const getMoviesPromise = () => {
  fetch("https://yts.mx/api/v2/list_movies.json")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => console.log(json))
    .catch((err) => console.log(`❌ ${err}`));
};
getMoviesPromise(); //{status: "ok", status_message: "Query was successful", data: Object, @meta: Object}

//async-await 사용 예제
const getMoviesAsync = async () => {
  const response = await fetch("https://yts.mx/api/v2/list_movies.json");
  const json = await response.json();
  console.log(json);
};

getMoviesAsync(); //{status: "ok", status_message: "Query was successful", data: Object, @meta: Object}
```

# Try catch finally: async & await 예외 처리

`await`가 던진 에러는 `throw`가 던진 에러를 잡을 때처럼 `try..catch`를 사용해 잡을 수 있다.  

```javascript
async function f() {

  try {
    let response = await fetch('http://유효하지-않은-url');
    let user = await response.json();
  } catch(err) {
// fetch와 response.json에서 발행한 에러 모두를 여기서 잡습니다.
    alert(err);
  }
}

f();
```

아래 코드는 `Finally`  블록에서 일어난 일에 관계없이 무조건 실행될 코드가 위치한다.

```javascript
const getMoviesAsync = async () => {
  try {
    const response = await fetch("https://yts.mx/api/v2/listmovies.json");
    const json = await response.json();
    console.log(json);
  } catch (e) {
    console.log(`❌ ${e}`);
  } finally {
    console.log("We are done!");
  }
};

getMoviesAsync();
//❌ TypeError: Failed to fetch
//We are done!
```

catch block은 await 안에 있는 error만 잡는게 아니라 try 구문 안에 에러까지 잡아낸다. await 밖에 있는 에러까지 잡아낸다.

```javascript
const getMoviesAsync = async () => {
  try {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json");
    const json = await response.json();
    throw Error("I'm error");
  } catch (e) {
    console.log(e);
  } finally {
    console.log("We are done!");
  }
};

getMoviesAsync();
//Error: I'm error
//We are done!
```

# 요약

`async/await`를 사용하면 `promise.then/catch`가 거의 필요 없다. 하지만 가끔 가장 바깥 스코프에서 비동기 처리가 필요할 때같이 `promise.then/catch`를 써야만 하는 경우가 생기기 때문에 `async/await`가 프라미스를 기반으로 한다는 사실을 알고 있어야 한다. 여러 작업이 있고, 이 작업들이 모두 완료될 때까지 기다리려면 `Promise.all`을 활용할 수 있다는 점도 알고 있어야 한다.

# Parallel Async Await

## 예제

```javascript
const getMoviesAsync = async () => {
  try {
    const [moviesResponse, suggestionsResponse] = await Promise.all([
      fetch("https://yts.mx/api/v2/list_movies.json"),
      fetch("https://yts.mx/api/v2/movie_suggestions.json?movie_id=100")
    ]);
    const [movies, suggestions] = await Promise.all([
      moviesResponse.json(),
      suggestionsResponse.json()
    ]);
    console.log(movies, upcoming);
  } catch (e) {
    console.log(`❌ ${e}`);
  } finally {
    console.log("We are done!");
  }
};

getMoviesAsync();
//{status: "ok", status_message: "Query was successful", data: Object, @meta: Object}
//{status: "ok", status_message: "Query was successful", data: Object, @meta: Object}
//We are done!
```

# 참고한 자료

[Nomad Coders](https://nomadcoders.co/courses) : ES6의 정석

[async function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function)

[await MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/await)

[예외처리 - thrwo 및 try/catch/finally](https://webclub.tistory.com/71)

[자바스크립트 async와 await - 캡틴판교](https://joshua1988.github.io/web-development/javascript/js-async-await/)

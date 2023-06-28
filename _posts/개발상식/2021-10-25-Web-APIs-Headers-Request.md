---
title: "Web APIs - Headers, Request, Response"
date: 2021-10-25
categories: 개발상식
toc: true
toc_sticky: true



---

# Headers

## 소개

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 의 **`Headers`**인터페이스를 사용하면 [HTTP 요청 및 응답 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) 에 대해 다양한 작업을 수행할 수 있다 . 이러한 작업에는 **요청 헤더 목록에서 헤더 검색, 설정, 추가 및 제거가 포함**된다.

`Headers`객체는 처음에 비어 있고 0 개 이상의 이름과 값 쌍으로 구성 연관된 헤더 목록을 가지고 있다. `append()` 와 같은 메소드를 사용하여 추가할 수 있다 . 이 인터페이스의 모든 메소드에서 헤더 이름은 **대소문자를 구분하지 않는 바이트 시퀀스와 일치**한다.

보안상의 이유로 일부 헤더는 사용자 에이전트만 제어할 수 있다.

또한 `Headers` 객체에는 `immutable`, `request`, `request-no-cors`, `response` 또는 `none` 값을 사용하는 연결된 가드가 있습니다. 이는 `set()`, `delete()` 및 `append()` 메서드가 헤더를 변경하는지 여부에 영향을 준다.

`Request.headers` 및 `Response.headers` 속성을 통해 `Headers` 개체를 검색하고 `Headers.Headers()` 생성자를 사용하여 새 `Headers` 개체를 만들 수 있다.

`Header`를 구현하는 객체는 `entries()` 대신 `for...of` 구조에서 직접 사용할 수 있다. for(myHeaders의 var p)는 for(myHeaders.entries()의 var p)와 동일하다.

## Constructor

[`Headers()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers) : 새로운 Headers 객체를 생성

## 주요 Methods

[`Headers.append()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/append) : `Headers` 객체 내부의 기존 헤더에 새 값을 추가하거나 헤더가 없는 경우 헤더를 추가

[`Headers.get()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get) : 주어진 이름을 가진 `Headers` 객체에 있는 모든 헤더 값의 문자열 시퀀스를 반환

[`Headers.has()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/has) : `Headers` 객체에 특정 헤더가 포함되어 있는지 여부를 나타내는 boolean을 반환

[`Headers.set()`](https://developer.mozilla.org/en-US/docs/Web/API/Headers/set) : `Headers` 객체 내부의 기존 헤더에 대한 새 값을 설정하거나 헤더가 아직 존재하지 않는 경우 헤더를 추가

⚠️ 참고: Headers.set()과 Headers.append()의 차이점은 지정된 헤더가 이미 존재하고 여러 값을 허용하는 경우 Headers.set()이 기존 값을 새 값으로 덮어쓴다. 반면 Headers.append()는 값 집합의 끝에 새 값을 추가한다.

## Example

```javascript
var myHeaders = new Headers();

myHeaders.append('Content-Type', 'text/xml');
myHeaders.get('Content-Type') // should return 'text/xml'
```

# Request

## 소개

Fetch API의 요청 인터페이스는 리소스 요청을 나타낸다.

`Request()` 생성자를 사용하여 새 `Request` 객체를 생성할 수 있지만 서비스 워커 `FetchEvent.request`와 같은 다른 API 작업의 결과로 `Request` 객체가 반환될 가능성이 더 크다.

## Constructor

[`Request()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request) : 새로운 `Request` 객체를 생성

## 주요 Properties

[`Request.body`](https://developer.mozilla.org/en-US/docs/Web/API/Request/body) **Read only** : 본문 내용의 ReadableStream

[`Request.cache`](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache) **Read only** : 캐시 요청 (예: 기본값, 다시 로드, 캐시 없음)

[`Request.headers`](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers) **Read only** : 연결된 헤더 개체 요청

[`Request.method`](https://developer.mozilla.org/en-US/docs/Web/API/Request/method) **Read only** : 메소드(GET, POST 등)를 요청

[`Request.url`](https://developer.mozilla.org/en-US/docs/Web/API/Request/url) **Read only** : URL을 요청

## 주요 Methods

[`Request.arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/arrayBuffer) : 요청 본문의 `ArrayBuffer` 형식으로 반환

[`Request.blob()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/blob)

[`Request.clone()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)

[`Request.formData()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData)

[`Request.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/json)

[`Request.text()`](https://developer.mozilla.org/en-US/docs/Web/API/Request/text)

## Example

```javascript
const request = new Request('https://www.mozilla.org/favicon.ico');

const url = request.url;
const method = request.method;
const credentials = request.credentials;
```

# Response

Fetch API의 응답 인터페이스는 `Response`에 대한 응답을 나타낸다.

`Response.Response()` 생성자를 사용하여 새 Response 객체를 생성할 수 있지만 다른 API 작업의 결과로 Response 객체가 반환될 가능성이 더 높다.

## Constructor

[`Response()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response) : 새로운 `Response` 객체를 생성

## 주요 Properties

[`Response.body`](https://developer.mozilla.org/en-US/docs/Web/API/Response/body)

[`Response.headers`](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers)

[`Response.ok`](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)

[`Response.status`](https://developer.mozilla.org/en-US/docs/Web/API/Response/status)

## Example

```javascript
const image = document.querySelector('.my-image');
fetch('flowers.jpg')
.then(response => response.blob())
.then(blob => {
  const objectURL = URL.createObjectURL(blob);
  image.src = objectURL;
});
```

# 참고한 자료

[Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)

[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)

[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

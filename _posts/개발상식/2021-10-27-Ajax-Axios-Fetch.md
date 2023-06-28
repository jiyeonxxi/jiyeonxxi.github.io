---
title: "Ajax와 Axios 그리고 Fetch"
date: 2021-10-28
categories: 개발상식
toc: true
toc_sticky: true
---

프로젝트를 진행하다보면 클라이언트와 서버 간 데이터를 주고받기 위해 HTTP 통신을 사용하게될겁니다.
오늘 포스팅에서는 js에서 비동기 HTTP 통신을 위해 사용되는 **Ajax, Axios, fetch에 대해 알아보고자 한다.**

# Ajax

많은 사람들이 Ajax의 의미에 대해 혼동하곤 한다.

우선 Ajax는 **Asynchronous JavaScript And XML**의 약자이다.
Ajax의 약자를 토대로 본래 의미를 살펴보면 JavaScript를 사용한 비동기 통신, 클라이언트와 서버간에 데이터를 주고받는 기술이라고 할 수 있다.
HTML 과 여타 기술들을 사용하는 새로운 접근법이라고 설명하기도 한다.
Ajax를 통해 서버와 비동기적으로 통신함으로 인해 우리는 전체 웹페이지를 다시 불러오는 동기 방식과는 다르게 점진적으로 해당 부분의 사용자 인터페이스를 갱신할 수 있다.
간단하게 말해서 Ajax는 JavaScript에서 비동기 HTTP 통신이 가능하도록 해준다. 비동기 HTTP 통신이란 response와 request를 비동기 식으로 다룰 수 있다는 것을 의미한다.

예를 들어 페이스북에서 **좋아요 버튼을 누를 때마다 페이지가 갱신** 된다면 많이 불편할 것이다.
또는 구글에서 검색을 하는데 **추천 검색어가 로드될때마다 페이지가 새로고침**된다면 얼마나 짜증이 날까?

우리는 비동기식으로 데이터를 주고받으며 위의 문제들을 해결하는 것이다.

⚠️ jQuery와 묶여서 불리는 경우가 많은데 어떻게 연관이 있는 것이죠?

좋은 궁금증이다.
우리가 보통의 상황에서 Ajax라는 말을 사용할 때를 보면 JQuery의 Ajax를 일컫을 때가 많다.
그렇지만 이는 아주 조금 잘못되었다.
**Ajax라는 친구를 JQuery를 통해 보다 더 쉽게 사용할 수 있기에 우리는 JQuery와 Ajax를 함께 묶어서 말할 때가 많은 것 뿐이다.**
Ajax라는 기술 자체는 이미 그 이전 2005년부터 쓰여왔다. 심지어 정립된 시기는 이보다 앞선 1999년이었다. 그렇지만 코드가 정말 매우 지저분했기에 이에 대한 보완이 필요했고, 그러던 도중 jQuery에서 Ajax를 편리하게 사용할 수 있도록 정립하면서 jQuery가 급부상하게 된것이다. (물론 jQuery 코드 자체가 워낙 간단한 이유도 있다.) 또한 jQuery를 사용하여 Ajax를 구현할 경우 브라우저에 구애받지 않고 동일한 코드로 같은 작업을 구현할 수 있다.

-  순수 Ajax를 사용하는 경우

```javascript
// use Ajax without Jquery
function reqListener (e) {
    console.log(e.currentTarget.response);
}

var oReq = new XMLHttpRequest();
var serverAddress = "https://jsonplaceholder.typicode.com/posts";

oReq.addEventListener("load", reqListener);
oReq.open("GET", serverAddress);
oReq.send();
```

- **Jquery를 통해 Ajax를 사용하는 경우**

```javascript
// use Ajax with Jquery
var serverAddress = 'https://jsonplaceholder.typicode.com/posts';

// jQuery의 .get 메소드 사용
$.ajax({
    url: ,
    type: 'GET',
    success: function onData (data) {
        console.log(data);
    },
    error: function onError (error) {
        console.error(error);
    }
});
```

💡 Jquery를 통해 Ajax를 사용할 때 코드가 훨씬 간단해지고 직관적이죠?
뿐만 아니라 그냥 Ajax만을 사용할 때는 브라우저 간 호환성에 대해 염두해두고 각기 다른 코드를 작성해야하는 경우가 있는데 **Jquery를 사용할 경우 호환성에 대해서도 보장이 된다.**

# Axios

기존에 WEB에서 어떤 리소스를 비동기로 요청하기 위해서는 XHR(XML HTTP Request)객체를 사용했어야 했었는데, XHR은 잘 디자인되어 있는 API가 아니다. 요청의 상태나 변경을 구독하려면 Event를 등록해서 변경사항을 받아야 했고 요청의 성공, 실패 여부나 상태에 따라 처리하는 로직이 들어가기 좋지 않았다.
이를 보완하기 위해 HTTP 요청에 최적화 되어 있고 상태도 잘 추상화 되어 있는 api들이 생겨나기 시작했다. 대표적으로 Axios와 fetch가 그 예인데 중 Axios를 먼저 살펴보도록 하겠다.

## 소개

> Axios는 Promise based HTTP client for the browser and node.js
>
> 즉, 브라우저와 Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브리이다.
>
> 비동기로 HTTP 통신을 가능하게 해주며 return을 promise 객체로 해주기 때문에 response 데이터를 다루기도 쉽다.
> react를 사용하는 분들은 fetch보다 Axios를 많이 선호하는 편이다.
> 그 이유에 대해서는 포스팅 마지막에 설명토록 하겠다.

또한 IE8이상을 포함한 모든 최신 브라우저를 지원한다.

Axios는 Promise를 기반으로하여 async/await문법을 사용하여 [XHR](https://flaviocopes.com/xhr/)요청을 매우 쉽게 할 수 있다.

일종의 자바스크립트에 내장되어 있는 fetch api와 유사한 기능을 하지만 차이점이 몇가지 있다. 그렇다면 axios의 장단점을 알아보기 위해 그 차이를 비교해보도록 하자.

## Axios vs Fetch

| axios                                       | fetch                                                        |
| ------------------------------------------- | ------------------------------------------------------------ |
| 요청 객체에 url이 있다                      | 요청 객체에 url이 없다                                       |
| 써드파티 라이브러리로 설치가 필요           | 현대 브라우저에 빌트인이라 설치 필요 없음                    |
| XSRF 보호를 해준다                          | 별도 보호 없음                                               |
| data 속성을 사용                            | body 속성을 사용                                             |
| data는 object를 포함                        | body는 문자열화 되어 있음                                    |
| status가 200이고 statusText가 'OK'이면 성공 | 응답객체가 ok 속성을 포함하면 성공                           |
| 자동으로 JSON데이터 형식으로 변환           | .json()메서드를 사용해야 함                                  |
| 요청을 취소할 수 있고 타임아웃을 걸 수 있음 | 해당 기능 존재하지 않음                                      |
| HTTP 요청을 가로챌 수 있음                  | 기본적으로 제공하지 않음                                     |
| download 진행에 대해 기본적인 지원을 함     | 지원하지 않음                                                |
| 좀 더 많음 브라우저에 지원됨                | Chrome 42+, Firefox 39+, Edge 14+, and Safari 10.1+이상에 지원 |

위와 같은 표를 보았을 때 axios는 `별도의 설치가 필요하다는 단점`이 있지만 그것을 커버할 만한 fetch 보다 `많은 기능 지원과 문법이 조금이나마 간소화 된다는 장점`이 있다는 것을 볼 수 있다.

[Fetch API](https://flaviocopes.com/fetch-api/)보다 **Axios**가 더 좋은 **장점**은 아래와 같다.

1. 구형브라우저를 지원한다.(Fetch API의 경우는 [폴리필](http://hacks.mozilla.or.kr/2014/12/an-easier-way-of-using-polyfills/)이 필요하다.
2. 요청을 중단시킬 수 있다.
3. 응답 시간 초과를 설정하는 방법이 있다.
4. [CSRF](https://laravel.kr/docs/5.5/csrf) 보호 기능이 내장되어있다.
5. JSON 데이터 자동변환
6. Node.js에서의 사용

그렇다면 간단하게 사용할때는 fetch를 쓰고, 이외의 확장성을 염두해봤을 땐 axios를 쓰면 좋을 것 같다.

## fetch()를 개선하는 데에 초점을 맞춘 Axios

Fetch()는 JSON 데이터를 처리할 때 2단계를 거친다. 초기에 request를 보내고, 실제 data object를 받으려면 response를 받는 측에서 .json() 메소드를 사용해야 한다. 예로, fetch request를 보낸 뒤에 요청한 request에 대한 응답으로 받는 response의 object를 받을 수 있는 코드를 따로 작성해야 한다.

```javascript
const url = 'http://localhost:3000/api/v1';
fetch(`${url}/datas`).then(res => res);
```

보낸 request가 성공적으로 도달했다면, pending promise를 반환하고 object를 response 받을 수 있다. 하지만, 요청한 데이터가 어디있는지도 모른다. 데이터를 받으려면 .json() 메소드를 사용해야만 response를 제대로 받을 수 있다.

```javascript
const url = 'http://localhost:3000/api/v1';
fetch(`${url}/datas`).then(res => res.json());
```

# 결론

**일단 웹 프론트 프레임워크(react js,vue js 등)을 다룰때에는 Axios를 사용하는 것이 더 좋다고 생각한다**. Axios는 크로스 브라우징에 신경을 많이 쓴 모듈인게 눈에 보이며, 기능또한 우수하기 때문이다.
전체적으로 fetch의 상위 호환이라고 생각한다.
✋ **다만, react-native에서는 fetch를 사용하는 것이 아주 조금 더 좋다고 생각한다.** react-native의 경우 아직 안정화 된 프레임워크가 아니기에 지속적인 version update가 진행되고 있고, axios에서 이를 반영하지 못할 경우 생각지 못한 에러가 발생할 수 있다는 우려 때문이다.

이론적인 결론은 이렇지만 Ajax 툴은 가급적 모두 다 사용해보시는 것을 추천드린다. 러닝 커브가 전혀 존재하지 않을 정도로 fetch와 Axios의 코드 차이가 미미하기도 하고 사실 크게 부담느낄정도로 장단점이 극명하지도 않기 때문이다.

# 참고한 자료

[Nomad Coders](https://nomadcoders.co/courses) : ES6의 정석

[Axios - github](https://github.com/axios/axios)

[왜 Axios.js를 쓰는걸까?](https://vickp.tistory.com/19)

[Axios 공식문서](https://axios-http.com/)

[Ajax와 Axios 그리고 fetch](https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-Ajax%EC%99%80-Axios-%EA%B7%B8%EB%A6%AC%EA%B3%A0-fetch)

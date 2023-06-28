---
title: "자바스크립트 비동기 처리와 콜백 함수"
date: 2021-10-19
categories: javascript
toc: true
toc_sticky: true

---

# 자바스크립트 비동기 처리와 콜백 함수

## 들어가며

비동기 프로그래밍을 쉽게 처리할 수 있다는 점은 자바스크립트의 장점 중 하나이다.

비동기 프로그래밍을 사용하여 제작되면서 이벤트와 콜백만으로는 개발자가 원하는 모든 것을 충분히 지원할 수가 없었다. Promise는 이런 문제에 대한 해결책이다. Promise 에 대한 자세한 내용은 다음 포스팅에서 알아볼 것이다.

## Promise

- Promise는 **자바스크립트 비동기 처리에 사용되는 객체**이다.
- Promise는 이벤트와 콜백처럼 **나중에 실행될 코드를 명시**하지만, 코드 **실행의 결과가 성공인지 실패인지 또한 명시**적으로 가리킨다.

이러한 Promise는 성공인지 실패인지 기초한 여러 개의 Promise를 연결하여 이해하기 쉽고, 디버깅 하기 쉽다.

## 비동기 프로그래밍 배경지식

JS 엔진은 **싱글 스레드** 이벤트 루프 개념을 기반으로 한다.

⚠️ **싱글 스레드란?**

싱글 스레드라는 것은 한 번에 하나의 일만을 수행하는 것을 말한다. 자바스크립트의 모든 코드들은 창구가 딱 하나뿐인 은행에 줄을 선 손님들과 같다. 한 손님의 일이 끝난 후에야 그 뒤의 손님이 일을 볼 수 있다. 그리고 일을 다 본 손님은 도 줄을 설 수 없다.

문제가 될게 없어보일 수 있지만, 실제 코드들은 은행처럼 일이 느리게 돌아가지 않는다. (한 줄에 몇 ms 걸린다고 하니까) 만약 30초가 걸리는 코드를 넣어버리면, 그 뒤의 모든 코드들은 그것때문에 30초를 기다려줘야 한다.

결국 중요한 건, **자바스크립트는 멀티태스킹이 안된다는 것이다.**

1. 한 번에 한 개의 코드만 실행
2. 실행 예정인 코드는 작업큐에 유지

## web API

> web API lets us delay task without blocking the main thread.

다행히도, 브라우저는 자바스클비트 엔진이 스스로 하지 못하는 것을 대신 해줄 수 있다. web API이다. web API에는 DOM(document object model), 타이머, HTTP 요청 등이 있다.

```javascript
console.log("me first!") // 1.

const task = ()=>{
  console.log("I'm doing task~")
}

setTimeout(task, 1000) // 2.

console.log("what about me?") 
// 3. 1초를 기다려야 할까봐 걱정하고 있는(?) 코드

// 4. 
```

1. 가장 위에 있으므로 가장 먼저 실행된다.
2. setTimeout함수가 실행된다. 그러나 task함수는 바로 호출되지 않고 web API로 넘겨진다. 이제부터 task함수를 호출하는 주체는 자바스크립트 엔진이 아닌 web API의 타이머이다.
3. "what about me?"가 콘솔에 출력된다. 걱정할 필요 없이, 1초를 기다리지 않아도 코드가 바로 실행된다!
4. setTimeout함수가 실행된 후 1초 뒤, task함수가 큐(Queue)에 들어간다.

<img width="688" src="https://user-images.githubusercontent.com/53251100/137333248-84a50643-61dd-4360-976b-280cf26f8c78.png">

## 이벤트 루프

이벤트 루프의 차례가 왔다. 이벤트 루프가 하는 일은 오직 하나, **큐를 호출 스택과 연결**하는 것이다. 이전에 호출되었던 함수들이 각각의 값을 return해서 호출 스택에서 모두 나왔다면, 즉 호출 스택이 비어있다면, 큐에 있는 가장 첫번째 함수가 호출 스택에 들어가게 된다.

그 뒤로부터는 다른 모든 동기적 코드들과 똑같다. 실행되고, 값을 return하고, 호출 스택상에서 나가게 된다.

예시 : setTimeout의 콜백함수가 이벤트루프에 의해 호출되는 과정

```javascript
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
```

1. `bar` 함수를 호출한다. `bar` 함수는 `setTimeout`함수를 return한다.
2. setTimeout에 인자값으로써 들어간 콜백함수는 web API에 추가되고, setTimeout함수는 실행이 종료된다.
3. 타이머가 돌아가기 시작한다. 그 동안에 foo함수가 호출되고 "First"가 콘솔에 출력된다. baz함수 또한 호출되고 "Third"가 콘솔에 출력된다.
4. 이벤트 루프가 호출스택이 비었다는 걸 봤다.
5. 콜백함수가 "Second"를 콘솔에 출력한다.

---

💡다시 돌아와서, 이제 비동기 처리가 뭔지 알아보자. 자바스크립트가 비동기 처리를 하는 이유, 비동기 처리를 유연하게 하기 위한 콜백 함수, 콜백 함수 지옥 등 을 살펴보자.

## 비동기 처리

자바스크립트의 비동기 처리란 **특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행**하는 자바스크립트의 특성을 의미한다.

## 비동기 처리의 첫 번째 사례

비동기 처리의 가장 흔한 사례는 제이쿼리의 ajax이다. 제이쿼리로 실제 웹 서비스를 개발할 때 ajax 통신을 빼놓을 수가 없다. 보통 화면에 표시할 이미지나 데이터를 서버에서 불러와 표시해야 하는데 이때 ajax 통신으로 해당 데이터를 서버로부터 가져올 수 있기 때문이다.

그럼 ajax 코드를 잠깐 살펴보자.

```javascript
function getData() {
	var tableData;
	$.get('https://domain.com/products/1', function(response) {
		tableData = response;
	});
	return tableData;
}

console.log(getData()); // undefined
```

여기서 `$.get()`이 ajax 통신을 하는 부분이다. `https://domain.com` 에다가 HTTP GET 요청을 날려 1번 상품(product) 정보를 요청하는 코드이다. 좀 더 쉽게 말하면 지정된 URL에 ‘데이터를 하나 보내주세요’ 라는 요청을 날리는 것과 같다.

그렇게 서버에서 받아온 데이터는 `response` 인자에 담긴다. 그리고 `tableData = response;` 코드로 받아온 데이터를 `tableData`라는 변수에 저장한다. 그럼 이제 이 getData()를 호출하면 어떻게 될까? 받아온 데이터가 뭐든 일단 뭔가 찍혀야한다. 근데 결과는 맨 아래에서 보시는 것처럼 undefined이다. 왜 그럴까?

그 이유는 `$.get()`로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 `return tableData;`를 실행했기 때문이다. 따라서, getData()의 결과 값은 초기 값을 설정하지 않은 tableData의 값 undefined를 출력한다.

**이렇게 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기 처리이다.** 자바스크립트에서 비동기 처리가 필요한 이유를 생각해보면, 화면에서 서버로 데이터를 요청했을 때 서버가 언제 그 요청에 대한 응답을 줄지도 모르는데 마냥 다른 코드를 실행 안 하고 기다릴 순 없기 때문이다. 위에선 간단한 요청 1개만 보냈는데 만약 100개 보낸다고 생각해보자. 비동기 처리가 아니고 동기 처리라면 코드 실행하고 기다리고, 실행하고 기다리고.. 아마 웹 애플리케이션을 실행하는데 수십 분은 걸릴 것이다.

## 비동기 처리의 두 번째 사례

또 다른 비동기 처리 사례는 setTimeout()이다. setTimeout()은 Web API의 한 종류이다. 코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행한다. 아래 코드를 보자.

```javascript
// #1
console.log('Hello');
// #2
setTimeout(function() {
	console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');
```

비동기 처리에 대한 이해가 없는 상태에서 위 코드를 보면 아마 다음과 같은 결과값이 나올 거라고 생각할 것이다.

- ‘Hello’ 출력
- 3초 있다가 ‘Bye’ 출력
- ‘Hello Again’ 출력

그런데 실제 결과 값은 아래와 같이 나온다.

- ‘Hello’ 출력
- ‘Hello Again’ 출력
- 3초 있다가 ‘Bye’ 출력

setTimeout() 역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아니라 일단 setTimeout()을 실행하고 나서 바로 다음 코드인 `console.log('Hello Again');`으로 넘어갔다. 따라서, ‘Hello’, ‘Hello Again’를 먼저 출력하고 3초가 지나면 ‘Bye’가 출력된다.

## 콜백 함수로 비동기 처리 방식의 문제점 해결하기

앞에서 자바스크립트 비동기 처리 방식에 의해 야기될 수 있는 문제들을 살펴봤다. 이러한 문제들은 어떻게 해결할 수 있을까? 바로 콜백(callback) 함수를 이용하는 것이다. 앞에서 살펴본 ajax 통신 코드를 콜백 함수로 개선해보자.

```javascript
function getData(callbackFunc) {
	$.get('https://domain.com/products/1', function(response) {
		callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
	});
}

getData(function(tableData) {
	console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

이렇게 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬 수 있다.

## 비유로 이해하는 콜백 함수 동작 방식

콜백 함수의 동작 방식은 일종의 식당 자리 예약과 같다. 일반적으로 맛집을 가면 사람이 많아 자리가 없다. 그래서 대기자 명단에 이름을 쓴 다음에 자리가 날 때까지 주변 식당을 돌아다닌다. 만약 식당에서 자리가 생기면 전화로 자리가 났다고 연락이 온다. 그 전화를 받는 시점이 여기서의 콜백 함수가 호출되는 시점과 같다. 손님 입장에서는 자리가 날 때까지 식당에서 기다리지 않고 근처 가게에서 잠깐 쇼핑을 할 수도 있고 아니면 다른 식당 자리를 알아볼 수도 있다.

자리가 났을 때만 연락이 오기 때문에 미리 가서 기다릴 필요도 없고, 직접 식당 안에 들어가서 자리가 비어 있는지 확인할 필요도 없다. 자리가 준비된 시점, 즉 데이터가 준비된 시점에서만 저희가 원하는 동작(자리에 앉는다, 특정 값을 출력한다 등)을 수행할 수 있다.

## 콜백 지옥 (Callback hell)

콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제이다. 아마 아래와 같은 코드를 본 적이 있을 것이다.

```javascript
$.get('url', function(response) {
	parseValue(response, function(id) {
		auth(id, function(result) {
			display(result, function(text) {
				console.log(text);
			});
		});
	});
});
```

웹 서비스를 개발하다 보면 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우가 있다. 만약 이 모든 과정을 비동기로 처리해야 한다고 하면 위와 같이 콜백 안에 콜백을 계속 무는 형식으로 코딩을 하게 된다. 이러한 코드 구조는 가독성도 떨어지고 로직을 변경하기도 어렵다. 이와 같은 코드 구조를 콜백 지옥이라고 한다.

## 콜백 지옥을 해결하는 방법

일반적으로 콜백 지옥을 해결하는 방법에는 **Promise**나 **Async**를 사용하는 방법이 있다. 만약 코딩 패턴으로만 콜백 지옥을 해결하려면 아래와 같이 각 콜백 함수를 분리해주면 된다.

```javascript
function parseValueDone(id) {
	auth(id, authDone);
}
function authDone(result) {
	display(result, displayDone);
}
function displayDone(text) {
	console.log(text);
}
$.get('url', function(response) {
	parseValue(response, parseValueDone);
});
```

위 코드는 앞의 콜백 지옥 예시를 개선한 코드이다. 중첩해서 선언했던 콜백 익명 함수를 각각의 함수로 구분하였다. 정리된 코드를 간단하게 살펴보자. 먼저 ajax 통신으로 받은 데이터를 parseValue() 메서드로 파싱 한다. parseValueDone()에 파싱 한 결과값인 id가 전달되고 auth() 메서드가 실행된다. auth() 메서드로 인증을 거치고 나면 콜백 함수 authDone()이 실행된다. 인증 결과 값인 result로 display()를 호출하면 마지막으로 displayDone() 메서드가 수행되면서 text가 콘솔에 출력된다.

## 마무리

위와 같은 코딩 패턴으로도 콜백 지옥을 해결할 수 있지만 Promise나 Async를 이용하면 더 편하게 구현할 수 있다. 다음 글에서는 Promise에 대해서 알아보자.

# 참고한 자료

[Nomad Coders](https://nomadcoders.co/es6-once-and-for-all)

[자바스크립트 비동기 처리와 콜백 함수](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)

[콜백](https://ko.javascript.info/callbacks)

[JS 싱글 스레드 개념과 event loop](https://velog.io/@wonseok2877/TIL-15.-JS-%EC%8B%B1%EA%B8%80-%EC%8A%A4%EB%A0%88%EB%93%9C-%EA%B0%9C%EB%85%90%EA%B3%BC-event-loop)

[Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

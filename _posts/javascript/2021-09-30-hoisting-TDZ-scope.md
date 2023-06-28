---
title: "hoisting-TDZ-scope"
date: 2021-09-30
categories: javascript
toc: true
toc_sticky: true
---
# 호이스팅 & Temporal Dead Zone(TDZ)

호이스팅, Temporal Dead Zone에 대한 내용은 아래 블로그에 정리해두었음

[Hoisting&TDZ](https://goodniche.tistory.com/11)

# 유효범위 (Scope)

스코프는 참조 대상 **식별자**(identifier, 변수, 함수의 이름과 같이 어떤 대상을 다른 대상과 구분하여 식별할 수 있는 유일한 이름)**를 찾아내기 위한 규칙**이다.  자바스크립트는 이 규칙대로 식별자를 찾는다.

- scope은 버블이다. 이 버블은 variable 이 접근 가능한지 아닌지를 감지해준다. {} 을 기준으로 scope이 생긴다.

## **전역 스코프(Global scope)**

코드 어디에서든지 참조할 수 있다.

## **지역 스코프(Local scope or Function-level scope)**

함수 코드 블록이 만든 스코프로 함수 자신과 하위 함수에서나참조할 수 있다.

*모든 변수는 스코프를 갖는다. 변수의 관점에서 스코프를 구분하면 다음과 같이 2가지로 나눌 수 있다.

## 전역 변수 (Global variable)

전역에서 선언된 변수이며 어디에든 참조할 수 있다.

## 지역 변수 (Local variable)

지역(함수) 내에서 선언된 변수이며 그 지역과 그 지역의 하부 지역에서만 참조할 수 있다.

# 스코프의 특징 - Block Scope

let과 const의 장점은 block scope가 있다는 것이다.

# 스코프의 특징 - function Scope

- **var**는 **function scope**을 가진다. var가  function 안에서 접근할 수 있다는 뜻이다. 예제와 같이 if, else, try, catch, for 구문에서는 접근이 가능하다. var 는 {} 안에 선언한 경우에도 외부에서 내부의 변수를 사용할 수 있다.
- But, 일반 function 함수에서는 불가능하다.

**Example**

```javascript
if (true) {
  let hello = "hi";
  var hello = "hi";
}
console.log(hello);
// let의 경우 ReferenceError
// var의 경우 hi 출력
```

```javascript
let Hello = "hi";
if (true) {
    console.log(hello);
}
// 블록 안에서는 외부로 접근할 수 있지만, 외부에서는 내부로 접근할 수 없다.
```

# 참고한 자료들

[5.15 Scope](https://poiemaweb.com/js-scope)

Nomad Coder variables 강의


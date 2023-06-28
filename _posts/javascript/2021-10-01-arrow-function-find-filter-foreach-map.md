---
title: "arrow functions"
date: 2021-10-01
categories: javascript
toc: true
toc_sticky: true
---

# Arrow Functions

```javascript
const names = ["a", "b", "c"];

function addstart(item) {
  return item + "★";
}

const star = names.map(addstart);

console.log(star); //(3) ["a★", "b★", "c★"]
```



## implicit return

names 라는 배열에 "★"을 더한 새로운 배열을 만드는 함수를 작성해본다면, 기존 방식은 아래와 같다. 2가지 모두 동일한 결과를 얻는다.

```javascript
const names = ["a", "b", "c"];

const star = names.map(function (item) {
  return item + "★";
});

console.log(star); //(3) ["a★", "b★", "c★"]
```

```javascript
const names = ["a", "b", "c"];

function addstart(item) {
  return item + "★";
}

const star = names.map(addstart);

console.log(star); //(3) ["a★", "b★", "c★"]
```

위의 예제를 **ES6의 arrow function으로 작성**한다면, 다음과 같다.

```javascript
const names = ["a", "b", "c"];

const star = names.map(item => item + "★");
// = const star = names.map(() => item + "★");

console.log(star); //(3) ["a★", "b★", "c★"]
```

item 이라는 argument를 가지고 **implicit return** 하는 함수이다.

implicit return 이란 같은 줄에 뭘 적던지 return 된다는 뜻이다.

→ return은 함수 결과를 반환하는데 사용되는 명령어이다. 한 줄로만 작성된 arrow 함수는 별도의 명령어가 없어도 자동으로 반환하도록 되어있습니다.

→ **implicit return 는 {} 을 쓰면 사용하지 못한다.**

## 'this' in Arrow Functions

> this 키워드를 사용해야하는 경우에는 arrorw function을 사용하지 않는다.
>
> addEventLIstener와 같은 이벤트클릭에서도 arrow function을 사용하지 않는다.

- 아래는 **function 함수에서 this를 사용한 예제**이다.

```html
<<--index.html-->>
<button>click me<button>
```

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("i have been clicked");
});
// 제대로 동작
```

- 다음은 **arrow function 함수에서 this를 사용한 예제**이다.

```javascript
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log(this); // print: Window
  //arrow function은 this를 window object로 가지고 있다.
  this.style.color = "blue"; // Uncaught TypeError
});
```

- arrow function 은 어디에서든 내부의 this 값을 변화시키지 않는다.

```javascript
const ex = {
  name: "ex",
  age: 20,
  addYear() {
      this.age++;
  },
  addYearArrow: () => {
    this.age++;
  }
}

ex.addYear(); //age 값을 1씩 늘리며 원하는 값을 얻음
ex.addYearArrow(); //age의 값은 그대로
```

# Arrow Functions in the Real World

## **Array.prototype.find()**

> The `find()` method returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is returned.
>
> 조건에 만족하는 **첫 번째 요소의 값**을 반환

### **Parameters**

**`callbackFn`**

Function to execute on each value in the array, taking 3 arguments:

Function to execute on each value in the array, taking 3 arguments:

- **`element`**

  The current element in the array.

- **`index`** Optional

  The index (position) of the current element in the array.

- **`array`** Optional

  The array that `find` was called on.

**`thisArg`** Optional

Object to use as [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) inside `callbackFn`.

```javascript
const emails = [
  "apple@gmail.com",
  "banna@bmail.com",
  "orange@cmail.com",
  "melon@gmail.com"
];

const foundMail = emails.find(item => item.includes("@gmail.com"));

console.log(foundMail); //apple@gmail.com
```

## **Array.prototype.filter()**

> The **`filter()`** method **creates a new array** with all elements that pass the test implemented by the provided function.
>
> 조건을 만족한 모든 엘리먼트로 새로운 array를 만든다.

### **Parameter**

**`callbackFn`**

Function is a predicate, to test each element of the array. Return a value that coerces to `true` to keep the element, or to `false` otherwise.

It accepts three arguments:

- **`element`**

  The current element being processed in the array.

- **`index`**Optional

  The index of the current element being processed in the array.

- **`array`**Optional

  The array `filter` was called upon.

**`thisArg`**Optional

Value to use as `this` when executing `callbackFn`.



```javascript
const emails = [
  "apple@gmail.com",
  "banna@bmail.com",
  "orange@cmail.com",
  "melon@gmail.com"
];

const noGmail = emails.filter(item => !item.includes("@gmail"));

console.log(noGmail); //(2) ["banna@bmail.com", "orange@cmail.com"]
```

## **Array.prototype.forEach()**

> The **`forEach()`** method executes a provided function once for each array element.
>
> 각 array 의 엘리먼트마다 함수를 실행시킨다.

### **Parameter**

**`callbackFn`**

Function to execute on each element. It accepts between one and three arguments:

- **`element`**

  The current element being processed in the array.

- **`index`** Optional

  The index of `element` in the array.

- **`array`** Optional

  The array `forEach()` was called upon.

**`thisArg`** Optional

Value to use as `this` when executing `callbackFn`.

```javascript
const emails = [
  "apple@gmail.com",
  "banna@bmail.com",
  "orange@cmail.com",
  "melon@gmail.com"
];

emails.forEach(email => {
    console.log(email.split("@")[0]);
}); // apple, banna, orange, melon

// map 활용 - 새로운 array를 만들어 준다.
const cleaned = emails.map(email => email.split("@")[0]);
console.log(cleaned); //(4) ["apple", "banna", "orange", "melon"]
```

## Object 를 리턴하고 싶으면?

```javascript
const emails = [
  "apple@gmail.com",
  "banna@bmail.com",
  "orange@cmail.com",
  "melon@gmail.com"
];

const cleaned = emails.map((email, index) => ({username: email.split("@")[0], index})); //index: index 와 동일
// ({username: email.split("@")[0], index}): ()로 전체를 감싸주면 Object를 return 하겠다는 뜻

console.log(cleaned);
//(4) [Object, Object, Object, Object]
//0: {username: "apple", index: 0}
//1: {username: "apple", index: 1}
//2: {username: "apple", index: 2}
//3: {username: "apple", index: 3}
```

→ **implicit return 는 {} 을 쓰면 사용하지 못하고 () 을 같이쓰면 object도 가능해진다.**

# Default Values

기본값 설정

```javascript
// function type
function sayHi(aName) {
  return "Hello " + (aName || " anon");
}
console.log(sayHi()); //Hello anon

// arrrow function type1
const sayHi = (aName = "anon") => "Hello " + aName;
console.log(sayHi()); //Hello anon


// arrrow function type2
const DEFAULT = "stranger"
const sayHi = (aName = DEFAULT) => "Hello " + aName;
console.log(sayHi()); //Hello anon

```

# 참고한 자료들

[[번역]ES6 축약코딩 기법 19가지](https://chanspark.github.io/2017/11/28/ES6-%EA%BF%80%ED%8C%81.html)

[Nomad Coder - ES6 Funtions](https://nomadcoders.co/courses)

[Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

[Array.prototype.filter()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

[Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

[Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
---
title: "array method"
date: 2021-10-04
categories: javascript
toc: true
toc_sticky: true
---

# Array method

## Array.of()

> The **`Array.of()`** method creates a new `Array` instance from a variable number of arguments, regardless of number or type of the arguments.
>
> The difference between **`Array.of()`** and the **`Array`** constructor is in the handling of integer arguments: **`Array.of(7)`** creates an array with a single element, `7`, whereas **`Array(7)`** creates an empty array with a `length` property of `7` (**Note:** this implies an array of `7` empty slots, not slots with actual [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) values).
>
> 어떠한 인자를 갖는 새 Array 인스턴스를 만든다.

```javascript
Array.of(7); // [7]
Array(7); // array of 7 empty slots

Array.of(1, 2, 3); // [1, 2, 3]
Array(1, 2, 3);    // [1, 2, 3]
```

## Array.from()

> The **`Array.from()`** static method creates a new, shallow-copied `Array` instance from an array-like or iterable object.
>
> **Array-like object**나 반복 가능한 객체(iterable object) 를 복사해 새로운 Array 객체를 만든다.

아래 예제는 Array-like object를 보여주는 예제이다.

```html
<button class="btn">button</button>
<button class="btn">button</button>
<button class="btn">button</button>
```

```javascript
const buttons = document.quserySelectorAll("button");

console.log(buttons); //NodeList(3) [button, button, button]
```

다음 예제는 Array-like object 가 from을 활용해 Array가 되어 사용되는 예제이다.

```javascript
const buttonclass = document.getElementsByClassName("btn");

Array.from(buttonclass).forEach((buttonclass) => {
  buttonclass.addEventListener("click", () =>
  	console.log("i have been clicked")
  );
});
```

## Array.find()

> The `find()` method returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) is returned.
>
> 조건에 만족하는 첫 번째 element를 찾는다.

**Syntax**

```javascript
// Arrow function
find((element) => { ... } )
find((element, index) => { ... } )
find((element, index, array) => { ... } )

// Callback function
find(callbackFn)
find(callbackFn, thisArg)

// Inline callback function
find(function callbackFn(element) { ... })
find(function callbackFn(element, index) { ... })
find(function callbackFn(element, index, array){ ... })
find(function callbackFn(element, index, array) { ... }, thisArg)
```

```javascript
const friends = [
	"apple@gmail.com",
	"orange@abc.com",
	"melon@company.com"
];

const target = friends.find(friend => friend.includes("@gmail.com"));

console.log(target); //apple@gmail.com
```

## Array.findIndex()

> The **`findIndex()`** method returns the **index** of the first element in the array **that satisfies the provided testing function**. Otherwise, it returns `-1`, indicating that no element passed the test.
>
> **주어진 판별 함수를 만족**하는 배열의 첫 번째 요소에 대한 **인덱스**를 반환
> 만족하는 요소가 없으면 -1을 반환

**Syntax**

```javascript
arr.findIndex(callback(element[, index[, array]])[, thisArg])
```

**Parameters**

`callbackFn`

A function to execute on each value in the array until the function returns `true`, indicating that the satisfying element was found.

It takes three arguments:

- `element`

  The current element being processed in the array.

- `index` Optional

  The index of the current element being processed in the array.

- `array` Optional

  The array `findIndex()` was called upon.

`thisArg` Optional

Optional object to use as `this` when executing `callbackFn`.

```javascript
const friends = ["apple@gmail.com", "orange@abc.com", "melon@company.com"];

const check = () => friends.findIndex((friend) => friend.includes("@company.com"));

let target = check();

if (target !== -1) {
  console.log(target); // 2 (2	번째에 있는 것 확인)

  const username = friends[target].split("@")[0];
  const email = "kmail.com";

  friends[target] = `${username}@${email}`;

  target = check();
}

console.log(target); // -1
console.log(friends); // (3) ["apple@gmail.com", "orange@abc.com", "melon@kmail.com"]
```

## Array.fill()

> The **`fill()`** method changes all elements in an array to a static value, from a start index (default `0`) to an end index (default `array.length`). It returns the modified array.
>
> 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채운다.

**Syntax**

```javascript
arr.fill(value[, start[, end]])
```

**Parameters**

```
value
```

Value to fill the array with. (Note all elements in the array will be this exact value.)

`start` Optional

Start index, default `0`.

`end` Optional

End index, default `arr.length`

```javascript
const friends = ["apple@gmail.com", "orange@abc.com", "melon@company.com"];

const check = () => friends.findIndex((friend) => friend.includes("@company.com"));

let target = check();

if (target !== -1) {
  friends.fill("*".repeat(5), target);
}

console.log(friends); //(3) ["apple@gmail.com", "orange@abc.com", "*****"]
```

## Array.includes()

> The **`includes()`** method determines whether an array includes a certain value among its entries, returning `true` or `false` as appropriate.
>
> 배열이 특정 요소를 포함하고 있는지 판별

**Syntax**

```javascript
arr.includes(valueToFind[, fromIndex])
```

# 참고한 자료들

[Nomad Coder - ES6 Array 강의](https://nomadcoders.co/courses)

[Array.prototype.of()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

[Array.prototype.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

[Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

[Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

[Array.prototype.fill()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

[Arrary.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

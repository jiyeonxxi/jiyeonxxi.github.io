---
title: "destructuring (object, array)"
date: 2021-10-11
categories: javascript
toc: true
toc_sticky: true
---

# Object Destructuring (비구조화)

> Object Destructuring이란 object 나 array, 그 외 요소들 안의 변수를 바깥으로 끄집어 내서 사용할 수 있도록 하는 것이다.

지금부터 예전에는 어땠는지 그리고 지금은 어떻게 할 수 있는지 알아봅시다.

## 예전

```javascript
const settings = {
  notifications: {
    follow: true,
    alerts: true,
    unfollow: false
  },
  color: {
    theme: "dark"
  }
};

if(settings.notifications.follow) {
  //
}
```

문제점 : settings.notifications.follow 의 follow 값이 아예 없거나 notifications가 통째로 없는 경우에는 이슈가 생김

## 현재

위와 같은 일이 생기지 않기 위해 destructuring을 해준다. 아래는 object destructuring 이다.

```javascript
const settings = {
  notifications: {
    follow: true,
    alerts: true,
    unfollow: false
  },
  color: {
    theme: "dark"
  }
};

const {
  notifications : { follow },
  color
} = settings;

console.log(follow); //true
console.log(color); //{theme: "dark"}
console.log(notifications) //Uncaught ReferenceError
```

notifications 안으로 접근하고 그 값(follow)은 settings 안에 있다. Follow 만을 가져온다. 또, color 안에 있는 모든 값을 다 가져온다.

> **이런 방식은, 큰 오브젝트에서 특정 변수나 그 안에 속한 작은 오브젝트에 접근할 수 있도록 해주는 것이다.**

## default value 1

```javascript
const settings = {
  notifications: {
    alerts: true,
    unfollow: false
  },
  color: {
    theme: "dark"
  }
};

const { 
  notifications: { follow = false }
} = settings;

console.log(follow) //false (follow 가 없으므로 false 반환)
```

settings 안의 notifications 안으로 가서 follow 가 있는지 찾아본 다음에 follow 가 없다면, follow = false 라고 선언해주겠다는 의미이다.

## default value 2

```javascript
const settings = {
  color: {
    theme: "dark"
  }
};

const {
  notifications: { follow = false } = {}
} = settings;

console.log(follow) //false
console.log(notifications) // undefined 라고 나오는 대신 빈 object가 있다.
```

Settings 안을 보고 notifications 안으로 들어가서 follow 값을 찾는데, 만약 follow가 없으면 follow = false 가 되는 것이다. 그리고 notifications 자체가 없다면 notifications 는 빈 object가 되는 것이다.

# Array Destructuring

Array Destructuring은 가져온 정보를 조작하지 않을 때 쓰기 좋다.

## Example

- **Example 1**

```javascript
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const [sun, mon, tue] = days;

console.log(sun, mon, tue); //Sun, Mon, Tue
```

- **Example 2** - default value 추가 할 때

```javascript
const days = ["Sun", "Mon", "Tue"];

const [sun, mon, tue, wed = "Wed"] = days;

console.log(sun, mon, tue, wed); //Sun, Mon, Tue, Wed
```

# Renaming

API로부터 데이터를 받아오게되면, 기존 코드에서 사용하는 이름과 다를 텐데, 이 때 원하는 이름으로 renaming 을 해주는 방법을 알아보고자 한다.

## Example

## Example

- **Example 1**

```javascript
const settings = {
  color: {
    chosen_color: "dark"
  }
};

const {
  color: { chosen_color: chosenColor = "light" }
} = settings;

console.log(chosenColor); //dark
```

## Example

- **Example 1**

```javascript
const settings = {
  color: {
    chosen_color: "dark"
  }
};

const {
  color: { chosen_color: chosenColor = "light" }
} = settings;

console.log(chosenColor); //dark
```

settings 안의 color로 가서 chosen_color 변수를 가져올 건데 가져온 변수의 이름을 바꿔줬고, 만약 값이 존재하지 않으면 기본값으로 light 라는 값을 넣어준다.

- **Example 2** - let 변수를 업데이트 할 때

```javascript
const settings = {
  color: {
    chosen_color: "dark"
  }
};

let chosenColor = "blue";
console.log(chosenColor); //blue
({
  color: { chosen_color: chosenColor = "light" }
} = settings);

console.log(chosenColor); //dark
```

아래 코드와 같이 전체를 `() ` 로 감싸주면 `let chosenColor` 변수를 찾아서 업데이트 하는 것이다. (const 는 변수값을 변경할 수 없기 때문에 불가능하다.)

```javascript
({ color: { chosen_color: chosenColor = "light" }} = settings);
```

# 참고한 자료들

[Nomad Coders](https://nomadcoders.co/es6-once-and-for-all)

[구조 분해 할당(destructuring)](https://ko.javascript.info/destructuring-assignment#ref-455)


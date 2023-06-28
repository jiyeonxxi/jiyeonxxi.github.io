---
title: "destructuring (function)"
date: 2021-10-12
categories: javascript
toc: true
toc_sticky: true
---

# Function Destructuring

## function destructuring 을 사용해야 하는 이유

```javascript
function saveSettings(settings) {
  if(!settings.mkt) {

  }
  saveColor(settings.color)
}
saveSettings({
  follow: true,
  alert: true,
  mkt: false,
  color: "green"
});
```

위와 같이 작성했을 경우, settings.mkt 에 직접 접근해야할 뿐 아니라, saveColor 의 경우 color 가 없을 경우 undefined 가 뜨게 되므로 사용성이 떨어지게 된다. 아래의 예제와 같이 구조 분해를 통해 작성해보자.

## Function destructuring Example1

```javascript
function saveSettings({ follow, alert, color = "blue" }) {
  console.log(color); //green
}
saveSettings({
  follow: true,
  alert: true,
  mkt: false,
  color: "green"
});
```

## Function destructuring Example2

```javascript
function saveSettings({ notifications, color: { theme } }) {
  console.log(theme); //orange
}
saveSettings({
  notifications: {
    follow: true,
    alert: true,
    mkt: false
  },
  color: {
    theme: "orange"
  }
});

```

# Value Shorthands Property

Value shorthands (변수명 단축) : 객체를 정의 할 때 객체의 key값과 value의 값이 같으면, key와 value값을 각각 표기하지 않고 `한 번만 표기`하는 것을 의미

```javascript
const follow = checkFollow();
const alert = checkAlert();

const settings = {
  notifications: {
    follow, //== follow: follow,
    alert //==alert: alert
  }
};
```

follow: follow / alert: alert 은 다음과 같다.

첫 번째 follow, alert은 object의 key값에 해당하고, 두 번째는 상단에 있는 변수에 해당한다.

# Swapping and Skipping

## variable swapping (변수값 교환)

원래 들어가 있어야할 변수값이 다른 변수값과 바뀌어 들어가 있는 경우, swapping을 통해 값을 교환을 해준다.

```javascript
let mon = "Sat";
let sat = "Mon";

[sat, mon] = [mon, sat]
// (왼쪽) "Sat" "Mon" 변수값을 넣겠다 = (오른쪽) 변경할 변수
// 즉, 오른쪽에 있는 변수에 왼쪽 변수의 값을 넣겠다
```

## skipping variable (변수 생략)

Array 에서 특정 값을 생략(omitting) 하는 방법

```javascript
const days = ["mon", "tue", "wed", "thu", "fri"];

conts [, , , thu, fri] = days;
// 4, 5번째 변수값 가져오고 싶을 때, 앞의 변수는 , (콤마) 로 표현

console.log(thu, fri); // thu, fri
```

# 참고한 자료

[Nomad Coders](https://nomadcoders.co/es6-once-and-for-all)

[smart function parameters](https://javascript.info/destructuring-assignment#smart-function-parameters)

---
title: "virtual DOM 만들기"
date: 2021-10-07
categories: dom
toc: true
toc_sticky: true

---

# Simple Virtual DOM  FW을 만들어 보자 (internal 구현)

## Real DOM → JSON

```html
<!--DOM-->
<ul class=”list”>
  <li>item 1</li>
  <li>item 2</li>
</ul>
```

```json
// JSON
{ type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
  { type: ‘li’, props: {}, children: [‘item 1’] },
  { type: ‘li’, props: {}, children: [‘item 2’] }
] }
```

```json
// JSON 표현
{ type: ‘…’, props: { … }, children: [ … ] }
```

## JSON → function

```json
// JSON 표현
{ type: ‘…’, props: { … }, children: [ … ] }
```

```javascript
// function
function h(type, props, …children) {
  return { type, props, children };
}
```

```javascript
// DOM 트리 작성 (사용)
h(‘ul’, { ‘class’: ‘list’ },
  h(‘li’, {}, ‘item 1’),
  h(‘li’, {}, ‘item 2’),
);
```

## JSX 표현

```javascript
//JSX 표현
const a = (
  <ul className=”list”>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);
```

```javascript
// Babel 의해 다음 코드로 변환
const a = (
  h(‘ul’, { className: ‘list’ },
    h(‘li’, {}, ‘item 1’),
    h(‘li’, {}, ‘item 2’),
  );
);
```

[JSX 표현](https://jsfiddle.net/deathmood/5qyLubt4/)

# 참고한 자료들

[Virtual Dom](https://www.slideshare.net/gyeongseokseo/virtual-dom)

[How to write your won Virtual DOM](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060)

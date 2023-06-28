---
title: "TIL : 공통화 작업 (회사 업무)"
date: 2022-01-11
categories: qled
toc: true
toc_sticky: true
---
# 미션 : 공통화 작업

**(Feat.회사 업무)**

## 공통화 작업할 소스

```javascript
//tagging
let __tagging = __videoBtn.getAttribute('an-la');
__tagging = __tagging.replace('play', 'stop');
__videoBtn.setAttribute('an-la', __tagging);
```

```javascript
//tagging
let __tagging = __videoBtn.getAttribute('an-la');
__tagging = __tagging.replace('stop', 'play');
__videoBtn.setAttribute('an-la', __tagging);
```

```javascript
//tagging
__tagging = __tagging.replace('stop', 'play');
__el.setAttribute('an-la', __tagging);
```

```javascript
//tagging
__tagging = __tagging.replace('play', 'stop');
__el.setAttribute('an-la', __tagging);
```

```javascript
//tagging
let __tagging = __videoBtn.getAttribute('an-la');
__tagging = __tagging.replace('stop', 'play');
__videoBtn.setAttribute('an-la', __tagging);
```

```javascript
//tagging
let __tagging = __videoBtn.getAttribute('an-la');
__tagging = __tagging.replace('stop', 'play');
__videoBtn.setAttribute('an-la', __tagging);
```

## 공통화 작업 ver.1

```javascript
TAGGING: {
	VIDEO: {
		PLAY: function (__videoBtn) {
			let __tagging = __videoBtn.getAttribute('an-la');
			__tagging = __tagging.replace('play', 'stop');
			__videoBtn.setAttribute('an-la', __tagging);
		},
		PAUSE: function (__videoBtn) {
			let __tagging = __videoBtn.getAttribute('an-la');
			__tagging = __tagging.replace('stop', 'play');
			__videoBtn.setAttribute('an-la', __tagging);
		},
	},
	EVENT: {
		PLAY: function (__el) {
			let __tagging = __el.getAttribute('an-la');
			__tagging = __tagging.replace('play', 'stop');
			__el.setAttribute('an-la', __tagging);
		},
		PAUSE: function (__el) {
			let __tagging = __el.getAttribute('an-la');
			__tagging = __tagging.replace('stop', 'play');
			__el.setAttribute('an-la', __tagging);
		},
	}
},
  
  
// 코드 사용시
VD_COMMON.TAGGING.EVENT.PAUSE(__el);
VD_COMMON.TAGGING.EVENT.PAUSE(__videoBtn);
```

## 공통화 작업 ver.2

```javascript
TAGGING: function (__elname) {
	let __tagging = __elname.getAttribute('an-la');
	if (__tagging.indexOf("stop") != -1) {
	__tagging = __tagging.replace('stop', 'play');
	} else {
	__tagging = __tagging.replace('play', 'stop');
	}
	__elname.setAttribute('an-la', __tagging);
},
  
// 코드 사용시
VD_COMMON.TAGGING(__el);
VD_COMMON.TAGGING(__videoBtn);
```

## 공통화 작업 ver.3

```javascript
TAGGING: {
	VIDEO: {
		PLAY_PAUSE_BTN: function (__videoBtn, __type) {
			let __tagging = __videoBtn.getAttribute('an-la');
			__type == 'stop' ? __tagging = __tagging.replace('stop', 'play') : __tagging = __tagging.replace('play', 'stop');
			__videoBtn.setAttribute('an-la', __tagging);
		},
	},
	EVENT: {
		PLAY_PAUSE_BTN: function (__videoBtn, __type) {
			let __tagging = __el.getAttribute('an-la');
			__type == 'stop' ? __tagging = __tagging.replace('stop', 'play') : __tagging = __tagging.replace('play', 'stop');
			__videoBtn.setAttribute('an-la', __tagging);
		},
	}
},


// 코드 사용시
VD_COMMON.TAGGING.VIDEO.PLAY_PAUSE_BTN(__videoBtn, 'play');
VD_COMMON.TAGGING.VIDEO.PLAY_PAUSE_BTN(__videoBtn, 'stop');
```

# TIL

## indexOf() - String.prototype.indexOf()

**indexOf()** 메서드는 호출한 [`String`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String) 객체에서 주어진 값과 일치하는 첫 번째 인덱스를 반환한다. 일치하는 값이 없으면 -1을 반환한다.

```javascript
const paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?';

const searchTerm = 'dog';
const indexOfFirst = paragraph.indexOf(searchTerm);

console.log(`The index of the first "${searchTerm}" from the beginning is ${indexOfFirst}`);
// "The index of the first "dog" from the beginning is 40"

console.log(`The index of the 2nd "${searchTerm}" is ${paragraph.indexOf(searchTerm, (indexOfFirst + 1))}`);
// "The index of the 2nd "dog" is 52"
```

## getAttribute()

> Element.getAttribute()
>

`getAttribute()` 은 해당 요소에 지정된 값을 반환한다. 만약 주어진 속성이 존재 하지 않는 다면, null 값이나 ""(빈문자열); 을 반환 할 것이다.

```javascript
let div1 = document.getElementById("div1");
let align = div1.getAttribute("align");

alert(align); // id가 "div1"인 요소(element)의 align 값을 보여준다.
```

## setAttribute()

> lement.setAttribute()

지정된 요소의 속성 값을 설정한다. 속성이 이미 있는 경우 값이 업데이트된다. 그렇지 않으면 지정된 이름과 값으로 새 속성이 추가된다. 속성의 현재 값을 얻으려면 getAttribute()를 사용하면 된다. 속성을 제거하려면 removeAttribute()를 호출한다.

```html
<!--html-->
<button>Hello World</button>
```

```javascript
//javascript
const b = document.querySelector("button");

b.setAttribute("name", "helloButton");
b.setAttribute("disabled", "");
```

```html
<!--output-->
<button type="button" class="ghost main-menu-toggle" aria-haspopup="true" aria-label="Show Menu" name="helloButton" disabled=""></button>
```

# 깃 소스 URL

[QLED](https://github.com/jenniexxi/qled/blob/main/project/2022-neo-qled/src/js/qled.js)

[indexOf](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

[getAttribute](https://developer.mozilla.org/ko/docs/Web/API/Element/getAttribute)

[setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
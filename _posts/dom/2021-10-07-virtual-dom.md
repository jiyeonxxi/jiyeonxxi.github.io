---
title: "virtual DOM 이해하기"
date: 2021-10-07
categories: dom
toc: true
toc_sticky: true

---

# Virtual DOM의 등장배경

- DOM의 Good Point
  - 크로스 플랫폼, 크로스 브라우저를 지원
  - 웹 페이지 구조를 쉽게 표현
  - 사용하기 쉽고, control 할 수 있는 API가 제공
- DOM의 Bad Point
  - DOM manipulation에서 성능의 문제가 있다(느리다)

> DOM manipulation : element, attribute, events, style

## DOM manipulation 이 느린가?

- pure javascript가 가장 빠른거 아닌가?
- pure javascript가 결국 최종적인 manipulation API 아닌가?

## DOM manipulation 느림의 진실

- 사실 느리지 않음
- DOM을 조작하려면, DOM API를 써야한다

## 그럼 왜 느리다고 할까?

[**DOM manipulation 을 하면 Browser 에서 일어나는 일**]

![rendering flow](https://user-images.githubusercontent.com/53251100/136184005-57cdf51c-8cd1-4dd7-9325-284098e6ee2a.png)

![rendering flow](https://user-images.githubusercontent.com/53251100/136184636-a74a8d10-9e5b-40e8-9545-b9eb3d38ce86.png)

![rendering flow](https://user-images.githubusercontent.com/53251100/136184419-0297ee44-d411-4166-8bf6-067643e11dfc.png)

- relow (layout)
  - render tree의 전체 또는 일부를 다시 확인하고, 노드의 크기를 계산해야 할 때 발생
  - 적어도 최소한 한 번은 발생 (페이지가 처음 그려질 때)
- repaint
  - 화면이 다시 그려져야 (update) 하는 경우 발생
- what triggers a reflow or a repaint?
  - adding, removing, updating DOM node
  - DOM node 숨기기
    - display: none (reflow and repaint)
    - visibility: hidden (repaint only)
  - moving, animating a DOM node on the page
  - 스타일시트 추가, 스타일 속성 조정
  - 창 크기 조정, 글꼴 크기 변경, 스크롤과 같은 사용자 작업...
- 브라우저는 reflow, repaint 를 최대한 최적화하여 동작
- But, 브라우저의 최적화를 무력화 시키는 경우 존재
  1. offsetTop, offsetLeft, offsetWidth, offsetHeight
  2. scrollTop (Left/ Width / Height)
  3. clientTop (Left/ Width / Height)
  4. getComputedSylte() or currentStyle in IE

## 느리다는 말의 의미

→ DOM의 manipulation 이 느리다 (X)

→ **DOM의 rendering calculation 이 느리다**!! (DOM manipulation을 할 때 발생하는) (O)

# Virtual DOM의 concept

## DOM manipulation 횟수 최소화

- DOM의 manipulation을 빠르게 한다? (X)
- DOM의 **manipulation에서 발생하는 rendering을 최소화** 하자(O)

> **DOM manipulation의 횟수를 최소화 하자**

- 변경할 사항을 "가상의" 위치에서 처리하고, "실제 DOM"의 조작을 최쇠화!

## What is virtual DOM?

- `가상의 DOM을 만들고 관리`하는 것
- UI로 표현될 객체를 가상 메모리에 저장하고 라이브러리에 의해 실제 DOM으로 동기화 하는 개념
- 가상의 DOM이란?
  - 무엇이든 될 수 있다
  - JSON, XML, function, text, annotation, etc...

## Virtual DOM JSON으로 이해해 보기

- JSON DOM을 update 하기

![json](https://user-images.githubusercontent.com/53251100/136311131-a0a95782-2050-4d70-9800-72f54cfe02a8.png)

> **실제 DOM manipulation 없이, JSON에 대한 조작으로 DOM을 update**
>
> **여러 JSON 으로 manipulation을 한 이후 최종적으로만 dom manipulation**

## Virtual DOM의 문제점

- Virtual Table을 생성해야 함
  - in-memory 사용의 증가
- 개발자가 Virtual DOM의 개념을 이해 못하고 구현 시, 큰 성능 향상이 없을 수 있음

# 참고한 자료들

[Virtual Dom](https://www.slideshare.net/gyeongseokseo/virtual-dom)
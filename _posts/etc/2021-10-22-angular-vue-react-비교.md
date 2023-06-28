---
title: "Angular vs React vs Vue"
date: 2021-10-22
categories: etc
toc: true
toc_sticky: true


---



이번 포스팅에서는 Angular, React 그리고 Vue의 다양한 측면을 다루어 볼까 한다. 가이드가 아니라 Javascript 프레임워크를 판단하는 것에 대해 알아보고자 한다. 해당 포스팅은 codeinwp 에서 제공하는 내용을 바탕으로 작성되었습니다.

# 1부 : Vue vs React vs Angular 의 간략한 역사

## 어떻게 시작되었나

![angular-logo](https://user-images.githubusercontent.com/53251100/137847005-b31c6623-9909-4d75-be85-0cbfabe6fe6c.png)

Google 에서 개발한 Angular는 2010년에 처음 출시되었고 가장 오래되었다. TypeScript 기반의 JavaScript 프레임워크이다. 2016년 Angular2가 출시되면서 상당한 변화가 일어났다.

![vue-logo](https://user-images.githubusercontent.com/53251100/137847059-17e9ed36-d8c0-4b66-98f3-a359adbeaae6.png)

2014년 Google 직원 Evan You가 개발했다. Vue는 대기업의 지원을 받지 못함에도 불구하고 지난 3년동안 상당한 인기를 얻었다.

![react-logo](https://user-images.githubusercontent.com/53251100/137847368-e44061fd-31fd-458a-a46b-78aa8fe6f10e.png)

Facebook에서 개발한 react는 2013년에 처음 출시되었다. Facebook, Instagram, WhatsApp에서 React를 광범위하게 사용한다.

## Popularity

Angular와 React를 구글 트렌드에서 인기를 파악하기란 어렵다. 인기도에 알 수 있는 방법은 GitHub repository가 얻는 별의 수이다. Vue의 별 수가 2016년 중반에 갑자기 바뀌었고 최근에는 Vue가 가장 인기있는 프레임워크 중 React와 상위에 올랐다.

![2021-star-history](https://user-images.githubusercontent.com/53251100/137847925-3effea0f-0603-4d5b-ad1d-e43972c29d79.png)

# 2부 : 커뮤니티 및 개발

<img width="695" alt="" src="https://user-images.githubusercontent.com/53251100/137848555-b502de04-a5f0-4b10-9b22-97540974d24a.png">

Vue와 React를 비교할 때 Vue에는 엄청난 수의 watcher, stars 및 forks가 있다. 이는 사용자들 사이에서 Vue의 인기도와 React 대비 그 가치를 보여준다. 그러나 Vue의 contributors의 수는 Angular, React보다 적다.

한 가지 가능한 설명은 Vue가 전적으로 오픈 소스 커뮤니티에 의해 주도되는 반면 Angular와 React는 저장소에 기여하는 Google 및 Facebook 직원의 상당 부분을 가지고 있다는 것이다.

통계에 따르면 세 가지 프로젝트 모두 상당한 개발 활동을 보여주고 있으며 이는 앞으로도 계속될 것입니다. 이러한 통계만으로는 둘 중 하나를 사용하지 않기로 결정한 근거가 될 수 없습니다.

# 3부 : 마이그레이션

선택한 프레임워크로 작업할 때 프레임워크 업데이트가 발생하여 코드가 엉망이 되는 것에 대해 걱정할 필요가 없습니다. 대부분의 경우 한 버전에서 다른 버전으로 많은 문제가 발생하진 않지만 일부 업데이트는 더 중요할 수 있고 호환성을 유지하기 위해 조정이 필요할 수 있으므로 계속 확인하는 것이 중요하다.

Angular는 6개월마다 주요 업데이트를 계획합니다.

React는 Facebook, Twitter, Airbnb와 같은 대기업이 React를 사용하기 때문에 안정성이 가장 중요하다고 말한다. react-component와 같은 스크립트를 사용하여 마이크레이션할 수 있다.

Vue는 2와 3간의 많은 부분이 동일하지만 1에서 2로 마이크레이션 하는 경우 API의 90%가 동일하다고 언급한다. 

# 4부 : Vue vs Angular vs React 작업

## Componnets

- Angular는 HTML 태그의 속성으로 컴포넌트의 UI부분과 Javascript 코드의 형태로 동작을 분리한다. 이것이 React와 볼 때 구별되는 것이다.
- React는 UI와 구성 요소의 동작을 결합한다. 코드의 동일한 부분은 UI 요소를 만들고 그 동작을 지시하는 역할을 한다.
- Vue와 React를 비교해보면 Vue에서 UI와 동작도 구성 요소의 일부이므로 더 직관적으로 만든다. 또한 Vue는 사용자 정의가 가능하므로 스크립트 내에서 구성 요소의 동작과 UI를 결합할 수 있다. 또한 CSS 대신 Vue에서 전처리기를 사용할 수도 있다. 이것은 훌륭한 기능이다. Vue는 Bootstrap과 다른 라이브러리와의 통합과 관련하여 훌륭하다.

## Learning curve

- Angular는 학습 곡선이 가파르며 마스터하려면 TypeScript 및 MVC와 같은 관련 개념을 배워야 한다. 배우는 데 시간이 걸리더라도 프론트엔득 어떻게 작동하는지 이해한다는 측면에서는 아깝지 않은 시간이다.
- React는 완전한 프레임워크가 아니며 고급 기능을 사용하려면 타사 라이브러리를 사용해야 한다. 핵심 프레임워크의 학습 곡선을 가파르게 만들지는 않지만 추가 기능을 사용하는 경로에 따라 달라진다.
- Vue는 higher한 사용자 정의 기능을 제공하므로 Angular 또는 React 보다 배우기 쉽다. 또한 Vue 는 구성 요소 사용과 같은 기능면에서 Angular, React와 중복된다. 따라서 둘 중 하나에서 Vue로 전환하는 것은 쉬운 옵션이다. 그러나 Vue의 단순성과 유연성은 양날의 검읻. 잘못된 코드를 허용하여 디버그 및 테스트를 어렵게 만든다.

## Angular vs React vs Vue: 누가 이기나요?

📌그렇다면 Angular vs React vs Vue 중 어느 것을 선택해야 할까?

📍**Angular** 는 가장 성숙한 프레임워크이며 contributor 측면에서 좋은 지원을 받고 있으며 완전한 패킹지이다. 그러나 학습 곡선이 가파르다. 또, TypeScript를 사용하는 대규모 팀과 개발자가 있는 회사에 적합하다.

📍**React**는 성숙하기에 가장 오래되었고 커뮤니티에서 엄청난 수의 기여를 했다. React의 시장은 정말 좋고 프레임워크의 미래는 밝다. React는 JavaScript 프레임워크를 시작하는 사람, 약간의 유연성을 원하는 스타트업 및 개발자에게 좋은 선택인 것 같다. 다른 프레임워크와 원활하게 통합할 수 있는 기능은 코드의 유연성을 원하는 사람들에게 큰 이점을 제공한다.

📍**Vue** 는 주요 회사의 지원 없이 가장 최근에 나온 것이다. 지난 몇 년간 Vue 3.0이 출시되면서, 강력한 경쟁자로 떠올랐다. 이것은 아마도 Alibaba 및 Baidu와 같은 많은 중국 거대 기업이 Vue를 주요 프론트엔드 JavaScript 프레임워크로 선택했기 때문일 것이다. 단순함을 선호하지만 유연성도 좋아한다면 Vue를 선택해야 한다.

Angular vs React vs Vue 의 논쟁에 대한 대답은 절대적으로 올바른 선택이 없다는 것이다. 각 라이브러이에는 고유의 장단점이 있다. 프로젝트와 개별 요구 사항에 따라 이 중 하나가 다른 것보다 적합할 것이다.

참고한 자료

https://www.codeinwp.com/blog/angular-vs-vue-vs-react/

해당 글의 원문은 2021년 3월 15일에 작성되었습니다.
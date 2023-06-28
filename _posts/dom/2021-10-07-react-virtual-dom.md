---
title: "react-virtual dom"
date: 2021-10-07
categories: dom
toc: true
toc_sticky: true
---

> We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%.
>
> 우리는 시간의 약 97%와 같이 작은 효율성을 잊어버려야 합니다. 조기 최적화는 모든 악의 근원입니다. 그러나 우리는 그 중요한 3%에서 우리의 기회를 놓치지 말아야 합니다.
>
> -Donald Knuth

# Performance Matters!

• **Pinterest**는 대기 시간을 40% 줄였을 때 검색 엔진 트래픽과 가입 수를 15% 늘렸습니다.

# Lecture Focus

## 성능 문제를 일으키는 원인

- 네트워크 이슈 : 페이지 부족, 느린 서버, 잘못된 프로토콜, huge assets, 캐싱, cdns 등
- DOM에 대한 과도한 액세스
- 레이아웃을 위한 CSS 재계산
- elements, events 및 CSS 규칙으로 DOM을 과도하게 부풀리기
- 메인 애플리케이션과 병렬로 실행되는 iFrame, 무거운 라이브러리 및 프로세스

## 우리가 집중할 대상

- React 이슈 : React 수명 주기의 느림

# React Terminology

![react](https://user-images.githubusercontent.com/53251100/136322683-6577e90a-495b-4a4a-aeac-5ef598aadd12.jpg)

- **React Component** : Virtual DOM의 특정 부분에 대한 반응 레시피
- **React Component Instance** : Virtual DOM의 특정 부분에서 React Element의 수명 주기를 담당하는 React Component의 인스턴스
- **React Element** : React.createElement(ReactComponent) 또는 이에 상응하는 JSX 버전<ReactComponent/>이 호출될 때 얻는 것

# Virtual DOM

React React 성능 문제를 처리한 후 Virtual DOM이 어떻게 작동하는지 더 잘 이해하기 위해 구성 요소 렌더링을 살펴보겠습니다.

![react1](https://user-images.githubusercontent.com/53251100/136329515-49c3499a-4927-46f9-b33f-29bb9e7a716d.jpg)

# Virtual DOM's Reconciliation

**"Increase Counter"를 클릭하면**

- 1단계: 모든 구성 요소를 다시 렌더링하여 가상 DOM의 새 "snapshot"을 계산한다.

![react2](https://user-images.githubusercontent.com/53251100/136329795-f16394d4-4392-4927-ae59-1a42c49b97be.jpg)

- 2단계: 변경 사항으로 Real DOM을 계산하고 업데이트한다.
- 3단계: 이러한 업데이트를 가장 효과적인 방법으로 Real DOM에 덤프한다.

# Virtual DOM's lifecycle

다음 코드는 자식 구성 요소의 수명 주기에 어떤 영향을 줍니까?

![react3](https://user-images.githubusercontent.com/53251100/136330165-2ba770e6-32a7-4855-ab9b-bf26a67dbcc7.jpg)

![react4](https://user-images.githubusercontent.com/53251100/136330311-8759fab5-4dc8-4ea4-a0c8-c4a945c1c6f9.jpg)

![react5](https://user-images.githubusercontent.com/53251100/136330350-6cd73527-20e1-4dbe-ba67-20527267bf30.jpg)

# Reconciliation Heuristics

여기에 잠재적으로 React anti-pattern이 있다. 그것을 찾을 수 있나요?

![heuristics](https://user-images.githubusercontent.com/53251100/136330599-3924555e-06b7-4f62-a9ef-b51b871974a1.jpg)

여기서 문제는 자식 구성 요소가 각 렌더에서 마운트 해제 및 다시 마운트된다는 것이다. 실제 세계에서 Ajax 요청과 같은 동작에 어떤 영향을 미칠 수 있는지 상상해보자.

![heuristics1](https://user-images.githubusercontent.com/53251100/136330622-4e9996b3-634d-4b2b-bc63-d8c48ac09918.jpg)

이는 React 구성 요소 인스턴스를 유지하기 위해 반응 구성 요소의 계층 구조 휴리스틱을 사용하기 때문이다.

![heuristics2](https://user-images.githubusercontent.com/53251100/136330832-3b0392a7-1830-46a0-a21d-6c16a945c8e1.jpg)

이러한 재렌더링 없이 어떻게 이 동작을 달성할 수 있나?

![heuristics3](https://user-images.githubusercontent.com/53251100/136330961-5ee2166f-8bf4-4cfc-9c43-7db4bcea1e93.jpg)

Virtual DOM의 계층 구조를 유지해야만 합니다. ([공식 React 문서](https://reactjs.org/docs/reconciliation.html#tradeoffs))

![heuristics4](https://user-images.githubusercontent.com/53251100/136331095-5fbc28ff-cb08-4fab-aacf-1c5547b38007.jpg)

# Side note : Re-Rendered되는 모든 방법

- **Create Element** - <ReactComponent/>  -React.createElement(ReactComponent)

  React 요소가 생성되면 (재)렌더링

- **Set State** - this.setState({ count:  0  })

  컴포넌트가 자신의 상태를 변경할 때

- **Force Update** - this.forceUpdate()

  컴포넌트가 자신의 상태를 변경할 때

- **React Hooks** 

  - **useState , useReducer** : hook의 값이 변경 될 때
  - **useContext** : Context의 값이 변경될 때

# Reconciliation Performance

다음과 같이 작성할 수 있도록 하자. event, style을 직접적으로 넣지 말고 따로 빼서 작성하도록 하자.

![per](https://user-images.githubusercontent.com/53251100/136337134-3b6ad7ce-e6db-4023-80f4-ba713de5b4b0.jpg)

![per1](https://user-images.githubusercontent.com/53251100/136337356-41e22c52-6687-4508-a1fa-83aae1c397ad.jpg)



# Performance Issues

pure components는 props 중 하나가 변경된 경우에만 다시 렌더링된다.

![per2](https://user-images.githubusercontent.com/53251100/136337826-cb14abc4-ebf5-4e60-a870-a840e92476a6.jpg)

**heavy calculations으로 무엇을 할 수 있나? Memoization of Derved Data**

- Reselect in Redux - createSelector (selectUsers, selectStats...)
- React Hooks - useMemo()
- Lodash - _.memoize()
- Mobx - @computed
- And many others

**Web Workders**

parallel  thread 에서 비동기식으로 계산

**Avoid Calculating**

- 서버에서 계산
- 데이터 구조 변경

![memo](https://user-images.githubusercontent.com/53251100/136338743-bc87b90b-eaec-4321-bc10-af4724902307.jpg)

**React 라이프사이클의 많은 작업**

- 계층 구조에서 변경 사항이 높은 경우
- 많은 상위 구성 요소
  - e.x - (withPropsOnChange(withHandlers(Connect(lifecycler(User)))))
- 구성 요소가 여러 번 다시 렌더링되는 경우
- 컴포넌트의 인스턴스가 많을 때
  - Long lists
  - Graphics
  - Complex UI
- 다음과 같은 비용이 많이 드는 작업
  - DOM에 직접 접근
  - React 요소 생성

# Heavy Operations

pure components는 props가 변경되는 경우에만 다시 렌더링된다. 일반 구성 요소는 React 요소를 다시 생성할 때 다시 렌더링된다.

![heavy](https://user-images.githubusercontent.com/53251100/136340173-b3633a53-5cc6-4037-94ef-450603e91cda.jpg)

# Pure Components

![pure](https://user-images.githubusercontent.com/53251100/136340286-fd0d5814-e05e-4de3-957a-4822fa0b2b2c.jpg)

- 이전 props와 항상 다른 props를 전달할 뿐 아니라 이것은 안티 패턴이다.
- 항상 다시 렌더링해야 하며, 다시 렌더링해야 하는지 테스트할 때 더 많은 처리 능력을 소모한다.
- 경우에 따라 이러한 구성 요소는 많은 props를 받고 애플리케이션 전체에서 사용된다.

![pure1](https://user-images.githubusercontent.com/53251100/136341101-a371490d-d88d-44fc-9665-0c7ddb7f2877.jpg)

# Huge Components

아래와 같이 한 파일에 다 집어넣지 말자.

![huge](https://user-images.githubusercontent.com/53251100/136341358-5b4695d5-5b14-4dc6-b73f-411f70c70178.jpg)

구성 요소를 더 작은 pure components로 나누면 해당 부분만 다시 렌더링된다.

![pure2](https://user-images.githubusercontent.com/53251100/136341832-21d875f9-4d19-420d-b9e3-b1b11b950182.jpg)

# Virtualized Lists

화면에 실제로 보이는 행만 렌더링하려면 가상 목록을 사용한다. 이 기술을 사용하면 수천 개의 행이 있는 목록을 표시할 수 있다.

# Conclusion

- 섣불리 최적화하지 말고 중요한 것에 집중
- 항상 렌더링해야 할 사항을 고려
- 웹 작업자에서 무거운 계산이나 메모를 피하게하기
- 구성 요소를 더 작은 pure components로 나눈다.
- 특정 목표를 위해 React 이외의 도구 사용을 고려
- React Virtualized와 같은 라이브러리에 이미 솔루션이 있는지 확인

# 참고한 자료들

[React Virtual DOM](chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/viewer.html?pdfurl=https%3A%2F%2Fcodevalue.com%2Fwp-content%2Fuploads%2F2020%2F04%2FAdvanced-React-Virtual-DOM-And-Performance-1.pdf&clen=2341627&chunk=true)

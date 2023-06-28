---
title: "Object-Oriented Analysis and Design: OOAD"
date: 2021-10-23
categories: etc
toc: true
toc_sticky: true
---

오늘은 OOAD에 대해 얘기해보자한다. OOAD는 소프트웨어를 개발하는 하나의 방법론이다. 해당 글은 공부하면서 필요한 부분만 정리한 글이다.

💡**Use Case, Sequence Diagram, Class Diagram 은 중요하며 해보면 좋다.**

# Part 1 소개

## Chapter 1. Object-Oriented Anaylsis and Design

- Object-Oriented Analysis (OOA) : 어떻게 구현하겠다 라는 추상적인 관점을 말한다. (동작이나 속성)
- Object-Oriented Design (OOD) : 프로그래밍적 요소까지 생가한 관점을 말한다. 소프트웨어 객체 정의, 요구 사항을 충족하기 위해 협업하는 방법 (시간순서의 동작이나 실제 구현해야할 코드)

### OOAD Example - Dice Game

<img width="909" src="https://user-images.githubusercontent.com/53251100/138558653-53bdfdd4-78bc-4618-94fe-9bab17fa1899.png">

위 그림은 주사위 게임을 OOA → OOD 순으로 설계한 것이다.

OOA의 Use case → Domain Model 을 거쳐 OOD의 interaction diagrams → design class diagrams 순으로 표현한 것이다.

### UML (통합 모델링 언어)

UML(Unified Modeling Language)은 소프트웨어 공학에서 사용되는 표준화된 범용 모델링 언어이다. **소프트웨어 시스템을 구조화하고 문서화하는 시각적 언어이다.** 즉, 시스템을 어떻게 개발할지를 나타낸 것이다.

UML을 적용하는 3가지 방법

- 스케치
- 청사진
- 프로그래밍 언어

### UML이 아닌 것은?

- UML은 객체 지향 분석 및 설계 프로세스가 아니다.

  -UML은 소프트웨어 시스템을 개발하는 체계적인 방법이 아니다.

- UML은 객체 지향 사고 방식이 아니다.

  -객체 구조 또는 동작을 설계하는 방법은 아니다.

  -디자인이 좋은지 나쁜지를 말하는 것 또한 아니다.

## Chapter 2. Iterative, Evolutionary, and Agile

### 소프트웨어 개발 프로세스 & UP

- 소프트웨어 개발 프로세스

  -소프트웨어 구축, 배포 및 유지 관리에 대한 체계적인 접근 방식

- UP (Unified Process) : 소프트웨어 개발 프로세스 객체 지향 시스템 구축

  -**설계부터 개발까지의 주기를 반복**해서 하는 것이다.

  -에자일 방식에서 영감을 얻었다. (폭포수 방식과 반대) 에자일 + 폭포 모델을 합친 것이다.

  -유연성 (다른 프로세스의 사례와 결합 가능)이 있지만, 규모가 큰 프로젝트는 프로세스를 너무 많이 돌리면 오히려 부담스럽다.

### Risk-Driven and Client-Driven Iterative Planning

- 폭포수 방식의 특징 : Risk-Driven. 잠재적인 소프트웨어 위험에 대응
- 에자일 방식의 특징 : Client-Driven. 사용자의 요구사항을 받아들임

### UP Phases

UP 프로젝트는 **4가지** 단계를 걸친다.

1. **Inception** : 대략적인 목표, 비즈니스 사례, 범위, 비용추정
2. **Elaboration** : 재정의된 목표, **반복적인 설계 수정**
3. **Construction** : 저위험의 반복구현(이 단계에서는 설계가 바뀌지 않는다), 배포 준비
4. **Transition** : 베타 테스트, 배포

<img width="649" src="https://user-images.githubusercontent.com/53251100/138562367-da21354e-473f-449b-9234-e7855fcb862a.png">

아래 그래프에서 보면,

- inception은 비즈니스 모델링을 위한 핵심적인 기능 정리
- elaboration은 high risk(핵심)한 기능을 만듦
- construction은 low risk한 기능을 만듦
- transition은 기능별로 테스트, ut(unit test) 가 중요

<img width="620" src="https://user-images.githubusercontent.com/53251100/138562744-17072efb-7902-43ce-893b-cd590704c378.png">

## Chapter 2-5 생략

# Part 2 Inception

## Chapter 6. Use Cases

### Use Case

Use cases는 목표를 달성하기위해 시스템을 사용하는 몇몇 요소의 텍스트 스토리이다.

- Example

**판매 프로세스** : 고객이 구매할 품목을 가지고 계산대에 도착한다. 계산원이 POS 시스템을 사용하여 구매한 각 항목을 기록한다. 시스템은 실행 총계 및 항목 세부정보 고객이 결제 정보를 입력하면 시스템이 확인하고 기록한다. 시스템이 인벤토리를 업데이트한다. 고객이 영수증을 받는다. 시스템에서 항목과 함께 떠난다.

- use case 는 다이어그램이 아니라 텍스트이다.

| use case section                    | comment                                                 |
| ----------------------------------- | ------------------------------------------------------- |
| Use case name                       | 동사로 시작                                             |
| scope                               | 설계중인 시스템                                         |
| Level                               | 사용자 목표 또는 하위 기능                              |
| Primary Actor                       | 서비스를 제공하기 위해 시스템을 호출                    |
| Stakeholders and Interests          | 누가 이 사용 사례에 관심을 갖고 있으며 무엇을 원하는가? |
| Preconditions                       | 무엇으로부터 시작할지, 무엇이 가치가 있나               |
| Success Guarantee                   | 무엇이 성공적인 결정인가                                |
| Main Success Scenario               | 성공적인 시나리오                                       |
| Extensions                          | 성공 또는 실패의 대체 시나리오                          |
| Special Requirements                | 기능과 관련없는 요구사항                                |
| Technology and data variations list | 다양한 I/O 방법 및 데이터 형식                          |
| Frequency of occurrence             | 조사, 테스트 및 구현 시기에 영향을 미침                 |
| Miscellaneous                       | 미해결 문제                                             |

### Use Case Diagram

Use case diagram은 use cases, 요소들의 이름 그리고 그 관계를 그린 것이다. **diagram을 하면 어떤 요소들에 의해 사용되는가, 어떤 기능이 필요한가를 파악할 수 있다.**

- use cases의 요약

<img width="756" src="https://user-images.githubusercontent.com/53251100/138563968-659a2c65-7a91-4f68-97da-2a65008e14a8.png">

### Use Cases는 기능적인 요구사항인가?

Use Cases는 기능적인 요구사항이다.

### 3가지 Use Case 형식

- **Brief** : 성공 시나리오
- **Casual** : 대안 시나리오
- **Full dressed** : 모든 단계를 텍스트로 표현

### Example : Process Sale, Fully Dressed Style

아래 이미지와 같이 작성하는 것은 중요하다. 일할 때도 편하지만, 사업자에게 공유하면서 다른 말이 나오지 않기 위함이기도 하다.

<img width="568" src="https://user-images.githubusercontent.com/53251100/138564449-1e98364d-afb5-4e55-aed7-40d438d024ea.png">

기능에 대해 자세하게 쓰지 말자. 그렇게 써놓는다면 나중에 꼭 이렇게 해야 하기 때문이다. 구체적인 사항은 나중에 하는 것이다. Use case에 쓰지 말자. 요구사항을 끄집어 내는 것이 포인트이다. 처음부터 구현을 어떻게 해야할지를 적는 것이 아니다.

| Fully Dressed  | Casual                 | Brief                |
| -------------- | ---------------------- | -------------------- |
| Process Sale   | Process Rental         | Cash In              |
| Handle Returns | Analyze Sales Activity | Cash Out             |
|                | Manage Security        | Manage Users         |
|                | ...                    | Start Up             |
|                |                        | Shut Down            |
|                |                        | Manage System Tables |

## Chapter 7-8 생략

# Part 3 Elaboration - Iteration 1 Basics

## Chapter 9. Domain Models

- 도메인 모델은 개념적 클래스 또는 현실 개체를 시각적으로 표현한 것이다.

  -객체지향 분석에서 가장 중요한 클래식 모델

  -소프트웨어 개체 및 클래스 디자인에 대한 영감의 원천으로 작용

  -소프트웨어 개체를 나타내지 않음

- 도메인 모델은 클래스 다이어그램으로 설명

  -도메인 객체

  -개념적 클래스 간의 연관

  -개념적인 클래스의 속성

💡**비개발자적인 생각이다. 소프트웨어적인 동작이 아니다.**

ex. 키보드를 누르면 글씨가 써진다.

### 청사진

<img width="667" src="https://user-images.githubusercontent.com/53251100/138564884-0aa0e9f6-3aeb-41af-9086-7d74543e9f89.png">

[맨 왼쪽은 주석이다 / 0..1 은 0개 아니면 1개 / 1..* 은 1개에서 몇개가 될지 모름]

### Domain Model을 만드는 이유는?

도메인 모델을 생성하는 2가지 이유 :

1. 무엇을 만드는지 간략히 알 수 있음
2. Domain Model을 구체화시키면 소프트웨어 다이어그램이 된다

### Domain Model을 어떻게 만드나?

Use Case 에서 명사로 추출하고 그걸로 정리

<img width="899" src="https://user-images.githubusercontent.com/53251100/138565198-1b080636-0702-47f5-99b8-f340dbc8c398.png">

## Chapter 10. System Sequence Diagram

### System Sequence Diagram

- 요소간 이벤트가 발생할 때 어떤 순서로 이루어지는지, 어떤 이벤트를 상세하게 나타내는 지를 각 use case마다 시퀀스 다이어그램으로 나타낸다.
- 시스템이 수행하는 방식이 아니라 작업의 관점에서 시스템 동작을 설명

### UML 적용 : 시퀀스 다이어그램

다이어그램 : 한눈에 볼 수 있어서 좋다. 약간의 소프트웨어적인 스텝은 보이나 소프트웨어 단계는 아니다. 어떤 요소가 어떻게 주는가를 보여준다.

<img width="706" src="https://user-images.githubusercontent.com/53251100/138565551-7527d60c-209c-44cc-b820-d0c7a69a9066.png">

## Chapter 13. Logical Architecture and UML Package Diagrams

### UML 적용: 패키지 다이어그램

UML 패키지 다이어그램은 종종 논리적 아키텍처를 설명하는 데 사용된다. 큰 박스는 패키지를 나타낸 것이다.

<img width="490" src="https://user-images.githubusercontent.com/53251100/138565786-5f4bfe23-7467-4f47-bdfd-6efbdb203ae2.png">

# 참고한 자료

[OOAD](http://dslab.konkuk.ac.kr/Class/2021/21SMA/Lecture%20Note/OOAD(2021).pdf)

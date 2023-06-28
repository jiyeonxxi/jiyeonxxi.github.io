---
title: "git commit message"
date: 2021-12-15
categories: git
toc: true
toc_sticky: true

---

# commit message란?

commit message는 HEAD에 어떤 변화가 반영이 되었는지 설명하는 글이다.

# 규칙에 맞는 좋은 커밋 메시지를 작성해야 하는 이유는?

- 기록을 추적할 때 편하기 위해
- 커뮤니케이션

# 커밋 메시지의 7가지 규칙

1. 제목과 본문을 빈 행으로 구분
2. 제목을 50글자 내로 제한
3. 제목 첫 글자는 대문자로 작성
4. 제목 끝에 마침표 넣지 않기
5. 제목은 명령문으로 사용하며 과거형은 사용하지 않기
6. 본문의 각 행은 72글자 내로 제한
7. 어떻게 보다는 **무엇**과 **왜**를 설명

# 커밋 메시지 구조

헤더는 필수이며, 범위(scope), 본문(body), 바닥글(footer)은 선택사항이다.

```
<type>: <subject>  //헤더
<BLANK LINE>
<body>             //본문
<BLANK LINE>
<footer>           //바닥글
```

# type

해당 커밋의 성격을 나타내며 아래 중 하나를 사용한다.

```
feat : 새로운 기능에 대한 커밋
fix : 버그 수정에 대한 커밋
build : 빌드 관련 파일 수정에 대한 커밋
chore : 그 외 자잘한 수정에 대한 커밋
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋
style : 코드 스타일 혹은 포맷 등에 관한 커밋
refactor :  코드 리팩토링에 대한 커밋
test : 테스트 코드 수정에 대한 커밋
```

# body

본문으로 헤더를 표현할 수 없는 상세한 내용을 적는다.
body도 적는 것이 친절한 커밋 메시지이다. (Source tree, github, etc)

# footer

바닥글로 어떤 이슈에서 왔는지 같은 참조 정보들을 추가하는 용도로 사용한다.
예를 들어 특정 이슈를 참조하려면 `close #221` 과 같이 추가하면 된다.
close는 이슈를 참조하면서 main브랜치로 푸시될 때 이슈를 닫게 된다.
관련 링크: https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue

# 참고한 자료들

https://beomseok95.tistory.com/328

[https://velog.io/@djh20/Git-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90](https://velog.io/@djh20/Git-제대로-사용해보자)

https://maeng2world.tistory.com/286?category=975386
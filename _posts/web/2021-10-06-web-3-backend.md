---
title: "web - 3.Backend Development"
date: 2021-10-05
categories: web
toc: true
toc_sticky: true
---

# Backend Development

## What is a Backend?

- All fo the awesome that runs your application.
- Web API
  - 프론트엔드와 백엔드 사이의 Layer Connection 은 API 호출을 통해 연결된다. (POST, GET, PUT, etc.)
- 일반적으로 백엔드에서 프론트엔드로 콘텐츠를 JSON BLOB에서 전송합니다.
- 모든 것을 구동하는 서비스 아키텍처 (모든 논리가있는 곳)

## What is a WebAPI ?

- 프론트엔드와 백엔드 시스템 사이의 중간층
- Third-party services 에서 소비될 경우 APIs 를 써야만 한다.
- 세부사항에 대한 details : 
  - How consumable is the API (signature, content negotiation)?
  - 표준을 준수 하는가? (Response codes, etc.) ?
  - 안전한가?
  - 여러 버전을 처리하는지?
  - Is it truly RESTful?

## Representational State Transfer (REST)

- Client-server
- Stateless
- Resource-based (vs. remote procedure call)
- HTTP methods (GET, POST, PUT, DELETE)
- Side Effects
- It's a style, not a standard
- Don't hate on HATEOAS

## WebAPI Terms

- GET - "read"
- POST - "insert"
- PUT - "replace"
- DELETE - "remove"
- PATCH - "update"
- Custom (proceed with caution)

## Web Status codes

- 200 : OK - things are great (return the item)
- 201 Created : after POST (HATEOAS - return location)
- 204 : No Content
- 400 : Bad Request (validation error, missing parms, etc.)
- 401 : Unauthorized
- 403 : Forbidden
- 404 : Not found

## Popular Tools

### Debelopment Tools : 

- Chrome/Firefox Developer Tools
- Postman (API)
- Dreamweaver
- Git / Source Tree

### Analytics Tools : 

- Google/Adobe Analytics

<img width="1234" alt="popular tools" src="https://user-images.githubusercontent.com/53251100/136034816-7fdefd17-3a2a-4a70-82fe-b263355a5ab8.png">

# 참고한 자료들

[Web Concept](https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.isip.piconepress.com%2Fcourses%2Ftemple%2Fece_3822%2Flectures%2F2016_fall%2Flecture_32.pptx&wdOrigin=BROWSELINK)

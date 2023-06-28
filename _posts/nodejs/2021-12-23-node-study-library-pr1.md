---
title: "node study - 도서관 프로젝트 1"
date: 2021-12-23
categories: nodejs
toc: true
toc_sticky: true
---

# 들어가기 전

본 프로젝트의 최종 목적지는 `도서관 프로젝트` 이다.

만들고자 하는 프로그램의 그림을 간단히 소개하자면, 메인에서 사용자와 admin을 선택하고, 그에 따른 화면을 보여줄 것이다.

- 사용자 화면에서는 회원가입 및 로그인부터 책 검색 및 책 빌리기, 반납하기, 책 목록, 대여한 책 목록 등을 보여주는 페이지를 보여주려 한다.
- Admin 화면에서는 로그인부터 가입한 회원 정보, 책 등록-수정-삭제 페이지를 보여주려 한다.
- 이후 추가되는 페이지들도 있으면 계속해서 추가할 예정이다.
- **MPA**(Multiple Page Application)으로 만들고, 이후 **SPA**(Single Page Application) 으로도 만들어볼 예정이다.

# 설치 및 세팅

## 1. node

https://nodejs.org/ko/download/

자신의 컴퓨터에 맞는 node를 설치한다.

설치가 완료되면, 설치가 잘 되었는지 확인한다.

```objective-c
node -v
```

## 2. package.json 

애플리케이션을 보관할 디렉토리를 작성하고 그 디렉토리를 작업 디렉토리로 설정한다.

```objective-c
mkdir node-lib
cd node-lib
```

npm init 명령어를 이용하여 애플리케이션에 대한 package.json 파일을 작성한다.

```objective-c
npm init
```

이 명령을 실행하면 애플리케이션의 이름 및 버전과 같은 몇 가지 정보에 대해 프롬프트한다. 지금은 다음의 항목을 제외한 대부분의 항목에서 ENTER 키를 눌러 기본값을 수락할 수 있다. (적고 싶은 내용은 적어도 좋다.)

<img width="289" src="https://user-images.githubusercontent.com/53251100/145789318-7da11de5-3f09-4f86-9905-8fdc9b763c8f.png">

다 적고 나면 package.json 파일이 생성된다. entry point는 기본 파일의 이름을 말한다. 따로 적지 않으면 기본 index.js 로 설정되며 하고싶은 이름으로 설정하면 된다. (평소 app.js 로 사용하여 app.js로 설정했다.)

## 3. 모듈 설치

```objective-c
npm install <모듈 이름>
```

이제 `node-lib` 디렉토리에 `Express` 를 설치한 후 종속 항목 목록에 저장한다. 종속 항목으로 추가하지 않으려면, --save 옵션은 생략해도 된다.

```objective-c
npm install express --save
```

설치가 완료되면, package-lock.json 파일과 node_modules 폴더가 생성된다.

**express : 웹프레임워크**

## 4. Hello world 예제

`node-lib` 디렉토리에 `index.js(app.js)` 파일을 작성한 후 다음 코드를 추가한다.

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

앱은 서버를 시작하며 3000번 포트에서 연결을 청취한다. 앱은 루트 URL(`/`) 또는 *라우트*에 대한 요청에 “Hello World!”로 응답한다. 다른 모든 경로에 대해서는 **404 Not Found**로 응답한다.

다음의 명령을 이용하여 앱을 실행한다.

```objective-c
node app.js
```

이후 브라우저에서 http://localhost:3000/을 로드하여 결과물을 확인할 수 있다.

## 5. MongoDB 연동(Mongoose를 통해)

### 5-1. 패키지 설치

1. body-parser : 데이터 처리 미들웨어
2. mongoose : MongoDB 연동 라이브러리

```objective-c
npm install --save mongoose body-parser
```

### 5-2. 서버 설정하기

#### 5-2-1. 디렉토리 구조

```
- models/
----- book.js
- node_modules/
- server_mongodb/
----- mongodb.js
- routes
----- index.js
- app.js
- package.json
```

#### 5-2-2. Exress 로 이용한 웹서버 생성

mongoose를 사용하기 위해 book 데이터를 조회·수정·삭제 하는간단한 [RESTful 웹서버](https://velopert.com/332)를 작성해보자.

이 서버에 만들 API 목록은 다음과 같다.

| ROUTE                     | METHOD | DESCRIPTION               |
| ------------------------- | ------ | ------------------------- |
| /api/books                | GET    | 모든 book 데이터 조회     |
| /api/books/:book_id       | GET    | _id 값으로 데이터 조회    |
| /api/books/author/:author | GET    | author 값으로 데이터 조회 |
| /api/books                | POST   | book 데이터 생성          |
| /api/books/:book_id       | PUT    | book 데이터 수정          |
| /api/books/:book_id       | DELETE | Book 데이터 제거          |

서버의 메인 파일인 **app.js** 에 작성한다.

```javascript
//app.js
// [LOAD PACKAGES]
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server_mongodb = require('./server_mongodb/mongodb');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

**Server_mongodb / mongodb.js**

```javascript
module.exports = function() {
  
    const mongoose = require('mongoose');
    const db = mongoose.connection; //mongoose랑 db연결

    db.on('error', function() {
        console.log('Connected failed');
    });
    db.once('open', function() {
        console.log('Connected to mongooed server');
    });
    mongoose.connect('mongodb://localhost/mongodb_tutorial');
};
```

**routes / index.js**

```javascript
module.exports = function() {
    app.get('/', function (req, res) {
        res.render('main.ejs'); //.ejs 생략가능
      });
};
```

## 6. Schema & Model

### 6-1. schema

schema는 document의 구조가 어떻게 생겼는지 알려주는 역할이다.

schema를 만드는 방법은 다음과 같다. 아래 코드를 **models/book.js** 에 입력한다.

```javascript
//book 에서 쓰이는 내용의 type 지정
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: String,
    author: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('book', bookSchema);
//bookSchema 라는 것을 정의했잖아
//이거를 book 이라는 거에 넣겠다는 거지
//mongodb에 몽구즈를 활용행서 우리가 정의한 bookSchema를 book 이라는 거로 쓰겠다 이 모델에서
```

schema에서 사용되는 SchemaType은 총 8종류가 있습니다.

1. String
2. Number
3. Date
4. Buffer
5. Boolean
6. Mixed
7. Objectid
8. Array

이를 사용하는 예제는 [메뉴얼](https://mongoosejs.com/docs/schematypes.html)을 참고.

### 6-2. model

model은 데이터베이스에서 데이터를 읽고, 생성하고, 수정하는 프로그래밍 인터페이스를 정의한다.

```javascript
// DEFINE MODEL
const Book = mongoose.model('book', bookSchema);
```

첫번째 인자 book’ 은 해당 document가 사용 할 collection의 단수적 표현이다. 즉, 이 모델에서는 ‘books’ collection 을 사용하게 된다. 이렇게 자동으로 단수적 표현을 복수적(plural) 형태로 변환하여 그걸 collection 이름으로 사용한다. collection 이름을 plural 형태로 사용하는건 mongodb의 네이밍컨벤션 중 하나이다.

만약에, collection 이름을 임의로 정하고 싶다면, schema 를 만들 때 따로 설정해야 한다.

```javascript
const dataSchema = new Schema({..}, { collection: 'COLLECTION_NAME' });
```

**app.js**에서 이 모듈을 불러와보자.

```javascript
//app.js
// ....

// define MODEL
const Book = require('./models/book');
// ...
```

## 7. ejs

HTML 파일을 이용하여 Web 페이지를 표시하려면 `템플릿 엔진`을 사용하면 편리하다. EJS 라는 템플릿 엔진의 기본적인 사용법에 대해 간략히 설명하려한다.

### 7-1. npm으로 ejs 설치

HTML 파일을 읽어 들여 표시하려고 했으나, 생각보다 귀찮은 작업이다. 파일을 읽어들이는데 비동기 메소드를 사용하지 않으면 안되고, 약간의 데이터를 HTML로 주고 받아 표시하는 것도 일일이 replace으로 코드를 바꿔야한다. 더 쉬운 방법은 없는가? 라고 생각했을 것이다.

물론 있다. 그것은 `템플릿 엔진`을 사용하는 것이다. Node.js는 다양한 템플릿 엔진을 사용할 수 있다. 가장 일반적으로 이용되고 있는 것은 `EJS`라는 것이다.

그럼 EJS을 설치해 보자. Node.js에는 `npm`라는 패키지 관리 프로그램이 준비되어 있다. 이것을 사용하면 명령어 한방에 필요한 라이브러리를 온라인을 통해 다운로드 설치할 수 있다.

```objective-c
npm install ejs
```

**app.js** 에 추가

```javascript
//app.js
app.set("view engine", "ejs");
```

## 8. process.env.PORT in Node.js?

```javascript
var port = process.env.PORT || 8080;
```

환경 변수 PORT 에 있는 것이 무엇이든 || 거기에 아무것도 없으면 8080포트 사용

# 참고한 자료들

[Express tutorial](https://expressjs.com/ko/)

[Specifics of npm's package.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

[Express와 Mongoose를 통해 MongoDB와 연동하여 RESTful API 만들기 : velopert](https://velopert.com/594)

[Schema Types](https://mongoosejs.com/docs/schematypes.html)

[Express api](https://expressjs.com/ko/api.html#res.render)

[npm ejs](https://www.npmjs.com/package/ejs)

[GitHub - ejs](https://github.com/tj/ejs)

[ejs 에 의해 템플릿 표시](https://araikuma.tistory.com/454)

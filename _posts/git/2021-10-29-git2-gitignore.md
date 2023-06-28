---
title: "git2 - gitignore"
date: 2021-10-29
categories: git
toc: true
toc_sticky: true
---

# gitignore 이란?

> 프로젝트 작업시 로컬 환경의 정보나 빌드 정보 등 저장소에 관리하지 말아야되는 파일들에 대해서 지정하여 원격 저장소에 실수로 올라가지 않도록 관리하는 파일
>
> 정의한 정보들에 해당하는 파일들에 대하여 git track 하지 않도록 설정하는 역할을 한다.

- 다양한 환경에서의 샘플 gitignore는 https://github.com/github/gitignore 에서 확인할 수 있다.

# 왜 gitignore을 사용하는가?

프로젝트에서 관리가 필요하지 않은 파일에 대해서 git에서 추적하지 않게 제외시키기 위해 gitignore 파일을 이용하여 관리를 하려고 하는 것이다.

# .gitignore 파일 생성

- .gitignore 파일은 프로젝트 최상위 위치에 존재해야 한다.
- 아래의 패턴을 활용하여 git이 untracked 할 파일 또는 디렉토리 등을 정의하여 팡리을 생성한다.

## 패턴

작성 패턴은 아래의 규칙을 따른다.

- `#` 은 comment 이다.
- 표준 glob 패턴을 사용한다.
- 슬래시(/)로 시작하면 하위 디렉토리에 적용되지 않는다.
- 디렉토리는 슬래시(/)를 끝에 사용하는 것으로 표현한다.
- 느낌표(!)로 시작하는 패턴의 파일은 무시하지 않는다.

## example 1

```
# ignore all .class files
*.class
  
# exclude lib.class from "*.class", meaning all lib.class are still tracked
!lib.class
 
# ignore all json files whose name begin with 'temp-'
temp-*.json
  
# only ignore the build.log file incurrent directory, not those in its subdirectories
/build.log
  
# specify a folder with slash in the end
# ignore all files in any directory named temp
temp/
  
# ignore doc/notes.txt, but not doc/server/arch.txt
bin/*.txt

# ignore all .pdf files in the doc/ directory and any of its subdirectories
# /** matches 0 or more directories
doc/**/*.pdf
```

<img width="340" src="https://user-images.githubusercontent.com/53251100/139384599-202cfc33-ec15-4842-9c27-6c20cb209a55.png">

## example 2

.log로 시작하는 모든 파일을 추가하고 싶지 않다면 아래와 같이 하면 된다.

```objective-c
echo *.log > .gitignore
```

## example 3

⚠️ `create-react-app` 툴을 이용하게 되면 .gitignore가 자동으로 생성된다. 아래는 `create-react-app` 에서 제공하는 내용이다.

```objective-c
# dependencies
/node_modules
/.pnp
/.pnp.js

# testing
/coverage

# production
/build

# API KEYs
.env
```

위 코드에서 dependencies에 관련된 파일들(/node_modules /.pnp /.pnp.js)은 트래킹하지 말고

/build 할 때 발생하는 것도 트래킹하며 안된다. 와 같은 내용을 볼  수 있다.

# git status -h

함께 실행할 수 있는 모든 옵션들에 대해서 확인해볼 수 있다. 옵션을 쓰지 않으면 --long 이 default 값으로 보여진다. -s 는 간단하게 볼 때 이용한다.

```objective-c
git status -h
git status -s
```

파일의 내용을 좀 더 자세히 보고 싶을 때는

```objective-c
git diff
```

vscode로 Lauch 할 때

```objective-c
git difftool
```

⚠️ 터미널에서 Windows 라면 ctrl + k, Mac 이라면 command + k 누르면 터미널이 깨끗해진다.

# git commit

history를 자세하게 확인하려면

```objective-c
git log
```

전부 다 all commit 할 때

```objective-c
git commit -am "코멘터리"
```

# 간단히 .gitignore 파일 생성

[Ignore 파일 생성](https://www.toptal.com/developers/gitignore) 을 이용하여 원하는 ignore 파일을 생성할 수 있다.

# 참고한 자료

[드림코딩 by 엘리](https://www.youtube.com/watch?v=Z9dvM7qgN9s&t=544s)

[Ignore 파일 생성](https://www.toptal.com/developers/gitignore)
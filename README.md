# Nestjs RESTful API sample
## 개요
Nestjs RESTful api sample code
src> domain 폴더로 구분하며 controller, service, repository 레이어를 구분하여 설계.
* 상호 의존 관계 : controller → service → respository 
* 각 레이어는 의존은 하되 상호 무관심하게 코딩해야 함!
```
.
├── Dockerfile
├── README.md
├── docker-compose.yml
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── filter
│   │   └── http.exception.filter.ts
│   ├── interceptor
│   │   └── trace.id.interceptor.ts
│   ├── logger
│   │   └── logger.service.ts
│   ├── main.ts
│   └── user
│       ├── dto
│       │   ├── create.user.dto.ts
│       │   └── update.user.dto.ts
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.repository.ts
│       └── user.service.ts
├── test
│   └── user
│       └── user.controller.spec.ts
├── tsconfig.build.json
└── tsconfig.json
```
## 기능
- 요청 당 x-trace-id 발급
  * Response headers
    ```header
    connection: keep-alive 
    content-length: 0 
    date: Thu,05 Dec 2024 03:53:12 GMT 
    keep-alive: timeout=5 
    location: /user/string 
    x-powered-by: Express 
    x-trace-id: ea36fa59-fac3-4894-8bcb-04d1f24d73d2 
    ```
- api versioning 추가
- 공통 에러 응답코드 적용
  ```json
  {
    "code": 404,
    "timestamp": "2024-12-01T01:03:50.098Z",
    "path": "/v1/users",
    "method": "POST",
    "message": "not found"
  }
  ```
## Sample endpoints
|feature|endpoint|method|http status code|description|
|---|---|---|---|---|
|유저 추가|/v1/user|POST|201 or 400|201 → location header|
|유저 수정|/v1/user|PUT|200||
|유저 조회|/v1/user/\{userid}|GET|200||
|유저 삭제|/v1/user/\{userid}|DELETE|204||

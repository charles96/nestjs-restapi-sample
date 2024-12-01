# Nestjs RESTful API sample
## 개요
Nestjs RESTful api sample code
```
.
├── app.module.ts
├── filter
│   └── http.exception.filter.ts
├── interceptor
│   └── trace.id.interceptor.ts
├── logger
│   └── logger.service.ts
├── main.ts
└── user
    ├── dto
    │   ├── create.user.dto.ts
    │   └── update.user.dto.ts
    ├── user.controller.ts
    ├── user.module.ts
    ├── user.repository.ts
    ├── user.service.ts
    └── user.swagger.ts
```
## 기능
- 요청 당 x-trace-id 발급 
- api versioning 추가
## Sample endpoints
|feature|endpoint|method|http status code|description|
|---|---|---|---|---|
|유저 추가|/v1/user|POST|201 or 400|201 → location header|
|유저 수정|/v1/user|PUT|200||
|유저 조회|/v1/user/\{userid}|GET|200||
|유저 삭제|/v1/user/\{userid}|DELETE|204||

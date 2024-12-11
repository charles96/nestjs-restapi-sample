# Nestjs RESTful API sample
## 개요
Nestjs RESTful api sample code
* src> domain 단위 폴더
* controller, service, repository 레이어
* 각 레이어는 상호 무관심하게 코딩해야 함!
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
## 기능 적용 사항
### x-trace-id 추적 코드 적용
  ``` Request Header
  curl -X 'POST' \
  'http://localhost:3000/v1/users' \
  -H 'accept: */*' \
  -H 'x-trace-id: 4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3' \
  -H 'Content-Type: application/json' \
  -d '{
  "user_id": "string",
  "user_name": "string",
  "email": "string"
  }'
  ```
  ```Response headers
  connection: keep-alive 
  content-length: 0 
  date: Wed,11 Dec 2024 03:04:39 GMT 
  keep-alive: timeout=5 
  location: /user/string 
  x-powered-by: Express 
  x-trace-id: 4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3 
  ```
### api versioning 추가
  ```typescript
  @ApiTags('User')
  @Controller({path:'users', version: '1'})
  export class UserController { }
  ...

  @Post()
  @Version('2')  //메소드 버저닝
  @HttpCode(201)
  ```
### 공통 에러 응답코드 적용
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

# Nestjs RESTful API sample
## Overview
nestjs RESTful api boilerplate code
## endpoints
|feature|endpoint|method|http status code|description|
|---|---|---|---|---|
|유저 추가|/v1/user|POST|201 or 400|201 → location header|
|유저 수정|/v1/user|PUT|200||
|유저 조회|/v1/user/\{userid}|GET|200||
|유저 삭제|/v1/user/\{userid}|DELETE|204||
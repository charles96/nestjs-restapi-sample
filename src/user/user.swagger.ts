import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint, ApiOperation, ApiBody, ApiHeader, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

export function UserControllerSwagger() {
    return applyDecorators(
        ApiTags('User')
    );
}

export function CreateUserSwagger() {
  return applyDecorators(
    ApiTags('User'),
    ApiOperation({ summary: '유저 생성', description: '유저 정보를 등록한다' }),
    ApiBody({ required: true, type: CreateUserDto, description: '유저 정보' }),
    ApiHeader({
      name: 'x-trace-id',
      description: '요청 추적 ID',
      required: false,
      schema: {
        type: 'string',
        example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
      }
    }),
    ApiResponse({ 
      status: 201, 
      description: '유저 생성 성공',
      headers: {
        Location: {
          description: '생성된 유저 접근 URL',
          schema: {
            type: 'string',
            example: '/user/{user_id}'
          }
        },
        'x-trace-id': {
          description: '요청 추적 ID',
          schema: {
            type: 'string',
            example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
          }
        }
      }
    })
  );
}

export function GetUserInfoSwagger() {
    return applyDecorators(
        ApiOperation({ summary: '유저 검색', description: '유저 정보 검색' }),
        ApiHeader({
          name: 'x-trace-id',
          description: '요청 추적 ID',
          required: false,
          schema: {
            type: 'string',
            example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
          }
        }),
        ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' }),
        ApiResponse({ 
          status: 200, 
          description: '유저 정보 검색 성공',
          headers: {
            'x-trace-id': {
              description: '요청 추적 ID',
              schema: {
                type: 'string',
                example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
              }
            }
        }
        })
    );
}

export function UpdateUserInfoSwagger() {
    return applyDecorators(
        ApiOperation({ summary: '유저 수정', description: '유저 정보 수정' }),
        ApiHeader({
          name: 'x-trace-id',
          description: '요청 추적 ID',
          required: false,
          schema: {
            type: 'string',
            example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
          }
        }),
        ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' }),
        ApiBody({ required: true, type: UpdateUserDto, description: '변경할 유저 정보' }),
        ApiResponse({ 
          status: 201, 
          description: '유저 정보 수정 성공',
          headers: {
            'x-trace-id': {
              description: '요청 추적 ID',
              schema: {
                type: 'string',
                example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
              }
            }
          }
        })
    );
}

export function DeleteUserInfoSwagger() {
    return applyDecorators(
        ApiOperation({ summary: '유저 삭제', description: '유저 정보를 삭제한다' }),
        ApiHeader({
          name: 'x-trace-id',
          description: '요청 추적 ID',
          required: false,
          schema: {
            type: 'string',
            example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
          }
        }),
        ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' }),
        ApiResponse({ 
          status: 204, 
          description: '유저 삭제 성공',
          headers: {
            'x-trace-id': {
              description: '요청 추적 ID',
              schema: {
                type: 'string',
                example: '4f535ba4-1e2c-45ba-a7f6-16bd0ebe6ec3'
              }
            }
          }
        })
    );
}

export function HealthCheckSwagger(){
    return applyDecorators(
        ApiExcludeEndpoint()
    );
}
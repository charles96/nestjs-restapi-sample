import { Request, Body, Controller, HttpStatus, Res, Version, Delete, Get, NotFoundException, Param, Post, Patch, Query, Put, HttpCode, Header, Logger, LogLevel } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express'; 
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { version } from 'os';

@ApiTags('User')
@Controller({path:'users', version: '1'})
export class UserController {
  private readonly logger = new Logger(UserController.name); // Logger 인스턴스 생성

  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: '유저 생성', description: '유저 정보를 등록한다' })
  @ApiBody({ required: true, type: CreateUserDto, description: '유저 정보' })
  @ApiResponse({ 
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
  async createUser(
    @Request() req : any,
    @Body() createUserDto : CreateUserDto,
    @Res() res: Response
  ): Promise<void> {
    const traceId = (req as any).traceId;    
    this.logger.debug(`[${this.createUser.name}][${traceId}]`);

    throw new NotFoundException('not found');
    const result = this.userService.createUser(createUserDto);
    res
      .header('Location', `/user/${result}`)
      .status(HttpStatus.CREATED)
      .end();
  }

  @Get(':userId')
  @HttpCode(200)
  @ApiOperation({ summary: '유저 검색', description: '유저 정보 검색' })
  @ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' })
  @ApiResponse({ 
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
  getUserInfo(
    @Request() req : any,
    @Param('userId') user_id : string,
    @Res() res: Response
  ): void {
    const traceId = (req as any).traceId;    
    this.logger.debug(`[${this.getUserInfo.name}][${traceId}]`);

    const result = this.userService.getUserInfo(user_id);
    res.status(HttpStatus.OK)
      .json(result);
  }

  @Put(':userId')
  @HttpCode(201)
  @ApiOperation({ summary: '유저 수정', description: '유저 정보 수정' })
  @ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' })
  @ApiBody({ required: true, type: UpdateUserDto, description: '변경할 유저 정보' })
  @ApiResponse({ 
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
  async updateUserInfo(
    @Request() req : any,
    @Param('userId') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response 
  ): Promise<void> {
    const traceId = (req as any).traceId;    
    this.logger.debug(`[${this.updateUserInfo.name}][${traceId}]`);

    //await this.userService.updateUserInfo(user_id, updateUserDto);
    res.status(HttpStatus.CREATED)
      .send();
  }

  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({ summary: '유저 삭제', description: '유저 정보를 삭제한다' })
  @ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' })
  @ApiResponse({ 
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
  async deleteUserInfo(
    @Request() req : any,
    @Param('userId') user_id : string,
    @Res() res: Response
  ): Promise<void> {
    const traceId = (req as any).traceId;    
    this.logger.debug(`[${this.deleteUserInfo.name}][${traceId}]`);

    await this.userService.deleteUserInfo(user_id);
    res.status(HttpStatus.NO_CONTENT)
      .send();
  }

  @Get()
  @HttpCode(200)
  @ApiExcludeEndpoint()
  async healthCheck(
    @Res() res: Response
  ): Promise<void> {
  }
}
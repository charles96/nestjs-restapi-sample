import { Headers, Request, Body, Controller, HttpStatus, Res, Delete, Get, NotFoundException, Param, Post, Patch, Query, Put, HttpCode, Header, Logger, LogLevel } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CreateUserSwagger, GetUserInfoSwagger, UpdateUserInfoSwagger, DeleteUserInfoSwagger } from './user.swagger';
import { Response } from 'express'; 
import { BaseController } from 'src/base.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('User')
@Controller({path:'users', version: '1'})
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  @HttpCode(201)
  @CreateUserSwagger()
  async createUser(
    @Request() req : any,
    @Body() createUserDto : CreateUserDto,
    @Res() res: Response,
    @Headers('x-trace-id') traceId?: string 
  ): Promise<void> {
    traceId = this.setTraceId(req, traceId);
    this.logger.debug(`[${this.createUser.name}][${traceId}]`);
    
    const result = this.userService.createUser(createUserDto);
    res
      .header('Location', `/user/${result}`)
      .status(HttpStatus.CREATED)
      .end();
  }

  @Get(':userId')
  @HttpCode(200)
  @GetUserInfoSwagger()
  async getUserInfo(
    @Request() req : any,
    @Param('userId') user_id : string,
    @Res() res: Response,
    @Headers('x-trace-id') traceId?: string 
  ): Promise<void> {
    traceId = this.setTraceId(req, traceId);
    this.logger.debug(`[${this.getUserInfo.name}][${traceId}]`);

    const result = this.userService.getUserInfo(user_id);
    res.status(HttpStatus.OK)
      .json(result);
  }

  @Put(':userId')
  @HttpCode(201)
  @UpdateUserInfoSwagger()
  async updateUserInfo(
    @Request() req : any,
    @Param('userId') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
    @Headers('x-trace-id') traceId?: string 
  ): Promise<void> {
    traceId = this.setTraceId(req, traceId);
    this.logger.debug(`[${this.updateUserInfo.name}][${traceId}]`);

    //await this.userService.updateUserInfo(user_id, updateUserDto);
    res.status(HttpStatus.CREATED)
      .send();
  }

  @Delete(':userId')
  @HttpCode(204)
  @DeleteUserInfoSwagger()
  async deleteUserInfo(
    @Request() req : any,
    @Param('userId') user_id : string,
    @Res() res: Response,
    @Headers('x-trace-id') traceId?: string 
  ): Promise<void> {
    traceId = this.setTraceId(req, traceId);
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
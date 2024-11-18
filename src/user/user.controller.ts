import { Body, Controller, HttpStatus, Res, Delete, Get, NotFoundException, Param, Post, Patch, Query, Put, HttpCode, Header, Logger, LogLevel } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiBody, ApiParam, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express'; 
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: '유저 생성', description: '유저 정보를 등록한다' })
    @ApiBody({ required: true, type: CreateUserDto, description: '유저 정보' })
    async createUser(
        @Body() createUserDto : CreateUserDto,
        @Res() res: any
    ): Promise<void> {
        const result = this.userService.createUser(createUserDto);
        res.header('Location', `/user/${result}`).end();
    }

    @Get(':userId')
    @HttpCode(200)
    @ApiOperation({ summary: '유저 검색', description: '유저 정보 검색' })
    @ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' })
    getUserInfo(
        @Param('userId') user_id : string,
    ): string {
        return this.userService.getUserInfo(user_id);
    }

    @Put(':userId')
    @ApiOperation({ summary: '유저 수정', description: '유저 정보 수정' })
    @ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' })
    @ApiBody({ required: true, type: UpdateUserDto, description: '변경할 유저 정보' })
    async updateUserInfo(
        @Param('userId') user_id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Res() res: Response 
    ): Promise<void> {
        res.status(HttpStatus.CREATED).send();
    }

    @Delete(':userId')
    @HttpCode(204)
    @ApiOperation({ summary: '유저 삭제', description: '유저 정보를 삭제한다' })
    @ApiParam({ name: 'userId', required: true, type: String, description: '유저 아이디' })
    async deleteUserInfo(
      @Param('userId') user_id : string
    ): Promise<void> {
      //return await this.roomService.deleteRoomInfoByRoomId(room_id);
    }

    @Get()
    @HttpCode(200)
    @ApiExcludeEndpoint()
    async healthCheck(
    ): Promise<void> {

    }
}
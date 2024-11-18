import { IsString, IsNotEmpty, IsDate, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({ description: '유저 아이디'})
    @IsString()
    @IsNotEmpty()
    user_id: string;
    
    @ApiProperty({ description: '유저 이름' })
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ description: '이메일'})
    @IsString()
    @IsNotEmpty()
    email: string;
}
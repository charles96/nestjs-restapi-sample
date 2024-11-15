import { IsString, IsNotEmpty, IsDate, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//룸 아이디, 룸 생성한 사람, 룸 이름, 룸 생성시간

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
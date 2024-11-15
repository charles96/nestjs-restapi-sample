import { IsString, IsNotEmpty, IsDate, IsInt, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    
    @ApiProperty({ description: '유저 이름' })
    @IsString()
    @IsNotEmpty()
    user_name: string;

    @ApiProperty({ description: '이메일'})
    @IsString()
    @IsNotEmpty()
    email: string;
}
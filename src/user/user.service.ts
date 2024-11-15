import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    createUser(createUserDto: CreateUserDto,): string {
        return this.userRepository.createUser(createUserDto);
    }

    getUserInfo(user_id: string) {
        return this.userRepository.getUserInfo(user_id);
    }

    deleteUserInfo(user_id: string) {
        return this.userRepository.deleteUserInfo(user_id);
    }
}
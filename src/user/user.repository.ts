import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserRepository {

    createUser(createUserDto : CreateUserDto){
        return createUserDto.user_id;
    }

    getUserInfo(user_id: string): string {
        return 'Hello World!';
    }

    deleteUserInfo(user_id: string) {
    }
}
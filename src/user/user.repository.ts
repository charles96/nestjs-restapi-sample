import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    getUser(): string {
        return 'Hello World!';
    }
}
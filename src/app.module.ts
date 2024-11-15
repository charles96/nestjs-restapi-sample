import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule]
})
export class AppModule {}

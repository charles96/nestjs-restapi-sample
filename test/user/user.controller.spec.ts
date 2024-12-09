import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { UserController } from '../../src/user/user.controller';
import { UserService } from "../../src/user/user.service";
import { UserRepository } from "../../src/user/user.repository";
import { CreateUserDto } from '../../src/user/dto/create.user.dto'; 

describe('CatsController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  describe('getUserInfo', () => {
    it('should return user info', async () => {
      const userId = '123';
      jest.spyOn(userService, 'getUserInfo').mockImplementation(() => 'Hello World!');

      const result = await userController.getUserInfo({ traceId: 'trace-id' }, userId, {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any);

      expect(result).toBeUndefined();
      expect(userService.getUserInfo).toHaveBeenCalledWith(userId);
    });
  });

  describe('deleteUserInfo', () => {
    it('should delete a user', async () => {
      const userId = '123';
      jest.spyOn(userService, 'deleteUserInfo').mockImplementation(() => Promise.resolve());

      const result = await userController.deleteUserInfo({ traceId: 'trace-id' }, userId, {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any);

      expect(result).toBeUndefined();
      expect(userService.deleteUserInfo).toHaveBeenCalledWith(userId);
    });
  });
});

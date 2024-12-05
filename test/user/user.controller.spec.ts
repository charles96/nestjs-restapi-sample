import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { UserService } from "../../src/user/user.service";
import { UserRepository } from "../../src/user/user.repository";
import { CreateUserDto } from '../../src/user/dto/create.user.dto';
}
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

  describe('createUser', () => {
    it('should create a user and return the user id', async () => {
      const createUserDto: CreateUserDto = { user_id: '123', user_name: 'Test User', email: 'ddd@dd.com' };
      jest.spyOn(userService, 'createUser').mockImplementation(() => '123');

      const result = await userController.createUser({ traceId: 'trace-id' }, createUserDto, {
        header: jest.fn(),
        status: jest.fn().mockReturnThis(),
        end: jest.fn(),
      } as any);

      expect(result).toBeUndefined();
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
  
  describe('getUserInfo', () => {
    it('should return user info', () => {
      const userId = '123';
      jest.spyOn(userService, 'getUserInfo').mockImplementation(() => 'Hello World!');

      const result = userController.getUserInfo({ traceId: 'trace-id' }, userId, {
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

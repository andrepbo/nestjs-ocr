import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService;
  const userMock: User = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('UsersService', () => {
    it('should be defined', () => {
      expect(usersService).toBeDefined();
    });
  });

  it('findAll method should return an array of users', async () => {
    jest.spyOn(usersService, 'findAll').mockResolvedValueOnce([userMock]);
    expect(await userController.findAll()).toEqual([userMock]);
  });
});

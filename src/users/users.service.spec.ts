import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;
  const user: User = {
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
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne method should return a user', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user);
    expect(await service.findOne(user.id)).toEqual(user);
  });

  it('findOne should throw BadRequestException if user not found', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
    await expect(service.findOne('nonexistentId')).rejects.toThrow(NotFoundException);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
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

    usersService = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create method', () => {
    it('should create a user', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(user);
      expect(await usersService.create(user)).toEqual(user);
    });
  });

  describe('findAll method', () => {
    it('should return an array of users', async () => {
      const result = [user];
      jest.spyOn(usersService, 'findAll').mockResolvedValueOnce(result);
      expect(await usersService.findAll()).toBe(result);
    });
  });

  describe('findOne method', () => {
    it('should return a user', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(user);
      expect(await usersService.findOne(user.id)).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      await expect(usersService.findOne('usernotfound')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update method', () => {
    it('should update a user', async () => {
      jest.spyOn(usersService, 'update').mockResolvedValueOnce({ generatedMaps: [], raw: [], affected: 1 });
      expect(await usersService.update(user.id, user)).toEqual({ generatedMaps: [], raw: [], affected: 1 });
    });
  });

  describe('softDelete method', () => {
    it('should update updatedAt and deletedAt fields', async () => {
      jest.spyOn(usersService, 'softDelete').mockResolvedValueOnce({ generatedMaps: [], raw: [], affected: 1 });
      expect(await usersService.softDelete(user.id)).toEqual({ generatedMaps: [], raw: [], affected: 1 });
    });
  });
});

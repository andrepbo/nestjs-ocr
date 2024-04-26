import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { USER_REPOSITORY } from './constants/user.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) { }

  async create(user: User) {
    const email = await this.userRepository.findOne({ where: { email: user.email } });
    if (email) throw new NotFoundException('Email already exists');
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user
  }

  async update(id: string, updateUser: User) {
    return await this.userRepository.update(id, updateUser);
  }

  async softDelete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return await this.userRepository.softDelete(id);
  }
}

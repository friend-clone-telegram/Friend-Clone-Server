import { Injectable } from '@nestjs/common';
import { User } from 'entities/user.entity';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserInputData, UpdateUserInputData } from 'dtos/user.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserInputData: CreateUserInputData): Promise<User> {
    return this.userRepository.save(createUserInputData);
  }

  async update(id: number, updateUserInputData: UpdateUserInputData): Promise<User | undefined> {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepository.update(id, updateUserInputData);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    }
  }

  async delete(id: number): Promise<User | undefined> {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepository.delete(id);
      return user;
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

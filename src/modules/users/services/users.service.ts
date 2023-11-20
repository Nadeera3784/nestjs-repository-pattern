import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      if (users?.length === 0) {
        throw new Error('No record found.');
      }
      return users;
    } catch (error) {
      this.logger.log(
        `UsersService:findAll : ${JSON.stringify(error.message)}`,
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      return this.userRepository.store(user);
    } catch (error) {
      this.logger.log(`UsersService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      await this.findById(id);
      return await this.userRepository.updateOne(id, user);
    } catch (error) {
      this.logger.log(`UsersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this.userRepository.destroy(id);
    } catch (error) {
      this.logger.log(`UsersService:delete: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }
}

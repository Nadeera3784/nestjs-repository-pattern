import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}

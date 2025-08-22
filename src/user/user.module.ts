import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

//connect module with TypeORM Repository
@Module({
  imports: [TypeOrmModule.forFeature([User])], //connect user entity with the repo
  providers: [UserService],
  controllers: [UserController], //HTTP requests
  exports: [UserService],
})
export class UserModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

//TypeORM Repository has find one delete save and the user repo
@Injectable()
export class UserService {
  // connect with db
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<RegisterDto>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ email: email }, { username: username }],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findOneByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  deleteAll() {
    return this.usersRepository.delete({});
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }
}
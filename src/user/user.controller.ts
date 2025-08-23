import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      password: string;
    },
  ) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userService.create({
      firstName: body.firstName,
      username: body.username,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
    });

    return { message: 'User registered successfully', user };
  }
}

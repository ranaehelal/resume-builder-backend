/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({ type: RegisterResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async register(@Body() body: RegisterDto): Promise<RegisterResponseDto> {
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

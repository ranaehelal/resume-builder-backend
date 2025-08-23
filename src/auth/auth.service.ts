/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

interface JwtUserPayload {
  username: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  login(user: JwtUserPayload) {
    const payload = { username: user.username, sub: user.id };
    console.log('Creating JWT with payload:', payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
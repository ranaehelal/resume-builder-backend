/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
    });
  }

  validate(payload: { sub: number; username: string }) {
    // Return consistent property names
    return {
      id: payload.sub,        // Add id property
      userId: payload.sub,    // Keep userId for compatibility
      username: payload.username
    };
  }
}
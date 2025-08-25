import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//read the token from Authorization Header
export class JwtAuthGuard extends AuthGuard('jwt') {}

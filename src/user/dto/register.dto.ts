/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Rana', description: 'First name of the user' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Helal', description: 'Last name of the user' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'ranadev', description: 'Unique username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'rana@example.com', description: 'Unique email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Password with minimum 6 characters' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

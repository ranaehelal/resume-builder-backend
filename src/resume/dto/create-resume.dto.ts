/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({ example: 'Software Engineer Resume', description: 'Resume title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: '+201234567890', description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email address', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Experienced full-stack developer...', description: 'Summary', required: false })
  @IsOptional()
  @IsString()
  summary?: string;
}

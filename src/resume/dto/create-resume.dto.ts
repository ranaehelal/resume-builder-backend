/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateResumeDto {
  @ApiProperty({ example: 'Senior Developer Resume' })
  @IsString()
  title: string;

  @ApiProperty({ example: '+201234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: 'Experienced full-stack developer...', required: false })
  @IsOptional()
  @IsString()
  summary?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Portfolio Website' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '2024-08-01' })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({ example: 'https://github.com/username/project' })
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @ApiProperty({ example: 'A personal portfolio built with React and NestJS', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  resumeId: number;
}

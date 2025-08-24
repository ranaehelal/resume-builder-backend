import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'Bachelor of Science in Computer Science' })
  @IsNotEmpty()
  @IsString()
  degree: string;

  @ApiProperty({ example: 'MIT' })
  @IsNotEmpty()
  @IsString()
  institution: string;

  @ApiProperty({ example: 'Computer Science' })
  @IsNotEmpty()
  @IsString()
  areaOfStudy: string;

  @ApiProperty({ example: '2017 - 2021' })
  @IsNotEmpty()
  @IsString()
  dateRange: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  resumeId: number;

  @ApiProperty({ example: 'Graduated with honors', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '3.9/4.0', required: false })
  @IsOptional()
  @IsString()
  gpa?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ example: 'Senior Software Engineer' })
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @ApiProperty({ example: 'Google' })
  @IsNotEmpty()
  @IsString()
  company: string;

  @ApiProperty({ example: '2020 - 2023' })
  @IsNotEmpty()
  @IsString()
  dateRange: string;

  @ApiProperty({ example: 'Worked on scalable cloud-based solutions', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  resumeId: number;
}

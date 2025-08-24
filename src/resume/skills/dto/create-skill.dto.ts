/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({ example: 'JavaScript', description: 'Skill name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Frontend development', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1, description: 'Resume ID' })
  @IsNotEmpty()
  @IsNumber()
  resumeId: number;
}

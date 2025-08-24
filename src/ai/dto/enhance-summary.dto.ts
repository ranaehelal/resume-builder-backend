/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class SkillDto {
  @ApiProperty({ example: 'JavaScript' })
  @IsString()
  name: string;
}

class ExperienceDto {
  @ApiProperty({ example: 'Frontend Developer' })
  @IsString()
  jobTitle: string;

  @ApiProperty({ example: 'ABC Company' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'Developed web apps', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

class ProjectDto {
  @ApiProperty({ example: 'Portfolio Website' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Personal portfolio project', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

class EducationDto {
  @ApiProperty({ example: 'BSc Computer Science' })
  @IsString()
  degree: string;

  @ApiProperty({ example: 'XYZ University' })
  @IsString()
  institution: string;

  @ApiProperty({ example: 'Software Engineering', required: false })
  @IsOptional()
  @IsString()
  areaOfStudy?: string;
}

// DTO الرئيسي
export class EnhanceSummaryDto {
  @ApiProperty({ example: 'Experienced full-stack developer...' })
  @IsString()
  summary: string;

  @ApiProperty({ type: [SkillDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @ApiProperty({ type: [ExperienceDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experiences?: ExperienceDto[];

  @ApiProperty({ type: [ProjectDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects?: ProjectDto[];

  @ApiProperty({ type: [EducationDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];
}

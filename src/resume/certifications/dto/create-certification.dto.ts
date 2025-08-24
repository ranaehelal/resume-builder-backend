import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, IsUrl } from 'class-validator';

export class CreateCertificationDto {
  @ApiProperty({ example: 'AWS Certified Solutions Architect' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '2023-06-15' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: 'Amazon Web Services' })
  @IsNotEmpty()
  @IsString()
  issuer: string;

  @ApiProperty({ example: 'https://aws.amazon.com/certification/' })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({ example: 'Credential ID: ABC-12345', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  resumeId: number;
}

/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ResumeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Software Engineer Resume' })
  title: string;

  @ApiProperty({ example: '+201234567890', nullable: true })
  phone?: string;

  @ApiProperty({ example: 'user@example.com', nullable: true })
  email?: string;

  @ApiProperty({ example: 'Experienced full-stack developer...', nullable: true })
  summary?: string;

  @ApiProperty({ example: 5 })
  userId: number;
}

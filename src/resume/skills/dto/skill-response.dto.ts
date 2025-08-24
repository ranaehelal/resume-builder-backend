/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class SkillResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'JavaScript' })
  name: string;

  @ApiProperty({ example: 'Frontend development', nullable: true })
  description?: string;

  @ApiProperty({ example: 1, description: 'Linked Resume ID' })
  resumeId: number;
}

// skills/dto/update-skill.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSkillDto {
  @ApiPropertyOptional({ example: 'TypeScript' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Strongly typed superset of JS' })
  @IsOptional()
  @IsString()
  description?: string;
}

/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Skill } from '../skills/entity/skills.entity';
import { Experiences } from '../experiences/entity/experiences.entity';
import { Education } from '../education/entity/education.entity';
import { Certifications } from '../certifications/entity/certifications.entity';
import { Projects } from '../projects/entity/projects.entity';

export class ResumeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  summary?: string;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: () => [Skill] })
  skills: Skill[];

  @ApiProperty({ type: () => [Experiences] })
  experiences: Experiences[];

  @ApiProperty({ type: () => [Education] })
  education: Education[];

  @ApiProperty({ type: () => [Certifications] })
  certifications: Certifications[];

  @ApiProperty({ type: () => [Projects] })
  projects: Projects[];
}

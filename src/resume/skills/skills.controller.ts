import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SkillService } from './skills.service';
import { Skill } from './entity/skills.entity';
import { ResumeService } from '../resume.service';

@Controller('skills')
export class SkillsController {
  constructor(
    private readonly skillService: SkillService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post()
  async create(
    @Body() body: { name: string; description?: string; resumeId: number },
  ): Promise<Skill> {
    const resume = await this.resumeService.findOneById(body.resumeId);
    if (!resume) throw new Error('Resume not found');

    const skill = await this.skillService.create({
      name: body.name,
      description: body.description,
      resume: resume, // pass the full entity
    });
    return skill;
  }

  @Get('resume/:resumeId')
  async findByResumeId(@Param('resumeId') resumeId: number): Promise<Skill[]> {
    return this.skillService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { name?: string; description?: string },
  ): Promise<Skill> {
    return this.skillService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.skillService.delete(id);
  }
}

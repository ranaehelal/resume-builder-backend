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
  //create skill
  async create(@Body() body: { name: string; description?: string; resumeId: number }): Promise<Skill> {
    return this.skillService.createSkillWithResume(body.name, body.description, body.resumeId);
  }
  //find skills by resume id
  @Get('resume/:resumeId')
  async findByResumeId(@Param('resumeId') resumeId: number): Promise<Skill[]> {
    return this.skillService.findSkillByResumeId(resumeId);
  }
  //update skill
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name?: string; description?: string }): Promise<Skill> {
    return this.skillService.updateSkill(id, body);
  }
  //delete skill
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.skillService.delete(id);
  }
}

/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { Experiences } from './entity/experiences.entity';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  async create(
    @Body()
    body: {
      jobTitle: string;
      company: string;
      dateRange: string;
      description?: string;
      resumeId: number;
    },
  ): Promise<Experiences> {
    return this.experiencesService.createExperience(body);
  }

  @Get('resume/:resumeId')
  async findExperiencesByResumeId(@Param('resumeId') resumeId: number): Promise<Experiences[]> {
    return this.experiencesService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Experiences, 'id' | 'resume'>>,
  ): Promise<Experiences> {
    return this.experiencesService.updateExperience(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.experiencesService.deleteExperience(id);
  }
}

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
import { ResumeService } from '../resume.service';

@Controller('experiences')
export class ExperiencesController {
  constructor(
    private readonly experiencesService: ExperiencesService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post()
  async create(
    @Body() body: {
      jobTitle: string;
      company: string;
      dateRange: string;
      description?: string;
      resumeId: number;
    },
  ): Promise<Experiences> {
    const resume = await this.resumeService.findOneById(body.resumeId);
    if (!resume) throw new Error('Resume not found');

    const exp = await this.experiencesService.create({
      jobTitle: body.jobTitle,
      company: body.company,
      dateRange: body.dateRange,
      description: body.description,
      resume: resume,
    });
    return exp;
  }

  @Get('resume/:resumeId')
  // eslint-disable-next-line prettier/prettier
  async findByResumeId(@Param('resumeId') resumeId: number): Promise<Experiences[]> {
    return this.experiencesService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Experiences, 'id' | 'resume'>>,
  ): Promise<Experiences> {
    return this.experiencesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.experiencesService.delete(id);
  }
}

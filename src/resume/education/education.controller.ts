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
import { EducationService } from './education.service';
import { Education } from './entity/education.entity';
import { ResumeService } from '../resume.service';

@Controller('education')
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post()
  async create(
    @Body() body: {
      degree: string;
      institution: string;
      areaOfStudy: string;
      dateRange: string;
      resumeId: number;
      description?: string;
      gpa?: string;
    },
  ): Promise<Education> {
    const resume = await this.resumeService.findOneById(body.resumeId);
    if (!resume) throw new Error('Resume not found');

    const edu = await this.educationService.create({
      degree: body.degree,
      institution: body.institution,
      areaOfStudy: body.areaOfStudy,
      dateRange: body.dateRange,
      description: body.description,
      gpa: body.gpa,
      resume: resume,

    });
    return edu;
  }

  @Get('resume/:resumeId')
  async findByResumeId(@Param('resumeId') resumeId: number): Promise<Education[]> {
    return this.educationService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Education, 'id' | 'resume'>>,
  ): Promise<Education> {
    return this.educationService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.educationService.delete(id);
  }
}

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

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

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
    return this.educationService.createEducation(body);
  }

  @Get('resume/:resumeId')
  async findAllEducationByResumeId(@Param('resumeId') resumeId: number): Promise<Education[]> {
    return this.educationService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Education, 'id' | 'resume'>>,
  ): Promise<Education> {
    return this.educationService.updateEducation(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.educationService.deleteEducation(id);
  }
}

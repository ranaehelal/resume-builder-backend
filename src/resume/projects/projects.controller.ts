import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Projects } from './entity/projects.entity';
import { ResumeService } from '../resume.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      date: string;
      link: string;
      description?: string;
      resumeId: number;
    },
  ): Promise<Projects> {
    const resume = await this.resumeService.findOneById(body.resumeId);
    if (!resume) throw new Error('Resume not found');

    const project = await this.projectsService.create({
      name: body.name,
      date: body.date,
      link: body.link,
      description: body.description,
      resume: resume,
    });
    return project;
  }

  @Get('resume/:resumeId')
  async findByResumeId(
    @Param('resumeId') resumeId: number,
  ): Promise<Projects[]> {
    return this.projectsService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Projects, 'id' | 'resume'>>,
  ): Promise<Projects> {
    return this.projectsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.projectsService.delete(id);
  }
}

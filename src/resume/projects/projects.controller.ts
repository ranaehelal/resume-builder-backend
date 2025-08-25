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
  constructor(private readonly projectsService: ProjectsService) {}

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
    return this.projectsService.createProject(body);
  }

  @Get('resume/:resumeId')
  async findByResumeId(
    @Param('resumeId') resumeId: number,
  ): Promise<Projects[]> {
    return this.projectsService.findProjectsByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Projects, 'id' | 'resume'>>,
  ): Promise<Projects> {
    return this.projectsService.updateProject(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.projectsService.deleteProject(id);
  }
}

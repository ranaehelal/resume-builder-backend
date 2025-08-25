import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './entity/projects.entity';
import { ResumeService } from '../resume.service';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    private readonly resumeService: ResumeService,
  ) {}

  async createProject(data: {
    name: string;
    date: string;
    link: string;
    description?: string;
    resumeId: number;
  }): Promise<Projects> {
    const resume = await this.resumeService.findOneResumeById(data.resumeId);
    if (!resume) throw new NotFoundException('Resume not found');

    const project = this.projectsRepository.create({ ...data, resume });
    return this.projectsRepository.save(project);
  }

  async findProjectsByResumeId(resumeId: number): Promise<Projects[]> {
    return this.projectsRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async updateProject(id: number, data: Partial<Omit<Projects, 'id' | 'resume'>>): Promise<Projects> {
    const result = await this.projectsRepository.update(id, data);
    if (result.affected === 0) throw new NotFoundException('Project not found');

    const updatedProject = await this.projectsRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedProject) throw new NotFoundException('Project not found after update');

    return updatedProject;
  }

  async deleteProject(id: number) {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Project not found');
    return { message: 'Project deleted successfully' };
  }
}

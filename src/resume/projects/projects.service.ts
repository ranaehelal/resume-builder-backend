import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './entity/projects.entity';
import { ResumeService } from '../resume.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    private readonly resumeService: ResumeService,
  ) {}

  async create(project: Partial<Projects>): Promise<Projects> {
    if (!project.resume?.id) throw new Error('Resume ID is required');

    const resume = await this.resumeService.findOneById(project.resume.id);
    if (!resume) throw new Error('Resume not found');

    const newProject = this.projectsRepository.create({ ...project, resume });
    return this.projectsRepository.save(newProject);
  }

  async findByResumeId(resumeId: number): Promise<Projects[]> {
    return this.projectsRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async update(id: number, data: Partial<Projects>): Promise<Projects> {
    const result = await this.projectsRepository.update(id, data);
    if (result.affected === 0) throw new Error('Project not found');

    const updatedProject = await this.projectsRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedProject) throw new Error('Project not found after update');
    return updatedProject;
  }

  async delete(id: number) {
    return this.projectsRepository.delete(id);
  }
}

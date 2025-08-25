import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experiences } from './entity/experiences.entity';
import { ResumeService } from '../resume.service';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experiences)
    private readonly experiencesRepository: Repository<Experiences>,
    private readonly resumeService: ResumeService,
  ) {}

  async createExperience(data: {
    jobTitle: string;
    company: string;
    dateRange: string;
    description?: string;
    resumeId: number;
  }): Promise<Experiences> {
    const resume = await this.resumeService.findOneResumeById(data.resumeId);
    if (!resume) throw new NotFoundException('Resume not found');

    const experience = this.experiencesRepository.create({ ...data, resume });
    return this.experiencesRepository.save(experience);
  }

  async findByResumeId(resumeId: number): Promise<Experiences[]> {
    return this.experiencesRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async updateExperience(id: number, data: Partial<Omit<Experiences, 'id' | 'resume'>>): Promise<Experiences> {
    const result = await this.experiencesRepository.update(id, data);
    if (result.affected === 0) throw new NotFoundException('Experience not found');

    const updatedExp = await this.experiencesRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedExp) throw new NotFoundException('Experience not found after update');
    return updatedExp;
  }

  async deleteExperience(id: number) {
    const result = await this.experiencesRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Experience not found');
    return { message: 'Experience deleted successfully' };
  }
}

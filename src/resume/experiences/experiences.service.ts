import { Injectable } from '@nestjs/common';
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

  async create(exp: Partial<Experiences>): Promise<Experiences> {
    if (!exp.resume?.id) throw new Error('Resume ID is required');
    const resume = await this.resumeService.findOneById(exp.resume.id);
    if (!resume) throw new Error('Resume not found');

    const newExp = this.experiencesRepository.create({ ...exp, resume });
    return this.experiencesRepository.save(newExp);
  }

  async findByResumeId(resumeId: number): Promise<Experiences[]> {
    return this.experiencesRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async update(id: number, data: Partial<Experiences>): Promise<Experiences> {
    const result = await this.experiencesRepository.update(id, data);
    if (result.affected === 0) throw new Error('Experience not found');

    const updatedExp = await this.experiencesRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedExp) throw new Error('Experience not found after update');
    return updatedExp;
  }

  async delete(id: number) {
    return this.experiencesRepository.delete(id);
  }
}

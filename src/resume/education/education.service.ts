import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entity/education.entity';
import { ResumeService } from '../resume.service';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    private readonly resumeService: ResumeService,
  ) {}

  async create(edu: Partial<Education>): Promise<Education> {
    if (!edu.resume?.id) throw new Error('Resume ID is required');
    const resume = await this.resumeService.findOneById(edu.resume.id);
    if (!resume) throw new Error('Resume not found');

    const newEdu = this.educationRepository.create({ ...edu, resume });
    return this.educationRepository.save(newEdu);
  }

  async findByResumeId(resumeId: number): Promise<Education[]> {
    return this.educationRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async update(id: number, data: Partial<Education>): Promise<Education> {
    const result = await this.educationRepository.update(id, data);
    if (result.affected === 0) throw new Error('Education not found');

    const updatedEdu = await this.educationRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedEdu) throw new Error('Education not found after update');
    return updatedEdu;
  }

  async delete(id: number) {
    return this.educationRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createEducation(data: {
    degree: string;
    institution: string;
    areaOfStudy: string;
    dateRange: string;
    resumeId: number;
    description?: string;
    gpa?: string;
  }): Promise<Education> {
    const resume = await this.resumeService.findOneResumeById(data.resumeId);
    if (!resume) throw new NotFoundException('Resume not found');

    const education = this.educationRepository.create({ ...data, resume });
    return this.educationRepository.save(education);
  }

  async findByResumeId(resumeId: number): Promise<Education[]> {
    return this.educationRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async updateEducation(id: number, data: Partial<Omit<Education, 'id' | 'resume'>>): Promise<Education> {
    const result = await this.educationRepository.update(id, data);
    if (result.affected === 0) throw new NotFoundException('Education not found');

    const updatedEdu = await this.educationRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedEdu) throw new NotFoundException('Education not found after update');
    return updatedEdu;
  }

  async deleteEducation(id: number) {
    const result = await this.educationRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Education not found');
    return { message: 'Education deleted successfully' };
  }
}

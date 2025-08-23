// Enhanced resume.service.ts with debugging

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resume } from './entity/resume.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async create(resume: Partial<Resume>): Promise<Resume> {
    const newResume = this.resumeRepository.create(resume);
    return this.resumeRepository.save(newResume);
  }

  async findByUserId(userId: number): Promise<Resume[]> {
    console.log('Finding resumes for userId:', userId);

    // Check if user exists and has resumes
    const resumes = await this.resumeRepository
      .createQueryBuilder('resume')
      .leftJoinAndSelect('resume.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    console.log('Found resumes:', resumes.length);
    console.log('Resumes data:', resumes);

    return resumes;
  }

  async findOneById(id: number): Promise<Resume | null> {
    return this.resumeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, data: Partial<Resume>): Promise<Resume> {
    const result = await this.resumeRepository.update(id, data);
    if (result.affected === 0) {
      throw new NotFoundException('Resume not found');
    }
    const updatedResume = await this.findOneById(id);
    if (!updatedResume) {
      throw new Error('Failed to get updated resume');
    }
    return updatedResume;
  }

  async delete(id: number) {
    return this.resumeRepository.delete(id);
  }
}
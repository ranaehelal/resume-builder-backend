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
    //obj to entity

    const newResume = this.resumeRepository.create(resume);
    return this.resumeRepository.save(newResume);
  }

  //promise not async
  // and return back
  async findByUserId(userId: number): Promise<Resume[]> {
    return this.resumeRepository.find({
      where: { user: { id: userId } },
      //user data
      relations: ['user'],
    });
  }

  async findOneById(id: number): Promise<Resume | null> {
    return this.resumeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, data: Partial<Resume>): Promise<Resume> {
    //get obj has info about update things (affected rows)
    const result = await this.resumeRepository.update(id, data);
    if (result.affected === 0) {
      throw new NotFoundException('Resume not found');
    }
    //to get updated resume
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

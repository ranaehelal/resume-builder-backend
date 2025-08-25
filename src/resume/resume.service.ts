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

  //Partial : can pass subset
  async create(resume: Partial<Resume>): Promise<Resume> {
    const newResume = this.resumeRepository.create(resume); //create in memory and have relations
    return this.resumeRepository.save(newResume);// save in database
  }

  async findAllResumesByUserId(userId: number): Promise<Resume[]> {
    // check user exists and has resumes
    const resumes = await this.resumeRepository
      .createQueryBuilder('resume')
      //find wont be easy to have filter by id
      .leftJoinAndSelect('resume.user', 'user') //get all resumes even without users
      .where('user.id = :userId', { userId })
      .getMany();

    return resumes;
  }

  async findOneResumeById(id: number): Promise<Resume | null> {
    return this.resumeRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, data: Partial<Resume>): Promise<Resume> {
    const result = await this.resumeRepository.update(id, data);
    if (result.affected === 0) {
      throw new NotFoundException('Resume not updated or not found');
    }
    const updatedResume = await this.findOneResumeById(id);
    if (!updatedResume) {
      throw new Error("can't to get updated resume");
    }
    return updatedResume;
  }

  async delete(id: number) {
    return this.resumeRepository.delete(id);
  }
}
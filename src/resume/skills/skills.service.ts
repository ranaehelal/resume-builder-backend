/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../skills/entity/skills.entity';
import { NotFoundException } from '@nestjs/common';
import { ResumeService } from '../resume.service';
@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private readonly resumeService: ResumeService,
  ) {}
  // Service

  async createSkillWithResume(name: string, description: string | undefined, resumeId: number): Promise<Skill> {
    const resume = await this.resumeService.findOneResumeById(resumeId);
    if (!resume) throw new NotFoundException('Resume not found');

    const newSkill = this.skillRepository.create({ name, description, resume });
    return this.skillRepository.save(newSkill);
  }

  async create(skill: Partial<Skill>): Promise<Skill> {
    const newSkill = this.skillRepository.create(skill);
    return this.skillRepository.save(newSkill);
  }

  async findSkillByResumeId(resumeId: number): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async updateSkill(id: number, data: Partial<Skill>): Promise<Skill> {
    const result = await this.skillRepository.update(id, data);
    if (result.affected === 0) throw new NotFoundException('Skill not updated or not found');

    const updatedSkill = await this.skillRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedSkill) throw new NotFoundException('Skill not found after update');

    return updatedSkill;
  }


  async update(id: number, data: Partial<Skill>): Promise<Skill> {
    const result = await this.skillRepository.update(id, data);
    if (result.affected === 0) throw new NotFoundException('Skill not updated or not found');
    const updatedSkill = await this.skillRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedSkill) {
      throw new Error('Skill not found after update');
    }
    return updatedSkill;
  }

  async delete(id: number) {
    return this.skillRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../skills/entity/skills.entity';
@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(skill: Partial<Skill>): Promise<Skill> {
    const newSkill = this.skillRepository.create(skill);
    return this.skillRepository.save(newSkill);
  }

  async findByResumeId(resumeId: number): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async update(id: number, data: Partial<Skill>): Promise<Skill> {
    const result = await this.skillRepository.update(id, data);
    if (result.affected === 0) throw new Error('Skill not found');
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

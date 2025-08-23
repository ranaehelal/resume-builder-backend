import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certifications } from './entity/certifications.entity';
import { ResumeService } from '../resume.service';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certifications)
    private readonly certificationsRepository: Repository<Certifications>,
    private readonly resumeService: ResumeService,
  ) {}

  async create(cert: Partial<Certifications>): Promise<Certifications> {
    if (!cert.resume?.id) {
      throw new Error('Resume ID is required');
    }
    const resume = await this.resumeService.findOneById(cert.resume.id);
    if (!resume) throw new Error('Resume not found');

    const newCert = this.certificationsRepository.create({ ...cert, resume });
    return this.certificationsRepository.save(newCert);
  }

  async findByResumeId(resumeId: number): Promise<Certifications[]> {
    return this.certificationsRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async update(
    id: number,
    data: Partial<Certifications>,
  ): Promise<Certifications> {
    const result = await this.certificationsRepository.update(id, data);
    if (result.affected === 0) throw new Error('Certification not found');

    const updatedCert = await this.certificationsRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedCert) throw new Error('Certification not found after update');
    return updatedCert;
  }

  async delete(id: number) {
    return this.certificationsRepository.delete(id);
  }
}

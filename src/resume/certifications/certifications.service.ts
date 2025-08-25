import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certifications } from './entity/certifications.entity';
import { ResumeService } from '../resume.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certifications)
    private readonly certificationsRepository: Repository<Certifications>,
    private readonly resumeService: ResumeService,
  ) {}

  async createCertification(data: CreateCertificationDto): Promise<Certifications> {
    const resume = await this.resumeService.findOneResumeById(data.resumeId);
    if (!resume) throw new NotFoundException('Resume not found');

    const cert = this.certificationsRepository.create({ ...data, resume });
    return this.certificationsRepository.save(cert);
  }

  async findByResumeId(resumeId: number): Promise<Certifications[]> {
    return this.certificationsRepository.find({
      where: { resume: { id: resumeId } },
      relations: ['resume'],
    });
  }

  async updateCertification(
    id: number,
    data: UpdateCertificationDto
  ): Promise<Certifications> {
    const result = await this.certificationsRepository.update(id, data);
    if (result.affected === 0) throw new NotFoundException('Certification not found');

    const updatedCert = await this.certificationsRepository.findOne({
      where: { id },
      relations: ['resume'],
    });
    if (!updatedCert) throw new NotFoundException('Certification not found after update');
    return updatedCert;
  }

  async deleteCertification(id: number) {
    const result = await this.certificationsRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Certification not found');
    return { message: 'Certification deleted successfully' };
  }
}

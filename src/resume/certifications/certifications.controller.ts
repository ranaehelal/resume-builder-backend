import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { Certifications } from './entity/certifications.entity';
import { ResumeService } from '../resume.service';

@Controller('certifications')
export class CertificationsController {
  constructor(
    private readonly certificationsService: CertificationsService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      name: string;
      date: Date;
      issuer: string;
      url: string;
      description?: string;
      resumeId: number;
    },
  ): Promise<Certifications> {
    const resume = await this.resumeService.findOneById(body.resumeId);
    if (!resume) throw new Error('Resume not found');

    const cert = await this.certificationsService.create({
      name: body.name,
      date: body.date,
      issuer: body.issuer,
      url: body.url,
      description: body.description,
      resume: resume,
    });
    return cert;
  }

  @Get('resume/:resumeId')
  async findByResumeId(
    @Param('resumeId') resumeId: number,
  ): Promise<Certifications[]> {
    return this.certificationsService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: Partial<Omit<Certifications, 'id' | 'resume'>>,
  ): Promise<Certifications> {
    return this.certificationsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.certificationsService.delete(id);
  }
}

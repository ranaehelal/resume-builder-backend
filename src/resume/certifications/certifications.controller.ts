/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CertificationsService } from './certifications.service';
import { Certifications } from './entity/certifications.entity';
import { ResumeService } from '../resume.service';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Controller('certifications')
export class CertificationsController {
  constructor(
    private readonly certificationsService: CertificationsService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post()
  async create(@Body() createCertificationDto: CreateCertificationDto): Promise<Certifications> {
    const resume = await this.resumeService.findOneById(createCertificationDto.resumeId);
    if (!resume) throw new Error('Resume not found');

    return this.certificationsService.create({
      ...createCertificationDto,
      resume,
    });
  }

  @Get('resume/:resumeId')
  async findByResumeId(
    @Param('resumeId', ParseIntPipe) resumeId: number,
  ): Promise<Certifications[]> {
    return this.certificationsService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCertificationDto: UpdateCertificationDto,
  ): Promise<Certifications> {
    return this.certificationsService.update(id, updateCertificationDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.certificationsService.delete(id);
  }
}

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
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';

@Controller('certifications')
export class CertificationsController {
  constructor(private readonly certificationsService: CertificationsService) {}

  @Post()
  async create(
    @Body() createCertificationDto: CreateCertificationDto
  ): Promise<Certifications> {
    return this.certificationsService.createCertification(createCertificationDto);
  }

  @Get('resume/:resumeId')
  async findCertificationsByResumeId(
    @Param('resumeId', ParseIntPipe) resumeId: number
  ): Promise<Certifications[]> {
    return this.certificationsService.findByResumeId(resumeId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCertificationDto: UpdateCertificationDto
  ): Promise<Certifications> {
    return this.certificationsService.updateCertification(id, updateCertificationDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.certificationsService.deleteCertification(id);
  }
}

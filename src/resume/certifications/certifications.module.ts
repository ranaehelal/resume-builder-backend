/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certifications } from './entity/certifications.entity';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { ResumeModule } from '../resume.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certifications]),
    forwardRef(() => ResumeModule),
  ],
  providers: [CertificationsService],
  controllers: [CertificationsController],
  exports: [CertificationsService],
})
export class CertificationsModule {}
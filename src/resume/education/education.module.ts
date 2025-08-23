import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entity/education.entity';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { ResumeModule } from '../resume.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Education]),
    forwardRef(() => ResumeModule),
  ],
  providers: [EducationService],
  controllers: [EducationController],
  exports: [EducationService],
})
export class EducationModule {}

/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entity/resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { UserModule } from '../user/user.module';
import { SkillsModule } from './skills/skills.module';
import { EducationModule } from './education/education.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { CertificationsModule } from './certifications/certifications.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resume]),
    UserModule,
    //   circular
    // using forwardRef because SkillsModule imports ResumeModule

    forwardRef(() => SkillsModule),
    forwardRef(() => EducationModule),
    forwardRef(() => ExperiencesModule),
    forwardRef(() => CertificationsModule),
    forwardRef(() => ProjectsModule),
  ],
  providers: [ResumeService],
  controllers: [ResumeController],
  exports: [ResumeService],
})
export class ResumeModule {}
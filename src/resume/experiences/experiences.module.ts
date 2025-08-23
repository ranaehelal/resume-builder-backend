import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiences } from './entity/experiences.entity';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';
import { ResumeModule } from '../resume.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experiences]),
    forwardRef(() => ResumeModule),
  ],
  providers: [ExperiencesService],
  controllers: [ExperiencesController],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}

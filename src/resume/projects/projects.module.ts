import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entity/projects.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ResumeModule } from '../resume.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projects]),
    forwardRef(() => ResumeModule),
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}

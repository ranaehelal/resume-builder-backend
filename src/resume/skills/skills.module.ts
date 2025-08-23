import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entity/skills.entity';
import { SkillService } from './skills.service';
import { SkillsController } from './skills.controller';
import { ResumeModule } from '../resume.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skill]), forwardRef(() => ResumeModule)],
  providers: [SkillService],
  controllers: [SkillsController],
  exports: [SkillService],
})
export class SkillsModule {}

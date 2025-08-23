import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entity/resume.entity';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resume]), UserModule],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}

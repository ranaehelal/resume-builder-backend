import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './entity/resume.entity';

@Controller('resume')
// resume /
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}


}

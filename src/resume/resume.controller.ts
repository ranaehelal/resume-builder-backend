/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './entity/resume.entity';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly userService: UserService,
  ) {}

  // Create Resume
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body()
    body: {
      title: string;
      phone?: string;
      email?: string;
      summary?: string;
    },
  ): Promise<Resume> {
    const userId = req.user.id;
    const user = await this.userService.findOneById(userId);
    if (!user) throw new Error('User not found');

    return this.resumeService.create({
      ...body,
      user,
    });
  }

  // Get my resumes
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyResumes(@Request() req): Promise<Resume[]> {
    const userId = req.user.id; // Changed from req.user.userId to req.user.id
    return this.resumeService.findByUserId(userId);
  }

  // Get one resume
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Request() req, @Param('id') id: number): Promise<Resume | null> {
    const resume = await this.resumeService.findOneById(id);
    if (!resume) return null;

    if (resume.user.id !== req.user.id) {
      throw new Error('Not authorized to access this resume');
    }
    return resume;
  }

  // Update resume
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() body: Partial<Resume>,
  ): Promise<Resume> {
    const resume = await this.resumeService.findOneById(id);
    if (!resume) throw new Error('Resume not found');

    if (resume.user.id !== req.user.id) {
      throw new Error('Not authorized to update this resume');
    }

    return this.resumeService.update(id, body);
  }

  // Delete resume
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number) {
    const resume = await this.resumeService.findOneById(id);
    if (!resume) throw new Error('Resume not found');

    if (resume.user.id !== req.user.id) { // Changed from req.user.userId to req.user.id
      throw new Error('Not authorized to delete this resume');
    }

    return this.resumeService.delete(id);
  }
}
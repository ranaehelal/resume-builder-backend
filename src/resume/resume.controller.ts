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
import { NotFoundException } from '@nestjs/common';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly userService: UserService,
  ) {}

  // Create Resume
  // UseGuards has the req.user.id from the token
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
    const user = await this.userService.findOneUserById(userId);
    if (!user) throw new NotFoundException("can't find user");

    return this.resumeService.create({
      ...body,
      user,
    });
  }

  // Get my resumes
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyResumes(@Request() req): Promise<Resume[]> {
    //validate user
    const userId = req.user.id;

    return this.resumeService.findAllResumesByUserId(userId);
  }

  // Get one resume
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Request() req, @Param('id') id: number): Promise<Resume | null> {
    const resume = await this.resumeService.findOneResumeById(id);
    if (!resume) return null;

    const userId = req.user.id;
    if (resume.user.id !== userId) {
      throw new Error('User not authorized to access this resume');
    }
    return resume;
  }

  // Update
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: number,
    @Body() body: Partial<Resume>,
  ): Promise<Resume> {
    const resume = await this.resumeService.findOneResumeById(id);
    if (!resume) throw new Error('Resume not found');

    const userId = req.user.id;
    if (resume.user.id !== userId) {
      throw new Error('User not authorized to update this resume');
    }

    return this.resumeService.update(id, body);
  }

  // Delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number) {
    const resume = await this.resumeService.findOneResumeById(id);
    if (!resume) throw new Error('Resume not found');

    const userId = req.user.id;
    if (resume.user.id !== userId) {
      throw new Error('User not   authorized to delete this resume');
    }

    return this.resumeService.delete(id);
  }
}
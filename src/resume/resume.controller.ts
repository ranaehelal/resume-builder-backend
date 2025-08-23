import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Resume } from './entity/resume.entity';
import { UserService } from '../user/user.service';

@Controller('resume')
// base route: /resume
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly userService: UserService,
  ) {}

  // Create Resume
  @Post()
  async create(
    @Body()
    body: {
      title: string;
      phone?: string;
      email?: string;
      summary?: string;
      userId: number;
    },
  ): Promise<Resume> {
    const user = await this.userService.findOneById(body.userId);
    if (!user) throw new Error('User not found');

    const resume = await this.resumeService.create({
      title: body.title,
      phone: body.phone,
      email: body.email,
      summary: body.summary,
      user: user, // pass the full entity
    });
    return resume;
  }

  // Get all resumes for one user
  @Get('user/:userId')
  async getByUserId(@Param('userId') userId: number): Promise<Resume[]> {
    return this.resumeService.findByUserId(userId);
  }

  //  one resume
  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Resume | null> {
    return this.resumeService.findOneById(id);
  }

  // Update
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    body: {
      title?: string;
      phone?: string;
      email?: string;
      summary?: string;
    },
  ): Promise<Resume> {
    return this.resumeService.update(id, body);
  }

  // Delete
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.resumeService.delete(id);
  }
}

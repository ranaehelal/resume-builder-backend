import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('enhance')
  async enhance(@Body() body: any): Promise<{ enhancedSummary: string }> {
    const enhancedSummary = await this.aiService.enhanceSummary(body);
    return { enhancedSummary };
  }
}

import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async enhanceSummary(body: any): Promise<string> {
    const summary = body.summary || '';
    const skills = body.skills || [];
    const experiences = body.experiences || [];
    const projects = body.projects || [];
    const education = body.education || [];

    const skillNames = skills.map((s: any) => s.name).join(', ');
    const expText = experiences.map((e: any) => `${e.jobTitle} at ${e.company}`).join('; ');
    const projText = projects.map((p: any) => p.name).join(', ');
    const eduText = education.map((e: any) => `${e.degree} from ${e.institution}`).join('; ');

    const prompt = `
Rewrite the following resume summary to be concise (max 800 characters), highlighting main skills, key experiences, projects, and education. Do not add explanations—just rewrite as a resume summary.

Summary: "${summary}"
Skills: ${skillNames}
Experiences: ${expText}
Projects: ${projText}
Education: ${eduText}
`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || summary;
  }
}

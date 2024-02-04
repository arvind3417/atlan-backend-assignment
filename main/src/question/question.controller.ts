// src/questions/questions.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { QuestionService } from './question.service'; 
import { Question } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly prismaService: QuestionService) {}

  @Post()
  async createQuestion(@Body() questionData: { formID: number; text: string; type: string; metadata: string }): Promise<Question> {
    return this.prismaService.createQuestion(questionData);
  }

  @Get(':formId')
  async getQuestionsByFormId(@Param('formId') formId: string): Promise<Question[]> {
    return this.prismaService.getQuestionsByFormId(parseInt(formId, 10));
  }

  @Get(':formId/:questionId')
  async getQuestionById(@Param('formId') formId: string, @Param('questionId') questionId: string): Promise<Question> {
    return this.prismaService.getQuestionByIds(parseInt(formId, 10), parseInt(questionId, 10));
  }

  @Put(':formId/:questionId')
  async updateQuestion(
    @Param('formId') formId: string,
    @Param('questionId') questionId: string,
    @Body() questionData: { text?: string; type?: string; metadata?: string }
  ): Promise<Question> {
    return this.prismaService.updateQuestion(parseInt(formId, 10), parseInt(questionId, 10), questionData);
  }

  @Delete(':formId/:questionId')
  async deleteQuestion(@Param('formId') formId: string, @Param('questionId') questionId: string): Promise<void> {
    return this.prismaService.deleteQuestion(parseInt(formId, 10), parseInt(questionId, 10));
  }
}

// src/prisma/prisma.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(questionData: { formID: number; text: string; type: string; metadata: string }): Promise<Question> {
    let createdQuestion: Question;

    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Create the question within the transaction
        createdQuestion = await prisma.question.create({ data: questionData });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error('Error during transaction:', error);
      throw new HttpException('Failed to create question', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return createdQuestion;
  }

  async getQuestionsByFormId(formId: number): Promise<Question[]> {
    return this.prisma.question.findMany({ where: { formID: formId } });
  }

  async getQuestionByIds(formId: number, questionId: number): Promise<Question> {
    return this.prisma.question.findUnique({ where: { questionID: questionId, formID: formId } });
  }

  async updateQuestion(formId: number, questionId: number, data: { text?: string; type?: string; metadata?: string }): Promise<Question> {
    let updatedQuestion: Question;

    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Update the question within the transaction
        updatedQuestion = await prisma.question.update({ where: { questionID: questionId, formID: formId }, data });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error('Error during transaction:', error);
      throw new HttpException('Failed to update question', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return updatedQuestion;
  }

  async deleteQuestion(formId: number, questionId: number): Promise<void> {
    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Delete the question within the transaction
        await prisma.question.delete({ where: { questionID: questionId, formID: formId } });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error('Error during transaction:', error);
      throw new HttpException('Failed to delete question', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

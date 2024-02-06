// src/answers/answer.service.ts
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Answer } from "@prisma/client";

@Injectable()
export class AnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswer(answerData: {
    responseID: number;
    questionID: number;
    value: string;
    metadata: string;
  }): Promise<Answer> {
    try {
      return this.prisma.$transaction(async (prisma) => {
        const createdAnswer = await prisma.answer.create({ data: answerData });

        // Simulate an error condition
        if (createdAnswer.value === "error") {
          throw new InternalServerErrorException(
            "Simulated error during transaction"
          );
        }

        // You can perform additional operations within the same transaction if needed
        return createdAnswer;
      });
    } catch (error) {
      console.error("Error during transaction:", error.message);
      throw error; // Re-throw the error for NestJS to handle
    }
  }

  async getAnswersByResponseId(responseId: number): Promise<Answer[]> {
    return this.prisma.answer.findMany({ where: { responseID: responseId } });
  }

  async getAnswerByIds(responseId: number, answerId: number): Promise<Answer> {
    return this.prisma.answer.findUnique({
      where: { answerID: answerId, responseID: responseId },
    });
  }

  async updateAnswer(
    responseId: number,
    answerId: number,
    data: { value?: string; metadata?: string }
  ): Promise<Answer> {
    try {
      return this.prisma.$transaction(async (prisma) => {
        const updatedAnswer = await prisma.answer.update({
          where: { answerID: answerId, responseID: responseId },
          data,
        });

        // Simulate an error condition
        if (updatedAnswer.value === "error") {
          throw new InternalServerErrorException(
            "Simulated error during transaction"
          );
        }

        // You can perform additional operations within the same transaction if needed
        return updatedAnswer;
      });
    } catch (error) {
      console.error("Error during transaction:", error.message);
      throw error; // Re-throw the error for NestJS to handle
    }
  }

  async deleteAnswer(responseId: number, answerId: number): Promise<void> {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.answer.delete({
        where: { answerID: answerId, responseID: responseId },
      });
      // You can perform additional operations within the same transaction if needed
    });
  }
}

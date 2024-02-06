// src/answers/answers.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { Answer } from "@prisma/client";

@Controller("answers")
export class AnswersController {
  constructor(private readonly prismaService: AnswerService) {}

  @Post()
  async createAnswer(
    @Body()
    answerData: {
      responseID: number;
      questionID: number;
      value: string;
      metadata: string;
    }
  ): Promise<Answer> {
    return this.prismaService.createAnswer(answerData);
  }

  @Get(":responseId")
  async getAnswersByResponseId(
    @Param("responseId") responseId: string
  ): Promise<Answer[]> {
    return this.prismaService.getAnswersByResponseId(parseInt(responseId, 10));
  }

  @Get(":responseId/:answerId")
  async getAnswerById(
    @Param("responseId") responseId: string,
    @Param("answerId") answerId: string
  ): Promise<Answer> {
    return this.prismaService.getAnswerByIds(
      parseInt(responseId, 10),
      parseInt(answerId, 10)
    );
  }

  @Put(":responseId/:answerId")
  async updateAnswer(
    @Param("responseId") responseId: string,
    @Param("answerId") answerId: string,
    @Body() answerData: { value?: string; metadata?: string }
  ): Promise<Answer> {
    return this.prismaService.updateAnswer(
      parseInt(responseId, 10),
      parseInt(answerId, 10),
      answerData
    );
  }

  @Delete(":responseId/:answerId")
  async deleteAnswer(
    @Param("responseId") responseId: string,
    @Param("answerId") answerId: string
  ): Promise<void> {
    return this.prismaService.deleteAnswer(
      parseInt(responseId, 10),
      parseInt(answerId, 10)
    );
  }
}

// src/responses/responses.controller.ts
import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ResponsesService } from './response.service';  
import { Answer, Response } from '@prisma/client';

@Controller('responses')
export class ResponsesController {
  constructor(private readonly prismaService: ResponsesService) {}

  @Post()
  async createResponseWithAnswers(@Body() requestData: { formID: number; timestamp: Date; metadata: string; answers: Answer[] }): Promise<Response> {
    return this.prismaService.createResponseWithAnswers(requestData);
  }

  @Get(':formId')
  async getResponsesByFormId(@Param('formId') formId: string): Promise<Response[]> {
    return this.prismaService.getResponsesByFormId(parseInt(formId, 10));
  }

  @Get(':formId/:responseId')
  async getResponseById(@Param('formId') formId: string, @Param('responseId') responseId: string): Promise<Response> {
    return this.prismaService.getResponseByIds(parseInt(formId, 10), parseInt(responseId, 10));
  }

  @Put(':formId/:responseId')
  async updateResponse(
    @Param('formId') formId: string,
    @Param('responseId') responseId: string,
    @Body() responseData: { timestamp?: Date; metadata?: string }
  ): Promise<Response> {
    return this.prismaService.updateResponse(parseInt(formId, 10), parseInt(responseId, 10), responseData);
  }

  @Delete(':formId/:responseId')
  async deleteResponse(@Param('formId') formId: string, @Param('responseId') responseId: string): Promise<void> {
    return this.prismaService.deleteResponse(parseInt(formId, 10), parseInt(responseId, 10));
  }
}

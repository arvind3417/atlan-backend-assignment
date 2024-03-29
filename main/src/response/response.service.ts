// src/responses/responses.service.ts
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Answer, Prisma, Response } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bull';

@Injectable()
export class ResponsesService {
  constructor(private readonly prisma: PrismaService,
    @InjectQueue('q1') private readonly q : Queue,
    @Inject('RESPONSE_SERVICE') private readonly responseHandler : ClientProxy
    ) {}

  async createResponseWithAnswers(requestData: { formID: number; timestamp: Date; metadata: string; answers: Answer[] }): Promise<Response> {
    const { formID, timestamp, metadata, answers } = requestData;

    let createdResponse: Response;

    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Create the response with answers within the transaction
        createdResponse = await prisma.response.create({
          data: {
            formID,
            timestamp,
            metadata,
            answers: {
              create: answers,
            },
          },
        });
      });

      if(createdResponse){
        this.q.add('form',requestData, {
          backoff:{
            type:'exponential',
            delay:1000
          }, attempts: 5
         });

         this.responseHandler.emit('handle-response', createdResponse).toPromise()
      }
 
  
    } catch (error) {
      // Handle the error appropriately
      console.error('Error during transaction:', error);
      throw new HttpException('Failed to create response', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return createdResponse;
  }

  async getResponsesByFormId(formId: number): Promise<Response[]> {
    return this.prisma.response.findMany({ where: { formID: formId } });
  }

  async getResponseByIds(formId: number, responseId: number): Promise<Response> {
    return this.prisma.response.findUnique({ where: { responseID: responseId, formID: formId } });
  }

  async updateResponse(formId: number, responseId: number, data: { timestamp?: Date; metadata?: string }): Promise<Response> {
    let updatedResponse: Response;

    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Update the response within the transaction
        updatedResponse = await prisma.response.update({
          where: { responseID: responseId, formID: formId },
          data,
        });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error('Error during transaction:', error);
      throw new HttpException('Failed to update response', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return updatedResponse;
  }

  async deleteResponse(formId: number, responseId: number): Promise<void> {
    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Delete the response within the transaction
        await prisma.response.delete({ where: { responseID: responseId, formID: formId } });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error('Error during transaction:', error);
      throw new HttpException('Failed to delete response', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

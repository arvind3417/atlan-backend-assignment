import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class EmailHandlerController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('handleEmail')
  handleEmail(data: any): void {
    // console.log('Email Microservice:', data);
    this.appService.handleUserCreated(data);

    // Add email microservice logic here
  }
}

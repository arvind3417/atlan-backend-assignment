import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class LoggingHandlerController {
  @MessagePattern('handleLogging')
  handleLogging(data: any): void {
    console.log('Logging Microservice:', data);
    // Add logging microservice logic here
  }
}
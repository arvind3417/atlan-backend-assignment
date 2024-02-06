// src/app.module.ts
import { Module } from '@nestjs/common';
import { ResponseHandlerService } from './response-handler.service';
import { MicroservicesModule } from './microservice.module';
import { ResponsesController } from './app.controller';

@Module({
  imports: [MicroservicesModule],
  controllers: [ResponsesController],
  providers: [ResponseHandlerService],
})
export class AppModule {}

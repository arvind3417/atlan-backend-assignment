// src/microservices/logging-handler.microservice.ts
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4001,
    },
  } as TcpOptions);
  await app.listen();
  }

bootstrap();

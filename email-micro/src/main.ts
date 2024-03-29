// src/microservices/email-handler.microservice.ts
import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 4002,
    },
  } as TcpOptions);
  await app.listen();
  // const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: {
  //     port: 3002,
  //   },
  // });
  // await app.startAllMicroservices();
  // await app.listen(3002);
  }
bootstrap();

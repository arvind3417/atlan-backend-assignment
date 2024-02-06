// src/microservices/microservices.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggingHandler } from './use-cases/logging-handler';
import { EmailHandler } from './use-cases/email-handler';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGGER_MICRO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'logging-handler',
          port: 4001,
        },
      },
      {
        name: 'EMAIL_MICRO_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'email-handler',
          port: 4002,
        },
      },
    ]),
  ],
  providers: [LoggingHandler, EmailHandler],
  exports: [LoggingHandler, EmailHandler],
})
export class MicroservicesModule {}

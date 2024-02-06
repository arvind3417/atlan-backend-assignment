import { Module } from '@nestjs/common';
import { LoggingHandlerController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [LoggingHandlerController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { EmailHandlerController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [EmailHandlerController],
  providers: [AppService],
})
export class AppModule {}

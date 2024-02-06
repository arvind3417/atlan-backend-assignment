// src/app.module.ts
import { Module } from '@nestjs/common';
import { GoogleSheetsModule } from './google-sheet.module'; 
import { AppController } from './app.controller';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GoogleSheetsModule],
  controllers: [AppController],
  providers: [GoogleSpreadsheet,ConfigService],
})
export class AppModule {}

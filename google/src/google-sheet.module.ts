// src/google-sheets/google-sheets.module.ts
import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './app.service'; 
@Module({
  providers: [GoogleSheetsService],
  exports: [GoogleSheetsService],
})
export class GoogleSheetsModule {}

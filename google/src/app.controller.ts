import { Controller, Get } from '@nestjs/common';
import { GoogleSheetsService } from './app.service';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private doc: GoogleSpreadsheet,

    private readonly googleSheetsService: GoogleSheetsService
    ) {}


  @EventPattern("send")
  async handleFormResponse(transformedData: any) {
    try {
      await this.googleSheetsService.processForm(transformedData);
    } catch (error) {
      console.error("Error handling form response:", error);
    }
  }
  @EventPattern("form-delete")
  async handleDeleteForm(id: any) {
    try {
      await this.googleSheetsService.deleteSheet(id);
    } catch (error) {
      console.error("Error handling form response:", error);
    }
  }
}

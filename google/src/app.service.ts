// google-sheets.service.ts
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { log } from "console";
import { GOOGLE_EMAIL, GOOGLE_KEY } from "./constants";

@Injectable()
export class GoogleSheetsService {
  private doc: GoogleSpreadsheet;

  constructor(
    private  config : ConfigService
  ) {
    // Initialize auth
    const serviceAccountAuth = new JWT({
      email: GOOGLE_EMAIL,
      key: GOOGLE_KEY, 
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.doc = new GoogleSpreadsheet(
      "1Cv9g5BP2WUxRONIsiLQKDuDu0eOiRAB8c7ESRZEbfZU",
      serviceAccountAuth
    );
  }

  async updateGoogleSheetTitle(newTitle: string): Promise<void> {

    await this.doc.loadInfo(); // loads document properties and worksheets
    console.log(`Current title: ${this.doc.title}`);

    // Example: Update document title
    await this.doc.updateProperties({ title: newTitle });
    console.log(`Updated title: ${this.doc.title}`);
  }

  async getSheetInfo(
    sheetIndex: number
  ): Promise<{ title: string; rowCount: number }> {
    await this.doc.loadInfo(); // Make sure to load the spreadsheet info
    console.log(`Current title: ${this.doc.title}`);
    const sheet: GoogleSpreadsheetWorksheet =
      this.doc.sheetsByIndex[sheetIndex];
    const rowCount = sheet.rowCount;

    return { title: sheet.title, rowCount };
  }

  async addSheet(title: string): Promise<any> {
    return await this.doc.addSheet({ title });
    // console.log(`Added new sheet with title: ${newSheet.title}`);
  }

  async deleteSheet(sheetIndex: number): Promise<void> {
    await this.doc.loadInfo(); // Make sure to load the spreadsheet info
    const sheet: GoogleSpreadsheetWorksheet =
      this.doc.sheetsByIndex[sheetIndex];
    await sheet.delete();
    console.log(`Deleted sheet with title: ${sheet.title}`);
  }

  async getRows(sheetIndex: number): Promise<GoogleSpreadsheetRow[]> {
    const sheet: GoogleSpreadsheetWorksheet =
      this.doc.sheetsByIndex[sheetIndex];
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    return rows;
  }

  async addRow(
    sheet: GoogleSpreadsheetWorksheet,
    data: Record<string, any>
  ): Promise<void> {
    await this.doc.loadInfo();

    await sheet.addRow(data);
    console.log(`Added a new row to sheet with title: ${sheet.title}`);
  }
  async addColumn(
    sheet: GoogleSpreadsheetWorksheet,
    columnName: string
  ): Promise<void> {
    await this.doc.loadInfo();
  
    let columnExists = false;
  
    try {
      // Load header row
      await sheet.loadHeaderRow();
  
      // Check if the column already exists
      const existingHeaders = sheet.headerValues || [];
      for (const header of existingHeaders) {
        if (header === columnName) {
          console.log(`Column '${columnName}' already exists.`);
          columnExists = true;
          break;
        }
      }
  
      if (!columnExists) {
        // Add the new column to the header row
        sheet.headerValues.push(columnName);
        await sheet.setHeaderRow(sheet.headerValues);
  
        console.log(
          `Added column '${columnName}' to sheet with title: ${sheet.title}`
        );
      }
    } catch (error) {
      if (error.message.includes("No values in the header row")) {
        // Handle the case where the header row is empty
        const dummy: string[] = [columnName];
        await sheet.setHeaderRow(dummy);
        console.log(
          `Added column '${columnName}' to sheet with title: ${sheet.title}`
        );
      } else {
        // Propagate other errors
        throw error;
      }
    }
  }
  
  async processForm(formData: any[]): Promise<void> {

    
    await this.doc.loadInfo();

    // Assuming each form submission has a unique form ID
    const formID = formData[0].formID; // Assuming formID is the same for all submissions
    const sheet: GoogleSpreadsheetWorksheet = this.doc.sheetsByIndex[formID];
    let newSheet;
    // Create a new sheet for the form if it doesn't exist
    const sheetTitle = `Form_${formID}`;
    if (!sheet ) {
      newSheet = await this.addSheet(sheetTitle);
      console.log(newSheet);
    
      // await newSheet.loadHeaderRow();
      await this.addColumn(newSheet,formData[0].question)
    // Process each form submission
    for (const submission of formData) {

      // Add a row for each form submission
      const newQuestionColumnName = submission.question;

      // Add a column for each new question in the form if it doesn't exist
      if (!newSheet.headerValues.includes(newQuestionColumnName)) {
        await this.addColumn(newSheet, newQuestionColumnName);
      }


      // Add a column for 'timestamp' if it doesn't exist
      if (!newSheet.headerValues.includes('Timestamp')) {
        await this.addColumn(newSheet, 'Timestamp');
      }

      const rowData = {
        Timestamp: submission.timestamp, // Assuming 'timestamp' comes in each submission
        [newQuestionColumnName]: submission.answer,
      };

      await this.addRow(newSheet, rowData);
    }
    } else{
      
    
console.log("after if");

    console.log(sheet);
    
      // await newSheet.loadHeaderRow();
      await this.addColumn(sheet,formData[0].question)
    // Process each form submission
    for (const submission of formData) {
console.log("gjhfdgjb");

      // Add a row for each form submission
      const newQuestionColumnName = submission.question;
      // await this.addColumn(newSheet, newQuestionColumnName);

      // Add a column for each new question in the form if it doesn't exist
      if (!sheet.headerValues.includes(newQuestionColumnName)) {
        await this.addColumn(sheet, newQuestionColumnName);
      }


      // Add a column for 'timestamp' if it doesn't exist
      if (!sheet.headerValues.includes('Timestamp')) {
        await this.addColumn(sheet, 'Timestamp');
      }

      const rowData = {
        Timestamp: submission.timestamp, // Assuming 'timestamp' comes in each submission
        [newQuestionColumnName]: submission.answer,
      };

      await this.addRow(sheet, rowData);
    }
  }
  }

}

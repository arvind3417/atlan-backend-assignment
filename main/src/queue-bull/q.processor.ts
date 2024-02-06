import { Process, Processor } from "@nestjs/bull";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Job } from "bull";
import { QuestionService } from "src/question/question.service";

@Processor("q1")
export class UploadProcessor {
  constructor(
    @Inject("GOOGLE")
    private readonly googleSheetService: ClientProxy,
    private readonly questionService: QuestionService // Inject your QuestionService
  ) {}

  /**
   * Process form response data and send it to Google service
   * @param job
   * @returns
   */
  @Process("form")
  async sheetServicehandler(job: Job) {
    try {
      const formResponseData = job.data;

      const transformedData =
        await this.transformResponseData(formResponseData);

      // Send the transformed data to the Google service
      await this.googleSheetService.emit("send", transformedData).toPromise();
    } catch (error) {
      console.error("Error processing form response:", error);
    }
  }
  @Process("form-delete")
  async sheetDeletehandler(job: Job) {
    try {
      // Send the transformed data to the Google service
      await this.googleSheetService.emit("form-delete", job.data).toPromise();
    } catch (error) {
      console.error("Error processing form response:", error);
    }
  }

  /**
   * Transform form response data for Google Sheet
   * @param formResponseData
   * @returns
   */
  private async transformResponseData(formResponseData: any): Promise<any[]> {
    const { formID, timestamp, answers } = formResponseData;

    const transformedRows: any[] = [];

    for (const answer of answers) {
      const question = await this.questionService.getQuestionByIds(
        formID,
        answer.questionID
      );

      if (question) {
        const transformedRow = {
          formID,
          timestamp,
          question: question.text,
          answer: answer.value,
        };

        transformedRows.push(transformedRow);
      }
    }

    return transformedRows;
  }
}

// src/controllers/responses.controller.ts
import { Controller, Post, Body, Inject } from "@nestjs/common";
import { ResponseHandlerService } from "./response-handler.service";
import { LoggingHandler } from "./use-cases/logging-handler";
import { EmailHandler } from "./use-cases/email-handler";
import { EventPattern } from "@nestjs/microservices";

@Controller("responses")
export class ResponsesController {
  constructor(
    private readonly responseHandlerService: ResponseHandlerService,
    @Inject(LoggingHandler) private readonly loggingHandler: LoggingHandler,
    @Inject(EmailHandler) private readonly emailHandler: EmailHandler
  ) {
    // Register the handlers
    this.responseHandlerService.registerHandler(loggingHandler);
    this.responseHandlerService.registerHandler(emailHandler);
  }

  // @Post()
  @EventPattern("handle-response")
  async createResponse(@Body() response: any): Promise<void> {
    console.log("====================================");
    console.log("hi from plu and play");
    console.log("====================================");
    // Trigger response handling with registered handlers
    await this.responseHandlerService.handleResponse(response);
  }
}

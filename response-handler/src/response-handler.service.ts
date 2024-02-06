// src/services/response-handler.service.ts
import { Injectable } from "@nestjs/common";
import { ResponseHandler } from "./interfaces/response-handler.interface";

@Injectable()
export class ResponseHandlerService {
  private handlers: ResponseHandler[] = [];

  registerHandler(handler: ResponseHandler): void {
    this.handlers.push(handler);
  }

  async handleResponse(response: any): Promise<void> {
    // Execute all registered handlers asynchronously
    await Promise.all(
      this.handlers.map((handler) => handler.handleResponse(response))
    );
  }
}

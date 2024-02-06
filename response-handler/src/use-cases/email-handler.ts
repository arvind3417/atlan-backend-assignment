// src/use-cases/email-handler.ts
import { Inject, Injectable } from "@nestjs/common";
import { ResponseHandler } from "../interfaces/response-handler.interface";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class EmailHandler implements ResponseHandler {
  constructor(
    @Inject("EMAIL_MICRO_SERVICE")
    private readonly emailMicroService: ClientProxy
  ) {}

  async handleResponse(response: any): Promise<void> {
    console.log("Email Handler:", response);

    // Send the response to the Email Handler Microservice
    this.emailMicroService.emit("handleEmail", response);
  }
}

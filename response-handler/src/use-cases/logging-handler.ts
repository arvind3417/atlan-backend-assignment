// src/use-cases/logging-handler.ts
import { Inject, Injectable } from "@nestjs/common";
import { ResponseHandler } from "../interfaces/response-handler.interface";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";

@Injectable()
export class LoggingHandler implements ResponseHandler {
  constructor(
    @Inject("LOGGER_MICRO_SERVICE")
    private readonly loggerMicroService: ClientProxy
  ) {}

  async handleResponse(response: any): Promise<void> {
    console.log("Logging Handler:", response);

    // Send the response to the Logging Handler Microservice
    this.loggerMicroService.emit("handleLogging", response);
  }
}

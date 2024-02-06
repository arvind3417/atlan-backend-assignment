// src/interfaces/response-handler.interface.ts
export interface  ResponseHandler{
    handleResponse(response: any): Promise<void>;
  }
  
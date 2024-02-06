// src/forms/forms.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { Form } from "@prisma/client";
import { FormService } from "./form.service";

@Controller("forms")
export class FormsController {
  constructor(private readonly prismaService: FormService) {}

  @Post()
  async createForm(
    @Body() formData: { title: string; description: string; metadata: string }
  ): Promise<Form> {
    return this.prismaService.createForm(formData);
  }

  @Get()
  async getAllForms(): Promise<Form[]> {
    return this.prismaService.getAllForms();
  }

  @Get(":id")
  async getFormById(@Param("id") id: string): Promise<Form> {
    const form = await this.prismaService.getFormById(parseInt(id, 10));
    if (!form) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
    return form;
  }

  @Put(":id")
  async updateForm(
    @Param("id") id: string,
    @Body()
    formData: { title?: string; description?: string; metadata?: string }
  ): Promise<Form> {
    return this.prismaService.updateForm(parseInt(id, 10), formData);
  }

  @Delete(":id")
  async deleteForm(@Param("id") id: string): Promise<void> {
    return await this.prismaService.deleteForm(parseInt(id, 10));
  }
}

// src/prisma/prisma.service.ts
import { InjectQueue } from "@nestjs/bull";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Prisma, Form } from "@prisma/client";
import { Queue } from "bull";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FormService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue("q1") private readonly q: Queue
  ) {}

  async createForm(data: {
    title: string;
    description: string;
    metadata: string;
  }): Promise<Form> {
    let createdForm: Form;

    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Create the form within the transaction
        createdForm = await prisma.form.create({ data });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error("Error during transaction:", error);
      throw new HttpException(
        "Failed to create form",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return createdForm;
  }

  async updateForm(
    id: number,
    data: { title?: string; description?: string; metadata?: string }
  ): Promise<Form> {
    let updatedForm: Form;

    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Update the form within the transaction
        updatedForm = await prisma.form.update({ where: { formID: id }, data });
      });
    } catch (error) {
      // Handle the error appropriately
      console.error("Error during transaction:", error);
      throw new HttpException(
        "Failed to update form",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return updatedForm;
  }

  async getAllForms(): Promise<Form[]> {
    return this.prisma.form.findMany();
  }

  async getFormById(id: number): Promise<Form> {
    return this.prisma.form.findUnique({ where: { formID: id } });
  }

  async deleteForm(id: number): Promise<void> {
    try {
      // Use a transaction to ensure atomicity
      await this.prisma.$transaction(async (prisma) => {
        // Delete the form within the transaction
        const deleted = await prisma.form.delete({ where: { formID: id } });
        if (deleted) {
          this.q.add("form-delete", id, {
            backoff: {
              type: "exponential",
              delay: 1000,
            },
            attempts: 5,
          });
        }
      });
    } catch (error) {
      // Handle the error appropriately
      console.error("Error during transaction:", error);
      throw new HttpException(
        "Failed to delete form",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

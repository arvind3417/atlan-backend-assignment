import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FormService } from "./form/form.service";
import { QuestionsController } from "./question/question.controller";
import { QuestionService } from "./question/question.service";
import { AnswersController } from "./answer/answer.controller";
import { ResponsesController } from "./response/response.controller";
import { AnswerService } from "./answer/answer.service";
import { ResponsesService } from "./response/response.service";
import { BullModule } from "@nestjs/bull";
import { UploadProcessor } from "./queue-bull/q.processor";
import { FormsController } from "./form/form.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: "GOOGLE",
        transport: Transport.TCP,
        options: {
          host: "google",
          port: 3002,
        },
      },

      {
        name: "RESPONSE_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "response-handler",
          port: 4000,
        },
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: "redis",
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "q1",
    }),
  ],
  controllers: [
    FormsController,
    QuestionsController,
    AnswersController,
    ResponsesController,
  ],
  providers: [
    PrismaService,
    FormService,
    QuestionService,
    AnswerService,
    ResponsesService,
    UploadProcessor,
  ],
})
export class FormsModule {}

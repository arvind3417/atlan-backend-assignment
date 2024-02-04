// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { ResponseHandlerService } from './services/response-handler.service';
// import { LoggingHandler } from './use-cases/logging-handler';
// import { EmailHandler } from './use-cases/email-handler';
// import { ResponsesController } from './controllers/responses.controller';

// @Module({
//   controllers: [ResponsesController],
//   providers: [ResponseHandlerService, LoggingHandler, EmailHandler],
// })
// export class AppModule {
//   constructor(
//     private readonly responseHandlerService: ResponseHandlerService,
//     private readonly loggingHandler: LoggingHandler,
//     private readonly emailHandler: EmailHandler,
//   ) {
//     // Register the handlers
//     this.responseHandlerService.registerHandler(loggingHandler);
//     this.responseHandlerService.registerHandler(emailHandler);
//   }
// }

// src/forms/forms.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { FormService } from './form/form.service';
import { QuestionsController } from './question/question.controller';
import { QuestionService } from './question/question.service'; 
import { AnswersController } from './answer/answer.controller';
import { ResponsesController } from './response/response.controller'; 
import { AnswerService } from './answer/answer.service';
import { ResponsesService } from './response/response.service';

@Module({
  imports:[
    ConfigModule.forRoot({ isGlobal: true }),

  ],
  controllers: [ QuestionsController, AnswersController, ResponsesController],
  providers: [PrismaService, FormService, QuestionService, AnswerService, ResponsesService],
})
export class FormsModule {}

import { NestFactory } from '@nestjs/core';
import { FormsModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(FormsModule);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestConnectionService } from './config/testConection';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const testConnectionService = app.get(TestConnectionService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  console.log('Testing database connection...');
  await testConnectionService.testConnection();
  await app.listen(process.env.PORT ?? 9999);
}

console.log(`Server running on ${process.env.PORT ?? 9999}`);
bootstrap();

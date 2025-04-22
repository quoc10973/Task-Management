import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestConnectionService } from './config/testConection';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const testConnectionService = app.get(TestConnectionService);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  console.log('Testing database connection...');
  await testConnectionService.testConnection();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL!],
      queue: 'task_queue', // same as the one registered in the RabbitMQModule
      queueOptions: {
        durable: true,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 9999);
}

console.log(`Server running on ${process.env.PORT ?? 9999}`);
bootstrap();

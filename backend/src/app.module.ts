import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestConnectionService } from './config/testConection';
import { User } from './module/user/user.entity';
import { Task } from './module/task/task.entity';
import { UserModule } from './module/user/user.module';
import { TaskModule } from './module/task/task.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from './module/rabbitmq/rabbitmq.module';
import { TaskLog } from './module/tasklog/tasklog.entity';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [User, Task, TaskLog],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.get<string>('RABBITMQ_URL')!],
            queue: 'task_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    UserModule,
    TaskModule,
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConnectionService],
})
export class AppModule { }

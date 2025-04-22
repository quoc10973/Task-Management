import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskLog } from '../tasklog/tasklog.entity';
import { User } from '../user/user.entity';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { TaskProcessorService } from './task.processor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskLog, User]),
    RabbitMQModule
  ],
  providers: [TaskService, TaskProcessorService],
  controllers: [TaskController, TaskProcessorService],
})
export class TaskModule { }

import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { TaskService } from './task.service';

@Controller()
export class TaskProcessorService {
    constructor(private readonly taskService: TaskService) { }

    // Listen for a message from RabbitMQ when a task is completed
    @EventPattern('task.completed')
    async handleTaskCompleted(@Payload() data: { taskId: number; userId: number }) {
        const { taskId, userId } = data;
        console.log('📥 Worker received:', data);
        await this.taskService.markTaskAsCompleted(taskId, userId);
    }
}

import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from 'src/dto/createTaskDTO';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    // Admin create task
    @Post()
    async createTask(@Body() dto: CreateTaskDto) {
        return await this.taskService.createTask(dto);
    }

    // User view available tasks
    @Get('available')
    async getAvailableTasks() {
        return await this.taskService.getAvailableTasks();
    }

    @Get('user/:userId')
    async getTaskByUserId(@Param('userId', ParseIntPipe) userId: number) {
        try {
            return await this.taskService.getTaskByUserId(userId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    // User take a task
    @Post(':taskId/assign/:userId')
    async assignTask(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return await this.taskService.assignTask(taskId, userId);
    }

    // When user completes a task, send to RabbitMQ for processing
    @Post(':taskId/complete/:userId')
    async completeTask(
        @Param('taskId', ParseIntPipe) taskId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return await this.taskService.completeTask(taskId, userId);
    }
}

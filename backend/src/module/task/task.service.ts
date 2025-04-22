import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskStatus } from './task.entity';
import { Not, Repository } from 'typeorm';
import { TaskLog } from '../tasklog/tasklog.entity';
import { User } from '../user/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto } from 'src/dto/createTaskDTO';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepo: Repository<Task>,

        @InjectRepository(TaskLog)
        private readonly taskLogRepo: Repository<TaskLog>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @Inject('RABBITMQ_SERVICE')
        private readonly rabbitClient: ClientProxy,
    ) { }

    // Admin create task
    async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
        const task = this.taskRepo.create(createTaskDTO);
        return await this.taskRepo.save(task);
    }

    // User view available tasks
    async getAvailableTasks(): Promise<Task[]> {
        return this.taskRepo.find({
            where: { status: TaskStatus.AVAILABLE },
        });
    }

    // User assign a task
    async assignTask(taskId: number, userId: number): Promise<Task> {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const existingTask = await this.taskRepo.findOne({
            where: {
                assignedTo: { id: userId },
                status: Not(TaskStatus.COMPLETED),
            },
        });

        if (existingTask) {
            throw new BadRequestException('You already have an active task');
        }

        const task = await this.taskRepo.findOne({
            where: { id: taskId, status: TaskStatus.AVAILABLE },
        });

        if (!task) throw new NotFoundException('Task not available');

        task.status = TaskStatus.IN_PROGRESS;
        task.assignedTo = user;
        return this.taskRepo.save(task);
    }

    // Send message to RabbitMQ when user completes a task
    async completeTask(taskId: number, userId: number) {
        const task = await this.taskRepo.findOne({
            where: { id: taskId },
            relations: ['assignedTo'],
        });

        if (!task) throw new NotFoundException('Task not found');
        if (task.assignedTo?.id !== userId)
            throw new BadRequestException('This task is not assigned to you');
        if (task.status !== TaskStatus.IN_PROGRESS)
            throw new BadRequestException('Task is not in progress');

        // Gửi message đến queue
        await this.rabbitClient.emit('task.completed', {
            taskId,
            userId,
        });

        return { message: 'Task completion requested. Waiting for processing.' };
    }

    // Worker sẽ gọi hàm này để xử lý update DB
    async markTaskAsCompleted(taskId: number, userId: number): Promise<void> {
        console.log("Marking task as completed in DB...");
        const task = await this.taskRepo.findOne({ where: { id: taskId } });
        if (!task) throw new NotFoundException('Task not found');

        task.status = TaskStatus.COMPLETED;
        await this.taskRepo.save(task);

        await this.taskLogRepo.save({
            taskId,
            performedBy: userId,
            action: 'status_updated',
        });
    }
}

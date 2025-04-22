import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taskId: number;

    @Column()
    action: string; // e.g. "status_updated"

    @Column()
    performedBy: number; // userId

    @CreateDateColumn()
    timestamp: Date;
}

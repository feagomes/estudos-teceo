import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn} from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({default: false})
    status: boolean;

    @Column({ type: 'date', nullable: true })
    deadline: string;

    @DeleteDateColumn()
    deleted_at: Date;

    @CreateDateColumn()
    created_at: Date;
}


import {Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn} from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({nullable: true})
    descricao: string;

    @Column({default: false})
    status: boolean;

    @Column({ type: 'date', nullable: true })
    deadline: string;

    @DeleteDateColumn()
    deleted_at: Date;
}


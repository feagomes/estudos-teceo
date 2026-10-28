import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { type Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepo.create(createTaskDto);
    return this.taskRepo.save(task);
  }

  findAll() {
    return this.taskRepo.find();
  }

  async findOne(id: number) {
    try {
      return await this.taskRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepo.save(task);
  }
  
  async softRemove(id: number) {
    const task = await this.findOne(id);
    return this.taskRepo.softRemove(task);
  }
}

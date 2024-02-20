import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from '@prisma/client';
import { ListTaskDto } from './dto/list-task-dto';

@Injectable()
export class TasksService {
  constructor(private prismaservice: PrismaService) {}

  async addTask(userId: string, dtocreate: CreateTaskDto): Promise<Task> {
    const task = await this.prismaservice.task.create({
      data: {
        id: uuidv4(),
        title: dtocreate.title,
        content: dtocreate.content,
        status: dtocreate.status,
        userId: userId,
      },
    });
    return task;
  }
  async GetAllTask(UserID: string): Promise<ListTaskDto[]> {
    const task = await this.prismaservice.task.findMany({
      where: {
        userId: UserID,
      },
    });
    const tasks: ListTaskDto[] = task.map((tas) => ({
      id: tas.id,
      title: tas.title,
      content: tas.content,
      status: tas.status,
    }));
    return tasks;
  }
  async GetTaskByid(UserId: string, TaskId: string): Promise<Task> {
    const task = await this.prismaservice.task.findFirst({
      where: {
        userId: UserId,
        id: TaskId,
      },
    });
    return task;
  }
  async UpdateStatus(
    UserId: string,
    TaskId: string,
    status: TaskStatus,
  ): Promise<Task> {
    const updatedTask = await this.prismaservice.task.update({
      where: {
        userId: UserId,
        id: TaskId,
      },
      data: {
        status: status,
      },
    });
    if (!updatedTask) {
      throw new ForbiddenException('Task not found');
    }
    return updatedTask;
  }
  async UpdateTask(
    UserId: string,
    TaskId: string,
    dtoUpdate: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.prismaservice.task.update({
      where: {
        userId: UserId,
        id: TaskId,
      },
      data: {
        title: dtoUpdate.title,
        content: dtoUpdate.content,
      },
    });
    if (!task) throw new ForbiddenException('Task not found');
    return task;
  }
  async DeleteTask(UserId: string, TaskId: string): Promise<boolean> {
    const task = await this.prismaservice.task.delete({
      where: {
        userId: UserId,
        id: TaskId,
      },
    });
    if (!task) throw new ForbiddenException('Task not found');
    return true;
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetCurrentUserId } from '../common/decorators';
import { Task, TaskStatus } from '@prisma/client';
import { ListTaskDto } from './dto/list-task-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async addTask(
    @GetCurrentUserId() UserId: string,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    console.log('content is : ' + dto.content);
    return await this.tasksService.addTask(UserId, dto);
  }

  @Get('/list')
  @HttpCode(HttpStatus.FOUND)
  async listTasks(@GetCurrentUserId() UserId: string): Promise<ListTaskDto[]> {
    return await this.tasksService.GetAllTask(UserId);
  }
  @Get('/getTaskByid/:taskId')
  @HttpCode(HttpStatus.OK)
  async getTaskById(
    @GetCurrentUserId() UserId: string,
    @Param('taskId') taskId: string,
  ): Promise<Task> {
    return await this.tasksService.GetTaskByid(UserId, taskId);
  }

  @Put('/update-status/:taskId')
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @GetCurrentUserId() UserId: string,
    @Param('taskId') TaskId: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return await this.tasksService.UpdateStatus(UserId, TaskId, status);
  }

  @Patch('/update-Task/:taskId')
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @GetCurrentUserId() UserId: string,
    @Param('taskId') TaskId: string,
    @Body() dtoUpdate: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.UpdateTask(UserId, TaskId, dtoUpdate);
  }

  @Delete('/delete-task/:taskId')
  @HttpCode(HttpStatus.OK)
  async deleteTask(
    @GetCurrentUserId() UserId: string,
    @Param('taskId') TaskId: string,
  ): Promise<boolean> {
    return await this.tasksService.DeleteTask(UserId, TaskId);
  }
  @Get('test')
  test(): string {
    return 'Hello';
  }
}

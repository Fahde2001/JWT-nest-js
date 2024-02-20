import { OmitType } from '@nestjs/mapped-types';
import { TaskEnity } from '../entities/task.entity';

export class CreateTaskDto extends OmitType(TaskEnity, [
  'id',
  'createdAt',
  'updatedAt',
  'userId',
]) {}

import { OmitType, PartialType } from '@nestjs/mapped-types';
import { TaskEnity } from '../entities/task.entity';

export class UpdateTaskDto extends OmitType(TaskEnity, [
  'id',
  'createdAt',
  'status',
  'updatedAt',
  'userId',
]) {}

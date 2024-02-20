import { OmitType } from '@nestjs/mapped-types';
import { TaskEnity } from '../entities/task.entity';

export class ListTaskDto extends OmitType(TaskEnity, [
  'createdAt',
  'updatedAt',
  'userId',
]) {}

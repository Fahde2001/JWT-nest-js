import { Task, TaskStatus } from '@prisma/client';

export class TaskEnity implements Task {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  status: TaskStatus;
  userId: string;
}

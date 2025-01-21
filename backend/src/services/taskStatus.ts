import { PrismaClient, task_status } from "@prisma/client";

const prisma = new PrismaClient();

class TaskStatusService {
  async getTaskStatus(): Promise<task_status[] | null> {
    return await prisma.task_status.findMany();
  }
}

export default TaskStatusService;

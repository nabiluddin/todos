import { PrismaClient, task } from "@prisma/client";

const prisma = new PrismaClient();

class TaskService {
  async getTasks(): Promise<task[] | null> {
    const tasks: task[] = await prisma.task.findMany()
    return tasks.sort((a, b) => a.due_date && b.due_date ? a.due_date.getTime() - b.due_date.getTime() : 0)
  }

  async getTaskById(id: string): Promise<task | null> {
    return await prisma.task.findUnique({ where: { id } });
  }

  async createTask(taskData: Omit<task, "id">): Promise<task> {
    return await prisma.task.create({ data: taskData });
  }

  async updateTask(id: string, taskData: Partial<task>): Promise<task> {
    return await prisma.task.update({
      where: { id },
      data: taskData,
    });
  }

  async deleteTask(id: string): Promise<task> {
    return await prisma.task.delete({
      where: { id },
    });
  }
}

export default TaskService;

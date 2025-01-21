import { Request, Response } from "express";
import TaskStatusService from "../services/taskStatus";
import ErrorHandler from "../utils/errorHandler";

const taskService = new TaskStatusService();

class TaskStatusController {
  async getTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const taskStatus = await taskService.getTaskStatus();
      res.status(200).json({ success: true, data: taskStatus });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }
}

export default TaskStatusController;

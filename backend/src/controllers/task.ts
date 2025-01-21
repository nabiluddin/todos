import { Request, Response } from "express";
import { task } from "@prisma/client";
import TaskService from "../services/task";
import ErrorHandler from "../utils/errorHandler";

const taskService = new TaskService();

class TaskController {
  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getTasks();
      res.status(200).json({ success: true, data: tasks });
      return;
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await taskService.getTaskById(id);

      if (!task) {
        res.status(404).json({ success: false, message: "Task not found" });
        return;
      }

      res.status(200).json({ success: true, data: task });
      return;
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskData: Omit<task, "id"> = req.body;
      const newTask = await taskService.createTask(taskData);
      res.status(201).json({ success: true, data: newTask, message: "New task created successfully!" });
      return;
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const taskData: Partial<task> = req.body;
      const updatedTask = await taskService.updateTask(id, taskData);

      if (!updatedTask) {
        res.status(404).json({ success: false, message: "Task not found" });
        return;
      }

      res.status(200).json({ success: true, data: updatedTask, message: "Task updated successfully!" });
      return;
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedTask = await taskService.deleteTask(id);
      
      if (!deletedTask) {
        res.status(404).json({ success: false, message: "Task not found" });
        return;
      }

      res.status(200).json({ success: true, data: deletedTask, message: "Task deleted successfully!" });
      return;
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }
}

export default TaskController;

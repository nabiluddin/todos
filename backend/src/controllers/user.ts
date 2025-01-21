import { Request, Response } from "express";
import UserService from "../services/user";
import { Prisma } from "@prisma/client";
import ErrorHandler from "../utils/errorHandler";

const userService = new UserService();

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: Prisma.userCreateInput = req.body;
      const newUser = await userService.createUser(userData);
      res.status(201).json({ success: true, data: newUser });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async getUserTasks(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const tasks = await userService.getUserTasks(id);

      res.status(200).json({ success: true, data: tasks.sort((a, b) => a.due_date && b.due_date ? a.due_date.getTime() - b.due_date.getTime() : 0) });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }
}

export default UserController;

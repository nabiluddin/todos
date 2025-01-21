import express from "express";
import TaskController from "../controllers/task";

const router = express.Router();

const taskController = new TaskController();

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);


export default router;
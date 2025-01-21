import express from "express";
import TaskStatusController from "../controllers/taskStatus";

const router = express.Router();

const taskStatusController = new TaskStatusController();

router.get('/', taskStatusController.getTaskStatus);
// router.get('/:id', taskStatusController.getTaskStatusById);
// router.post('/', taskStatusController.createTaskStatus);
// router.put('/:id', taskStatusController.updateTaskStatus);
// router.delete('/:id', taskStatusController.deleteTaskStatus);


export default router;
import express from "express";
import UserController from "../controllers/user";

const router = express.Router();

const userController = new UserController();

router.get("/", userController.getUsers);
router.get('/:id/tasks', userController.getUserTasks);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
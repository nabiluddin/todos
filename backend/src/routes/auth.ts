import express from "express"
import AuthController from "../controllers/auth";

const router = express.Router();

const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/check-auth', authController.checkAuth);

export default router;
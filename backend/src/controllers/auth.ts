import { Request, Response } from "express";
import AuthService from "../services/auth";
import UserService from "../services/user";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import OmitSensitiveData from "../utils/omitSensitiveSata";
import { sensitiveFields } from "../enum/authUser";

const authService = new AuthService();
const userService = new UserService();

class AuthController {
  async signup(req: Request, res: Response): Promise<void> {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      res.status(400).json({ success: false, error: "All fields (username, password, email) are required!" });
      return;
    }

    try {
      const existingUser = await userService.getUserVerify(email);
      if (existingUser) {
        res.status(409).json({ success: false, error: "User already exists!" });
        return;
      }

      const newUser = await authService.signup(username, password, email);
      res.status(201).json({
        success: true,
        message: "Signup successfully!",
        user: newUser,
      });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: "All fields (email, password) are required!" });
      return;
    }

    try {
      const user = await userService.getUserVerify(email);
      if (!user) {
        res.status(404).json({ success: false, error: "User not found!" });
        return;
      }

      const isPasswordValid = authService.validatePassword(password, user.password_hash);
      if (!isPasswordValid) {
        res.status(401).json({ success: false, error: "Invalid email or password!" });
        return;
      }

      const token = authService.generateToken({ email: user.email, id: user.id });
      res.cookie("token", token, { httpOnly: true, maxAge: 86400000 });
      if (user) {
        OmitSensitiveData(user, sensitiveFields)
      }
      res.status(200).json({ success: true, message: "Logged in successfully!", user: user });
    } catch (error: unknown) {
      ErrorHandler(res, error);
    }
  }

  async logout(_: Request, res: Response): Promise<void> {
    res.clearCookie("token", { httpOnly: true });
    res.status(200).json({ success: true, message: "Logged out successfully!" });
  }

  async checkAuth(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies.token;
      if (!token) {
        res.status(401).json({ success: false, error: "Unauthorized access!" });
        return;
      }
      jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
      res.status(200).json({ success: true, message: "Authenticated!" });
    } catch {
      res.status(401).json({ success: false, error: "Unauthorized access!" });
    }
  }
}

export default AuthController;

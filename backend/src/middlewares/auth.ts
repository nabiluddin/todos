import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const isLoggedin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ success: false, error: "Unauthorized access." });
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    return next()
  } catch (error) {
    res.status(401).json({ success: false, error: "Unauthorized access." });
    return;
  }
};

export default isLoggedin;

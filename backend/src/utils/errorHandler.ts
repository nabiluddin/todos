import { Response } from "express";

const ErrorHandler = (res: Response, error: unknown): void => {
  if (error instanceof Error || error instanceof TypeError) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
    return;
  }
  res.status(500).json({
    success: false,
    message: "An unknown error occurred",
  });
  return;
}
export default ErrorHandler
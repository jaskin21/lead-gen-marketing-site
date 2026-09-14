import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error("Unhandled error:", err);

  res.status(500).json({
    success: false,
    error: "Something went wrong on our end. Please try again later.",
  });
}

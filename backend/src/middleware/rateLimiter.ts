import { Request, Response, NextFunction } from "express";

const recentSubmissions = new Map<string, number>();
const WINDOW_MS = 10_000; // 10 seconds

export function preventDuplicateSubmission(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const email = req.body?.email?.toLowerCase()?.trim();

  if (!email) {
    return next(); // let validation handle missing email
  }

  const lastSubmitted = recentSubmissions.get(email);
  const now = Date.now();

  if (lastSubmitted && now - lastSubmitted < WINDOW_MS) {
    return res.status(429).json({
      success: false,
      error:
        "You've already submitted this form. Please wait a moment before trying again.",
    });
  }

  recentSubmissions.set(email, now);
  next();
}

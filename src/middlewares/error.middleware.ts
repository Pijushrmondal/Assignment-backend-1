import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    res.status(400).json({
      error: "VALIDATION_ERROR",
      details: err.errors,
    });
    return;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    res.status(400).json({
      error: "DUPLICATE_ERROR",
      message: "Resource already exists",
    });
    return;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({ error: "INVALID_TOKEN" });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({ error: "TOKEN_EXPIRED" });
    return;
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || "SERVER_ERROR",
  });
};

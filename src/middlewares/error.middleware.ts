import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      details: err.errors,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      error: "DUPLICATE_ERROR",
      message: "Resource already exists",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "TOKEN_EXPIRED" });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || "SERVER_ERROR",
  });
};

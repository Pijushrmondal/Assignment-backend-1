import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "ADMIN" | "EDITOR";
  };
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      id: string;
      role: "ADMIN" | "EDITOR";
    };
    (req as AuthRequest).user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export const editorOnly = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthRequest;
  if (!authReq.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (authReq.user.role !== "EDITOR" && authReq.user.role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  next();
};

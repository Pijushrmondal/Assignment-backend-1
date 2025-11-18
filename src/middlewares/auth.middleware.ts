import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "ADMIN" | "EDITOR";
  };
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      id: string;
      role: "ADMIN" | "EDITOR";
    };
    (req as AuthRequest).user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const editorOnly = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthRequest;
  if (!authReq.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (authReq.user.role !== "EDITOR" && authReq.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

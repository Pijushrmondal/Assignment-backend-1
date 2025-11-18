import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // For query params, validate req.query
      if (req.method === "GET") {
        const result = schema.safeParse(req.query);
        if (!result.success) {
          return res.status(400).json({
            error: "VALIDATION_ERROR",
            details: result.error.flatten().fieldErrors,
          });
        }
        req.query = result.data as any;
      } else {
        // For body params, validate req.body
        const result = schema.safeParse(req.body);
        if (!result.success) {
          return res.status(400).json({
            error: "VALIDATION_ERROR",
            details: result.error.flatten().fieldErrors,
          });
        }
        req.body = result.data;
      }
      next();
    } catch (error) {
      return res.status(400).json({ error: "VALIDATION_ERROR" });
    }
  };
};

// Special validator for params
export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          error: "VALIDATION_ERROR",
          details: result.error.flatten().fieldErrors,
        });
      }
      req.params = result.data as any;
      next();
    } catch (error) {
      return res.status(400).json({ error: "VALIDATION_ERROR" });
    }
  };
};

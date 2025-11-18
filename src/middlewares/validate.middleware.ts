import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // For query params, validate req.query
      if (req.method === "GET") {
        const result = schema.safeParse(req.query);
        if (!result.success) {
          res.status(400).json({
            error: "VALIDATION_ERROR",
            details: result.error.flatten().fieldErrors,
          });
          return;
        }
        req.query = result.data as any;
      } else {
        // For body params, validate req.body
        const result = schema.safeParse(req.body);
        if (!result.success) {
          res.status(400).json({
            error: "VALIDATION_ERROR",
            details: result.error.flatten().fieldErrors,
          });
          return;
        }
        req.body = result.data;
      }
      next();
    } catch (error) {
      res.status(400).json({ error: "VALIDATION_ERROR" });
      return;
    }
  };
};

// Special validator for params
export const validateParams = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.params);
      if (!result.success) {
        res.status(400).json({
          error: "VALIDATION_ERROR",
          details: result.error.flatten().fieldErrors,
        });
        return;
      }
      req.params = result.data as any;
      next();
    } catch (error) {
      res.status(400).json({ error: "VALIDATION_ERROR" });
      return;
    }
  };
};

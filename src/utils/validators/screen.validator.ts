import { z } from "zod";

export const getScreensValidator = z.object({
  search: z.string().optional(),
  page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? Number(val) : 10)),
});

export const createScreenValidator = z.object({
  name: z.string().min(1, "Name is required").trim(),
  isActive: z.boolean().optional().default(true),
});

export const toggleScreenValidator = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
});

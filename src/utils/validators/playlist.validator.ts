import { z } from "zod";

export const createPlaylistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  itemUrls: z
    .array(z.string().url("Invalid URL"))
    .max(10, "Maximum 10 URLs allowed")
    .optional()
    .default([]),
});

export const getPlaylistsValidator = z.object({
  search: z.string().optional(),
  page: z.string().optional().transform((val) => (val ? Number(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? Number(val) : 10)),
});

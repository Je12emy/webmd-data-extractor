import * as z from "zod";

export const PaginatedAgileResponseSchema = z.object({
  maxResults: z.number(),
  startAt: z.number(),
  isLast: z.boolean(),
});

export const PaginatedApiResponseSchema = z.object({
  expand: z.string(),
  maxResults: z.number(),
  startAt: z.number(),
  total: z.number(),
});

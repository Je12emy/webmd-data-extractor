import * as z from "zod";

export const PaginatedAgileResponseSchema = <T extends z.ZodType>(values: T) =>
  z.object({
    maxResults: z.number(),
    startAt: z.number(),
    isLast: z.boolean(),
    values: z.array(values),
  });

export const PaginatedApiResponseSchema = z.object({
  expand: z.string(),
  maxResults: z.number(),
  startAt: z.number(),
  total: z.number(),
});

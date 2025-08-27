import * as z from "zod";

export const PaginatedResponseSchema = <T extends z.ZodType>(values: T) =>
  z.object({
    maxResults: z.number(),
    startAt: z.number(),
    isLast: z.boolean(),
    values: z.array(values),
  });

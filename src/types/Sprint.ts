import * as z from "zod";

export const SprintValidationSchema = z.object({
  id: z.number(),
  name: z.string(),
  state: z.enum(["closed", "active", "future"]),
  startDate: z.iso.datetime({ offset: true }),
  endDate: z.iso.datetime({ offset: true }),
  completeDate: z.iso.datetime({ offset: true }),
});

export type Sprint = z.infer<typeof SprintValidationSchema>;

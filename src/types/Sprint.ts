import * as z from "zod";

export const SprintValidationSchema = z.object({
  id: z.number(),
  name: z.string(),
  state: z.enum(["closed", "active", "future"]),
  startDate: z.iso.datetime({ offset: true }).nullish(),
  endDate: z.iso.datetime({ offset: true }).nullish(),
  completeDate: z.iso.datetime({ offset: true }).nullish(),
});

export type Sprint = z.infer<typeof SprintValidationSchema>;

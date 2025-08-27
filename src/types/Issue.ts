import * as z from "zod";
import { PaginatedApiResponseSchema } from "./Jira/PaginatedResponse";
import { SprintValidationSchema } from "./Sprint";

export const IssueValidationSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
  key: z.string(),
  fields: z.object({
    closedSprints: z.array(SprintValidationSchema),
  }),
});

export const PaginatedIssueSchema = PaginatedApiResponseSchema.extend({
  issues: z.array(IssueValidationSchema),
});

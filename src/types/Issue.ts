import * as z from "zod";
import { PaginatedApiResponseSchema } from "./Jira/PaginatedResponse";
import { SprintValidationSchema } from "./Sprint";

export const IssueValidationSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
  key: z.string(),
  fields: z.object({
    closedSprints: z.array(SprintValidationSchema),
    sprint: SprintValidationSchema.nullish(),
  }),
});

export const PaginatedIssueSchema = PaginatedApiResponseSchema.extend({
  issues: z.array(IssueValidationSchema),
});

export type Issues = z.infer<typeof IssueValidationSchema>[];

/**
 *
 * @param sprintId
 * @param issues
 * @returns
 */
export function FilterForIncompleteIssuesInSprint(
  sprintId: number,
  issues: Issues
) {
  return issues.filter(
    (issue) => issue.fields.closedSprints[0].id !== sprintId
  );
}

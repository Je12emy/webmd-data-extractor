import * as z from "zod";
import { PaginatedApiResponseSchema } from "./Jira/PaginatedResponse";
import { sprintSchema } from "./Sprint";

export const IssueValidationSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
  key: z.string(),
  fields: z.object({
    closedSprints: z.array(sprintSchema),
    sprint: sprintSchema.nullish(),
  }),
});

export const PaginatedIssueSchema = PaginatedApiResponseSchema.extend({
  issues: z.array(IssueValidationSchema),
});

export type IssuesData = z.infer<typeof IssueValidationSchema>[];

/**
 *
 * @param sprintId
 * @param issues
 * @returns
 */
export function FilterForIncompleteIssuesInSprint(
  sprintId: number,
  issues: IssuesData
) {
  return issues.filter(
    (issue) => issue.fields.closedSprints[0].id !== sprintId
  );
}

import * as z from "zod";
import { Jira } from "api";
import { PaginatedAgileResponseSchema } from "./Jira/PaginatedResponse";
import { IssuesData, PaginatedIssueSchema } from "./Issue";

export const sprintSchema = z.object({
  id: z.number(),
  name: z.string(),
  state: z.enum(["closed", "active", "future"]),
  startDate: z.iso.datetime({ offset: true }).nullish(),
  endDate: z.iso.datetime({ offset: true }).nullish(),
  completeDate: z.iso.datetime({ offset: true }).nullish(),
});
export const paginatedSprintSchema = PaginatedAgileResponseSchema.extend({
  values: z.array(sprintSchema),
});

export type SprintData = z.infer<typeof sprintSchema>;

export type SprintCompletion = {
  id: number;
  name: string;
  completion: number;
  startDate?: string;
  endDate?: string;
};

export class Sprint {
  private _sprint: SprintData;
  private _issues: IssuesData;
  private _jira: Jira;
  _completition: number;

  constructor(data: SprintData, jira: Jira) {
    this._sprint = data;
    this._jira = jira;
    this._issues = [];
    this._completition = 0;
  }

  static async Initialize(jira: Jira, data: SprintData) {
    const sprint = new Sprint(data, jira);

    const issues = await sprint.getIssues();
    sprint._issues = [...issues];

    const incomplete = sprint.calculateIncompleteIssues();
    const completion = 100 - (incomplete / sprint._issues.length) * 100;
    sprint._completition = Math.floor(completion);

    return sprint;
  }

  private calculateIncompleteIssues() {
    /*
     * Closed sprints keep a history of where this issue has been part of
     * since it is an ordered list, you can check if the last sprint is the currently
     * selected sprint to determine if the issue was closed there.
     *  */
    return this._issues.filter(
      (x) => x.fields.closedSprints[0].id !== this._sprint.id
    ).length;
  }

  private async getIssues() {
    const response = await this._jira.fetchJira(
      `/sprint/${this._sprint.id}/issue`
    );
    const data = await response.json();
    const result = await PaginatedIssueSchema.parseAsync(data);
    return result.issues;
  }
}

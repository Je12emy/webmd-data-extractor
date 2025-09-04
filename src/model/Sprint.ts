import { Jira } from "api";
import { Issue, PaginatedIssue } from "./Issue";
import { Pagination } from "./Pagination";

export type PaginatedSprint = Pagination & {
  values: SprintData[];
};

export type SprintData = Omit<
  Sprint,
  | "calculateIncompleteIssues"
  | "completition"
  | "issues"
  | "getIncompleteIssues"
>;

type SprintState = "closed" | "active" | "future";

export class Sprint {
  id: number;
  name: string;
  state: SprintState;

  startDate?: string;
  endDate?: string;
  completeDate?: string;

  issues: Issue[];
  completition: number;

  constructor(
    id: number,
    name: string,
    state: SprintState,
    issues: Issue[],
    startDate?: string,
    endDate?: string,
    completeDate?: string
  ) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.startDate = startDate;
    this.endDate = endDate;
    this.completeDate = completeDate;
    this.issues = issues;
    this.completition = 0;
  }

  static async Initialize(
    id: number,
    name: string,
    state: SprintState,
    jira: Jira,
    startDate?: string,
    endDate?: string,
    completeDate?: string
  ) {
    const issues = await this.fetchIssues(jira, id);
    const sprint = new Sprint(
      id,
      name,
      state,
      issues,
      startDate,
      endDate,
      completeDate
    );

    const incomplete = sprint.getIncompleteIssues();
    const completion = 100 - (incomplete.length / sprint.issues.length) * 100;
    sprint.completition = Math.floor(completion);

    return sprint;
  }

  getIncompleteIssues() {
    /*
     * Closed sprints keep a history of where this issue has been part of
     * since it is an ordered list, you can check if the last sprint is the currently
     * selected sprint to determine if the issue was closed there.
     *  */
    return this.issues.filter((x) => {
      if (x.fields.closedSprints.length == 0) {
        // The issue has not been closed in any sprint
        return true;
      }
      // Was recently closed in another sprint
      const mostRecent = x.fields.closedSprints[0];
      return mostRecent.id !== this.id;
    });
  }

  private static async fetchIssues(jira: Jira, sprintId: number) {
    const response = await jira.fetchAgile(`/sprint/${sprintId}/issue`);
    const json = (await response.json()) as PaginatedIssue;
    let data = json.issues.map((x) => new Issue(x.id, x.key, x.fields));
    return data;
  }
}

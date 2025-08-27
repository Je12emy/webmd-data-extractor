import { PaginatedIssueSchema } from "./types/Issue";
import { PaginatedAgileResponseSchema } from "./types/Jira/PaginatedResponse";
import { Sprint, SprintValidationSchema } from "./types/Sprint";

export class JiraHttpClient {
  readonly baseUrl: string;
  private apiEndpoint: string;
  private agileEndpoint: string;
  private accessToken: string;
  private requestInit: RequestInit;

  constructor(baseUrl: string, accessToken: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.apiEndpoint = `${this.baseUrl}/rest/api/2`;
    this.agileEndpoint = `${this.baseUrl}/rest/agile/1.0`;
    this.requestInit = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  }

  async GetBoardById(id: number) {
    const data = await fetch(`${this.agileEndpoint}/board/${id}`, {
      ...this.requestInit,
    });
    return await data.json();
  }

  async GetBoardSprints(id: number) {
    let fetchMore = true;
    let cursor = 0;
    let data: Sprint[] = [];
    const schema = PaginatedAgileResponseSchema(SprintValidationSchema);

    while (fetchMore) {
      console.debug("Fetching sprints...");
      const response = await this.fetchBoardSprintData(id, cursor);
      const result = await schema.parseAsync(await response.json());
      if (result.isLast) {
        fetchMore = false;
      }
      cursor += result.maxResults;
      data = [...data, ...result.values];
      console.debug("Fetching more sprints...");
    }
    console.trace(data);
    return data;
  }

  async getIssuesForSprint(sprintId: number) {
    const url = `${this.agileEndpoint}/sprint/${sprintId}/issue`;
    const response = await fetch(url, {
      ...this.requestInit,
    });
    const data = await response.json();
    const result = await PaginatedIssueSchema.parseAsync(data);
    return result.issues;
  }

  private async fetchBoardSprintData(boardId: number, startAt: number = 0) {
    return await fetch(
      `${this.agileEndpoint}/board/${boardId}/sprint?state=closed&startAt=${startAt}`,
      {
        ...this.requestInit,
      }
    );
  }
}

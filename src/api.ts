import { PaginatedIssueSchema } from "./types/Issue";

export class Jira {
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

  async getIssuesForSprint(sprintId: number) {
    const url = `${this.agileEndpoint}/sprint/${sprintId}/issue`;
    const response = await fetch(url, {
      ...this.requestInit,
    });
    const data = await response.json();
    const result = await PaginatedIssueSchema.parseAsync(data);
    return result.issues;
  }

  async fetchJira(url: URL | string) {
    return await fetch(`${this.agileEndpoint}${url}`, this.requestInit);
  }
}

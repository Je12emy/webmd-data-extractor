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

  async fetchAgile(url: URL | string) {
    return await fetch(`${this.agileEndpoint}${url}`, this.requestInit);
  }

  async fetchApi(url: URL | string) {
    return await fetch(`${this.apiEndpoint}${url}`, this.requestInit);
  }
}

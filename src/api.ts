export class JiraHttpClient {
  readonly baseUrl: string;
  private apiEndpoint: string;
  private accessToken: string;
  private requestInit: RequestInit;

  constructor(baseUrl: string, accessToken: string) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
    this.apiEndpoint = `${this.baseUrl}/rest/agile/1.0`;
    this.requestInit = {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
  }

  async GetBoardById(id: number) {
    const data = await fetch(`${this.apiEndpoint}/board/${id}`, {
      ...this.requestInit,
    });
    return await data.json();
  }
}

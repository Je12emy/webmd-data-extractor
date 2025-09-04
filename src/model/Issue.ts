import { Pagination } from "./Pagination";
import { SprintData } from "./Sprint";

export type PaginatedIssue = Pagination & {
  issues: Issue[];
};

type Fields = {
  closedSprints: SprintData[];
};

export class Issue {
  id: number;
  key: string;
  fields: Fields;

  constructor(id: number, key: string, fields: Fields) {
    this.id = id;
    this.key = key;
    this.fields = fields;
  }
}

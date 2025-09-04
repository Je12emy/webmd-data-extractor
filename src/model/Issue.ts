import { Jira } from "api";
import { Pagination } from "./Pagination";
import { SprintData } from "./Sprint";

export type PaginatedIssue = Pagination & {
  issues: Issue[];
};

type Fields = {
  closedSprints: SprintData[];
  customfield_10273: number; // Story Points
};

type History = {
  items: {
    field: string;
    from: string;
    to: string;
  }[];
};

type Changelog = Pagination & {
  histories: History[];
};

export class Issue {
  id: number;
  key: string;
  fields: Fields;
  changelog: Changelog;

  constructor(id: number, key: string, fields: Fields, changelog: Changelog) {
    this.id = id;
    this.key = key;
    this.fields = fields;
    this.changelog = changelog;
  }
}

import { PaginatedSprint, Sprint, SprintData } from "./Sprint";
import { Jira } from "../api";

export type BoardData = Pick<Board, "id" | "name">;

export class Board {
  readonly id: number;
  readonly name: string;
  private _selected?: Sprint;
  readonly _sprints: SprintData[] = [];

  private jira: Jira;

  private constructor(
    id: number,
    name: string,
    sprints: SprintData[],
    jira: Jira
  ) {
    this.id = id;
    this.name = name;
    this._sprints = sprints;
    this.jira = jira;
  }

  static async Initialize(id: number, name: string, jira: Jira) {
    const sprints = await this.fetchSprintsByBoardId(jira, id);
    const board = new Board(id, name, sprints, jira);
    return board;
  }

  get sprints() {
    return this._sprints.sort((a, b) => b.id - a.id);
  }

  get selected() {
    return this._selected;
  }

  /**
   * Select a sprint to work with by fetching all issues
   */
  async selectSprint(sprint: SprintData) {
    this._selected = await Sprint.Initialize(
      sprint.id,
      sprint.name,
      sprint.state,
      this.jira,
      sprint.startDate!,
      sprint.endDate!,
      sprint.completeDate!
    );
    return this._selected;
  }

  private static async fetchSprintsByBoardId(jira: Jira, id: number) {
    let more = true;
    let offset = 0;
    let sprints: SprintData[] = [];

    while (more) {
      const response = await jira.fetchAgile(
        `/board/${id}/sprint?state=closed&startAt=${offset}`
      );
      const data = (await response.json()) as PaginatedSprint;

      if (data.isLast) more = false;

      sprints.push(
        ...data.values.map(
          (s) =>
            new Sprint(
              s.id,
              s.name,
              s.state,
              [], // Placeholder, will be fetched when selecting the sprint
              s.startDate!,
              s.endDate!,
              s.completeDate!
            )
        )
      );
      offset += data.maxResults;
    }

    return sprints;
  }
}

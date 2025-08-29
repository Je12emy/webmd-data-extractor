import * as z from "zod";
import { paginatedSprintSchema, Sprint, SprintData } from "./Sprint";
import { Jira } from "api";

export const BoardSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type BoardData = z.infer<typeof BoardSchema>;

export class Board {
  readonly _sprints: SprintData[] = [];
  readonly _jira: Jira;
  _selected?: Sprint;
  _data: BoardData;

  private constructor(data: BoardData, sprints: SprintData[], jira: Jira) {
    this._data = data;
    this._sprints = sprints;
    this._jira = jira;
  }

  static async Initialize(id: number, name: string, jira: Jira) {
    const sprints = await this.fetchSprintsByBoardId(jira, id);
    const board = new Board({ id, name }, sprints, jira);
    return board;
  }

  async selectSprint(sprint: SprintData) {
    this._selected = await Sprint.Initialize(this._jira, sprint);
  }

  private static async fetchSprintsByBoardId(jira: Jira, id: number) {
    let more = true;
    let offset = 0;
    let sprints: SprintData[] = [];

    while (more) {
      const response = await jira.fetchJira(
        `/board/${id}/sprint?state=closed&startAt=${offset}`
      );
      const result = await paginatedSprintSchema.parseAsync(
        await response.json()
      );

      if (result.isLast) more = false;

      sprints.push(...result.values);
      offset += result.maxResults;
    }

    return sprints;
  }
}

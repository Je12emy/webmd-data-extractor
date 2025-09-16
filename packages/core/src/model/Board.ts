import type { Jira } from "../api";
import { type PaginatedSprint, Sprint, type SprintData } from "./Sprint";

export type BoardData = Pick<Board, "id" | "name">;

export class Board {
	readonly id: number;
	readonly name: string;
	private _selected?: Sprint;
	readonly _sprints: SprintData[] = [];

	private jira: Jira;

	private constructor(id: number, name: string, sprints: SprintData[], jira: Jira) {
		this.id = id;
		this.name = name;
		this._sprints = sprints;
		this.jira = jira;
	}

	static async Initialize(id: number, name: string, jira: Jira) {
		const sprints = await Board.fetchSprintsByBoardId(jira, id);
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
	async selectSprint({ id, name, state, startDate, endDate, completeDate }: SprintData) {
		if (!startDate) {
			throw new Error("Sprint start date is required to select a sprint");
		}
		if (!endDate) {
			throw new Error("Sprint end date is required to select a sprint");
		}
		if (!completeDate) {
			throw new Error("Sprint complete date is required to select a sprint");
		}
		this._selected = await Sprint.Initialize(id, name, state, this.jira, startDate, endDate, completeDate);
		return this._selected;
	}

	private static async fetchSprintsByBoardId(jira: Jira, id: number) {
		let more = true;
		let offset = 0;
		const sprints: SprintData[] = [];

		while (more) {
			const response = await jira.fetchAgile(`/board/${id}/sprint?state=closed&startAt=${offset}`);
			const data = (await response.json()) as PaginatedSprint;

			if (data.isLast) more = false;

			sprints.push(
				...data.values.map(
					({ id, name, state, startDate, endDate, completeDate }) =>
						new Sprint(
							id,
							name,
							state,
							[], // Placeholder, will be fetched when selecting the sprint
							startDate,
							endDate,
							completeDate,
						),
				),
			);
			offset += data.maxResults;
		}

		return sprints;
	}
}

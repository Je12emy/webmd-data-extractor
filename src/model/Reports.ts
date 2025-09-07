export type Completion = {
  id: number;
  name: string;
  totalIssues: number;
  incompleteIssues: number;
  completion: number;
  startDate?: string;
  endDate?: string;
};

export type Velocity = {
  sprintId: number;
  sprintName: string;
  member: string;
  issuesCount: number;
  totalPoints: number;
};

export function sortBySprintId(a: Velocity, b: Velocity) {
  return a.sprintId - b.sprintId;
}

export function sortByTeamMemberDesc(a: Velocity, b: Velocity) {
  return b.member.localeCompare(a.member);
}

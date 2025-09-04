export type Completition = {
  id: number;
  name: string;
  totalIssues: number;
  incompleteIssues: number;
  completion: number;
  startDate?: string;
  endDate?: string;
};

export type Velocity = {
  name: string;
  member: string;
  issuesCount: number;
  totalPoints: number;
};

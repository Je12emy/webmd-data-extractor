import { Team } from "types/Team";
import { Jira } from "types/Jira";

export type Config = {
  Teams: Pick<Team, "name">[];
  Jira: Jira;
};

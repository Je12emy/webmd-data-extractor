import { Team } from "@model/Team";
import { Jira } from "@model/Jira";

export type Config = {
  Teams: Pick<Team, "name">[];
  Jira: Jira;
};

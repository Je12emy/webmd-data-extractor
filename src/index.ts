#!/usr/bin/env node
import { FilterForIncompleteIssuesInSprint } from "./types/Issue";
import { JiraHttpClient } from "./api";
import { Command } from "commander";

const program = new Command();
program
  .name("WEBMD Data Extractor")
  .description("A tool to extract data from WEBMDs Jira")
  .version("1.0.0");

(async () => {
  const client = new JiraHttpClient(
    "https://jira.internetbrands.com",
    process.env.ACCESS_TOKEN as string
  );
  // Voltron Board ID: 2028
  // const sprints = await client.GetBoardSprints(2028);
  const sprintId = 37032;
  const issues = await client.getIssuesForSprint(sprintId);
  const notCompleted = FilterForIncompleteIssuesInSprint(sprintId, issues);
  console.log("Completed " + issues.length);
  console.log("Incomplete " + notCompleted.length);
})();

#!/usr/bin/env node
import { JiraHttpClient } from "./api";
import { Command } from "commander";
import { select, Separator } from "@inquirer/prompts";
import { FilterForIncompleteIssuesInSprint } from "./types/Issue";

const program = new Command();

const client = new JiraHttpClient(
  "https://jira.internetbrands.com",
  process.env.ACCESS_TOKEN as string
);

program
  .name("WEBMD Data Extractor")
  .description("A tool to extract data from WEBMDs Jira")
  .version("1.0.0");

program
  .command("sprints")
  .description("Get sprint completition percentage")
  .action(async () => {
    const board = await select({
      message: "Select a board",
      choices: [
        {
          name: "Voltron",
          value: 2028,
        },
      ],
    });

    const sprints = await client.GetBoardSprints(board);
    const sprint = await select({
      message: "Select a sprint",
      choices: [
        ...sprints.map((s) => ({
          name: s.name,
          value: s.id,
        })),
      ],
    });

    const issues = await client.getIssuesForSprint(sprint);
    const notCompleted = FilterForIncompleteIssuesInSprint(sprint, issues);
    console.log("Completed " + issues.length);
    console.log("Incomplete " + notCompleted.length);
    console.log(
      "Complete % " + (100 - (notCompleted.length / issues.length) * 100)
    );
  });

program.parse(process.argv);

// (async () => {
//   const client = new JiraHttpClient(
//     "https://jira.internetbrands.com",
//     process.env.ACCESS_TOKEN as string
//   );
//   // Voltron Board ID: 2028
//   // const sprints = await client.GetBoardSprints(2028);
//   const sprintId = 37032;
//   const issues = await client.getIssuesForSprint(sprintId);
//   const notCompleted = FilterForIncompleteIssuesInSprint(sprintId, issues);
//   console.log("Completed " + issues.length);
//   console.log("Incomplete " + notCompleted.length);
// })();

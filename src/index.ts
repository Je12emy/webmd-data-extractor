#!/usr/bin/env node
import { Jira } from "./api";
import { Command } from "commander";
import { select, checkbox } from "@inquirer/prompts";
import { Board } from "./model/Board";
import { Completition } from "@model/Completion";

const config = {
  boards: [
    {
      id: 2028,
      name: "Voltron",
    },
    {
      id: 2031,
      name: "Brute Squad",
    },
    {
      id: 2609,
      name: "Sharks",
    },
    {
      id: 2029,
      name: "(legacy now Sharks) Rebel Alliance",
    },
    {
      id: 2030,
      name: "Lebowsky",
    },
  ],
};

const program = new Command();

const client = new Jira(
  "https://jira.internetbrands.com",
  process.env.ACCESS_TOKEN as string
);

program
  .name("WEBMD Data Extractor")
  .description("A tool to extract data from WEBMDs Jira")
  .version("1.0.0");

program
  .command("completion")
  .description("Get sprint completition percentage")
  .option("-l, --limit [numbe]>", "How many sprints to fetch", "10")
  .action(async (options) => {
    let limit = parseInt(options.limit);
    const { id, name } = await select({
      message: "Select a board",
      choices: config.boards.map((x) => ({
        name: x.name,
        value: x,
      })),
    });

    const board = await Board.Initialize(id, name, client);
    const boardSprints = board.sprints.slice(0, limit);

    const selectedSprints = await checkbox({
      message: "Select a sprint",
      choices: [
        ...boardSprints.map((s) => ({
          name: s.name,
          value: s,
        })),
      ],
    });

    const table: Completition[] = [];
    await Promise.all(
      selectedSprints.map(async (sprint) => {
        const selected = await board.selectSprint(sprint);

        table.push({
          id: sprint.id,
          name: sprint.name,
          totalIssues: selected.issues.length,
          incompleteIssues: selected.getIncompleteIssues().length,
          completion: selected.completition,
          startDate: sprint.startDate
            ? new Date(sprint.startDate).toLocaleDateString()
            : "N/A",
          endDate: sprint.endDate
            ? new Date(sprint.endDate).toLocaleDateString()
            : "N/A",
        });
      })
    );
    table.sort((a, b) => b.id - a.id);
    console.table(table);
  });

program.parse(process.argv);

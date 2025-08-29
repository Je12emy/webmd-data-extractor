#!/usr/bin/env node
import { Jira } from "./api";
import { Command } from "commander";
import { select } from "@inquirer/prompts";
import { Board } from "./types/Board";

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
  .command("sprints")
  .description("Get sprint completition percentage")
  .action(async () => {
    const { id, name } = await select({
      message: "Select a board",
      choices: [
        {
          name: "Voltron",
          value: { id: 2028, name: "Voltron" },
        },
      ],
    });

    const board = await Board.Initialize(id, name, client);
    const sprint = await select({
      message: "Select a sprint",
      choices: [
        ...board._sprints.map((s) => ({
          name: s.name,
          value: s,
        })),
      ],
    });
    await board.selectSprint(sprint);
    console.log(`Completition: ${board._selected?._completition}`);
  });

program.parse(process.argv);

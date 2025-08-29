#!/usr/bin/env node
import { Jira } from "./api";
import { Command } from "commander";
import { select, checkbox } from "@inquirer/prompts";
import { Board } from "./types/Board";

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
      id: 2029,
      name: "Rebel Alliance",
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
  .command("sprints")
  .argument("limit", "How many sprints to fetch")
  .description("Get sprint completition percentage")
  .action(async (limit: number = 10) => {
    const { id, name } = await select({
      message: "Select a board",
      choices: config.boards.map((x) => ({
        name: x.name,
        value: x,
      })),
    });

    const board = await Board.Initialize(id, name, client);
    const availableSprints = board._sprints
      .sort((a, b) => b.id - a.id)
      .slice(0, limit - 1);

    const sprint = await select({
      message: "Select a sprint",
      choices: [
        ...availableSprints.map((s) => ({
          name: s.name,
          value: s,
        })),
      ],
    });
    await board.selectSprint(sprint);
    console.log(`Completition: ${board._selected?._completition}%`);
  });

program.parse(process.argv);

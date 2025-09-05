#!/usr/bin/env node
import { Jira } from "./api";
import { Command } from "commander";
import { select, checkbox } from "@inquirer/prompts";
import { Board } from "./model/Board";
import { Completion, Velocity } from "@model/Reports";
import { Config } from "@model/Config";

const config: Config = {
  boards: [
    {
      id: 2028,
      name: "Voltron",
      members: [
        {
          displayName: "Jeremy Zelaya",
          name: "jzelaya",
          key: "JIRAUSER22581",
        },
        {
          displayName: "Sergio Ibarra",
          name: "sibarra",
          key: "JIRAUSER23087",
        },
      ],
    },
    {
      id: 2031,
      name: "Brute Squad",
      members: [],
    },
    {
      id: 2609,
      name: "Sharks",
      members: [],
    },
    {
      id: 2029,
      name: "(legacy now Sharks) Rebel Alliance",
      members: [],
    },
    {
      id: 2030,
      name: "Lebowsky",
      members: [],
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

    const table: Completion[] = [];
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

program
  .command("velocity")
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

    const selectedTeamMembers = await checkbox({
      message: "Select team members to include",
      choices: [
        ...config.boards
          .find((b) => b.id === id)!
          .members.map((m) => ({
            name: m.displayName,
            value: m,
          })),
      ],
    });

    let table: Velocity[] = [];
    await Promise.all(
      selectedTeamMembers.flatMap((member) => {
        return selectedSprints.map(async (sprint) => {
          const selected = await board.selectSprint(sprint);
          const worked = selected.getWorkedIssuesByAssignedUser(member.key);
          table.push({
            sprintId: sprint.id,
            sprintName: sprint.name,
            member: member.displayName,
            issuesCount: worked.length,
            totalPoints: worked.reduce((a, b) => {
              const points = b.fields.customfield_10273;
              return a + (points ? points : 1);
            }, 0),
          });
        });
      })
    );
    table = table.sort((a, b) => b.sprintId - a.sprintId);
    console.table(table);
  });

program.parse(process.argv);

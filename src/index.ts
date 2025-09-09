#!/usr/bin/env node
import { Jira } from "./api";
import { Command } from "commander";
import { select, checkbox } from "@inquirer/prompts";
import { Board } from "./model/Board";
import {
  Completion,
  sortBySprintId,
  sortByTeamMemberDesc,
  Velocity,
} from "./model/Reports";
import { Config } from "./model/Config";
import path from "path";
import fs from "node:fs";

const configPath = path.join(__dirname, "..", "config.json");
const data = fs.readFileSync(configPath, "utf-8");
const config: Config = JSON.parse(data);

const program = new Command();

const client = new Jira(config.jira.host, config.jira.token);

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

    const report: Completion[] = [];
    await Promise.all(
      selectedSprints.map(async (sprint) => {
        const selected = await board.selectSprint(sprint);

        report.push({
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
    report.sort(sortBySprintId);
    console.table(report, [
      "name",
      "totalIssues",
      "incompleteIssues",
      "completion",
    ]);
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

    let report = new Map<string, Velocity[]>();
    let sortedReport = new Map<string, Velocity[]>();

    await Promise.all(
      selectedSprints.map(async (sprint) => {
        let sprintVelocity: Velocity[] = [];
        const selected = await board.selectSprint(sprint);

        selectedTeamMembers.forEach((member) => {
          const worked = selected.getWorkedIssuesByAssignedUser(member.key);
          sprintVelocity.push({
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
        report.set(sprint.name, sprintVelocity);
      })
    );

    // Sort by sprint name
    [...report]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach((x) => sortedReport.set(x[0], x[1]));

    sortedReport.forEach((value, key) => {
      console.log(`\nSprint: ${key}`);
      console.table(value.sort(sortByTeamMemberDesc), [
        "member",
        "issuesCount",
        "totalPoints",
      ]);
    });
  });

program.parse(process.argv);

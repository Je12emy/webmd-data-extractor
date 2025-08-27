#!/usr/bin/env node
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
  const sprints = await client.GetBoardSprints(2028);
  console.log(sprints.sort((a, b) => b.id - a.id));
})();

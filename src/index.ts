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
  const board = await client.GetBoardById(2028);
  console.log(board);
})();

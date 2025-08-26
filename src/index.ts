#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();
program
  .name("WEBMD Data Extractor")
  .description("A tool to extract data from WEBMDs Jira")
  .version("1.0.0");

console.log("Hello World");

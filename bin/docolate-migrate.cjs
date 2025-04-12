#!/usr/bin/env node

"use strict";

const docolate = require("../dist/index.cjs");

const curDir = process.cwd();

try {
  const action = process.argv[2] ?? null;
  const args = docolate.parseArgs(process.argv.slice(3));

  console.log(
    "######################### MIGRATIONS ####################################",
  );
  console.log(`## Running from ${curDir}`);

  docolate.buildMigrationChangeSet(action, args, curDir);
} catch (error) {
  console.error(error);
}

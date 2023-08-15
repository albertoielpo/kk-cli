#! /usr/bin/env node

import * as chalk from "chalk";
import { program } from "commander";
import { readdir } from "fs/promises";

async function ls(path: string = ".") {
    const res = await readdir(path);
    console.log(res);
    if (res.indexOf("main.ts") != -1) console.log(chalk.red("main.ts found"));
}

//[optional arg]<mandatory arg>
program.command("ls [path]").description("ls linux command").action(ls);

program.parse();

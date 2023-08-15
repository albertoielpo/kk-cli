#! /usr/bin/env node

import { program } from "commander";
import { readdir } from "fs/promises";

async function ls() {
    const res = await readdir(".");
    console.log(res);
}

program.command("ls").description("ls linux command").action(ls);

program.parse();

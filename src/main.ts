#! /usr/bin/env node
import { program } from "commander";
import { readdir } from "fs/promises";
import { RandomCli } from "./random-cli";
import { TimeCli } from "./time-cli";
import { TransformCli } from "./transform-cli";

async function ls(path: string = ".") {
    const res = await readdir(path);
    console.log(res);
}

//[optional arg]<mandatory arg>
program.command("ls [path]").description("ls linux command").action(ls);

program
    .command("uuid")
    .description("Generate random uuid")
    .action(RandomCli.uuid);

program
    .command("mongoid")
    .description("Generate random mongoid")
    .action(RandomCli.mongoId);

program
    .command("time [format]")
    .description("Current time")
    .action(TimeCli.time);

program
    .command("b64 <action> <data>")
    .description("encode/decode base64 text")
    .action(TransformCli.base64);

program.parse();

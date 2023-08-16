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
    .description("generate random uuid")
    .action(RandomCli.uuid);

program
    .command("mongoid")
    .description("generate random mongoid")
    .action(RandomCli.mongoId);

program
    .command("str")
    .description("generate pseudo-random string")
    .action(RandomCli.str);

program
    .command("int [length]")
    .description(
        "generate pseudo-random integer. Length define max character. If invalid then max is used as default"
    )
    .action(RandomCli.int);

program
    .command("time [format]")
    .description("display current time using format (timestamp, iso8601)")
    .action(TimeCli.time);

program
    .command("base64 <action> <data>")
    .description("encode/decode base64 text")
    .action(TransformCli.base64);

program.parse();

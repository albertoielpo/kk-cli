#! /usr/bin/env node
import * as chalk from "chalk";
import { program } from "commander";
import { NetworkCli } from "./network-cli";
import { RandomCli } from "./random-cli";
import { TimeCli } from "./time-cli";
import { TransformCli } from "./transform-cli";

/** redirect console.warn and console.error to console.log colored with chalk */
console.warn = (data) => {
    console.log(chalk.yellow(data));
};
console.error = (data) => {
    console.log(chalk.red(data));
};

program
    .command("uuid")
    .description("generate random uuid. `kk uuid`")
    .action(RandomCli.uuid);

program
    .command("mongoid")
    .description("generate random mongoid. `kk mongoid`")
    .action(RandomCli.mongoId);

program
    .command("str")
    .description("generate pseudo-random string. `kk str`")
    .action(RandomCli.str);

program
    .command("int [digits]")
    .description(
        "generate pseudo-random integer. Length define max digits. If invalid then max is used as default. `kk int 5`"
    )
    .action(RandomCli.int);

program
    .command("time [format]")
    .description(
        "display current time using format (timestamp, iso8601). `kk time iso8601`"
    )
    .action(TimeCli.time);

program
    .command("base64 <action> <data>")
    .description("encode/decode base64 text. `kk base64 encode text`")
    .action(TransformCli.base64);

program
    .command("scan <host> <port>")
    .description(
        "network scan host and a command separated ports. `kk scan localhost 3000,3001`"
    )
    .action(NetworkCli.scan);

program.parse();

#! /usr/bin/env node
import * as chalk from "chalk";
import { program } from "commander";
import { ClipboardAction } from "./actions/clipboard.action";
import { KillProgramAction } from "./actions/kill-program.action";
import { NetworkAction } from "./actions/network.action";
import { PidInfoAction } from "./actions/pid-info.action";
import { RandomAction } from "./actions/random.action";
import { TimeAction } from "./actions/time.action";
import { TransformAction } from "./actions/transform.action";

/** Same as package.json */
const VERSION = "1.0.5";

/**
 * redirect console.warn and console.error to console.log colored with chalk
 */
console.warn = (data: unknown) => {
    console.log(chalk.yellow(data));
};
console.error = (data: unknown) => {
    console.log(chalk.red(data));
};

/**
 * commander configuration
 */
program
    .command("uuid")
    .description("generate random uuid. `kk uuid`")
    .action(RandomAction.uuid);

program
    .command("mongoid")
    .description("generate random mongoid. `kk mongoid`")
    .action(RandomAction.mongoId);

program
    .command("str")
    .description("generate pseudo-random string. `kk str`")
    .action(RandomAction.str);

program
    .command("int [digits]")
    .description(
        "generate pseudo-random integer. Length define max digits. If invalid then max is used as default. `kk int 5`"
    )
    .action(RandomAction.int);

program
    .command("time [format]")
    .description(
        "display current time using format (timestamp, iso8601). `kk time iso8601`"
    )
    .action(TimeAction.time);

program
    .command("base64 <action> <data>")
    .description("encode/decode base64 text. `kk base64 encode text`")
    .action(TransformAction.base64);

program
    .command("scan <host> <port>")
    .description(
        "availability check of host + port. port could be comma separated string. `kk scan localhost 3000,3001`"
    )
    .action(NetworkAction.scan);

program
    .command("c2c <filename>")
    .description(
        "copy file to clipboard. `kk c2c filename`. requires: pbcopy/pbpaste (for OSX), xclip (for Linux, FreeBSD, and OpenBSD) or clip (for Windows)"
    )
    .action(ClipboardAction.c2c);

program
    .command("pid <arg> [strict]")
    .description(
        "get pid info. arg could be the program name or the pid number. `kk pid -h` || `kk pid <program_name>` || `kk pid <12076>` || `kk pid <program_name> -s` || `kk pid <program_name> -s -d`"
    )
    .option("-s, --short", "compact print")
    .option("-d, --disable-strict", "disable strict mode")
    .action(PidInfoAction.getInfo);

program
    .command("pidport <port_number>")
    .description(
        "get pid info by port number. `kk pidport -h` || `kk pidport 8080`"
    )
    .option("-s, --short", "compact print")
    .action(PidInfoAction.getInfoByPort);

program
    .command("kill <arg>")
    .description(
        "kill program. Arg could be the exact program name or the pid number. `kk kill program_name` || `kk kill 12076`"
    )
    .action(KillProgramAction.kill);

program
    .command("killport <port_number>")
    .description("kill program by port number. `kk killport 8080`")
    .action(KillProgramAction.killPort);

program
    .command("jwtdecode <token>")
    .description("decode a jwt token. `kk jwtdecode <token>`")
    .action(TransformAction.jwtDecode);

/** apply */
program.version(VERSION).parse();

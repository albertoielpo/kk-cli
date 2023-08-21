# kk cli

A simple command line interface with my personal most used commands.

Source code: <a href="https://github.com/albertoielpo/kk-cli" target="_blank">Github</a>

## Install from npm

Install: `npm i -g @albertoielpo/kk-cli`

## Install from source

Git repo: `git clone https://github.com/albertoielpo/kk-cli.git`

Install: `npm i -g`

Launch: `kk --help`

## Development mode

Development watch mode: `npm run watch`

Execute from the root: `kk.sh <command> [args]`

Version: `./kk.sh --version`

## Test

Test: `npm run test`

## Usage

Usage: kk [options] [command]

Options:

```
  -V, --version           output the version number
  -h, --help              display help for command
```

Commands:

```
  uuid                    generate random uuid. `kk uuid`
  mongoid                 generate random mongoid. `kk mongoid`
  str                     generate pseudo-random string. `kk str`
  int [digits]            generate pseudo-random integer. Length define max digits. If invalid then max is used as default. `kk int 5`
  time [format]           display current time using format (timestamp, iso8601). `kk time iso8601`
  base64 <action> <data>  encode/decode base64 text. `kk base64 encode text`
  scan <host> <port>      availability check of host + port. port could be comma separated string. `kk scan localhost 3000,3001`
  c2c <filename>          copy file to clipboard. `kk c2c filename`
  pid <arg> [strict]      get pid info. arg could be the program name or the pid number. strict match the exact name (default true). `kk pid program_name` || `kk pid 12076`
  pidport <port_number>   get pid info by port number. `kk pidport 8080`
  kill <arg>              kill program. Arg could be the exact program name or the pid number. `kk kill program_name` || `kk kill 12076`
  killport <port_number>  kill program by port number. `kk killport 8080`
  help [command]          display help for command
```

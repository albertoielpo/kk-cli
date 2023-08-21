import { exec } from "child_process";
import { KillProgramAction } from "./kill-program.action";
import { PidInfo, PidInfoAction } from "./pid-info.action";

/**
 * @author Alberto Ielpo
 */
describe("kill-program.action", () => {
    const outputConsoleLog: unknown[] = [];
    const outputError: string[] = [];
    const command = `setTimeout(() => console.log('waiting...'), 10000)`; //10s long...

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
        exec(`node -e "${command}"`, () => {}); //open a new thread
    });

    beforeEach(() => {
        outputConsoleLog.splice(0, outputConsoleLog.length);
        outputError.splice(0, outputError.length);
    });

    it("should return kill a program given a pid", async () => {
        await PidInfoAction.getInfo("node", false);
        expect(outputConsoleLog.length).toBe(1);
        const x = outputConsoleLog[0];
        if (x instanceof Map) {
            const pidArr: PidInfo[] = x.get("node");
            const openCommand = pidArr.find(
                (x) => x.cmd.indexOf(command) != -1
            );
            expect(openCommand).toBeDefined(); //check new thread
            const pid = openCommand?.pid;
            if (!pid) throw new Error("PID must be defined");

            // kill the program...
            await KillProgramAction.kill(pid as number);

            // retrieve again info and should not be running
            await PidInfoAction.getInfo(pid);
            expect(outputError.length).toBe(1);
            expect(outputError[0]).toBe(
                `No running program found for pid ${pid}`
            );
        } else {
            /** should never here */
            expect(true).toBe(false);
        }
    });
});

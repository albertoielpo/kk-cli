import { PidInfo, PidInfoAction } from "./pid-info.action";

/**
 * @author Alberto Ielpo
 */
describe("pid-info.action", () => {
    const outputConsoleLog: unknown[] = [];
    const outputError: string[] = [];

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
    });

    it("should return pid number given a name", async () => {
        const programName = "node";
        await PidInfoAction.getInfo(programName); //program name, strict mode
        expect(outputConsoleLog.length).toBe(1);
        const x = outputConsoleLog[0];
        if (x instanceof Map) {
            const pidArr: PidInfo[] = x.get(programName);
            expect(pidArr.length).toBeGreaterThanOrEqual(0);
            expect(pidArr[0].pid).toBeGreaterThanOrEqual(0);
        }
        /** no error expected */
        expect(outputError.length).toBe(0);
    });
});

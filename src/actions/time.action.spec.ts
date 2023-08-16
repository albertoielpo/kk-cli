import { TimeAction } from "./time.action";

/**
 * @author Alberto Ielpo
 */
describe("time.action", () => {
    const outputConsoleLog: string[] = [];
    const outputError: string[] = [];

    function isIsoDate(str: string) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
            return false;
        const d = new Date(str);
        return (
            d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str
        ); // valid date
    }

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
    });

    beforeEach(() => {
        outputConsoleLog.splice(0, outputConsoleLog.length);
        outputError.splice(0, outputError.length);
    });

    it("should return a valid timestamp", () => {
        const currentTimestamp = new Date().getTime();
        TimeAction.time("timestamp");

        expect(outputConsoleLog.length).toBe(1);
        expect(Number(outputConsoleLog[0])).toBeGreaterThanOrEqual(
            currentTimestamp
        );

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should return a valid isodate", () => {
        TimeAction.time("iso8601");

        expect(outputConsoleLog.length).toBe(1);
        expect(isIsoDate(outputConsoleLog[0])).toBe(true);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });
});

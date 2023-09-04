import { PasswordGeneratorAction } from "./password-generator.action";

describe("password-generator.action", () => {
    const outputConsoleLog: string[] = [];
    const outputError: string[] = [];
    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
    });

    beforeEach(() => {
        outputConsoleLog.splice(0, outputConsoleLog.length);
        outputError.splice(0, outputError.length);
    });

    it("should generate a random password", () => {
        PasswordGeneratorAction.generate(undefined, { random: true });
        expect(outputConsoleLog[0]).toBeTruthy();

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should not have collision in sequential generation", () => {
        const TEST_CASES = 10_000; //it works also with 1_000_000 but it tooks 94732 ms so... :)
        for (let ii = 0; ii < TEST_CASES; ii++) {
            PasswordGeneratorAction.generate(undefined, { random: true });
        }

        outputConsoleLog.sort();

        for (let ii = 0; ii < TEST_CASES - 1; ii++) {
            expect(
                outputConsoleLog[ii] !== outputConsoleLog[ii + 1]
            ).toBeTruthy();
        }
    });

    it("should create a password using a passphrase", () => {
        PasswordGeneratorAction.generate("passphrase", {});
        expect(outputConsoleLog[0]).toBeTruthy();

        /** second generation should be equals to the first one */
        PasswordGeneratorAction.generate("passphrase", {});
        expect(outputConsoleLog[0]).toBe(outputConsoleLog[1]);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });
});

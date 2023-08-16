import { isValidObjectId } from "mongoose";
import { RandomAction } from "./random.action";

/**
 * @author Alberto Ielpo
 */
describe("random.action", () => {
    const outputConsoleLog: string[] = [];
    const outputError: string[] = [];

    const uuidRegex =
        /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
    });

    beforeEach(() => {
        outputConsoleLog.splice(0, outputConsoleLog.length);
        outputError.splice(0, outputError.length);
    });

    it("should be a valid positive integer", () => {
        RandomAction.int();

        expect(outputConsoleLog.length).toBe(1);
        expect(outputConsoleLog[0]).toBeGreaterThanOrEqual(0);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should be a valid mongodb id", () => {
        RandomAction.mongoId();

        expect(outputConsoleLog.length).toBe(1);
        expect(isValidObjectId(outputConsoleLog[0])).toBe(true);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should be a valid string", () => {
        RandomAction.str();

        expect(outputConsoleLog.length).toBe(1);
        expect(outputConsoleLog[0]).toBeTruthy();

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should be a valid uuid", () => {
        RandomAction.uuid();

        expect(outputConsoleLog.length).toBe(1);
        expect(uuidRegex.test(outputConsoleLog[0])).toBe(true);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });
});

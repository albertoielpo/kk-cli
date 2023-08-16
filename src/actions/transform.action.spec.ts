import { TransformAction } from "./transform.action";

/**
 * @author Alberto Ielpo
 */
describe("transform.action", () => {
    const outputConsoleLog: string[] = [];
    const outputError: string[] = [];
    const base64regex =
        /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
    });

    beforeEach(() => {
        outputConsoleLog.splice(0, outputConsoleLog.length);
        outputError.splice(0, outputError.length);
    });

    it("should encode in base64 format", () => {
        const inputStr = "data";
        const inputEncoded = "ZGF0YQ==";
        TransformAction.base64("encode", inputStr);
        expect(outputConsoleLog.length).toBe(1);

        expect(base64regex.test(outputConsoleLog[0])).toBe(true);
        expect(outputConsoleLog[0]).toBe(inputEncoded);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should decode in base64 format", () => {
        const inputStr = "ZGF0YQ==";
        const inputDecoded = "data";
        TransformAction.base64("decode", inputStr);

        expect(outputConsoleLog.length).toBe(1);
        expect(outputConsoleLog[0]).toBe(inputDecoded);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should encode+decode be valid", () => {
        const inputStr = "data";
        TransformAction.base64("encode", inputStr);
        expect(outputConsoleLog.length).toBe(1);
        TransformAction.base64("decode", outputConsoleLog[0]);
        expect(outputConsoleLog.length).toBe(2);
        expect(outputConsoleLog[1]).toBe(inputStr);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });
});

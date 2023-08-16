import { createServer } from "node:http";
import { NetworkAction } from "./network.action";

/**
 * @author Alberto Ielpo
 */
describe("network.action", () => {
    const outputConsoleLog: string[] = [];
    const outputError: string[] = [];
    const server = createServer();
    const busyPort = 60000;
    const freePort = 60001;

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
        server.listen(busyPort);
    });

    beforeEach(() => {
        outputConsoleLog.splice(0, outputConsoleLog.length);
        outputError.splice(0, outputError.length);
    });

    it("should be closed", async () => {
        const host = "localhost";
        const port = "" + busyPort;
        const message = `${host}:${port} is busy`;
        await NetworkAction.scan(host, port);

        expect(outputConsoleLog.length).toBe(1);
        expect(outputConsoleLog[0]).toBe(message);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    it("should be open", async () => {
        const host = "localhost";
        const port = "" + freePort;
        const message = `${host}:${port} is available`;
        await NetworkAction.scan(host, port);

        expect(outputConsoleLog.length).toBe(1);
        expect(outputConsoleLog[0]).toBe(message);

        /** no error expected */
        expect(outputError.length).toBe(0);
    });

    afterAll(() => {
        server.close();
    });
});

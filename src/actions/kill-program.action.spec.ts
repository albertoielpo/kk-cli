/**
 * @author Alberto Ielpo
 */
describe("kill-program.action", () => {
    const outputConsoleLog: unknown[] = [];
    const outputError: string[] = [];

    beforeAll(() => {
        console.log = (data) => outputConsoleLog.push(data);
        console.warn = (data) => outputError.push(data);
        console.error = (data) => outputError.push(data);
    });

    it.todo("should return kill a program given a pid");
});
